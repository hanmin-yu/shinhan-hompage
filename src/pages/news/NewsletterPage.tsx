import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { newsletterItems } from '../../data/pageContent';

export function NewsletterPage() {
  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Newsletter</P.Kicker>
          <P.SectionTitle>소식지</P.SectionTitle>
          <P.Lead>호수별 핵심 이슈를 빠르게 확인하고 필요한 자료를 확인할 수 있습니다.</P.Lead>
          <P.Grid columns={2}>
            {newsletterItems.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{item.title}</P.CardTitle>
                <P.CardText>{item.body}</P.CardText>
                <P.CardText>{item.date}</P.CardText>
                <P.CardLink to="/news">소식 허브로 이동</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

