import { issueReports } from '../../data/home';
import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { newsHubCards } from '../../data/pageContent';

export function NewsPage() {
  const featured = issueReports[0];

  return (
    <>
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>News & Resources</P.Kicker>
              <P.SectionTitle>소식 / 자료</P.SectionTitle>
            </div>
            <P.HeadLink to="/news/issue-report">이슈리포트 보기</P.HeadLink>
          </P.SectionHead>
          <P.Lead>대표 콘텐츠와 카테고리 허브를 통해 필요한 자료로 빠르게 이동할 수 있도록 구성했습니다.</P.Lead>

          {featured ? (
            <P.Card style={{ marginTop: 18 }}>
              <P.CardTitle>{featured.title}</P.CardTitle>
              <P.CardText>{featured.body}</P.CardText>
              <P.CardLink to="/news/issue-report">대표 이슈 보기</P.CardLink>
            </P.Card>
          ) : null}

          <P.Grid columns={2} style={{ marginTop: 16 }}>
            {newsHubCards.map((card) => (
              <P.Card key={card.title}>
                <P.CardTitle>{card.title}</P.CardTitle>
                <P.CardText>{card.body}</P.CardText>
                <P.CardLink to={card.href}>카테고리 이동</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

