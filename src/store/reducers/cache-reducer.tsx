import {createSlice, PayloadAction} from "@reduxjs/toolkit";

/**
 * Cache entry structure with TTL support
 */
export interface CacheEntry {
  data: any;
  timestamp: number;
  expiresAt?: number;
  staleAt?: number;
}

export interface CacheState {
  [key: string]: CacheEntry | any; // any for backward compatibility
}

export interface CacheMetadata {
  accessOrder: string[];
  maxSize: number;
}

// Separate metadata state (not serialized in Redux)
const metadata: CacheMetadata = {
  accessOrder: [],
  maxSize: 100, // Default LRU limit
};

const initialState: CacheState = {};

const cacheSlice = createSlice({
    name: 'cache',
    initialState,
    reducers: {
        init(state, action: PayloadAction<any>) {
            state[action.payload.key] = {
                ...(state[action.payload.key]||{}),
                ...action.payload.value,
            }
        },
        set(state, action: PayloadAction<{ key:string, value:any, ttl?:number, staleTime?:number }>) {
            const timestamp = Date.now();
            const { key, value, ttl, staleTime } = action.payload;

            // Update LRU access order
            updateAccessOrder(state, key);

            // Create cache entry with TTL support
            const entry: CacheEntry = {
              data: value,
              timestamp,
              expiresAt: ttl ? timestamp + ttl : undefined,
              staleAt: staleTime !== undefined ? timestamp + staleTime : undefined,
            };
            state[key] = entry;
        },
        prepend(state, action: PayloadAction<{ key:string, value:any, ttl?:number, staleTime?:number }>) {
            const timestamp = Date.now();
            const { key, value, ttl, staleTime } = action.payload;

            updateAccessOrder(state, key);

            const entry = state[key];
            // const existingData = extractCacheData(existingEntry);
            const incomingData = normalizeToArray(value);
            // const currentData = normalizeToArray(existingData);
            // const { expiresAt, staleAt } = calculateExpiry(existingEntry, timestamp, ttl, staleTime);
            state[key] = {
              ...(entry || {}),
              data: [...incomingData, ...(entry.data || [])],
              timestamp,
            };
        },
        append(state, action: PayloadAction<{ key:string, value:any, ttl?:number, staleTime?:number }>) {
            const timestamp = Date.now();
            const { key, value, ttl, staleTime } = action.payload;

            updateAccessOrder(state, key);

            const entry = state[key];
            // const existingData = extractCacheData(existingEntry);
            const incomingData = normalizeToArray(value);
            // const currentData = normalizeToArray(existingData);
            // const { expiresAt, staleAt } = calculateExpiry(existingEntry, timestamp, ttl, staleTime);

            state[key] = {
                ...(entry||{}),
                data: [...(entry.data||[]), ...incomingData],
                timestamp,
                // expiresAt,
                // staleAt,
            };
        },
        paginate(state, action: PayloadAction<{ key:string, data:any, paginationKey:string, ttl?:number, staleTime?:number }>) {
            const timestamp = Date.now();
            const { key, data, paginationKey, ttl, staleTime } = action.payload;

            updateAccessOrder(state, key);

            const existingEntry = state[key];
            const existingData = extractCacheData(existingEntry);
            const baseData = existingData && typeof existingData === 'object' ? existingData : {};

            const existingPage = normalizeToArray(baseData[paginationKey]);
            const incomingPage = normalizeToArray(data?.[paginationKey]);
            const mergedData = {
                ...baseData,
                ...(data || {}),
                [paginationKey]: [...existingPage, ...incomingPage],
            };

            const { expiresAt, staleAt } = calculateExpiry(existingEntry, timestamp, ttl, staleTime);

            state[key] = {
                data: mergedData,
                timestamp,
                expiresAt,
                staleAt,
            };
        },
        remove(state, action: PayloadAction<string>) {
            delete state[action.payload];
            /*const spr:any = {...state}
            delete spr[action.payload];
            state = spr*/
        },
        clear:()=> initialState,

        // New action to delete a specific cache entry
        delete(state, action: PayloadAction<{ key:string }>) {
            const { key } = action.payload;
            delete state[key];
            // Remove from access order
            const index = metadata.accessOrder.indexOf(key);
            if (index > -1) {
                metadata.accessOrder.splice(index, 1);
            }
        },

    },
});

function isCacheEntry(entry: CacheEntry | any): entry is CacheEntry {
    return !!entry && typeof entry === 'object' && 'data' in entry && 'timestamp' in entry;
}

function extractCacheData(entry: CacheEntry | any): any {
    return isCacheEntry(entry) ? entry.data : entry;
}

function normalizeToArray(value: any): any[] {
    if (value === undefined || value === null) {
        return [];
    }
    return Array.isArray(value) ? value : [value];
}

function calculateExpiry(existingEntry: CacheEntry | any, timestamp: number, ttl?: number, staleTime?: number) {
    const existingTtlDuration =
        isCacheEntry(existingEntry) && existingEntry.expiresAt !== undefined
            ? existingEntry.expiresAt - existingEntry.timestamp
            : undefined;

    const existingStaleDuration =
        isCacheEntry(existingEntry) && existingEntry.staleAt !== undefined
            ? existingEntry.staleAt - existingEntry.timestamp
            : undefined;

    return {
        expiresAt:
            ttl !== undefined
                ? timestamp + ttl
                : existingTtlDuration !== undefined
                    ? timestamp + existingTtlDuration
                    : undefined,
        staleAt:
            staleTime !== undefined
                ? timestamp + staleTime
                : existingStaleDuration !== undefined
                    ? timestamp + existingStaleDuration
                    : undefined,
    };
}

/**
 * Updates LRU access order and evicts if necessary
 */
function updateAccessOrder(state: CacheState, key: string) {
  // Remove key if it exists
  const index = metadata.accessOrder.indexOf(key);
  if (index > -1) {
    metadata.accessOrder.splice(index, 1);
  }

  // Add to end (most recent)
  metadata.accessOrder.push(key);

  // Evict oldest if over limit
  if (metadata.accessOrder.length > metadata.maxSize) {
    const evictKey = metadata.accessOrder.shift();
    if (evictKey) {
      delete state[evictKey];
    }
  }
}

/**
 * Set the maximum cache size for LRU eviction
 */
export function setMaxCacheSize(size: number) {
  metadata.maxSize = size;
}

/**
 * Get current cache metadata (for debugging)
 */
export function getCacheMetadata(): Readonly<CacheMetadata> {
  return { ...metadata };
}

export const actions = cacheSlice.actions;
export default cacheSlice.reducer;
