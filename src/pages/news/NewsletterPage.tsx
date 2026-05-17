import { useEffect, useMemo, useState } from 'react';

import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { useSiteContent } from '../../hooks/useSiteContent';
import { useNewsletterRecords } from '../../hooks/useNewsContent';
import { useI18n } from '../../i18n/useI18n';
import { getNewsletterDownloadFileName } from '../../utils/newsletter';
import { NewsCompactHeroSection, NewsFlushPageSection, NewsPageContainer } from './newsLayout';

const PAGE_SIZE = 20;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

export function NewsletterPage() {
  const { language, t } = useI18n();
  const { content } = useSiteContent();
  const newsSubnav = content.global.sectionSubnav.news;
  const { items, loading } = useNewsletterRecords();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    const searched = items.filter((item) => {
      if (item.language === '영문') {
        return false;
      }

      if (!normalizedQuery) return true;

      const target = normalizeSearch(
        [
          language === 'en' ? item.titleEn : item.title,
          language === 'en' ? item.summaryEn : item.summary,
          item.issue,
          item.publishedAt,
        ].join(' '),
      );

      return target.includes(normalizedQuery);
    });
    return searched;
  }, [items, language, searchQuery]);

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
        publishedAt: item.issue,
        sourceLabel: t('소식지', 'Newsletter'),
        title: t(item.title, item.titleEn),
        to: `/news/newsletter/${item.id}`,
        actions: [
          { label: t('보기', 'Read'), to: `/news/newsletter/${item.id}` },
          ...(item.downloadUrl
            ? [
                {
                  label: t('다운로드', 'Download'),
                  href: item.downloadUrl,
                  downloadFileName: item.downloadFileName ?? getNewsletterDownloadFileName(item.downloadUrl, t(item.title, item.titleEn)),
                },
              ]
            : []),
        ],
      })),
    [pagedItems, t],
  );

  const emptyMessage = t(
    '검색어와 필터 조건에 맞는 소식지가 없습니다. 다른 조건으로 다시 확인해주세요.',
    'No newsletters match the current filters. Please try another keyword or filter.',
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
            searchPlaceholder={t('제목, 요약, 발행월로 검색', 'Search by title, summary, or issue')}
            onSearchChange={setSearchQuery}
            resultLabel={t(`총 ${filteredItems.length}건`, `${filteredItems.length} results`)}
          />
          {loading ? <P.CardText>{t('소식지를 불러오는 중입니다.', 'Loading newsletters.')}</P.CardText> : null}
          <NewsListTable
            rows={rows}
            dateLabel={t('발행월', 'Issue')}
            sourceLabel={t('구분', 'Type')}
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
