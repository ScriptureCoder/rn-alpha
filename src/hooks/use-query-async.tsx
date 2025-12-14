import http, { Method } from "../utils/service";
import { useApp } from "store/contexts/app-context";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import { actions } from "store/reducers/cache-reducer";
import * as network from "../store/reducers/thread-reducer";
import useCache from "./use-cache";
import { Route } from "types";
import { MutationResponse } from "./types";
import {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  isAbortError,
  createErrorResponse,
  createSuccessResponse,
} from "hooks/utils";
import { extractResponseData } from "./utils/response-helpers";
import { useAlphaConfig } from "store/contexts/config-context";
import {
  resolveEncryptionOptions,
  applyRequestEncryption,
  applyResponseDecryption,
  EncryptionOptions,
} from "./utils/encryption-helpers";
import { NetworkPolicy } from "./constants";
import {
  isCacheExpired,
  isCacheStale,
  getCacheData,
} from "./utils/cache-helpers";

/**
 * Options for async query
 */
interface UseQueryAsyncOptions {
  authToken?: string;
  signal?: AbortSignal;
  encrypted?: boolean | EncryptionOptions;
  dataPath?: string; // Override global dataPath for this query
  onCompleted?: (data: any) => void;
  onError?: (error: string, status?: number) => void;
  networkPolicy?: NetworkPolicy;
}

/**
 * Hook return type - a function that performs async queries
 */
type UseQueryAsyncReturn = (
  route: Route,
  variables?: Record<string, any>,
  options?: UseQueryAsyncOptions | string // string for backward compatibility (authToken)
) => Promise<MutationResponse>;

/**
 * Custom hook for async data fetching without subscriptions
 * Useful for one-time data fetches that update the cache
 * @returns An async function to fetch data
 */
const useQueryAsync = (): UseQueryAsyncReturn => {
  const app = useApp();
  const { auth } = app;
  const { getContext } = useCache();
  const dispatch = useDispatch();
  const [config] = useAlphaConfig();
  const cacheState = useSelector((state) => state.cache);

  /**
   * Performs an async query and updates cache and loading state
   * @param route - The API route key
   * @param variables - Query variables
   * @param options - Optional auth token or options object with signal
   * @returns Promise with response data or error
   */
  return async (
    route: Route,
    variables: Record<string, any> = {},
    options?: UseQueryAsyncOptions | string
  ): Promise<MutationResponse> => {
    const { key, method, path } = getContext(route, variables);

    // Handle backward compatibility (authToken as string)
    const opts: UseQueryAsyncOptions =
      typeof options === 'string'
        ? { authToken: options }
        : options || {};

    // Resolve encryption options
    const encryptionOptions = resolveEncryptionOptions(opts.encrypted, config.defaultEncryption);

    // Resolve dataPath (option > global config)
    const resolvedDataPath = opts.dataPath !== undefined ? opts.dataPath : config.dataPath;

    // Get network policy (default to cache-first)
    const policy: NetworkPolicy = opts.networkPolicy || "cache-first";

    // Get cached data
    const cachedEntry = cacheState[key];
    const cachedData = getCacheData(cachedEntry);

    /**
     * Helper function to perform the network request
     */
    const performNetworkRequest = async (): Promise<MutationResponse> => {
      try {
        // Set loading state
        dispatch(
          network.actions.set({
            key,
            value: {
              loading: true,
              error: undefined,
            },
          })
        );

        // Apply request encryption if enabled
        const requestData = encryptionOptions
          ? applyRequestEncryption(variables, encryptionOptions)
          : variables;

        // Perform the request
        const res: any = await http(
          path,
          (method as Method) || "GET",
          requestData,
          {
            returnStatus: true,
            auth: opts.authToken || auth.accessToken,
            signal: opts.signal,
          }
        );

        const error = !isSuccessStatus(res.status)
          ? extractErrorMessage(res)
          : undefined;

        // Update loading/error state
        dispatch(
          network.actions.set({
            key,
            value: {
              loading: false,
              error,
            },
          })
        );

        if (isSuccessStatus(res.status)) {
          let responseData = res.data;
          // Apply response decryption if enabled
          if (encryptionOptions && responseData) {
            responseData = applyResponseDecryption(responseData, encryptionOptions);
          }

          responseData = extractResponseData(responseData, resolvedDataPath);

          dispatch(actions.set({ key, value: responseData }));

          // Call onCompleted callback
          if (opts.onCompleted) {
            opts.onCompleted(responseData);
          }

          return createSuccessResponse(responseData, res.status);
        } else if (isAuthError(res.status)) {
          // Handle auth errors - clear authentication
          app.clearAuth();
          // Call onAuthError callback if provided
          if (config.onAuthError) {
            Promise.resolve(config.onAuthError(res.status)).catch(console.error);
          }
          
          const errorMessage = error || "Unauthorized";
          // Call onError callback
          if (opts.onError) {
            opts.onError(errorMessage, res.status);
          }
          
          return createErrorResponse(errorMessage, res.status);
        }

        const errorMessage = error || "Request failed";
        // Call onError callback
        if (opts.onError) {
          opts.onError(errorMessage, res.status);
        }

        return createErrorResponse(errorMessage, res.status);
      } catch (e: any) {
        // Handle abort errors differently - don't update state
        if (isAbortError(e)) {
          dispatch(
            network.actions.set({
              key,
              value: {
                loading: false,
                error: undefined,
              },
            })
          );
          return createErrorResponse("Request cancelled", 0);
        }

        const error = e.message || "Oops! an error occurred";

        // Update error state
        dispatch(
          network.actions.set({
            key,
            value: {
              loading: false,
              error,
            },
          })
        );

        // Call onError callback
        if (opts.onError) {
          opts.onError(error, 500);
        }

        return createErrorResponse(error, 500);
      }
    };

    // Implement network policy logic
    switch (policy) {
      case "cache-only":
        // Return cached data immediately if available, don't make network request
        if (cachedData !== undefined) {
          // Call onCompleted callback with cached data
          if (opts.onCompleted) {
            opts.onCompleted(cachedData);
          }
          return createSuccessResponse(cachedData, 200);
        }
        // No cache available - return error
        const noCacheError = "No cached data available";
        if (opts.onError) {
          opts.onError(noCacheError, 404);
        }
        return createErrorResponse(noCacheError, 404);

      case "network-only":
        // Always make network request, ignore cache
        return performNetworkRequest();

      case "cache-first":
        // Check cache first, only fetch if no cache exists
        if (cachedData !== undefined) {
          // Call onCompleted callback with cached data
          if (opts.onCompleted) {
            opts.onCompleted(cachedData);
          }
          return createSuccessResponse(cachedData, 200);
        }
        // No cache, fetch from network
        return performNetworkRequest();

      case "network-and-cache":
        // Make network request, but return cached data immediately if available
        if (cachedData !== undefined) {
          // Call onCompleted callback with cached data immediately
          if (opts.onCompleted) {
            opts.onCompleted(cachedData);
          }
          // Still make network request in background (fire and forget)
          performNetworkRequest().catch(() => {});
          return createSuccessResponse(cachedData, 200);
        }
        // No cache, fetch from network
        return performNetworkRequest();

      case "stale-while-revalidate":
        // Return stale cache immediately if available, fetch in background
        if (cachedEntry && !isCacheExpired(cachedEntry)) {
          // Call onCompleted callback with cached data immediately
          if (opts.onCompleted) {
            opts.onCompleted(cachedData);
          }
          // If data is stale, refetch in background
          if (isCacheStale(cachedEntry)) {
            performNetworkRequest().catch(() => {});
          }
          return createSuccessResponse(cachedData, 200);
        }
        // No cache or expired, fetch normally
        return performNetworkRequest();

      default:
        // Default to cache-first behavior
        if (cachedData !== undefined) {
          if (opts.onCompleted) {
            opts.onCompleted(cachedData);
          }
          return createSuccessResponse(cachedData, 200);
        }
        return performNetworkRequest();
    }
  };
};

export default useQueryAsync;
