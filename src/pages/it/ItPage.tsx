import { ItSection } from '../../components/home/sections/ItSection';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { itOverview } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

export function ItPage() {
  const { t } = useI18n();
  const itSubnav = sectionSubnav.it;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
          <LandingSubnav
            kicker={itSubnav.kicker}
            kickerEn={itSubnav.kickerEn}
            title={itSubnav.title}
            titleEn={itSubnav.titleEn}
            summary={itSubnav.summary}
            summaryEn={itSubnav.summaryEn}
            items={itSubnav.items}
          />
        </P.PageContainer>

        <P.PageContainer data-reveal style={{ marginTop: 22 }}>
          <P.Kicker>IT Service</P.Kicker>
          <P.Title>{t(itOverview.title, itOverview.titleEn)}</P.Title>
          <P.Lead>{t(itOverview.summary, itOverview.summaryEn)}</P.Lead>
          <P.Lead>{t(itOverview.body, itOverview.bodyEn)}</P.Lead>
        </P.PageContainer>
      </P.HeroSection>
      <ItSection />
    </>
  );
}
