/**
 * Store module exports
 * Re-exports store creation utilities and types
 */

export {
  createAlphaStore,
  defaultStore,
  CustomReducers,
  StoreOptions,
  RootState,
  AppDispatch,
} from './create-store';

// Re-export all reducers, actions, and types
export * from './reducers';

// For backward compatibility - export default store
export { defaultStore as store } from './create-store';
