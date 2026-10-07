import { URL, fileURLToPath } from 'node:url';
import { NodePackageImporter } from 'sass-embedded';
import { type ConfigEnv, type UserConfig, defineConfig, loadEnv } from 'vite';
import { checker } from 'vite-plugin-checker';
import externalize from 'vite-plugin-externalize-dependencies';
import vitePluginSingleSpa from 'vite-plugin-single-spa';

import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths'

const mifeDependencies = [/^@n-orm\/.+-mf-app/];
const externalDependencies = [
  /^react$/,
  /^react\/jsx-runtime$/,
  /^react\/jsx-dev-runtime$/,
  /^react-dom$/,
  /^react-dom\/client$/,
  /^react-dom\/server$/,
  /^single-spa$/,
  /^single-spa-react$/,
  ...mifeDependencies,
  '@sber-orm/ui-kit',
  '@sber-orm/components',
];

export default function vite({ mode }: ConfigEnv) {
  const environment = { ...process.env, ...loadEnv(mode, process.cwd(), '') };

  // https://vite.dev/config/
  return defineConfig({
    base: environment.BASE_PREFIX_URL ?? './',
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV ?? (mode === 'test' ? 'test' : 'production')),
    },
    plugins: [
      react({
        // Use React plugin in all *.jsx and *.tsx files
        include: /\.(ts|js)x?$/,
      }),
      checker({
        typescript: { tsconfigPath: 'tsconfig.app.json' },
      }),
      vitePluginSingleSpa({
        type: 'mife',
        spaEntryPoints: 'src/chat-mf-app.ts',
        serverPort: 4404,
      }),
      externalize({ externals: mode === 'test' ? mifeDependencies : externalDependencies }),
      tsconfigPaths(),
    ],
    css: {
      devSourcemap: true,
      preprocessorOptions: {
        sass: {
          api: 'modern-compiler',
          importers: [new NodePackageImporter()],
          silenceDeprecations: ['legacy-js-api'],
        },
        scss: {
          api: 'modern-compiler',
          importers: [new NodePackageImporter()],
          silenceDeprecations: ['legacy-js-api'],
        },
      },
    },
    envPrefix: 'VITE_',
    server: {
      cors: true,
    },
    preview: {
      cors: true,
    },
    resolve: {
      alias: [
        { find: '@', replacement: fileURLToPath(new URL('src', import.meta.url)) },
        { find: 'process', replacement: 'process/browser' },
      ],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    },
    build: {
      cssCodeSplit: true,
      assetsDir: 'assets',
      manifest: true,
      minify: false,
      rollupOptions: {
        input: 'src/chat-mf-app.ts',
        external: externalDependencies,
        output: {
          chunkFileNames: 'chunks/[name].[hash].js',
          assetFileNames: 'assets/[name].[hash].[ext]',
          entryFileNames: '[name].js',
          format: 'es',
        },
        preserveEntrySignatures: 'strict',
      },
    },
    test: {
      environment: 'jsdom',
      coverage: {
        enabled: true,
        provider: 'istanbul',
        extension: ['.ts'],
      },
      pool: 'vmThreads',
    },
  } as UserConfig);
}
