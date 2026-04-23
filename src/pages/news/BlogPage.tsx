import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { blogItems } from '../../data/pageContent';

export function BlogPage() {
  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.Kicker>Blog</P.Kicker>
          <P.SectionTitle>블로그</P.SectionTitle>
          <P.Lead>실무 중심 콘텐츠를 통해 자주 발생하는 이슈를 빠르게 파악할 수 있습니다.</P.Lead>
          <P.Grid columns={2}>
            {blogItems.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{item.title}</P.CardTitle>
                <P.CardText>{item.body}</P.CardText>
                <P.CardLink to="/services">관련 업무분야 보기</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

