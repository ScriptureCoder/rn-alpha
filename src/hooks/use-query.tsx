import { useEffect, useMemo, useRef, useCallback } from "react";
import http, { Method } from "../utils/service";
import { useApp } from "store/contexts/app-context";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import { actions } from "store/reducers/cache-reducer";
import * as network from "../store/reducers/thread-reducer";
import useCache from "./use-cache";
import { useSocket } from "store/contexts/socket-context";
import { Route } from "types";
import { QueryOptions, QueryResult } from "./types";
import { NetworkPolicy, NETWORK_TIMEOUT } from "./constants";
import {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  isAbortError,
} from "hooks/utils";
import { getOrCreateRequest, cancelRequest } from "./utils/request-queue";
import {
  isCacheExpired,
  isCacheStale,
  getCacheData,
} from "./utils/cache-helpers";
import { extractResponseData } from "./utils/response-helpers";
import { useAlphaConfig } from "store/contexts/config-context";
import {
  resolveEncryptionOptions,
  applyRequestEncryption,
  applyResponseDecryption,
} from "./utils/encryption-helpers";

/**
 * Custom hook for data fetching with caching support
 * @param route - The API route key
 * @param args - Query options including variables, network policy, callbacks
 * @returns QueryResult with data, loading state, and cache manipulation functions
 */
const useQuery = (route: Route, args?: QueryOptions): QueryResult => {
  const { variables = {}, networkPolicy, init, onCompleted, onError, encrypted, dataPath, idRef } = args || {};
  const app = useApp();
  const { auth } = app;
  const cache = useCache();
  const { key, path, method } = cache.getContext(route, variables);
  const policy: NetworkPolicy = networkPolicy || "cache-first";
  const [config] = useAlphaConfig();

  // Resolve encryption options (hook option > global config)
  const encryptionOptions = resolveEncryptionOptions(encrypted, config.defaultEncryption);

  // Resolve dataPath (hook option > global config)
  const resolvedDataPath = dataPath !== undefined ? dataPath : config.dataPath;

  const data = useSelector((state) => state.cache[key]);
  const thread = useSelector((state) => state.thread[key]);

  const dispatch = useDispatch();
  const { connected } = useSocket();

  // Use ref to store timeout ID for cleanup
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Use ref to store abort controller for request cancellation
  const abortControllerRef = useRef<AbortController | null>(null);

  // Handle data completion and retry on connection
  useEffect(() => {
    if (data?.data && onCompleted) {
      onCompleted(data?.data);
    }
    if (connected && thread?.error && (!data || (Array.isArray(data) && data.length < 1))) {
      refetch({});
    }
  }, [data, connected, thread?.error]);

  // Initial fetch on mount
  useEffect(() => {
    fetchData(variables);

    // Cleanup on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  // Handle initial data
  useEffect(() => {
    if (init && init.timestamp > (data?.timestamp || 0)) {
      dispatch(actions.init({ key, value: init }));
    }
  }, [init?.timestamp, key, dispatch, data?.timestamp]);

  /**
   * Sets the loading/error/status state for this query
   */
  const setThread = useCallback(
    (loading: boolean, error?: string, status?: number) => {
      dispatch(
        network.actions.set({
          key,
          value: {
            loading,
            error,
            status,
          },
        })
      );
    },
    [dispatch, key]
  );

  /**
   * Main fetch logic based on network policy
   */
  const fetchData = useCallback(
    (fetchVariables: Record<string, any>) => {
      switch (policy) {
        case "cache-only":
          return;
        case "network-only":
          fetchHandler(fetchVariables, true).catch(() => {});
          return;
        case "cache-first":
          if (!data) {
            fetchHandler(fetchVariables).catch(() => {});
          }
          return;
        case "network-and-cache":
          fetchHandler(fetchVariables).catch(() => {});
          timeoutRef.current = setTimeout(() => {
            const currentThread = thread;
            if (currentThread?.loading) {
              refetch({});
            }
          }, NETWORK_TIMEOUT);
          return;
        case "stale-while-revalidate":
          // Show stale data immediately if available and not expired
          if (data && !isCacheExpired(data)) {
            // If data is stale, refetch in background
            if (isCacheStale(data)) {
              fetchHandler(fetchVariables).catch(() => {});
            }
          } else {
            // No cache or expired, fetch normally
            fetchHandler(fetchVariables).catch(() => {});
          }
          return;
      }
    },
    [policy, data, thread]
  );

  /**
   * Handles the actual HTTP request
   */
  const fetchHandler = useCallback(
    async (fetchVariables: Record<string, any>, isRefetch: boolean = false) => {
      try {
        // Only fetch if not currently loading or if it's a refetch or there's an error
        if (!thread?.loading || thread?.error || isRefetch) {
          // Abort any existing request
          if (abortControllerRef.current) {
            abortControllerRef.current.abort();
          }

          // Create new abort controller for this request
          abortControllerRef.current = new AbortController();

          setThread(true);

          // Apply request encryption if enabled
          const requestData = encryptionOptions
            ? applyRequestEncryption(fetchVariables, encryptionOptions)
            : fetchVariables;

          // Use request deduplication to prevent duplicate requests
          const res: any = await getOrCreateRequest(key, () =>
            http(
              path,
              (method as Method) || "GET",
              requestData,
              {
                returnStatus: true,
                auth: auth.accessToken,
                signal: abortControllerRef.current.signal,
              }
            )
          );

          const error = !isSuccessStatus(res.status)
            ? extractErrorMessage(res)
            : undefined;

          setThread(false, error, res.status);

          if (isSuccessStatus(res.status)) {
            let responseData = res.data
            // Apply response decryption if enabled
            if (encryptionOptions && responseData) {
              responseData = applyResponseDecryption(responseData, encryptionOptions);
            }

            responseData = extractResponseData(responseData, resolvedDataPath);

            if (responseData) {
              if (onCompleted) {
                onCompleted(responseData);
              }
              cache.setCache(key, responseData);
            }
          } else if (isAuthError(res.status)) {
            // Auth error - clear authentication
            app.clearAuth();
            // Call onAuthError callback if provided
            if (config.onAuthError) {
              Promise.resolve(config.onAuthError(res.status)).catch(console.error);
            }
          } else if (error && onError) {
            onError(error, res.status);
          }
        }
      } catch (e: any) {
        // Ignore abort errors - they're intentional cancellations
        if (isAbortError(e)) {
          return;
        }

        const error = e.message || "Oops! an error occurred";
        setThread(false, error, 500);
        if (onError) {
          onError(error, 500);
        }
      }
    },
    [thread, setThread, path, method, auth.accessToken, onCompleted, onError, cache, key, app, encryptionOptions, resolvedDataPath, config]
  );

  /**
   * Refetches data with optional new variables
   */
  const refetch = useCallback(
    (refetchVariables?: Record<string, any>) => {
      fetchHandler({ ...variables, ...(refetchVariables || {}) }, true).catch(() => {});
    },
    [fetchHandler, variables]
  );

  /**
   * Fetches more data and concatenates with existing data
   */
  const fetchMore = useCallback(
    async (
      fetchMoreVariables?: Record<string, any>,
      concat?: "start" | "end" | "pagination",
      paginationKey?: string
    ) => {
      try {
        // Create abort controller for fetchMore
        const fetchMoreController = new AbortController();

        const res: any = await http(
          path,
          (method as Method) || "GET",
          { ...variables, ...(fetchMoreVariables || {}) },
          {
            returnStatus: true,
            auth: auth?.accessToken,
            signal: fetchMoreController.signal,
          }
        );

        const error = !isSuccessStatus(res.status)
          ? extractErrorMessage(res)
          : undefined;

        if (isSuccessStatus(res.status)) {

          let responseData = res.data
          // Apply response decryption if enabled
          if (encryptionOptions && responseData) {
            responseData = applyResponseDecryption(responseData, encryptionOptions);
          }

          responseData = extractResponseData(responseData, resolvedDataPath);

          if (concat === "start") {
            dispatch(actions.prepend({ key, value: responseData }));
          } else if (concat === "end") {
            dispatch(actions.append({ key, value: responseData }));
          } else if (concat === "pagination") {
            dispatch(
              actions.paginate({
                key,
                data: responseData,
                paginationKey: paginationKey || "data",
              })
            );
          }
          return { data: responseData };
        } else if (isAuthError(res.status)) {
          // Auth error - clear authentication
          app.clearAuth();
          // Call onAuthError callback if provided
          if (config.onAuthError) {
            Promise.resolve(config.onAuthError(res.status)).catch(console.error);
          }
          return { error };
        }
        return { error };
      } catch (e: any) {
        // Handle abort errors
        if (isAbortError(e)) {
          return { error: "" };
          // return { error: "Request cancelled" };
        }

        const error = e.message || "Oops! an error occurred";
        return { error };
      }
    },
    [path, method, variables, auth?.accessToken, dispatch, key, app, config]
  );

  /**
   * Aborts the current request
   */
  const abort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
    // Also remove from deduplication queue
    cancelRequest(key);
  }, [key]);

  /**
   * Optimistic update with automatic rollback
   */
  const optimisticUpdate = useCallback(
    (updater: (current: any) => any, rollback?: () => void) => {
      const currentData = data;
      const newData = updater(currentData);

      // Update immediately
      cache.update(key, newData);

      // Return rollback function
      return () => {
        if (rollback) {
          rollback();
        } else {
          cache.update(key, currentData);
        }
      };
    },
    [data, key, cache]
  );

  /**
   * Cache manipulation functions bound to current key
   */
  const extendCache = useMemo(
    () => ({
      update: (newData: any) => {
        cache.update(key, newData);
      },
      updateValue: (arg: string, value: any) => {
        cache.updateValue(key, arg, value);
      },
      updateValues: (values: Record<string, any>) => {
        cache.updateValues(key, values);
      },
      updateItem: (id: string, value: any) => {
        cache.updateItem(key, id, value, idRef);
      },
      deleteItem: (id: string) => {
        cache.deleteItem(key, id, idRef);
      },
      prepend: (newData: any) => {
        cache.prepend(key, newData);
      },
      append: (newData: any) => {
        cache.append(key, newData);
      },
      updateOrPrepend:(value:any)=>{
        cache.updateOrPrepend(key, value)
      },
    }),
    [key, cache, idRef]
  );

  return {
    data: data?.data || init,
    loading: thread?.loading || false,
    error: thread?.error,
    status: thread?.status,
    refetch,
    key,
    fetchMore,
    abort,
    optimisticUpdate,
    ...extendCache,
  };
};

export default useQuery;
