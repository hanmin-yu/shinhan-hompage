import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { serviceHubCards } from '../../data/pageContent';

export function ServicesPage() {
  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Services</P.Kicker>
              <P.SectionTitle>업무분야</P.SectionTitle>
            </div>
            <P.HeadLink to="/services/consulting">컨설팅 허브 보기</P.HeadLink>
          </P.SectionHead>
          <P.Lead>
            수출입통관, 검역/요건, 컨설팅, 기타 서비스로 구성된 업무 체계를 기반으로 기업별 상황에 맞는 실무 대응을
            제공합니다.
          </P.Lead>
          <P.Grid columns={2}>
            {serviceHubCards.map((card) => (
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

