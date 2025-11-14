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
 * Network policies for queries
 */
type NetworkPolicy = "network-and-cache" | "cache-only" | "network-only" | "cache-first";
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
}
/**
 * Mutation hook options
 */
interface MutationOptions {
    keyboard?: boolean;
    text?: boolean;
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
    cache: any;
    tread: any;
}, undefined, redux.UnknownAction> & redux.Dispatch<redux.UnknownAction>;

declare const store: _reduxjs_toolkit.EnhancedStore<{
    app: AppState;
    cache: any;
    tread: any;
}, redux.UnknownAction, _reduxjs_toolkit.Tuple<[redux.StoreEnhancer<{
    dispatch: redux_thunk.ThunkDispatch<{
        app: AppState;
        cache: any;
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

export { type ApiResponse, type AppDispatch, AppProvider, type CacheOperations, type ConcatStrategy, type ContentType, type DashboardStackList, type ErrorResponse, type HttpOptions, type HttpResponse, type ModalProps, type MutationOptions, type MutationResponse, type MutationResult, type NetworkPolicy, PATHS, type ParsedRoute, type QueryOptions, type QueryResult, type RootStackParamList, type RootState, type Route, type SheetProps, type SuccessResponse, type Visibility, type Weight, config as alphaConfig, combineAbortSignals, createAbortController, createErrorResponse, createSuccessResponse, createTimeoutController, decrypt, encrypt, extractErrorMessage, formatFormData, money as formatMoney, formatUrlEncoded, isAbortError, isAuthError, isCancelError, isAbortError$1 as isHttpAbortError, isSuccessStatus, safeAbort, shouldRetry, _default as storage, store, useApp, useCache, _default$1 as useDispatch, useMutation, useMutationAsync, useQuery, useQueryAsync, useSelector };
