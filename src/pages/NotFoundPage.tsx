import * as P from '../components/site/PagePrimitives';
import { useI18n } from '../i18n/useI18n';

export function NotFoundPage() {
  const { t } = useI18n();

  return (
    <P.PageSection>
      <P.PageContainer data-reveal>
        <P.Kicker>404</P.Kicker>
        <P.SectionTitle>{t('요청하신 페이지를 찾을 수 없습니다.', 'The requested page could not be found.')}</P.SectionTitle>
        <P.HeroActions>
          <P.PrimaryButton to="/">{t('메인으로 이동', 'Go to Home')}</P.PrimaryButton>
          <P.SecondaryButton to="/services">{t('업무분야 보기', 'View Services')}</P.SecondaryButton>
        </P.HeroActions>
      </P.PageContainer>
    </P.PageSection>
  );
}
