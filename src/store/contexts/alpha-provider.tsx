import React, { ReactNode, useMemo, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Store } from '@reduxjs/toolkit';
import AppProvider from './app-context';
import ConfigProvider from './config-context';
import { AlphaConfig } from '../../config';
import { createAlphaStore, CustomReducers, StoreOptions, defaultStore } from '../create-store';
import { setHttpConfig } from '../../utils/service';
import { setMaxCacheSize } from '../reducers/cache-reducer';
import { setEncryptionConfig } from '../../utils/crypto';

interface AlphaProviderProps {
  children: ReactNode;
  config: AlphaConfig;
  /** Custom reducers to add to the store (e.g., theme, settings) */
  customReducers?: CustomReducers;
  /** Provide a completely custom store (overrides customReducers) */
  store?: Store;
  /** Store configuration options */
  storeOptions?: StoreOptions;
}

/**
 * Root provider for rn-alpha package
 * Wraps your app with Redux, Config, and App contexts
 * Now supports custom reducers and store configuration
 * 
 * @example
 * // Basic usage
 * ```typescript
 * <AlphaProvider config={{
 *   baseUrl: 'https://api.example.com',
 *   paths: { login: 'POST:/auth/login' },
 *   debug: __DEV__,
 * }}>
 *   <App />
 * </AlphaProvider>
 * ```
 * 
 * @example
 * // With custom reducers
 * ```typescript
 * const settingsSlice = createSlice({
 *   name: 'settings',
 *   initialState: { theme: 'light' },
 *   reducers: { setTheme: (state, action) => { state.theme = action.payload; } }
 * });
 * 
 * <AlphaProvider 
 *   config={{ baseUrl: 'https://api.example.com' }}
 *   customReducers={{ settings: settingsSlice.reducer }}
 * >
 *   <App />
 * </AlphaProvider>
 * ```
 * 
 * @example
 * // With store options
 * ```typescript
 * <AlphaProvider 
 *   config={{ baseUrl: 'https://api.example.com' }}
 *   storeOptions={{ persist: true, storageKey: 'my-app-state' }}
 * >
 *   <App />
 * </AlphaProvider>
 * ```
 */
export const AlphaProvider: React.FC<AlphaProviderProps> = ({ 
  children, 
  config,
  customReducers,
  store: customStore,
  storeOptions,
}) => {
  // Create store with custom reducers or use provided store
  const store = useMemo(() => {
    if (customStore) return customStore;
    if (customReducers) return createAlphaStore(customReducers, storeOptions);
    return defaultStore;
  }, [customStore, customReducers, storeOptions]);

  // Initialize HTTP client, cache settings, and encryption config
  useEffect(() => {
    setHttpConfig(config);
    
    if (config.cache?.maxSize) {
      setMaxCacheSize(config.cache.maxSize);
    }
    
    // Initialize encryption config if provided
    if (config.encryption) {
      setEncryptionConfig(config.encryption);
    }
  }, [config]);

  return (
    <Provider store={store}>
      <ConfigProvider config={config}>
        <AppProvider>
          {children}
        </AppProvider>
      </ConfigProvider>
    </Provider>
  );
};

export default AlphaProvider;

