import { useEffect, useMemo, useState } from 'react';

import { LandingSubnav } from '../../components/site/LandingSubnav';
import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useShinhanNewsRecords } from '../../hooks/useNewsContent';
import { useI18n } from '../../i18n/useI18n';
import { sortShinhanNewsRecords } from '../../utils/shinhanNews';
import { NewsCompactHeroSection, NewsFlushPageSection } from './newsLayout';

const PAGE_SIZE = 20;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

export function SeminarPage() {
  const { t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { items, loading } = useShinhanNewsRecords();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const seminarItems = useMemo(() => sortShinhanNewsRecords(items).filter((item) => item.category === 'seminar'), [items]);

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
      pagedItems.map((item) => ({
        id: item.id,
        anchorId: item.id,
        publishedAt: item.publishedAt,
        sourceLabel: t('세미나', 'Seminar'),
        title: t(item.title, item.titleEn),
        to: `/news/seminar/${item.id}`,
        actions: [
          {
            label: t('상세 보기', 'View Detail'),
            to: `/news/seminar/${item.id}`,
          },
        ],
      })),
    [pagedItems, t],
  );
  const emptyMessage = t('검색 조건에 맞는 세미나가 없습니다.', 'No seminars match the current filters.');

  return (
    <>
      <NewsCompactHeroSection>
        <P.PageContainer>
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
        </P.PageContainer>
      </NewsCompactHeroSection>

      <NewsFlushPageSection>
        <P.PageContainer data-reveal>
          <NewsListToolbar
            searchLabel={t('검색', 'Search')}
            searchValue={searchQuery}
            searchPlaceholder={t('세미나 제목, 요약, 날짜로 검색', 'Search by seminar title, summary, or date')}
            onSearchChange={setSearchQuery}
            resultLabel={t(`총 ${filteredItems.length}건`, `${filteredItems.length} results`)}
          />

          {loading ? <P.CardText>{t('세미나를 불러오는 중입니다.', 'Loading seminars.')}</P.CardText> : null}
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
        </P.PageContainer>
      </NewsFlushPageSection>
    </>
  );
}
