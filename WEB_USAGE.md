# Using rn-alpha-hooks in a React Web Project

This guide covers everything you need to use `@scripturecoder/rn-alpha-hooks` in a browser app built with React (Vite, Create React App, Next.js, Remix, etc.). The hooks, store and utilities are identical to the React Native version; only the platform layer (storage, connectivity, keyboard, toast, file access) differs.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Import from the `/web` entry](#import-from-the-web-entry)
- [Setup](#setup)
- [Fetching data with `useQuery`](#fetching-data-with-usequery)
- [Mutations and authentication](#mutations-and-authentication)
- [Response shape and `dataPath`](#response-shape-and-datapath)
- [Cache manipulation](#cache-manipulation)
- [Connectivity and background refetching](#connectivity-and-background-refetching)
- [Persistence](#persistence)
- [Encryption](#encryption)
- [Customising the platform adapter](#customising-the-platform-adapter)
- [Next.js and server-side rendering](#nextjs-and-server-side-rendering)
- [Testing with Jest](#testing-with-jest)
- [Differences from React Native](#differences-from-react-native)
- [Troubleshooting](#troubleshooting)

---

## Requirements

| Package | Version |
|---------|---------|
| `react` | ≥ 18 |
| `react-dom` | ≥ 18 |
| `react-redux` | ≥ 9 |
| `@reduxjs/toolkit` | ≥ 2 |

**No React Native packages are needed.** `react-native`, `react-native-mmkv`, `@react-native-community/netinfo`, `react-native-blob-util` and `react-native-simple-toast` are optional peer dependencies that only the native build uses.

## Installation

```sh
npm install @scripturecoder/rn-alpha-hooks react-redux @reduxjs/toolkit
# or
yarn add @scripturecoder/rn-alpha-hooks react-redux @reduxjs/toolkit
```

`axios`, `dayjs` and the encryption library are bundled dependencies and install automatically.

## Import from the `/web` entry

Always import from `@scripturecoder/rn-alpha-hooks/web` in browser code:

```typescript
import { AlphaProvider, useQuery, useMutation } from '@scripturecoder/rn-alpha-hooks/web';
```

The `/web` entry registers the browser platform adapter and contains no React Native code. Bundlers that honour the `browser` export condition (Vite, webpack 5, esbuild, Parcel) will also resolve the bare package name to the web build, but the explicit `/web` import is recommended because:

- it works regardless of bundler configuration, and
- TypeScript resolves the web type declarations, which do not reference `react-native`.

## Setup

Wrap your application once with `AlphaProvider`. With Vite:

```tsx
// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AlphaProvider } from '@scripturecoder/rn-alpha-hooks/web';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AlphaProvider
      config={{
        baseUrl: import.meta.env.VITE_API_URL,   // e.g. https://api.example.com (no trailing slash)
        paths: {
          login: 'POST:/auth/login',
          me: 'GET:/users/me',
          users: 'GET:/users',
          user: 'GET:/users/:id',
          updateUser: 'PUT:/users/:id',
        },
        dataPath: 'data',        // where the payload lives inside the JSON body (see below)
        debug: import.meta.env.DEV,
        onAuthError: () => {
          window.location.assign('/login');
        },
      }}
    >
      <App />
    </AlphaProvider>
  </React.StrictMode>,
);
```

Routes use the format `METHOD:/path/:param`. Path parameters are filled from the `variables` you pass to a hook and removed from the query string or body. Any variable that is not a path parameter becomes a query parameter for `GET` requests and the JSON body for everything else.

Keep routes in their own file as your app grows:

```typescript
// src/api/routes.ts
export default {
  login: 'POST:/auth/login',
  me: 'GET:/users/me',
  users: 'GET:/users',
} as const;
```

## Fetching data with `useQuery`

```tsx
import { useQuery } from '@scripturecoder/rn-alpha-hooks/web';

function UserProfile({ id }: { id: string }) {
  const { data, loading, error, refetch } = useQuery('user', {
    variables: { id },
  });

  if (loading) return <p>Loading…</p>;
  if (error) return <p role="alert">{error}</p>;

  return (
    <section>
      <h1>{data.name}</h1>
      <button onClick={() => refetch()}>Refresh</button>
    </section>
  );
}
```

### Network policies

Pass `networkPolicy` to control how the cache is used:

| Policy | Behaviour |
|--------|-----------|
| `cache-first` (default) | Return cached data if present, otherwise fetch. |
| `network-only` | Always fetch; never shares cache with other components. |
| `cache-only` | Never fetch; read whatever is cached. |
| `network-and-cache` | Show cache immediately and fetch in the background. |
| `stale-while-revalidate` | Show cache immediately; refetch if the entry is stale. |

```typescript
const { data } = useQuery('users', { networkPolicy: 'stale-while-revalidate' });
```

### Pagination with `fetchMore`

```tsx
const { data, fetchMore } = useQuery('users', { variables: { page: 1 } });

const loadNextPage = () => fetchMore({ page: 2 }, 'end');           // append to a cached array
const loadNested   = () => fetchMore({ page: 2 }, 'pagination', 'items'); // merge { items: [...] }
```

### Callbacks and cancellation

```typescript
const { abort } = useQuery('search', {
  variables: { q: term },
  networkPolicy: 'network-only',
  onCompleted: results => console.log(results.length),
  onError: (message, status) => console.warn(status, message),
});

// abort() cancels the in-flight request, e.g. in a useEffect cleanup
```

### One-off fetches with `useQueryAsync`

When you need to fetch imperatively (inside an event handler, for example) and still update the shared cache:

```typescript
const query = useQueryAsync();

const handleClick = async () => {
  const result = await query('user', { id: '42' });
  if ('data' in result) console.log(result.data);
  else console.error(result.error);
};
```

## Mutations and authentication

`useMutation` returns a tuple: the mutate function and a state object.

```tsx
import { useMutation, useApp } from '@scripturecoder/rn-alpha-hooks/web';

function LoginForm() {
  const [login, { loading, error }] = useMutation('login');
  const { setAuth, setUser } = useApp();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const result = await login({
      email: form.get('email'),
      password: form.get('password'),
    });

    if ('data' in result) {
      // The Authorization header is sent exactly as stored, so include the scheme.
      setAuth({ accessToken: `Bearer ${result.data.token}`, userId: result.data.user.id });
      setUser(result.data.user);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input name="email" type="email" required />
      <input name="password" type="password" required />
      <button disabled={loading}>Sign in</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
}
```

Notes:

- Every request sends `Authorization: <accessToken>` when an access token is set. The value is **not** prefixed automatically, so store `Bearer …` if your API expects it.
- On the web, calling a mutation blurs the focused element (the equivalent of dismissing the keyboard). Pass `{ keyboard: false }` to `useMutation` to disable that.
- A `401` or `404` response clears the stored auth and calls `config.onAuthError(status)`. Use it to redirect to your login route.
- `useApp()` also exposes `user`, `auth`, `connected`, `colorMode`, `clearAuth()` and friends.

With React Router, redirect from `onAuthError` like this:

```tsx
// Put AlphaProvider *inside* the router so you can use navigate().
function Providers({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const config = useMemo(() => ({
    baseUrl: import.meta.env.VITE_API_URL,
    paths: routes,
    onAuthError: () => navigate('/login', { replace: true }),
  }), [navigate]);

  return <AlphaProvider config={config}>{children}</AlphaProvider>;
}
```

Memoise the config object; a new object on every render re-applies the HTTP configuration.

## Response shape and `dataPath`

Hooks return `res.data[dataPath]`. The default `dataPath` is `"data"`, which suits APIs that respond with:

```json
{ "data": { "id": 1, "name": "Ada" } }
```

If your API returns the payload at the top level, set `dataPath: ''`. Dot notation reaches nested fields (`dataPath: 'result.items'`). You can override per hook:

```typescript
useQuery('users', { dataPath: 'result.items' });
useMutation('login', { dataPath: '' });
```

Only `200` and `201` count as success. Any other status becomes `error` (extracted from `error`, `message` or `ResponseDescription` fields in the body).

## Cache manipulation

Every `useQuery` result exposes helpers bound to its own cache key:

```typescript
const { data, update, updateItem, deleteItem, prepend, append, optimisticUpdate } = useQuery('users');

updateItem('42', { name: 'Grace' });   // matches on `id` or `_id`
deleteItem('42');
prepend(newUser);

const rollback = optimisticUpdate(current => [...current, draft]);
const result = await createUser(draft);
if ('error' in result) rollback();
```

For cross-component access use `useCache()`:

```typescript
const cache = useCache();
const key = cache.getKey('user', { id: '42' });

cache.update(key, updatedUser);
cache.invalidate(key);            // drop one entry
cache.invalidateQueries(/^\/users/); // drop everything matching a pattern
cache.invalidateAll();
```

## Connectivity and background refetching

- `useApp().connected` reflects `navigator.onLine` and updates on the browser's `online`/`offline` events.
- A query that failed with no cached data automatically retries once when the browser goes from offline to online.

The background-refetch hooks are opt-in and take the `refetch` function from a query:

```typescript
import { useQuery, useRefetchOnFocus, useRefetchOnReconnect, useRefetchInterval } from '@scripturecoder/rn-alpha-hooks/web';

const { data, refetch } = useQuery('dashboard');

useRefetchOnFocus(true, refetch);          // when the tab becomes visible again
useRefetchOnReconnect(true, refetch);      // when the browser comes back online
useRefetchInterval(true, refetch, 30_000); // poll every 30 seconds
```

(The `refetchOnWindowFocus`, `refetchOnReconnect` and `refetchInterval` fields on `QueryOptions` are currently not wired up inside `useQuery`; use the hooks above.)

## Persistence

The whole Redux state (auth, user, and the query cache) is saved to `localStorage` under the key `_alpha_state` and restored on the next page load. That means a logged-in user stays logged in across reloads, and cached lists render instantly.

To change the key or disable persistence:

```tsx
<AlphaProvider config={config} storeOptions={{ persist: false }}>
<AlphaProvider config={config} storeOptions={{ storageKey: 'my-app' }}>
```

The `storage` utility gives you the same key-value store for your own data:

```typescript
import { storage } from '@scripturecoder/rn-alpha-hooks/web';

storage.setItem('theme', 'dark');
storage.getItem('theme');   // 'dark' (JSON round-trip is handled for you)
storage.removeItem('theme');
```

## Encryption

AES request/response encryption works identically on the web. Supply 16-character `key` and `iv` values and enable it globally or per hook:

```typescript
<AlphaProvider config={{
  baseUrl: '…',
  encryption: { key: import.meta.env.VITE_ENC_KEY, iv: import.meta.env.VITE_ENC_IV },
}}>

const [login] = useMutation('login', { encrypted: { request: ['password'] } });
```

Remember that anything shipped to the browser is visible to users; encryption here protects data in transit through intermediaries, not from the client itself. See the README's *Encryption & Security* section for the full API.

## Customising the platform adapter

The platform layer is a small object you can replace. Register it **before** rendering `AlphaProvider` (for example at the top of `main.tsx`):

```typescript
import { setPlatformAdapter, createWebAdapter } from '@scripturecoder/rn-alpha-hooks/web';
import { toast } from 'react-hot-toast';

setPlatformAdapter({
  ...createWebAdapter(),
  // Use your UI library's toast instead of the built-in DOM toast
  toast: message => toast(message),
  // Use sessionStorage so state is dropped when the tab closes
  storage: {
    getItem: key => { const v = sessionStorage.getItem(key); return v === null ? undefined : JSON.parse(v); },
    setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
    removeItem: key => sessionStorage.removeItem(key),
    clear: () => sessionStorage.clear(),
  },
});
```

The full interface (`PlatformAdapter`) has these members:

| Member | Purpose | Web default |
|--------|---------|-------------|
| `storage` | Key/value persistence | `localStorage` (memory fallback) |
| `onConnectivityChange(listener)` | Online/offline subscription | `navigator.onLine` + events |
| `onForeground(listener)` | Tab became visible | `document.visibilitychange` |
| `dismissKeyboard()` | Called before mutations | blur the active element |
| `toast(message, duration)` | Transient message | minimal DOM toast |
| `readFile(path)` | Read a file as base64 | `fetch` + `FileReader` |
| `createAnimatedValue(initial)` | Backs `useApp().scrollY` | `{ value, setValue }` object |

## Next.js and server-side rendering

- The web adapter falls back to in-memory storage when `window` is undefined, so importing the package on the server is safe.
- `AlphaProvider` uses browser APIs and React context, so render it from a Client Component:

```tsx
// app/providers.tsx
'use client';
import { AlphaProvider } from '@scripturecoder/rn-alpha-hooks/web';

export function Providers({ children }: { children: React.ReactNode }) {
  return <AlphaProvider config={{ baseUrl: process.env.NEXT_PUBLIC_API_URL! }}>{children}</AlphaProvider>;
}
```

- Persisted state is only available in the browser. If a component renders cached data on first paint, the server HTML and the client render will differ and React will warn about a hydration mismatch. Either render such components client-only (`dynamic(() => import(...), { ssr: false })`) or gate on a `mounted` flag.

## Testing with Jest

Jest does not apply the `browser` export condition, so map the package to the web build:

```js
// jest.config.js
module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^@scripturecoder/rn-alpha-hooks$': '@scripturecoder/rn-alpha-hooks/web',
  },
};
```

For unit tests that should not touch `localStorage`, register the memory adapter in a setup file:

```typescript
import { setPlatformAdapter, createMemoryAdapter } from '@scripturecoder/rn-alpha-hooks/web';
setPlatformAdapter(createMemoryAdapter());
```

## Differences from React Native

| Feature | React Native | Web |
|---------|--------------|-----|
| Import path | `@scripturecoder/rn-alpha-hooks` | `@scripturecoder/rn-alpha-hooks/web` |
| Storage | MMKV | `localStorage` |
| `connected` | NetInfo `isInternetReachable` | `navigator.onLine` |
| Refetch on focus | `AppState` → `active` | tab `visibilitychange` |
| `Toast()` | native toast | small fixed-position DOM element |
| `readFile(path)` | reads `file://` paths | fetches a URL and returns base64 |
| `useApp().scrollY` | `Animated.Value` | plain `{ value, setValue }` object |
| Keyboard dismiss | `Keyboard.dismiss()` | `document.activeElement.blur()` |

Everything else (hooks, options, cache API, store customisation, encryption, TypeScript types) is the same, so shared hook wrappers can be reused across a React Native app and a web app.

## Troubleshooting

**`Cannot find module 'react-native'` or `react-native-mmkv` during build**
You imported the root entry in a tool that does not use the `browser` condition. Import from `@scripturecoder/rn-alpha-hooks/web`, or add `browser` to your bundler's resolve conditions.

**Console warning: "No platform adapter registered; using in-memory fallback"**
Something imported an internal file directly (for example a deep `dist/...` path). Import only from the package entry points, which register the adapter.

**State is not persisted between reloads**
Persistence needs `localStorage`. Private-browsing modes and some embedded webviews block it, in which case the adapter silently uses memory. Check `storage.getItem('_alpha_state')` in the console.

**Requests go out without the Authorization header**
`setAuth` was called after the request started, or the token is empty. The header is only added when `auth.accessToken` is a non-empty string, and it is sent verbatim.

**Requests hit the wrong host**
`baseUrl` must not end with a slash, and route paths must start with `METHOD:/`.

**`onAuthError` fires on 404**
By design: both `401` and `404` are treated as auth failures. If your API uses `404` for missing resources, handle that inside `onAuthError` by checking the status argument.
