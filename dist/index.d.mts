export { default as dayjs } from 'dayjs';
import * as redux_thunk from 'redux-thunk';
import * as redux from 'redux';
import { TypedUseSelectorHook } from 'react-redux';
import * as _reduxjs_toolkit from '@reduxjs/toolkit';
import React from 'react';

declare const PATHS: {
    login: string;
    biometricAuth: string;
    generateOtp: string;
    validateOtp: string;
    register: string;
    forgot: string;
    getAccounts: string;
    getTransferAccounts: string;
    getCustomer: string;
    getBvnDetails: string;
    validateOTPBVN: string;
    registerDevice: string;
    accountStatement: string;
    loanHistory: string;
    customerSummary: string;
    accountHistory: string;
    downloadStatement: string;
    changePassword: string;
    changePin: string;
    deleteBeneficiary: string;
    addBeneficiary: string;
    getBeneficiaries: string;
    confirmBeneficiary: string;
    getBanks: string;
    transferHistory: string;
    transferBeneficiary: string;
    transfer: string;
    airtime: string;
    bill: string;
    billHistory: string;
    billerCategories: string;
    billers: string;
    billerProduct: string;
    validateBillCustomer: string;
    getDeposit: string;
    getSavings: string;
    createSavings: string;
    getLoans: string;
    liqudateDeposit: string;
    getInvestmentRate: string;
    createDeposit: string;
    getCards: string;
    fundWallet: string;
    requestLoan: string;
    calculateLTV: string;
    updateSavings: string;
    closeSavings: string;
    savings: string;
    savingsWithdrawal: string;
    registerToken: string;
    feedback: string;
    blockCard: string;
    requestCard: string;
    verifyNin: string;
    updateLocationId: string;
};

type RootStackParamList = {
    Root: undefined;
    NotFound: undefined;
    dashboard: undefined;
    supportRoot: undefined;
};
type ModalProps = {
    setModal: (value: boolean) => void;
    modal: boolean;
};
type SheetProps = {
    setOpen: (value: boolean) => void;
    open: boolean;
};
type DashboardStackList = {
    dashboard: undefined;
};
type Weight = 'Regular' | 'Bold' | 'SemiBold' | 'Light' | 'Medium' | 'ExtraLight' | 'Italic' | 'ExtraBold';
type Route = keyof typeof PATHS;
type Visibility = 'wallet' | 'savings' | 'investment' | 'total';

/**
 * Hook-related constants
 */
/**
 * Network request timeout in milliseconds
 */
declare const NETWORK_TIMEOUT = 10000;
/**
 * Default error messages
 */
declare const ERROR_MESSAGES: {
    readonly GENERIC: "Oops! an error occurred";
    readonly NETWORK: "Network error occurred";
    readonly TIMEOUT: "Request timed out";
    readonly SESSION_EXPIRED: "Session expired! kindly login";
    readonly UNAUTHORIZED: "Unauthorized access";
};
/**
 * HTTP status codes
 */
declare const STATUS_CODES: {
    readonly OK: 200;
    readonly CREATED: 201;
    readonly BAD_REQUEST: 400;
    readonly UNAUTHORIZED: 401;
    readonly FORBIDDEN: 403;
    readonly NOT_FOUND: 404;
    readonly SERVER_ERROR: 500;
};
/**
 * Cache TTL constants
 */
declare const DEFAULT_CACHE_TTL: number;
declare const DEFAULT_STALE_TIME = 0;
declare const MAX_CACHE_SIZE = 100;
/**
 * Network policies for queries
 */
type NetworkPolicy = "network-and-cache" | "cache-only" | "network-only" | "cache-first" | "stale-while-revalidate";
/**
 * Concat strategies for fetchMore
 */
type ConcatStrategy = "start" | "end" | "pagination";

/**
 * Query hook options
 */
interface QueryOptions {
    variables?: Record<string, any>;
    networkPolicy?: NetworkPolicy;
    init?: any;
    onCompleted?: (data: any) => void;
    onError?: (error: string, status?: number) => void;
    ttl?: number;
    staleTime?: number;
    refetchOnWindowFocus?: boolean;
    refetchOnReconnect?: boolean;
    refetchInterval?: number;
    retry?: number | {
        count: number;
        delay: number | 'exponential';
        retryCondition?: (error: any) => boolean;
    };
    debug?: boolean;
}
/**
 * Timing information for requests
 */
interface TimingInfo {
    startTime: number;
    endTime?: number;
    duration?: number;
}
/**
 * Query hook return type
 */
interface QueryResult {
    data: any;
    loading: boolean;
    error: string | undefined;
    key: string;
    refetch: (variables?: Record<string, any>) => void;
    fetchMore: (variables?: Record<string, any>, concat?: ConcatStrategy, paginationKey?: string) => Promise<{
        data?: any;
        error?: string;
    }>;
    update: (data: any) => void;
    updateValue: (arg: string, value: any) => void;
    updateValues: (values: Record<string, any>) => void;
    updateItem: (id: string, value: any) => void;
    deleteItem: (id: string) => void;
    prepend: (data: any) => void;
    append: (data: any) => void;
    abort: () => void;
    optimisticUpdate: (updater: (current: any) => any, rollback?: () => void) => () => void;
    timing?: TimingInfo;
}
/**
 * Mutation hook options
 */
interface MutationOptions {
    keyboard?: boolean;
    text?: boolean;
    offlineQueue?: boolean;
    retry?: number | {
        count: number;
        delay: number | 'exponential';
        retryCondition?: (error: any) => boolean;
    };
    debug?: boolean;
}
/**
 * Response type for mutations
 */
interface MutationResponse<T = any> {
    data?: T;
    error?: string;
    status?: number;
}
/**
 * Mutation hook return type - tuple with mutate function and state object
 */
type MutationResult<T = any> = [
    (variables: Record<string, any>) => Promise<MutationResponse<T>>,
    {
        loading: boolean;
        error?: string;
        data?: T;
        cancel: () => void;
    }
];
/**
 * Cache operations interface
 */
interface CacheOperations {
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
    invalidate: (key: string) => void;
    invalidateQueries: (pattern: string | RegExp) => void;
    invalidateAll: () => void;
}

/**
 * Custom hook for data fetching with caching support
 * @param route - The API route key
 * @param args - Query options including variables, network policy, callbacks
 * @returns QueryResult with data, loading state, and cache manipulation functions
 */
declare const useQuery: (route: Route, args?: QueryOptions) => QueryResult;

/**
 * Options for async query
 */
interface UseQueryAsyncOptions {
    authToken?: string;
    signal?: AbortSignal;
}
/**
 * Hook return type - a function that performs async queries
 */
type UseQueryAsyncReturn = (route: Route, variables?: Record<string, any>, options?: UseQueryAsyncOptions | string) => Promise<MutationResponse>;
/**
 * Custom hook for async data fetching without subscriptions
 * Useful for one-time data fetches that update the cache
 * @returns An async function to fetch data
 */
declare const useQueryAsync: () => UseQueryAsyncReturn;

/**
 * Custom hook for data mutations (POST, PUT, DELETE operations)
 * @param route - The API route key
 * @param option - Mutation options (keyboard dismiss, text response)
 * @returns MutationResult with mutate function, loading state, error, and data
 */
declare const useMutation: <T = any>(route: Route, option?: MutationOptions) => MutationResult<T>;

/**
 * Custom hook for async mutations with extended functionality
 * Unlike useMutation, this version uses route string directly (legacy support)
 * @param route - The raw API route string (e.g., "POST:/endpoint/:param")
 * @param option - Mutation options (keyboard dismiss)
 * @returns MutationResult with mutate function, loading state, error, and data
 */
declare const useMutationAsync: <T = any>(route: string, option?: MutationOptions) => MutationResult<T>;

interface AppState {
    auth: {
        accessToken: string;
        customerId: string;
        user: any;
    };
    registered: boolean;
    deviceId: any;
    email: string;
    image: string;
    defaultPassword: boolean;
    biometric: boolean;
    visibility: {
        wallet: boolean;
        savings: boolean;
        total: boolean;
        investment: boolean;
    };
}

declare const _default$1: () => redux_thunk.ThunkDispatch<{
    app: AppState;
    cache: CacheState;
    tread: any;
}, undefined, redux.UnknownAction> & redux.Dispatch<redux.UnknownAction>;

/**
 * Cache entry structure with TTL support
 */
interface CacheEntry {
    data: any;
    timestamp: number;
    expiresAt?: number;
    staleAt?: number;
}
interface CacheState {
    [key: string]: CacheEntry | any;
}
interface CacheMetadata {
    accessOrder: string[];
    maxSize: number;
}
/**
 * Set the maximum cache size for LRU eviction
 */
declare function setMaxCacheSize(size: number): void;
/**
 * Get current cache metadata (for debugging)
 */
declare function getCacheMetadata(): Readonly<CacheMetadata>;

declare const store: _reduxjs_toolkit.EnhancedStore<{
    app: AppState;
    cache: CacheState;
    tread: any;
}, redux.UnknownAction, _reduxjs_toolkit.Tuple<[redux.StoreEnhancer<{
    dispatch: redux_thunk.ThunkDispatch<{
        app: AppState;
        cache: CacheState;
        tread: any;
    }, undefined, redux.UnknownAction>;
}>, redux.StoreEnhancer]>>;
type AppDispatch = typeof store.dispatch;
type RootState = ReturnType<typeof store.getState>;

declare const useSelector: TypedUseSelectorHook<RootState>;

/**
 * Custom hook for cache operations
 * Provides functions to get, set, and manipulate cached data
 * @returns CacheOperations interface with all cache manipulation functions
 */
declare const useCache: () => CacheOperations;

interface Props extends AppState {
    setEmail: (payload: string) => void;
    setImage: (payload: string) => void;
    setRegistered: (payload: boolean) => void;
    setUser: (payload: any) => void;
    setAuth: (payload: any) => void;
    setLogout: () => Promise<void>;
    setTimeout: () => Promise<void>;
    setDefaultPassword: (value: boolean) => void;
    setBiometric: (value: boolean) => void;
    toggleVisibility: (value: Visibility) => void;
    connected: boolean;
}
declare const useApp: () => Props;
declare const AppProvider: React.FC<any>;

type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
type ContentType = 'json' | 'urlencoded' | 'multipart';
interface HttpOptions {
    auth?: string;
    contentType?: ContentType;
    signal?: AbortSignal;
    timeout?: number;
    returnStatus?: boolean;
    returnText?: boolean;
}
interface HttpResponse<T = any> {
    data: {
        data?: T;
        error?: string;
        ResponseDescription?: string;
    };
    status: number;
}
/**
 * Check if an error is an abort/cancel error
 */
declare const isAbortError$1: (error: any) => boolean;

interface ParsedRoute {
    path: string;
    method: Method;
    key: string;
    rawPath: string;
}

/**
 * Standard error response structure
 */
interface ErrorResponse {
    error: string;
    status?: number;
}
/**
 * Standard success response structure
 */
interface SuccessResponse<T = any> {
    data: T;
    status: number;
}
/**
 * Combined response type
 */
type ApiResponse<T = any> = ErrorResponse | SuccessResponse<T>;
/**
 * Extracts error message from various response formats
 * @param response - The API response object
 * @param defaultMessage - Default error message if none found
 * @returns Error message string
 */
declare function extractErrorMessage(response: any, defaultMessage?: string): string;
/**
 * Checks if the response status indicates success
 * @param status - HTTP status code
 * @returns True if successful status code
 */
declare function isSuccessStatus(status: number): boolean;
/**
 * Checks if the response status indicates unauthorized/not found
 * @param status - HTTP status code
 * @returns True if status is 401 or 404
 */
declare function isAuthError(status: number): boolean;
/**
 * Creates a standardized error response
 * @param error - Error message or Error object
 * @param status - HTTP status code
 * @returns ErrorResponse object
 */
declare function createErrorResponse(error: string | Error, status?: number): ErrorResponse;
/**
 * Creates a standardized success response
 * @param data - Response data
 * @param status - HTTP status code
 * @returns SuccessResponse object
 */
declare function createSuccessResponse<T>(data: T, status?: number): SuccessResponse<T>;

/**
 * HTTP Helper Utilities
 * Provides utilities for managing AbortControllers, checking error types,
 * and formatting request data
 */
/**
 * Creates a new AbortController for request cancellation
 * @returns New AbortController instance
 *
 * @example
 * const controller = createAbortController();
 * http('/api/data', 'GET', {}, { signal: controller.signal });
 * // Later: controller.abort();
 */
declare const createAbortController: () => AbortController;
/**
 * Checks if an error is an abort/cancellation error
 * @param error - The error to check
 * @returns True if the error is from request cancellation
 *
 * @example
 * try {
 *   await http('/api/data', 'GET', {}, { signal: controller.signal });
 * } catch (error) {
 *   if (isAbortError(error)) {
 *     console.log('Request was cancelled');
 *   }
 * }
 */
declare const isAbortError: (error: any) => boolean;
/**
 * Checks if an error is a cancellation error (alias for isAbortError)
 * @param error - The error to check
 * @returns True if the error is from request cancellation
 */
declare const isCancelError: (error: any) => boolean;
/**
 * Determines if a request should be retried based on the error
 * @param error - The error to check
 * @returns True if the request should be retried
 *
 * @example
 * try {
 *   await http('/api/data', 'GET', {});
 * } catch (error) {
 *   if (shouldRetry(error)) {
 *     // Retry the request
 *   }
 * }
 */
declare const shouldRetry: (error: any) => boolean;
/**
 * Converts an object to FormData for multipart/form-data requests
 * @param data - Object to convert
 * @returns FormData instance
 *
 * @example
 * const formData = formatFormData({ name: 'John', age: 30 });
 * http('/api/upload', 'POST', formData, { contentType: 'multipart' });
 */
declare const formatFormData: (data: Record<string, any>) => FormData;
/**
 * Converts an object to URL-encoded string for application/x-www-form-urlencoded requests
 * @param data - Object to convert
 * @returns URL-encoded string
 *
 * @example
 * const encoded = formatUrlEncoded({ name: 'John Doe', age: 30 });
 * // Returns: "name=John%20Doe&age=30"
 */
declare const formatUrlEncoded: (data: Record<string, any>) => string;
/**
 * Safely aborts an AbortController if it exists
 * @param controller - The AbortController to abort
 *
 * @example
 * const controller = createAbortController();
 * // Later...
 * safeAbort(controller);
 */
declare const safeAbort: (controller: AbortController | null | undefined) => void;
/**
 * Creates a timeout-based AbortController
 * @param timeoutMs - Timeout in milliseconds
 * @returns Object with controller and cleanup function
 *
 * @example
 * const { controller, cleanup } = createTimeoutController(5000);
 * try {
 *   await http('/api/data', 'GET', {}, { signal: controller.signal });
 * } finally {
 *   cleanup();
 * }
 */
declare const createTimeoutController: (timeoutMs: number) => {
    controller: AbortController;
    cleanup: () => void;
};
/**
 * Combines multiple AbortSignals into one
 * When any signal is aborted, the combined signal is aborted
 * @param signals - Array of AbortSignals to combine
 * @returns Combined AbortController
 *
 * @example
 * const userController = createAbortController();
 * const timeoutController = createTimeoutController(5000);
 * const combined = combineAbortSignals([userController.signal, timeoutController.signal]);
 * await http('/api/data', 'GET', {}, { signal: combined.signal });
 */
declare const combineAbortSignals: (signals: AbortSignal[]) => AbortController;

/**
 * Request Deduplication System
 * Prevents duplicate in-flight requests with the same key
 * All components requesting the same data share the same Promise
 */
/**
 * Gets an existing in-flight request or creates a new one
 * @param key - Unique identifier for the request
 * @param requestFn - Function that performs the actual request
 * @returns Promise that resolves with the request result
 *
 * @example
 * const result = await getOrCreateRequest('users-123', () =>
 *   http('/users/123', 'GET')
 * );
 */
declare function getOrCreateRequest<T>(key: string, requestFn: () => Promise<T>): Promise<T>;
/**
 * Manually cancel/remove a request from the in-flight queue
 * Useful when aborting a request
 * @param key - The request key to cancel
 */
declare function cancelRequest(key: string): void;
/**
 * Check if a request is currently in flight
 * @param key - The request key to check
 * @returns True if request is in progress
 */
declare function isRequestInFlight(key: string): boolean;
/**
 * Get the number of in-flight requests
 * Useful for debugging and monitoring
 */
declare function getInFlightCount(): number;
/**
 * Clear all in-flight requests
 * Useful for testing or when resetting application state
 */
declare function clearAllRequests(): void;

/**
 * Cache Helper Utilities
 * Functions for validating cache freshness, expiry, and staleness
 */

/**
 * Checks if a cache entry has expired based on its TTL
 * @param entry - The cache entry to check
 * @returns True if the cache has expired
 *
 * @example
 * const entry = { data: {...}, timestamp: Date.now(), expiresAt: Date.now() - 1000 };
 * isCacheExpired(entry); // true
 */
declare function isCacheExpired(entry: CacheEntry | any): boolean;
/**
 * Checks if a cache entry is stale and should be refetched
 * @param entry - The cache entry to check
 * @returns True if the cache is stale
 *
 * @example
 * const entry = { data: {...}, timestamp: Date.now(), staleAt: Date.now() - 1000 };
 * isCacheStale(entry); // true
 */
declare function isCacheStale(entry: CacheEntry | any): boolean;
/**
 * Checks if a cache entry is fresh (not expired and not stale)
 * @param entry - The cache entry to check
 * @returns True if the cache is fresh
 *
 * @example
 * const entry = {
 *   data: {...},
 *   timestamp: Date.now(),
 *   expiresAt: Date.now() + 10000,
 *   staleAt: Date.now() + 5000
 * };
 * isCacheFresh(entry); // true
 */
declare function isCacheFresh(entry: CacheEntry | any): boolean;
/**
 * Extracts data from a cache entry, handling both new and old formats
 * @param entry - The cache entry
 * @returns The actual data
 */
declare function getCacheData(entry: CacheEntry | any): any;
/**
 * Creates a cache entry with TTL and stale time
 * @param data - The data to cache
 * @param ttl - Time to live in milliseconds (optional)
 * @param staleTime - Time until stale in milliseconds (optional)
 * @returns A properly formatted cache entry
 */
declare function createCacheEntry(data: any, ttl?: number, staleTime?: number): CacheEntry;
/**
 * Gets the age of a cache entry in milliseconds
 * @param entry - The cache entry
 * @returns Age in milliseconds
 */
declare function getCacheAge(entry: CacheEntry | any): number;
/**
 * Checks if cache entry exists and is not expired
 * @param entry - The cache entry
 * @returns True if cache can be used
 */
declare function canUseCache(entry: CacheEntry | any): boolean;

/**
 * Debug Logger for Query/Mutation Hooks
 * Provides detailed logging for debugging cache hits, network requests, and timing
 */
interface QueryDebugInfo {
    key: string;
    action: 'cache-hit' | 'cache-miss' | 'fetch-start' | 'fetch-success' | 'fetch-error' | 'invalidate';
    timestamp: number;
    duration?: number;
    data?: any;
    error?: any;
    variables?: any;
}
/**
 * Query Debugger Class
 * Provides structured logging for debugging data fetching
 */
declare class QueryDebugger {
    private enabled;
    private prefix;
    constructor(enabled: boolean, prefix?: string);
    /**
     * Log a cache hit
     */
    logCacheHit(key: string, data: any): void;
    /**
     * Log a cache miss
     */
    logCacheMiss(key: string): void;
    /**
     * Log the start of a fetch request
     */
    logFetchStart(key: string, variables?: any): void;
    /**
     * Log a successful fetch
     */
    logFetchSuccess(key: string, duration?: number, data?: any): void;
    /**
     * Log a fetch error
     */
    logFetchError(key: string, error: any, duration?: number): void;
    /**
     * Log cache invalidation
     */
    logInvalidate(key: string | RegExp): void;
    /**
     * Log network policy decision
     */
    logPolicy(key: string, policy: string, decision: string): void;
    /**
     * Log cache expiry check
     */
    logCacheExpiry(key: string, isExpired: boolean, isStale: boolean): void;
    /**
     * Log request deduplication
     */
    logDeduplication(key: string, isDuplicate: boolean): void;
    /**
     * Get the size of data (array length or object keys)
     */
    private getDataSize;
}
declare function enableGlobalDebug(): void;
declare function disableGlobalDebug(): void;
declare function isGlobalDebugEnabled(): boolean;
/**
 * Create a debugger instance
 */
declare function createDebugger(enabled?: boolean, prefix?: string): QueryDebugger;

/**
 * Retry Manager with Exponential Backoff
 * Provides intelligent retry logic for failed requests
 */
interface RetryOptions {
    retries: number;
    delay: number | 'exponential';
    condition?: (error: any) => boolean;
    maxDelay?: number;
}
/**
 * Retries a function with exponential backoff
 * @param fn - The function to retry
 * @param options - Retry configuration
 * @returns Promise that resolves when function succeeds or retries are exhausted
 *
 * @example
 * const data = await retryWithBackoff(
 *   () => http('/api/data', 'GET'),
 *   { retries: 3, delay: 'exponential' }
 * );
 */
declare function retryWithBackoff<T>(fn: () => Promise<T>, options: RetryOptions): Promise<T>;
/**
 * Retry with jitter (adds randomness to prevent thundering herd)
 */
declare function retryWithJitter<T>(fn: () => Promise<T>, options: RetryOptions & {
    jitter?: number;
}): Promise<T>;

/**
 * Offline Queue for Mutations
 * Queues mutations when offline and replays them when connection is restored
 */

interface QueuedMutation {
    id: string;
    route: Route;
    variables: Record<string, any>;
    timestamp: number;
    retries: number;
    maxRetries: number;
}
/**
 * Offline Mutation Queue
 * Persists mutations to local storage and processes them when online
 */
declare class OfflineQueue {
    private queue;
    private isProcessing;
    constructor();
    /**
     * Adds a mutation to the queue
     */
    enqueue(mutation: Omit<QueuedMutation, 'id' | 'timestamp' | 'retries' | 'maxRetries'>): Promise<string>;
    /**
     * Processes the queue
     */
    processQueue(onProcess: (item: QueuedMutation) => Promise<void>): Promise<void>;
    /**
     * Gets the current queue
     */
    getQueue(): ReadonlyArray<QueuedMutation>;
    /**
     * Gets the queue size
     */
    size(): number;
    /**
     * Clears the entire queue
     */
    clear(): Promise<void>;
    /**
     * Removes a specific mutation from the queue
     */
    remove(id: string): Promise<boolean>;
    /**
     * Persists queue to storage
     */
    private persist;
    /**
     * Loads queue from storage
     */
    private loadFromStorage;
}
/**
 * Gets the singleton queue instance
 */
declare function getOfflineQueue(): OfflineQueue;

/**
 * Refetch Manager
 * Handles background refetching on focus, reconnect, and intervals
 */
/**
 * Refetches when app comes to foreground
 * @param enabled - Whether this behavior is enabled
 * @param refetch - Function to call for refetching
 */
declare function useRefetchOnFocus(enabled: boolean, refetch: () => void): void;
/**
 * Refetches when network reconnects
 * @param enabled - Whether this behavior is enabled
 * @param refetch - Function to call for refetching
 */
declare function useRefetchOnReconnect(enabled: boolean, refetch: () => void): void;
/**
 * Refetches at a regular interval
 * @param enabled - Whether polling is enabled
 * @param refetch - Function to call for refetching
 * @param interval - Interval in milliseconds
 */
declare function useRefetchInterval(enabled: boolean, refetch: () => void, interval: number): void;

declare const config: {
    naira: string;
    baseUrl: string;
};

declare function money(num: number, decimal: number): string;

declare const encrypt: (payload: string) => any;
declare const decrypt: (response: string) => any;

declare class Storage {
    setItem: (key: string, value: any) => void;
    getItem: (key: string) => any;
    removeItem: (key: string) => void;
    clear: () => Promise<void>;
}
declare const _default: Storage;

export { type ApiResponse, type AppDispatch, AppProvider, type CacheEntry, type CacheMetadata, type CacheOperations, type CacheState, type ConcatStrategy, type ContentType, DEFAULT_CACHE_TTL, DEFAULT_STALE_TIME, type DashboardStackList, ERROR_MESSAGES, type ErrorResponse, type HttpOptions, type HttpResponse, MAX_CACHE_SIZE, type ModalProps, type MutationOptions, type MutationResponse, type MutationResult, NETWORK_TIMEOUT, type NetworkPolicy, OfflineQueue, PATHS, type ParsedRoute, type QueryDebugInfo, QueryDebugger, type QueryOptions, type QueryResult, type QueuedMutation, type RetryOptions, type RootStackParamList, type RootState, type Route, STATUS_CODES, type SheetProps, type SuccessResponse, type TimingInfo, type Visibility, type Weight, config as alphaConfig, canUseCache, cancelRequest, clearAllRequests, combineAbortSignals, createAbortController, createCacheEntry, createDebugger, createErrorResponse, createSuccessResponse, createTimeoutController, decrypt, disableGlobalDebug, enableGlobalDebug, encrypt, extractErrorMessage, formatFormData, money as formatMoney, formatUrlEncoded, getCacheAge, getCacheData, getCacheMetadata, getInFlightCount, getOfflineQueue, getOrCreateRequest, isAbortError, isAuthError, isCacheExpired, isCacheFresh, isCacheStale, isCancelError, isGlobalDebugEnabled, isAbortError$1 as isHttpAbortError, isRequestInFlight, isSuccessStatus, retryWithBackoff, retryWithJitter, safeAbort, setMaxCacheSize, shouldRetry, _default as storage, store, useApp, useCache, _default$1 as useDispatch, useMutation, useMutationAsync, useQuery, useQueryAsync, useRefetchInterval, useRefetchOnFocus, useRefetchOnReconnect, useSelector };
