import { NetworkPolicy, ConcatStrategy } from "./constants";
import { Route } from "../types";

/**
 * Query hook options
 */
export interface QueryOptions {
  variables?: Record<string, any>;
  networkPolicy?: NetworkPolicy;
  init?: any;
  onCompleted?: (data: any) => void;
  onError?: (error: string, status?: number) => void;
  // Cache TTL options
  ttl?: number; // Cache expires after this time (ms)
  staleTime?: number; // Cache considered stale after this time (ms)
  // Background refetch options
  refetchOnWindowFocus?: boolean;
  refetchOnReconnect?: boolean;
  refetchInterval?: number; // Auto-refetch interval (ms)
  // Retry options
  retry?: number | {
    count: number;
    delay: number | 'exponential';
    retryCondition?: (error: any) => boolean;
  };
  // Debug options
  debug?: boolean;
}

/**
 * Timing information for requests
 */
export interface TimingInfo {
  startTime: number;
  endTime?: number;
  duration?: number;
}

/**
 * Query hook return type
 */
export interface QueryResult {
  data: any;
  loading: boolean;
  error: string | undefined;
  status?: number;
  key: string;
  refetch: (variables?: Record<string, any>) => void;
  fetchMore: (
    variables?: Record<string, any>,
    concat?: ConcatStrategy,
    paginationKey?: string
  ) => Promise<{ data?: any; error?: string }>;
  update: (data: any) => void;
  updateValue: (arg: string, value: any) => void;
  updateValues: (values: Record<string, any>) => void;
  updateItem: (id: string, value: any) => void;
  deleteItem: (id: string) => void;
  prepend: (data: any) => void;
  append: (data: any) => void;
  abort: () => void;
  // NEW: Optimistic updates
  optimisticUpdate: (
    updater: (current: any) => any,
    rollback?: () => void
  ) => () => void;
  // NEW: Request timing
  timing?: TimingInfo;
}

/**
 * Mutation hook options
 */
export interface MutationOptions {
  keyboard?: boolean;
  text?: boolean;
  // NEW: Offline queue support
  offlineQueue?: boolean;
  // NEW: Retry options
  retry?: number | {
    count: number;
    delay: number | 'exponential';
    retryCondition?: (error: any) => boolean;
  };
  // NEW: Debug mode
  debug?: boolean;
}

/**
 * Response type for mutations
 */
export interface MutationResponse<T = any> {
  data?: T;
  error?: string;
  status?: number;
}

/**
 * Mutation hook return type - tuple with mutate function and state object
 */
export type MutationResult<T = any> = [
  (variables: Record<string, any>) => Promise<MutationResponse<T>>,
  {
    loading: boolean;
    error?: string;
    data?: T;
    status?: number;
    cancel: () => void;
  }
];

/**
 * Cache operations interface
 */
export interface CacheOperations {
  setCache: (key: string, value: any) => void;
  getKey: (route: Route, variables?: Record<string, any>) => string;
  getContext: (route: Route, variables?: Record<string, any>) => {
    key: string;
    method: string;
    path: string;
    rawPath: string;
  };
  getData: (key: string) => any;
  getItem: (key: string, id: string) => any;
  update: (key: string, data: any) => void;
  updateValue: (key: string, arg: string, value: any) => void;
  updateValues: (key: string, values: Record<string, any>) => void;
  updateItem: (key: string, id: string, value: any) => void;
  deleteItem: (key: string, id: string) => void;
  prepend: (key: string, data: any) => void;
  append: (key: string, data: any) => void;
  updateOrPrepend: (key: string, data: any) => void;
  // NEW: Invalidation methods
  invalidate: (key: string) => void;
  invalidateQueries: (pattern: string | RegExp) => void;
  invalidateAll: () => void;
}

