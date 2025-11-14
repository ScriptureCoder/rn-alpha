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
} from './hooks/types';
export type { NetworkPolicy, ConcatStrategy } from './hooks/constants';
export type {
  ParsedRoute,
  ErrorResponse,
  SuccessResponse,
  ApiResponse,
} from './hooks/utils';

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

// Store exports
export { default as AppProvider } from './store/contexts/app-context';
export { store } from './store';
export type { AppDispatch, RootState } from './store';

export { config as alphaConfig} from './config';
export { default as PATHS } from './paths';
export * from './types';

export { default as formatMoney } from './utils/money';
export * from './utils/crypto';
export { default as storage } from './utils/storage';
