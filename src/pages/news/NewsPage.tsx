import styled from '@emotion/styled';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useNewsletterRecords, useShinhanNewsRecords } from '../../hooks/useNewsContent';
import { useI18n } from '../../i18n/useI18n';
import { NewsContentSection, NewsHeroSection, NewsPageContainer } from './newsLayout';

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
  const { t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { items: shinhanNewsItems } = useShinhanNewsRecords();
  const { items: newsletters } = useNewsletterRecords();

  const shinhanNewsPreview = shinhanNewsItems.filter((item) => item.category !== 'seminar').slice(0, 3);
  const seminarPreview = shinhanNewsItems.filter((item) => item.category === 'seminar').slice(0, 3);
  const newsletterPreview = newsletters.slice(0, 3);

  return (
    <>
      <NewsHeroSection>
        <NewsPageContainer>
          <LandingSubnav
            kicker={newsSubnav.kicker}
            kickerEn={newsSubnav.kickerEn}
            title={newsSubnav.title}
            titleEn={newsSubnav.titleEn}
            summary={newsSubnav.summary}
            summaryEn={newsSubnav.summaryEn}
            items={newsSubnav.items}
            matchAboutHero
          />
        </NewsPageContainer>
      </NewsHeroSection>

      <NewsContentSection>
        <NewsPageContainer data-reveal>
          <P.Kicker>Insights & Archive</P.Kicker>
          <P.Title>{t('소식/자료', 'News & Resources')}</P.Title>
          <P.Lead>
            {t(
              '신한 NEWS, 세미나/교육, 소식지의 최신 소식을 한 화면에서 빠르게 확인할 수 있도록 구성했습니다.',
              'Shinhan NEWS, seminars/training, and newsletters are organized in one quick editorial view.',
            )}
          </P.Lead>
          <IntroList>
            <li>{t('신한 NEWS: 최신 공지와 FLASH 3건', 'Shinhan NEWS: 3 latest notices and FLASH updates')}</li>
            <li>{t('세미나/교육: 최신 교육·세미나 3건', 'Seminar / Training: 3 latest seminar or training updates')}</li>
            <li>{t('소식지: 최신 발행물 3건', 'Newsletter: 3 latest publications')}</li>
          </IntroList>
          <P.SectionDivider />
          <EditorialSection>
            <P.Kicker>Shinhan NEWS</P.Kicker>
            <P.SectionTitle>{t('신한 NEWS', 'Shinhan NEWS')}</P.SectionTitle>
            <EditorialList>
              {shinhanNewsPreview.map((item) => (
                <EditorialItem key={item.id}>
                  <ItemDate>{item.publishedAt}</ItemDate>
                  <ItemMeta>
                    <ItemTitle>{t(item.title, item.titleEn)}</ItemTitle>
                    <ItemSummary>{t(item.summary, item.summaryEn)}</ItemSummary>
                  </ItemMeta>
                  <ItemLink to="/news/shinhan-news">{t('목록 보기', 'View')}</ItemLink>
                </EditorialItem>
              ))}
            </EditorialList>
          </EditorialSection>

          <EditorialSection>
            <P.Kicker>Seminar / Training</P.Kicker>
            <P.SectionTitle>{t('세미나/교육', 'Seminar / Training')}</P.SectionTitle>
            <EditorialList>
              {seminarPreview.map((item) => (
                <EditorialItem key={item.id}>
                  <ItemDate>{item.publishedAt}</ItemDate>
                  <ItemMeta>
                    <ItemTitle>{t(item.title, item.titleEn)}</ItemTitle>
                    <ItemSummary>{t(item.summary, item.summaryEn)}</ItemSummary>
                  </ItemMeta>
                  <ItemLink to="/news/seminar">{t('목록 보기', 'View')}</ItemLink>
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
                    <ItemTitle>{t(item.title, item.titleEn)}</ItemTitle>
                    <ItemSummary>{t(item.summary, item.summaryEn)}</ItemSummary>
                  </ItemMeta>
                  <ItemLink to="/news/newsletter">{t('목록 보기', 'View')}</ItemLink>
                </EditorialItem>
              ))}
            </EditorialList>
          </EditorialSection>
        </NewsPageContainer>
      </NewsContentSection>
    </>
  );
}
