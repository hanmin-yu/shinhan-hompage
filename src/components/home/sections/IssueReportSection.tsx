import styled from '@emotion/styled';

import { issueReports } from '../../../data/home';
import { useIssueReports } from '../../../hooks/useIssueReports';
import { useI18n } from '../../../i18n/useI18n';
import * as S from '../homeStyles';

const Section = styled.section`
  padding: 88px 0;
  background:
    radial-gradient(circle at 84% 18%, rgba(214, 154, 54, 0.1), transparent 18%),
    radial-gradient(circle at 14% 18%, rgba(33, 101, 193, 0.12), transparent 22%),
    linear-gradient(180deg, #eef6ff 0%, #f5fbff 100%);
  border-top: 1px solid ${S.palette.lineSoft};
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
  color: ${S.palette.blue};
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 28px;
    height: 1px;
    background: linear-gradient(90deg, rgba(33, 101, 193, 0.56), rgba(214, 154, 54, 0.3));
  }
`;

const Title = styled.h2`
  margin: 10px 0 0;
  color: ${S.palette.textPrimary};
  font-size: clamp(2rem, 3.7vw, 2.9rem);
  font-weight: 800;
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

const Featured = styled.a`
  display: grid;
  grid-template-columns: minmax(260px, 0.9fr) minmax(0, 1.1fr);
  min-height: 334px;
  border-radius: 6px;
  border: 1px solid ${S.palette.line};
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 16px 30px rgba(16, 53, 114, 0.12);
  text-decoration: none;

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
  background:
    radial-gradient(circle at top right, rgba(23, 159, 150, 0.08), transparent 22%),
    linear-gradient(180deg, #ffffff 0%, #f3f8ff 100%);
`;

const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${S.palette.textMuted};
  font-size: 0.8rem;
  font-weight: 700;
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: rgba(33, 101, 193, 0.36);
`;

const FeaturedTitle = styled.h3`
  margin: 0;
  color: ${S.palette.textPrimary};
  font-size: 1.3rem;
  font-weight: 700;
  line-height: 1.42;
  letter-spacing: -0.02em;
`;

const FeaturedText = styled.p`
  margin: 0;
  color: ${S.palette.textBody};
  font-size: 0.92rem;
  line-height: 1.64;
`;

const FeaturedLink = styled.a`
  margin-top: auto;
  width: fit-content;
  color: ${S.palette.blue};
  font-size: 0.88rem;
  font-weight: 700;
`;

const SideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SideCard = styled.a`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 104px;
  padding: 18px 18px 16px;
  border-radius: 6px;
  border: 1px solid ${S.palette.line};
  background:
    linear-gradient(180deg, rgba(248, 251, 255, 0.98) 0%, rgba(239, 246, 255, 0.98) 72%, rgba(235, 247, 245, 0.92) 100%);
  text-decoration: none;
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    border-color: rgba(23, 159, 150, 0.26);
    box-shadow: 0 14px 24px rgba(16, 53, 114, 0.12);
  }
`;

const SideCategory = styled.span`
  color: ${S.palette.blue};
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.08em;
`;

const SideTitle = styled.h4`
  margin: 0;
  color: ${S.palette.textPrimary};
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.5;
`;

const SideText = styled.p`
  margin: 0;
  color: ${S.palette.textBody};
  font-size: 0.88rem;
  line-height: 1.56;
`;

const SideMeta = styled.span`
  margin-top: auto;
  color: ${S.palette.textMuted};
  font-size: 0.82rem;
  font-weight: 700;
`;

export function IssueReportSection() {
  const { t } = useI18n();
  const { reports } = useIssueReports();

  const liveReportsBySource = new Map<string, (typeof reports)[number]>();

  reports.forEach((report) => {
    if (report.status === 'placeholder') return;
    if (liveReportsBySource.has(report.source)) return;
    liveReportsBySource.set(report.source, report);
  });

  const sourceReports = issueReports.map((fallback) => liveReportsBySource.get(fallback.source) ?? fallback);
  const featured = sourceReports[0];
  const sideReports = sourceReports.slice(1, 4);

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
              <Title>{t('이슈 리포트', 'Issue Report')}</Title>
            </div>
          </Head>

          <Grid>
            <Featured href={featured.url} target="_blank" rel="noreferrer">
              <FeaturedImage image={featured.image ?? '/hero/busan-port.jpg'} />
              <FeaturedBody>
                <Meta>
                  <span>{t(featured.source, featured.sourceEn)}</span>
                  <Dot />
                  <span>{featured.publishedAt}</span>
                </Meta>
                <FeaturedTitle>{t(featured.title, featured.titleEn)}</FeaturedTitle>
                <FeaturedText>{t(featured.summary, featured.summaryEn)}</FeaturedText>
                <FeaturedLink href={featured.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
                  {t('원문 보기', 'View Source')}
                </FeaturedLink>
              </FeaturedBody>
            </Featured>

            <SideList>
              {sideReports.map((item) => (
                <SideCard key={item.id} href={item.url} target="_blank" rel="noreferrer">
                  <SideCategory>{t(item.source, item.sourceEn)}</SideCategory>
                  <SideTitle>{t(item.title, item.titleEn)}</SideTitle>
                  <SideText>{t(item.summary, item.summaryEn)}</SideText>
                  <SideMeta>{item.publishedAt}</SideMeta>
                </SideCard>
              ))}
            </SideList>
          </Grid>
        </Inner>
      </Section>
    </>
  );
}
