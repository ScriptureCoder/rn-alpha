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
export const createAbortController = (): AbortController => {
  return new AbortController();
};

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
export const isAbortError = (error: any): boolean => {
  if (!error) return false;
  
  return (
    error.name === 'AbortError' ||
    error.name === 'CanceledError' ||
    error.code === 'ERR_CANCELED' ||
    error.message?.includes('abort') ||
    error.message?.includes('cancel')
  );
};

/**
 * Checks if an error is a cancellation error (alias for isAbortError)
 * @param error - The error to check
 * @returns True if the error is from request cancellation
 */
export const isCancelError = (error: any): boolean => {
  return isAbortError(error);
};

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
export const shouldRetry = (error: any): boolean => {
  // Don't retry if it was cancelled
  if (isAbortError(error)) {
    return false;
  }

  // Don't retry client errors (4xx)
  if (error.response?.status >= 400 && error.response?.status < 500) {
    return false;
  }

  // Retry on network errors or 5xx server errors
  return true;
};

/**
 * Converts an object to FormData for multipart/form-data requests
 * @param data - Object to convert
 * @returns FormData instance
 * 
 * @example
 * const formData = formatFormData({ name: 'John', age: 30 });
 * http('/api/upload', 'POST', formData, { contentType: 'multipart' });
 */
export const formatFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      const value = data[key];
      
      // Handle different types appropriately
      if (value !== null && value !== undefined) {
        formData.append(key, value);
      }
    }
  }
  
  return formData;
};

/**
 * Converts an object to URL-encoded string for application/x-www-form-urlencoded requests
 * @param data - Object to convert
 * @returns URL-encoded string
 * 
 * @example
 * const encoded = formatUrlEncoded({ name: 'John Doe', age: 30 });
 * // Returns: "name=John%20Doe&age=30"
 */
export const formatUrlEncoded = (data: Record<string, any>): string => {
  const formBody: string[] = [];
  
  for (const property in data) {
    if (data.hasOwnProperty(property)) {
      const value = data[property];
      
      // Skip null/undefined values
      if (value !== null && value !== undefined) {
        const encodedKey = encodeURIComponent(property);
        const encodedValue = encodeURIComponent(value);
        formBody.push(`${encodedKey}=${encodedValue}`);
      }
    }
  }
  
  return formBody.join('&');
};

/**
 * Safely aborts an AbortController if it exists
 * @param controller - The AbortController to abort
 * 
 * @example
 * const controller = createAbortController();
 * // Later...
 * safeAbort(controller);
 */
export const safeAbort = (controller: AbortController | null | undefined): void => {
  if (controller && !controller.signal.aborted) {
    controller.abort();
  }
};

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
export const createTimeoutController = (
  timeoutMs: number
): { controller: AbortController; cleanup: () => void } => {
  const controller = new AbortController();
  
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);
  
  const cleanup = () => {
    clearTimeout(timeoutId);
  };
  
  return { controller, cleanup };
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
export const combineAbortSignals = (signals: AbortSignal[]): AbortController => {
  const controller = new AbortController();
  
  for (const signal of signals) {
    if (signal.aborted) {
      controller.abort();
      break;
    }
    
    signal.addEventListener('abort', () => {
      controller.abort();
    }, { once: true });
  }
  
  return controller;
};

