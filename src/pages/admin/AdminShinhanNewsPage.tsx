import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import type { NewsAdminMode, ShinhanNewsRecord } from '../../types/site';
import { getShinhanNewsSourceLabel, sortShinhanNewsRecords } from '../../utils/shinhanNews';
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

type AdminNewsListResponse = {
  items: ShinhanNewsRecord[];
  mode: NewsAdminMode;
};

type NewsFormState = {
  id: string | null;
  category: 'flash' | 'seminar';
  publishedAt: string;
  title: string;
  summary: string;
  author: string;
  bodyHtml: string;
};

const emptyForm: NewsFormState = {
  id: null,
  category: 'flash',
  publishedAt: '',
  title: '',
  summary: '',
  author: '',
  bodyHtml: '',
};

export function AdminShinhanNewsPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const [items, setItems] = useState<ShinhanNewsRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [form, setForm] = useState<NewsFormState>(emptyForm);
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
        const response = await fetch('/api/admin/news/shinhan-news', {
          credentials: 'same-origin',
        });

        if (!response.ok) {
          throw new Error(`Failed to load admin news: ${response.status}`);
        }

        const payload = (await response.json()) as AdminNewsListResponse;

        if (!ignore) {
          setItems(sortShinhanNewsRecords(payload.items));
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

  function selectItem(item: ShinhanNewsRecord) {
    setForm({
      id: item.id,
      category: item.category,
      publishedAt: item.publishedAt,
      title: item.title,
      summary: item.summary,
      author: item.author ?? '',
      bodyHtml: item.bodyHtml ?? '',
    });
    setMessage(null);
  }

  function resetForm() {
    setForm(emptyForm);
    setMessage(null);
  }

  async function reloadItems(selectedId?: string | null) {
    const response = await fetch('/api/admin/news/shinhan-news', {
      credentials: 'same-origin',
    });

    if (!response.ok) {
      throw new Error(`Failed to reload admin news: ${response.status}`);
    }

    const payload = (await response.json()) as AdminNewsListResponse;
    setItems(sortShinhanNewsRecords(payload.items));

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

    if (!form.title.trim() || !form.summary.trim() || !form.publishedAt.trim()) {
      setMessage(t('제목, 요약, 게시일을 입력해주세요.', 'Please enter the title, summary, and published date.'));
      return;
    }

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/admin/news/shinhan-news/${form.id}` : '/api/admin/news/shinhan-news';

    const response = await fetch(url, {
      method,
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: form.id ?? undefined,
        category: form.category,
        publishedAt: form.publishedAt.trim(),
        title: form.title.trim(),
        titleEn: form.title.trim(),
        summary: form.summary.trim(),
        summaryEn: form.summary.trim(),
        author: form.author.trim(),
        bodyHtml: form.bodyHtml.trim(),
        createdAt: selectedItem?.createdAt,
      }),
    });

    const payload = (await response.json()) as ShinhanNewsRecord | { message?: string };

    if (!response.ok) {
      setMessage('message' in payload ? payload.message ?? t('기사 저장에 실패했습니다.', 'Failed to save the article.') : t('기사 저장에 실패했습니다.', 'Failed to save the article.'));
      return;
    }

    const nextItem = payload as ShinhanNewsRecord;
    await reloadItems(nextItem.id);
    setMessage(t('기사 저장이 완료되었습니다.', 'The article has been saved.'));
  }

  async function handleDelete() {
    if (session.isReadOnly || !form.id) {
      return;
    }

    const response = await fetch(`/api/admin/news/shinhan-news/${form.id}`, {
      method: 'DELETE',
      credentials: 'same-origin',
    });

    if (!response.ok) {
      setMessage(t('기사 삭제에 실패했습니다.', 'Failed to delete the article.'));
      return;
    }

    await reloadItems(null);
    setForm(emptyForm);
    setMessage(t('선택한 기사를 삭제했습니다.', 'The selected article has been deleted.'));
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
              <P.Kicker>Shinhan NEWS</P.Kicker>
              <P.SectionTitle>{t('신한 NEWS 관리', 'Shinhan NEWS Admin')}</P.SectionTitle>
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
            <AdminSubnavLink to="/admin/news/shinhan-news" $active>
              {t('신한 NEWS', 'Shinhan NEWS')}
            </AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/newsletter">{t('소식지', 'Newsletter')}</AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '데모 환경에서는 기사 작성, 수정, 삭제가 비활성화되어 있습니다. 내부 서버 운영 시 같은 화면에서 저장 API만 연결하면 됩니다.',
                'In the demo environment article create, edit, and delete actions are disabled. On the internal server the same screen can be activated by wiring the save APIs.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminSplitGrid>
            <AdminPanel>
              <P.Kicker>Archive</P.Kicker>
              <P.SectionTitle>{t('현재 기사 목록', 'Current Articles')}</P.SectionTitle>
              <AdminMuted>{t('실제 저장소 또는 데모 fallback 데이터에서 불러온 기사 목록입니다.', 'This list is loaded from the actual storage or the demo fallback data.')}</AdminMuted>
              {dataLoading ? <P.CardText>{t('기사 목록을 불러오는 중입니다.', 'Loading articles.')}</P.CardText> : null}
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
                        <span>{item.publishedAt}</span>
                        <span>{getShinhanNewsSourceLabel(item, t('세미나', 'Seminar'))}</span>
                      </AdminListMeta>
                      <AdminListTitle>{t(item.title, item.titleEn)}</AdminListTitle>
                      <AdminListSummary>{t(item.summary, item.summaryEn)}</AdminListSummary>
                    </AdminListItem>
                  ))}
                </AdminList>
              ) : null}
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>Editor</P.Kicker>
              <P.SectionTitle>{t('기사 작성 폼', 'Article Form')}</P.SectionTitle>
              <AdminForm>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('구분', 'Category')}</AdminLabel>
                    <AdminSelect
                      value={form.category}
                      onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as 'flash' | 'seminar' }))}
                      disabled={session.isReadOnly}
                    >
                      <option value="flash">FLASH</option>
                      <option value="seminar">{t('세미나', 'Seminar')}</option>
                    </AdminSelect>
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
                  <AdminLabel>{t('작성자', 'Author')}</AdminLabel>
                  <AdminInput
                    value={form.author}
                    onChange={(event) => setForm((current) => ({ ...current, author: event.target.value }))}
                    placeholder={t('작성자명', 'Author name')}
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('제목', 'Title')}</AdminLabel>
                  <AdminInput
                    value={form.title}
                    onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
                    placeholder={t('기사 제목', 'Article title')}
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('요약', 'Summary')}</AdminLabel>
                  <AdminTextarea
                    value={form.summary}
                    onChange={(event) => setForm((current) => ({ ...current, summary: event.target.value }))}
                    placeholder={t('기사 요약', 'Article summary')}
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('본문 HTML', 'Body HTML')}</AdminLabel>
                  <AdminTextarea
                    value={form.bodyHtml}
                    onChange={(event) => setForm((current) => ({ ...current, bodyHtml: event.target.value }))}
                    placeholder="<p>...</p>"
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly}>
                    {t('기사 저장', 'Save Article')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => void handleDelete()} disabled={session.isReadOnly || !form.id}>
                    {t('기사 삭제', 'Delete Article')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={resetForm}>
                    {t('새 글 작성', 'New Article')}
                  </AdminButton>
                </AdminActionRow>
                <AdminHint>
                  {session.isReadOnly
                    ? t(
                        '이 폼은 데모에서 비활성화되어 있으며, 내부 서버 운영 시 파일 저장소 API와 연결됩니다.',
                        'This form is disabled in the demo and will later connect to the file-storage APIs on the internal server.',
                      )
                    : t(
                        'localhost에서는 실제 파일 저장소와 API를 사용합니다. 저장 후 공개 뉴스 페이지에서 바로 확인할 수 있습니다.',
                        'On localhost this uses the real file storage and API. After saving, you can verify it immediately on the public news pages.',
                      )}
                </AdminHint>
                {message ? <AdminHint>{message}</AdminHint> : null}
              </AdminForm>
            </AdminPanel>
          </AdminSplitGrid>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
