import styled from '@emotion/styled';
import { useEffect, useMemo, useState } from 'react';

import { NewsListPagination } from '../../components/site/NewsListPagination';
import { NewsListTable, type NewsListTableRow } from '../../components/site/NewsListTable';
import { NewsListToolbar } from '../../components/site/NewsListToolbar';
import { LandingSubnav } from '../../components/site/LandingSubnav';
import { palette } from '../../components/home/homeStyles';
import { sectionSubnav } from '../../config/sectionSubnav';
import { useIssueReports } from '../../hooks/useIssueReports';
import { useI18n } from '../../i18n/useI18n';
import type { IssueReport, IssueReportDetail } from '../../types/site';
import { NewsCompactHeroSection, NewsFlushPageSection, NewsPageContainer } from './newsLayout';

const PAGE_SIZE = 20;

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

const ModalBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: grid;
  place-items: center;
  padding: clamp(18px, 3vw, 42px);
  background: rgba(7, 17, 31, 0.54);
  backdrop-filter: blur(5px);
`;

const ModalCard = styled.article`
  width: min(100%, 860px);
  max-height: min(82vh, 760px);
  display: grid;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.42);
  background: #ffffff;
  box-shadow: 0 28px 70px rgba(3, 20, 45, 0.32);
`;

const ModalHeader = styled.header`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 16px;
  align-items: start;
  padding: 22px 24px 18px;
  border-top: 5px solid ${palette.blueDeep};
  border-bottom: 1px solid rgba(18, 63, 133, 0.1);
  background: #ffffff;
`;

const ModalTitle = styled.h2`
  margin: 0;
  color: ${palette.blueDeep};
  font-size: clamp(1.18rem, 2vw, 1.56rem);
  font-weight: 900;
  line-height: 1.38;
  letter-spacing: 0;
`;

const ModalMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px 12px;
  margin-top: 8px;
  color: ${palette.textMuted};
  font-size: 0.82rem;
  font-weight: 700;
  line-height: 1.5;
`;

const CloseButton = styled.button`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  border: 1px solid rgba(18, 63, 133, 0.12);
  border-radius: 999px;
  background: #ffffff;
  color: ${palette.blueDeep};
  font-size: 1.24rem;
  line-height: 1;
  cursor: pointer;

  &:hover {
    border-color: rgba(18, 63, 133, 0.36);
    background: #f4f8fd;
  }
`;

const ModalBody = styled.div`
  overflow: auto;
  padding: 24px;
  color: ${palette.textBody};
  font-size: 0.98rem;
  line-height: 1.86;

  p {
    margin: 0 0 18px;
  }
`;

const AttachmentBlock = styled.div`
  display: grid;
  gap: 8px;
  margin-top: 24px;
  padding-top: 18px;
  border-top: 1px solid rgba(18, 63, 133, 0.1);
`;

const AttachmentTitle = styled.strong`
  color: ${palette.blueDeep};
  font-size: 0.88rem;
  font-weight: 900;
`;

const AttachmentLink = styled.a`
  color: ${palette.textBody};
  font-size: 0.9rem;
  font-weight: 700;
  text-decoration: none;

  &:hover {
    color: ${palette.blue};
    text-decoration: underline;
    text-underline-offset: 3px;
  }
`;

const ModalFooter = styled.footer`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 10px;
  padding: 16px 24px 20px;
  border-top: 1px solid rgba(18, 63, 133, 0.1);
  background: #fbfdff;
`;

const ConfirmButton = styled.button`
  display: inline-flex;
  min-height: 40px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border: 0;
  border-radius: 7px;
  background: ${palette.blueDeep};
  color: #ffffff;
  font-size: 0.86rem;
  font-weight: 900;
  cursor: pointer;
  box-shadow: 0 12px 22px rgba(18, 63, 133, 0.22);
`;

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

function resolveDetailPath(item: IssueReport) {
  return item.detailPath ?? `/trade-insights/details/${item.id}.json`;
}

function isGenericIssueSummary(summary?: string) {
  if (!summary) {
    return true;
  }

  return (
    summary.includes('무역뉴스에서 수집한 기사입니다') ||
    summary.includes('언론 스크랩에서 수집한 외부 기사입니다') ||
    summary.includes('collected from')
  );
}

function buildIssueSummaryParagraphs(item: IssueReport) {
  const title = item.title;
  const paragraphs = [`${title} 관련 무역동향입니다.`];

  if (/해상봉쇄|이란|호르무즈|원유|나프타|헬륨|에너지/.test(title)) {
    paragraphs.push(
      '중동 정세와 해상 운송 리스크가 에너지 원자재, 운임, 보험료, 납기 변동으로 이어질 수 있어 수출입 계약과 물류 일정을 함께 점검할 필요가 있습니다.',
    );
  } else if (/환율|원화|달러|금융위기/.test(title)) {
    paragraphs.push(
      '환율 변동성이 커질 경우 수입 원가와 수출 채산성에 직접 영향을 줄 수 있으므로 결제 통화, 환헤지, 견적 유효기간 관리가 중요합니다.',
    );
  } else if (/관세|통관|전자상거래|지식재산권|관세청|분류|수입/.test(title)) {
    paragraphs.push(
      '관세·통관 제도와 품목 분류, 지식재산권 보호 이슈가 포함된 사안으로 수입 신고, HS Code, 원산지 및 사후관리 기준을 확인해야 합니다.',
    );
  } else if (/유턴기업|중기부|창업|기술사업화|지원|정책/.test(title)) {
    paragraphs.push(
      '정부 지원과 산업 정책 변화에 관한 내용으로 국내 생산 전환, 기술사업화, 지역 투자 계획을 검토하는 기업이 참고할 만한 이슈입니다.',
    );
  } else if (/개정안|특별법|본회의|법률안/.test(title)) {
    paragraphs.push(
      '법령 개정과 제도 변화가 기업 운영 기준에 영향을 줄 수 있는 내용으로 시행 시점, 적용 대상, 후속 고시를 확인하는 것이 좋습니다.',
    );
  } else if (/베트남|미얀마|중국|한-일|한-유럽|인도/.test(title)) {
    paragraphs.push(
      '주요 교역국의 정책·시장 변화와 관련된 내용으로 현지 통관, 인증, 공급망 및 거래 조건 변화를 함께 살펴볼 필요가 있습니다.',
    );
  } else {
    paragraphs.push(
      '수출입 기업이 정책 변화, 시장 흐름, 공급망 영향을 빠르게 확인할 수 있도록 핵심 이슈를 정리한 자료입니다.',
    );
  }

  paragraphs.push('신한관세법인은 해당 이슈가 관세, 통관, 물류, 환율, 공급망에 미칠 영향을 중심으로 고객사의 대응 포인트를 검토합니다.');
  return paragraphs;
}

function buildFallbackDetail(item: IssueReport): IssueReportDetail {
  const body = isGenericIssueSummary(item.summary) ? buildIssueSummaryParagraphs(item) : [item.summary];

  return {
    id: item.id,
    title: item.title,
    source: item.source,
    registeredAt: item.publishedAt,
    updatedAt: item.publishedAt,
    body,
    originalUrl: item.url,
  };
}

export function IssueReportPage() {
  const { language, t } = useI18n();
  const newsSubnav = sectionSubnav.news;
  const { reports, loading, failedSources, refreshing, refreshStatus, refreshedAt, refreshReports } = useIssueReports();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReport, setSelectedReport] = useState<IssueReport | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<IssueReportDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  async function openReportDetail(item: IssueReport) {
    if (item.status === 'placeholder') {
      return;
    }

    setSelectedReport(item);
    setSelectedDetail(item.detail ?? buildFallbackDetail(item));
    setDetailLoading(Boolean(!item.detail));

    if (!item.detail) {
      try {
        const response = await fetch(resolveDetailPath(item), { cache: 'no-store' });

        if (!response.ok) {
          throw new Error(`Failed to load detail: ${response.status}`);
        }

        const detail = (await response.json()) as IssueReportDetail;
        setSelectedDetail({
          ...buildFallbackDetail(item),
          ...detail,
          originalUrl: detail.originalUrl ?? item.url,
        });
      } catch {
        setSelectedDetail(buildFallbackDetail(item));
      } finally {
        setDetailLoading(false);
      }
    }
  }

  function closeReportDetail() {
    setSelectedReport(null);
    setSelectedDetail(null);
    setDetailLoading(false);
  }

  useEffect(() => {
    if (!selectedReport) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeReportDetail();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedReport]);

  const rows: NewsListTableRow[] = pagedReports.map((item) => {
    return {
      id: item.id,
      publishedAt: item.publishedAt,
      sourceLabel: t(item.source, item.sourceEn),
      title: t(item.title, item.titleEn),
      onClick: item.status === 'placeholder' ? undefined : () => void openReportDetail(item),
      external: false,
      disabled: item.status === 'placeholder',
      actions: [
        {
          label: item.status === 'placeholder' ? t('준비중', 'Pending') : t('보기', 'View'),
          onClick: item.status === 'placeholder' ? undefined : () => void openReportDetail(item),
          external: false,
          disabled: item.status === 'placeholder',
          variant: 'primary',
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
      ? t('검색 조건에 맞는 Trade Insights가 없습니다.', 'No Trade Insights match the current filters.')
      : t('표시할 Trade Insights가 없습니다.', 'No Trade Insights are available right now.');

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
            searchPlaceholder={t('제목, 출처, 날짜로 검색', 'Search by title, source, or date')}
            onSearchChange={setSearchQuery}
            chipLabel={t('출처 필터', 'Source Filter')}
            chipOptions={sourceOptions}
            selectedChip={selectedSource}
            onChipChange={setSelectedSource}
            resultLabel={t(`총 ${filteredReports.length}건`, `${filteredReports.length} results`)}
          />
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
                `${failedSourcesLabel} 수집에 실패했습니다. 현재 표시할 Trade Insights가 없습니다.`,
                `Failed to load ${failedSourcesLabel}. There are no Trade Insights to display right now.`,
              )}
            </StatusNote>
          ) : null}
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
        </NewsPageContainer>
      </NewsFlushPageSection>
      {selectedReport ? (
        <ModalBackdrop
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeReportDetail();
            }
          }}
        >
          <ModalCard role="dialog" aria-modal="true" aria-labelledby="trade-insight-modal-title">
            <ModalHeader>
              <div>
                <ModalTitle id="trade-insight-modal-title">{selectedDetail?.title ?? selectedReport.title}</ModalTitle>
                <ModalMeta>
                  <span>{selectedDetail?.source ?? selectedReport.source}</span>
                  <span>
                    {t('등록일', 'Registered')}: {selectedDetail?.registeredAt ?? selectedReport.publishedAt}
                  </span>
                  <span>
                    {t('수정일', 'Updated')}: {selectedDetail?.updatedAt ?? selectedReport.publishedAt}
                  </span>
                </ModalMeta>
              </div>
              <CloseButton type="button" onClick={closeReportDetail} aria-label={t('닫기', 'Close')}>
                ×
              </CloseButton>
            </ModalHeader>
            <ModalBody>
              {detailLoading ? <p>{t('요약 정보를 불러오는 중입니다.', 'Loading summary details.')}</p> : null}
              {(selectedDetail?.body?.length ? selectedDetail.body : [selectedReport.summary]).map((paragraph, index) => (
                <p key={`${selectedReport.id}-${index}`}>{paragraph}</p>
              ))}
              {selectedDetail?.attachments?.length ? (
                <AttachmentBlock>
                  <AttachmentTitle>{t('첨부파일', 'Attachments')}</AttachmentTitle>
                  {selectedDetail.attachments.map((attachment) => (
                    <AttachmentLink key={attachment.url} href={attachment.url} target="_blank" rel="noreferrer">
                      {attachment.name}
                    </AttachmentLink>
                  ))}
                </AttachmentBlock>
              ) : null}
            </ModalBody>
            <ModalFooter>
              <ConfirmButton type="button" onClick={closeReportDetail}>
                {t('확인', 'Confirm')}
              </ConfirmButton>
            </ModalFooter>
          </ModalCard>
        </ModalBackdrop>
      ) : null}
    </>
  );
}
