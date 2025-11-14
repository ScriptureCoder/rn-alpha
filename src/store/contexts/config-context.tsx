import React, { createContext, useContext, useMemo, ReactNode, useEffect } from 'react';
import { AlphaConfig, DEFAULT_CONFIG } from '../../config';
import { setMaxCacheSize } from '../reducers/cache-reducer';
import { enableGlobalDebug, disableGlobalDebug } from '../../hooks/utils/debug-logger';
import { setHttpConfig } from '../../utils/service';

interface ConfigContextType {
  config: AlphaConfig;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
  config: AlphaConfig;
  children: ReactNode;
}

/**
 * Configuration Provider
 * Manages and distributes Alpha configuration throughout the app
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ config, children }) => {
  // Merge with defaults
  const mergedConfig = useMemo(
    () => ({
      ...DEFAULT_CONFIG,
      ...config,
      cache: {
        ...DEFAULT_CONFIG.cache,
        ...config.cache,
      },
      retry: {
        ...DEFAULT_CONFIG.retry,
        ...config.retry,
      },
    }),
    [config]
  );

  // Apply cache max size
  useEffect(() => {
    if (mergedConfig.cache?.maxSize) {
      setMaxCacheSize(mergedConfig.cache.maxSize);
    }
  }, [mergedConfig.cache?.maxSize]);

  // Apply debug mode
  useEffect(() => {
    if (mergedConfig.debug) {
      enableGlobalDebug();
    } else {
      disableGlobalDebug();
    }
  }, [mergedConfig.debug]);

  // Update HTTP client when config changes
  useEffect(() => {
    setHttpConfig(mergedConfig);
  }, [mergedConfig]);

  const value = useMemo(() => ({ config: mergedConfig }), [mergedConfig]);

  return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

/**
 * Hook to access Alpha configuration
 * @returns Current Alpha configuration
 */
export function useAlphaConfig(): AlphaConfig {
  const context = useContext(ConfigContext);
  if (!context) {
    // Return defaults if used outside provider
    return DEFAULT_CONFIG;
  }
  return context.config;
}

export default ConfigProvider;

