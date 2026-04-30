import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useNewsletterRecords, useShinhanNewsRecords } from '../../../hooks/useNewsContent';
import { getNewsletterRecords, getShinhanNewsRecords } from '../../../repositories/newsRepository';
import { useI18n } from '../../../i18n/useI18n';
import type { NewsletterRecord, ShinhanNewsRecord } from '../../../types/site';
import { getShinhanNewsSourceLabel, isShinhanNewsNotice, sortShinhanNewsRecords } from '../../../utils/shinhanNews';
import * as S from '../homeStyles';

const Section = styled.section`
  position: relative;
  padding: 102px 0 106px;
  overflow: hidden;
  background:
    linear-gradient(138deg, rgba(255, 255, 255, 0.92) 0%, rgba(239, 247, 253, 0.86) 48%, rgba(236, 248, 246, 0.72) 100%),
    linear-gradient(180deg, #ffffff 0%, #f4f8fc 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: 'N E W S';
    position: absolute;
    left: 24px;
    top: 28px;
    color: rgba(15, 35, 62, 0.055);
    font-size: clamp(3.8rem, 8vw, 8.9rem);
    font-weight: 800;
    line-height: 1;
    letter-spacing: 0.12em;
    white-space: nowrap;
  }

  &::after {
    content: '';
    position: absolute;
    left: -130px;
    bottom: -160px;
    width: min(44vw, 600px);
    aspect-ratio: 1;
    pointer-events: none;
    background: url('/brand-mark.svg') center / contain no-repeat;
    opacity: 0.035;
    transform: rotate(-14deg);
  }

  @media (max-width: 860px) {
    padding: 82px 0;

    &::after {
      width: 86vw;
      left: -48vw;
      bottom: -90px;
    }
  }
`;

const Inner = styled(S.Container)`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 40px;
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

const Label = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  color: #1c5aa9;
  font-size: 0.78rem;
  font-weight: 800;
  letter-spacing: 0.16em;
  text-transform: uppercase;

  &::before {
    content: '';
    width: 36px;
    height: 1px;
    background: rgba(33, 101, 193, 0.48);
  }
`;

const Title = styled.h2`
  margin: 12px 0 0;
  color: #222a34;
  font-size: clamp(2.4rem, 5vw, 4.8rem);
  font-weight: 800;
  line-height: 0.98;
  letter-spacing: -0.01em;
`;

const ViewAll = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  color: #164f99;
  font-size: 0.92rem;
  font-weight: 800;
  text-decoration: none;

  &::after {
    content: '';
    width: 36px;
    height: 1px;
    background: currentColor;
  }
`;

const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: clamp(30px, 5vw, 74px);
  align-items: stretch;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.section`
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 18px;
  min-width: 0;
`;

const ColumnHead = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  gap: 18px;
  padding-bottom: 18px;
  border-bottom: 2px solid rgba(15, 43, 89, 0.22);
`;

const ColumnTitle = styled.h3`
  margin: 0;
  color: #2b3138;
  font-size: clamp(1.6rem, 2.4vw, 2.4rem);
  font-weight: 800;
  line-height: 1.08;
`;

const ColumnLink = styled(Link)`
  color: #1c5aa9;
  font-size: 0.84rem;
  font-weight: 800;
  white-space: nowrap;
`;

const List = styled.div`
  display: grid;
  grid-template-rows: repeat(4, minmax(154px, 1fr));
  height: 100%;

  @media (max-width: 640px) {
    grid-template-rows: none;
  }
`;

const ItemLink = styled(Link)`
  display: grid;
  grid-template-rows: auto minmax(0, auto) minmax(0, 1fr);
  gap: 10px;
  min-height: 154px;
  padding: 22px 0 21px;
  border-bottom: 1px solid rgba(15, 43, 89, 0.14);
  text-decoration: none;
  min-width: 0;
  transition:
    padding-left 0.24s ease,
    border-color 0.24s ease;

  &:hover {
    padding-left: 16px;
    border-color: rgba(28, 90, 169, 0.42);
  }
`;

const ItemTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  min-height: 22px;
`;

const ItemCategory = styled.span`
  color: #1c5aa9;
  font-size: 0.76rem;
  font-weight: 900;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ItemDate = styled.span`
  color: #677684;
  font-size: 0.84rem;
  font-weight: 800;
  white-space: nowrap;
`;

const ItemTitle = styled.strong`
  color: #2d3339;
  font-size: clamp(1.08rem, 1.5vw, 1.34rem);
  font-weight: 800;
  line-height: 1.42;
  display: -webkit-box;
  min-height: calc(1em * 1.42 * 2);
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const ItemText = styled.p`
  margin: 0;
  color: #5c6d7c;
  font-size: 0.92rem;
  line-height: 1.64;
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

type NewsListItem = {
  id: string;
  category: string;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  publishedAt: string;
  href: string;
};

function buildNewsItems(items: ShinhanNewsRecord[]): NewsListItem[] {
  return sortShinhanNewsRecords(items)
    .filter((item) => item.category !== 'seminar' || isShinhanNewsNotice(item))
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      category: getShinhanNewsSourceLabel(item, 'SEMINAR'),
      titleKo: item.title,
      titleEn: item.titleEn,
      summaryKo: item.summary,
      summaryEn: item.summaryEn,
      publishedAt: item.publishedAt,
      href: `/news/shinhan-news/${item.id}`,
    }));
}

function buildNewsletterItems(items: NewsletterRecord[]): NewsListItem[] {
  return [...items]
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, 4)
    .map((item) => ({
      id: item.id,
      category: item.language ?? 'Newsletter',
      titleKo: item.title,
      titleEn: item.titleEn,
      summaryKo: item.summary,
      summaryEn: item.summaryEn,
      publishedAt: item.publishedAt,
      href: `/news/newsletter/${item.id}`,
    }));
}

export function ShinhanUpdatesSection() {
  const { t } = useI18n();
  const { items: dynamicShinhanNewsItems } = useShinhanNewsRecords();
  const { items: dynamicNewsletterItems } = useNewsletterRecords();

  const shinhanNewsItems = dynamicShinhanNewsItems.length > 0 ? dynamicShinhanNewsItems : getShinhanNewsRecords();
  const newsletterItems = dynamicNewsletterItems.length > 0 ? dynamicNewsletterItems : getNewsletterRecords();
  const newsList = buildNewsItems(shinhanNewsItems);
  const newsletterList = buildNewsletterItems(newsletterItems);

  if (newsList.length === 0 && newsletterList.length === 0) return null;

  return (
    <Section>
      <Inner data-reveal>
        <Head>
          <div>
            <Label>News & Newsletter</Label>
            <Title>{t('신한 NEWS / 소식지', 'Shinhan NEWS / Newsletter')}</Title>
          </div>
          <ViewAll to="/news">{t('소식 전체보기', 'View all news')}</ViewAll>
        </Head>

        <Columns>
          <Column aria-labelledby="home-shinhan-news-title">
            <ColumnHead>
              <ColumnTitle id="home-shinhan-news-title">{t('신한 NEWS', 'Shinhan NEWS')}</ColumnTitle>
              <ColumnLink to="/news/shinhan-news">{t('전체보기', 'View all')}</ColumnLink>
            </ColumnHead>
            <List>
              {newsList.map((item) => (
                <ItemLink key={item.id} to={item.href}>
                  <ItemTop>
                    <ItemCategory>{item.category}</ItemCategory>
                    <ItemDate>{item.publishedAt}</ItemDate>
                  </ItemTop>
                  <ItemTitle>{t(item.titleKo, item.titleEn)}</ItemTitle>
                  <ItemText>{t(item.summaryKo, item.summaryEn)}</ItemText>
                </ItemLink>
              ))}
            </List>
          </Column>

          <Column aria-labelledby="home-newsletter-title">
            <ColumnHead>
              <ColumnTitle id="home-newsletter-title">{t('소식지', 'Newsletter')}</ColumnTitle>
              <ColumnLink to="/news/newsletter">{t('전체보기', 'View all')}</ColumnLink>
            </ColumnHead>
            <List>
              {newsletterList.map((item) => (
                <ItemLink key={item.id} to={item.href}>
                  <ItemTop>
                    <ItemCategory>{item.category}</ItemCategory>
                    <ItemDate>{item.publishedAt}</ItemDate>
                  </ItemTop>
                  <ItemTitle>{t(item.titleKo, item.titleEn)}</ItemTitle>
                  <ItemText>{t(item.summaryKo, item.summaryEn)}</ItemText>
                </ItemLink>
              ))}
            </List>
          </Column>
        </Columns>
      </Inner>
    </Section>
  );
}
