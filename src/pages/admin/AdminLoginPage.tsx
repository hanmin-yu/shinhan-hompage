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
  AdminMuted,
  AdminPanel,
  AdminReadonlyBanner,
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
    return <Navigate to="/admin/news" replace />;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await login({ username, password });
      navigate('/admin/news', { replace: true });
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
      navigate('/admin/news', { replace: true });
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
          <AdminMuted>
            {t(
              '신한 NEWS와 소식지 관리 화면입니다. 데모에서는 읽기 전용으로만 제공되며, 내부 서버 운영 시 저장 기능을 활성화합니다.',
              'This is the admin surface for Shinhan NEWS and newsletters. In the demo it stays read-only, and save features are enabled later on the internal server.',
            )}
          </AdminMuted>
          <AdminActionRow>
            <AdminModeBadge $readonly={session.mode === 'readonly'}>
              {session.mode === 'readonly' ? t('데모 읽기 전용', 'Demo Read-only') : t('운영 모드', 'Runtime Enabled')}
            </AdminModeBadge>
          </AdminActionRow>

          {session.mode === 'readonly' ? (
            <>
              <AdminReadonlyBanner>
                {t(
                  '데모 환경에서는 업로드와 저장이 비활성화되어 있습니다. 관리자 화면 구성과 흐름만 확인할 수 있습니다.',
                  'Uploads and saves are disabled in the demo environment. You can review the admin structure and workflow only.',
                )}
              </AdminReadonlyBanner>
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
              <AdminHint>
                {t(
                  '운영 모드에서는 내부 서버의 환경변수 계정으로 로그인합니다.',
                  'Enabled mode signs in with the environment-based internal server credentials.',
                )}
              </AdminHint>
              {session.mode === 'enabled' ? (
                <AdminHint>
                  {t(
                    'localhost 기본 계정은 환경변수가 없으면 admin / admin1234 를 사용합니다.',
                    'On localhost, the default credentials are admin / admin1234 when env vars are not set.',
                  )}
                </AdminHint>
              ) : null}
            </AdminForm>
          )}

          {error ? <AdminHint>{error}</AdminHint> : null}
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
