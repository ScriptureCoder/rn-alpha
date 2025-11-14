# Configuration Guide

## Quick Start

Wrap your app with `AlphaProvider` and pass configuration as props:

```typescript
import { AlphaProvider } from '@scripturecoder/rn-alpha';

function App() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        paths: {
          login: 'POST:/auth/login',
          users: 'GET:/users',
          getUser: 'GET:/users/:id',
        },
      }}
    >
      {/* Your app components */}
    </AlphaProvider>
  );
}
```

## Configuration Options

### Required

- **`baseUrl`** (string) - Base URL for all API requests

### Optional API Settings

- **`timeout`** (number) - Request timeout in milliseconds (default: 30000)
- **`headers`** (object) - Default headers for all requests

### Custom Routes

Provide routes in format `METHOD:/path/with/:params`:

```typescript
paths: {
  users: 'GET:/users',
  createUser: 'POST:/users',
  getUser: 'GET:/users/:id',
  updateUser: 'PUT:/users/:id',
  deleteUser: 'DELETE:/users/:id',
}
```

### Cache Settings

```typescript
cache: {
  ttl: 5 * 60 * 1000,      // 5 minutes
  staleTime: 30 * 1000,     // 30 seconds
  maxSize: 100,             // Max 100 entries
}
```

### Network Policy

```typescript
defaultNetworkPolicy: 'cache-first' 
// or 'network-only', 'cache-only', 'network-and-cache', 'stale-while-revalidate'
```

### Retry Settings

```typescript
retry: {
  enabled: true,
  count: 3,
  delay: 'exponential', // or number in ms
}
```

### Debug Mode

```typescript
debug: __DEV__  // Enable detailed logging in development
```

## Full Example

```typescript
import { AlphaProvider } from '@scripturecoder/rn-alpha';
import apiRoutes from './config/api-routes';

function App() {
  return (
    <AlphaProvider
      config={{
        // API Settings
        baseUrl: process.env.API_BASE_URL,
        timeout: 60000,
        headers: {
          'X-App-Version': '1.0.0',
          'X-Platform': 'mobile',
        },
        
        // Routes
        paths: apiRoutes,
        
        // Cache
        cache: {
          ttl: 10 * 60 * 1000,
          staleTime: 60 * 1000,
          maxSize: 200,
        },
        
        // Defaults
        defaultNetworkPolicy: 'stale-while-revalidate',
        
        // Retry
        retry: {
          enabled: true,
          count: 5,
          delay: 'exponential',
        },
        
        // Debug
        debug: __DEV__,
      }}
    >
      <Navigation />
    </AlphaProvider>
  );
}
```

## Organizing Routes

Create a separate file for your API routes:

```typescript
// config/api-routes.ts
export default {
  // Auth
  login: 'POST:/auth/login',
  logout: 'POST:/auth/logout',
  register: 'POST:/auth/register',
  
  // Users
  getProfile: 'GET:/users/me',
  updateProfile: 'PUT:/users/me',
  getUsers: 'GET:/users',
  
  // Products
  getProducts: 'GET:/products',
  getProduct: 'GET:/products/:id',
  createProduct: 'POST:/products',
  updateProduct: 'PUT:/products/:id',
  deleteProduct: 'DELETE:/products/:id',
};
```

Then import and use:

```typescript
import apiRoutes from './config/api-routes';

<AlphaProvider config={{ baseUrl: '...', paths: apiRoutes }}>
  ...
</AlphaProvider>
```

## Accessing Config in Your App

Use the `useAlphaConfig` hook:

```typescript
import { useAlphaConfig } from '@scripturecoder/rn-alpha';

function MyComponent() {
  const config = useAlphaConfig();
  
  console.log('Base URL:', config.baseUrl);
  console.log('Debug mode:', config.debug);
  
  return <View>...</View>;
}
```

## Environment-Specific Configuration

```typescript
// config/alpha.config.ts
const isDev = __DEV__;
const isProd = !isDev;

export const alphaConfig = {
  baseUrl: isDev 
    ? 'https://dev-api.example.com' 
    : 'https://api.example.com',
  timeout: isDev ? 60000 : 30000,
  debug: isDev,
  cache: {
    ttl: isDev ? 1 * 60 * 1000 : 10 * 60 * 1000, // 1 min dev, 10 min prod
  },
};
```

## Usage with Hooks

Once configured, all hooks automatically use your settings:

```typescript
import { useQuery, useMutation } from '@scripturecoder/rn-alpha';

function UserProfile() {
  // Uses baseUrl + paths.getProfile from config
  const { data: profile, loading } = useQuery('getProfile');
  
  // Uses default retry and timeout settings
  const [updateProfile] = useMutation('updateProfile');
  
  return (
    <View>
      {loading ? <Spinner /> : <Profile data={profile} />}
    </View>
  );
}
```

## TypeScript Support

Full type safety for your routes:

```typescript
// Create type-safe paths
const paths = {
  login: 'POST:/auth/login',
  users: 'GET:/users',
  getUser: 'GET:/users/:id',
} as const;

type AppRoutes = keyof typeof paths;

// Use in hooks with type safety
const { data } = useQuery<UserData>('getUser', {
  variables: { id: '123' }
});
```

## Advanced: Runtime Configuration Updates

For apps that need to change configuration at runtime (e.g., switching between environments):

```typescript
import { useAlphaConfig, setHttpConfig } from '@scripturecoder/rn-alpha';

function SettingsScreen() {
  const currentConfig = useAlphaConfig();
  
  const switchToStaging = () => {
    setHttpConfig({
      ...currentConfig,
      baseUrl: 'https://staging-api.example.com',
    });
  };
  
  return <Button onPress={switchToStaging}>Switch to Staging</Button>;
}
```

## Default Values Reference

| Option | Default Value | Description |
|--------|--------------|-------------|
| `timeout` | 30000 | Request timeout (30s) |
| `cache.ttl` | 300000 | Cache TTL (5 minutes) |
| `cache.staleTime` | 0 | Stale time (always stale) |
| `cache.maxSize` | 100 | Max cache entries |
| `defaultNetworkPolicy` | `'cache-first'` | Default fetch strategy |
| `retry.enabled` | `true` | Enable auto-retry |
| `retry.count` | 3 | Max retry attempts |
| `retry.delay` | `'exponential'` | Retry delay strategy |
| `debug` | `false` | Debug logging |

## Troubleshooting

### Config not applying

Make sure `AlphaProvider` wraps your entire app:

```typescript
// ✅ Correct
<AlphaProvider config={{...}}>
  <NavigationContainer>
    <App />
  </NavigationContainer>
</AlphaProvider>

// ❌ Wrong
<NavigationContainer>
  <AlphaProvider config={{...}}>
    <App />
  </AlphaProvider>
</NavigationContainer>
```

### Routes not found

Check that your route keys match between `paths` config and `useQuery` calls:

```typescript
// Config
paths: {
  getUser: 'GET:/users/:id',  // ✅ Correct key
}

// Usage
useQuery('getUser', { variables: { id: '123' }})  // ✅ Matches
useQuery('user', { variables: { id: '123' }})     // ❌ Wrong key
```

### BaseURL issues

Ensure baseURL doesn't have trailing slash:

```typescript
// ✅ Correct
baseUrl: 'https://api.example.com'

// ❌ Wrong
baseUrl: 'https://api.example.com/'
```

## Migration from Legacy Setup

If you were using the package without configuration:

```typescript
// Before
import { AppProvider } from '@scripturecoder/rn-alpha';

<AppProvider>
  <App />
</AppProvider>

// After
import { AlphaProvider } from '@scripturecoder/rn-alpha';

<AlphaProvider config={{ baseUrl: 'https://api.example.com' }}>
  <App />
</AlphaProvider>
```

Your existing hooks will continue to work without changes!

