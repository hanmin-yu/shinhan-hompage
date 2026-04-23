import * as P from '../components/site/PagePrimitives';

export function NotFoundPage() {
  return (
    <P.PageSection>
      <P.PageContainer data-reveal>
        <P.Kicker>404</P.Kicker>
        <P.SectionTitle>요청하신 페이지를 찾을 수 없습니다.</P.SectionTitle>
        <P.HeroActions>
          <P.PrimaryButton to="/">메인으로 이동</P.PrimaryButton>
          <P.SecondaryButton to="/services">업무분야 보기</P.SecondaryButton>
        </P.HeroActions>
      </P.PageContainer>
    </P.PageSection>
  );
}

