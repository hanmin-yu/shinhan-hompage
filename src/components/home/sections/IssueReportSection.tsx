import styled from '@emotion/styled';

import { issueReports, newsletterItems, shinhanNewsItems } from '../../../data/home';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 88px 0;
  background: linear-gradient(180deg, #eff6ff 0%, #f5f9ff 100%);
  border-top: 1px solid rgba(21, 77, 159, 0.11);
`;

const Inner = styled(S.Container)`
  display: flex;
  flex-direction: column;
  gap: 34px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: end;
  gap: 16px;
`;

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #23549a;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: rgba(36, 90, 171, 0.54);
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: #0f3b73;
  font-size: clamp(2rem, 3.7vw, 2.9rem);
  line-height: 1.14;
  letter-spacing: -0.03em;
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
  border-radius: 6px;
  border: 1px solid rgba(20, 76, 158, 0.2);
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 12px 24px rgba(16, 53, 114, 0.1);

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
  background: linear-gradient(180deg, #ffffff 0%, #f3f8ff 100%);
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #4e6c96;
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
  color: #11407a;
  font-size: 1.3rem;
  line-height: 1.42;
  letter-spacing: -0.02em;
`;

const FeaturedText = styled.p`
  margin: 0;
  color: #3f628b;
  font-size: 0.92rem;
  line-height: 1.64;
`;

const FeaturedLink = styled.a`
  margin-top: auto;
  width: fit-content;
  color: #1b5ab0;
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
  border-radius: 6px;
  border: 1px solid rgba(20, 76, 158, 0.18);
  background: linear-gradient(180deg, #f8fbff 0%, #eff6ff 100%);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(20, 76, 158, 0.3);
    box-shadow: 0 12px 20px rgba(16, 53, 114, 0.1);
  }
`;

const SideCategory = styled.span`
  color: #1f5eb2;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const SideTitle = styled.h4`
  margin: 0;
  color: #14417e;
  font-size: 1rem;
  line-height: 1.5;
`;

const SideText = styled.p`
  margin: 0;
  color: #46658e;
  font-size: 0.88rem;
  line-height: 1.56;
`;

const SideMeta = styled.span`
  margin-top: auto;
  color: #4a6992;
  font-size: 0.82rem;
  font-weight: 700;
`;

export function IssueReportSection() {
  const { t, tx } = useI18n();
  const featured = issueReports[0];
  const featuredShinhanNews = shinhanNewsItems[0];
  const featuredNewsletter = newsletterItems[0];

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
              <Title>{t('대표 이슈 리포트 / 소식', 'Featured Report / News')}</Title>
            </div>
          </Head>

          <Grid>
            <Featured>
              <FeaturedImage image={featured.image ?? '/hero/busan-port.jpg'} />
              <FeaturedBody>
                <Meta>
                  <span>{tx(featured.source)}</span>
                  <Dot />
                  <span>{featured.publishedAt}</span>
                </Meta>
                <FeaturedTitle>{tx(featured.title)}</FeaturedTitle>
                <FeaturedText>{tx(featured.summary)}</FeaturedText>
                <FeaturedLink href={featured.url} target="_blank" rel="noreferrer">
                  {t('원문 보기', 'View Source')}
                </FeaturedLink>
              </FeaturedBody>
            </Featured>

            <SideList>
              {featuredShinhanNews ? (
                <SideCard key={featuredShinhanNews.id}>
                  <SideCategory>{t('신한 NEWS', 'Shinhan NEWS')}</SideCategory>
                  <SideTitle>{tx(featuredShinhanNews.title)}</SideTitle>
                  <SideText>{tx(featuredShinhanNews.summary)}</SideText>
                  <SideMeta>{featuredShinhanNews.publishedAt}</SideMeta>
                </SideCard>
              ) : null}

              {featuredNewsletter ? (
                <SideCard key={featuredNewsletter.id}>
                  <SideCategory>{t('소식지', 'Newsletter')}</SideCategory>
                  <SideTitle>{tx(featuredNewsletter.title)}</SideTitle>
                  <SideText>{tx(featuredNewsletter.summary)}</SideText>
                  <SideMeta>{featuredNewsletter.publishedAt}</SideMeta>
                </SideCard>
              ) : null}
            </SideList>
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
