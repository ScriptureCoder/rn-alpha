# Store Customization Guide

This guide explains how to extend `rn-alpha`'s Redux store with your own custom state slices, reducers, and actions.

## Table of Contents

- [Overview](#overview)
- [Why Extend the Store?](#why-extend-the-store)
- [Core State](#core-state)
- [Adding Custom Reducers](#adding-custom-reducers)
- [Creating Custom Contexts](#creating-custom-contexts)
- [TypeScript Best Practices](#typescript-best-practices)
- [Migration Guide](#migration-guide)
- [Advanced Patterns](#advanced-patterns)
- [Examples](#examples)

---

## Overview

`rn-alpha` provides a **minimal core state** (authentication and user data) that every app needs. For app-specific features like themes, preferences, or settings, you can extend the store with your own **custom reducers**.

### Core Philosophy

✅ **Minimal Core** - Only essential auth & user state  
✅ **Extensible** - Easy to add custom state slices  
✅ **Type-Safe** - Full TypeScript support  
✅ **Flexible** - Choose your own state structure  
✅ **No Coupling** - Your state, your rules

---

## Why Extend the Store?

Instead of hardcoding app-specific fields into the package, `rn-alpha` lets you:

- **Add any state you need** - themes, settings, preferences, etc.
- **Keep the package lightweight** - no unused features
- **Maintain type safety** - define your own types
- **Update independently** - change your state without affecting core
- **Share state globally** - access from any component

---

## Core State

The package provides these core slices (always included):

### 1. App Reducer (Core)

```typescript
interface CoreAppState {
  auth: {
    accessToken: string;
    refreshToken: string;
    authId?: string;
  };
  user: any; // Your user object
}
```

**Actions:**
- `setAuth(payload)` - Set authentication tokens
- `setUser(payload)` - Set user data
- `clearAuth()` - Clear authentication and user

### 2. Cache Reducer (Core)

Stores API response cache with TTL and LRU eviction.

### 3. Thread Reducer (Core)

Manages background threads/workers.

---

## Adding Custom Reducers

### Step 1: Create Your Reducer

Use Redux Toolkit's `createSlice`:

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

### Step 2: Pass to AlphaProvider

```typescript
import { AlphaProvider } from '@scripturecoder/rn-alpha';
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

### Step 3: Access Your State

```typescript
import { useSelector } from '@scripturecoder/rn-alpha';

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

---

## Creating Custom Contexts

For better ergonomics, wrap `useApp` with your own context:

### Pattern 1: Extended Context

```typescript
import { createContext, useContext, useMemo } from 'react';
import { useApp, AppContextValue, useSelector, useDispatch } from '@scripturecoder/rn-alpha';

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

### Pattern 2: Specialized Hooks

```typescript
// Hook for settings only
export function useAppSettings() {
  return useSelector((state: any) => state.settings);
}

// Hook for theme only
export function useTheme() {
  const { theme } = useAppSettings();
  return theme;
}

// Hook for authentication status
export function useIsAuthenticated() {
  const { auth } = useApp();
  return !!auth.accessToken;
}
```

---

## TypeScript Best Practices

### 1. Define Your Root State Type

```typescript
import { RootState as CoreRootState } from '@scripturecoder/rn-alpha';

interface CustomState {
  settings: SettingsState;
  preferences: PreferencesState;
}

// Your app's complete state
type AppRootState = CoreRootState & CustomState;
```

### 2. Create Typed Selector Hook

```typescript
import { useSelector as useReduxSelector, TypedUseSelectorHook } from 'react-redux';

export const useTypedSelector: TypedUseSelectorHook<AppRootState> = useReduxSelector;

// Usage
function Component() {
  const theme = useTypedSelector((state) => state.settings.theme); // fully typed!
}
```

### 3. Export Typed Dispatch

```typescript
import { AppDispatch } from '@scripturecoder/rn-alpha';
import { useDispatch as useReduxDispatch } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useReduxDispatch;
```

### 4. Type Your Actions

```typescript
import { settingsActions } from './settingsSlice';

// Infer action types
type SettingsAction = ReturnType<typeof settingsActions[keyof typeof settingsActions]>;
```

---

## Migration Guide

### Migrating from Hardcoded Fields

If you were using old fields like `colorMode`, `biometric`, `defaultPassword`, etc:

#### Before (Old Package):

```typescript
const { colorMode, biometric, setColorMode, setBiometric } = useApp();
```

#### After (Custom Reducer):

**1. Create a settings slice:**

```typescript
const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    colorMode: 'light',
    biometric: false,
    defaultPassword: false,
  },
  reducers: {
    setColorMode: (state, action) => { state.colorMode = action.payload; },
    setBiometric: (state, action) => { state.biometric = action.payload; },
    setDefaultPassword: (state, action) => { state.defaultPassword = action.payload; },
  },
});
```

**2. Add to AlphaProvider:**

```typescript
<AlphaProvider
  config={{...}}
  customReducers={{ settings: settingsSlice.reducer }}
>
```

**3. Create custom context (optional):**

```typescript
export function MyAppProvider({ children }) {
  const coreApp = useApp();
  const settings = useSelector((state: any) => state.settings);
  const dispatch = useDispatch();

  const value = {
    ...coreApp,
    colorMode: settings.colorMode,
    biometric: settings.biometric,
    setColorMode: (mode) => dispatch(settingsSlice.actions.setColorMode(mode)),
    setBiometric: (value) => dispatch(settingsSlice.actions.setBiometric(value)),
  };

  return <MyAppContext.Provider value={value}>{children}</MyAppContext.Provider>;
}
```

**4. Update imports:**

```typescript
// Before
import { useApp } from '@scripturecoder/rn-alpha';

// After
import { useMyApp as useApp } from './contexts/MyAppProvider';
```

---

## Advanced Patterns

### 1. Persisting Custom State

The store automatically persists to local storage by default:

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

### 2. Custom Store

For complete control, create your own store:

```typescript
import { createAlphaStore } from '@scripturecoder/rn-alpha';

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

### 3. Multiple Custom Contexts

```typescript
// Settings Context
export function SettingsProvider({ children }) {
  const settings = useSelector((state: any) => state.settings);
  // ...
}

// Preferences Context
export function PreferencesProvider({ children }) {
  const prefs = useSelector((state: any) => state.preferences);
  // ...
}

// Compose them
<AlphaProvider config={{...}} customReducers={{...}}>
  <SettingsProvider>
    <PreferencesProvider>
      <App />
    </PreferencesProvider>
  </SettingsProvider>
</AlphaProvider>
```

### 4. Middleware

Add custom middleware:

```typescript
import { createAlphaStore } from '@scripturecoder/rn-alpha';
import logger from 'redux-logger';

const myStore = createAlphaStore(customReducers);
// Note: Middleware customization requires accessing store internals
// For full control, use the store option in AlphaProvider
```

### 5. DevTools Integration

Redux DevTools work automatically in development:

```typescript
// No extra setup needed!
// Open Redux DevTools in your browser to see state
```

---

## Examples

See complete examples:

- **[`examples/custom-store-setup.tsx`](./examples/custom-store-setup.tsx)** - Basic custom reducers
- **[`examples/custom-context-wrapper.tsx`](./examples/custom-context-wrapper.tsx)** - Extended context pattern

### Quick Example: Theme + Preferences

```typescript
// 1. Create slices
const themeSlice = createSlice({
  name: 'theme',
  initialState: { mode: 'light' as 'light' | 'dark' },
  reducers: {
    toggle: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
    },
  },
});

const prefsSlice = createSlice({
  name: 'prefs',
  initialState: { notifications: true, language: 'en' },
  reducers: {
    toggleNotifications: (state) => { state.notifications = !state.notifications; },
    setLanguage: (state, action) => { state.language = action.payload; },
  },
});

// 2. Setup provider
<AlphaProvider
  config={{ baseUrl: '...' }}
  customReducers={{
    theme: themeSlice.reducer,
    prefs: prefsSlice.reducer,
  }}
>
  <App />
</AlphaProvider>

// 3. Use in components
function Settings() {
  const theme = useSelector((state: any) => state.theme);
  const prefs = useSelector((state: any) => state.prefs);
  const dispatch = useDispatch();

  return (
    <>
      <button onClick={() => dispatch(themeSlice.actions.toggle())}>
        Theme: {theme.mode}
      </button>
      <button onClick={() => dispatch(prefsSlice.actions.toggleNotifications())}>
        Notifications: {prefs.notifications ? 'On' : 'Off'}
      </button>
    </>
  );
}
```

---

## Best Practices

### ✅ Do

- **Keep slices focused** - One slice per feature domain
- **Use TypeScript** - Define state and action types
- **Create custom hooks** - Encapsulate selector logic
- **Memoize selectors** - Use `reselect` for derived data
- **Document your state** - Add JSDoc comments

### ❌ Don't

- **Modify core state directly** - Use provided actions
- **Put everything in one slice** - Split by feature
- **Store derived data** - Compute in selectors
- **Mutate state outside reducers** - Always use actions
- **Over-nest state** - Keep it flat when possible

---

## FAQ

### Q: Can I modify the core state structure?

**A:** No. The core state (auth, user) is managed by `rn-alpha`. Create custom reducers for additional state.

### Q: How do I share data between reducers?

**A:** Use selectors to read from other slices, or dispatch actions from one reducer's thunk to update another.

### Q: Can I use Redux Saga or Thunk?

**A:** Yes! The store is a standard Redux store. Add middleware via the `store` prop:

```typescript
const myStore = configureStore({
  reducer: { /* ... */ },
  middleware: (getDefault) => getDefault().concat(sagaMiddleware),
});
```

### Q: How do I reset all custom state on logout?

**A:** Add a reset action to each slice, or use `extraReducers`:

```typescript
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: { /* ... */ },
  extraReducers: (builder) => {
    builder.addCase(appActions.clearAuth, (state) => initialState);
  },
});
```

### Q: Can I use Redux Persist?

**A:** The package handles persistence automatically. For advanced use, disable built-in persistence and set up Redux Persist yourself.

---

## Support

For more help:
- 📖 [Main README](./README.md)
- 📋 [Configuration Guide](./CONFIGURATION.md)
- 💡 [Examples Directory](./examples/)
- 🐛 [Issues](https://github.com/yourusername/rn-alpha/issues)

---

**Happy Coding! 🚀**

