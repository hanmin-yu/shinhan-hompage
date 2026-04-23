import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { consultingHubCards } from '../../data/pageContent';

export function ConsultingPage() {
  return (
    <>
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Consulting Hub</P.Kicker>
              <P.SectionTitle>컨설팅 서비스</P.SectionTitle>
            </div>
            <P.HeadLink to="/members/experts">관련 전문가 보기</P.HeadLink>
          </P.SectionHead>
          <P.Lead>핵심 컨설팅 카테고리를 기반으로 조사·검증·불복·환급 등 세부 과제를 구조적으로 지원합니다.</P.Lead>
          <P.Grid columns={3}>
            {consultingHubCards.map((card) => (
              <P.Card key={card.title}>
                <P.CardTitle>{card.title}</P.CardTitle>
                <P.CardText>{card.body}</P.CardText>
                <P.CardLink to={card.href}>자세히 보기</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

