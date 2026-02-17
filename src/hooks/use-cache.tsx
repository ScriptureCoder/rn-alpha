import { useCallback } from "react";
import { useApp } from "store/contexts/app-context";
import useDispatch from "./use-dispatch";
import { actions } from "store/reducers/cache-reducer";
import { Route } from "types";
import { parseRoute } from "hooks/utils";
import { CacheOperations } from "./types";
import {NetworkPolicy} from "hooks/constants";
import {store} from "store/index";

/**
 * Helper function to get the ID from an item
 * Checks both _id (MongoDB) and id (standard) fields
 */
const getItemId = (item: any, idRef?:string): string | undefined => {
    return item[idRef] || item?._id || item?.id;
};

/**
 * Custom hook for cache operations
 * Provides functions to get, set, and manipulate cached data
 * @returns CacheOperations interface with all cache manipulation functions
 */
const useCache = (): CacheOperations => {
    const dispatch = useDispatch();
    const { auth: { userId } } = useApp();
    // const cacheState = useSelector((state) => state.cache);

    /**
     * Parses a route and generates cache key with context
     */
    const getContext = useCallback(
        (route: Route, variables?: Record<string, any>, networkPolicy?: NetworkPolicy) => {
            return parseRoute(route, variables, userId, networkPolicy);
        },
        [userId]
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
            const cacheState = store.getState().cache;
            return cacheState[key]?.data;
        },
        []
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
        (key: string, id: string, value: any, idRef?:string) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (Array.isArray(cache)) {
                const index = cache.findIndex((item: any) => getItemId(item, idRef) === id);
                if (index !== -1) {
                    const updated = [...cache];
                    updated[index] = { ...updated[index], ...value };
                    setCache(key, updated);
                }
            }
        },
        [setCache]
    );

    /**
     * Gets a single item from a cached array
     */
    const getItem = useCallback(
        (key: string, id: string, idRef?:string) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (Array.isArray(cache)) {
                return cache.find((item: any) => getItemId(item, idRef) === id);
            }
            return undefined;
        },
        []
    );

    /**
     * Updates a single property in a cached object
     */
    const updateValue = useCallback(
        (key: string, arg: string, value: any) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (!Array.isArray(cache) && typeof cache === "object") {
                setCache(key, { ...cache, [arg]: value });
            }
        },
        [setCache]
    );

    /**
     * Updates multiple properties in a cached object
     */
    const updateValues = useCallback(
        (key: string, values: Record<string, any>) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (!Array.isArray(cache) && typeof cache === "object") {
                setCache(key, { ...cache, ...values });
            }
        },
        [setCache]
    );

    /**
     * Prepends data to the beginning of a cached array
     */
    const prepend = useCallback(
        (key: string, data: any) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (Array.isArray(cache)) {
                dispatch(actions.prepend({ key, value:data }));
            } else {
                setCache(key, [data]);
            }
        },
        [setCache]
    );

    /**
     * Updates an item if it exists, or prepends it if it doesn't
     */
    const updateOrPrepend = useCallback(
        (key: string, data: any, idRef?:string) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (Array.isArray(cache)) {
                const dataId = getItemId(data, idRef);
                const index = cache.findIndex((item: any) => getItemId(item, idRef) === dataId);
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
        [setCache]
    );

    /**
     * Appends data to the end of a cached array
     */
    const append = useCallback(
        (key: string, data: any) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (Array.isArray(cache)) {
                dispatch(actions.append({ key, value:data }));
            } else {
                setCache(key, [data]);
            }
        },
        [setCache]
    );

    /**
     * Deletes an item from a cached array
     */
    const deleteItem = useCallback(
        (key: string, id: string, idRef?:string) => {
            const cacheState = store.getState().cache;
            const cache = cacheState[key]?.data;
            if (Array.isArray(cache)) {
                setCache(key, cache.filter((item: any) => getItemId(item, idRef) !== id));
            }
        },
        [setCache]
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

            const cacheState = store.getState().cache;
            const keysToInvalidate = Object.keys(cacheState).filter((k) =>
                regex.test(k)
            );

            keysToInvalidate.forEach((key) => {
                dispatch(actions.delete({ key }));
            });
        },
        [dispatch]
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
