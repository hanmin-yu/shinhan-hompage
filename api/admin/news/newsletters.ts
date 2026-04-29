import { getNewsletterRecords } from '../../../src/repositories/newsRepository';
import { readAdminSession, requireReadonlyMutationBlock, sendJson } from '../../../src/server/newsAdminRuntime';

export default async function handler(
  request: {
    method?: string;
    headers?: Record<string, string | string[] | undefined>;
  },
  response: {
    statusCode: number;
    setHeader(name: string, value: string | string[]): void;
    end(body?: string): void;
  },
) {
  const session = readAdminSession(request);

  if (!session.isAuthenticated) {
    sendJson(response, 401, { message: '관리자 로그인이 필요합니다.' });
    return;
  }

  if (request.method === 'GET' || !request.method) {
    sendJson(response, 200, { items: getNewsletterRecords(), mode: session.mode });
    return;
  }

  requireReadonlyMutationBlock(response);
}
