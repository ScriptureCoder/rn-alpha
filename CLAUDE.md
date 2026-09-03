# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`@scripturecoder/rn-alpha-hooks` is a publishable npm **library** (not an app): data-fetching hooks (`useQuery`, `useMutation`, async variants), an extensible Redux Toolkit store, and utilities that run on **both React Native and React web**. Consumers wrap their app in `AlphaProvider` and call hooks with route keys. React and Redux are required peers; the React Native packages (MMKV, NetInfo, blob-util, simple-toast) are optional peers used only by the native build.

## Commands

```bash
npx tsc --noEmit        # type check — the only working verification step; keep it clean
npm run build           # tsup → dist/ (index.* native + web.* browser; cjs + esm + .d.ts), cleans dist first
node -e "require('./dist/web.js')"   # smoke test: the web bundle must load without any react-native module
npm run pack            # build + npm pack (produces a .tgz in repo root)
npm run pub             # build + pack + npm publish --tag alpha
```

- `npm test` runs Jest (`react-native` preset) but **there are no tests**; it exits 1 with "No tests found". Add files matching `*.test.ts(x)` or `__tests__/` if you write tests.
- `npm run lint` is **broken**: ESLint 9 is installed but only a legacy `.eslintrc.js` exists (no `eslint.config.js`). Don't rely on it.
- `npm run prepare` runs the build on `npm install`.
- `dist/` and the `*.tgz` tarballs are **committed to git**. After changing `src/`, run `npm run build` so `dist/` stays in sync before committing.
- `dem.sh` is the author's shortcut: `git add . && git commit -m "update" && git push`.

## Import path aliases

`tsconfig.json` sets `baseUrl: ./src` with `paths` for `hooks/*`, `store/*`, `utils/*`, `types`. Source mixes relative imports with bare ones like `from 'store/contexts/app-context'`, `from 'types'`, `from 'config'`. These resolve via tsconfig, and tsup/esbuild honors them at bundle time. New files must live under `src/` and match the `include` list in `tsconfig.json` or `tsc` will silently skip them.

## Architecture

### Public surface and entry points
`src/exports.ts` is the shared public API. Two thin entries wrap it: `src/index.ts` (React Native, registers the native adapter) and `src/web.ts` (browser, registers the web adapter). **The adapter-registration import must stay first in each entry**: ES modules evaluate imports in source order, and `defaultStore`/`storage` read the adapter while being evaluated. `package.json` `exports` maps `.` to native (with a `browser` condition to web), plus explicit `./native` and `./web` subpaths. Anything new must be exported from `exports.ts` and documented in `README.md` (the primary, very long user-facing doc; `CONFIGURATION.md`, `STORE_CUSTOMIZATION.md`, `examples/` and `src/hooks/USAGE_EXAMPLES.md` are supplementary).

### Platform adapter (`src/platform/`)
All platform APIs go through `PlatformAdapter` (`types.ts`): storage, connectivity subscription, foreground subscription, keyboard dismiss, toast, file read, and `createAnimatedValue` for `scrollY`. `registry.ts` holds the singleton (`setPlatformAdapter`/`getPlatformAdapter`) and falls back to an in-memory adapter with a one-time warning. `native.ts` is the **only** file allowed to import `react-native`, MMKV, NetInfo, simple-toast or blob-util; `web.ts` uses `localStorage`, `navigator.onLine`, `visibilitychange`, and a DOM toast. Never import a React Native module anywhere else, or the web build breaks. `react-native-uuid` and `react-native-crypto-js` are pure JS and safe on both platforms.

### Provider stack
`AlphaProvider` (`src/store/contexts/alpha-provider.tsx`) renders:
`Redux <Provider store>` → `ConfigProvider` → `SocketProvider` → `AppProvider` → children.

- **Store** comes from the `store` prop, else `createAlphaStore(customReducers, storeOptions)`, else the module-level `defaultStore` (created at import time).
- **ConfigProvider** (`config-context.tsx`) merges the `config` prop over `DEFAULT_CONFIG` and is the bridge from React into the module-level singletons below. It applies HTTP + encryption config **synchronously** during the first render and inside `updateConfig` (via a ref, not an effect) so a screen can call `setConfig(...)` and immediately fire a request with new headers/keys. Preserve this ordering; child effects run before parent effects, so an effect-based approach races.
- **SocketProvider** subscribes to the adapter's connectivity and exposes `useSocket().connected`, which `useQuery` and `useRefetchOnReconnect` read.
- **AppProvider** exposes `useApp()`: the `app` slice (auth tokens, user, colorMode, deviceId, email) plus its own adapter-driven `connected` flag and a shared `scrollY` (an `Animated.Value` on native, a plain object on web). It auto-generates `deviceId` with uuid on first mount.

### Module-level singletons (global per JS runtime, not React state)
- `src/utils/service.ts`: `currentConfig` + the axios instance. `setHttpConfig()` **recreates** the axios instance. The response interceptor **never rejects on HTTP errors**: it resolves with the error response, and network failures resolve to `{ data: { error }, status: 500 }`. Only abort/cancel errors throw. Callers therefore branch on `res.status`, not try/catch.
- `src/utils/crypto.ts`: AES key/iv (16 chars each) set via `setEncryptionConfig`.
- `src/store/reducers/cache-reducer.tsx`: LRU `accessOrder`/`maxSize` metadata lives outside Redux state.
- `src/hooks/utils/request-queue.ts`: in-flight request map used by `useQuery` for deduplication by cache key.
- `src/hooks/utils/offline-queue.ts`, `src/utils/logger.ts` (debug flag toggled by `config.debug`), and the platform adapter registry.

### Redux store shape
Core slices are always present: `cache` (per-key `CacheEntry { data, timestamp, expiresAt?, staleAt? }`), `thread` (per-key `{ loading, error, status }`, i.e. request state), and `app`. Custom reducers are merged alongside. `createAlphaStore` persists the **entire** state (including cache) to MMKV under `_alpha_state` by default (`persist: true`), with immutable/serializable checks disabled.

### Request flow (`useQuery`, mirrored in `useMutation`/async variants)
1. **Route resolution** (`src/hooks/utils/route-parser.ts`): the route argument is a key into `PATHS` (`src/paths.ts`, legacy defaults) merged with `config.paths` (wins), or a raw `"METHOD:/path/:param"` string. Path params are filled from `variables` (removed from the query/body) and from the auth `userId` (as `:authId`). Cache key = resolved path + JSON of remaining variables; `network-only` queries append a per-instance id so they never share cache.
2. **Encryption** resolves hook option > `config.defaultEncryption` (`encryption-helpers.ts`), supporting full-body or per-field encryption for request and response independently.
3. **HTTP** via `http()` with `auth: accessToken` and an `AbortSignal`; `useQuery` wraps it in `getOrCreateRequest(key, …)`.
4. **Success** is only status 200/201 (`isSuccessStatus`). Response goes through decryption, then `extractResponseData(res.data, dataPath)` where `dataPath` defaults to `"data"` (i.e. `res.data.data`; `""` means raw `res.data`; dot notation allowed). Hook-level `dataPath` overrides config.
5. **401/404** are treated as auth errors: `app.clearAuth()` then `config.onAuthError(status)`.
6. Network policies (`cache-first` default, `network-only`, `cache-only`, `network-and-cache`, `stale-while-revalidate`) are switched in `fetchData` inside `use-query.tsx`.

### Known quirks to keep in mind
- `useQuery` auto-retries a failed query with no cached data **only on an offline→online transition** (tracked with a `prevConnectedRef`). Do not change it to "retry whenever connected and errored": each refetch clears and re-sets `thread.error`, so that variant loops forever (this bug existed latently before `SocketProvider` was mounted by `AlphaProvider`).
- Backward-compat shims are intentional and exported: the legacy positional `http(path, method, data, returnStatus, auth, returnText)` signature, `config`/`alphaConfig` legacy object, `store` alias for `defaultStore`, and the hard-coded default `PATHS`.
- `.prettierrc.js` exists (single quotes, no bracket spacing, `arrowParens: avoid`) but the codebase is not consistently formatted (mixed quotes, 2/4-space indents). Match the surrounding file; don't reformat whole files.
