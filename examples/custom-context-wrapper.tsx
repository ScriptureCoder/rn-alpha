/**
 * Example: Creating a custom context that wraps useApp
 * 
 * This pattern is useful when you want to:
 * - Extend the core app context with custom state
 * - Provide a single unified context for your entire app
 * - Add custom methods that combine core and custom state
 * - Maintain type safety across your application
 */

import React, { createContext, useContext, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { 
  AlphaProvider, 
  useApp, 
  AppContextValue,
  useSelector,
  useDispatch,
  CoreAppState,
} from '@scripturecoder/rn-alpha';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actions as cacheActions } from '@scripturecoder/rn-alpha/src/store/reducers/cache-reducer';

// ============================================
// 1. Define Your Custom State
// ============================================

interface AppSettings {
  theme: 'light' | 'dark';
  language: string;
  biometric: boolean;
  defaultPassword: boolean;
  email: string;
  image: string;
}

const appSettingsSlice = createSlice({
  name: 'appSettings',
  initialState: {
    theme: 'light' as 'light' | 'dark',
    language: 'en',
    biometric: false,
    defaultPassword: false,
    email: '',
    image: '',
  } as AppSettings,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    setBiometric: (state, action: PayloadAction<boolean>) => {
      state.biometric = action.payload;
    },
    setDefaultPassword: (state, action: PayloadAction<boolean>) => {
      state.defaultPassword = action.payload;
    },
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setImage: (state, action: PayloadAction<string>) => {
      state.image = action.payload;
    },
  },
});

// ============================================
// 2. Define Your Extended Context Type
// ============================================

/**
 * Your app's extended context that includes both
 * core functionality and custom state/methods
 */
export interface MyAppContextValue extends AppContextValue {
  // Custom state from your reducer
  theme: 'light' | 'dark';
  language: string;
  biometric: boolean;
  defaultPassword: boolean;
  email: string;
  image: string;
  
  // Custom actions
  setTheme: (theme: 'light' | 'dark') => void;
  setLanguage: (lang: string) => void;
  setBiometric: (value: boolean) => void;
  setDefaultPassword: (value: boolean) => void;
  setEmail: (email: string) => void;
  setImage: (image: string) => void;
  
  // Custom composite actions
  logout: () => Promise<void>;
  handleTimeout: () => Promise<void>;
}

// ============================================
// 3. Create Your Extended Context
// ============================================

const MyAppContext = createContext<MyAppContextValue | undefined>(undefined);

/**
 * Provider that wraps rn-alpha's core context with your custom state
 */
export function MyAppProvider({ children }: { children: React.ReactNode }) {
  const navigation = useNavigation<any>();
  
  // Get core app context (auth, user, connected)
  const coreApp = useApp<AppContextValue>();
  
  // Get your custom state from Redux
  const settings = useSelector((state: any) => state.appSettings as AppSettings);
  
  const dispatch = useDispatch();

  // Create extended context value
  const value = useMemo<MyAppContextValue>(
    () => ({
      // Include all core features
      ...coreApp,
      
      // Add custom state
      theme: settings.theme,
      language: settings.language,
      biometric: settings.biometric,
      defaultPassword: settings.defaultPassword,
      email: settings.email,
      image: settings.image,
      
      // Add custom actions
      setTheme: (theme) => dispatch(appSettingsSlice.actions.setTheme(theme)),
      setLanguage: (lang) => dispatch(appSettingsSlice.actions.setLanguage(lang)),
      setBiometric: (value) => dispatch(appSettingsSlice.actions.setBiometric(value)),
      setDefaultPassword: (value) => dispatch(appSettingsSlice.actions.setDefaultPassword(value)),
      setEmail: (email) => dispatch(appSettingsSlice.actions.setEmail(email)),
      setImage: (image) => dispatch(appSettingsSlice.actions.setImage(image)),
      
      // Add custom composite actions that use multiple features
      logout: async () => {
        // Clear cache
        dispatch(cacheActions.clear());
        // Clear auth (from core)
        coreApp.clearAuth();
        // Navigate to login
        navigation.reset({
          index: 0,
          routes: [{ name: 'login' }],
        });
      },
      
      handleTimeout: async () => {
        // Clear everything
        dispatch(cacheActions.clear());
        coreApp.clearAuth();
        // Show message and navigate
        alert('Session expired! Please login again.');
        navigation.reset({
          index: 0,
          routes: [{ name: 'login' }],
        });
      },
    }),
    [coreApp, settings, dispatch, navigation]
  );

  return (
    <MyAppContext.Provider value={value}>
      {children}
    </MyAppContext.Provider>
  );
}

// ============================================
// 4. Create Your Custom Hook
// ============================================

/**
 * Hook to access your extended app context
 */
export function useMyApp(): MyAppContextValue {
  const context = useContext(MyAppContext);
  if (!context) {
    throw new Error('useMyApp must be used within MyAppProvider');
  }
  return context;
}

// ============================================
// 5. Setup in App.tsx
// ============================================

/**
 * Example App setup combining AlphaProvider and MyAppProvider
 */
export function App() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        paths: {
          login: 'POST:/auth/login',
          profile: 'GET:/user/profile',
        },
        debug: __DEV__,
      }}
      customReducers={{
        appSettings: appSettingsSlice.reducer,
      }}
    >
      <MyAppProvider>
        <Navigation />
      </MyAppProvider>
    </AlphaProvider>
  );
}

// ============================================
// 6. Use in Components
// ============================================

/**
 * Example component using the extended context
 */
export function ProfileScreen() {
  const app = useMyApp();

  return (
    <div>
      <h1>Profile</h1>
      
      {/* Core state from rn-alpha */}
      <p>User ID: {app.auth.authId}</p>
      <p>Username: {app.user?.username}</p>
      <p>Connected: {app.connected ? 'Yes' : 'No'}</p>
      
      {/* Custom state */}
      <p>Email: {app.email}</p>
      <p>Theme: {app.theme}</p>
      <p>Language: {app.language}</p>
      
      {/* Actions */}
      <button onClick={() => app.setTheme(app.theme === 'light' ? 'dark' : 'light')}>
        Toggle Theme
      </button>
      
      <button onClick={() => app.setBiometric(!app.biometric)}>
        {app.biometric ? 'Disable' : 'Enable'} Biometric
      </button>
      
      <button onClick={app.logout}>
        Logout
      </button>
    </div>
  );
}

/**
 * Example: Settings component
 */
export function SettingsScreen() {
  const app = useMyApp();

  return (
    <div>
      <h2>Settings</h2>
      
      <label>
        Theme:
        <select value={app.theme} onChange={(e) => app.setTheme(e.target.value as 'light' | 'dark')}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </label>
      
      <label>
        Language:
        <select value={app.language} onChange={(e) => app.setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="es">Spanish</option>
          <option value="fr">French</option>
        </select>
      </label>
      
      <label>
        <input
          type="checkbox"
          checked={app.biometric}
          onChange={(e) => app.setBiometric(e.target.checked)}
        />
        Enable Biometric Authentication
      </label>
      
      <label>
        Email:
        <input
          type="email"
          value={app.email}
          onChange={(e) => app.setEmail(e.target.value)}
        />
      </label>
    </div>
  );
}

// ============================================
// 7. Advanced: Typed Hooks for Specific Values
// ============================================

/**
 * Hook to get just the theme
 */
export function useAppTheme() {
  const { theme, setTheme } = useMyApp();
  return { theme, setTheme };
}

/**
 * Hook to get authentication status
 */
export function useIsAuthenticated() {
  const { auth } = useMyApp();
  return !!auth.accessToken;
}

/**
 * Hook to get user profile data
 */
export function useUserProfile() {
  const { user, email, image } = useMyApp();
  return { user, email, image };
}

/**
 * Example component using specialized hooks
 */
export function Header() {
  const { theme, setTheme } = useAppTheme();
  const isAuthenticated = useIsAuthenticated();
  const { user } = useUserProfile();

  return (
    <header>
      <h1>My App</h1>
      {isAuthenticated && <span>Welcome, {user?.username}!</span>}
      <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
        {theme === 'light' ? '🌙' : '☀️'}
      </button>
    </header>
  );
}

// Export slice for potential direct use
export const appSettingsActions = appSettingsSlice.actions;
export { appSettingsSlice };

