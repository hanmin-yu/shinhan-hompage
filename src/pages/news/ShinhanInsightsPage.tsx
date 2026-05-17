import { useEffect, useMemo, useState } from 'react';

import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useI18n } from '../../i18n/useI18n';
import { NewsCompactHeroSection, NewsFlushPageSection, NewsPageContainer } from './newsLayout';

const PAGE_SIZE = 20;
type ActiveCategory = 'all' | 'customs' | 'trade';

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

export function ShinhanInsightsPage() {
  const { language, t } = useI18n();
  const { content } = useSiteContent();
  const newsSubnav = content.global.sectionSubnav.news;
  const insightsCopy = content.news.copy.insights;
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ActiveCategory>('all');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, searchQuery]);

  const categoryOptions = useMemo(
    () => [
      { value: 'all', label: t('전체', 'All') },
      { value: 'customs', label: t('관세', 'Customs') },
      { value: 'trade', label: t('국제 통상', 'International Trade') },
    ],
    [t],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    return content.news.shinhanInsights.filter((item) => {
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const target = normalizeSearch(
        [
          language === 'en' ? item.titleEn : item.title,
          language === 'en' ? item.summaryEn : item.summary,
          language === 'en' ? item.categoryLabelEn : item.categoryLabel,
          language === 'en' ? item.authorEn : item.author,
          item.publishedAt,
        ].join(' '),
      );

      return target.includes(normalizedQuery);
    });
  }, [activeCategory, content.news.shinhanInsights, language, searchQuery]);

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
        publishedAt: item.publishedAt,
        sourceLabel: t(item.categoryLabel, item.categoryLabelEn),
        title: t(item.title, item.titleEn),
        to: `/news/shinhan-insights/${item.id}`,
        actions: [
          {
            label: t('상세 보기', 'View Detail'),
            to: `/news/shinhan-insights/${item.id}`,
            variant: 'primary',
          },
        ],
      })),
    [pagedItems, t],
  );

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
            searchPlaceholder={t(insightsCopy.searchPlaceholder, insightsCopy.searchPlaceholderEn)}
            onSearchChange={setSearchQuery}
            chipLabel={t('분야 필터', 'Field filter')}
            chipOptions={categoryOptions}
            selectedChip={activeCategory}
            onChipChange={(value) => setActiveCategory(value as ActiveCategory)}
            resultLabel={t(`총 ${filteredItems.length}건`, `${filteredItems.length} results`)}
          />
          <NewsListTable
            rows={rows}
            dateLabel={t('일자', 'Date')}
            sourceLabel={t('분야', 'Field')}
            titleLabel={t('제목', 'Title')}
            actionLabel={t('바로가기', 'Open')}
            emptyMessage={t(insightsCopy.emptyMessage, insightsCopy.emptyMessageEn)}
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
