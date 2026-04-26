import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';

import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { newsletterItems } from '../../data/home';
import { useI18n } from '../../i18n/useI18n';

const PAGE_SIZE = 20;

const FlushPageSection = styled(P.CompactPageSection)`
  padding-top: 0;
`;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

export function NewsletterPage() {
  const { language, t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const languageOptions = useMemo(
    () => [
      { value: 'all', label: t('전체', 'All') },
      { value: '국문', label: t('국문', 'Korean') },
      { value: '영문', label: t('영문', 'English') },
    ],
    [t],
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedLanguage]);

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    const searched = newsletterItems.filter((item) => {
      if (selectedLanguage !== 'all' && (item.language ?? '') !== selectedLanguage) {
        return false;
      }

      if (!normalizedQuery) return true;

      const target = normalizeSearch(
        [
          language === 'en' ? item.titleEn : item.title,
          language === 'en' ? item.summaryEn : item.summary,
          item.issue,
          item.publishedAt,
          language === 'en' ? item.languageEn ?? item.language ?? '' : item.language ?? '',
        ].join(' '),
      );

      return target.includes(normalizedQuery);
    });
    return searched;
  }, [language, searchQuery, selectedLanguage]);

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
        sourceLabel: t(item.language ?? '소식지', item.languageEn ?? 'Newsletter'),
        title: t(item.title, item.titleEn),
        to: `/news/newsletter/${item.id}`,
        actions: [
          { label: t('보기', 'Read'), to: `/news/newsletter/${item.id}` },
          ...(item.downloadHref
            ? [{ label: t('다운로드', 'Download'), href: item.downloadHref, external: true }]
            : []),
        ],
      })),
    [pagedItems, t],
  );

  const filtersChanged = searchQuery !== '' || selectedLanguage !== 'all';
  const emptyMessage = t(
    '검색어와 필터 조건에 맞는 소식지가 없습니다. 다른 조건으로 다시 확인해주세요.',
    'No newsletters match the current filters. Please try another keyword or filter.',
  );

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
            searchPlaceholder={t('제목, 요약, 발행월로 검색', 'Search by title, summary, or issue')}
            onSearchChange={setSearchQuery}
            chipLabel={t('언어 필터', 'Language Filter')}
            chipOptions={languageOptions}
            selectedChip={selectedLanguage}
            onChipChange={setSelectedLanguage}
            resultLabel={t(`총 ${filteredItems.length}건`, `${filteredItems.length} results`)}
            resetLabel={t('초기화', 'Reset')}
            onReset={() => {
              setSearchQuery('');
              setSelectedLanguage('all');
              setCurrentPage(1);
            }}
            resetDisabled={!filtersChanged}
          />
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
        </P.PageContainer>
      </FlushPageSection>
    </>
  );
}
