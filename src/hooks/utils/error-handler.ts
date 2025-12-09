/**
 * Standard error response structure
 */
export interface ErrorResponse {
  error: string;
  status?: number;
}

/**
 * Standard success response structure
 */
export interface SuccessResponse<T = any> {
  data: T;
  status: number;
}

/**
 * Combined response type
 */
export type ApiResponse<T = any> = ErrorResponse | SuccessResponse<T>;

/**
 * Extracts error message from various response formats
 * @param response - The API response object
 * @param defaultMessage - Default error message if none found
 * @returns Error message string
 */
export function extractErrorMessage(
  response: any,
  defaultMessage: string = "Oops! an error occurred"
): string {
  if (typeof response === "string") {
    return response;
  }

  // Try common error paths
  return (
    response?.data?.data?.ResponseDescription ||
    response?.data?.ResponseDescription ||
    response?.data?.error ||
    response?.error ||
    response?.message ||
    defaultMessage
  );
}

/**
 * Checks if the response status indicates success
 * @param status - HTTP status code
 * @returns True if successful status code
 */
export function isSuccessStatus(status: number): boolean {
  return [200, 201].includes(status);
}

/**
 * Checks if the response status indicates unauthorized/not found
 * @param status - HTTP status code
 * @returns True if status is 401 or 404
 */
export function isAuthError(status: number): boolean {
  return [401, 404].includes(status);
}

/**
 * Creates a standardized error response
 * @param error - Error message or Error object
 * @param status - HTTP status code
 * @returns ErrorResponse object
 */
export function createErrorResponse(
  error: string | Error,
  status: number = 500
): ErrorResponse {
  const message = typeof error === "string" ? error : error.message;
  return {
    error: message ?? "Oops! an error occurred",
    status,
  };
}

/**
 * Creates a standardized success response
 * @param data - Response data
 * @param status - HTTP status code
 * @returns SuccessResponse object
 */
export function createSuccessResponse<T>(
  data: T,
  status: number = 200
): SuccessResponse<T> {
  return {
    data,
    status,
  };
}

/**
 * Checks if an error is an abort/cancellation error
 * @param error - The error to check
 * @returns True if the error is from request cancellation
 */
export function isAbortError(error: any): boolean {
  if (!error) return false;

  return (
    error.name === "AbortError" ||
    error.name === "CanceledError" ||
    error.code === "ERR_CANCELED" ||
    error.message?.includes("abort") ||
    error.message?.includes("cancel")
  );
}

/**
 * Checks if an error is a cancellation error (alias for isAbortError)
 * @param error - The error to check
 * @returns True if the error is from request cancellation
 */
export function isCancelError(error: any): boolean {
  return isAbortError(error);
}

/**
 * Determines if a request should be retried based on the error
 * @param error - The error to check
 * @returns True if the request should be retried
 */
export function shouldRetry(error: any): boolean {
  // Don't retry if it was cancelled
  if (isAbortError(error)) {
    return false;
  }

  // Don't retry client errors (4xx)
  if (error.response?.status >= 400 && error.response?.status < 500) {
    return false;
  }

  // Don't retry auth errors
  if (isAuthError(error.response?.status)) {
    return false;
  }

  // Retry on network errors or 5xx server errors
  return true;
}

