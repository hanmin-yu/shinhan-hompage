import styled from '@emotion/styled';

import { ItSection } from '../../components/home/sections/ItSection';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { itOverview } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const EditorialSection = styled.section<{ $tone?: 'soft' }>`
  font-family: "NanumSquare", "Noto Sans KR", "Apple SD Gothic Neo", "Malgun Gothic", sans-serif;
  padding: clamp(72px, 8vw, 118px) 0;
  background: ${({ $tone }) => ($tone === 'soft' ? '#f6f7f9' : '#ffffff')};
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 52px);
  max-width: 1280px;
`;

const HeroEyebrow = styled.span`
  color: #1d5fb6;
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: #111827;
  font-size: clamp(1.92rem, 3.7vw, 3.72rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.045em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const IntroStack = styled.div`
  display: grid;
  gap: clamp(24px, 3.6vw, 44px);
`;

const OneLineSummary = styled.p`
  max-width: 1240px;
  margin: 0;
  color: #1f2937;
  font-size: clamp(1.14rem, 1.58vw, 1.68rem);
  font-weight: 700;
  line-height: 1.36;
  letter-spacing: -0.016em;
  line-break: strict;
  overflow-wrap: break-word;
  text-wrap: pretty;
  white-space: pre-line;
  word-break: keep-all;

  @supports not (text-wrap: pretty) {
    text-wrap: balance;
  }

  @media (max-width: 640px) {
    max-width: 100%;
    font-size: clamp(1.28rem, 7vw, 1.68rem);
    letter-spacing: -0.018em;
    line-height: 1.45;
  }
`;

const OverviewBlock = styled.div`
  display: grid;
  grid-template-columns: minmax(120px, 0.18fr) minmax(0, 1fr);
  gap: clamp(20px, 4vw, 56px);
  padding: clamp(28px, 3.5vw, 42px) 0;
  border-top: 2px solid #1d5fb6;
  border-bottom: 1px solid #d8dee8;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const OverviewTitle = styled.h2`
  margin: 0;
  color: #174d9a;
  font-size: clamp(1.12rem, 1.6vw, 1.34rem);
  font-weight: 700;
  line-height: 1.28;
  letter-spacing: -0.025em;
`;

const OverviewText = styled.p`
  max-width: 940px;
  margin: 0;
  color: #475569;
  font-size: clamp(1.02rem, 1.3vw, 1.15rem);
  line-height: 1.82;
`;

export function ItPage() {
  const { t } = useI18n();
  const itSubnav = sectionSubnav.it;

  return (
    <>
      <EditorialPageHeader config={itSubnav} heroImage="/hero/menu-it-ai.png" heroPosition="center 50%" />

      <EditorialSection>
        <HeroStatement data-reveal>
          <IntroStack>
            <div>
              <HeroEyebrow>IT Service</HeroEyebrow>
              <HeroTitle>{t(itOverview.title, itOverview.titleEn)}</HeroTitle>
            </div>
            <OneLineSummary>{t(itOverview.summary, itOverview.summaryEn)}</OneLineSummary>
            <OverviewBlock>
              <OverviewTitle>{t('개요', 'Overview')}</OverviewTitle>
              <OverviewText>{t(itOverview.body, itOverview.bodyEn)}</OverviewText>
            </OverviewBlock>
          </IntroStack>
        </HeroStatement>
      </EditorialSection>

      <ItSection />
    </>
  );
}
