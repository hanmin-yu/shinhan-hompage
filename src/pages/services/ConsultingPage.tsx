import styled from '@emotion/styled';

import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { consultingHubCards } from '../../data/pageContent';
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
`;

const HeroLead = styled.p`
  max-width: 780px;
  margin: 0;
  color: #4d5a6c;
  font-size: clamp(1.04rem, 1.6vw, 1.28rem);
  line-height: 1.82;
`;

const SectionLabel = styled.span`
  display: inline-flex;
  margin-bottom: 16px;
  color: #52647c;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
`;

const EditorialTitle = styled.h2`
  max-width: 940px;
  margin: 0 0 clamp(28px, 4vw, 48px);
  color: #172337;
  font-size: clamp(2.2rem, 4.8vw, 4.8rem);
  font-weight: 800;
  line-height: 1.08;
  letter-spacing: -0.055em;
  text-wrap: balance;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 1px solid #d5dbe4;
  border-left: 1px solid #d5dbe4;

  @media (max-width: 1080px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const ConsultingCard = styled(P.Card)`
  min-height: 230px;
  border: 0;
  border-right: 1px solid #d5dbe4;
  border-bottom: 1px solid #d5dbe4;
  border-radius: 0;
  box-shadow: none;
  background: #ffffff;
`;

export function ConsultingPage() {
  const { t, tx } = useI18n();
  const servicesSubnav = sectionSubnav.services;

  return (
    <>
      <EditorialPageHeader
        config={servicesSubnav}
        title="컨설팅"
        titleEn="Consulting"
        heroImage="/subpages/service-main-consulting.jpg"
        heroPosition="center 50%"
      />

      <EditorialSection>
        <HeroStatement data-reveal>
          <div>
            <HeroEyebrow>Consulting Hub</HeroEyebrow>
            <HeroTitle>{t('복잡한 관세 이슈를 실무 가능한 전략으로 정리합니다.', 'Turning complex customs issues into executable strategy.')}</HeroTitle>
          </div>
          <HeroLead>
            {t(
              'FTA, AEO, ACVA, 관세조사, 외환검사, 조세불복 등 기업이 마주하는 주요 리스크를 사전에 진단하고 단계별 대응을 지원합니다.',
              'We diagnose and respond to key enterprise risks across FTA, AEO, ACVA, customs audits, foreign exchange reviews, tax appeals, and more.',
            )}
          </HeroLead>
        </HeroStatement>
      </EditorialSection>

      <EditorialSection $tone="soft">
        <P.PageContainer data-reveal>
          <SectionLabel>Consulting Services</SectionLabel>
          <EditorialTitle>{t('항목별 주요 대응 범위와 상세 페이지를 확인하세요.', 'Review key response scope and detail pages by consulting area.')}</EditorialTitle>
          <CardGrid>
            {consultingHubCards.map((card) => (
              <ConsultingCard key={card.title}>
                <P.CardTitle>{tx(card.title)}</P.CardTitle>
                <P.CardText>{tx(card.body)}</P.CardText>
                <P.CardLink to={card.href}>{t('자세히 보기', 'Learn More')}</P.CardLink>
              </ConsultingCard>
            ))}
          </CardGrid>
        </P.PageContainer>
      </EditorialSection>
    </>
  );
}
