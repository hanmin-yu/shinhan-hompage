import type { Connect, Plugin } from 'vite';

import { handleIssueReportsRequest } from '../src/server/issueReportsHttp';

function createIssueReportMiddleware(): Connect.NextHandleFunction {
  return async (request, response, next) => {
    const handled = await handleIssueReportsRequest(request, response);

    if (!handled) {
      next();
    }
  };
}

export function issueReportsProxyPlugin(): Plugin {
  return {
    name: 'issue-reports-api-bridge',
    configureServer(server) {
      server.middlewares.use(createIssueReportMiddleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(createIssueReportMiddleware());
    },
  };
}
