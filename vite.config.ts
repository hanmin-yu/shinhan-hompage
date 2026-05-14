import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { issueReportsProxyPlugin } from './vite/issueReportsProxy';

const adminApiProxy = {
  '/api/admin': 'http://localhost:4174',
  '/api/news': 'http://localhost:4174',
  '/managed-content': 'http://localhost:4174',
};

export default defineConfig({
  server: {
    proxy: adminApiProxy,
  },
  preview: {
    proxy: adminApiProxy,
  },
  plugins: [react(), issueReportsProxyPlugin()],
});
