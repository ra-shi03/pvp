import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  plugins: [
    react(),
    VitePWA({ registerType: 'autoUpdate' })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@food/api': path.resolve(__dirname, './src/services/api'),
      '@food': path.resolve(__dirname, './src/modules/Food'),
      '@delivery': path.resolve(__dirname, './src/modules/DeliveryV2'),
    },
  },
});
