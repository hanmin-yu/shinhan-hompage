import { type DragEvent, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import type { NewsAdminMode, NewsletterRecord } from '../../types/site';
import {
  AdminActionRow,
  AdminButton,
  AdminField,
  AdminFieldGrid,
  AdminForm,
  AdminHint,
  AdminInput,
  AdminLabel,
  AdminList,
  AdminListItem,
  AdminListMeta,
  AdminListSummary,
  AdminListTitle,
  AdminModeBadge,
  AdminPanel,
  AdminReadonlyBanner,
  AdminSectionTitle,
  AdminSplitGrid,
  AdminStatusBar,
  AdminStatusPill,
  AdminSubnav,
  AdminSubnavLink,
  AdminTextarea,
  AdminTopRow,
  AdminUploadBox,
  AdminUploadTitle,
} from './AdminShared';

type AdminNewsletterListResponse = {
  items: NewsletterRecord[];
  mode: NewsAdminMode;
};

type NewsletterFormState = {
  id: string | null;
  issue: string;
  publishedAt: string;
  title: string;
  summary: string;
  originalFile: File | null;
};

const emptyForm: NewsletterFormState = {
  id: null,
  issue: '',
  publishedAt: '',
  title: '',
  summary: '',
  originalFile: null,
};

function padMonth(value: string) {
  return value.padStart(2, '0');
}

function getTodayDateLabel() {
  const now = new Date();
  return `${now.getFullYear()}.${padMonth(String(now.getMonth() + 1))}.${padMonth(String(now.getDate()))}`;
}

function getCurrentIssueLabel() {
  const now = new Date();
  return `${now.getFullYear()}.${padMonth(String(now.getMonth() + 1))}`;
}

function getNewsletterMetadataFromFile(file: File) {
  const baseName = file.name.replace(/\.[^.]+$/i, '').trim();
  const issueMatch =
    baseName.match(/(20\d{2})\s*[년._-]?\s*(1[0-2]|0?[1-9])\s*월?/i) ??
    baseName.match(/(20\d{2})\s*[-._]\s*(1[0-2]|0?[1-9])/i);
  const issue = issueMatch ? `${issueMatch[1]}.${padMonth(issueMatch[2])}` : getCurrentIssueLabel();

  return {
    issue,
    publishedAt: issue ? `${issue}.01` : getTodayDateLabel(),
    title: baseName || '신한관세법인 소식지',
    summary: `${issue} 신한관세법인 소식지`,
  };
}

function isPdfFile(file: File) {
  return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
}

function formatFileSize(size: number) {
  if (size < 1024 * 1024) {
    return `${Math.max(1, Math.round(size / 1024))}KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)}MB`;
}

export function AdminNewsletterPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const [items, setItems] = useState<NewsletterRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [form, setForm] = useState<NewsletterFormState>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);
  const [fileInputKey, setFileInputKey] = useState(0);
  const [dragActive, setDragActive] = useState(false);

  const selectedItem = useMemo(() => items.find((item) => item.id === form.id) ?? null, [form.id, items]);
  const formModeLabel = form.id ? t('기존 소식지 수정', 'Editing Existing Issue') : t('새 소식지 등록', 'New Newsletter');
  const selectedFileLabel = form.originalFile
    ? `${form.originalFile.name} (${formatFileSize(form.originalFile.size)})`
    : t('PDF 파일을 선택하거나 이 영역에 끌어다 놓으세요.', 'Choose a PDF file or drop it here.');

  useEffect(() => {
    if (!session.isAuthenticated) {
      return;
    }

    let ignore = false;

    async function loadItems() {
      setDataLoading(true);

      try {
        const response = await fetch('/api/admin/news/newsletters', {
          credentials: 'same-origin',
        });

        if (!response.ok) {
          throw new Error(`Failed to load admin newsletters: ${response.status}`);
        }

        const payload = (await response.json()) as AdminNewsletterListResponse;

        if (!ignore) {
          setItems(payload.items);
        }
      } catch {
        if (!ignore) {
          setItems([]);
        }
      } finally {
        if (!ignore) {
          setDataLoading(false);
        }
      }
    }

    void loadItems();

    return () => {
      ignore = true;
    };
  }, [session.isAuthenticated]);

  function selectItem(item: NewsletterRecord) {
    setForm({
      id: item.id,
      issue: item.issue,
      publishedAt: item.publishedAt,
      title: item.title,
      summary: item.summary,
      originalFile: null,
    });
    setMessage(null);
    setFileInputKey((key) => key + 1);
  }

  function resetForm() {
    setForm(emptyForm);
    setMessage(null);
    setFileInputKey((key) => key + 1);
    setDragActive(false);
  }

  function applyPdfFile(file: File | null) {
    if (!file) {
      return;
    }

    if (!isPdfFile(file)) {
      setMessage(t('소식지는 PDF 파일만 업로드할 수 있습니다.', 'Only PDF files can be uploaded as newsletters.'));
      setFileInputKey((key) => key + 1);
      return;
    }

    const metadata = getNewsletterMetadataFromFile(file);

    setForm({
      id: null,
      originalFile: file,
      issue: metadata.issue,
      publishedAt: metadata.publishedAt,
      title: metadata.title,
      summary: metadata.summary,
    });
    setMessage(null);
  }

  function handleUploadDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragActive(false);

    if (session.isReadOnly) {
      return;
    }

    applyPdfFile(event.dataTransfer.files?.[0] ?? null);
  }

  async function reloadItems(selectedId?: string | null) {
    const response = await fetch('/api/admin/news/newsletters', {
      credentials: 'same-origin',
    });

    if (!response.ok) {
      throw new Error(`Failed to reload admin newsletters: ${response.status}`);
    }

    const payload = (await response.json()) as AdminNewsletterListResponse;
    setItems(payload.items);

    if (!selectedId) {
      return;
    }

    const nextSelected = payload.items.find((item) => item.id === selectedId) ?? null;

    if (nextSelected) {
      selectItem(nextSelected);
    }
  }

  async function handleSave() {
    if (session.isReadOnly) {
      return;
    }

    if (!form.id && !form.originalFile) {
      setMessage(t('새 소식지는 PDF 파일을 선택해주세요.', 'Please select a PDF file for a new newsletter.'));
      return;
    }

    if (form.originalFile && !isPdfFile(form.originalFile)) {
      setMessage(t('소식지는 PDF 파일만 업로드할 수 있습니다.', 'Only PDF files can be uploaded as newsletters.'));
      return;
    }

    if (!form.title.trim() || !form.summary.trim() || !form.issue.trim() || !form.publishedAt.trim()) {
      setMessage(t('PDF 파일명에서 제목/발행월을 확인하지 못했습니다. 제목, 요약, 발행월, 게시일을 입력해주세요.', 'Please enter title, summary, issue, and published date.'));
      return;
    }

    const formData = new FormData();
    formData.append('id', form.id ?? '');
    formData.append('issue', form.issue.trim());
    formData.append('publishedAt', form.publishedAt.trim());
    formData.append('language', '국문');
    formData.append('languageEn', 'Korean');
    formData.append('title', form.title.trim());
    formData.append('titleEn', form.title.trim());
    formData.append('summary', form.summary.trim());
    formData.append('summaryEn', form.summary.trim());

    if (form.originalFile) {
      formData.append('originalFile', form.originalFile);
    }

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/admin/news/newsletters/${form.id}` : '/api/admin/news/newsletters';
    const response = await fetch(url, {
      method,
      credentials: 'same-origin',
      body: formData,
    });

    const payload = (await response.json()) as NewsletterRecord | { message?: string };

    if (!response.ok) {
      setMessage('message' in payload ? payload.message ?? t('소식지 저장에 실패했습니다.', 'Failed to save the newsletter.') : t('소식지 저장에 실패했습니다.', 'Failed to save the newsletter.'));
      return;
    }

    const nextItem = payload as NewsletterRecord;
    await reloadItems(nextItem.id);
    setFileInputKey((key) => key + 1);
    setMessage(t('소식지 저장이 완료되었습니다.', 'The newsletter has been saved.'));
  }

  async function handleDelete() {
    if (session.isReadOnly || !form.id) {
      return;
    }

    const response = await fetch(`/api/admin/news/newsletters/${form.id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });

    if (!response.ok) {
      setMessage(t('소식지 삭제에 실패했습니다.', 'Failed to delete the newsletter.'));
      return;
    }

    await reloadItems(null);
    setForm(emptyForm);
    setFileInputKey((key) => key + 1);
    setMessage(t('선택한 소식지를 삭제했습니다.', 'The selected newsletter has been deleted.'));
  }

  if (loading) {
    return (
      <P.PageSection tone="soft">
        <P.PageContainer data-reveal>
          <P.CardText>{t('관리자 세션을 확인하는 중입니다.', 'Checking admin session.')}</P.CardText>
        </P.PageContainer>
      </P.PageSection>
    );
  }

  if (!session.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <AdminPanel>
          <AdminTopRow>
            <div>
              <P.Kicker>Newsletter</P.Kicker>
              <P.SectionTitle>{t('소식지 관리', 'Newsletter Admin')}</P.SectionTitle>
            </div>
            <AdminActionRow>
              <AdminModeBadge $readonly={session.isReadOnly}>
                {session.isReadOnly ? t('데모 읽기 전용', 'Demo Read-only') : t('운영 모드', 'Runtime Enabled')}
              </AdminModeBadge>
              <AdminButton type="button" $secondary onClick={() => void logout()}>
                {t('로그아웃', 'Logout')}
              </AdminButton>
            </AdminActionRow>
          </AdminTopRow>

          <AdminSubnav>
            <AdminSubnavLink to="/admin/news/shinhan-news">{t('신한 NEWS', 'Shinhan NEWS')}</AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/newsletter" $active>
              {t('소식지', 'Newsletter')}
            </AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '데모 환경에서는 파일 업로드와 메타데이터 저장이 비활성화되어 있습니다. 내부 서버에서는 PDF 파일 하나만 업로드하면 소식지로 저장됩니다.',
                'File uploads and metadata saves are disabled in the demo environment. On the internal server, uploading a single PDF saves the newsletter.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminSplitGrid>
            <AdminPanel>
              <P.Kicker>Archive</P.Kicker>
              <AdminSectionTitle>{t('현재 소식지 목록', 'Current Issues')}</AdminSectionTitle>
              {dataLoading ? <P.CardText>{t('소식지 목록을 불러오는 중입니다.', 'Loading newsletters.')}</P.CardText> : null}
              {!dataLoading ? (
                <AdminList>
                  {items.map((item) => (
                    <AdminListItem
                      key={item.id}
                      as="button"
                      onClick={() => selectItem(item)}
                      style={{
                        textAlign: 'left',
                        cursor: 'pointer',
                        boxShadow: item.id === form.id ? '0 0 0 2px rgba(24, 86, 170, 0.15)' : 'none',
                      }}
                    >
                      <AdminListMeta>
                        <span>{item.issue}</span>
                        <span>{t(item.language ?? '소식지', item.languageEn ?? 'Newsletter')}</span>
                      </AdminListMeta>
                      <AdminListTitle>{t(item.title, item.titleEn)}</AdminListTitle>
                      <AdminListSummary>{t(item.summary, item.summaryEn)}</AdminListSummary>
                    </AdminListItem>
                  ))}
                </AdminList>
              ) : null}
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>Uploader</P.Kicker>
              <AdminSectionTitle>{t('PDF 소식지 업로드', 'Upload Newsletter PDF')}</AdminSectionTitle>
              <AdminForm>
                <AdminStatusBar>
                  <AdminStatusPill $accent={!form.id}>{formModeLabel}</AdminStatusPill>
                </AdminStatusBar>

                <AdminUploadBox
                  $active={dragActive}
                  $disabled={session.isReadOnly}
                  onDragEnter={(event) => {
                    event.preventDefault();
                    if (!session.isReadOnly) setDragActive(true);
                  }}
                  onDragOver={(event) => {
                    event.preventDefault();
                    if (!session.isReadOnly) setDragActive(true);
                  }}
                  onDragLeave={(event) => {
                    event.preventDefault();
                    setDragActive(false);
                  }}
                  onDrop={handleUploadDrop}
                >
                  <AdminLabel>{t('PDF 파일', 'PDF File')}</AdminLabel>
                  <input
                    key={fileInputKey}
                    type="file"
                    accept=".pdf,application/pdf"
                    disabled={session.isReadOnly}
                    onChange={(event) => applyPdfFile(event.target.files?.[0] ?? null)}
                  />
                  <AdminUploadTitle>{selectedFileLabel}</AdminUploadTitle>
                </AdminUploadBox>

                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('발행월', 'Issue')}</AdminLabel>
                    <AdminInput
                      value={form.issue}
                      onChange={(event) => setForm((current) => ({ ...current, issue: event.target.value }))}
                      placeholder="2026.04"
                      disabled={session.isReadOnly}
                    />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('게시일', 'Published Date')}</AdminLabel>
                    <AdminInput
                      value={form.publishedAt}
                      onChange={(event) => setForm((current) => ({ ...current, publishedAt: event.target.value }))}
                      placeholder="2026.04.27"
                      disabled={session.isReadOnly}
                    />
                  </AdminField>
                </AdminFieldGrid>
                <AdminField>
                  <AdminLabel>{t('제목', 'Title')}</AdminLabel>
                  <AdminInput
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder={t('소식지 제목', 'Newsletter title')}
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('요약', 'Summary')}</AdminLabel>
                  <AdminTextarea
                    value={form.summary}
                    onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
                    placeholder={t('소식지 요약', 'Newsletter summary')}
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly || (!form.id && !form.originalFile)}>
                    {form.id ? t('수정 저장', 'Save Changes') : t('새 소식지 업로드', 'Upload New Newsletter')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => void handleDelete()} disabled={session.isReadOnly || !form.id}>
                    {t('소식지 삭제', 'Delete Newsletter')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={resetForm}>
                    {t('새 등록으로 초기화', 'Reset for New Upload')}
                  </AdminButton>
                </AdminActionRow>
                {selectedItem?.downloadUrl ? <AdminHint>{selectedItem.downloadUrl}</AdminHint> : null}
                {message ? <AdminHint>{message}</AdminHint> : null}
              </AdminForm>
            </AdminPanel>
          </AdminSplitGrid>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
