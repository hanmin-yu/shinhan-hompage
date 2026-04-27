import { issueReportsSnapshot, issueReportsSnapshotGeneratedAt } from '../src/data/issueReportsSnapshot';

type ApiResponse = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
};

const ISSUE_REPORT_SOURCES = ['한국관세사회', '한국무역협회'] as const;

function buildSnapshotPayload() {
  return {
    reports: issueReportsSnapshot,
    failedSources: [],
    succeededSources: [...ISSUE_REPORT_SOURCES],
    refreshedAt: issueReportsSnapshotGeneratedAt,
  };
}

function sendJson(response: ApiResponse, payload: unknown) {
  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  response.end(JSON.stringify(payload));
}

export default async function handler(request: { url?: string }, response: ApiResponse) {
  try {
    const requestUrl = new URL(typeof request?.url === 'string' && request.url.length > 0 ? request.url : '/api/issue-reports', 'http://localhost');

    if (requestUrl.pathname !== '/api/issue-reports') {
      response.statusCode = 404;
      response.end('Not Found');
      return;
    }

    sendJson(response, buildSnapshotPayload());
  } catch {
    sendJson(response, buildSnapshotPayload());
  }
}
