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

### Data Fetching & Mutations

- **`useQuery`** - Data fetching with caching, network policies, and automatic request cancellation
- **`useQueryAsync`** - Async data fetching without subscriptions
- **`useMutation`** - POST/PUT/DELETE operations with loading states and cancellation
- **`useMutationAsync`** - Async mutations with legacy route support

### HTTP Service

Built on Axios with modern features:

- ✅ **Multiple Content-Types** - JSON (default), URL-encoded, multipart form data
- ✅ **Request Cancellation** - AbortController support to prevent race conditions
- ✅ **Automatic Retry Logic** - Built-in retry helpers with exponential backoff
- ✅ **Better Error Handling** - Distinguish between network errors, HTTP errors, and cancellations
- ✅ **Type Safety** - Full TypeScript support with proper type inference

### Helper Utilities

- **HTTP Helpers** - `createAbortController`, `isAbortError`, `shouldRetry`, `formatFormData`, `combineAbortSignals`
- **Error Handlers** - `extractErrorMessage`, `isSuccessStatus`, `isAuthError`, `createErrorResponse`
- **Other Utilities** - `formatMoney`, `encrypt`, `decrypt`, `storage`

### Store & Context

- **Redux Store** - Pre-configured store with cache and app reducers
- **Context Providers** - `AppProvider` for global app state
- **Typed Hooks** - `useDispatch`, `useSelector` with full TypeScript support

## Package Exports

The package exports:

- **Hooks** - `useQuery`, `useQueryAsync`, `useMutation`, `useMutationAsync`, `useDispatch`, `useSelector`, `useApp`, `useCache`, `useUpload`
- **HTTP Utilities** - `createAbortController`, `isAbortError`, `shouldRetry`, `formatFormData`, `formatUrlEncoded`, `combineAbortSignals`, `createTimeoutController`
- **Error Handlers** - `extractErrorMessage`, `isSuccessStatus`, `isAuthError`, `createErrorResponse`, `createSuccessResponse`
- **Types** - All hook options, results, and response types
- **Store** - `AppProvider`, `store`, `AppDispatch`, `RootState`
- **Utilities** - `formatMoney`, `encrypt`, `decrypt`, `storage`
- **API Paths** - `PATHS` - predefined API route definitions
- **Date Utilities** - `dayjs` with timezone and relative time plugins

See `src/index.ts` for the full export surface.

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
