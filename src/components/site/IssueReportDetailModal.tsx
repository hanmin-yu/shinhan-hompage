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

function hasRenderableDetail(detail?: IssueReportDetail | null) {
  return Boolean(detail?.body?.length || detail?.attachments?.length);
}

function normalizeDetail(item: IssueReport, detail: IssueReportDetail): IssueReportDetail {
  return {
    ...detail,
    id: detail.id ?? item.id,
    title: detail.title ?? item.title,
    source: detail.source ?? item.source,
    registeredAt: detail.registeredAt ?? item.publishedAt,
    updatedAt: detail.updatedAt ?? item.publishedAt,
    originalUrl: detail.originalUrl ?? item.url,
  };
}

export function useIssueReportDetailModal() {
  const [selectedReport, setSelectedReport] = useState<IssueReport | null>(null);
  const [selectedDetail, setSelectedDetail] = useState<IssueReportDetail | null>(null);

  async function openReportDetail(item: IssueReport) {
    if (item.status === 'placeholder') {
      return;
    }

    if (hasRenderableDetail(item.detail)) {
      setSelectedReport(item);
      setSelectedDetail(normalizeDetail(item, item.detail!));
      return;
    }

    if (!item.detailPath) {
      return;
    }

    try {
      const response = await fetch(item.detailPath, { cache: 'no-store' });

      if (!response.ok) {
        return;
      }

      const detail = normalizeDetail(item, (await response.json()) as IssueReportDetail);

      if (!hasRenderableDetail(detail)) {
        return;
      }

      setSelectedReport(item);
      setSelectedDetail(detail);
    } catch {
      setSelectedReport(null);
      setSelectedDetail(null);
    }
  }

  function closeReportDetail() {
    setSelectedReport(null);
    setSelectedDetail(null);
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
    openReportDetail,
    closeReportDetail,
  };
}

type IssueReportDetailModalProps = ReturnType<typeof useIssueReportDetailModal>;

export function IssueReportDetailModal({
  selectedReport,
  selectedDetail,
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
          {selectedDetail?.body?.map((paragraph, index) => (
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
