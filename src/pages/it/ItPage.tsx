import { ItSection } from '../../components/home/sections/ItSection';
import * as P from '../../components/site/PagePrimitives';
import { useI18n } from '../../i18n/useI18n';

export function ItPage() {
  const { t } = useI18n();

  return (
    <>
      <P.HeroSection>
        <P.PageContainer data-reveal>
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
