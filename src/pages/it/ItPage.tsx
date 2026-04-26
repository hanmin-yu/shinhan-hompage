import { ItSection } from '../../components/home/sections/ItSection';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
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
          <P.Title>{t('통관 실무와 연결되는 IT 서비스', 'IT Services Integrated with Customs Operations')}</P.Title>
          <P.Lead>
            {t(
              '신고 진행, 보완 이력, 리포트 배포까지 관세 업무 흐름을 데이터 기반으로 연결해 운영 효율을 높입니다.',
              'From declarations to corrections and reporting, we connect customs workflows through data to improve operational efficiency.',
            )}
          </P.Lead>
        </P.PageContainer>
      </P.HeroSection>
      <ItSection />
    </>
  );
}
