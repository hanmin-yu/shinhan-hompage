import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

import { useNewsletterRecords, useShinhanNewsRecords } from '../../../hooks/useNewsContent';
import { getNewsletterRecords, getShinhanNewsRecords } from '../../../repositories/newsRepository';
import { useI18n } from '../../../i18n/useI18n';
import type { NewsletterRecord, ShinhanNewsRecord } from '../../../types/site';
import { getShinhanNewsSourceLabel, sortShinhanNewsRecords } from '../../../utils/shinhanNews';
import * as S from '../homeStyles';

const Section = styled.section`
  position: relative;
  padding: 108px 0 112px;
  overflow: hidden;
  background:
    radial-gradient(circle at 12% 12%, rgba(33, 101, 193, 0.14), transparent 28%),
    radial-gradient(circle at 86% 20%, rgba(23, 159, 150, 0.12), transparent 24%),
    linear-gradient(135deg, rgba(247, 251, 255, 0.98) 0%, rgba(255, 255, 255, 0.96) 46%, rgba(238, 247, 252, 0.92) 100%);
  border-top: 1px solid rgba(22, 54, 96, 0.08);

  &::before {
    content: 'S H I N H A N';
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
    right: -120px;
    bottom: -170px;
    width: min(42vw, 560px);
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
      right: -46vw;
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
  font-size: clamp(2.8rem, 5.8vw, 5.8rem);
  font-weight: 900;
  line-height: 0.9;
  letter-spacing: -0.055em;
`;

const HeadText = styled.p`
  max-width: 640px;
  margin: 18px 0 0;
  color: #5c6d7c;
  font-size: 1rem;
  line-height: 1.7;
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
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: clamp(18px, 2.6vw, 34px);
  align-items: stretch;

  @media (max-width: 1100px) {
    grid-template-columns: 1fr;
  }
`;

const Column = styled.section<{ $accent: string }>`
  position: relative;
  display: grid;
  grid-template-rows: auto 1fr;
  gap: 20px;
  min-width: 0;
  min-height: 520px;
  padding: 28px;
  border: 1px solid rgba(15, 43, 89, 0.12);
  border-radius: 4px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(244, 249, 253, 0.78)),
    #ffffff;
  box-shadow: 0 24px 54px rgba(15, 43, 89, 0.08);
  overflow: hidden;
  transition:
    transform 0.24s ease,
    box-shadow 0.24s ease,
    border-color 0.24s ease;

  &::before {
    content: '';
    position: absolute;
    left: 28px;
    top: 0;
    width: 42px;
    height: 6px;
    background: ${({ $accent }) => $accent};
  }

  &::after {
    content: '';
    position: absolute;
    right: -54px;
    top: -54px;
    width: 170px;
    height: 170px;
    border-radius: 50%;
    background: ${({ $accent }) => $accent};
    opacity: 0.08;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(33, 101, 193, 0.22);
    box-shadow: 0 30px 66px rgba(15, 43, 89, 0.12);
  }

  @media (max-width: 1100px) {
    min-height: 0;
  }
`;

const ColumnHead = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: 18px;
  padding-bottom: 20px;
  border-bottom: 1px solid rgba(15, 43, 89, 0.14);
`;

const ColumnTitle = styled.h3`
  margin: 0;
  color: #2b3138;
  font-size: clamp(1.6rem, 2.4vw, 2.4rem);
  font-weight: 800;
  line-height: 1.08;
`;

const ColumnLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  width: fit-content;
  gap: 8px;
  color: #1c5aa9;
  font-size: 0.84rem;
  font-weight: 800;
  white-space: nowrap;
  text-decoration: none;

  &::after {
    content: '';
    width: 22px;
    height: 1px;
    background: currentColor;
  }
`;

const ColumnIntro = styled.p`
  margin: 0;
  color: #667789;
  font-size: 0.9rem;
  line-height: 1.62;
`;

const List = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-rows: repeat(3, minmax(128px, 1fr));
  height: 100%;

  @media (max-width: 640px) {
    grid-template-rows: none;
  }
`;

const ItemLink = styled(Link)`
  display: grid;
  grid-template-rows: auto minmax(0, auto) minmax(0, 1fr);
  gap: 10px;
  min-height: 128px;
  padding: 18px 0 17px;
  border-bottom: 1px solid rgba(15, 43, 89, 0.14);
  text-decoration: none;
  min-width: 0;
  transition:
    padding-left 0.24s ease,
    border-color 0.24s ease;

  &:hover {
    padding-left: 12px;
    border-color: rgba(28, 90, 169, 0.42);
  }

  &:last-of-type {
    border-bottom: 0;
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

function buildShinhanNewsItems(items: ShinhanNewsRecord[], category: 'flash' | 'seminar'): NewsListItem[] {
  return sortShinhanNewsRecords(items)
    .filter((item) => item.category === category)
    .slice(0, 3)
    .map((item) => ({
      id: item.id,
      category: category === 'seminar' ? 'SEMINAR' : getShinhanNewsSourceLabel(item, 'SEMINAR'),
      titleKo: item.title,
      titleEn: item.titleEn,
      summaryKo: item.summary,
      summaryEn: item.summaryEn,
      publishedAt: item.publishedAt,
      href: category === 'seminar' ? `/news/seminar/${item.id}` : `/news/shinhan-news/${item.id}`,
    }));
}

function buildNewsletterItems(items: NewsletterRecord[]): NewsListItem[] {
  return [...items]
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, 3)
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
  const seminarList = buildShinhanNewsItems(shinhanNewsItems, 'seminar');
  const flashList = buildShinhanNewsItems(shinhanNewsItems, 'flash');
  const newsletterList = buildNewsletterItems(newsletterItems);
  const groups = [
    {
      id: 'seminar',
      title: t('세미나', 'Seminar'),
      intro: t('교육과 실무 세미나 소식을 빠르게 확인합니다.', 'Review training and practical seminar updates.'),
      href: '/news/seminar',
      accent: '#1c5aa9',
      items: seminarList,
    },
    {
      id: 'flash',
      title: 'FLASH',
      intro: t('신한 NEWS와 주요 공지, 실무 업데이트를 정리합니다.', 'Browse Shinhan NEWS, notices, and practical updates.'),
      href: '/news/shinhan-news',
      accent: '#179f96',
      items: flashList,
    },
    {
      id: 'newsletter',
      title: t('소식지', 'Newsletter'),
      intro: t('월별 정책 변화와 실무 체크포인트를 모았습니다.', 'Monthly policy changes and practice checkpoints.'),
      href: '/news/newsletter',
      accent: '#123f85',
      items: newsletterList,
    },
  ];

  if (groups.every((group) => group.items.length === 0)) return null;

  return (
    <Section>
      <Inner data-reveal>
        <Head>
          <div>
            <Label>Shinhan Updates</Label>
            <Title>{t('신한 소식', 'Shinhan Updates')}</Title>
            <HeadText>
              {t(
                '세미나, FLASH, 소식지를 한 화면에서 확인할 수 있도록 핵심 소식을 정리했습니다.',
                'Seminars, FLASH updates, and newsletters are organized in one editorial view.',
              )}
            </HeadText>
          </div>
          <ViewAll to="/news">{t('소식 전체보기', 'View all news')}</ViewAll>
        </Head>

        <Columns>
          {groups.map((group) => (
            <Column key={group.id} $accent={group.accent} aria-labelledby={`home-${group.id}-title`}>
              <ColumnHead>
                <ColumnTitle id={`home-${group.id}-title`}>{group.title}</ColumnTitle>
                <ColumnIntro>{group.intro}</ColumnIntro>
                <ColumnLink to={group.href}>{t('전체보기', 'View all')}</ColumnLink>
              </ColumnHead>
              <List>
                {group.items.map((item) => (
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
          ))}
        </Columns>
      </Inner>
    </Section>
  );
}
