/**
 * Side-effect module: registers the browser adapter.
 * Imported first by src/web.ts so the adapter exists before any module that
 * touches storage (e.g. the default store) is evaluated.
 */
import { setPlatformAdapter } from './registry';
import { createWebAdapter } from './web';

setPlatformAdapter(createWebAdapter());
