import { defineConfig } from 'tsup';

// Two entries share one source tree:
//   index.ts -> React Native build (registers the native adapter)
//   web.ts   -> browser build (registers the web adapter, no RN imports)
// Dependencies and peerDependencies are external by default, so the web bundle
// only stays RN-free because src/web.ts never imports src/platform/native.ts.
export default defineConfig({
  entry: { index: 'src/index.ts', web: 'src/web.ts' },
  splitting: false,
  sourcemap: true,
  clean: true,
  dts: true,
  format: ['cjs', 'esm'],
  minify: false,
  external: ['react', 'react-native']
});
