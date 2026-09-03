/**
 * Browser (react-dom) entry point: `@scripturecoder/rn-alpha-hooks/web`.
 *
 * The adapter registration import MUST stay first: ES modules evaluate imports
 * in source order, and the modules behind './exports' (default store, storage
 * util) read the adapter while they are being evaluated.
 */
import './platform/register-web';

export * from './exports';
export { createWebAdapter } from './platform/web';
