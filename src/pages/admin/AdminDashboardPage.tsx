import { Navigate } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import {
  AdminActionRow,
  AdminButton,
  AdminCardGrid,
  AdminCardTitle,
  AdminLinkButton,
  AdminMiniCard,
  AdminModeBadge,
  AdminMuted,
  AdminPanel,
  AdminReadonlyBanner,
  AdminTopRow,
} from './AdminShared';
import { adminContentGroups } from './adminContentConfig';

export function AdminDashboardPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();

  if (loading) {
    return (
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.CardText>{t('관리자 세션을 확인하는 중입니다.', 'Checking admin session.')}</P.CardText>
        </P.PageContainer>
      </P.PageSection>
    );
  }

  if (!session.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <AdminPanel>
          <AdminTopRow>
            <div>
              <P.Kicker>Admin</P.Kicker>
              <P.SectionTitle>{t('홈페이지 문구 관리자', 'Website Copy Admin')}</P.SectionTitle>
            </div>
            <AdminActionRow>
              <AdminModeBadge $readonly={session.isReadOnly}>
                {session.isReadOnly ? t('데모 읽기 전용', 'Demo Read-only') : t('운영 모드', 'Runtime Enabled')}
              </AdminModeBadge>
              <AdminButton type="button" $secondary onClick={() => void logout()}>
                {t('로그아웃', 'Logout')}
              </AdminButton>
            </AdminActionRow>
          </AdminTopRow>

          <AdminMuted>
            {t(
              '페이지별 제목과 안내 문구를 수정하는 화면입니다. 신한 NEWS와 소식지는 별도 관리 화면에서 수정합니다.',
              'Edit page headings and guide copy. Shinhan NEWS and newsletters are managed separately.',
            )}
          </AdminMuted>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                  '읽기 전용 모드에서는 저장이 비활성화됩니다.',
                  'Saves are disabled in read-only mode.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminCardGrid>
            {adminContentGroups.map((group) => (
              <AdminMiniCard key={group.id}>
                <P.Kicker>{t(group.label, group.labelEn)}</P.Kicker>
                <AdminCardTitle>{t(group.label, group.labelEn)}</AdminCardTitle>
                <AdminMuted>{t(group.summary, group.summaryEn)}</AdminMuted>
                <AdminLinkButton to={group.id === 'members' ? '/admin/members' : `/admin/content/${group.id}`}>
                  {t('관리 화면 보기', 'Open Admin View')}
                </AdminLinkButton>
              </AdminMiniCard>
            ))}

            <AdminMiniCard>
              <P.Kicker>{t('뉴스/소식지', 'News / Newsletter')}</P.Kicker>
              <AdminCardTitle>{t('뉴스/소식지', 'News / Newsletter')}</AdminCardTitle>
              <AdminMuted>
                {t(
                  '신한 NEWS와 소식지 관리자 화면으로 이동합니다.',
                  'Open the dedicated admin screens for Shinhan NEWS and newsletters.',
                )}
              </AdminMuted>
              <AdminActionRow>
                <AdminLinkButton to="/admin/news/shinhan-news">{t('신한 NEWS', 'Shinhan NEWS')}</AdminLinkButton>
                <AdminLinkButton to="/admin/news/newsletter" $secondary>
                  {t('소식지', 'Newsletter')}
                </AdminLinkButton>
              </AdminActionRow>
            </AdminMiniCard>
          </AdminCardGrid>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
