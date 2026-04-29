import styled from '@emotion/styled';
import { Navigate, useParams } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useShinhanNewsRecord } from '../../hooks/useNewsContent';
import { useI18n } from '../../i18n/useI18n';
import { getShinhanNewsSourceLabel } from '../../utils/shinhanNews';

const DetailSection = styled(P.CompactPageSection)`
  padding-top: 0;
`;

const DetailCard = styled.article`
  padding: clamp(22px, 3vw, 34px);
  border-radius: 24px;
  border: 1px solid ${palette.line};
  background:
    radial-gradient(circle at top right, rgba(23, 159, 150, 0.08), transparent 24%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(245, 249, 255, 0.98));
  box-shadow: 0 26px 44px rgba(16, 53, 114, 0.08);
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-bottom: 14px;
  color: ${palette.textMuted};
  font-size: 0.9rem;
  font-weight: 700;
`;

const CategoryBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 12px;
  border-radius: 999px;
  border: 1px solid ${palette.line};
  background: linear-gradient(180deg, rgba(243, 249, 255, 0.98), rgba(234, 246, 244, 0.9));
  color: ${palette.blueDeep};
  font-size: 0.8rem;
  font-weight: 800;
`;

const DetailTitle = styled.h1`
  margin: 0;
  color: ${palette.textStrong};
  font-size: clamp(1.8rem, 3vw, 2.7rem);
  font-weight: 800;
  line-height: 1.22;
  letter-spacing: -0.03em;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 18px;
`;

const ContentWrap = styled.div`
  margin-top: 24px;
  padding-top: 22px;
  border-top: 1px solid ${palette.lineSoft};
  color: ${palette.textBody};
  font-size: 1rem;
  line-height: 1.8;

  p,
  div,
  li {
    color: inherit;
    font: inherit;
    line-height: inherit;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 0 auto;
    border-radius: 14px;
    box-shadow: 0 18px 32px rgba(16, 53, 114, 0.12);
  }

  a {
    color: ${palette.blue};
  }

  table {
    width: 100%;
    border-collapse: collapse;
  }

  td,
  th {
    border: 1px solid ${palette.line};
    padding: 10px 12px;
  }
`;

const StatusText = styled.p`
  margin: 16px 0 0;
  color: ${palette.textMuted};
  font-size: 0.95rem;
  font-weight: 600;
`;

export function ShinhanNewsDetailPage() {
  const { t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { newsId } = useParams<{ newsId: string }>();

  const { item, loading } = useShinhanNewsRecord(newsId);

  if (!loading && !item) {
    return <Navigate to="/news/shinhan-news" replace />;
  }

  return (
    <>
      <P.CompactHeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={newsSubnav.kicker}
            kickerEn={newsSubnav.kickerEn}
            title={newsSubnav.title}
            titleEn={newsSubnav.titleEn}
            summary={newsSubnav.summary}
            summaryEn={newsSubnav.summaryEn}
            items={newsSubnav.items}
            compactBottom
          />
        </P.PageContainer>
      </P.CompactHeroSection>

      <DetailSection tone="soft">
        <P.PageContainer data-reveal>
          <DetailCard>
            <MetaRow>
              <CategoryBadge>{item ? getShinhanNewsSourceLabel(item, t('세미나', 'Seminar')) : 'FLASH'}</CategoryBadge>
              <span>{item?.publishedAt}</span>
              {item?.author ? <span>{item.author}</span> : null}
            </MetaRow>
            <DetailTitle>{item ? t(item.title, item.titleEn) : ''}</DetailTitle>
            <ActionRow>
              <P.CardLink to="/news/shinhan-news">{t('목록으로', 'Back to List')}</P.CardLink>
            </ActionRow>
            {loading ? <StatusText>{t('상세 내용을 불러오는 중입니다.', 'Loading article details.')}</StatusText> : null}
            {!loading && item?.bodyHtml ? <ContentWrap dangerouslySetInnerHTML={{ __html: item.bodyHtml }} /> : null}
            {!loading && !item?.bodyHtml ? (
              <StatusText>{t('상세 내용을 찾을 수 없습니다.', 'The article content could not be found.')}</StatusText>
            ) : null}
          </DetailCard>
        </P.PageContainer>
      </DetailSection>
    </>
  );
}
