import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

// Hooks exports
export { default as useQuery } from './hooks/use-query';
export { default as useQueryAsync } from './hooks/use-query-async';
export { default as useMutation } from './hooks/use-mutation';
export { default as useMutationAsync } from './hooks/use-mutation-async';
export { default as useDispatch } from './hooks/use-dispatch';
export { default as useSelector } from './hooks/use-selector';
export { default as useCache } from './hooks/use-cache';
export { useApp } from './store/contexts/app-context';
export { dayjs };

// Hook types
export type {
  QueryOptions,
  QueryResult,
  MutationOptions,
  MutationResponse,
  MutationResult,
  CacheOperations,
  TimingInfo,
} from './hooks/types';
export type { NetworkPolicy, ConcatStrategy } from './hooks/constants';
export type {
  ParsedRoute,
  ErrorResponse,
  SuccessResponse,
  ApiResponse,
} from './hooks/utils';

// Cache types
export type { CacheEntry, CacheState, CacheMetadata } from './store/reducers/cache-reducer';
export { setMaxCacheSize, getCacheMetadata } from './store/reducers/cache-reducer';

// HTTP service types and utilities
export type { HttpOptions, ContentType, HttpResponse } from './utils/service';
export { isAbortError as isHttpAbortError } from './utils/service';

// HTTP helper utilities
export {
  createAbortController,
  isAbortError,
  isCancelError,
  shouldRetry,
  formatFormData,
  formatUrlEncoded,
  safeAbort,
  createTimeoutController,
  combineAbortSignals,
} from './utils/http-helpers';

// Error handler utilities
export {
  extractErrorMessage,
  isSuccessStatus,
  isAuthError,
  createErrorResponse,
  createSuccessResponse,
} from './hooks/utils/error-handler';

// NEW: Request deduplication
export {
  getOrCreateRequest,
  cancelRequest,
  isRequestInFlight,
  getInFlightCount,
  clearAllRequests,
} from './hooks/utils/request-queue';

// NEW: Cache helpers
export {
  isCacheExpired,
  isCacheStale,
  isCacheFresh,
  getCacheData,
  createCacheEntry,
  getCacheAge,
  canUseCache,
} from './hooks/utils/cache-helpers';

// NEW: Debug logger
export {
  QueryDebugger,
  createDebugger,
  enableGlobalDebug,
  disableGlobalDebug,
  isGlobalDebugEnabled,
} from './hooks/utils/debug-logger';
export type { QueryDebugInfo } from './hooks/utils/debug-logger';

// NEW: Retry manager
export {
  retryWithBackoff,
  retryWithJitter,
} from './hooks/utils/retry-manager';
export type { RetryOptions } from './hooks/utils/retry-manager';

// NEW: Offline queue
export {
  OfflineQueue,
  getOfflineQueue,
} from './hooks/utils/offline-queue';
export type { QueuedMutation } from './hooks/utils/offline-queue';

// NEW: Refetch hooks
export {
  useRefetchOnFocus,
  useRefetchOnReconnect,
  useRefetchInterval,
} from './hooks/utils/refetch-manager';

// Configuration Provider (NEW - Recommended)
export { AlphaProvider } from './store/contexts/alpha-provider';
export type { AlphaConfig } from './config';
export { DEFAULT_CONFIG } from './config';
export { useAlphaConfig } from './store/contexts/config-context';

// Store exports
export { default as AppProvider } from './store/contexts/app-context';
export { AppContextValue } from './store/contexts/app-context';
export { store, createAlphaStore, defaultStore } from './store';
export type { 
  AppDispatch, 
  RootState, 
  CustomReducers, 
  StoreOptions,
  CoreAppState,
  LegacyAppState,
} from './store';
export { appActions } from './store';

// TypeScript helpers for custom stores
export {
  createTypedSelector,
  createTypedDispatch,
  useAppSelector,
  useAppDispatch,
  createSelector,
  createSlice,
} from './store/type-helpers';
export type {
  InferActions,
  ExtendedRootState,
  ExtendedAppContext,
  StateFromReducer,
} from './store/type-helpers';

export { config as alphaConfig, naira } from './config';
export { default as PATHS } from './paths';
export * from './types';

// HTTP Config (Advanced use)
export { setHttpConfig, getHttpConfig } from './utils/service';

export { default as formatMoney } from './utils/money';
export { 
  encrypt, 
  decrypt, 
  setEncryptionConfig, 
  getEncryptionConfig,
  isValidEncryptionConfig,
  generateEncryptionConfig,
} from './utils/crypto';
export type { EncryptionConfig } from './utils/crypto';
export { default as storage } from './utils/storage';

// NEW: Constants
export {
  DEFAULT_CACHE_TTL,
  DEFAULT_STALE_TIME,
  MAX_CACHE_SIZE,
  NETWORK_TIMEOUT,
  ERROR_MESSAGES,
  STATUS_CODES,
} from './hooks/constants';
