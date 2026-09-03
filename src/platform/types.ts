/**
 * Platform adapter contract.
 *
 * Everything in this package that touches a platform API (persistent storage,
 * connectivity, app foreground state, the soft keyboard, toasts, file access)
 * goes through an adapter so the same hooks/store run on React Native and on
 * the web. The native adapter lives in ./native.ts, the web one in ./web.ts,
 * and apps can supply their own via setPlatformAdapter().
 */

export interface PlatformStorage {
  /** Returns the parsed value, or undefined when the key is missing. */
  getItem(key: string): any;
  /** Serialises and stores the value. */
  setItem(key: string, value: any): void;
  removeItem(key: string): void;
  clear(): void;
}

export type ToastDuration = 'SHORT' | 'LONG';

export interface PlatformAdapter {
  /** Human-readable adapter name, used in debug logs. */
  name: string;

  /** Key/value persistence backing the Redux store, offline queue and `storage` util. */
  storage: PlatformStorage;

  /**
   * Subscribe to connectivity changes. Must call the listener with the current
   * state immediately and return an unsubscribe function.
   */
  onConnectivityChange(listener: (connected: boolean) => void): () => void;

  /**
   * Subscribe to "app returned to the foreground" events (RN AppState -> active,
   * browser tab becomes visible). Returns an unsubscribe function.
   */
  onForeground(listener: () => void): () => void;

  /** Dismiss the on-screen keyboard (blur the focused element on web). */
  dismissKeyboard(): void;

  /** Show a transient message. */
  toast(message: string, duration?: ToastDuration): void;

  /** Read a file at `path` and return its base64 contents, or null on failure. */
  readFile(path: string): Promise<string | null>;

  /**
   * Create the value exposed as `scrollY` on the app context. Returns an
   * `Animated.Value` on native and a plain `{ value, setValue }` object on web.
   */
  createAnimatedValue(initialValue: number): any;
}
