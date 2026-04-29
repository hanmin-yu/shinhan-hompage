import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { issueReportsProxyPlugin } from './vite/issueReportsProxy';

export default defineConfig({
  server: {
    proxy: {
      '/api/admin': 'http://localhost:4174',
      '/api/news': 'http://localhost:4174',
      '/managed-content': 'http://localhost:4174',
    },
  },
  plugins: [react(), issueReportsProxyPlugin()],
});
