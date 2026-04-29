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
  AdminSubnav,
  AdminSubnavLink,
  AdminTopRow,
} from './AdminShared';

export function AdminNewsPage() {
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
              <P.SectionTitle>{t('뉴스 관리자', 'News Admin')}</P.SectionTitle>
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
              '신한 NEWS와 소식지 관리 구조를 미리 점검하는 화면입니다. 공개 뉴스 페이지는 계속 읽기 전용이며, 내부 서버 전환 시 저장 기능만 연결하면 됩니다.',
              'This screen previews the management structure for Shinhan NEWS and newsletters. Public news pages remain read-only, and later only the storage layer needs to be connected on the internal server.',
            )}
          </AdminMuted>

          <AdminSubnav>
            <AdminSubnavLink to="/admin/news" $active>
              {t('대시보드', 'Dashboard')}
            </AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/shinhan-news">{t('신한 NEWS', 'Shinhan NEWS')}</AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/newsletter">{t('소식지', 'Newsletter')}</AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '데모 환경에서는 업로드와 저장 기능이 비활성화되어 있습니다. 버튼과 입력 폼은 내부 서버 운영 시에만 활성화됩니다.',
                'Uploads and saves are disabled in the demo environment. Buttons and form actions are enabled only on the internal server runtime.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminCardGrid>
            <AdminMiniCard>
              <P.Kicker>Shinhan NEWS</P.Kicker>
              <AdminCardTitle>{t('뉴스 작성/수정 구조', 'NEWS Write/Edit Structure')}</AdminCardTitle>
              <AdminMuted>
                {t(
                  '목록 조회, 기사 폼, 게시 상태 확장 포인트를 확인할 수 있습니다.',
                  'Review the list view, article form, and future publishing extension points.',
                )}
              </AdminMuted>
              <AdminLinkButton to="/admin/news/shinhan-news">{t('관리 화면 보기', 'Open Admin View')}</AdminLinkButton>
            </AdminMiniCard>

            <AdminMiniCard>
              <P.Kicker>Newsletter</P.Kicker>
              <AdminCardTitle>{t('소식지 업로드 구조', 'Newsletter Upload Structure')}</AdminCardTitle>
              <AdminMuted>
                {t(
                  '원본 파일, 프리뷰 자산, 발행 메타데이터 입력 구조를 미리 볼 수 있습니다.',
                  'Preview the original file, preview assets, and issue metadata form structure.',
                )}
              </AdminMuted>
              <AdminLinkButton to="/admin/news/newsletter">{t('관리 화면 보기', 'Open Admin View')}</AdminLinkButton>
            </AdminMiniCard>
          </AdminCardGrid>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
