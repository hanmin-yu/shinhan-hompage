import styled from '@emotion/styled';

import { ItSection } from '../../components/home/sections/ItSection';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { itOverview } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const EditorialSection = styled.section<{ $tone?: 'soft' }>`
  padding: clamp(78px, 9vw, 128px) 0;
  border-top: 1px solid #d8dee8;
  background: ${({ $tone }) => ($tone === 'soft' ? 'linear-gradient(180deg, #f5f6f8 0%, #fbfcfd 100%)' : '#ffffff')};
`;

const HeroStatement = styled(P.PageContainer)`
  display: grid;
  gap: clamp(30px, 4vw, 54px);
`;

const HeroEyebrow = styled.span`
  color: #52647c;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.64rem, 6.4vw, 6.2rem);
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.055em;
  text-wrap: balance;

  @media (max-width: 640px) {
    letter-spacing: -0.035em;
  }
`;

const HeroLeadGrid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.82fr) minmax(280px, 0.42fr);
  gap: clamp(28px, 5vw, 74px);
  align-items: end;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const HeroLead = styled.p`
  max-width: 760px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.6vw, 1.28rem);
  line-height: 1.82;
`;

const LeadStack = styled.div`
  display: grid;
  gap: 18px;
`;

const HeroFacts = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border: 1px solid #d5dbe4;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 249, 252, 0.96)),
    #ffffff;
  box-shadow: 0 18px 36px rgba(23, 45, 78, 0.055);
  overflow: hidden;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const HeroFact = styled.div`
  position: relative;
  display: grid;
  align-content: start;
  gap: 12px;
  min-height: 136px;
  padding: 24px 24px 22px;
  border-right: 1px solid #dbe0e8;

  &::before {
    content: '';
    width: 34px;
    height: 3px;
    background: linear-gradient(90deg, #1d5fb6, #1aa398);
  }

  &:last-of-type {
    border-right: 0;
  }

  @media (max-width: 640px) {
    min-height: auto;
    padding: 22px 20px;
    border-right: 0;
    border-bottom: 1px solid #dbe0e8;

    &:last-of-type {
      border-bottom: 0;
    }
  }
`;

const HeroFactValue = styled.strong`
  color: #172337;
  font-size: clamp(1.32rem, 2vw, 1.92rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.035em;
  overflow-wrap: anywhere;
`;

const HeroFactLabel = styled.span`
  color: #687385;
  font-size: 0.92rem;
  line-height: 1.58;
  overflow-wrap: anywhere;
`;

export function ItPage() {
  const { t } = useI18n();
  const itSubnav = sectionSubnav.it;

  return (
    <>
      <EditorialPageHeader config={itSubnav} heroImage="/hero/it-server-room.png" heroPosition="center 50%" />

      <EditorialSection>
        <HeroStatement data-reveal>
          <div>
            <HeroEyebrow>IT Service</HeroEyebrow>
            <HeroTitle>{t(itOverview.title, itOverview.titleEn)}</HeroTitle>
          </div>
          <HeroLeadGrid>
            <LeadStack>
              <HeroLead>{t(itOverview.summary, itOverview.summaryEn)}</HeroLead>
              <HeroLead>{t(itOverview.body, itOverview.bodyEn)}</HeroLead>
            </LeadStack>
            <HeroFacts>
              <HeroFact>
                <HeroFactValue>AX</HeroFactValue>
                <HeroFactLabel>{t('업무 자동화와 AI 전환', 'Automation and AI transformation')}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>iOOM</HeroFactValue>
                <HeroFactLabel>{t('고객 통관 모니터링 시스템', 'Client customs monitoring system')}</HeroFactLabel>
              </HeroFact>
              <HeroFact>
                <HeroFactValue>Data</HeroFactValue>
                <HeroFactLabel>{t('데이터 중심 통관 운영', 'Data-driven customs operations')}</HeroFactLabel>
              </HeroFact>
            </HeroFacts>
          </HeroLeadGrid>
        </HeroStatement>
      </EditorialSection>

      <ItSection />
    </>
  );
}
