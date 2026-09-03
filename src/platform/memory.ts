import { PlatformAdapter, PlatformStorage } from './types';

/**
 * In-memory storage. Used by the web adapter when localStorage is unavailable
 * (SSR, privacy mode) and by the registry when no adapter has been registered.
 */
export function createMemoryStorage(): PlatformStorage {
  const map = new Map<string, any>();
  return {
    getItem: key => map.get(key),
    setItem: (key, value) => {
      map.set(key, value);
    },
    removeItem: key => {
      map.delete(key);
    },
    clear: () => {
      map.clear();
    },
  };
}

/**
 * Fallback adapter with no platform integration at all. Nothing persists,
 * connectivity is always reported as online, and toasts go to console.
 */
export function createMemoryAdapter(): PlatformAdapter {
  return {
    name: 'memory',
    storage: createMemoryStorage(),
    onConnectivityChange: listener => {
      listener(true);
      return () => {};
    },
    onForeground: () => () => {},
    dismissKeyboard: () => {},
    toast: message => {
      // eslint-disable-next-line no-console
      console.info('[rn-alpha-hooks] Toast:', message);
    },
    readFile: async () => null,
    createAnimatedValue: (initialValue: number) => ({
      value: initialValue,
      setValue(next: number) {
        this.value = next;
      },
    }),
  };
}
