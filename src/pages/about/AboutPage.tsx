import { Link } from 'react-router-dom';

import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { aboutStrengths } from '../../data/pageContent';

export function AboutPage() {
  return (
    <>
      <P.HeroSection>
        <P.HeroGrid data-reveal>
          <div>
            <P.Kicker>About Shinhan</P.Kicker>
            <P.Title>신한관세법인 소개</P.Title>
            <P.Lead>
              1965년부터 축적한 관세 실무 경험을 바탕으로 수출입통관, 컨설팅, 물류 연계를 하나의 체계로 제공하는
              기업형 전문 서비스 조직입니다.
            </P.Lead>
            <P.HeroActions>
              <P.PrimaryButton to="/services">업무분야 보기</P.PrimaryButton>
              <P.SecondaryButton to="/contact">문의하기</P.SecondaryButton>
            </P.HeroActions>
          </div>
          <P.HeroVisual />
        </P.HeroGrid>
      </P.HeroSection>

      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Strength</P.Kicker>
              <P.SectionTitle>핵심 강점</P.SectionTitle>
            </div>
          </P.SectionHead>
          <P.Grid columns={3}>
            {aboutStrengths.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{item.title}</P.CardTitle>
                <P.CardText>{item.body}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Network</P.Kicker>
          <P.SectionTitle>전국 네트워크와 해외 법인 연계</P.SectionTitle>
          <P.Lead>
            서울본사를 중심으로 지역 거점과 베트남 법인을 연결해 통관·컨설팅·운영 이슈를 하나의 체계로 지원합니다.
          </P.Lead>
          <P.HeroActions>
            <P.PrimaryButton to="/offices">사무소 전체보기</P.PrimaryButton>
            <P.SecondaryButton to="/about/location">오시는 길</P.SecondaryButton>
          </P.HeroActions>
          <P.Lead>
            더 자세한 기업 연혁과 메시지는 <Link to="/about/history">연혁</Link>,{' '}
            <Link to="/about/message">인사말</Link> 페이지에서 확인할 수 있습니다.
          </P.Lead>
        </P.PageContainer>
      </P.PageSection>

      <ContactCtaSection />
    </>
  );
}
