import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import config from 'config';
import { AlphaConfig, DEFAULT_CONFIG } from '../config';

export type Method = 'POST' | 'GET' | 'PUT' | 'DELETE' | 'PATCH';
export type ContentType = 'json' | 'urlencoded' | 'multipart';

// Current configuration
let currentConfig: AlphaConfig = DEFAULT_CONFIG;

export interface HttpOptions {
  auth?: string;
  contentType?: ContentType;
  signal?: AbortSignal;
  timeout?: number;
  returnStatus?: boolean;
  returnText?: boolean;
}

export interface HttpResponse<T = any> {
  data: {
    data?: T;
    error?: string;
    ResponseDescription?: string;
  };
  status: number;
}

/**
 * Internal: Set current config (called by ConfigProvider)
 * @param config - Alpha configuration
 */
export function setHttpConfig(newConfig: AlphaConfig): void {
  currentConfig = newConfig;
  // Recreate axios instance with new config
  axiosInstance = createAxiosInstance();
}

/**
 * Get current HTTP config
 * @returns Current Alpha configuration
 */
export function getHttpConfig(): AlphaConfig {
  return currentConfig;
}

/**
 * Creates and configures an Axios instance with base configuration
 */
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: currentConfig.baseUrl || config.baseUrl,
    timeout: currentConfig.timeout || 30000,
    headers: {
      Accept: 'application/json',
      ...(currentConfig.headers || {}),
    },
  });

  // Response interceptor for standardized error handling
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      // Don't transform abort errors
      if (axios.isCancel(error) || error.name === 'AbortError') {
        return Promise.reject(error);
      }

      // Network error
      if (!error.response) {
        return Promise.resolve({
          data: {
            error: error.message || 'Network error occurred',
          },
          status: 500,
        });
      }

      // HTTP error response
      return Promise.resolve(error.response);
    }
  );

  return instance;
};

// Singleton axios instance
let axiosInstance = createAxiosInstance();

/**
 * Converts object to URL-encoded string
 */
const formatUrlEncoded = (data: Record<string, any>): string => {
  const formBody: string[] = [];
  for (const property in data) {
    const encodedKey = encodeURIComponent(property);
    const encodedValue = encodeURIComponent(data[property]);
    formBody.push(`${encodedKey}=${encodedValue}`);
  }
  return formBody.join('&');
};

/**
 * Converts object to FormData for multipart requests
 */
const formatFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  return formData;
};

/**
 * Get appropriate Content-Type header based on type
 */
const getContentTypeHeader = (contentType: ContentType): string => {
  switch (contentType) {
    case 'urlencoded':
      return 'application/x-www-form-urlencoded';
    case 'multipart':
      return 'multipart/form-data';
    case 'json':
    default:
      return 'application/text';
  }
};

/**
 * Format request data based on content type
 */
const formatRequestData = (
  data: any,
  contentType: ContentType,
  method: Method
): any => {
  // GET requests don't have body
  if (method === 'GET') {
    return undefined;
  }

  if (!data) {
    return undefined;
  }

  switch (contentType) {
    case 'urlencoded':
      return formatUrlEncoded(data);
    case 'multipart':
      return formatFormData(data);
    case 'json':
    default:
      return data;
  }
};

/**
 * Modern HTTP client with axios
 * Supports multiple Content-Types, request cancellation, and better error handling
 *
 * @param path - API endpoint path
 * @param method - HTTP method (GET, POST, PUT, DELETE, PATCH)
 * @param data - Request data (body for POST/PUT/PATCH, query params for GET)
 * @param options - Additional options (auth, contentType, signal, timeout, etc.)
 * @returns Promise with standardized response format
 *
 * @example
 * // JSON request (default)
 * const response = await http('/users', 'POST', { name: 'John' });
 *
 * @example
 * // URL-encoded request
 * const response = await http('/login', 'POST', { email, password }, { contentType: 'urlencoded' });
 *
 * @example
 * // With abort signal
 * const controller = new AbortController();
 * const response = await http('/data', 'GET', {}, { signal: controller.signal });
 * // Later: controller.abort();
 */
async function http<T = any>(
  path: string,
  method?: Method,
  data?: any,
  options?: HttpOptions
): Promise<HttpResponse<T>>;

// Legacy signature for backward compatibility
async function http<T = any>(
  path: string,
  method: Method,
  data: any,
  returnStatus: boolean,
  auth?: string,
  returnText?: boolean
): Promise<HttpResponse<T>>;

// Implementation
async function http<T = any>(
  path: string,
  method: Method = 'GET',
  data?: any,
  optionsOrStatus?: HttpOptions | boolean,
  legacyAuth?: string,
  legacyReturnText?: boolean
): Promise<HttpResponse<T>> {
  // Handle legacy signature
  let options: HttpOptions;
  if (typeof optionsOrStatus === 'boolean') {
    options = {
      returnStatus: optionsOrStatus,
      auth: legacyAuth,
      returnText: legacyReturnText,
      contentType: 'urlencoded', // Legacy default
    };
  } else {
    options = optionsOrStatus || {};
  }

  const {
    auth,
    contentType = 'json',
    signal,
    timeout,
    returnStatus = true,
    returnText = false,
  } = options;

  try {
    // Prepare headers
    const headers: Record<string, string> = {
      'Content-Type': getContentTypeHeader(contentType),
      // 'Content-Type': "application/x-www-form-urlencoded",
    };

    if (auth) {
      headers['Authorization'] = auth;
    }
    console.log(headers, method, path);
    // Prepare request config
    const config: AxiosRequestConfig = {
      method,
      url: path,
      headers,
      signal,
      timeout: timeout || 30000,
    };

    console.log({data});
    // Handle data based on method and content type
    if (method === 'GET' && data) {
      // For GET, data becomes query params
      config.params = data;
    } else {
      // For other methods, format body based on content type
      config.data = formatRequestData(data, contentType, method);
    }
    console.log(config);
    // Make the request
    const response: AxiosResponse = await axiosInstance.request(config);

    console.log(response);
    // Format response based on options
    if (returnStatus) {
      return {
        data: returnText
          ? response.data
          : typeof response.data === 'string'
          ? response.data
          : response.data,
        status: response.status,
      };
    }

    return response.data;
  } catch (error: any) {
    // Re-throw abort/cancel errors so they can be handled by the caller
    if (axios.isCancel(error) || error.name === 'AbortError') {
      throw error;
    }

    // Return error response in standard format
    return {
      data: error.response?.data || { error: error.message || 'An error occurred' },
      status: error.response?.status || 500,
    };
  }
}

export default http;

/**
 * Check if an error is an abort/cancel error
 */
export const isAbortError = (error: any): boolean => {
  return (
    axios.isCancel(error) ||
    error.name === 'AbortError' ||
    error.name === 'CanceledError'
  );
};
