import styled from '@emotion/styled';

import { issueReports, newsItems } from '../../../data/home';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 82px 0;
  background: #f7faff;
  border-top: 1px solid rgba(21, 77, 159, 0.08);
  border-bottom: 1px solid rgba(21, 77, 159, 0.08);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Head = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.span`
  color: #2c528e;
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #153f7f;
  font-size: clamp(2rem, 4vw, 2.9rem);
  line-height: 1.12;
  letter-spacing: -0.03em;
`;

const Description = styled.p`
  margin: 0;
  max-width: 520px;
  color: #4d6384;
  font-size: 0.96rem;
  line-height: 1.68;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  gap: 18px;

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const Featured = styled.article`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  min-height: 320px;
  border-radius: 14px;
  border: 1px solid rgba(20, 76, 158, 0.12);
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 16px 32px rgba(16, 53, 114, 0.08);

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
  padding: 24px;
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #5c7397;
  font-size: 0.82rem;
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
  font-size: 1.38rem;
  line-height: 1.35;
  letter-spacing: -0.02em;
`;

const FeaturedText = styled.p`
  margin: 0;
  color: #4d6384;
  font-size: 0.94rem;
  line-height: 1.62;
`;

const FeaturedLink = styled.a`
  margin-top: auto;
  color: #1c57a8;
  font-size: 0.9rem;
  font-weight: 700;
`;

const SideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const SideCard = styled.article`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 12px;
  border: 1px solid rgba(20, 76, 158, 0.1);
  background: #ffffff;
`;

const SideCategory = styled.span`
  color: #2e5ea4;
  font-size: 0.8rem;
  font-weight: 800;
`;

const SideTitle = styled.h4`
  margin: 0;
  color: #1d3f74;
  font-size: 1.02rem;
  line-height: 1.45;
`;

const SideText = styled.p`
  margin: 0;
  color: #5b7294;
  font-size: 0.9rem;
  line-height: 1.56;
`;

const MoreLink = styled.a`
  color: #1c57a8;
  font-size: 0.88rem;
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
              메인에서는 최신 이슈의 핵심만 빠르게 확인하고, 상세 자료는 소식/자료 메뉴에서 확인할 수 있도록
              구성했습니다.
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
                <FeaturedLink href="#news">리포트 자세히 보기</FeaturedLink>
              </FeaturedBody>
            </Featured>

            <SideList>
              {sideItems.map((item) => (
                <SideCard key={item.title}>
                  <SideCategory>{'source' in item ? '이슈 리포트' : item.category}</SideCategory>
                  <SideTitle>{item.title}</SideTitle>
                  <SideText>{item.body}</SideText>
                  <MoreLink href="#news">읽어보기</MoreLink>
                </SideCard>
              ))}
            </SideList>
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
