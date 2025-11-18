import React, { useState } from 'react';
import { View, Button, Text, Switch, StyleSheet } from 'react-native';
import {
  AlphaProvider,
  useAlphaConfig,
  useQuery,
  useMutation,
} from '@scripturecoder/rn-alpha-hooks';

/**
 * ========================================
 * DYNAMIC CONFIGURATION EXAMPLES
 * ========================================
 * 
 * The useAlphaConfig() hook returns a tuple [config, setConfig]
 * similar to useState, allowing you to read and update configuration
 * from any child component.
 */

/**
 * Example 1: Environment Switcher
 * Switch between dev, staging, and production environments
 */
function EnvironmentSwitcher() {
  const [config, setConfig] = useAlphaConfig();

  const environments = {
    dev: 'https://dev-api.example.com',
    staging: 'https://staging-api.example.com',
    prod: 'https://api.example.com',
  };

  const switchEnvironment = (env: keyof typeof environments) => {
    setConfig({
      baseUrl: environments[env],
      debug: env === 'dev', // Enable debug in dev
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Environment: {config.baseUrl}</Text>
      <View style={styles.buttonGroup}>
        <Button title="Dev" onPress={() => switchEnvironment('dev')} />
        <Button title="Staging" onPress={() => switchEnvironment('staging')} />
        <Button title="Production" onPress={() => switchEnvironment('prod')} />
      </View>
    </View>
  );
}

/**
 * Example 2: Toggle Encryption
 * Enable/disable encryption dynamically
 */
function EncryptionToggle() {
  const [config, setConfig] = useAlphaConfig();
  const isEncrypted = config.defaultEncryption !== false;

  const toggleEncryption = (enabled: boolean) => {
    setConfig({
      defaultEncryption: enabled
        ? {
            request: ['password', 'pin'],
            response: ['token', 'ssn'],
          }
        : false,
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Encryption</Text>
      <View style={styles.row}>
        <Text>Encrypted: {isEncrypted ? 'ON' : 'OFF'}</Text>
        <Switch value={isEncrypted} onValueChange={toggleEncryption} />
      </View>
    </View>
  );
}

/**
 * Example 3: Debug Mode Toggle
 * Enable/disable debug logging
 */
function DebugToggle() {
  const [config, setConfig] = useAlphaConfig();

  const toggleDebug = (enabled: boolean) => {
    setConfig({ debug: enabled });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Debug Mode</Text>
      <View style={styles.row}>
        <Text>Debug: {config.debug ? 'ON' : 'OFF'}</Text>
        <Switch value={config.debug} onValueChange={toggleDebug} />
      </View>
    </View>
  );
}

/**
 * Example 4: Timeout Configuration
 * Adjust request timeout dynamically
 */
function TimeoutControl() {
  const [config, setConfig] = useAlphaConfig();

  const timeouts = [10000, 30000, 60000, 120000];

  const setTimeout = (timeout: number) => {
    setConfig({ timeout });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Request Timeout: {config.timeout}ms</Text>
      <View style={styles.buttonGroup}>
        {timeouts.map(timeout => (
          <Button
            key={timeout}
            title={`${timeout / 1000}s`}
            onPress={() => setTimeout(timeout)}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * Example 5: Cache Size Configuration
 * Adjust max cache size dynamically
 */
function CacheSizeControl() {
  const [config, setConfig] = useAlphaConfig();

  const sizes = [50, 100, 200, 500];

  const setCacheSize = (maxSize: number) => {
    setConfig({
      cache: {
        ...config.cache,
        maxSize,
      },
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        Cache Size: {config.cache?.maxSize || 100}
      </Text>
      <View style={styles.buttonGroup}>
        {sizes.map(size => (
          <Button
            key={size}
            title={`${size}`}
            onPress={() => setCacheSize(size)}
          />
        ))}
      </View>
    </View>
  );
}

/**
 * Example 6: Network Policy Configuration
 * Change default network policy
 */
function NetworkPolicyControl() {
  const [config, setConfig] = useAlphaConfig();

  const policies = [
    'cache-first',
    'network-only',
    'cache-only',
    'stale-while-revalidate',
  ] as const;

  const setPolicy = (policy: typeof policies[number]) => {
    setConfig({ defaultNetworkPolicy: policy });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        Network Policy: {config.defaultNetworkPolicy}
      </Text>
      <View style={styles.buttonGroup}>
        {policies.map(policy => (
          <Button key={policy} title={policy} onPress={() => setPolicy(policy)} />
        ))}
      </View>
    </View>
  );
}

/**
 * Example 7: Feature Flags via Config
 * Use config for feature flags
 */
function FeatureFlags() {
  const [config, setConfig] = useAlphaConfig();

  // Custom config fields for feature flags
  const customConfig = config as any;

  const toggleFeature = (feature: string, enabled: boolean) => {
    setConfig({
      ...config,
      [feature]: enabled,
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Feature Flags</Text>
      <View style={styles.row}>
        <Text>New UI</Text>
        <Switch
          value={customConfig.newUI}
          onValueChange={enabled => toggleFeature('newUI', enabled)}
        />
      </View>
      <View style={styles.row}>
        <Text>Beta Features</Text>
        <Switch
          value={customConfig.betaFeatures}
          onValueChange={enabled => toggleFeature('betaFeatures', enabled)}
        />
      </View>
    </View>
  );
}

/**
 * Example 8: Testing Different API Versions
 * Switch between API versions
 */
function ApiVersionControl() {
  const [config, setConfig] = useAlphaConfig();

  const setApiVersion = (version: string) => {
    setConfig({
      baseUrl: `https://api.example.com/${version}`,
      headers: {
        ...config.headers,
        'X-API-Version': version,
      },
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>API Version</Text>
      <View style={styles.buttonGroup}>
        <Button title="v1" onPress={() => setApiVersion('v1')} />
        <Button title="v2" onPress={() => setApiVersion('v2')} />
        <Button title="v3" onPress={() => setApiVersion('v3')} />
      </View>
    </View>
  );
}

/**
 * Example 9: Read-Only Config Access
 * Only need to read config, not update it
 */
function ConfigDisplay() {
  const [config] = useAlphaConfig(); // Ignore setter

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Current Configuration</Text>
      <Text>Base URL: {config.baseUrl}</Text>
      <Text>Timeout: {config.timeout}ms</Text>
      <Text>Debug: {config.debug ? 'ON' : 'OFF'}</Text>
      <Text>Cache Size: {config.cache?.maxSize || 100}</Text>
    </View>
  );
}

/**
 * Example 10: Write-Only Config Access
 * Only need to update config, not read it
 */
function QuickActions() {
  const [, setConfig] = useAlphaConfig(); // Ignore getter

  const resetToDefaults = () => {
    setConfig({
      baseUrl: 'https://api.example.com',
      timeout: 30000,
      debug: false,
      cache: { maxSize: 100 },
    });
  };

  const enableDevMode = () => {
    setConfig({
      baseUrl: 'https://dev-api.example.com',
      debug: true,
      timeout: 60000,
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Quick Actions</Text>
      <Button title="Reset to Defaults" onPress={resetToDefaults} />
      <Button title="Enable Dev Mode" onPress={enableDevMode} />
    </View>
  );
}

/**
 * Example 11: Conditional Rendering Based on Config
 * Use config to control UI behavior
 */
function ConditionalFeature() {
  const [config] = useAlphaConfig();

  const { data, loading } = useQuery('users');

  // Only show feature in debug mode
  if (!config.debug) {
    return null;
  }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Debug Feature</Text>
      <Text>This only shows in debug mode</Text>
      <Text>Data: {JSON.stringify(data, null, 2)}</Text>
    </View>
  );
}

/**
 * Example 12: Update Config Before Request
 * Change config and immediately make a request
 */
function DynamicRequest() {
  const [config, setConfig] = useAlphaConfig();
  const [mutate, { loading }] = useMutation('login');

  const loginToDifferentEnv = async (env: 'dev' | 'prod') => {
    // Update config
    setConfig({
      baseUrl: env === 'dev'
        ? 'https://dev-api.example.com'
        : 'https://api.example.com',
    });

    // Make request with new config
    // (next request will use updated baseUrl)
    await mutate({
      email: 'user@example.com',
      password: 'password',
    });
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Login to Environment</Text>
      <Button
        title="Login to Dev"
        onPress={() => loginToDifferentEnv('dev')}
        disabled={loading}
      />
      <Button
        title="Login to Prod"
        onPress={() => loginToDifferentEnv('prod')}
        disabled={loading}
      />
    </View>
  );
}

/**
 * Example 13: Persistent Config Updates
 * Save config changes to storage (requires custom implementation)
 */
function PersistentConfigControl() {
  const [config, setConfig] = useAlphaConfig();

  const updateAndSave = async (updates: Partial<typeof config>) => {
    setConfig(updates);
    // Save to storage
    // await AsyncStorage.setItem('appConfig', JSON.stringify(updates));
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Persistent Settings</Text>
      <Button
        title="Save Dark Mode Preference"
        onPress={() => updateAndSave({ debug: true })}
      />
    </View>
  );
}

/**
 * Main App Component
 * Demonstrates all dynamic config examples
 */
export default function DynamicConfigExamples() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        timeout: 30000,
        debug: false,
        paths: {
          users: 'GET:/users',
          login: 'POST:/auth/login',
        },
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Dynamic Config Examples</Text>
        
        <EnvironmentSwitcher />
        <EncryptionToggle />
        <DebugToggle />
        <TimeoutControl />
        <CacheSizeControl />
        <NetworkPolicyControl />
        <FeatureFlags />
        <ApiVersionControl />
        <ConfigDisplay />
        <QuickActions />
        <ConditionalFeature />
        <DynamicRequest />
        <PersistentConfigControl />
      </View>
    </AlphaProvider>
  );
}

/**
 * ========================================
 * USAGE PATTERNS
 * ========================================
 */

/**
 * Pattern 1: Read and Write
 */
function Pattern1() {
  const [config, setConfig] = useAlphaConfig();
  
  return (
    <Button
      title="Change Base URL"
      onPress={() => setConfig({ baseUrl: 'https://new-api.com' })}
    />
  );
}

/**
 * Pattern 2: Read Only
 */
function Pattern2() {
  const [config] = useAlphaConfig();
  
  return <Text>{config.baseUrl}</Text>;
}

/**
 * Pattern 3: Write Only
 */
function Pattern3() {
  const [, setConfig] = useAlphaConfig();
  
  return (
    <Button
      title="Reset"
      onPress={() => setConfig({ baseUrl: 'https://api.example.com' })}
    />
  );
}

/**
 * Pattern 4: Partial Updates
 */
function Pattern4() {
  const [, setConfig] = useAlphaConfig();
  
  // Only update specific fields
  const updateTimeout = () => {
    setConfig({ timeout: 60000 }); // Other fields unchanged
  };

  // Update nested fields
  const updateCacheSize = () => {
    setConfig({
      cache: { maxSize: 200 }, // Merges with existing cache config
    });
  };

  return <View />;
}

/**
 * Pattern 5: Multiple Updates
 */
function Pattern5() {
  const [, setConfig] = useAlphaConfig();
  
  const setupForProduction = () => {
    setConfig({
      baseUrl: 'https://api.example.com',
      debug: false,
      timeout: 30000,
      defaultEncryption: {
        request: ['password'],
        response: ['token'],
      },
    });
  };

  return <Button title="Setup for Production" onPress={setupForProduction} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  section: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

