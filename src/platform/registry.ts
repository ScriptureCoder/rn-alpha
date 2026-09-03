import { PlatformAdapter } from './types';
import { createMemoryAdapter } from './memory';
import { logger } from '../utils/logger';

let adapter: PlatformAdapter | null = null;
let warnedAboutFallback = false;

/**
 * Register the platform adapter. The package entry points call this for you
 * (`@scripturecoder/rn-alpha-hooks` registers the native adapter,
 * `@scripturecoder/rn-alpha-hooks/web` registers the web adapter).
 *
 * Call it yourself, before rendering `AlphaProvider`, only when you need a
 * custom implementation (e.g. AsyncStorage instead of MMKV).
 */
export function setPlatformAdapter(next: PlatformAdapter): void {
  adapter = next;
  logger.debug(`[rn-alpha-hooks] Platform adapter set: ${next.name}`);
}

/**
 * Returns the registered adapter. Falls back to a non-persistent in-memory
 * adapter (with a one-time warning) so that importing internals directly
 * never crashes.
 */
export function getPlatformAdapter(): PlatformAdapter {
  if (!adapter) {
    if (!warnedAboutFallback) {
      warnedAboutFallback = true;
      logger.warn(
        '[rn-alpha-hooks] No platform adapter registered; using in-memory fallback. ' +
          'Import from "@scripturecoder/rn-alpha-hooks" (native) or ' +
          '"@scripturecoder/rn-alpha-hooks/web", or call setPlatformAdapter().',
      );
    }
    adapter = createMemoryAdapter();
  }
  return adapter;
}

export function hasPlatformAdapter(): boolean {
  return adapter !== null;
}
