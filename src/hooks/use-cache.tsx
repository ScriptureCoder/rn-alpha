import { useCallback } from "react";
import { useApp } from "../store/contexts/app-context";
import useDispatch from "./use-dispatch";
import useSelector from "./use-selector";
import { actions } from "../store/reducers/cache-reducer";
import { Route } from "../types";
import { parseRoute } from "./utils/route-parser";
import { CacheOperations } from "./types";

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
        const index = cache.findIndex((item: any) => item._id === id);
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
        return cache.find((item: any) => item._id === id);
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
        const index = cache.findIndex((item: any) => item._id === data._id);
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
        setCache(key, cache.filter((item: any) => item._id !== id));
      }
    },
    [cacheState, setCache]
  );

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
  };
};

export default useCache;
