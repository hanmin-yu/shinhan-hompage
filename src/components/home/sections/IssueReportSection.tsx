import styled from '@emotion/styled';

import { issueReports, newsItems } from '../../../data/home';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 96px 0;
  background: #ffffff;
  border-top: 1px solid rgba(21, 77, 159, 0.08);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 0.84fr);
  align-items: end;
  gap: 24px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #2c528e;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(36, 90, 171, 0.42);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #122f57;
  font-size: clamp(2rem, 3.7vw, 2.9rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 0;
  color: #4d6384;
  font-size: 0.95rem;
  line-height: 1.72;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.16fr) minmax(0, 0.84fr);
  gap: 14px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Featured = styled.article`
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
  min-height: 334px;
  border-radius: 10px;
  border: 1px solid rgba(20, 76, 158, 0.14);
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(16, 53, 114, 0.07);

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

const FeaturedImage = styled.div<{ image: string }>`
  background: ${({ image }) => `url(${image}) center / cover no-repeat`};
  min-height: 220px;
`;

const FeaturedBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 24px 22px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5c7397;
  font-size: 0.8rem;
  font-weight: 700;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #9eb2cf;
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  color: #163e77;
  font-size: 1.3rem;
  line-height: 1.42;
  letter-spacing: -0.02em;
`;

const FeaturedText = styled.p`
  margin: 0;
  color: #4d6384;
  font-size: 0.92rem;
  line-height: 1.64;
`;

const FeaturedLink = styled.a`
  margin-top: auto;
  width: fit-content;
  color: #1c57a8;
  font-size: 0.88rem;
  font-weight: 700;
`;

const SideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SideCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 104px;
  padding: 18px 18px 16px;
  border-radius: 10px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  background: #f8fbff;
`;

const SideCategory = styled.span`
  color: #2e5ea4;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const SideTitle = styled.h4`
  margin: 0;
  color: #1d3f74;
  font-size: 1rem;
  line-height: 1.5;
`;

const SideText = styled.p`
  margin: 0;
  color: #5b7294;
  font-size: 0.88rem;
  line-height: 1.56;
`;

const MoreLink = styled.a`
  margin-top: auto;
  width: fit-content;
  color: #1c57a8;
  font-size: 0.84rem;
  font-weight: 700;
`;

export function IssueReportSection() {
  const featured = issueReports[0];
  const sideItems = [issueReports[1], ...newsItems].filter(Boolean).slice(0, 3);

  if (!featured) return null;

  return (
    <>
      <S.SectionAnchor id="issue-report" />
      <S.SectionAnchor id="news" />
      <Section>
        <Inner data-reveal>
          <Head>
            <div>
              <Label>Insights</Label>
              <Title>대표 이슈 리포트 / 소식</Title>
            </div>
            <Description>
              주요 이슈를 편집형으로 요약해 빠르게 파악할 수 있도록 구성했습니다. 상세 자료와 아카이브는 소식/자료
              페이지에서 확인할 수 있습니다.
            </Description>
          </Head>

          <Grid>
            <Featured>
              <FeaturedImage image={featured.image} />
              <FeaturedBody>
                <Meta>
                  <span>{featured.source}</span>
                  <Dot />
                  <span>{featured.date}</span>
                </Meta>
                <FeaturedTitle>{featured.title}</FeaturedTitle>
                <FeaturedText>{featured.body}</FeaturedText>
                <FeaturedLink href="/news/issue-report">리포트 자세히 보기</FeaturedLink>
              </FeaturedBody>
            </Featured>

            <SideList>
              {sideItems.map((item) => (
                <SideCard key={item.title}>
                  <SideCategory>{'source' in item ? '이슈 리포트' : item.category}</SideCategory>
                  <SideTitle>{item.title}</SideTitle>
                  <SideText>{item.body}</SideText>
                  <MoreLink href="/news">읽어보기</MoreLink>
                </SideCard>
              ))}
            </SideList>
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
