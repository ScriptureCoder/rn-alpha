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
}

/**
 * Query hook return type
 */
export interface QueryResult {
  data: any;
  loading: boolean;
  error: string | undefined;
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
}

/**
 * Mutation hook options
 */
export interface MutationOptions {
  keyboard?: boolean;
  text?: boolean;
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
}

