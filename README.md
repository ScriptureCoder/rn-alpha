# rn-alpha

`rn-alpha` is a React Native hooks, store, and utility toolkit extracted from the Alpha mobile experience. It packages reusable hooks, Redux store configuration, and utility functions into an installable npm package.

## Installation

```sh
# with npm
npm install rn-alpha

# or with yarn
yarn add rn-alpha
```

The package declares `react` and `react-native` as peer dependencies. Make sure your host application already provides compatible versions (React ≥ 18 and React Native ≥ 0.73).

### Runtime dependencies

`rn-alpha` requires these packages to be installed in your app (if they are not already present):

- `@react-native-community/netinfo`
- `@react-navigation/native`
- `@reduxjs/toolkit` and `react-redux`
- `axios` - Modern HTTP client with request cancellation support
- `country-code-emoji`
- `dayjs`
- `react-native-blob-util`, `react-native-crypto-js`, `react-native-mmkv`
- `react-native-simple-toast`, `react-native-uuid`

The versions listed in `package.json` are **minimum compatible versions**. Any release that satisfies the published semver range will work, so you can align with the versions already in your app as long as they remain API-compatible.

## Usage

### Basic Example

```tsx
import React from 'react';
import { useQuery, formatMoney, AppProvider, store } from 'rn-alpha';
import { Provider } from 'react-redux';

const Example = () => {
  const { data, loading, error, abort } = useQuery('getCustomer');

  return (
    <Provider store={store}>
      <AppProvider>
        {/* Your app content */}
      </AppProvider>
    </Provider>
  );
};

export default Example;
```

### Request Cancellation

```tsx
import { useQuery } from 'rn-alpha';

function SearchComponent({ query }) {
  const { data, loading, abort } = useQuery('search', {
    variables: { query },
    networkPolicy: 'network-only'
  });

  // Cancel request when query changes or component unmounts
  useEffect(() => {
    return () => abort();
  }, [query]);

  return <Results data={data} loading={loading} />;
}
```

### Mutations with Cancellation

```tsx
import { useMutation } from 'rn-alpha';

function UploadComponent() {
  const [uploadFile, { loading, cancel }] = useMutation('uploadFile');

  const handleUpload = async (file) => {
    const result = await uploadFile({ file });
    
    if ('error' in result) {
      Alert.alert('Error', result.error);
    }
  };

  return (
    <View>
      <Button onPress={() => handleUpload(file)}>Upload</Button>
      {loading && <Button onPress={cancel}>Cancel</Button>}
    </View>
  );
}
```

For comprehensive examples including Content-Type switching, advanced patterns, and more, see [USAGE_EXAMPLES.md](./src/hooks/USAGE_EXAMPLES.md).

## Setup

Wrap your app with `AlphaProvider` and provide configuration:

```typescript
import { AlphaProvider } from '@scripturecoder/rn-alpha';

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
        cache: {
          ttl: 10 * 60 * 1000, // 10 minutes
        },
        encryption: {
          key: process.env.ENCRYPTION_KEY, // 16 chars for AES-128
          iv: process.env.ENCRYPTION_IV,   // 16 chars
        },
        debug: __DEV__,
      }}
    >
      {/* Your app */}
    </AlphaProvider>
  );
}
```

For detailed configuration options, see [CONFIGURATION.md](./CONFIGURATION.md).

## Store Customization

`rn-alpha` provides a **minimal core state** (authentication & user) and lets you extend it with your own **custom reducers** for app-specific state like themes, settings, or preferences.

### Why Customize the Store?

✅ **Flexible** - Add any state your app needs  
✅ **Type-Safe** - Full TypeScript support  
✅ **Minimal Core** - Only essential state included  
✅ **Your Rules** - Define your own structure and actions

### Quick Start

**1. Create your custom reducer:**

```typescript
import { createSlice } from '@reduxjs/toolkit';

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'light',
    language: 'en',
    notifications: true,
  },
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
  },
});
```

**2. Pass to AlphaProvider:**

```typescript
<AlphaProvider
  config={{
    baseUrl: 'https://api.example.com',
    // ... other config
  }}
  customReducers={{
    settings: settingsSlice.reducer,
    // Add more reducers as needed
  }}
>
  <App />
</AlphaProvider>
```

**3. Use in your components:**

```typescript
import { useSelector, useDispatch } from '@scripturecoder/rn-alpha';

function SettingsScreen() {
  const theme = useSelector((state) => state.settings.theme);
  const dispatch = useDispatch();

  return (
    <button onClick={() => dispatch(settingsSlice.actions.setTheme('dark'))}>
      Current: {theme}
    </button>
  );
}
```

### Advanced: Custom Context Wrapper

Wrap `useApp` with your own context for a unified API:

```typescript
import { createContext, useContext, useMemo } from 'react';
import { useApp, useSelector, useDispatch } from '@scripturecoder/rn-alpha';

export interface MyAppContextValue {
  // Core from rn-alpha
  auth: any;
  user: any;
  connected: boolean;
  
  // Your custom state
  theme: string;
  setTheme: (theme: string) => void;
}

export function MyAppProvider({ children }) {
  const coreApp = useApp();
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const value = useMemo(() => ({
    ...coreApp,
    theme: settings.theme,
    setTheme: (theme) => dispatch(settingsSlice.actions.setTheme(theme)),
  }), [coreApp, settings, dispatch]);

  return (
    <MyAppContext.Provider value={value}>
      {children}
    </MyAppContext.Provider>
  );
}
```

### Documentation

For complete documentation on store customization:

- **[STORE_CUSTOMIZATION.md](./STORE_CUSTOMIZATION.md)** - Full guide with patterns, TypeScript tips, and migration help
- **[`examples/custom-store-setup.tsx`](./examples/custom-store-setup.tsx)** - Complete example with multiple reducers
- **[`examples/custom-context-wrapper.tsx`](./examples/custom-context-wrapper.tsx)** - Extended context pattern

## Custom Hook Wrappers

You can easily wrap the base hooks to add your own business logic like encryption, logging, or analytics.

**Example: Encrypted Hooks**

```typescript
// src/hooks/useAppQuery.ts
import { useQuery, encrypt, decrypt } from '@scripturecoder/rn-alpha';

export function useAppQuery(route, options) {
  const { variables, ...rest } = options || {};
  
  // Encrypt sensitive fields before sending
  const encryptedVars = encryptSensitiveFields(variables);
  
  const result = useQuery(route, { ...rest, variables: encryptedVars });
  
  // Decrypt sensitive fields in response
  return {
    ...result,
    data: decryptSensitiveFields(result.data),
  };
}
```

See complete examples in the [`examples/`](./examples/) directory:
- **`encrypted-hooks.tsx`** - Full encryption/decryption wrapper with multiple patterns
- **`app-hooks-template.tsx`** - Ready-to-use template for your app

## Features

### 🚀 Data Fetching & Mutations

- **`useQuery`** - Advanced data fetching with:
  - ✅ Request deduplication (prevents duplicate simultaneous requests)
  - ✅ Cache TTL & expiry management
  - ✅ Stale-while-revalidate policy
  - ✅ Automatic request cancellation
  - ✅ Background refetch (on focus/reconnect)
  - ✅ Optimistic updates with rollback
  - ✅ Request timing & performance metrics
  - ✅ Debug mode for development
  
- **`useQueryAsync`** - Async data fetching with abort signal support
- **`useMutation`** - POST/PUT/DELETE operations with:
  - ✅ Offline queue support
  - ✅ Automatic retry with exponential backoff
  - ✅ Request cancellation
  
- **`useMutationAsync`** - Async mutations with legacy route support

### ⚡ HTTP Service

Built on Axios with modern features:

- ✅ **Multiple Content-Types** - JSON (default), URL-encoded, multipart form data
- ✅ **Request Cancellation** - AbortController support to prevent race conditions
- ✅ **Request Deduplication** - Automatic deduplication of identical in-flight requests
- ✅ **Automatic Retry Logic** - Built-in retry helpers with exponential backoff
- ✅ **Better Error Handling** - Distinguish between network errors, HTTP errors, and cancellations
- ✅ **Type Safety** - Full TypeScript support with proper type inference

### 🗄️ Intelligent Caching

- **Cache TTL & Expiry** - Automatic cache expiration based on time-to-live
- **LRU Eviction** - Automatic cleanup when cache grows too large (default: 100 entries)
- **Stale-While-Revalidate** - Show cached data instantly while fetching fresh data in background
- **Cache Invalidation** - Pattern-based cache invalidation (`invalidate`, `invalidateQueries`, `invalidateAll`)
- **Cache Helpers** - `isCacheExpired`, `isCacheStale`, `isCacheFresh`, `getCacheData`

### 🔧 Developer Tools

- **Debug Mode** - Detailed logging of cache hits, network requests, and timing
- **Request Timing** - Track performance of every request
- **Query Debugger** - Structured logging with `QueryDebugger` class
- **Cache Metadata** - Inspect cache state and LRU order

### 🌐 Network Resilience

- **Offline Queue** - Automatically queue mutations when offline and replay on reconnect
- **Retry with Backoff** - Exponential backoff for failed requests with custom conditions
- **Background Refetch** - Auto-refetch on window focus, reconnect, or at intervals
- **Request Cancellation** - Prevent memory leaks and race conditions

### 🎯 Helper Utilities

- **HTTP Helpers** - `createAbortController`, `isAbortError`, `shouldRetry`, `formatFormData`, `combineAbortSignals`, `createTimeoutController`
- **Error Handlers** - `extractErrorMessage`, `isSuccessStatus`, `isAuthError`, `createErrorResponse`, `shouldRetry`
- **Refetch Hooks** - `useRefetchOnFocus`, `useRefetchOnReconnect`, `useRefetchInterval`
- **Other Utilities** - `formatMoney`, `encrypt`, `decrypt`, `storage`

### 📦 Flexible Store System

- **Minimal Core State** - Only essential auth & user state included
- **Extensible** - Add custom reducers for your app-specific state (themes, settings, etc.)
- **Redux Store** - Pre-configured store with intelligent cache and app reducers
- **Cache with TTL** - Built-in support for cache entries with expiry and staleness
- **Context Providers** - `AppProvider` for core state, extend with your own contexts
- **Typed Hooks** - `useDispatch`, `useSelector` with full TypeScript support
- **Custom Store Support** - Provide your own store or use `createAlphaStore` with custom reducers

## Package Exports

The package exports:

### Core Hooks
- `useQuery`, `useQueryAsync`, `useMutation`, `useMutationAsync`
- `useDispatch`, `useSelector`, `useApp`, `useCache`, `useUpload`

### HTTP & Network
- `createAbortController`, `cancelRequest`, `isRequestInFlight`, `getInFlightCount`
- `formatFormData`, `formatUrlEncoded`, `combineAbortSignals`, `createTimeoutController`
- `getOrCreateRequest` (request deduplication)

### Cache Management
- `isCacheExpired`, `isCacheStale`, `isCacheFresh`, `getCacheData`
- `createCacheEntry`, `getCacheAge`, `canUseCache`
- `setMaxCacheSize`, `getCacheMetadata`

### Error Handling
- `extractErrorMessage`, `isSuccessStatus`, `isAuthError`
- `createErrorResponse`, `createSuccessResponse`, `shouldRetry`
- `isAbortError`, `isCancelError`

### Advanced Features
- `QueryDebugger`, `createDebugger`, `enableGlobalDebug`
- `retryWithBackoff`, `retryWithJitter`
- `OfflineQueue`, `getOfflineQueue`
- `useRefetchOnFocus`, `useRefetchOnReconnect`, `useRefetchInterval`

### Types & Constants
- All hook options, results, and response types (`QueryOptions`, `QueryResult`, `MutationOptions`, etc.)
- `DEFAULT_CACHE_TTL`, `DEFAULT_STALE_TIME`, `MAX_CACHE_SIZE`
- `NetworkPolicy`, `ConcatStrategy`, `TimingInfo`

### Store & Utilities
- `AlphaProvider` - Main provider with config and custom reducer support
- `AppProvider`, `store`, `createAlphaStore`, `defaultStore`
- `AppDispatch`, `RootState`, `CustomReducers`, `StoreOptions`
- `CoreAppState`, `appActions` - Core state and actions
- `AppContextValue` - Core context type for extensions
- `formatMoney`, `encrypt`, `decrypt`, `storage`
- `PATHS` - predefined API route definitions
- `dayjs` with timezone and relative time plugins

See `src/index.ts` for the complete export surface.

## Building the package

The project is configured to emit CommonJS, ESM, and type declaration bundles via [`tsup`](https://tsup.egoist.dev/).

```sh
# Clean previous output and rebuild
npm run clean && npm run build
```

This generates `dist/index.js`, `dist/index.mjs`, and `dist/index.d.ts`. The `files` field in `package.json` ensures only the compiled artifacts (and supporting source) are published.

A full type check can be executed independently:

```sh
npx tsc --noEmit
```

## Publishing workflow

1. Update the `version` in `package.json` following semver.
2. Regenerate the build: `npm run build`.
3. Inspect the `dist/` output (optionally using `npm pack` to preview the tarball).
4. Publish to npm: `npm publish --access public` (requires appropriate permissions).

> **Tip:** The `prepare` npm script automatically runs `npm run build` prior to publishing.

## Project structure

```
src/
  index.ts                # Public export surface
  hooks/                  # Custom React hooks (useQuery, useMutation, etc.)
  store/                  # Redux store, reducers, and contexts
  utils/                  # Utility functions (money, crypto, storage, etc.)
  config.ts              # Configuration
  paths.ts                # API route definitions
  types.ts                # TypeScript type definitions
```

## Contributing & development

- Run `npx tsc --noEmit` to type-check edits.
- Add or adjust tests inside `__tests__/` and execute with `npm test`.
- Keep new code documented and maintain type safety throughout.

## License

The original Alpha application license applies. Ensure you have the rights to redistribute these assets before publishing publicly.
