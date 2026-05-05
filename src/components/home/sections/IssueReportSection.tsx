import styled from '@emotion/styled';
import { useMemo, type CSSProperties } from 'react';

import { issueReports } from '../../../data/home';
import { useIssueReports } from '../../../hooks/useIssueReports';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const tradeInsightVisuals = [
  '/hero/trade-insights-ai-1.png',
  '/hero/trade-insights-ai-2.png',
  '/hero/trade-insights-ai-3.png',
  '/hero/trade-insights-ai-4.png',
  '/hero/trade-insights-ai-5.png',
];

const Section = styled.section`
  position: relative;
  padding: 104px 0 72px;
  overflow: hidden;
  background:
    linear-gradient(132deg, rgba(237, 245, 251, 0.82) 0%, rgba(255, 255, 255, 0.92) 42%, rgba(242, 249, 247, 0.76) 100%),
    linear-gradient(180deg, #f8fafc 0%, #ffffff 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: 'TRADE INSIGHTS';
    position: absolute;
    left: 24px;
    top: 26px;
    color: rgba(15, 35, 62, 0.055);
    font-size: clamp(3.6rem, 8vw, 8.8rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.08em;
    white-space: nowrap;
  }

  &::after {
    content: '';
    position: absolute;
    right: -120px;
    top: 42px;
    width: min(42vw, 560px);
    aspect-ratio: 1;
    pointer-events: none;
    background: url('/brand-mark-shinhan.png') center / contain no-repeat;
    opacity: 0.034;
    transform: rotate(8deg);
  }

  @media (max-width: 860px) {
    padding: 82px 0;

    &::after {
      width: 82vw;
      right: -42vw;
      top: 120px;
    }
  }
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 34px;
`;

const Head = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  align-items: end;
  gap: 24px;

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h2`
  margin: 12px 0 0;
  color: #222a34;
  font-size: clamp(2.8rem, 7vw, 6.2rem);
  font-weight: 800;
  line-height: 0.92;
  letter-spacing: 0.04em;
`;

const ViewAll = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #164f99;
  font-size: clamp(1.02rem, 1.18vw, 1.16rem);
  font-weight: 800;
  text-decoration: none;

  &::after {
    content: '';
    width: 36px;
    height: 1px;
    background: currentColor;
  }
`;

const Content = styled.div`
  --insight-panel-height: clamp(500px, 35vw, 570px);
  display: grid;
  grid-template-columns: minmax(380px, 0.96fr) minmax(0, 1.04fr);
  gap: clamp(28px, 5vw, 72px);
  align-items: stretch;

  @media (max-width: 980px) {
    --insight-panel-height: auto;
    grid-template-columns: 1fr;
  }
`;

const Featured = styled.a`
  display: grid;
  height: var(--insight-panel-height);
  min-height: 0;
  color: #ffffff;
  text-decoration: none;
  background:
    linear-gradient(180deg, rgba(3, 20, 42, 0.06), rgba(3, 20, 42, 0.72)),
    var(--report-image);
  background-position: center;
  background-size: cover;
  border: 1px solid rgba(12, 46, 93, 0.12);
  overflow: hidden;

  @media (max-width: 700px) {
    min-height: 420px;
  }
`;

const FeaturedBody = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 15px;
  padding: clamp(24px, 4vw, 38px);
`;

const Meta = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.98rem;
  font-weight: 800;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: currentColor;
  opacity: 0.58;
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  max-width: 16ch;
  color: #ffffff;
  font-size: clamp(1.7rem, 3vw, 2.65rem);
  font-weight: 800;
  line-height: 1.18;
  letter-spacing: -0.02em;
`;

const FeaturedText = styled.p`
  max-width: 54ch;
  margin: 0;
  color: rgba(255, 255, 255, 0.84);
  font-size: 1.08rem;
  line-height: 1.68;
`;

const List = styled.div`
  display: grid;
  grid-template-rows: repeat(5, minmax(0, 1fr));
  height: var(--insight-panel-height);
  border-top: 1px solid rgba(15, 43, 89, 0.18);

  @media (max-width: 980px) {
    display: flex;
    flex-direction: column;
    height: auto;
  }
`;

const ReportLink = styled.a`
  display: grid;
  grid-template-columns: minmax(92px, 0.18fr) minmax(0, 1fr);
  gap: 22px;
  align-items: center;
  min-height: 0;
  padding: 18px 0;
  border-bottom: 1px solid rgba(15, 43, 89, 0.14);
  text-decoration: none;
  transition:
    padding-left 0.24s ease,
    border-color 0.24s ease;

  &:hover {
    padding-left: 16px;
    border-color: rgba(28, 90, 169, 0.42);
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;

const ReportDate = styled.span`
  color: #677684;
  font-size: 1rem;
  font-weight: 800;
  white-space: nowrap;
`;

const ReportCopy = styled.span`
  display: grid;
  gap: 8px;
`;

const ReportSource = styled.span`
  color: #1c5aa9;
  font-size: 0.9rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const ReportTitle = styled.strong`
  color: #2d3339;
  font-size: clamp(1.16rem, 1.62vw, 1.46rem);
  font-weight: 800;
  line-height: 1.38;
`;

export function IssueReportSection() {
  const { t } = useI18n();
  const { reports } = useIssueReports();
  const featuredImage = useMemo(() => {
    const index = Math.floor(Math.random() * tradeInsightVisuals.length);
    return tradeInsightVisuals[index];
  }, []);

  const latestReports = reports.filter((report) => report.status !== 'placeholder');
  const visibleReports = (latestReports.length > 0 ? latestReports : issueReports).slice(0, 9);
  const featured = visibleReports[0];
  const sideReports = visibleReports.slice(1, 6);

  if (!featured) return null;

  return (
    <>
      <S.SectionAnchor id="issue-report" />
      <S.SectionAnchor id="news" />
      <Section>
        <Inner>
          <Head>
            <div>
              <Title>Trade Insights</Title>
            </div>
            <ViewAll href="/news/issue-report">{t('Trade Insights 전체보기', 'View all Trade Insights')}</ViewAll>
          </Head>

          <Content>
            <Featured
              href={featured.url}
              target="_blank"
              rel="noreferrer"
              style={{ '--report-image': `url(${featuredImage})` } as CSSProperties & Record<'--report-image', string>}
            >
              <FeaturedBody>
                <Meta>
                  <span>{t(featured.source, featured.sourceEn)}</span>
                  <Dot />
                  <span>{featured.publishedAt}</span>
                </Meta>
                <FeaturedTitle>{t(featured.title, featured.titleEn)}</FeaturedTitle>
                <FeaturedText>{t(featured.summary, featured.summaryEn)}</FeaturedText>
              </FeaturedBody>
            </Featured>

            <List>
              {sideReports.map((item) => (
                <ReportLink key={item.id} href={item.url} target="_blank" rel="noreferrer">
                  <ReportDate>{item.publishedAt}</ReportDate>
                  <ReportCopy>
                    <ReportSource>{t(item.source, item.sourceEn)}</ReportSource>
                    <ReportTitle>{t(item.title, item.titleEn)}</ReportTitle>
                  </ReportCopy>
                </ReportLink>
              ))}
            </List>
          </Content>
        </Inner>
      </Section>
    </>
  );
}
