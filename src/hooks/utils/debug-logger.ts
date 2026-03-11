/**
 * Debug Logger for Query/Mutation Hooks
 * Provides detailed logging for debugging cache hits, network requests, and timing
 */

import { logger } from '../../utils/logger';

export interface QueryDebugInfo {
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
export class QueryDebugger {
  private enabled: boolean;
  private prefix: string;

  constructor(enabled: boolean, prefix: string = '[Query]') {
    this.enabled = enabled;
    this.prefix = prefix;
  }

  /**
   * Log a cache hit
   */
  logCacheHit(key: string, data: any) {
    if (!this.enabled) return;

    logger.log(`${this.prefix} 🎯 Cache HIT`, {
      key,
      dataSize: this.getDataSize(data),
      timestamp: new Date().toISOString(),
    });

    if (data) {
      logger.log(`${this.prefix} Data:`, data);
    }
  }

  /**
   * Log a cache miss
   */
  logCacheMiss(key: string) {
    if (!this.enabled) return;

    logger.log(`${this.prefix} ❌ Cache MISS`, {
      key,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log the start of a fetch request
   */
  logFetchStart(key: string, variables?: any) {
    if (!this.enabled) return;

    logger.log(`${this.prefix} 🚀 Fetching`, {
      key,
      variables,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log a successful fetch
   */
  logFetchSuccess(key: string, duration?: number, data?: any) {
    if (!this.enabled) return;

    logger.log(`${this.prefix} ✅ Success`, {
      key,
      duration: duration ? `${duration.toFixed(2)}ms` : 'N/A',
      dataSize: this.getDataSize(data),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log a fetch error
   */
  logFetchError(key: string, error: any, duration?: number) {
    if (!this.enabled) return;

    logger.error(`${this.prefix} ❌ Error`, {
      key,
      error: error?.message || error,
      duration: duration ? `${duration.toFixed(2)}ms` : 'N/A',
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log cache invalidation
   */
  logInvalidate(key: string | RegExp) {
    if (!this.enabled) return;

    logger.log(`${this.prefix} 🔄 Invalidating`, {
      pattern: key.toString(),
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log network policy decision
   */
  logPolicy(key: string, policy: string, decision: string) {
    if (!this.enabled) return;

    logger.log(`${this.prefix} 📋 Policy`, {
      key,
      policy,
      decision,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log cache expiry check
   */
  logCacheExpiry(key: string, isExpired: boolean, isStale: boolean) {
    if (!this.enabled) return;

    logger.log(`${this.prefix} ⏰ Cache Status`, {
      key,
      expired: isExpired,
      stale: isStale,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Log request deduplication
   */
  logDeduplication(key: string, isDuplicate: boolean) {
    if (!this.enabled) return;

    if (isDuplicate) {
      logger.log(`${this.prefix} 🔗 Request Deduplicated`, {
        key,
        message: 'Using existing in-flight request',
        timestamp: new Date().toISOString(),
      });
    }
  }

  /**
   * Get the size of data (array length or object keys)
   */
  private getDataSize(data: any): string {
    if (!data) return '0';
    if (Array.isArray(data)) return `${data.length} items`;
    if (typeof data === 'object') return `${Object.keys(data).length} keys`;
    return 'scalar';
  }
}

/**
 * Global debug toggle
 * Can be enabled at runtime for debugging
 */
let globalDebugEnabled = false;

export function enableGlobalDebug() {
  globalDebugEnabled = true;
}

export function disableGlobalDebug() {
  globalDebugEnabled = false;
}

export function isGlobalDebugEnabled(): boolean {
  return globalDebugEnabled;
}

/**
 * Create a debugger instance
 */
export function createDebugger(enabled?: boolean, prefix?: string): QueryDebugger {
  return new QueryDebugger(enabled ?? globalDebugEnabled, prefix);
}

