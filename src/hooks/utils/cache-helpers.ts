/**
 * Cache Helper Utilities
 * Functions for validating cache freshness, expiry, and staleness
 */

import { CacheEntry } from "../../store/reducers/cache-reducer";

/**
 * Checks if a cache entry has expired based on its TTL
 * @param entry - The cache entry to check
 * @returns True if the cache has expired
 * 
 * @example
 * const entry = { data: {...}, timestamp: Date.now(), expiresAt: Date.now() - 1000 };
 * isCacheExpired(entry); // true
 */
export function isCacheExpired(entry: CacheEntry | any): boolean {
  // Handle backward compatibility - check if entry is a CacheEntry
  if (!entry || typeof entry !== 'object') {
    return false;
  }
  
  // If it's a new-style entry with expiresAt
  if ('expiresAt' in entry && entry.expiresAt) {
    return Date.now() > entry.expiresAt;
  }
  
  // Old-style entries never expire
  return false;
}

/**
 * Checks if a cache entry is stale and should be refetched
 * @param entry - The cache entry to check
 * @returns True if the cache is stale
 * 
 * @example
 * const entry = { data: {...}, timestamp: Date.now(), staleAt: Date.now() - 1000 };
 * isCacheStale(entry); // true
 */
export function isCacheStale(entry: CacheEntry | any): boolean {
  // Handle backward compatibility
  if (!entry || typeof entry !== 'object') {
    return true; // No cache = stale
  }
  
  // If it's a new-style entry with staleAt
  if ('staleAt' in entry) {
    // If staleAt is undefined, never stale (infinite fresh time)
    if (entry.staleAt === undefined) {
      return false;
    }
    return Date.now() > entry.staleAt;
  }
  
  // Old-style entries are always considered stale (safe default)
  return true;
}

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
export function isCacheFresh(entry: CacheEntry | any): boolean {
  return !isCacheExpired(entry) && !isCacheStale(entry);
}

/**
 * Extracts data from a cache entry, handling both new and old formats
 * @param entry - The cache entry
 * @returns The actual data
 */
export function getCacheData(entry: CacheEntry | any): any {
  if (!entry) {
    return undefined;
  }
  
  // New-style entry with 'data' property
  if ('data' in entry && 'timestamp' in entry) {
    return entry.data;
  }
  
  // Old-style entry (data is the entry itself)
  return entry;
}

/**
 * Creates a cache entry with TTL and stale time
 * @param data - The data to cache
 * @param ttl - Time to live in milliseconds (optional)
 * @param staleTime - Time until stale in milliseconds (optional)
 * @returns A properly formatted cache entry
 */
export function createCacheEntry(
  data: any,
  ttl?: number,
  staleTime?: number
): CacheEntry {
  const timestamp = Date.now();
  return {
    data,
    timestamp,
    expiresAt: ttl ? timestamp + ttl : undefined,
    staleAt: staleTime !== undefined ? timestamp + staleTime : undefined,
  };
}

/**
 * Gets the age of a cache entry in milliseconds
 * @param entry - The cache entry
 * @returns Age in milliseconds
 */
export function getCacheAge(entry: CacheEntry | any): number {
  if (!entry || !entry.timestamp) {
    return Infinity;
  }
  return Date.now() - entry.timestamp;
}

/**
 * Checks if cache entry exists and is not expired
 * @param entry - The cache entry
 * @returns True if cache can be used
 */
export function canUseCache(entry: CacheEntry | any): boolean {
  return entry && !isCacheExpired(entry);
}

