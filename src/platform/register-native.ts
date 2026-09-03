/**
 * Side-effect module: registers the React Native adapter.
 * Imported first by src/index.ts so the adapter exists before any module that
 * touches storage (e.g. the default store) is evaluated.
 */
import { setPlatformAdapter } from './registry';
import { createNativeAdapter } from './native';

setPlatformAdapter(createNativeAdapter());
