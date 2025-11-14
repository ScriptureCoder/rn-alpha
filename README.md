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

### 📦 Store & Context

- **Redux Store** - Pre-configured store with intelligent cache and app reducers
- **Cache with TTL** - Built-in support for cache entries with expiry and staleness
- **Context Providers** - `AppProvider` for global app state
- **Typed Hooks** - `useDispatch`, `useSelector` with full TypeScript support

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
- `AppProvider`, `store`, `AppDispatch`, `RootState`
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
