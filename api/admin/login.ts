import {
  getEnv,
  readJsonBody,
  resolveNewsAdminRuntimeMode,
  sendJson,
  setEnabledAdminSessionCookie,
  setReadonlyAdminSessionCookie,
} from '../../src/server/newsAdminRuntime';

type LoginBody = {
  username?: string;
  password?: string;
};

export default async function handler(request: {
  method?: string;
  body?: unknown;
}, response: {
  statusCode: number;
  setHeader(name: string, value: string | string[]): void;
  end(body?: string): void;
}) {
  if (request.method !== 'POST') {
    sendJson(response, 405, { message: 'Method Not Allowed' });
    return;
  }

  const mode = resolveNewsAdminRuntimeMode();

  if (mode === 'readonly') {
    setReadonlyAdminSessionCookie(response);
    sendJson(response, 200, {
      mode,
      isAuthenticated: true,
      isReadOnly: true,
      username: 'demo-admin',
    });
    return;
  }

  const body = await readJsonBody<LoginBody>(request);
  const env = getEnv();
  const expectedUsername = env.ADMIN_USERNAME;
  const expectedPassword = env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword) {
    sendJson(response, 501, {
      message: '운영 모드 관리자 인증이 아직 구성되지 않았습니다.',
      code: 'NEWS_ADMIN_NOT_CONFIGURED',
    });
    return;
  }

  if (body.username !== expectedUsername || body.password !== expectedPassword) {
    sendJson(response, 401, {
      message: '아이디 또는 비밀번호가 올바르지 않습니다.',
      code: 'NEWS_ADMIN_INVALID_CREDENTIALS',
    });
    return;
  }

  setEnabledAdminSessionCookie(response, expectedUsername);
  sendJson(response, 200, {
    mode,
    isAuthenticated: true,
    isReadOnly: false,
    username: expectedUsername,
  });
}
