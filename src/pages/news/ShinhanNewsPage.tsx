import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';

import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { shinhanNewsItems } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const PAGE_SIZE = 20;

const FlushPageSection = styled(P.CompactPageSection)`
  padding-top: 0;
`;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

export function ShinhanNewsPage() {
  const { t, tx } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'flash' | 'seminar'>('all');
  const [currentPage, setCurrentPage] = useState(1);

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: t('전체', 'All') },
      { value: 'flash', label: 'FLASH' },
      { value: 'seminar', label: t('세미나', 'Seminar') },
    ],
    [t],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    return [...shinhanNewsItems]
      .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
      .filter((item) => {
        if (selectedCategory !== 'all' && item.category !== selectedCategory) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const target = normalizeSearch([item.title, item.summary, item.categoryLabel, item.publishedAt].join(' '));
        return target.includes(normalizedQuery);
      });
  }, [searchQuery, selectedCategory]);

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
        sourceLabel: tx(item.categoryLabel),
        title: tx(item.title),
        to: `/news/shinhan-news/${item.id}`,
        actions: [
          {
            label: t('상세 보기', 'View Detail'),
            to: `/news/shinhan-news/${item.id}`,
          },
        ],
      })),
    [pagedItems, t, tx],
  );

  const emptyMessage = t('검색 조건에 맞는 소식이 없습니다.', 'No news items match the current filters.');

  return (
    <>
      <P.CompactHeroSection>
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
          />
        </P.PageContainer>
      </P.CompactHeroSection>

      <FlushPageSection tone="soft">
        <P.PageContainer data-reveal>
          <NewsListToolbar
            searchLabel={t('검색', 'Search')}
            searchValue={searchQuery}
            searchPlaceholder={t('제목, 요약, 구분, 날짜로 검색', 'Search by title, summary, category, or date')}
            onSearchChange={setSearchQuery}
            chipLabel={t('구분 필터', 'Category Filter')}
            chipOptions={categoryOptions}
            selectedChip={selectedCategory}
            onChipChange={(value) => setSelectedCategory(value as typeof selectedCategory)}
            resultLabel={t(`총 ${filteredItems.length}건`, `${filteredItems.length} results`)}
          />
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
      </FlushPageSection>
    </>
  );
}
