import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';
const path = (value: string) => fileURLToPath(new URL(value, import.meta.url));
const dependencies = ['react', 'react-dom', '@reatom/framework', '@reatom/npm-react', 'classnames', 'd3', 'exceljs', 'file-saver', 'html2canvas', 'i18next', 'i18next-browser-languagedetector', 'react-i18next', 'mobile-detect', 'uuid'];
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: 'react-dom/server', replacement: path('./node_modules/react-dom/server.browser.js') },
      { find: '@/helpers/useChat', replacement: path('./mocks/useChat.ts') },
      { find: '@/stores/services/MethodologistService', replacement: path('./mocks/files.ts') },
      { find: '@n-orm/auth-mf-app', replacement: path('./mocks/auth.ts') },
      { find: '@sber-orm/components', replacement: path('./mocks/components.tsx') },
      { find: '@sber-orm/ui-kit', replacement: path('./vendor/ui-kit/dist/index.js') },
      { find: 'single-spa', replacement: path('./mocks/navigation.ts') },
      { find: '@', replacement: path('../src') },
      ...dependencies.map(name => ({find: name, replacement: path(`./node_modules/${name}`)})),
    ],
    dedupe: ['react', 'react-dom'],
  },
  // The host tsconfig extends a private package; the standalone harness does not.
  esbuild: { tsconfigRaw: JSON.stringify({ compilerOptions: { jsx: 'react-jsx', useDefineForClassFields: true } }) },
  server: { fs: { allow: [path('..')] } },
  build: { outDir: 'dist', emptyOutDir: true },
  test: { include: ['../src/components/AgentActivity/*.test.ts'], environment: 'node' },
});
