import { useCallback, useEffect, useMemo, useState } from 'react';

import { resolveNewsAdminMode } from '../config/newsAdminMode';
import type { AdminSession } from '../types/site';

type SessionResponse = AdminSession & {
  message?: string;
};

type LoginPayload = {
  username?: string;
  password?: string;
};

async function readJsonResponse<T>(response: Response) {
  const rawBody = await response.text();

  if (!rawBody.trim()) {
    throw new Error('관리자 API 응답이 비어 있습니다. 로컬에서는 `npm run dev`로 웹과 관리자 API를 함께 실행해주세요.');
  }

  try {
    return JSON.parse(rawBody) as T;
  } catch {
    throw new Error('관리자 API 응답 형식이 올바르지 않습니다. 관리자 API 서버 또는 프록시 설정을 확인해주세요.');
  }
}

function createFallbackSession(): AdminSession {
  const mode = resolveNewsAdminMode();

  return {
    mode,
    isAuthenticated: false,
    isReadOnly: mode === 'readonly',
  };
}

export function useAdminSession() {
  const [session, setSession] = useState<AdminSession>(createFallbackSession);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/admin/session', {
        credentials: 'same-origin',
      });

      if (!response.ok) {
        throw new Error(`Failed to load admin session: ${response.status}`);
      }

      const payload = await readJsonResponse<SessionResponse>(response);
      setSession({
        mode: payload.mode,
        isAuthenticated: payload.isAuthenticated,
        isReadOnly: payload.isReadOnly,
        username: payload.username,
      });
    } catch (sessionError) {
      setSession(createFallbackSession());
      setError('관리자 세션을 불러오지 못했습니다.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const login = useCallback(async ({ username, password }: LoginPayload = {}) => {
    const response = await fetch('/api/admin/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username ?? '',
        password: password ?? '',
      }),
    });

    const payload = await readJsonResponse<SessionResponse>(response);

    if (!response.ok) {
      throw new Error(payload.message ?? '관리자 로그인에 실패했습니다.');
    }

    setSession({
      mode: payload.mode,
      isAuthenticated: payload.isAuthenticated,
      isReadOnly: payload.isReadOnly,
      username: payload.username,
    });
    setError(null);
    return payload;
  }, []);

  const logout = useCallback(async () => {
    await fetch('/api/admin/logout', {
      method: 'POST',
      credentials: 'same-origin',
    });

    setSession(createFallbackSession());
  }, []);

  return useMemo(
    () => ({
      session,
      loading,
      error,
      refreshSession,
      login,
      logout,
    }),
    [error, loading, login, logout, refreshSession, session],
  );
}
