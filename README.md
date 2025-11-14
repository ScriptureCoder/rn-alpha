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
- `country-code-emoji`
- `dayjs`
- `react-native-blob-util`, `react-native-crypto-js`, `react-native-mmkv`
- `react-native-simple-toast`, `react-native-uuid`

The versions listed in `package.json` are **minimum compatible versions**. Any release that satisfies the published semver range will work, so you can align with the versions already in your app as long as they remain API-compatible.

## Usage

```tsx
import React from 'react';
import { useQuery, formatMoney, AppProvider, store } from 'rn-alpha';
import { Provider } from 'react-redux';

const Example = () => {
  const { data, loading, error } = useQuery('getCustomer');

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

The package exports:

- **Hooks** (`useQuery`, `useQueryAsync`, `useMutation`, `useDispatch`, `useSelector`, `useApp`, `useCache`, `useUpload`)
- **Utility helpers** (`formatMoney`, `encrypt`, `decrypt`, `storage`)
- **Context providers and Redux store** (`AppProvider`, `store`, `AppDispatch`, `RootState`)
- **API paths** (`PATHS` - predefined API route definitions)
- **Date utilities** (`dayjs` with timezone and relative time plugins)

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
