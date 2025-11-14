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

export { CoreAppState, LegacyAppState, actions as appActions } from './reducers/app-reducer';
export { CacheEntry, CacheState } from './reducers/cache-reducer';

// For backward compatibility - export default store
export { defaultStore as store } from './create-store';
