# rn-alpha

`rn-alpha` is a React Native component, hook, and utility toolkit extracted from the Alpha mobile experience. It packages the reusable building blocks (layout primitives, form elements, theming utilities, store helpers, and service hooks) into an installable npm package.

## Installation

```sh
# with npm
npm install rn-alpha

# or with yarn
yarn add rn-alpha
```

The package declares `react` and `react-native` as peer dependencies. Make sure your host application already provides compatible versions (React ≥ 18 and React Native ≥ 0.73).

### Runtime dependencies

`rn-alpha` ships only the primitives required by the component set. Your app must also install these packages (if they are not already present):

- `@d11/react-native-fast-image`
- `@gorhom/bottom-sheet`
- `@react-native-community/netinfo`
- `@reduxjs/toolkit` and `react-redux`
- `country-code-emoji`
- `dayjs`, `formik`, and `yup`
- `moti`
- `react-native-blob-util`, `react-native-crypto-js`, `react-native-mmkv`
- `react-native-date-picker`, `react-native-indicators`, `react-native-linear-gradient`, `react-native-material-menu`, `react-native-otp-entry`, `react-native-safe-area-context`, `react-native-simple-toast`, `react-native-svg`, `react-native-uuid`

The versions listed in `package.json` are **minimum compatible versions**. Any release that satisfies the published semver range (for example `^5.1.6` for `@gorhom/bottom-sheet`) will work, so you can align with the versions already in your app as long as they remain API-compatible.

## Usage

```tsx
import React from 'react';
import { Button, Page, useColor, formatMoney } from 'rn-alpha';

const Example = () => {
  const { colors } = useColor();

  return (
    <Page color="background">
      <Button
        title={`Balance • ${formatMoney(125000, 2)}`}
        color="primary"
        textColor="light"
        onPress={() => {}}
        mt={32}
      />
    </Page>
  );
};

export default Example;
```

Beyond the layout primitives, the package exports:

- Custom form controls (`Input`, `Password`, `Select`, `DateSelect`, etc.)
- Modal and sheet helpers (`Modal`, `Sheet`, `AlertModal`, `PageModal`)
- Hooks (`useColor`, `useQuery`, `useMutation`, `useDispatch`, `useSelector`, `useApp`)
- Utility helpers (`formatMoney`, `encrypt`, `decrypt`, `storage`)
- Context providers and Redux store wiring (`AppProvider`, `store`)
- Theme constants (`Colors`, `colorScheme`, `width`, `height`, and more)

See `src/index.ts` for the full export surface.

## Building the package

The project is configured to emit CommonJS, ESM, and type declaration bundles via [`tsup`](https://tsup.egoist.dev/).

```sh
# Clean previous output and rebuild
npm run clean && npm run build
```

This generates `dist/index.js`, `dist/index.mjs`, and `dist/index.d.ts`. The `files` field in `package.json` ensures only the compiled artifacts (and supporting source/assets) are published.

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
  rn-alpha/               # Core components and hooks
  components/             # Cross-cutting primitives (page, safe-area, icon button, progress bar)
  constants/, utils/      # Theming and helper utilities
  store/                  # Redux store and contexts
  assets/                 # SVG icon definitions and static assets
```

## Contributing & development

- Run `npx tsc --noEmit` to type-check edits.
- Add or adjust tests inside `__tests__/` and execute with `npm test`.
- Keep new code documented and favor token-based colors (`ColorProps`) to stay compatible with the theme system.

## License

The original Alpha application license applies. Ensure you have the rights to redistribute these assets before publishing publicly.
