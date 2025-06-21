import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Use NODE_ENV to detect test environment
const isTest = process.env.NODE_ENV === 'test';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    mockReset: true,
    setupFiles: [
      resolve(__dirname, '__mocks__/styleMock.js'),
      resolve(__dirname, 'vitest.setup.ts')
    ],
  },
  server: {
    deps: {
      inline: ["@mui/x-data-grid"]
    }
  },
  ssr: {
    noExternal: ['@mui/x-data-grid'],
  },
  resolve: {
    alias: isTest
      ? [
          // Mock all CSS imports (including from node_modules)
          { find: /\.css$/, replacement: resolve(__dirname, '__mocks__/styleMock.js') },
          { find: /\.module\.css$/, replacement: resolve(__dirname, '__mocks__/styleMock.js') }
        ]
      : [],
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json', '.css']
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    }
  }
});