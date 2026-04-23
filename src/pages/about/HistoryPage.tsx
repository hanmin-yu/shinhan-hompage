import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { aboutTimeline } from '../../data/pageContent';

export function HistoryPage() {
  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>History</P.Kicker>
          <P.SectionTitle>연혁</P.SectionTitle>
          <P.Lead>창립부터 국내외 네트워크 확장까지, 주요 성장 이력을 핵심 마일스톤 중심으로 정리했습니다.</P.Lead>
          <P.Grid columns={2}>
            {aboutTimeline.map((item) => (
              <P.Card key={item.year}>
                <P.CardTitle>{item.year}</P.CardTitle>
                <P.CardText>{item.event}</P.CardText>
              </P.Card>
            ))}
          </P.Grid>
          <P.HeroActions>
            <P.PrimaryButton to="/about">신한소개로 돌아가기</P.PrimaryButton>
            <P.SecondaryButton to="/contact">문의하기</P.SecondaryButton>
          </P.HeroActions>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}
