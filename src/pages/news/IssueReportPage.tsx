import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';

import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import * as P from '../../components/site/PagePrimitives';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useIssueReports } from '../../hooks/useIssueReports';
import { useI18n } from '../../i18n/useI18n';

const PAGE_SIZE = 20;

const FlushPageSection = styled(P.CompactPageSection)`
  padding-top: 0;
`;

const StatusNote = styled.p<{ $tone?: 'default' | 'success' | 'error' }>`
  margin: 0 0 14px;
  color: ${({ $tone = 'default' }) =>
    $tone === 'success' ? '#245d3c' : $tone === 'error' ? '#8a3d3d' : '#5c7898'};
  font-size: 0.88rem;
  line-height: 1.6;
`;

const MetaActionRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;
  margin: 0 0 14px;

  @media (max-width: 720px) {
    justify-content: flex-start;
  }
`;

const MetaText = styled.p`
  margin: 0;
  color: #5c7898;
  font-size: 0.88rem;
  line-height: 1.6;
`;

const RefreshButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  padding: 0;
  border-radius: 999px;
  border: 1px solid rgba(17, 74, 151, 0.16);
  background: rgba(255, 255, 255, 0.96);
  color: #1c57a7;
  font-size: 0.92rem;
  font-weight: 800;
  line-height: 1;
  box-shadow: 0 8px 18px rgba(24, 74, 149, 0.12);
  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease,
    opacity 0.18s ease,
    color 0.18s ease,
    background-color 0.18s ease;

  &:hover:enabled {
    transform: translateY(-1px);
    color: #123f80;
    background: #ffffff;
    box-shadow: 0 12px 22px rgba(24, 74, 149, 0.18);
  }

  &:disabled {
    opacity: 0.58;
    cursor: default;
    box-shadow: none;
  }
`;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

export function IssueReportPage() {
  const { language, t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { reports, loading, failedSources, refreshing, refreshStatus, refreshedAt, refreshReports } = useIssueReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);

  const sourceOptions = useMemo(() => {
    const options = Array.from(new Map(reports.map((item) => [item.source, item.sourceEn])).entries());

    return [
      { value: 'all', label: t('전체', 'All') },
      ...options.map(([source, sourceEn]) => ({
        value: source,
        label: t(source, sourceEn),
      })),
    ];
  }, [reports, t]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedSource]);

  const filteredReports = useMemo(() => {
    const normalizedQuery = normalizeSearch(searchQuery);

    return reports.filter((item) => {
      if (selectedSource !== 'all' && item.source !== selectedSource) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const target = normalizeSearch(
        [language === 'en' ? item.titleEn : item.title, language === 'en' ? item.sourceEn : item.source, item.publishedAt].join(' '),
      );
      return target.includes(normalizedQuery);
    });
  }, [language, reports, searchQuery, selectedSource]);

  const totalPages = Math.max(1, Math.ceil(filteredReports.length / PAGE_SIZE));
  const activePage = Math.min(currentPage, totalPages);
  const pagedReports = useMemo(
    () => filteredReports.slice((activePage - 1) * PAGE_SIZE, activePage * PAGE_SIZE),
    [activePage, filteredReports],
  );

  const rows: NewsListTableRow[] = pagedReports.map((item) => {
    const isExternal = item.url.startsWith('http');

    return {
      id: item.id,
      publishedAt: item.publishedAt,
      sourceLabel: t(item.source, item.sourceEn),
      title: t(item.title, item.titleEn),
      href: item.status === 'placeholder' ? undefined : item.url,
      external: item.status === 'placeholder' ? false : isExternal,
      disabled: item.status === 'placeholder',
      actions: [
        {
          label: item.status === 'placeholder' ? t('준비중', 'Pending') : t('열기', 'Open'),
          href: item.status === 'placeholder' ? undefined : item.url,
          external: item.status === 'placeholder' ? false : isExternal,
          disabled: item.status === 'placeholder',
        },
      ],
    };
  });

  const failedSourcesLabel = failedSources
    .map((source) => {
      const report = reports.find((item) => item.source === source);
      return language === 'en' ? report?.sourceEn ?? source : source;
    })
    .join(', ');
  const refreshedAtLabel = refreshedAt
    ? new Date(refreshedAt).toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;
  const metaStatusLabel = refreshedAtLabel
    ? t(`마지막 수집 시각: ${refreshedAtLabel}`, `Last updated: ${refreshedAtLabel}`)
    : t('최근 수집 기록이 없습니다.', 'No recent refresh has been recorded.');
  const emptyMessage = loading
    ? undefined
    : filteredReports.length === 0 && reports.length > 0
      ? t('검색 조건에 맞는 이슈리포트가 없습니다.', 'No issue reports match the current filters.')
      : t('표시할 이슈리포트가 없습니다.', 'No issue reports are available right now.');

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
          {loading ? <StatusNote>{t('기관 목록을 불러오는 중입니다.', 'Loading source feeds.')}</StatusNote> : null}
          {refreshing ? (
            <StatusNote>{t('새로 수집 중입니다. 현재 목록은 유지됩니다.', 'Refreshing feeds while keeping the current list visible.')}</StatusNote>
          ) : null}
          {!refreshing && refreshStatus === 'success' && refreshedAtLabel ? (
            <StatusNote $tone="success">
              {t(
                `최신 목록으로 갱신했습니다. 마지막 수집 시각: ${refreshedAtLabel}`,
                `Feeds refreshed successfully. Last updated: ${refreshedAtLabel}`,
              )}
            </StatusNote>
          ) : null}
          {!refreshing && refreshStatus === 'error' ? (
            <StatusNote $tone="error">
              {t(
                '새로 수집하지 못해 이전 목록을 유지하고 있습니다.',
                'Refresh failed, so the previous list is still being shown.',
              )}
            </StatusNote>
          ) : null}
          {!loading && failedSources.length > 0 && reports.length > 0 ? (
            <StatusNote>
              {t(
                `${failedSourcesLabel} 수집에 실패해, 불러온 출처만 표시하고 있습니다.`,
                `Some sources failed to load (${failedSourcesLabel}), so only available feeds are being shown.`,
              )}
            </StatusNote>
          ) : null}
          {!loading && failedSources.length > 0 && reports.length === 0 ? (
            <StatusNote>
              {t(
                `${failedSourcesLabel} 수집에 실패했습니다. 현재 표시할 이슈리포트가 없습니다.`,
                `Failed to load ${failedSourcesLabel}. There are no issue reports to display right now.`,
              )}
            </StatusNote>
          ) : null}
          <NewsListToolbar
            searchLabel={t('검색', 'Search')}
            searchValue={searchQuery}
            searchPlaceholder={t('제목, 출처, 날짜로 검색', 'Search by title, source, or date')}
            onSearchChange={setSearchQuery}
            chipLabel={t('출처 필터', 'Source Filter')}
            chipOptions={sourceOptions}
            selectedChip={selectedSource}
            onChipChange={setSelectedSource}
            resultLabel={t(`총 ${filteredReports.length}건`, `${filteredReports.length} results`)}
          />
          <NewsListTable
            rows={rows}
            dateLabel={t('일자', 'Date')}
            sourceLabel={t('출처', 'Source')}
            titleLabel={t('제목', 'Title')}
            actionLabel={t('바로가기', 'Open')}
            emptyMessage={emptyMessage}
          />
          <MetaActionRow>
            <MetaText>{metaStatusLabel}</MetaText>
            <RefreshButton
              type="button"
              onClick={() => {
                void refreshReports();
              }}
              disabled={refreshing}
              aria-label={refreshing ? t('새로 수집 중', 'Refreshing') : t('새로고침', 'Refresh')}
              title={refreshing ? t('새로 수집 중', 'Refreshing') : t('새로고침', 'Refresh')}
            >
              {refreshing ? '↻' : '🔄'}
            </RefreshButton>
          </MetaActionRow>
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
