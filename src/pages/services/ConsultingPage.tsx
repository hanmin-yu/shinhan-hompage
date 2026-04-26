import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { consultingHubCards } from '../../data/pageContent';
import { useI18n } from '../../i18n/useI18n';

const IntroGrid = styled(P.SplitGrid)`
  margin-top: 20px;
  align-items: stretch;
`;

const IntroVisual = styled.div`
  min-height: 260px;
  border-radius: 10px;
  border: 1px solid rgba(20, 75, 157, 0.16);
  background:
    linear-gradient(180deg, rgba(13, 44, 90, 0.2), rgba(13, 44, 90, 0.08)),
    url('/subpages/service-main-consulting.jpg') center / cover no-repeat;
`;

export function ConsultingPage() {
  const { t, tx } = useI18n();
  const servicesSubnav = sectionSubnav.services;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer data-reveal>
          <LandingSubnav
            kicker={servicesSubnav.kicker}
            kickerEn={servicesSubnav.kickerEn}
            title={servicesSubnav.title}
            titleEn={servicesSubnav.titleEn}
            summary={servicesSubnav.summary}
            summaryEn={servicesSubnav.summaryEn}
            items={servicesSubnav.items}
          />

          <P.SectionHead>
            <div>
              <P.Kicker>Consulting Hub</P.Kicker>
              <P.SectionTitle>{t('컨설팅 서비스', 'Consulting Services')}</P.SectionTitle>
            </div>
          </P.SectionHead>
          <IntroGrid>
            <P.Panel>
              <P.Lead style={{ marginTop: 0 }}>
                {t(
                  '컨설팅 항목별로 주요 대응 범위와 상세 페이지를 확인할 수 있습니다.',
                  'Each consulting category provides key response scope and a detail page.',
                )}
              </P.Lead>
            </P.Panel>
            <IntroVisual aria-hidden="true" />
          </IntroGrid>
          <P.Grid columns={3}>
            {consultingHubCards.map((card) => (
              <P.Card key={card.title}>
                <P.CardTitle>{tx(card.title)}</P.CardTitle>
                <P.CardText>{tx(card.body)}</P.CardText>
                <P.CardLink to={card.href}>{t('자세히 보기', 'Learn More')}</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.HeroSection>
    </>
  );
}
