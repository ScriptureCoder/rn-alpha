import React, { createContext, useContext, useMemo, ReactNode, useEffect, useState, useCallback } from 'react';
import { AlphaConfig, DEFAULT_CONFIG } from '../../config';
import { setMaxCacheSize } from '../reducers/cache-reducer';
import { enableGlobalDebug, disableGlobalDebug } from 'hooks/utils/debug-logger';
import { setHttpConfig } from 'utils/service';
import { setEncryptionConfig } from 'utils/crypto';

interface ConfigContextType {
    config: AlphaConfig;
    updateConfig: (newConfig: Partial<AlphaConfig>) => void;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

interface ConfigProviderProps {
    config: AlphaConfig;
    children: ReactNode;
}

/**
 * Configuration Provider
 * Manages and distributes Alpha configuration throughout the app
 * Supports dynamic config updates via updateConfig function
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ config: initialConfig, children }) => {
    // Initialize with merged config
    const [internalConfig, setInternalConfig] = useState<AlphaConfig>(() => ({
        ...DEFAULT_CONFIG,
        ...initialConfig,
        cache: {
            ...DEFAULT_CONFIG.cache,
            ...initialConfig.cache,
        },
        retry: {
            ...DEFAULT_CONFIG.retry,
            ...initialConfig.retry,
        },
    }));

    // Update internal config when prop changes (allows parent control)
    useEffect(() => {
        setInternalConfig(prev => ({
            ...prev,
            ...initialConfig,
            cache: {
                ...prev.cache,
                ...initialConfig.cache,
            },
            retry: {
                ...prev.retry,
                ...initialConfig.retry,
            },
        }));
    }, [initialConfig]);

    // Function to update config dynamically from child components
    const updateConfig = useCallback((newConfig: Partial<AlphaConfig>) => {
        setInternalConfig(prev => {
            const updated: AlphaConfig = {
                ...prev,
                ...newConfig,
            };

            // Deep merge nested objects
            if (newConfig.cache !== undefined) {
                updated.cache = {
                    ...prev.cache,
                    ...newConfig.cache,
                };
            }

            if (newConfig.retry !== undefined) {
                updated.retry = {
                    ...prev.retry,
                    ...newConfig.retry,
                };
            }

            // Handle encryption config explicitly
            if (newConfig.encryption !== undefined) {
                updated.encryption = newConfig.encryption;
            }

            // Handle defaultEncryption explicitly
            if (newConfig.defaultEncryption !== undefined) {
                updated.defaultEncryption = newConfig.defaultEncryption;
            }

            return updated;
        });
    }, []);

    // Apply cache max size
    useEffect(() => {
        if (internalConfig.cache?.maxSize) {
            setMaxCacheSize(internalConfig.cache.maxSize);
        }
    }, [internalConfig.cache?.maxSize]);

    // Apply debug mode
    useEffect(() => {
        if (internalConfig.debug) {
            enableGlobalDebug();
        } else {
            disableGlobalDebug();
        }
    }, [internalConfig.debug]);

    // Update HTTP client when config changes
    useEffect(() => {
        setHttpConfig(internalConfig);
    }, [internalConfig]);

    // Update encryption config when it changes
    useEffect(() => {
        if (internalConfig.encryption) {
            setEncryptionConfig(internalConfig.encryption);
        }
    }, [internalConfig.encryption]);

    const value = useMemo(
        () => ({ config: internalConfig, updateConfig }),
        [internalConfig, updateConfig]
    );

    return <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>;
};

/**
 * Hook to access and update Alpha configuration
 * Returns a tuple [config, setConfig] similar to useState
 *
 * @example
 * ```typescript
 * // Read and write
 * const [config, setConfig] = useAlphaConfig();
 * setConfig({ baseUrl: 'https://new-api.com' });
 *
 * // Read only
 * const [config] = useAlphaConfig();
 *
 * // Write only
 * const [, setConfig] = useAlphaConfig();
 * ```
 *
 * @returns Tuple of [config, updateConfig function]
 */
export function useAlphaConfig(): [AlphaConfig, (config: Partial<AlphaConfig>) => void] {
    const context = useContext(ConfigContext);

    if (!context) {
        // Return defaults with no-op setter if used outside provider
        const noopSetter = () => {
            console.warn('[rn-alpha-hooks] useAlphaConfig: Cannot update config outside AlphaProvider');
        };
        return [DEFAULT_CONFIG, noopSetter];
    }

    return [context.config, context.updateConfig];
}

export default ConfigProvider;

