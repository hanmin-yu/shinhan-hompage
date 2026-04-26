import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { newsletterItems, shinhanNewsItems } from '../../data/home';
import { useIssueReports } from '../../hooks/useIssueReports';
import { useI18n } from '../../i18n/useI18n';

const IntroList = styled.ul`
  margin: 0;
  padding-left: 18px;
  display: grid;
  gap: 6px;
  color: #4c688b;
  font-size: 0.95rem;
  line-height: 1.62;
`;

const EditorialSection = styled.section`
  border-top: 1px solid rgba(22, 74, 149, 0.16);
  padding-top: 22px;
  margin-top: 24px;
`;

const EditorialList = styled.div`
  display: grid;
  gap: 10px;
`;

const EditorialItem = styled.article`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr) auto;
  align-items: center;
  gap: 16px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(20, 74, 149, 0.12);

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const ItemDate = styled.time`
  color: #5f7897;
  font-size: 0.83rem;
  font-weight: 700;
  letter-spacing: 0.04em;
`;

const ItemMeta = styled.div`
  display: grid;
  gap: 4px;
`;

const ItemTitle = styled.h3`
  margin: 0;
  color: #143964;
  font-size: 1.02rem;
  font-weight: 700;
  line-height: 1.45;
  letter-spacing: -0.01em;
`;

const ItemSummary = styled.p`
  margin: 0;
  color: #4f6b8d;
  font-size: 0.9rem;
  line-height: 1.6;
`;

const ItemLink = styled(P.CardLink)`
  margin-top: 0;
`;

export function NewsPage() {
  const { t, tx } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { reports } = useIssueReports();

  const issuePreview = reports.filter((item) => item.status !== 'placeholder').slice(0, 3);
  const shinhanNewsPreview = shinhanNewsItems.slice(0, 3);
  const newsletterPreview = newsletterItems.slice(0, 3);

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
            <P.Kicker>Insights & Archive</P.Kicker>
            <P.Title>{t('소식/자료', 'News & Resources')}</P.Title>
            <P.Lead>
              {t(
                '이슈리포트, 신한 NEWS, 소식지를 한 화면에서 확인할 수 있도록 편집형 아카이브로 구성했습니다.',
                'Issue reports, Shinhan NEWS, and newsletters are organized in one editorial view.',
              )}
            </P.Lead>
            <IntroList>
              <li>{t('이슈리포트: 기관 출처 기반 핵심 이슈 정리', 'Issue Reports: Source-based issue briefs')}</li>
              <li>{t('신한 NEWS: FLASH + 세미나 통합 아카이브', 'Shinhan NEWS: Integrated FLASH and seminar archive')}</li>
              <li>{t('소식지: 월별 국문/영문 발행물 열람·다운로드', 'Newsletter: Monthly KR/EN publication archive')}</li>
            </IntroList>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/about-coms2.jpg" minHeight={340} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <EditorialSection>
            <P.Kicker>Issue Reports</P.Kicker>
            <P.SectionTitle>{t('이슈리포트', 'Issue Reports')}</P.SectionTitle>
            <EditorialList>
              {issuePreview.map((item) => (
                <EditorialItem key={item.id}>
                  <ItemDate>{item.publishedAt}</ItemDate>
                  <ItemMeta>
                    <ItemTitle>{tx(item.title)}</ItemTitle>
                    <ItemSummary>{tx(item.summary)}</ItemSummary>
                  </ItemMeta>
                  <ItemLink to="/news/issue-report">{t('목록 보기', 'View')}</ItemLink>
                </EditorialItem>
              ))}
            </EditorialList>
          </EditorialSection>

          <EditorialSection>
            <P.Kicker>Shinhan NEWS</P.Kicker>
            <P.SectionTitle>{t('신한 NEWS', 'Shinhan NEWS')}</P.SectionTitle>
            <EditorialList>
              {shinhanNewsPreview.map((item) => (
                <EditorialItem key={item.id}>
                  <ItemDate>{item.publishedAt}</ItemDate>
                  <ItemMeta>
                    <ItemTitle>{tx(item.title)}</ItemTitle>
                    <ItemSummary>{tx(item.summary)}</ItemSummary>
                  </ItemMeta>
                  <ItemLink to="/news/shinhan-news">{t('목록 보기', 'View')}</ItemLink>
                </EditorialItem>
              ))}
            </EditorialList>
          </EditorialSection>

          <EditorialSection>
            <P.Kicker>Newsletter</P.Kicker>
            <P.SectionTitle>{t('소식지', 'Newsletter')}</P.SectionTitle>
            <EditorialList>
              {newsletterPreview.map((item) => (
                <EditorialItem key={item.id}>
                  <ItemDate>{item.publishedAt}</ItemDate>
                  <ItemMeta>
                    <ItemTitle>{tx(item.title)}</ItemTitle>
                    <ItemSummary>{tx(item.summary)}</ItemSummary>
                  </ItemMeta>
                  <ItemLink to="/news/newsletter">{t('목록 보기', 'View')}</ItemLink>
                </EditorialItem>
              ))}
            </EditorialList>
          </EditorialSection>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
