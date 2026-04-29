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

      const payload = (await response.json()) as SessionResponse;
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

    const payload = (await response.json()) as SessionResponse;

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
