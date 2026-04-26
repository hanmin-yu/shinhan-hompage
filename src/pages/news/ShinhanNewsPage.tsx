import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { shinhanNewsItems } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const Group = styled.section`
  margin-top: 26px;
`;

const GroupHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba(20, 74, 149, 0.2);
`;

const GroupTitle = styled.h3`
  margin: 0;
  color: #17437f;
  font-size: 1.08rem;
  letter-spacing: -0.01em;
`;

const GroupCount = styled.span`
  color: #5a7496;
  font-size: 0.82rem;
  font-weight: 700;
`;

const NewsList = styled.div`
  display: grid;
`;

const NewsItem = styled.article`
  display: grid;
  grid-template-columns: 120px minmax(0, 1fr);
  align-items: start;
  gap: 14px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(20, 74, 149, 0.1);

  @media (max-width: 780px) {
    grid-template-columns: 1fr;
    gap: 8px;
  }
`;

const DateText = styled.time`
  color: #607a9b;
  font-size: 0.82rem;
  font-weight: 700;
`;

const NewsContent = styled.div`
  display: grid;
  gap: 5px;
`;

const NewsTitle = styled.h4`
  margin: 0;
  color: #153d70;
  font-size: 1rem;
  line-height: 1.45;
`;

const NewsSummary = styled.p`
  margin: 0;
  color: #4e698a;
  font-size: 0.9rem;
  line-height: 1.6;
`;

export function ShinhanNewsPage() {
  const { t, tx } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const flashItems = shinhanNewsItems.filter((item) => item.category === 'flash');
  const seminarItems = shinhanNewsItems.filter((item) => item.category === 'seminar');

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
            <P.Kicker>Shinhan NEWS</P.Kicker>
            <P.Title>{t('신한 NEWS', 'Shinhan NEWS')}</P.Title>
            <P.Lead>
              {t(
                '기존 FLASH와 세미나 콘텐츠를 통합해 내부 활동과 실무 인사이트를 한 화면에서 확인할 수 있도록 구성했습니다.',
                'Legacy FLASH and seminar content are integrated into one feed for internal activities and practical insights.',
              )}
            </P.Lead>
          </P.IntroPanel>
          <P.IntroVisualPanel image="/subpages/about-coms2.jpg" minHeight={320} aria-hidden="true" />
        </P.IntroBlock>
      </P.HeroSection>

      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <Group>
            <GroupHead>
              <GroupTitle>{t('FLASH', 'FLASH')}</GroupTitle>
              <GroupCount>{t(`${flashItems.length}건`, `${flashItems.length} items`)}</GroupCount>
            </GroupHead>
            <NewsList>
              {flashItems.map((item) => (
                <NewsItem key={item.id}>
                  <DateText>{item.publishedAt}</DateText>
                  <NewsContent>
                    <NewsTitle>{tx(item.title)}</NewsTitle>
                    <NewsSummary>{tx(item.summary)}</NewsSummary>
                  </NewsContent>
                </NewsItem>
              ))}
            </NewsList>
          </Group>

          <Group>
            <GroupHead>
              <GroupTitle>{t('세미나', 'Seminar')}</GroupTitle>
              <GroupCount>{t(`${seminarItems.length}건`, `${seminarItems.length} items`)}</GroupCount>
            </GroupHead>
            <NewsList>
              {seminarItems.map((item) => (
                <NewsItem key={item.id}>
                  <DateText>{item.publishedAt}</DateText>
                  <NewsContent>
                    <NewsTitle>{tx(item.title)}</NewsTitle>
                    <NewsSummary>{tx(item.summary)}</NewsSummary>
                  </NewsContent>
                </NewsItem>
              ))}
            </NewsList>
          </Group>
        </P.PageContainer>
      </P.PageSection>
    </>
  );
}
