import { getIssueReportsPayload } from './issueReportsService';

type RequestLike = {
  url?: string;
};

type ResponseLike = {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
};

function sendJson(response: ResponseLike, statusCode: number, payload: unknown) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

export async function handleIssueReportsRequest(request: RequestLike, response: ResponseLike) {
  const requestUrl = request.url ? new URL(request.url, 'http://localhost') : null;

  if (!requestUrl || requestUrl.pathname !== '/api/issue-reports') {
    return false;
  }

  const forceRefresh = requestUrl.searchParams.get('refresh') === '1';
  const payload = await getIssueReportsPayload(forceRefresh);
  sendJson(response, 200, payload);
  return true;
}
