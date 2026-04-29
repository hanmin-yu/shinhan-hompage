import type { AdminSession, NewsAdminMode } from '../types/site';

type ApiRequest = {
  headers?: Record<string, string | string[] | undefined>;
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  statusCode: number;
  setHeader(name: string, value: string | string[]): void;
  end(body?: string): void;
};

const COOKIE_NAME = 'shinhan_news_admin_session';

export function getEnv() {
  const runtime = globalThis as typeof globalThis & {
    process?: {
      env?: Record<string, string | undefined>;
    };
  };

  return runtime.process?.env ?? {};
}

export function resolveNewsAdminRuntimeMode(): NewsAdminMode {
  const env = getEnv();
  const configured = env.NEWS_ADMIN_RUNTIME_MODE;

  if (configured === 'readonly' || configured === 'enabled') {
    return configured;
  }

  return env.VERCEL ? 'readonly' : 'readonly';
}

function parseCookies(request: ApiRequest) {
  const rawCookie = request.headers?.cookie;
  const cookieHeader = Array.isArray(rawCookie) ? rawCookie.join('; ') : rawCookie ?? '';

  return cookieHeader.split(';').reduce<Record<string, string>>((accumulator, pair) => {
    const [rawKey, ...rawValue] = pair.split('=');
    const key = rawKey?.trim();

    if (!key) {
      return accumulator;
    }

    accumulator[key] = decodeURIComponent(rawValue.join('=').trim());
    return accumulator;
  }, {});
}

function buildEnabledSessionToken(username: string, secret: string) {
  return `enabled:${username}:${secret}`;
}

function verifyEnabledSessionToken(token: string, secret: string) {
  const prefix = 'enabled:';
  if (!token.startsWith(prefix)) {
    return null;
  }
  const parts = token.split(':');
  if (parts.length !== 3) {
    return null;
  }
  const [, username, providedSecret] = parts;
  return providedSecret === secret ? username : null;
}

function buildCookie(value: string, maxAgeSeconds: number) {
  return `${COOKIE_NAME}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAgeSeconds}`;
}

export function clearAdminSessionCookie(response: ApiResponse) {
  response.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

export function setReadonlyAdminSessionCookie(response: ApiResponse) {
  response.setHeader('Set-Cookie', buildCookie('readonly-demo', 60 * 60 * 8));
}

export function setEnabledAdminSessionCookie(response: ApiResponse, username: string) {
  const env = getEnv();
  const secret = env.SESSION_SECRET ?? 'demo-news-admin-secret';
  response.setHeader('Set-Cookie', buildCookie(buildEnabledSessionToken(username, secret), 60 * 60 * 8));
}

export function readAdminSession(request: ApiRequest): AdminSession {
  const mode = resolveNewsAdminRuntimeMode();
  const cookies = parseCookies(request);
  const token = cookies[COOKIE_NAME];

  if (!token) {
    return {
      mode,
      isAuthenticated: false,
      isReadOnly: mode === 'readonly',
    };
  }

  if (mode === 'readonly') {
    return {
      mode,
      isAuthenticated: token === 'readonly-demo',
      isReadOnly: true,
      username: token === 'readonly-demo' ? 'demo-admin' : undefined,
    };
  }

  const env = getEnv();
  const secret = env.SESSION_SECRET ?? 'demo-news-admin-secret';
  const username = verifyEnabledSessionToken(token, secret);

  return {
    mode,
    isAuthenticated: Boolean(username),
    isReadOnly: false,
    username: username ?? undefined,
  };
}

export function sendJson(response: ApiResponse, statusCode: number, payload: unknown, extraHeaders?: Record<string, string>) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  Object.entries(extraHeaders ?? {}).forEach(([key, value]) => response.setHeader(key, value));
  response.end(JSON.stringify(payload));
}

export async function readJsonBody<T>(request: ApiRequest) {
  if (typeof request.body === 'string') {
    return JSON.parse(request.body) as T;
  }

  return (request.body ?? {}) as T;
}

export function requireReadonlyMutationBlock(response: ApiResponse) {
  sendJson(response, 501, {
    message: '데모 환경에서는 업로드와 저장 기능이 비활성화되어 있습니다.',
    code: 'NEWS_ADMIN_READONLY',
  });
}

export function buildReadonlySessionPayload(request: ApiRequest) {
  return readAdminSession(request);
}
