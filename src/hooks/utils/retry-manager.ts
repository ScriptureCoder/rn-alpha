/**
 * Retry Manager with Exponential Backoff
 * Provides intelligent retry logic for failed requests
 */

import { shouldRetry as shouldRetryError } from "./error-handler";

export interface RetryOptions {
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
export async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  options: RetryOptions
): Promise<T> {
  const { retries, delay, condition, maxDelay = 30000 } = options;
  let lastError: any;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;

      // Check custom condition if provided
      if (condition && !condition(error)) {
        throw error;
      }

      // Check if error is retryable
      if (!shouldRetryError(error)) {
        throw error;
      }

      // Don't wait after last attempt
      if (attempt === retries) {
        throw error;
      }

      // Calculate delay
      const waitTime = calculateDelay(delay, attempt, maxDelay);

      // Wait before next attempt
      await sleep(waitTime);
    }
  }

  throw lastError;
}

/**
 * Calculate delay based on strategy
 */
function calculateDelay(
  delay: number | 'exponential',
  attempt: number,
  maxDelay: number
): number {
  if (delay === 'exponential') {
    // Exponential backoff: 1s, 2s, 4s, 8s, 16s, 30s (capped)
    return Math.min(1000 * Math.pow(2, attempt), maxDelay);
  }
  return delay;
}

/**
 * Sleep utility
 */
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Retry with jitter (adds randomness to prevent thundering herd)
 */
export async function retryWithJitter<T>(
  fn: () => Promise<T>,
  options: RetryOptions & { jitter?: number }
): Promise<T> {
  const { jitter = 0.1, ...retryOptions } = options;

  return retryWithBackoff(fn, {
    ...retryOptions,
    delay:
      typeof retryOptions.delay === 'number'
        ? addJitter(retryOptions.delay, jitter)
        : retryOptions.delay,
  });
}

/**
 * Adds random jitter to delay
 */
function addJitter(delay: number, jitterFactor: number): number {
  const jitter = delay * jitterFactor * Math.random();
  return delay + jitter;
}

