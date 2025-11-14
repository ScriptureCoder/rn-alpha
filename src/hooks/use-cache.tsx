import { useCallback } from "react";
import { useApp } from "../store/contexts/app-context";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import { actions } from "../store/reducers/cache-reducer";
import { Route } from "../types";
import { parseRoute } from "./utils/route-parser";
import { CacheOperations } from "./types";

/**
 * Helper function to get the ID from an item
 * Checks both _id (MongoDB) and id (standard) fields
 */
const getItemId = (item: any): string | undefined => {
  return item?._id || item?.id;
};

/**
 * Custom hook for cache operations
 * Provides functions to get, set, and manipulate cached data
 * @returns CacheOperations interface with all cache manipulation functions
 */
const useCache = (): CacheOperations => {
  const dispatch = useDispatch();
  const { auth: { customerId } } = useApp();
  const cacheState = useSelector((state) => state.cache);

  /**
   * Parses a route and generates cache key with context
   */
  const getContext = useCallback(
    (route: Route, variables?: Record<string, any>) => {
      return parseRoute(route, variables, customerId);
    },
    [customerId]
  );

  /**
   * Generates a cache key for a route and variables
   */
  const getKey = useCallback(
    (route: Route, variables?: Record<string, any>) => {
      const { key } = getContext(route, variables);
      return key;
    },
    [getContext]
  );

  /**
   * Gets cached data for a specific key
   */
  const getData = useCallback(
    (key: string) => {
      return cacheState[key];
    },
    [cacheState]
  );

  /**
   * Sets cache data for a specific key
   */
  const setCache = useCallback(
    (key: string, value: any) => {
      dispatch(actions.set({ key, value }));
    },
    [dispatch]
  );

  /**
   * Updates cache data (alias for setCache)
   */
  const update = useCallback(
    (key: string, value: any) => {
      setCache(key, value);
    },
    [setCache]
  );

  /**
   * Updates a single item in a cached array
   */
  const updateItem = useCallback(
    (key: string, id: string, value: any) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        const index = cache.findIndex((item: any) => getItemId(item) === id);
        if (index !== -1) {
          const updated = [...cache];
          updated[index] = { ...updated[index], ...value };
          setCache(key, updated);
        }
      }
    },
    [cacheState, setCache]
  );

  /**
   * Gets a single item from a cached array
   */
  const getItem = useCallback(
    (key: string, id: string) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        return cache.find((item: any) => getItemId(item) === id);
      }
      return undefined;
    },
    [cacheState]
  );

  /**
   * Updates a single property in a cached object
   */
  const updateValue = useCallback(
    (key: string, arg: string, value: any) => {
      const cache = cacheState[key];
      if (!Array.isArray(cache) && typeof cache === "object") {
        setCache(key, { ...cache, [arg]: value });
      }
    },
    [cacheState, setCache]
  );

  /**
   * Updates multiple properties in a cached object
   */
  const updateValues = useCallback(
    (key: string, values: Record<string, any>) => {
      const cache = cacheState[key];
      if (!Array.isArray(cache) && typeof cache === "object") {
        setCache(key, { ...cache, ...values });
      }
    },
    [cacheState, setCache]
  );

  /**
   * Prepends data to the beginning of a cached array
   */
  const prepend = useCallback(
    (key: string, data: any) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        setCache(key, [data, ...cache]);
      } else {
        setCache(key, [data]);
      }
    },
    [cacheState, setCache]
  );

  /**
   * Updates an item if it exists, or prepends it if it doesn't
   */
  const updateOrPrepend = useCallback(
    (key: string, data: any) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        const dataId = getItemId(data);
        const index = cache.findIndex((item: any) => getItemId(item) === dataId);
        if (index !== -1) {
          const updated = [...cache];
          updated[index] = { ...updated[index], ...data };
          setCache(key, updated);
        } else {
          setCache(key, [data, ...cache]);
        }
      } else {
        setCache(key, [data]);
      }
    },
    [cacheState, setCache]
  );

  /**
   * Appends data to the end of a cached array
   */
  const append = useCallback(
    (key: string, data: any) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        setCache(key, [...cache, data]);
      } else {
        setCache(key, [data]);
      }
    },
    [cacheState, setCache]
  );

  /**
   * Deletes an item from a cached array
   */
  const deleteItem = useCallback(
    (key: string, id: string) => {
      const cache = cacheState[key];
      if (Array.isArray(cache)) {
        setCache(key, cache.filter((item: any) => getItemId(item) !== id));
      }
    },
    [cacheState, setCache]
  );

  /**
   * Invalidates a specific cache entry
   */
  const invalidate = useCallback(
    (key: string) => {
      dispatch(actions.delete({ key }));
    },
    [dispatch]
  );

  /**
   * Invalidates all queries matching a pattern
   * @param pattern - String prefix or RegExp pattern
   */
  const invalidateQueries = useCallback(
    (pattern: string | RegExp) => {
      const regex =
        typeof pattern === "string" ? new RegExp(`^${pattern}`) : pattern;

      const keysToInvalidate = Object.keys(cacheState).filter((k) =>
        regex.test(k)
      );

      keysToInvalidate.forEach((key) => {
        dispatch(actions.delete({ key }));
      });
    },
    [cacheState, dispatch]
  );

  /**
   * Invalidates all cache entries
   */
  const invalidateAll = useCallback(() => {
    dispatch(actions.clear());
  }, [dispatch]);

  return {
    getItem,
    setCache,
    getKey,
    getContext,
    getData,
    update,
    updateValue,
    updateValues,
    updateItem,
    deleteItem,
    prepend,
    append,
    updateOrPrepend,
    invalidate,
    invalidateQueries,
    invalidateAll,
  };
};

export default useCache;
