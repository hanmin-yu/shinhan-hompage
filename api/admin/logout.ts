import { clearAdminSessionCookie, sendJson } from '../../src/server/newsAdminRuntime';

export default async function handler(_request: { method?: string }, response: {
  statusCode: number;
  setHeader(name: string, value: string | string[]): void;
  end(body?: string): void;
}) {
  clearAdminSessionCookie(response);
  sendJson(response, 200, { ok: true });
}
