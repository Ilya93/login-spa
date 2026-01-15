import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig(() => {
  return {
    base: '/login-spa/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(dirname, 'src'),
      },
    },
    build: {
      sourcemap: true,
      target: 'es2022',
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      open: false,
    },
    preview: {
      port: 4173,
    },
  }
})
