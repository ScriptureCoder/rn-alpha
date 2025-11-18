import React from 'react';
import { View, Button, Text, StyleSheet } from 'react-native';
import {
  AlphaProvider,
  useQuery,
  useMutation,
  useQueryAsync,
  useMutationAsync,
} from '@scripturecoder/rn-alpha-hooks';

/**
 * ========================================
 * DATA PATH OVERRIDE EXAMPLES
 * ========================================
 * 
 * Demonstrates how to override the global dataPath configuration
 * on a per-query or per-mutation basis.
 */

/**
 * Example 1: Override dataPath in useQuery
 * Different endpoints may return data in different structures
 */
function QueryWithOverride() {
  // Global config: dataPath: 'data'
  // This query overrides to use 'result.items'
  const { data, loading } = useQuery('users', {
    dataPath: 'result.items', // Override global config
  });

  // API Response: { data: { result: { items: [...] } } }
  // Extracted: result.items

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Users Query</Text>
      <Text>Loading: {loading ? 'Yes' : 'No'}</Text>
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
}

/**
 * Example 2: Direct Response Override
 * Some endpoints return data directly without nesting
 */
function DirectResponseQuery() {
  // Override to get direct response (no extraction)
  const { data } = useQuery('publicData', {
    dataPath: '', // Empty string = direct res.data access
  });

  // API Response: { data: { id: 1, name: "John" } }
  // Extracted: { id: 1, name: "John" } (direct)

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Direct Response</Text>
      <Text>{JSON.stringify(data)}</Text>
    </View>
  );
}

/**
 * Example 3: Override in useMutation
 * Mutations can also override dataPath
 */
function MutationWithOverride() {
  const [login, { loading, data }] = useMutation('login', {
    dataPath: 'result.user', // Extract nested user object
  });

  const handleLogin = async () => {
    await login({
      email: 'user@example.com',
      password: 'password',
    });
    // Response: { data: { result: { user: {...} } } }
    // Extracted: result.user
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Login Mutation</Text>
      <Button title="Login" onPress={handleLogin} disabled={loading} />
      <Text>User: {JSON.stringify(data)}</Text>
    </View>
  );
}

/**
 * Example 4: Different Structures for Different Endpoints
 * Handle APIs with inconsistent response structures
 */
function MixedStructures() {
  // Endpoint 1: Standard structure (uses global dataPath: 'data')
  const { data: users } = useQuery('users');
  // Response: { data: { data: [...] } }
  // Extracted: data

  // Endpoint 2: Custom structure (override)
  const { data: products } = useQuery('products', {
    dataPath: 'payload.items',
  });
  // Response: { data: { payload: { items: [...] } } }
  // Extracted: payload.items

  // Endpoint 3: Direct response (override)
  const { data: stats } = useQuery('stats', {
    dataPath: '',
  });
  // Response: { data: { count: 100, total: 500 } }
  // Extracted: { count: 100, total: 500 }

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Mixed Structures</Text>
      <Text>Users: {users?.length || 0}</Text>
      <Text>Products: {products?.length || 0}</Text>
      <Text>Stats: {JSON.stringify(stats)}</Text>
    </View>
  );
}

/**
 * Example 5: useQueryAsync with Override
 * Async queries can also override dataPath
 */
function AsyncQueryWithOverride() {
  const queryAsync = useQueryAsync();

  const fetchCustomData = async () => {
    const result = await queryAsync(
      'customEndpoint',
      { id: '123' },
      {
        dataPath: 'data.result', // Override for this call
      }
    );

    // Response: { data: { data: { result: {...} } } }
    // Extracted: data.result

    console.log('Custom Data:', result.data);
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Async Query Override</Text>
      <Button title="Fetch Custom Data" onPress={fetchCustomData} />
    </View>
  );
}

/**
 * Example 6: useMutationAsync with Override
 * Async mutations can override dataPath
 */
function AsyncMutationWithOverride() {
  const [mutate] = useMutationAsync('POST:/api/upload', {
    dataPath: 'response.file', // Extract file info from nested response
  });

  const handleUpload = async () => {
    const result = await mutate({
      file: 'base64data...',
    });
    // Response: { data: { response: { file: {...} } } }
    // Extracted: response.file
  };

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Async Mutation Override</Text>
      <Button title="Upload" onPress={handleUpload} />
    </View>
  );
}

/**
 * Example 7: Nested Path Extraction
 * Extract deeply nested data
 */
function NestedPathExample() {
  const { data } = useQuery('complexData', {
    dataPath: 'data.result.items.list', // Deep nesting
  });

  // Response: { data: { data: { result: { items: { list: [...] } } } } }
  // Extracted: data.result.items.list

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Nested Path</Text>
      <Text>Items: {data?.length || 0}</Text>
    </View>
  );
}

/**
 * Example 8: Conditional dataPath
 * Use different paths based on conditions
 */
function ConditionalDataPath() {
  const [useCustomPath, setUseCustomPath] = React.useState(false);

  const { data } = useQuery('dynamicData', {
    dataPath: useCustomPath ? 'custom.path' : 'data', // Conditional override
  });

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Conditional Path</Text>
      <Button
        title={useCustomPath ? 'Use Standard Path' : 'Use Custom Path'}
        onPress={() => setUseCustomPath(!useCustomPath)}
      />
      <Text>Data: {JSON.stringify(data)}</Text>
    </View>
  );
}

/**
 * Example 9: Priority Demonstration
 * Shows that hook-level override takes precedence
 */
function PriorityExample() {
  // Global config: dataPath: 'data'
  // This query overrides to 'result'
  const { data } = useQuery('priority', {
    dataPath: 'result', // This takes priority over global config
  });

  // Even if global config is 'data', this query uses 'result'

  return (
    <View style={styles.section}>
      <Text style={styles.title}>Priority Example</Text>
      <Text>Uses 'result' path, not global 'data'</Text>
    </View>
  );
}

/**
 * Example 10: Real-World Scenario
 * Different API versions with different response structures
 */
function ApiVersionHandling() {
  // Old API version (uses global dataPath: 'data')
  const { data: oldData } = useQuery('v1/users');

  // New API version (override to new structure)
  const { data: newData } = useQuery('v2/users', {
    dataPath: 'response.data',
  });

  return (
    <View style={styles.section}>
      <Text style={styles.title}>API Version Handling</Text>
      <Text>Old API: {oldData?.length || 0} users</Text>
      <Text>New API: {newData?.length || 0} users</Text>
    </View>
  );
}

/**
 * Main App Component
 */
export default function DataPathOverrideExamples() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        dataPath: 'data', // Global default
        paths: {
          users: 'GET:/users',
          products: 'GET:/products',
          stats: 'GET:/stats',
          login: 'POST:/auth/login',
          customEndpoint: 'GET:/custom',
        },
      }}
    >
      <View style={styles.container}>
        <Text style={styles.header}>Data Path Override Examples</Text>
        
        <QueryWithOverride />
        <DirectResponseQuery />
        <MutationWithOverride />
        <MixedStructures />
        <AsyncQueryWithOverride />
        <AsyncMutationWithOverride />
        <NestedPathExample />
        <ConditionalDataPath />
        <PriorityExample />
        <ApiVersionHandling />
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
 * Pattern 1: Standard Override
 */
function Pattern1() {
  const { data } = useQuery('endpoint', {
    dataPath: 'custom.path',
  });
  return <View />;
}

/**
 * Pattern 2: Direct Response
 */
function Pattern2() {
  const { data } = useQuery('endpoint', {
    dataPath: '', // Empty string for direct access
  });
  return <View />;
}

/**
 * Pattern 3: Mutation Override
 */
function Pattern3() {
  const [mutate] = useMutation('endpoint', {
    dataPath: 'result',
  });
  return <View />;
}

/**
 * Pattern 4: Async Override
 */
function Pattern4() {
  const queryAsync = useQueryAsync();
  
  const fetch = async () => {
    await queryAsync('endpoint', {}, {
      dataPath: 'data.items',
    });
  };
  
  return <View />;
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
});

