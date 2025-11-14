import { configureStore, combineReducers, Reducer } from '@reduxjs/toolkit';
import AlphaStorage from '../utils/storage';
import cacheReducer from './reducers/cache-reducer';
import threadReducer from './reducers/thread-reducer';
import appReducer from './reducers/app-reducer';

/**
 * Custom reducers that apps can provide
 */
export interface CustomReducers {
  [key: string]: Reducer<any>;
}

/**
 * Store configuration options
 */
export interface StoreOptions {
  /** Enable state persistence to local storage */
  persist?: boolean;
  /** Custom storage key for persistence */
  storageKey?: string;
}

/**
 * Save state to local storage
 */
const saveToLocalStorage = (state: any, key: string) => {
  try {
    AlphaStorage.setItem(key, state);
  } catch (e) {
    console.error('[AlphaStore] Failed to save state:', e);
  }
};

/**
 * Load state from local storage
 */
const loadFromLocalStorage = (key: string) => {
  try {
    const serializedState = AlphaStorage.getItem(key);
    if (serializedState === null) return undefined;
    return serializedState;
  } catch (e) {
    console.warn('[AlphaStore] Failed to load state:', e);
    return undefined;
  }
};

/**
 * Creates a Redux store with core reducers + custom app reducers
 * @param customReducers - Additional reducers for app-specific state
 * @param options - Store configuration options
 * 
 * @example
 * // Basic usage
 * const store = createAlphaStore();
 * 
 * @example
 * // With custom reducers
 * const store = createAlphaStore({
 *   settings: settingsReducer,
 *   theme: themeReducer,
 * });
 * 
 * @example
 * // With persistence
 * const store = createAlphaStore(customReducers, { 
 *   persist: true,
 *   storageKey: 'my-app-state'
 * });
 */
export function createAlphaStore<T extends CustomReducers = {}>(
  customReducers?: T,
  options: StoreOptions = {}
) {
  const {
    persist = true,
    storageKey = '_alpha_state',
  } = options;

  // Combine core and custom reducers
  const rootReducer = combineReducers({
    // Core reducers (always included)
    cache: cacheReducer,
    thread: threadReducer,
    app: appReducer,
    // Custom app reducers
    ...customReducers,
  });

  // Load persisted state if enabled
  const preloadedState = persist 
    ? loadFromLocalStorage(storageKey) as Partial<ReturnType<typeof rootReducer>>
    : undefined;

  // Create store
  const store = configureStore({
    reducer: rootReducer as any, // Type assertion needed for dynamic reducer combination
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false, // Allow non-serializable values
      }),
  });

  // Subscribe to state changes for persistence
  if (persist) {
    store.subscribe(() => {
      saveToLocalStorage(store.getState(), storageKey);
    });
  }

  return store;
}

// Default store (backward compatibility)
export const defaultStore = createAlphaStore();

// Types
export type RootState<T extends CustomReducers = {}> = ReturnType<
  ReturnType<typeof createAlphaStore<T>>['getState']
>;

export type AppDispatch = ReturnType<typeof createAlphaStore>['dispatch'];

