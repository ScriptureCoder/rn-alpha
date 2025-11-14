/**
 * TypeScript helper utilities for creating type-safe custom stores
 * 
 * These utilities make it easier to work with custom reducers and extended state
 * while maintaining full type safety throughout your application.
 */

import { TypedUseSelectorHook, useSelector as useReduxSelector, useDispatch as useReduxDispatch } from 'react-redux';
import { AppDispatch, RootState } from './create-store';

/**
 * Creates a typed selector hook for your app's complete state
 * 
 * @example
 * ```typescript
 * // Define your app state
 * interface MyAppState {
 *   settings: SettingsState;
 *   preferences: PreferencesState;
 * }
 * 
 * // Create typed selector
 * export const useTypedSelector = createTypedSelector<MyAppState>();
 * 
 * // Use in components
 * const theme = useTypedSelector((state) => state.settings.theme); // fully typed!
 * ```
 */
export function createTypedSelector<TState extends Record<string, any>>(): TypedUseSelectorHook<TState> {
  return useReduxSelector as TypedUseSelectorHook<TState>;
}

/**
 * Creates a typed dispatch hook for your app
 * 
 * @example
 * ```typescript
 * export const useAppDispatch = createTypedDispatch();
 * 
 * // Use in components
 * const dispatch = useAppDispatch();
 * dispatch(myAction()); // typed based on your reducers
 * ```
 */
export function createTypedDispatch() {
  return useReduxDispatch<AppDispatch>;
}

/**
 * Helper type to infer action types from a slice
 * 
 * @example
 * ```typescript
 * const settingsSlice = createSlice({ ... });
 * type SettingsActions = InferActions<typeof settingsSlice.actions>;
 * ```
 */
export type InferActions<T extends Record<string, (...args: any[]) => any>> = ReturnType<T[keyof T]>;

/**
 * Helper type to merge core state with custom state
 * 
 * @example
 * ```typescript
 * import { RootState } from '@scripturecoder/rn-alpha';
 * 
 * interface CustomSlices {
 *   settings: SettingsState;
 *   preferences: PreferencesState;
 * }
 * 
 * type AppState = ExtendedRootState<CustomSlices>;
 * // Now AppState includes: app, cache, thread, settings, preferences
 * ```
 */
export type ExtendedRootState<TCustom extends Record<string, any>> = RootState<any> & TCustom;

/**
 * Helper to create a type-safe context value that extends AppContextValue
 * 
 * @example
 * ```typescript
 * import { AppContextValue } from '@scripturecoder/rn-alpha';
 * 
 * interface MyCustomFields {
 *   theme: string;
 *   setTheme: (theme: string) => void;
 * }
 * 
 * type MyAppContext = ExtendedAppContext<MyCustomFields>;
 * // Includes: auth, user, connected, setAuth, setUser, clearAuth, theme, setTheme
 * ```
 */
export type ExtendedAppContext<TCustom extends Record<string, any>> = import('./contexts/app-context').AppContextValue & TCustom;

/**
 * Helper to create strongly-typed selectors
 * 
 * @example
 * ```typescript
 * const selectTheme = createSelector(
 *   (state: AppState) => state.settings.theme
 * );
 * 
 * // Use in component
 * const theme = useTypedSelector(selectTheme);
 * ```
 */
export function createSelector<TState, TResult>(
  selector: (state: TState) => TResult
): (state: TState) => TResult {
  return selector;
}

/**
 * Helper to extract state type from a reducer
 * 
 * @example
 * ```typescript
 * const settingsReducer = (state, action) => { ... };
 * type SettingsState = StateFromReducer<typeof settingsReducer>;
 * ```
 */
export type StateFromReducer<TReducer extends (state: any, action: any) => any> = 
  TReducer extends (state: infer S, action: any) => any ? S : never;

/**
 * Helper to create a strongly-typed slice
 * Convenience wrapper around Redux Toolkit's createSlice with better inference
 */
export { createSlice } from '@reduxjs/toolkit';

/**
 * Default typed hooks that work with the core RootState
 * Can be used directly or as a starting point for your own typed hooks
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useAppDispatch = () => useReduxDispatch<AppDispatch>();

