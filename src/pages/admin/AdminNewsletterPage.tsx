import { useEffect, useMemo, useState } from 'react';
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
  AdminMuted,
  AdminPanel,
  AdminReadonlyBanner,
  AdminSelect,
  AdminSplitGrid,
  AdminSubnav,
  AdminSubnavLink,
  AdminTextarea,
  AdminTopRow,
} from './AdminShared';

type AdminNewsletterListResponse = {
  items: NewsletterRecord[];
  mode: NewsAdminMode;
};

type NewsletterFormState = {
  id: string | null;
  issue: string;
  publishedAt: string;
  language: string;
  languageEn: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  originalFile: File | null;
  previewZip: File | null;
};

const emptyForm: NewsletterFormState = {
  id: null,
  issue: '',
  publishedAt: '',
  language: '국문',
  languageEn: 'Korean',
  title: '',
  titleEn: '',
  summary: '',
  summaryEn: '',
  originalFile: null,
  previewZip: null,
};

export function AdminNewsletterPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const [items, setItems] = useState<NewsletterRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [form, setForm] = useState<NewsletterFormState>(emptyForm);
  const [message, setMessage] = useState<string | null>(null);

  const selectedItem = useMemo(() => items.find((item) => item.id === form.id) ?? null, [form.id, items]);

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
      language: item.language ?? '국문',
      languageEn: item.languageEn ?? 'Korean',
      title: item.title,
      titleEn: item.titleEn,
      summary: item.summary,
      summaryEn: item.summaryEn,
      originalFile: null,
      previewZip: null,
    });
    setMessage(null);
  }

  function resetForm() {
    setForm(emptyForm);
    setMessage(null);
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

    if (!form.title.trim() || !form.summary.trim() || !form.issue.trim() || !form.publishedAt.trim()) {
      setMessage(t('제목, 요약, 발행월, 게시일을 입력해주세요.', 'Please enter the title, summary, issue, and published date.'));
      return;
    }

    if (!form.id && (!form.originalFile || !form.previewZip)) {
      setMessage(t('새 소식지는 원본 파일과 preview ZIP이 모두 필요합니다.', 'A new newsletter requires both the original file and the preview ZIP.'));
      return;
    }

    const formData = new FormData();
    formData.append('id', form.id ?? '');
    formData.append('issue', form.issue.trim());
    formData.append('publishedAt', form.publishedAt.trim());
    formData.append('language', form.language);
    formData.append('languageEn', form.languageEn);
    formData.append('title', form.title.trim());
    formData.append('titleEn', (form.titleEn || form.title).trim());
    formData.append('summary', form.summary.trim());
    formData.append('summaryEn', (form.summaryEn || form.summary).trim());

    if (form.originalFile) {
      formData.append('originalFile', form.originalFile);
    }

    if (form.previewZip) {
      formData.append('previewZip', form.previewZip);
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
            <AdminSubnavLink to="/admin/news">{t('대시보드', 'Dashboard')}</AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/shinhan-news">{t('신한 NEWS', 'Shinhan NEWS')}</AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/newsletter" $active>
              {t('소식지', 'Newsletter')}
            </AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '데모 환경에서는 파일 업로드와 메타데이터 저장이 비활성화되어 있습니다. 내부 서버에서는 원본 파일과 프리뷰 자산을 같은 폼에서 연결할 수 있도록 준비한 구조입니다.',
                'File uploads and metadata saves are disabled in the demo environment. On the internal server this form is ready to connect original files and preview assets in one place.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminSplitGrid>
            <AdminPanel>
              <P.Kicker>Archive</P.Kicker>
              <P.SectionTitle>{t('현재 소식지 목록', 'Current Issues')}</P.SectionTitle>
              <AdminMuted>{t('실제 저장소 또는 데모 fallback 데이터에서 불러온 소식지 목록입니다.', 'This list is loaded from the actual storage or the demo fallback data.')}</AdminMuted>
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
              <P.SectionTitle>{t('소식지 업로드 폼', 'Newsletter Upload Form')}</P.SectionTitle>
              <AdminForm>
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
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('언어', 'Language')}</AdminLabel>
                    <AdminSelect
                      value={form.language}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          language: event.target.value,
                          languageEn: event.target.value === '영문' ? 'English' : 'Korean',
                        }))
                      }
                      disabled={session.isReadOnly}
                    >
                      <option value="국문">{t('국문', 'Korean')}</option>
                      <option value="영문">{t('영문', 'English')}</option>
                    </AdminSelect>
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('영문 표기', 'Language (EN)')}</AdminLabel>
                    <AdminInput
                      value={form.languageEn}
                      onChange={(event) => setForm((current) => ({ ...current, languageEn: event.target.value }))}
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
                  <AdminLabel>{t('제목 (영문)', 'Title (EN)')}</AdminLabel>
                  <AdminInput
                    value={form.titleEn}
                    onChange={(event) => setForm((current) => ({ ...current, titleEn: event.target.value }))}
                    placeholder={t('영문 제목', 'English title')}
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
                <AdminField>
                  <AdminLabel>{t('요약 (영문)', 'Summary (EN)')}</AdminLabel>
                  <AdminTextarea
                    value={form.summaryEn}
                    onChange={(event) => setForm((current) => ({ ...current, summaryEn: event.target.value }))}
                    placeholder={t('영문 요약', 'English summary')}
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('원본 파일', 'Original File')}</AdminLabel>
                    <AdminInput
                      type="file"
                      accept=".pdf,.zip,.ppt,.pptx,.doc,.docx"
                      disabled={session.isReadOnly}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          originalFile: event.target.files?.[0] ?? null,
                        }))
                      }
                    />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>{t('프리뷰 ZIP', 'Preview ZIP')}</AdminLabel>
                    <AdminInput
                      type="file"
                      accept=".zip"
                      disabled={session.isReadOnly}
                      onChange={(event) =>
                        setForm((current) => ({
                          ...current,
                          previewZip: event.target.files?.[0] ?? null,
                        }))
                      }
                    />
                  </AdminField>
                </AdminFieldGrid>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly}>
                    {t('소식지 등록', 'Save Newsletter')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => void handleDelete()} disabled={session.isReadOnly || !form.id}>
                    {t('소식지 삭제', 'Delete Newsletter')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={resetForm}>
                    {t('새 소식지 등록', 'New Newsletter')}
                  </AdminButton>
                </AdminActionRow>
                <AdminHint>
                  {session.isReadOnly
                    ? t(
                        '현재는 화면 구조만 제공하며, 실제 저장은 내부 서버의 파일 저장소 API 연결 후 활성화됩니다.',
                        'The current demo provides the screen structure only. Real storage is enabled after wiring the internal server file-storage APIs.',
                      )
                    : t(
                        'localhost에서는 원본 파일과 preview ZIP이 실제 저장소에 저장됩니다. 저장 후 공개 소식지 페이지에서 바로 확인할 수 있습니다.',
                        'On localhost, both the original file and preview ZIP are saved into the real storage. You can verify them immediately on the public newsletter page.',
                      )}
                </AdminHint>
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
