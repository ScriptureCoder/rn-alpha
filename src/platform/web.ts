import { PlatformAdapter, PlatformStorage, ToastDuration } from './types';
import { createMemoryStorage } from './memory';
import { logger } from '../utils/logger';

// The library's tsconfig deliberately omits the DOM lib (it would clash with
// React Native's global typings), so browser globals are reached via globalThis.
const g: any = typeof globalThis !== 'undefined' ? globalThis : {};
const getWindow = (): any => g.window;
const getDocument = (): any => g.document;
const getNavigator = (): any => g.navigator;

/**
 * localStorage-backed storage with an in-memory fallback for SSR and for
 * browsers that block storage access.
 */
function createWebStorage(): PlatformStorage {
  let local: any = null;
  try {
    local = getWindow()?.localStorage ?? null;
  } catch (e) {
    local = null;
  }
  if (!local) {
    return createMemoryStorage();
  }

  return {
    getItem: key => {
      try {
        const raw = local.getItem(key);
        return raw === null || raw === undefined ? undefined : JSON.parse(raw);
      } catch (e) {
        return undefined;
      }
    },
    setItem: (key, value) => {
      try {
        local.setItem(key, JSON.stringify(value));
      } catch (e) {
        // quota exceeded or storage disabled
      }
    },
    removeItem: key => {
      try {
        local.removeItem(key);
      } catch (e) {
        // ignore
      }
    },
    clear: () => {
      try {
        local.clear();
      } catch (e) {
        // ignore
      }
    },
  };
}

/**
 * Minimal DOM toast so `Toast()` does something sensible on the web without
 * pulling in a UI library. Apps that want their own look should provide a
 * custom adapter.
 */
function showDomToast(message: string, duration?: ToastDuration) {
  const doc = getDocument();
  if (!doc || !doc.body) {
    // eslint-disable-next-line no-console
    console.info('[rn-alpha-hooks] Toast:', message);
    return;
  }
  const el = doc.createElement('div');
  el.setAttribute('role', 'status');
  el.textContent = message;
  Object.assign(el.style, {
    position: 'fixed',
    left: '50%',
    bottom: '32px',
    transform: 'translateX(-50%)',
    maxWidth: '90vw',
    padding: '10px 16px',
    borderRadius: '8px',
    background: 'rgba(0,0,0,0.85)',
    color: '#fff',
    fontFamily: 'system-ui, sans-serif',
    fontSize: '14px',
    zIndex: '2147483647',
    pointerEvents: 'none',
    transition: 'opacity 200ms ease',
  });
  doc.body.appendChild(el);
  const ms = duration === 'SHORT' ? 2000 : 3500;
  setTimeout(() => {
    el.style.opacity = '0';
    setTimeout(() => el.remove(), 250);
  }, ms);
}

function blobToBase64(blob: any): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new g.FileReader();
    reader.onerror = () => reject(reader.error);
    reader.onload = () => {
      const result = String(reader.result || '');
      // strip the "data:<mime>;base64," prefix
      resolve(result.substring(result.indexOf(',') + 1));
    };
    reader.readAsDataURL(blob);
  });
}

/**
 * Browser implementation of the platform adapter.
 */
export function createWebAdapter(): PlatformAdapter {
  return {
    name: 'web',
    storage: createWebStorage(),

    onConnectivityChange: listener => {
      const win = getWindow();
      if (!win) {
        listener(true);
        return () => {};
      }
      const emit = () => listener(getNavigator()?.onLine !== false);
      emit();
      win.addEventListener('online', emit);
      win.addEventListener('offline', emit);
      return () => {
        win.removeEventListener('online', emit);
        win.removeEventListener('offline', emit);
      };
    },

    onForeground: listener => {
      const doc = getDocument();
      if (!doc) {
        return () => {};
      }
      const onVisibility = () => {
        if (doc.visibilityState === 'visible') {
          listener();
        }
      };
      doc.addEventListener('visibilitychange', onVisibility);
      return () => doc.removeEventListener('visibilitychange', onVisibility);
    },

    dismissKeyboard: () => {
      const active = getDocument()?.activeElement;
      if (active && typeof active.blur === 'function') {
        active.blur();
      }
    },

    toast: (message, duration) => {
      setTimeout(() => showDomToast(message, duration), 100);
    },

    readFile: async path => {
      try {
        if (typeof g.fetch !== 'function' || typeof g.FileReader !== 'function') return null;
        const response = await g.fetch(path);
        if (!response.ok) return null;
        return await blobToBase64(await response.blob());
      } catch (error) {
        logger.error('Error reading file:', error);
        return null;
      }
    },

    createAnimatedValue: (initialValue: number) => ({
      value: initialValue,
      setValue(next: number) {
        this.value = next;
      },
    }),
  };
}
