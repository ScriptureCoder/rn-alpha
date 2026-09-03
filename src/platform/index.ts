export type { PlatformAdapter, PlatformStorage, ToastDuration } from './types';
export { setPlatformAdapter, getPlatformAdapter, hasPlatformAdapter } from './registry';
export { createMemoryAdapter, createMemoryStorage } from './memory';
