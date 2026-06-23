import { defineConfig } from 'vite';
import react            from '@vitejs/plugin-react';
import path             from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      // This enables the @/ import alias that shadcn/ui components use
      // e.g. import { Button } from '@/components/ui/button'
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    proxy: {
      // Any request starting with /api gets forwarded to Laravel
      '/api': {
        target:        'http://localhost:8000',
        changeOrigin:  true,
        secure:        false,
      },
      // Sanctum CSRF cookie endpoint
      '/sanctum': {
        target:       'http://localhost:8000',
        changeOrigin: true,
        secure:       false,
      },
    },
  },
});