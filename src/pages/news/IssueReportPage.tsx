import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { issueReports } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const ReportList = styled.div`
  margin-top: 20px;
  border-top: 1px solid rgba(22, 74, 149, 0.24);
`;

const ReportItem = styled.article`
  display: grid;
  grid-template-columns: 150px 170px minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid rgba(20, 74, 149, 0.12);

  @media (max-width: 1100px) {
    grid-template-columns: 130px minmax(0, 1fr) auto;
    gap: 12px;
  }

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const Meta = styled.span`
  color: #5f7999;
  font-size: 0.84rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const Source = styled.span`
  color: #1b4f95;
  font-size: 0.82rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Content = styled.div`
  display: grid;
  gap: 4px;
`;

const Title = styled.h3`
  margin: 0;
  color: #153c6e;
  font-size: 1.03rem;
  line-height: 1.45;
`;

const Summary = styled.p`
  margin: 0;
  color: #4d6889;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const ActionLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.2);
  color: #1b56a8;
  font-size: 0.84rem;
  font-weight: 700;
`;

export function IssueReportPage() {
  const { t, tx } = useI18n();
  const newsSubnav = sectionSubnav.news;

  return (
    <>
      <P.HeroSection>
        <P.PageContainer>
        <LandingSubnav
          kicker={newsSubnav.kicker}
          kickerEn={newsSubnav.kickerEn}
          title={newsSubnav.title}
          titleEn={newsSubnav.titleEn}
          summary={newsSubnav.summary}
          summaryEn={newsSubnav.summaryEn}
          items={newsSubnav.items}
        />

        </P.PageContainer>

        <P.IntroBlock data-reveal>
          <P.IntroPanel>
            <P.Kicker>Issue Reports</P.Kicker>
            <P.Title>{t('이슈리포트', 'Issue Reports')}</P.Title>
            <P.Lead>
              {t(
                '한국관세사회, 관세청, 한국무역협회, KOTRA 등 기관 자료를 기준으로 관세·통상 이슈를 정리합니다.',
                'We organize customs and trade issues based on publications from KCSA, Korea Customs Service, KITA, and KOTRA.',
              )}
            </P.Lead>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/about-coms3.jpg" minHeight={320} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <ReportList>
            {issueReports.map((item) => (
              <ReportItem key={item.id}>
                <Meta>{item.publishedAt}</Meta>
                <Source>{tx(item.source)}</Source>
                <Content>
                  <Title>{tx(item.title)}</Title>
                  <Summary>{tx(item.summary)}</Summary>
                </Content>
                <ActionLink href={item.url} target="_blank" rel="noreferrer">
                  {t('원문 보기', 'Source')}
                </ActionLink>
              </ReportItem>
            ))}
          </ReportList>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
