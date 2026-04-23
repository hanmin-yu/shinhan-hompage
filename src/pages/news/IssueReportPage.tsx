import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { issueReports } from '../../data/home';

export function IssueReportPage() {
  return (
    <>
      <P.PageSection>
        <P.PageContainer data-reveal>
          <P.SectionHead>
            <div>
              <P.Kicker>Issue Report</P.Kicker>
              <P.SectionTitle>이슈리포트</P.SectionTitle>
            </div>
            <P.HeadLink to="/news">소식 허브 보기</P.HeadLink>
          </P.SectionHead>
          <P.Lead>최신 통상·관세 이슈를 요약하고 실무 대응 포인트를 함께 제공합니다.</P.Lead>
          <P.Grid columns={2}>
            {issueReports.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{item.title}</P.CardTitle>
                <P.CardText>{item.body}</P.CardText>
                <P.CardText>
                  {item.tags.slice(0, 3).map((tag) => `#${tag}`).join(' · ')}
                </P.CardText>
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

