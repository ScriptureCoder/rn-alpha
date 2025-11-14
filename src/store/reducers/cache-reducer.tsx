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
        prepend(state, action: PayloadAction<{ key:string, value:any[] }>) {
            const timestamp = new Date().getTime()
            state[action.payload.key] = action.payload.value.map((data:any)=>({...data, timestamp})).concat(state[action.payload.key]||[])
        },
        append(state, action: PayloadAction<{ key:string, value:any[] }>) {
            const timestamp = new Date().getTime()
            state[action.payload.key] = (state[action.payload.key]||[]).concat(action.payload.value.map((data:any)=>({...data, timestamp})))
        },
        paginate(state, action: PayloadAction<{ key:string, data:any, paginationKey:string }>) {
            const timestamp = new Date().getTime()
            const {key, data, paginationKey} = action.payload
            state[key] = {
                ...data,
                [paginationKey]: [...state[key][paginationKey], ...data[paginationKey]],
                timestamp
            }
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
