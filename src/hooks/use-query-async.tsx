import http, { Method } from "../utils/service";
import { useApp } from "../store/contexts/app-context";
import useDispatch from "./use-dispatch";
import { actions } from "../store/reducers/cache-reducer";
import * as network from "../store/reducers/thread-reducer";
import useCache from "./use-cache";
import { Route } from "../types";
import { MutationResponse } from "./types";
import {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  isAbortError,
  createErrorResponse,
  createSuccessResponse,
} from "./utils/error-handler";
import { extractResponseData } from "./utils/response-helpers";
import { useAlphaConfig } from "../store/contexts/config-context";
import {
  resolveEncryptionOptions,
  applyRequestEncryption,
  applyResponseDecryption,
  EncryptionOptions,
} from "./utils/encryption-helpers";

/**
 * Options for async query
 */
interface UseQueryAsyncOptions {
  authToken?: string;
  signal?: AbortSignal;
  encrypted?: boolean | EncryptionOptions;
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
        // Update cache with successful data
        let responseData = extractResponseData(res.data, config.dataPath);
        
        // Apply response decryption if enabled
        if (encryptionOptions && responseData) {
          responseData = applyResponseDecryption(responseData, encryptionOptions);
        }
        
        dispatch(actions.set({ key, value: responseData }));
        return createSuccessResponse(responseData, res.status);
      } else if (isAuthError(res.status)) {
        // Handle auth errors - clear authentication
        app.clearAuth();
        return createErrorResponse(error || "Unauthorized", res.status);
      }
      
      return createErrorResponse(error || "Request failed", res.status);
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
      
      return createErrorResponse(error, 500);
    }
  };
};

export default useQueryAsync;
