import { useEffect, useMemo, useState } from 'react';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useShinhanNewsRecords } from '../../hooks/useNewsContent';
import { useI18n } from '../../i18n/useI18n';
import type { ShinhanNewsItem } from '../../types/site';
import { NewsCompactHeroSection, NewsFlushPageSection, NewsPageContainer } from './newsLayout';

const PAGE_SIZE = 20;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

function getSeminarEventDate(title: string) {
  const match = title.match(/\[(\d{4})년\s*(\d{1,2})월\s*(\d{1,2})일/);

  if (!match) {
    return null;
  }

  const [, year, month, day] = match;
  return new Date(Number(year), Number(month) - 1, Number(day), 23, 59, 59, 999);
}

function isSeminarRecruiting(title: string) {
  const eventDate = getSeminarEventDate(title);

  if (!eventDate) {
    return false;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return eventDate >= today;
}

function compareSeminarItems(left: ShinhanNewsItem, right: ShinhanNewsItem) {
  const recruitingDelta = Number(isSeminarRecruiting(left.title)) - Number(isSeminarRecruiting(right.title));

  if (recruitingDelta !== 0) {
    return -recruitingDelta;
  }

  return right.publishedAt.localeCompare(left.publishedAt);
}

export function SeminarPage() {
  const { t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { items, loading } = useShinhanNewsRecords();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const seminarItems = useMemo(
    () => items.filter((item) => item.category === 'seminar').sort(compareSeminarItems),
    [items],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    if (!normalizedQuery) {
      return seminarItems;
    }

    return seminarItems.filter((item) => {
      const target = normalizeSearch([item.title, item.summary, item.categoryLabel, item.publishedAt].join(' '));
      return target.includes(normalizedQuery);
    });
  }, [searchQuery, seminarItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const activePage = Math.min(currentPage, totalPages);
  const pagedItems = useMemo(
    () => filteredItems.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE),
    [activePage, filteredItems],
  );
  const rows = useMemo<NewsListTableRow[]>(
    () =>
      pagedItems.map((item) => {
        const isRecruiting = isSeminarRecruiting(item.title);

        return {
          id: item.id,
          anchorId: item.id,
          publishedAt: item.publishedAt,
          sourceLabel: t('세미나/교육', 'Seminar / Training'),
          title: t(item.title, item.titleEn),
          to: `/news/seminar/${item.id}`,
          actions: isRecruiting
            ? [
                {
                  label: t('모집중', 'Open'),
                  disabled: true,
                  variant: 'primary' as const,
                },
                {
                  label: t('상세 보기', 'View Detail'),
                  to: `/news/seminar/${item.id}`,
                },
              ]
            : [
                {
                  label: t('상세 보기', 'View Detail'),
                  to: `/news/seminar/${item.id}`,
                },
              ],
        };
      }),
    [pagedItems, t],
  );
  const emptyMessage = t('검색 조건에 맞는 세미나/교육이 없습니다.', 'No seminars or training sessions match the current filters.');

  return (
    <>
      <NewsCompactHeroSection>
        <NewsPageContainer>
          <LandingSubnav
            kicker={newsSubnav.kicker}
            kickerEn={newsSubnav.kickerEn}
            title={newsSubnav.title}
            titleEn={newsSubnav.titleEn}
            summary={newsSubnav.summary}
            summaryEn={newsSubnav.summaryEn}
            items={newsSubnav.items}
            compactBottom
            matchAboutHero
          />
        </NewsPageContainer>
      </NewsCompactHeroSection>

      <NewsFlushPageSection>
        <NewsPageContainer data-reveal>
          <NewsListToolbar
            searchLabel={t('검색', 'Search')}
            searchValue={searchQuery}
            searchPlaceholder={t('세미나/교육 제목, 요약, 날짜로 검색', 'Search by seminar/training title, summary, or date')}
            onSearchChange={setSearchQuery}
            resultLabel={t(`총 ${filteredItems.length}건`, `${filteredItems.length} results`)}
          />

          {loading ? <P.CardText>{t('세미나/교육을 불러오는 중입니다.', 'Loading seminars/training.')}</P.CardText> : null}
          <NewsListTable
            rows={rows}
            dateLabel={t('일자', 'Date')}
            sourceLabel={t('구분', 'Category')}
            titleLabel={t('제목', 'Title')}
            actionLabel={t('바로가기', 'Open')}
            emptyMessage={emptyMessage}
          />

          <NewsListPagination
            currentPage={activePage}
            totalPages={totalPages}
            previousLabel={t('이전', 'Prev')}
            nextLabel={t('다음', 'Next')}
            onPageChange={setCurrentPage}
          />
        </NewsPageContainer>
      </NewsFlushPageSection>
    </>
  );
}
