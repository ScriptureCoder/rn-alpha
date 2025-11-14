/**
 * Example: How to extend rn-alpha with custom app state
 * 
 * This example demonstrates:
 * 1. Creating custom Redux slices for app-specific state
 * 2. Adding custom reducers to AlphaProvider
 * 3. Creating custom hooks to access your state
 * 4. Using your custom state in components
 */

import React from 'react';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AlphaProvider, useSelector, useDispatch } from '@scripturecoder/rn-alpha';

// ============================================
// 1. Define Your App's Custom State
// ============================================

/**
 * Example: Settings reducer for theme, language, notifications
 */
interface SettingsState {
  theme: 'light' | 'dark' | 'auto';
  language: string;
  notifications: boolean;
  fontSize: 'small' | 'medium' | 'large';
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState: {
    theme: 'auto' as 'light' | 'dark' | 'auto',
    language: 'en',
    notifications: true,
    fontSize: 'medium' as 'small' | 'medium' | 'large',
  } as SettingsState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'auto'>) => {
      state.theme = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.language = action.payload;
    },
    toggleNotifications: (state) => {
      state.notifications = !state.notifications;
    },
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.fontSize = action.payload;
    },
  },
});

/**
 * Example: User preferences reducer
 */
interface PreferencesState {
  emailNotifications: boolean;
  pushNotifications: boolean;
  biometric: boolean;
  defaultPassword: boolean;
  visibility: {
    wallet: boolean;
    savings: boolean;
    total: boolean;
    investment: boolean;
  };
}

const preferencesSlice = createSlice({
  name: 'preferences',
  initialState: {
    emailNotifications: true,
    pushNotifications: true,
    biometric: false,
    defaultPassword: false,
    visibility: {
      wallet: true,
      savings: true,
      total: true,
      investment: true,
    },
  } as PreferencesState,
  reducers: {
    toggleEmailNotifications: (state) => {
      state.emailNotifications = !state.emailNotifications;
    },
    togglePushNotifications: (state) => {
      state.pushNotifications = !state.pushNotifications;
    },
    setBiometric: (state, action: PayloadAction<boolean>) => {
      state.biometric = action.payload;
    },
    setDefaultPassword: (state, action: PayloadAction<boolean>) => {
      state.defaultPassword = action.payload;
    },
    toggleVisibility: (state, action: PayloadAction<keyof PreferencesState['visibility']>) => {
      state.visibility[action.payload] = !state.visibility[action.payload];
    },
  },
});

// ============================================
// 2. Create Custom Hooks for Your State
// ============================================

/**
 * Hook to access app settings
 */
export function useAppSettings() {
  return useSelector((state: any) => state.settings as SettingsState);
}

/**
 * Hook to access specific setting - theme
 */
export function useTheme() {
  const { theme } = useAppSettings();
  return theme;
}

/**
 * Hook to access specific setting - language
 */
export function useLanguage() {
  const { language } = useAppSettings();
  return language;
}

/**
 * Hook to access user preferences
 */
export function usePreferences() {
  return useSelector((state: any) => state.preferences as PreferencesState);
}

// ============================================
// 3. Setup AlphaProvider with Custom Reducers
// ============================================

/**
 * Example App.tsx setup
 */
export function App() {
  return (
    <AlphaProvider
      config={{
        baseUrl: 'https://api.example.com',
        paths: {
          login: 'POST:/auth/login',
          profile: 'GET:/user/profile',
          updateProfile: 'PUT:/user/profile',
        },
        cache: {
          ttl: 5 * 60 * 1000, // 5 minutes
          staleTime: 2 * 60 * 1000, // 2 minutes
        },
        debug: __DEV__,
      }}
      customReducers={{
        settings: settingsSlice.reducer,
        preferences: preferencesSlice.reducer,
        // Add more custom reducers here as your app grows
      }}
      storeOptions={{
        persist: true,
        storageKey: 'my-app-state',
      }}
    >
      <Navigation />
    </AlphaProvider>
  );
}

// ============================================
// 4. Use in Components
// ============================================

/**
 * Example: Theme toggle component
 */
export function ThemeToggle() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const cycleTheme = () => {
    const themes: Array<'light' | 'dark' | 'auto'> = ['light', 'dark', 'auto'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    dispatch(settingsSlice.actions.setTheme(nextTheme));
  };

  return (
    <button onClick={cycleTheme}>
      Current theme: {theme}. Tap to change.
    </button>
  );
}

/**
 * Example: Settings screen component
 */
export function SettingsScreen() {
  const settings = useAppSettings();
  const preferences = usePreferences();
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Settings</h2>
      
      {/* Theme Settings */}
      <section>
        <h3>Appearance</h3>
        <select
          value={settings.theme}
          onChange={(e) => dispatch(settingsSlice.actions.setTheme(e.target.value as any))}
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
          <option value="auto">Auto</option>
        </select>
        
        <select
          value={settings.fontSize}
          onChange={(e) => dispatch(settingsSlice.actions.setFontSize(e.target.value as any))}
        >
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </section>

      {/* Notification Settings */}
      <section>
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={preferences.emailNotifications}
            onChange={() => dispatch(preferencesSlice.actions.toggleEmailNotifications())}
          />
          Email Notifications
        </label>
        
        <label>
          <input
            type="checkbox"
            checked={preferences.pushNotifications}
            onChange={() => dispatch(preferencesSlice.actions.togglePushNotifications())}
          />
          Push Notifications
        </label>
      </section>

      {/* Security Settings */}
      <section>
        <h3>Security</h3>
        <label>
          <input
            type="checkbox"
            checked={preferences.biometric}
            onChange={(e) => dispatch(preferencesSlice.actions.setBiometric(e.target.checked))}
          />
          Enable Biometric Authentication
        </label>
      </section>

      {/* Visibility Settings */}
      <section>
        <h3>Visibility</h3>
        {(Object.keys(preferences.visibility) as Array<keyof PreferencesState['visibility']>).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              checked={preferences.visibility[key]}
              onChange={() => dispatch(preferencesSlice.actions.toggleVisibility(key))}
            />
            Show {key}
          </label>
        ))}
      </section>
    </div>
  );
}

// ============================================
// 5. Export Your Actions and Slices
// ============================================

export const settingsActions = settingsSlice.actions;
export const preferencesActions = preferencesSlice.actions;

/**
 * Example: Using actions in a service/utility
 */
export function applyThemeToNative(theme: 'light' | 'dark' | 'auto') {
  // Apply theme to React Native StatusBar, etc.
  console.log('Applying theme:', theme);
}

// ============================================
// 6. TypeScript Tips
// ============================================

/**
 * Define your app's complete state type for better TypeScript support
 */
export interface AppRootState {
  settings: SettingsState;
  preferences: PreferencesState;
  // Add other custom slices here
}

/**
 * Type-safe selector hook
 */
export function useTypedSelector<TSelected>(
  selector: (state: AppRootState) => TSelected
): TSelected {
  return useSelector(selector as any);
}

/**
 * Example usage with type safety
 */
export function TypeSafeComponent() {
  const theme = useTypedSelector((state) => state.settings.theme);
  const emailNotifs = useTypedSelector((state) => state.preferences.emailNotifications);
  
  return <div>Theme: {theme}, Email: {emailNotifs ? 'On' : 'Off'}</div>;
}

