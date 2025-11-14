import { useEffect, useMemo, useRef, useCallback } from "react";
import http, { Method } from "../utils/service";
import { useApp } from "../store/contexts/app-context";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import { actions } from "../store/reducers/cache-reducer";
import * as network from "../store/reducers/thread-reducer";
import useCache from "./use-cache";
import { useSocket } from "../store/contexts/socket-context";
import { Route } from "../types";
import { QueryOptions, QueryResult } from "./types";
import { NetworkPolicy, NETWORK_TIMEOUT } from "./constants";
import {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  isAbortError,
} from "./utils/error-handler";
import { getOrCreateRequest, cancelRequest } from "./utils/request-queue";
import {
  isCacheExpired,
  isCacheStale,
  getCacheData,
} from "./utils/cache-helpers";

/**
 * Custom hook for data fetching with caching support
 * @param route - The API route key
 * @param args - Query options including variables, network policy, callbacks
 * @returns QueryResult with data, loading state, and cache manipulation functions
 */
const useQuery = (route: Route, args?: QueryOptions): QueryResult => {
  const { variables = {}, networkPolicy, init, onCompleted, onError } = args || {};
  const app = useApp();
  const { auth } = app;
  const cache = useCache();
  const { key, path, method } = cache.getContext(route, variables);
  const policy: NetworkPolicy = networkPolicy || "cache-first";

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
    if (data && onCompleted) {
      onCompleted(data);
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
   * Sets the loading/error state for this query
   */
  const setThread = useCallback(
    (loading: boolean, error?: string) => {
      dispatch(
        network.actions.set({
          key,
          value: {
            loading,
            error,
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
          fetchHandler(fetchVariables).catch(() => {});
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
          
          // Use request deduplication to prevent duplicate requests
          const res: any = await getOrCreateRequest(key, () =>
            http(
              path,
              (method as Method) || "GET",
              fetchVariables,
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
          
          setThread(false, error);

          if (isSuccessStatus(res.status) && res.data.data) {
            if (onCompleted) {
              onCompleted(res.data.data);
            }
            cache.setCache(key, res.data.data);
          } else if (isAuthError(res.status)) {
            // Auth error - clear authentication
            app.clearAuth();
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
        setThread(false, error);
        if (onError) {
          onError(error, 500);
        }
      }
    },
    [thread, setThread, path, method, auth.accessToken, onCompleted, onError, cache, key, app]
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
          if (concat === "start") {
            dispatch(actions.prepend({ key, value: res.data.data }));
          } else if (concat === "end") {
            dispatch(actions.append({ key, value: res.data.data }));
          } else if (concat === "pagination") {
            dispatch(
              actions.paginate({
                key,
                data: res.data.data,
                paginationKey: paginationKey || "data",
              })
            );
          }
          return { data: res.data.data };
        } else if (isAuthError(res.status)) {
          // Auth error - clear authentication
          app.clearAuth();
          return { error };
        }
        return { error };
      } catch (e: any) {
        // Handle abort errors
        if (isAbortError(e)) {
          return { error: "Request cancelled" };
        }
        
        const error = e.message || "Oops! an error occurred";
        return { error };
      }
    },
    [path, method, variables, auth?.accessToken, dispatch, key, app]
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
        cache.updateItem(key, id, value);
      },
      deleteItem: (id: string) => {
        cache.deleteItem(key, id);
      },
      prepend: (newData: any) => {
        cache.prepend(key, newData);
      },
      append: (newData: any) => {
        cache.append(key, newData);
      },
    }),
    [key, cache]
  );

  return {
    data: data || init,
    loading: thread?.loading || false,
    error: thread?.error,
    refetch,
    key,
    fetchMore,
    abort,
    optimisticUpdate,
    ...extendCache,
  };
};

export default useQuery;
