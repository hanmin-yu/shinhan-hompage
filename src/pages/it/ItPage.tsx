import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import { ItSection } from '../../components/home/sections/ItSection';
import * as P from '../../components/site/PagePrimitives';

export function ItPage() {
  return (
    <>
      <P.HeroSection>
        <P.PageContainer data-reveal>
          <P.Kicker>IT Service</P.Kicker>
          <P.Title>통관 실무와 연결되는 IT 서비스</P.Title>
          <P.Lead>
            신고 진행, 보완 이력, 리포트 배포까지 관세 업무 흐름을 데이터 기반으로 연결해 운영 효율을 높입니다.
          </P.Lead>
          <P.HeroActions>
            <P.PrimaryButton to="/contact">도입 문의하기</P.PrimaryButton>
            <P.SecondaryButton to="/services">업무분야 보기</P.SecondaryButton>
          </P.HeroActions>
        </P.PageContainer>
      </P.HeroSection>
      <ItSection />
      <ContactCtaSection />
    </>
  );
}

