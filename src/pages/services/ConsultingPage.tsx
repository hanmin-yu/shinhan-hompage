import styled from '@emotion/styled';

import { palette } from '../../components/home/homeStyles';
import { EditorialPageHeader } from '../../components/site/EditorialPageHeader';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
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

const HeroHeading = styled.div`
  display: grid;
  gap: clamp(8px, 1vw, 12px);
  justify-items: start;
  min-width: 0;
`;

const HeroEyebrow = styled.span`
  display: block;
  margin-left: clamp(4px, 0.5vw, 8px);
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.35;
  text-transform: uppercase;
`;

const HeroTitle = styled.h1`
  max-width: 1040px;
  margin: 0;
  color: #172337;
  font-size: clamp(2.24rem, 5.2vw, 5.1rem);
  font-weight: 700;
  line-height: 1.08;
  letter-spacing: -0.04em;
  text-wrap: balance;
  word-break: keep-all;
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
  color: ${palette.blue};
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.08em;
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
  const { content } = useSiteContent();
  const servicesSubnav = content.global.sectionSubnav.services;
  const consultingHubCards = content.services.consultingHubCards;
  const consultingCopy = content.services.copy.consultingLanding;

  return (
    <>
      <EditorialPageHeader
        config={servicesSubnav}
        title="컨설팅"
        titleEn="Consulting"
        heroImage="/hero/menu-services-consulting-ai.png"
        heroPosition="center 50%"
      />

      <EditorialSection>
        <HeroStatement data-reveal>
          <HeroHeading>
            <HeroEyebrow>Consulting Hub</HeroEyebrow>
            <HeroTitle>{t(consultingCopy.heroTitle, consultingCopy.heroTitleEn)}</HeroTitle>
          </HeroHeading>
          <HeroLead>{t(consultingCopy.heroLead, consultingCopy.heroLeadEn)}</HeroLead>
        </HeroStatement>
      </EditorialSection>

      <EditorialSection $tone="soft">
        <P.PageContainer data-reveal>
          <SectionLabel>Consulting Services</SectionLabel>
          <EditorialTitle>{t(consultingCopy.sectionTitle, consultingCopy.sectionTitleEn)}</EditorialTitle>
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
