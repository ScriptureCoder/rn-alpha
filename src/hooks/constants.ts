/**
 * Hook-related constants
 */

/**
 * Network request timeout in milliseconds
 */
export const NETWORK_TIMEOUT = 10000; // 10 seconds

/**
 * Default error messages
 */
export const ERROR_MESSAGES = {
  GENERIC: "Oops! an error occurred",
  NETWORK: "Network error occurred",
  TIMEOUT: "Request timed out",
  SESSION_EXPIRED: "Session expired! kindly login",
  UNAUTHORIZED: "Unauthorized access",
} as const;

/**
 * HTTP status codes
 */
export const STATUS_CODES = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
} as const;

/**
 * Network policies for queries
 */
export type NetworkPolicy =
  | "network-and-cache"
  | "cache-only"
  | "network-only"
  | "cache-first";

/**
 * Concat strategies for fetchMore
 */
export type ConcatStrategy = "start" | "end" | "pagination";

