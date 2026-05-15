import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import { palette } from '../home/homeStyles';
import { useI18n } from '../../i18n/useI18n';
import type { IssueReport, IssueReportDetail } from '../../types/site';

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

export function useIssueReportDetailModal() {
  const [selectedReport, setSelectedReport] = useState<IssueReport | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<IssueReportDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

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

  return {
    selectedReport,
    selectedDetail,
    detailLoading,
    openReportDetail,
    closeReportDetail,
  };
}

type IssueReportDetailModalProps = ReturnType<typeof useIssueReportDetailModal>;

export function IssueReportDetailModal({
  selectedReport,
  selectedDetail,
  detailLoading,
  closeReportDetail,
}: IssueReportDetailModalProps) {
  const { t } = useI18n();

  if (!selectedReport) {
    return null;
  }

  return (
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
  );
}
