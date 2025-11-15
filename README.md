# @scripturecoder/rn-alpha-hooks

> A comprehensive React Native hooks, store, and utility toolkit with TypeScript support.

[![npm version](https://img.shields.io/npm/v/@scripturecoder/rn-alpha-hooks.svg)](https://www.npmjs.com/package/@scripturecoder/rn-alpha-hooks)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

`@scripturecoder/rn-alpha-hooks` is a powerful toolkit for React Native applications, providing advanced data fetching hooks, flexible Redux store management, and essential utilities—all with full TypeScript support.

## 📑 Table of Contents

- [Installation](#installation)
- [Quick Start](#quick-start)
- [Configuration](#configuration)
  - [Configuration Options](#configuration-options)
  - [Full Configuration Example](#full-configuration-example)
  - [Organizing Routes](#organizing-routes)
  - [Environment-Specific Configuration](#environment-specific-configuration)
- [Core Hooks](#core-hooks)
  - [useQuery](#usequery)
  - [useQueryAsync](#usequeryasync)
  - [useMutation](#usemutation)
  - [useMutationAsync](#usemutationasync)
  - [useCache](#usecache)
- [Store & State Management](#store--state-management)
  - [Core State](#core-state)
  - [Adding Custom Reducers](#adding-custom-reducers)
  - [Creating Custom Contexts](#creating-custom-contexts)
  - [TypeScript Best Practices](#typescript-best-practices)
- [Advanced Features](#advanced-features)
  - [Request Deduplication](#request-deduplication)
  - [Cache Management](#cache-management)
  - [Network Policies](#network-policies)
  - [Retry Mechanisms](#retry-mechanisms)
  - [Offline Queue](#offline-queue)
  - [Background Refetch](#background-refetch)
  - [Optimistic Updates](#optimistic-updates)
  - [Debug Mode](#debug-mode)
- [Encryption & Security](#encryption--security)
  - [Configuring Encryption](#configuring-encryption)
  - [Encryption Functions](#encryption-functions)
  - [Security Best Practices](#security-best-practices)
- [Utilities Reference](#utilities-reference)
  - [HTTP Utilities](#http-utilities)
  - [Cache Utilities](#cache-utilities)
  - [Error Handlers](#error-handlers)
  - [Other Utilities](#other-utilities)
- [TypeScript Support](#typescript-support)
- [Custom Hook Wrappers](#custom-hook-wrappers)
- [Complete Examples](#complete-examples)
- [API Reference](#api-reference)
- [Troubleshooting](#troubleshooting)
- [Migration Guide](#migration-guide)
- [Contributing](#contributing)
- [License](#license)

---

## Installation

```sh
# with npm
npm install @scripturecoder/rn-alpha-hooks

# or with yarn
yarn add @scripturecoder/rn-alpha-hooks
```

### Peer Dependencies

The package requires React ≥ 18 and React Native ≥ 0.73. Make sure your host application provides compatible versions.

### Runtime Dependencies

These packages must be installed in your app:

```sh
yarn add @react-native-community/netinfo react-native-blob-util react-native-mmkv react-native-simple-toast
npm install @react-native-community/netinfo react-native-blob-util react-native-mmkv react-native-simple-toast
```

The versions listed in `package.json` are **minimum compatible versions**. You can use newer versions as long as they remain API-compatible.

---

## Quick Start

### 1. Wrap your app with AlphaProvider

```typescript
import { AlphaProvider } from '@scripturecoder/rn-alpha-hooks';

export default function App() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        paths: {
          login: 'POST:/auth/login',
          users: 'GET:/users',
          getUser: 'GET:/users/:id',
        },
        debug: __DEV__,
      }}
    >
      <Navigation />
    </AlphaProvider>
  );
}
```

### 2. Use hooks in your components

```typescript
import { useQuery, useMutation } from '@scripturecoder/rn-alpha-hooks';

function UserProfile({ userId }) {
  // Fetch data with caching
  const { data, loading, error, refetch } = useQuery('getUser', {
    variables: { userId }
  });

  // Mutation for updates
  const [updateUser] = useMutation('updateUser');

  const handleUpdate = async (updates) => {
    const result = await updateUser({ userId, ...updates });
    if ('data' in result) {
      refetch(); // Refresh data
    }
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <ProfileView user={data} onUpdate={handleUpdate} />;
}
```

### 3. Request Cancellation

```typescript
function SearchComponent({ query }) {
  const { data, loading, abort } = useQuery('search', {
    variables: { query },
    networkPolicy: 'network-only'
  });

  // Cancel request when query changes
  useEffect(() => {
    return () => abort();
  }, [query]);

  return <Results data={data} loading={loading} />;
}
```

---

## Configuration

### Configuration Options

Configure `rn-alpha` by passing a config object to `AlphaProvider`:

#### Required

- **`baseUrl`** (string) - Base URL for all API requests

#### Optional API Settings

- **`timeout`** (number) - Request timeout in milliseconds (default: 30000)
- **`headers`** (object) - Default headers for all requests
- **`dataPath`** (string) - Path to extract data from API responses (default: "data")
  - Use `"data"` for responses like `{ data: { data: [...] } }` (default)
  - Use `""` (empty string) for responses like `{ data: [...] }` directly
  - Supports dot notation like `"data.items"` for `{ data: { items: [...] } }`

#### Custom Routes

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

#### Cache Settings

```typescript
cache: {
  ttl: 5 * 60 * 1000,      // 5 minutes (default)
  staleTime: 30 * 1000,     // 30 seconds
  maxSize: 100,             // Max 100 entries (default)
}
```

#### Network Policy

```typescript
defaultNetworkPolicy: 'cache-first' 
// Options: 'cache-first', 'network-only', 'cache-only', 'network-and-cache', 'stale-while-revalidate'
```

#### Retry Settings

```typescript
retry: {
  enabled: true,
  count: 3,                 // Max retry attempts
  delay: 'exponential',     // or number in ms
}
```

#### Encryption Configuration

```typescript
encryption: {
  key: process.env.ENCRYPTION_KEY, // Must be 16 chars for AES-128
  iv: process.env.ENCRYPTION_IV,   // Must be 16 chars
}
```

#### Debug Mode

```typescript
debug: __DEV__  // Enable detailed logging in development
```

### Full Configuration Example

```typescript
import { AlphaProvider } from '@scripturecoder/rn-alpha-hooks';
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
        dataPath: 'data', // or "" for direct res.data access
        
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
        
        // Encryption
        encryption: {
          key: process.env.ENCRYPTION_KEY,
          iv: process.env.ENCRYPTION_IV,
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

### Organizing Routes

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
  <App />
</AlphaProvider>
```

### Response Data Path Configuration

By default, `rn-alpha` expects API responses in the format `{ data: { data: [...] } }` and extracts the nested `data` field. You can configure this behavior using the `dataPath` option.

#### Standard Response (Default)

```typescript
// API returns: { data: { data: { id: 1, name: "John" } } }
<AlphaProvider config={{ 
  baseUrl: '...', 
  dataPath: 'data' // default
}}>
```

#### Direct Response

```typescript
// API returns: { data: { id: 1, name: "John" } }
<AlphaProvider config={{ 
  baseUrl: '...', 
  dataPath: '' // empty string for direct access
}}>
```

#### Nested Path

```typescript
// API returns: { data: { items: [...], meta: {...} } }
<AlphaProvider config={{ 
  baseUrl: '...', 
  dataPath: 'data.items' // dot notation for nested paths
}}>
```

#### Custom Extraction

```typescript
// API returns: { data: { result: { payload: [...] } } }
<AlphaProvider config={{ 
  baseUrl: '...', 
  dataPath: 'data.result.payload'
}}>
```

**Note**: All hooks (`useQuery`, `useMutation`, `useQueryAsync`, `useMutationAsync`) respect this global configuration, ensuring consistent data extraction across your entire application.

### Environment-Specific Configuration

```typescript
// config/alpha.config.ts
const isDev = __DEV__;

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

### Accessing Config

Use the `useAlphaConfig` hook:

```typescript
import { useAlphaConfig } from '@scripturecoder/rn-alpha-hooks';

function MyComponent() {
  const config = useAlphaConfig();
  
  console.log('Base URL:', config.baseUrl);
  console.log('Debug mode:', config.debug);
  
  return <View>...</View>;
}
```

### Default Values Reference

| Option | Default Value | Description |
|--------|--------------|-------------|
| `timeout` | 30000 | Request timeout (30s) |
| `dataPath` | `'data'` | Response data extraction path |
| `cache.ttl` | 300000 | Cache TTL (5 minutes) |
| `cache.staleTime` | 0 | Stale time (always stale) |
| `cache.maxSize` | 100 | Max cache entries |
| `defaultNetworkPolicy` | `'cache-first'` | Default fetch strategy |
| `retry.enabled` | `true` | Enable auto-retry |
| `retry.count` | 3 | Max retry attempts |
| `retry.delay` | `'exponential'` | Retry delay strategy |
| `debug` | `false` | Debug logging |

---

## Core Hooks

### useQuery

Advanced data fetching with intelligent caching and request management.

#### Basic Usage

```typescript
import { useQuery } from '@scripturecoder/rn-alpha-hooks';

function UserProfile() {
  const { data, loading, error, refetch } = useQuery('getUser', {
    variables: { userId: '123' }
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error} />;

  return <ProfileView user={data} onRefresh={refetch} />;
}
```

#### Options

```typescript
interface QueryOptions {
  variables?: Record<string, any>;       // URL params and request body
  networkPolicy?: NetworkPolicy;          // Cache strategy
  onCompleted?: (data: any) => void;     // Success callback
  onError?: (error: string, status?: number) => void; // Error callback
  refetchOnMount?: boolean;              // Refetch when component mounts
  refetchOnFocus?: boolean;              // Refetch when window gains focus
  refetchOnReconnect?: boolean;          // Refetch when network reconnects
  refetchInterval?: number;              // Poll interval in ms
  retry?: RetryOptions;                  // Retry configuration
  debug?: boolean;                       // Enable debug logging
  ttl?: number;                          // Cache TTL override
  staleTime?: number;                    // Stale time override
}
```

#### Return Value

```typescript
interface QueryResult<T> {
  data: T;                              // Response data
  loading: boolean;                      // Loading state
  error: string;                        // Error message
  refetch: () => Promise<void>;         // Manually refetch
  fetchMore: (vars, strategy, key?) => Promise<void>; // Load more data
  update: (data) => void;               // Replace cache
  updateValue: (key, value) => void;    // Update single field
  updateValues: (values) => void;       // Update multiple fields
  updateItem: (id, value) => void;      // Update array item
  deleteItem: (id) => void;             // Remove array item
  prepend: (item) => void;              // Add to start
  append: (item) => void;               // Add to end
  optimisticUpdate: (updates, revert?) => Promise<void>; // Optimistic update
  timing: TimingInfo;                   // Performance metrics
  abort: () => void;                    // Cancel request
}
```

#### Network Policies

```typescript
// Cache-first (default): Use cache if available, otherwise fetch
const { data } = useQuery('getUsers', {
  networkPolicy: 'cache-first'
});

// Network-only: Always fetch from network
const { data } = useQuery('getUsers', {
  networkPolicy: 'network-only'
});

// Cache-only: Never fetch, only use cache
const { data } = useQuery('getUsers', {
  networkPolicy: 'cache-only'
});

// Network-and-cache: Show cache while fetching fresh data
const { data } = useQuery('getUsers', {
  networkPolicy: 'network-and-cache'
});

// Stale-while-revalidate: Show cache, fetch in background
const { data } = useQuery('getUsers', {
  networkPolicy: 'stale-while-revalidate'
});
```

#### Cache Manipulation

```typescript
const { 
  data, 
  update,      // Replace entire cache
  updateValue, // Update single field
  updateItem,  // Update array item by id
  deleteItem,  // Remove array item by id
  prepend,     // Add to start of array
  append       // Add to end of array
} = useQuery('getUsers');

// Update entire data
update({ name: 'John', age: 30 });

// Update single field
updateValue('name', 'Jane');

// Update multiple fields
updateValues({ name: 'Jane', age: 25 });

// Update item in array
updateItem('user-123', { name: 'Updated Name' });

// Delete item from array
deleteItem('user-123');

// Add to start
prepend({ id: 'new-1', name: 'New User' });

// Add to end
append({ id: 'new-2', name: 'Another User' });
```

#### Pagination

```typescript
const { data, fetchMore } = useQuery('getPosts', {
  variables: { page: 1, limit: 10 }
});

// Load more and append
const loadMore = async () => {
  await fetchMore(
    { page: 2, limit: 10 },
    'end' // 'start' | 'end' | 'pagination'
  );
};
```

#### Request Cancellation

```typescript
import { useEffect } from 'react';

function SearchResults({ searchTerm }) {
  const { data, loading, abort } = useQuery('searchUsers', {
    variables: { query: searchTerm }
  });

  // Abort when component unmounts or search term changes
  useEffect(() => {
    return () => abort(); // Cleanup
  }, [searchTerm]);

  return (
    <View>
      {loading && <Button onPress={abort}>Cancel</Button>}
      <Results data={data} />
    </View>
  );
}
```

---

### useQueryAsync

Async data fetching for imperative operations.

#### Basic Usage

```typescript
import { useQueryAsync } from '@scripturecoder/rn-alpha-hooks';

function UserActions() {
  const fetchUser = useQueryAsync();

  const handleFetch = async () => {
    const result = await fetchUser('getUser', { userId: '123' });
    
    if ('error' in result) {
      console.error('Error:', result.error);
    } else {
      console.log('User:', result.data);
    }
  };

  return <Button onPress={handleFetch}>Fetch User</Button>;
}
```

#### With Abort Signal

```typescript
function SearchComponent() {
  const fetchSearch = useQueryAsync();
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearch = async (query: string) => {
    // Cancel previous search
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create new controller
    abortControllerRef.current = new AbortController();

    const result = await fetchSearch('searchUsers', 
      { query }, 
      { signal: abortControllerRef.current.signal }
    );

    if ('error' in result && result.error === 'Request cancelled') {
      console.log('Search cancelled');
    } else if ('data' in result) {
      console.log('Results:', result.data);
    }
  };

  return <SearchInput onSearch={handleSearch} />;
}
```

---

### useMutation

POST/PUT/DELETE operations with offline queue support.

#### Basic Usage

```typescript
import { useMutation } from '@scripturecoder/rn-alpha-hooks';

function CreateUserForm() {
  const [createUser, { loading, error, data }] = useMutation('createUser');

  const handleSubmit = async (formData) => {
    const result = await createUser(formData);
    
    if ('error' in result) {
      Alert.alert('Error', result.error);
    } else {
      Alert.alert('Success', 'User created!');
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {loading && <Spinner />}
      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
}
```

#### Return Value

```typescript
type MutationResult<T> = [
  mutateFunction: (variables: Record<string, any>) => Promise<MutationResponse<T>>,
  state: {
    loading: boolean;
    error: string;
    data: T;
    cancel: () => void;     // Cancel the request
  }
];
```

#### Cancelling Mutations

```typescript
function UploadComponent() {
  const [uploadFile, { loading, cancel }] = useMutation('uploadFile');

  const handleUpload = async (file) => {
    const result = await uploadFile({ file });
    
    if ('error' in result && result.error === 'Request cancelled') {
      console.log('Upload cancelled');
    }
  };

  return (
    <View>
      <Button onPress={() => handleUpload(file)}>Upload</Button>
      {loading && (
        <Button onPress={cancel}>Cancel Upload</Button>
      )}
    </View>
  );
}
```

---

### useMutationAsync

Async mutations with legacy route support.

#### Basic Usage

```typescript
import { useMutationAsync } from '@scripturecoder/rn-alpha-hooks';

function LoginForm() {
  const [login, { loading, error }] = useMutationAsync('POST:/auth/login');

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    
    if ('data' in result) {
      // Success
      navigation.navigate('Home');
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {loading && <Spinner />}
      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
}
```

---

### useCache

Direct cache manipulation and management.

#### Basic Usage

```typescript
import { useCache } from '@scripturecoder/rn-alpha-hooks';

function CacheManager() {
  const cache = useCache();

  // Get cache item
  const user = cache.get('user:123');

  // Set cache item
  cache.set('user:123', { name: 'John', age: 30 });

  // Update cache item
  cache.update('user:123', { age: 31 });

  // Delete cache item
  cache.del('user:123');

  // Invalidate specific query
  cache.invalidate('user:123');

  // Invalidate queries matching pattern
  cache.invalidateQueries('user:');

  // Clear all cache
  cache.invalidateAll();

  return <View>...</View>;
}
```

#### Methods

- `get(key)` - Get cached data
- `set(key, data, options?)` - Set cache entry
- `update(key, updates)` - Update cache entry
- `del(key)` - Delete cache entry
- `invalidate(key)` - Invalidate and refetch
- `invalidateQueries(pattern)` - Invalidate matching queries
- `invalidateAll()` - Clear all cache
- `updateItem(key, id, updates)` - Update array item
- `deleteItem(key, id)` - Delete array item
- `prepend(key, item)` - Add to array start
- `append(key, item)` - Add to array end

---

## Store & State Management

`rn-alpha` provides a **minimal core state** (authentication & user) and lets you extend it with your own **custom reducers** for app-specific state like themes, settings, or preferences.

### Core State

The package provides these core slices:

#### 1. App Reducer (Core)

```typescript
interface CoreAppState {
  auth: {
    accessToken: string;
    refreshToken: string;
    customerId?: string;
  };
  user: any; // Your user object
}
```

**Actions:**
- `setAuth(payload)` - Set authentication tokens
- `setUser(payload)` - Set user data
- `clearAuth()` - Clear authentication and user

#### 2. Cache Reducer (Core)

Stores API response cache with TTL and LRU eviction.

#### 3. Thread Reducer (Core)

Manages background threads/workers.

### Adding Custom Reducers

#### Step 1: Create Your Reducer

```typescript
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  theme: 'light' | 'dark';
  language: string;
  notifications: boolean;
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'light',
    language: 'en',
    notifications: true,
  } as SettingsState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
  },
});

export const settingsActions = settingsSlice.actions;
export default settingsSlice.reducer;
```

#### Step 2: Pass to AlphaProvider

```typescript
import { AlphaProvider } from '@scripturecoder/rn-alpha-hooks';
import settingsReducer from './store/settingsSlice';
import preferencesReducer from './store/preferencesSlice';

function App() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        // ... other config
      }}
      customReducers={{
        settings: settingsReducer,
        preferences: preferencesReducer,
        // Add more as needed
      }}
    >
      <Navigation />
    </AlphaProvider>
  );
}
```

#### Step 3: Access Your State

```typescript
import { useSelector, useDispatch } from '@scripturecoder/rn-alpha-hooks';

function ThemeToggle() {
  const theme = useSelector((state: any) => state.settings.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(settingsActions.setTheme(
      theme === 'light' ? 'dark' : 'light'
    ))}>
      Toggle Theme
    </button>
  );
}
```

### Creating Custom Contexts

For better ergonomics, wrap `useApp` with your own context:

```typescript
import { createContext, useContext, useMemo } from 'react';
import { useApp, AppContextValue, useSelector, useDispatch } from '@scripturecoder/rn-alpha-hooks';

interface MyAppContextValue extends AppContextValue {
  // Add custom fields
  theme: 'light' | 'dark';
  setTheme: (theme: 'light' | 'dark') => void;
}

const MyAppContext = createContext<MyAppContextValue | undefined>(undefined);

export function MyAppProvider({ children }) {
  const coreApp = useApp();
  const settings = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();

  const value = useMemo<MyAppContextValue>(
    () => ({
      ...coreApp, // Include core features
      theme: settings.theme,
      setTheme: (theme) => dispatch(settingsActions.setTheme(theme)),
    }),
    [coreApp, settings, dispatch]
  );

  return (
    <MyAppContext.Provider value={value}>
      {children}
    </MyAppContext.Provider>
  );
}

export function useMyApp(): MyAppContextValue {
  const context = useContext(MyAppContext);
  if (!context) throw new Error('useMyApp must be used within MyAppProvider');
  return context;
}
```

### TypeScript Best Practices

#### 1. Define Your Root State Type

```typescript
import { RootState as CoreRootState } from '@scripturecoder/rn-alpha-hooks';

interface CustomState {
  settings: SettingsState;
  preferences: PreferencesState;
}

// Your app's complete state
type AppRootState = CoreRootState & CustomState;
```

#### 2. Create Typed Selector Hook

```typescript
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<AppRootState> = useReduxSelector;

// Usage
function Component() {
  const theme = useTypedSelector((state) => state.settings.theme); // fully typed!
}
```

#### 3. Export Typed Dispatch

```typescript
import { AppDispatch } from '@scripturecoder/rn-alpha-hooks';
import { useDispatch as useReduxDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useReduxDispatch;
```

### Persisting Custom State

```typescript
<AlphaProvider
  config={{...}}
  customReducers={{...}}
  storeOptions={{
    persist: true,
    storageKey: 'my-app-state', // Custom key
  }}
/>
```

### Custom Store

For complete control:

```typescript
import { createAlphaStore } from '@scripturecoder/rn-alpha-hooks';

const myStore = createAlphaStore(
  {
    settings: settingsReducer,
    preferences: preferencesReducer,
  },
  {
    persist: true,
    storageKey: 'my-custom-key',
  }
);

<AlphaProvider config={{...}} store={myStore}>
  <App />
</AlphaProvider>
```

---

## Advanced Features

### Request Deduplication

Automatically prevents multiple identical requests from running simultaneously:

```typescript
// These will only trigger one network request
const Component1 = () => useQuery('getUser', { variables: { id: '123' } });
const Component2 = () => useQuery('getUser', { variables: { id: '123' } });
const Component3 = () => useQuery('getUser', { variables: { id: '123' } });
```

### Cache Management

#### Cache TTL & Expiry

```typescript
// Set cache TTL globally
<AlphaProvider
  config={{
    cache: {
      ttl: 10 * 60 * 1000,   // 10 minutes
      staleTime: 60 * 1000,  // 1 minute
    }
  }}
/>

// Override per-query
const { data } = useQuery('getUser', {
  ttl: 5 * 60 * 1000,       // 5 minutes
  staleTime: 30 * 1000,     // 30 seconds
});
```

#### LRU Cache Eviction

Automatically removes least recently used entries when cache exceeds `maxSize`:

```typescript
<AlphaProvider
  config={{
    cache: {
      maxSize: 100, // Keep only 100 most recent entries
    }
  }}
/>
```

#### Cache Invalidation

```typescript
import { useCache } from '@scripturecoder/rn-alpha-hooks';

function Component() {
  const cache = useCache();

  // Invalidate specific cache
  cache.invalidate('user:123');

  // Invalidate all users
  cache.invalidateQueries('user:');

  // Clear everything
  cache.invalidateAll();
}
```

### Network Policies

Choose the right policy for your use case:

| Policy | Behavior | Use Case |
|--------|----------|----------|
| `cache-first` | Use cache if available, otherwise fetch | Default, good for most data |
| `network-only` | Always fetch from network | Real-time data, always fresh |
| `cache-only` | Never fetch, only use cache | Offline mode |
| `network-and-cache` | Show cache while fetching | Fast UX with fresh data |
| `stale-while-revalidate` | Show cache, fetch in background | Best UX, eventual consistency |

```typescript
const { data } = useQuery('getUser', {
  networkPolicy: 'stale-while-revalidate'
});
```

### Retry Mechanisms

Automatic retry with exponential backoff:

```typescript
// Global configuration
<AlphaProvider
  config={{
    retry: {
      enabled: true,
      count: 3,              // Max 3 retries
      delay: 'exponential',  // Exponential backoff
    }
  }}
/>

// Per-query override
const { data } = useQuery('getUser', {
  retry: {
    enabled: true,
    count: 5,
    delay: 1000, // Fixed 1s delay
  }
});
```

### Offline Queue

Automatically queues mutations when offline and replays them on reconnect:

```typescript
// Mutations are automatically queued when offline
const [createPost, { loading }] = useMutation('createPost');

const handleCreate = async () => {
  // This will queue if offline
  const result = await createPost({ title: 'My Post' });
  
  if ('data' in result) {
    Alert.alert('Success', 'Posted!');
  }
};
```

### Background Refetch

Automatically refetch data on:

- **Window Focus**: When app comes to foreground
- **Network Reconnect**: When network connection is restored
- **Intervals**: Poll data at specified intervals

```typescript
const { data } = useQuery('getLiveData', {
  refetchOnFocus: true,
  refetchOnReconnect: true,
  refetchInterval: 30000, // Poll every 30 seconds
});
```

### Optimistic Updates

Update UI before server response:

```typescript
function TodoList() {
  const { data, updateItem, refetch, optimisticUpdate } = useQuery('getTodos');
  const [toggleTodo] = useMutation('toggleTodo');

  const handleToggle = async (todoId) => {
    const todo = data.find(t => t.id === todoId);
    
    // Optimistically update
    await optimisticUpdate(
      { [todoId]: { ...todo, completed: !todo.completed } },
      () => refetch() // Revert on error
    );

    // Make request
    await toggleTodo({ todoId });
  };

  return <TodoItems todos={data} onToggle={handleToggle} />;
}
```

### Debug Mode

Enable detailed logging:

```typescript
<AlphaProvider
  config={{
    debug: __DEV__, // or true to always enable
  }}
/>
```

Debug logs include:
- Cache hits/misses
- Network requests
- Request timing
- Cache operations
- Error details

---

## Encryption & Security

### Configuring Encryption

Set encryption keys via `AlphaProvider`:

```typescript
<AlphaProvider
  config={{
    baseUrl: 'https://api.example.com',
    encryption: {
      key: process.env.ENCRYPTION_KEY, // Must be 16 chars
      iv: process.env.ENCRYPTION_IV,   // Must be 16 chars
    },
  }}
>
  <App />
</AlphaProvider>
```

### Encryption Functions

#### encrypt / decrypt

```typescript
import { encrypt, decrypt } from '@scripturecoder/rn-alpha-hooks';

// Encrypt data
const encrypted = encrypt('sensitive data');

// Decrypt data
const decrypted = decrypt(encrypted);

// With custom keys
const encrypted = encrypt('data', 'CustomKey1234567', 'CustomIV12345678');
const decrypted = decrypt(encrypted, 'CustomKey1234567', 'CustomIV12345678');
```

#### setEncryptionConfig

Update keys at runtime:

```typescript
import { setEncryptionConfig } from '@scripturecoder/rn-alpha-hooks';

function handleLogin(userSession) {
  const userKey = deriveKeyFromSession(userSession);
  setEncryptionConfig({
    key: userKey,
    iv: userSession.substring(0, 16),
  });
}
```

#### generateEncryptionConfig

Generate random keys:

```typescript
import { generateEncryptionConfig } from '@scripturecoder/rn-alpha-hooks';

const config = generateEncryptionConfig();
console.log('Key:', config.key);
console.log('IV:', config.iv);
// Store these securely!
```

#### isValidEncryptionConfig

Validate encryption config:

```typescript
import { isValidEncryptionConfig } from '@scripturecoder/rn-alpha-hooks';

const config = { key: 'MyKey123', iv: 'MyIV456' };

if (isValidEncryptionConfig(config)) {
  setEncryptionConfig(config);
}
```

### Security Best Practices

1. **Never hardcode keys** - Use environment variables or secure storage
2. **16 characters required** - Keys and IVs must be exactly 16 chars for AES-128
3. **Store keys securely** - Use react-native-keychain or similar
4. **Rotate keys** - Implement key rotation strategy
5. **Different keys for different data** - Use per-call custom keys for sensitive operations
6. **Never log keys** - Only log in development with warnings

Example secure setup:

```typescript
import { setEncryptionConfig, isValidEncryptionConfig } from '@scripturecoder/rn-alpha-hooks';
import * as Keychain from 'react-native-keychain';

async function loadEncryptionKeys() {
  try {
    const credentials = await Keychain.getGenericPassword({ service: 'encryption' });
    
    if (credentials) {
      const config = {
        key: credentials.username,
        iv: credentials.password,
      };
      
      if (isValidEncryptionConfig(config)) {
        setEncryptionConfig(config);
      }
    }
  } catch (error) {
    console.error('Failed to load encryption keys:', error);
  }
}
```

---

## Utilities Reference

### HTTP Utilities

#### createAbortController

```typescript
import { createAbortController } from '@scripturecoder/rn-alpha-hooks';

const { controller, cleanup } = createAbortController();

// Use signal in request
await fetch(url, { signal: controller.signal });

// Cleanup when done
cleanup();
```

#### createTimeoutController

```typescript
import { createTimeoutController } from '@scripturecoder/rn-alpha-hooks';

const { controller, cleanup } = createTimeoutController(5000); // 5s timeout

try {
  await fetch(url, { signal: controller.signal });
} finally {
  cleanup();
}
```

#### combineAbortSignals

```typescript
import { combineAbortSignals } from '@scripturecoder/rn-alpha-hooks';

const userController = new AbortController();
const timeoutController = new AbortController();

const combined = combineAbortSignals([
  userController.signal,
  timeoutController.signal
]);

await fetch(url, { signal: combined.signal });
```

#### isAbortError

```typescript
import { isAbortError } from '@scripturecoder/rn-alpha-hooks';

try {
  await fetch(url, { signal });
} catch (error) {
  if (isAbortError(error)) {
    console.log('Request was cancelled');
  } else {
    console.error('Request failed:', error);
  }
}
```

### Cache Utilities

```typescript
import {
  isCacheExpired,
  isCacheStale,
  isCacheFresh,
  getCacheData,
  createCacheEntry,
  getCacheAge
} from '@scripturecoder/rn-alpha-hooks';

// Check cache status
const entry = getCacheData('user:123');
if (isCacheFresh(entry)) {
  // Use cached data
} else if (isCacheStale(entry)) {
  // Show cache but refetch
} else {
  // Fetch new data
}

// Create cache entry with TTL
const entry = createCacheEntry(data, {
  ttl: 5 * 60 * 1000, // 5 minutes
  staleTime: 30 * 1000, // 30 seconds
});

// Check cache age
const age = getCacheAge(entry);
console.log(`Cache is ${age}ms old`);
```

### Error Handlers

```typescript
import {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  shouldRetry,
  createErrorResponse
} from '@scripturecoder/rn-alpha-hooks';

// Extract error message from various error types
const message = extractErrorMessage(error);

// Check if status code is success
if (isSuccessStatus(200)) {
  // Handle success
}

// Check if error is auth-related
if (isAuthError(error, status)) {
  // Redirect to login
}

// Determine if request should be retried
if (shouldRetry(error, status)) {
  // Retry request
}
```

### Other Utilities

#### formatMoney

```typescript
import { formatMoney, naira } from '@scripturecoder/rn-alpha-hooks';

const formatted = formatMoney(1500); // "1,500.00"
const withSymbol = naira + formatMoney(1500); // "₦1,500.00"
```

#### storage (MMKV)

```typescript
import { storage } from '@scripturecoder/rn-alpha-hooks';

// Set item
storage.setItem('key', 'value');

// Get item
const value = storage.getItem('key');

// Remove item
storage.removeItem('key');

// Set object
storage.setItem('user', JSON.stringify({ name: 'John' }));

// Get object
const user = JSON.parse(storage.getItem('user'));
```

#### dayjs

```typescript
import dayjs from '@scripturecoder/rn-alpha-hooks';

// Format dates
const formatted = dayjs().format('YYYY-MM-DD');

// Relative time
const relative = dayjs('2024-01-01').fromNow(); // "6 months ago"

// Timezone support included
const utc = dayjs.utc();
```

---

## TypeScript Support

### Exported Types

```typescript
import type {
  // Hook Options
  QueryOptions,
  MutationOptions,
  
  // Hook Results
  QueryResult,
  MutationResult,
  
  // Configuration
  AlphaConfig,
  EncryptionConfig,
  
  // Store
  RootState,
  AppDispatch,
  CoreAppState,
  CustomReducers,
  StoreOptions,
  
  // Network
  NetworkPolicy,
  ConcatStrategy,
  
  // Cache
  CacheEntry,
  CacheState,
  
  // Utilities
  Route,
  Method,
  TimingInfo,
} from '@scripturecoder/rn-alpha-hooks';
```

### Type-Safe Hooks

```typescript
interface User {
  id: string;
  name: string;
  email: string;
}

// Typed query
const { data } = useQuery<User>('getUser', {
  variables: { id: '123' }
});
// data is typed as User

// Typed mutation
const [createUser] = useMutation<User>('createUser');
const result = await createUser({ name: 'John', email: 'john@example.com' });
// result.data is typed as User
```

### Custom Store Types

```typescript
import { createTypedSelector, createTypedDispatch } from '@scripturecoder/rn-alpha-hooks';

// Create typed hooks for your custom store
export const useAppSelector = createTypedSelector<{
  settings: SettingsState;
  preferences: PreferencesState;
}>();

export const useAppDispatch = createTypedDispatch();

// Usage with full type safety
function Component() {
  const theme = useAppSelector((state) => state.settings.theme);
  const dispatch = useAppDispatch();
  
  return <View>...</View>;
}
```

---

## Custom Hook Wrappers

Wrap base hooks to add custom logic like encryption, logging, or analytics:

### Encrypted Hooks

```typescript
// src/hooks/useAppQuery.ts
import { useQuery, encrypt, decrypt } from '@scripturecoder/rn-alpha-hooks';

export function useAppQuery<T>(route: string, options?: any) {
  const { variables, ...rest } = options || {};
  
  // Encrypt sensitive fields before sending
  const encryptedVars = variables ? {
    ...variables,
    password: variables.password ? encrypt(variables.password) : undefined,
  } : undefined;
  
  const result = useQuery<T>(route, { ...rest, variables: encryptedVars });
  
  // Decrypt response if needed
  const decryptedData = result.data ? {
    ...result.data,
    // Decrypt specific fields
  } : result.data;
  
  return {
    ...result,
    data: decryptedData,
  };
}
```

### Logged Hooks

```typescript
// src/hooks/useAppQuery.ts
import { useQuery } from '@scripturecoder/rn-alpha-hooks';
import analytics from './analytics';

export function useAppQuery<T>(route: string, options?: any) {
  const result = useQuery<T>(route, {
    ...options,
    onCompleted: (data) => {
      analytics.log('query_success', { route, data });
      options?.onCompleted?.(data);
    },
    onError: (error, status) => {
      analytics.log('query_error', { route, error, status });
      options?.onError?.(error, status);
    },
  });
  
  return result;
}
```

See [`examples/encrypted-hooks.tsx`](./examples/encrypted-hooks.tsx) for complete patterns.

---

## Complete Examples

### Authentication Flow

```typescript
import { useMutation, useApp } from '@scripturecoder/rn-alpha-hooks';

function LoginScreen() {
  const [login, { loading, error }] = useMutation('login');
  const { setAuth, setUser } = useApp();

  const handleLogin = async (credentials) => {
    const result = await login(credentials);
    
    if ('data' in result) {
      // Save auth tokens
      setAuth({
        accessToken: result.data.accessToken,
        refreshToken: result.data.refreshToken,
      });
      
      // Save user data
      setUser(result.data.user);
      
      // Navigate to home
      navigation.replace('Home');
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <Form onSubmit={handleLogin}>
      {loading && <Spinner />}
      {error && <ErrorText>{error}</ErrorText>}
    </Form>
  );
}
```

### CRUD Operations

```typescript
function UserManagement() {
  // List users
  const { data: users, loading, refetch } = useQuery('getUsers');
  
  // Create user
  const [createUser] = useMutation('createUser');
  
  // Update user
  const [updateUser] = useMutation('updateUser');
  
  // Delete user
  const [deleteUser] = useMutation('deleteUser');

  const handleCreate = async (userData) => {
    const result = await createUser(userData);
    if ('data' in result) {
      refetch(); // Refresh list
    }
  };

  const handleUpdate = async (userId, updates) => {
    const result = await updateUser({ userId, ...updates });
    if ('data' in result) {
      refetch();
    }
  };

  const handleDelete = async (userId) => {
    const result = await deleteUser({ userId });
    if ('data' in result) {
      refetch();
    }
  };

  return (
    <View>
      <UserList 
        users={users}
        loading={loading}
        onCreate={handleCreate}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </View>
  );
}
```

### File Upload

```typescript
function FileUploader() {
  const [uploadFile, { loading }] = useMutation('uploadFile');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleUpload = async () => {
    if (!selectedFile) return;

    const result = await uploadFile({
      file: {
        uri: selectedFile.uri,
        type: selectedFile.type,
        name: selectedFile.name,
      },
      description: 'My file',
    });

    if ('data' in result) {
      Alert.alert('Success', 'File uploaded!');
      setSelectedFile(null);
    } else {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View>
      <FilePicker onSelect={setSelectedFile} />
      <Button onPress={handleUpload} disabled={!selectedFile || loading}>
        Upload
      </Button>
      {loading && <Spinner />}
    </View>
  );
}
```

### Offline-First Pattern

```typescript
function CreatePost() {
  const [createPost, { loading }] = useMutation('createPost');
  const { connected } = useApp();

  const handleCreate = async (postData) => {
    // Mutation is automatically queued if offline
    const result = await createPost(postData);
    
    if ('data' in result) {
      if (connected) {
        Alert.alert('Success', 'Post published!');
      } else {
        Alert.alert('Queued', 'Post will be published when online');
      }
    } else if (result.error !== 'Offline') {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View>
      {!connected && <OfflineBanner />}
      <PostForm onSubmit={handleCreate} loading={loading} />
    </View>
  );
}
```

---

## API Reference

### Quick Reference

#### Hooks

| Hook | Purpose | Returns |
|------|---------|---------|
| `useQuery` | Fetch data with caching | `{ data, loading, error, refetch, ... }` |
| `useQueryAsync` | Imperative data fetching | `fetchFunction` |
| `useMutation` | POST/PUT/DELETE operations | `[mutateFunction, { loading, error, data }]` |
| `useMutationAsync` | Imperative mutations | `[mutateFunction, { loading, error }]` |
| `useCache` | Cache manipulation | `{ get, set, update, del, invalidate, ... }` |
| `useApp` | Core app state | `{ auth, user, connected, setAuth, ... }` |
| `useDispatch` | Redux dispatch | `dispatch` |
| `useSelector` | Redux selector | `selectedValue` |
| `useAlphaConfig` | Access config | `config` |

#### Components

| Component | Purpose |
|-----------|---------|
| `AlphaProvider` | Main provider with config |
| `AppProvider` | Core app context provider |

#### Utilities

| Utility | Purpose |
|---------|---------|
| `formatMoney` | Currency formatting |
| `encrypt/decrypt` | Data encryption |
| `storage` | MMKV storage wrapper |
| `createAbortController` | Create abort controller |
| `isAbortError` | Check if error is cancellation |
| `extractErrorMessage` | Extract error messages |
| `isCacheExpired` | Check cache expiry |

#### Constants

| Constant | Value | Description |
|----------|-------|-------------|
| `DEFAULT_CACHE_TTL` | 300000 | 5 minutes |
| `DEFAULT_STALE_TIME` | 0 | Always stale |
| `MAX_CACHE_SIZE` | 100 | Max cache entries |
| `NETWORK_TIMEOUT` | 30000 | 30 seconds |

---

## Troubleshooting

### Common Issues

#### Config not applying

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

#### Routes not found

Check that your route keys match:

```typescript
// Config
paths: {
  getUser: 'GET:/users/:id',  // ✅ Correct key
}

// Usage
useQuery('getUser', { variables: { id: '123' }})  // ✅ Matches
useQuery('user', { variables: { id: '123' }})     // ❌ Wrong key
```

#### BaseURL issues

Ensure baseURL doesn't have trailing slash:

```typescript
// ✅ Correct
baseUrl: 'https://api.example.com'

// ❌ Wrong
baseUrl: 'https://api.example.com/'
```

#### Cache not working

Check network policy and TTL settings:

```typescript
// Enable caching
const { data } = useQuery('getUser', {
  networkPolicy: 'cache-first', // Not 'network-only'
  ttl: 5 * 60 * 1000,          // Set appropriate TTL
});
```

#### Request cancellation not working

Ensure abort is called in cleanup:

```typescript
useEffect(() => {
  return () => abort(); // Must return cleanup function
}, [dependencies]);
```

### FAQ

**Q: How do I clear all cache?**

```typescript
const cache = useCache();
cache.invalidateAll();
```

**Q: Can I use multiple API endpoints?**

Yes, use runtime configuration:

```typescript
import { setHttpConfig } from '@scripturecoder/rn-alpha-hooks';

setHttpConfig({ baseUrl: 'https://different-api.com' });
```

**Q: How do I handle 401 errors globally?**

Use HTTP interceptors or wrap hooks:

```typescript
const result = useQuery('getUser');

useEffect(() => {
  if (result.error && result.error.includes('401')) {
    navigation.navigate('Login');
  }
}, [result.error]);
```

**Q: Can I use this with Expo?**

Yes, just install the required dependencies. Some native modules may require custom dev clients.

**Q: How do I debug network requests?**

Enable debug mode:

```typescript
<AlphaProvider config={{ debug: true }}>
```

---

## Migration Guide

### From v0.1.x to v0.2.0

#### Breaking Changes

1. **Encryption is now configurable**
   ```typescript
   // Before: Keys were hardcoded
   
   // After: Configure via AlphaProvider
   <AlphaProvider
     config={{
       encryption: {
         key: process.env.ENCRYPTION_KEY,
         iv: process.env.ENCRYPTION_IV,
       }
     }}
   />
   ```

2. **Store customization changes**
   ```typescript
   // Before: Used specific app-context fields
   const { colorMode, biometric } = useApp();
   
   // After: Use custom reducers
   const settings = useSelector((state) => state.settings);
   ```

#### New Features

- ✅ Configurable encryption keys
- ✅ Flexible store with custom reducers
- ✅ TypeScript helpers for custom stores
- ✅ Enhanced encryption utilities

### From Legacy HTTP Service

```typescript
// Before
const res = await http(path, 'POST', data, true, token, false);

// After
const res = await http(path, 'POST', data, {
  returnStatus: true,
  auth: token,
  returnText: false,
  signal: abortController.signal
});
```

---

## Contributing

We welcome contributions! Here's how you can help:

1. **Report bugs** - Open an issue with reproduction steps
2. **Suggest features** - Share your ideas for improvements
3. **Submit PRs** - Fix bugs or add features
4. **Improve docs** - Help make documentation better

### Development

```sh
# Clone repository
git clone https://github.com/scripturecoder/rn-alpha.git

# Install dependencies
cd rn-alpha/packages/rn-alpha
npm install

# Run type check
npx tsc --noEmit

# Build package
npm run build

# Run tests
npm test
```

### Project Structure

```
src/
  index.ts                # Public export surface
  hooks/                  # Custom React hooks
  store/                  # Redux store, reducers, contexts
  utils/                  # Utility functions
  config.ts              # Configuration
  paths.ts                # API route definitions
  types.ts                # TypeScript type definitions
```

---

## License

MIT License - See [LICENSE](./LICENSE) for details.

---

## Support

- 📖 [Documentation](https://github.com/scripturecoder/rn-alpha)
- 🐛 [Report Issues](https://github.com/scripturecoder/rn-alpha/issues)
- 💬 [Discussions](https://github.com/scripturecoder/rn-alpha/discussions)
- 📧 Email: support@example.com

---

**Made with ❤️ by scripturecoder**
