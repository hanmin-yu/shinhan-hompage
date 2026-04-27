import { handleIssueReportsRequest } from '../src/server/issueReportsHttp';

export default async function handler(request: { url?: string }, response: {
  statusCode: number;
  setHeader(name: string, value: string): void;
  end(body?: string): void;
}) {
  request.url ??= '/api/issue-reports';
  await handleIssueReportsRequest(request, response);
}
