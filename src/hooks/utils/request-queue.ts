/**
 * Request Deduplication System
 * Prevents duplicate in-flight requests with the same key
 * All components requesting the same data share the same Promise
 */

const inFlightRequests = new Map<string, Promise<any>>();

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
export function getOrCreateRequest<T>(
  key: string,
  requestFn: () => Promise<T>
): Promise<T> {
  // Check if request is already in flight
  if (inFlightRequests.has(key)) {
    return inFlightRequests.get(key)!;
  }

  // Create new request and store it
  const promise = requestFn()
    .finally(() => {
      // Clean up after request completes (success or error)
      inFlightRequests.delete(key);
    });

  inFlightRequests.set(key, promise);
  return promise;
}

/**
 * Manually cancel/remove a request from the in-flight queue
 * Useful when aborting a request
 * @param key - The request key to cancel
 */
export function cancelRequest(key: string): void {
  inFlightRequests.delete(key);
}

/**
 * Check if a request is currently in flight
 * @param key - The request key to check
 * @returns True if request is in progress
 */
export function isRequestInFlight(key: string): boolean {
  return inFlightRequests.has(key);
}

/**
 * Get the number of in-flight requests
 * Useful for debugging and monitoring
 */
export function getInFlightCount(): number {
  return inFlightRequests.size;
}

/**
 * Clear all in-flight requests
 * Useful for testing or when resetting application state
 */
export function clearAllRequests(): void {
  inFlightRequests.clear();
}

