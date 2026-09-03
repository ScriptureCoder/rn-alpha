/**
 * React Native entry point.
 *
 * The adapter registration import MUST stay first: ES modules evaluate imports
 * in source order, and the modules behind './exports' (default store, storage
 * util) read the adapter while they are being evaluated.
 */
import './platform/register-native';

export * from './exports';
export { createNativeAdapter } from './platform/native';
