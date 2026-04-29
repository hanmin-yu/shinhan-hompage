import { buildReadonlySessionPayload, sendJson } from '../../src/server/newsAdminRuntime';

export default async function handler(request: { headers?: Record<string, string | string[] | undefined> }, response: {
  statusCode: number;
  setHeader(name: string, value: string | string[]): void;
  end(body?: string): void;
}) {
  sendJson(response, 200, buildReadonlySessionPayload(request));
}
