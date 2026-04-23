import { ContactCtaSection } from '../../components/site/ContactCtaSection';
import * as P from '../../components/site/PagePrimitives';
import { seminarItems } from '../../data/pageContent';

export function SeminarPage() {
  const upcoming = seminarItems.filter((item) => item.status === '예정');
  const completed = seminarItems.filter((item) => item.status !== '예정');

  return (
    <>
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.Kicker>Seminar</P.Kicker>
          <P.SectionTitle>세미나</P.SectionTitle>
          <P.Lead>예정 세미나와 지난 세미나를 구분해 확인할 수 있도록 구성했습니다.</P.Lead>

          <P.SectionHead>
            <div>
              <P.Kicker>Upcoming</P.Kicker>
            </div>
          </P.SectionHead>
          <P.Grid columns={2}>
            {upcoming.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{item.title}</P.CardTitle>
                <P.CardText>{item.body}</P.CardText>
                <P.CardLink to="/contact">참가 문의</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>

          <P.SectionHead style={{ marginTop: 30 }}>
            <div>
              <P.Kicker>Archive</P.Kicker>
            </div>
          </P.SectionHead>
          <P.Grid columns={2}>
            {completed.map((item) => (
              <P.Card key={item.title}>
                <P.CardTitle>{item.title}</P.CardTitle>
                <P.CardText>{item.body}</P.CardText>
                <P.CardLink to="/news">다른 자료 보기</P.CardLink>
              </P.Card>
            ))}
          </P.Grid>
        </P.PageContainer>
      </P.PageSection>
      <ContactCtaSection />
    </>
  );
}

