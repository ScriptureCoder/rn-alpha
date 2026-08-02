import React, { createContext, useContext, useMemo, ReactNode, useEffect, useState, useCallback, useRef } from 'react';
import { AlphaConfig, DEFAULT_CONFIG } from '../../config';
import { setMaxCacheSize } from 'store/reducers';
import { enableGlobalDebug, disableGlobalDebug } from 'hooks/utils/debug-logger';
import { setHttpConfig } from 'utils/service';
import { setEncryptionConfig } from 'utils/crypto';
import { logger, setLoggerDebugMode } from 'utils/logger';

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
 * Merge a partial config over a base config, deep-merging nested objects.
 */
const mergeConfig = (base: AlphaConfig, incoming: Partial<AlphaConfig>): AlphaConfig => {
    const merged: AlphaConfig = {
        ...base,
        ...incoming,
    };

    if (incoming.cache !== undefined) {
        merged.cache = {
            ...base.cache,
            ...incoming.cache,
        };
    }

    if (incoming.retry !== undefined) {
        merged.retry = {
            ...base.retry,
            ...incoming.retry,
        };
    }

    return merged;
};

/**
 * Configuration Provider
 * Manages and distributes Alpha configuration throughout the app
 * Supports dynamic config updates via updateConfig function
 */
export const ConfigProvider: React.FC<ConfigProviderProps> = ({ config: initialConfig, children }) => {
    // Mirrors internalConfig, but updated synchronously so the HTTP client and
    // crypto module never lag behind a setConfig() call. React state updates are
    // async and child effects run before parent effects, so relying on state or
    // useEffect alone lets a screen fire requests before its auth headers and
    // encryption keys have been applied.
    const configRef = useRef<AlphaConfig | null>(null);

    // Push config into the HTTP client and crypto module immediately.
    const applyConfig = useCallback((cfg: AlphaConfig) => {
        configRef.current = cfg;
        setHttpConfig(cfg);
        if (cfg.encryption) {
            setEncryptionConfig(cfg.encryption);
        }
    }, []);

    // Initialize with merged config, applying it during the first render so the
    // very first request already carries it.
    const [internalConfig, setInternalConfig] = useState<AlphaConfig>(() => {
        const merged = mergeConfig(
            {
                ...DEFAULT_CONFIG,
                cache: { ...DEFAULT_CONFIG.cache },
                retry: { ...DEFAULT_CONFIG.retry },
            },
            initialConfig
        );
        applyConfig(merged);
        return merged;
    });

    // Update internal config when prop changes (allows parent control)
    useEffect(() => {
        const updated = mergeConfig(configRef.current ?? DEFAULT_CONFIG, initialConfig);
        applyConfig(updated);
        setInternalConfig(updated);
    }, [initialConfig, applyConfig]);

    // Function to update config dynamically from child components.
    // Applies synchronously, so callers may navigate immediately afterwards.
    const updateConfig = useCallback((newConfig: Partial<AlphaConfig>) => {
        const updated = mergeConfig(configRef.current ?? DEFAULT_CONFIG, newConfig);
        applyConfig(updated);
        setInternalConfig(updated);
    }, [applyConfig]);

    // Apply cache max size
    useEffect(() => {
        if (internalConfig.cache?.maxSize) {
            setMaxCacheSize(internalConfig.cache.maxSize);
        }
    }, [internalConfig.cache?.maxSize]);

    // Apply debug mode
    useEffect(() => {
        setLoggerDebugMode(!!internalConfig.debug);
        if (internalConfig.debug) {
            enableGlobalDebug();
        } else {
            disableGlobalDebug();
        }
    }, [internalConfig.debug]);

    // NOTE: HTTP and encryption config are applied synchronously via
    // applyConfig() rather than in an effect — see configRef above.

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
            logger.warn('[rn-alpha-hooks] useAlphaConfig: Cannot update config outside AlphaProvider');
        };
        return [DEFAULT_CONFIG, noopSetter];
    }

    return [context.config, context.updateConfig];
}

export default ConfigProvider;

