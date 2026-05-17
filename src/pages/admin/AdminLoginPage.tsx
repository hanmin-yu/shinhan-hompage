import { type FormEvent, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import {
  AdminActionRow,
  AdminButton,
  AdminField,
  AdminForm,
  AdminHint,
  AdminInput,
  AdminLabel,
  AdminModeBadge,
  AdminPanel,
} from './AdminShared';

export function AdminLoginPage() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { session, loading, login } = useAdminSession();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!loading && session.isAuthenticated) {
    return <Navigate to="/admin/content/home" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await login({ username, password });
      navigate('/admin/content/home', { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : '관리자 로그인에 실패했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleReadonlyEnter() {
    setSubmitting(true);
    setError(null);

    try {
      await login();
      navigate('/admin/content/home', { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : '관리자 화면에 접근하지 못했습니다.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <AdminPanel>
          <P.Kicker>Admin</P.Kicker>
          <P.SectionTitle>{t('콘텐츠 관리자', 'Content Admin')}</P.SectionTitle>
          <AdminActionRow>
            <AdminModeBadge $readonly={session.mode === 'readonly'}>
              {session.mode === 'readonly' ? t('데모 읽기 전용', 'Demo Read-only') : t('운영 모드', 'Runtime Enabled')}
            </AdminModeBadge>
          </AdminActionRow>

          {session.mode === 'readonly' ? (
            <>
              <AdminActionRow>
                <AdminButton type="button" onClick={handleReadonlyEnter} disabled={submitting}>
                  {submitting ? t('이동 중...', 'Opening...') : t('읽기 전용 관리자 화면 보기', 'Open Read-only Admin')}
                </AdminButton>
              </AdminActionRow>
            </>
          ) : (
            <AdminForm onSubmit={handleSubmit}>
              <AdminField>
                <AdminLabel>{t('아이디', 'Username')}</AdminLabel>
                <AdminInput value={username} onChange={(event) => setUsername(event.target.value)} autoComplete="username" />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('비밀번호', 'Password')}</AdminLabel>
                <AdminInput
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />
              </AdminField>
              <AdminActionRow>
                <AdminButton type="submit" disabled={submitting}>
                  {submitting ? t('로그인 중...', 'Signing in...') : t('관리자 로그인', 'Admin Sign In')}
                </AdminButton>
              </AdminActionRow>
            </AdminForm>
          )}

          {error ? <AdminHint>{error}</AdminHint> : null}
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
