import styled from '@emotion/styled';
import { Navigate, useParams } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { getShinhanInsightById } from '../../data/shinhanInsights';
import { useI18n } from '../../i18n/useI18n';
import { NewsCompactHeroSection, NewsFlushPageSection, NewsPageContainer } from './newsLayout';

const DetailSection = styled(NewsFlushPageSection)`
  padding-top: 0;
`;

const DetailCard = styled.article`
  padding: clamp(24px, 3.4vw, 42px);
  border-radius: 8px;
  border: 1px solid ${palette.line};
  background:
    radial-gradient(circle at top right, rgba(37, 103, 194, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(246, 250, 255, 0.98));
  box-shadow: 0 26px 44px rgba(16, 53, 114, 0.08);
`;

const MetaRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px 14px;
  margin-bottom: 16px;
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
  max-width: 980px;
  margin: 0;
  color: ${palette.textStrong};
  font-size: clamp(1.82rem, 3vw, 2.72rem);
  font-weight: 850;
  line-height: 1.22;
  letter-spacing: -0.03em;
`;

const Summary = styled.p`
  max-width: 980px;
  margin: 18px 0 0;
  color: ${palette.textBody};
  font-size: clamp(1rem, 1.35vw, 1.14rem);
  font-weight: 650;
  line-height: 1.72;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 20px;
`;

const Body = styled.div`
  display: grid;
  gap: 18px;
  max-width: 980px;
  margin-top: 28px;
  padding-top: 24px;
  border-top: 1px solid ${palette.lineSoft};
`;

const Paragraph = styled.p`
  margin: 0;
  color: ${palette.textBody};
  font-size: 1rem;
  line-height: 1.84;
  word-break: keep-all;
`;

export function ShinhanInsightDetailPage() {
  const { language, t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { insightId } = useParams<{ insightId: string }>();
  const item = getShinhanInsightById(insightId);

  if (!item) {
    return <Navigate to="/news/shinhan-insights" replace />;
  }

  const body = language === 'en' ? item.bodyEn : item.body;

  return (
    <>
      <NewsCompactHeroSection>
        <NewsPageContainer>
          <LandingSubnav
            kicker={newsSubnav.kicker}
            kickerEn={newsSubnav.kickerEn}
            title={newsSubnav.title}
            titleEn={newsSubnav.titleEn}
            summary={newsSubnav.summary}
            summaryEn={newsSubnav.summaryEn}
            items={newsSubnav.items}
            compactBottom
            matchAboutHero
          />
        </NewsPageContainer>
      </NewsCompactHeroSection>

      <DetailSection>
        <NewsPageContainer data-reveal>
          <DetailCard>
            <MetaRow>
              <CategoryBadge>{t(item.categoryLabel, item.categoryLabelEn)}</CategoryBadge>
              <span>{item.publishedAt}</span>
              <span>{t(item.author, item.authorEn)}</span>
            </MetaRow>
            <DetailTitle>{t(item.title, item.titleEn)}</DetailTitle>
            <Summary>{t(item.summary, item.summaryEn)}</Summary>
            <ActionRow>
              <P.CardLink to="/news/shinhan-insights">{t('목록으로', 'Back to List')}</P.CardLink>
            </ActionRow>
            <Body>
              {body.map((paragraph) => (
                <Paragraph key={paragraph}>{paragraph}</Paragraph>
              ))}
            </Body>
          </DetailCard>
        </NewsPageContainer>
      </DetailSection>
    </>
  );
}
