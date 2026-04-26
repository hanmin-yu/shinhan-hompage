import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

import { issueReportsProxyPlugin } from './vite/issueReportsProxy';

export default defineConfig({
  plugins: [react(), issueReportsProxyPlugin()],
});
