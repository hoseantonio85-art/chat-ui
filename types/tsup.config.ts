import { sassPlugin } from 'esbuild-sass-plugin';
import { defineConfig } from 'tsup';

import pkg from '../package.json';

export default defineConfig({
  sourcemap: false,
  entry: { index: '../src/chat-mf-app.ts' },
  dts: {
    resolve: true,
    only: true,
    banner: `declare module \'${pkg.name}\' {`,
    footer: '}',
  },
  name: 'index',
  tsconfig: '../tsconfig.app.json',
  outDir: 'dist',
  format: 'esm',
  esbuildPlugins: [sassPlugin()],
});
