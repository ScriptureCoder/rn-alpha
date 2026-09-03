import { MMKV } from 'react-native-mmkv';
import NetInfo from '@react-native-community/netinfo';
import { Animated, AppState, AppStateStatus, Keyboard } from 'react-native';
import SimpleToast from 'react-native-simple-toast';
import RNFetchBlob from 'react-native-blob-util';
import { PlatformAdapter, PlatformStorage } from './types';
import { logger } from '../utils/logger';

/**
 * MMKV-backed storage. The MMKV instance is created on first use rather than
 * at import time so that importing the package never touches native code.
 */
function createMmkvStorage(): PlatformStorage {
  let instance: MMKV | null = null;
  const mmkv = () => {
    if (!instance) {
      instance = new MMKV();
    }
    return instance;
  };

  return {
    getItem: key => {
      try {
        const raw = mmkv().getString(key);
        return raw === undefined ? undefined : JSON.parse(raw);
      } catch (e) {
        return undefined;
      }
    },
    setItem: (key, value) => {
      try {
        mmkv().set(key, JSON.stringify(value));
      } catch (e) {
        // ignore write errors
      }
    },
    removeItem: key => {
      try {
        mmkv().delete(key);
      } catch (e) {
        // ignore
      }
    },
    clear: () => {
      mmkv().clearAll();
    },
  };
}

/**
 * React Native implementation of the platform adapter.
 */
export function createNativeAdapter(): PlatformAdapter {
  return {
    name: 'react-native',
    storage: createMmkvStorage(),

    onConnectivityChange: listener => {
      const unsubscribe = NetInfo.addEventListener(state => {
        listener(!!state.isInternetReachable);
      });
      return () => unsubscribe();
    },

    onForeground: listener => {
      let previous: AppStateStatus = AppState.currentState;
      const subscription = AppState.addEventListener('change', (next: AppStateStatus) => {
        if (previous.match(/inactive|background/) && next === 'active') {
          listener();
        }
        previous = next;
      });
      return () => subscription.remove();
    },

    dismissKeyboard: () => {
      Keyboard.dismiss();
    },

    toast: (message, duration) => {
      SimpleToast.show(message, SimpleToast[duration || 'LONG']);
    },

    readFile: async path => {
      try {
        return await RNFetchBlob.fs.readFile(path.replace('file://', ''), 'base64');
      } catch (error) {
        logger.error('Error reading file:', error);
        return null;
      }
    },

    createAnimatedValue: (initialValue: number) => new Animated.Value(initialValue),
  };
}
