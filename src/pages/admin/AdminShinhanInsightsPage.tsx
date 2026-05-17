import { useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import * as P from '../../components/site/PagePrimitives';
import { shinhanInsightCategories, type ShinhanInsight, type ShinhanInsightCategory } from '../../data/shinhanInsights';
import { staticSiteContent } from '../../data/siteContentStatic';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import type { SiteContentPayload } from '../../types/site';
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
import { adminNavigationItems } from './adminContentConfig';

type NewsContent = SiteContentPayload['news'];

type GroupResponse = {
  mode: string;
  groupId: 'news';
  content: unknown;
  message?: string;
};

const categoryLabels: Record<ShinhanInsightCategory, { ko: string; en: string }> = {
  customs: { ko: '관세', en: 'Customs' },
  trade: { ko: '국제 통상', en: 'International Trade' },
};

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isNewsContent(value: unknown): value is NewsContent {
  return Boolean(value) && typeof value === 'object' && Array.isArray((value as Partial<NewsContent>).shinhanInsights);
}

function createEmptyInsight(): ShinhanInsight {
  const now = new Date();
  const id = `insight-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Date.now()}`;

  return {
    id,
    category: 'customs',
    categoryLabel: categoryLabels.customs.ko,
    categoryLabelEn: categoryLabels.customs.en,
    publishedAt: now.toISOString().slice(0, 10),
    author: '신한관세법인',
    authorEn: 'Shinhan Customs Service',
    title: '',
    titleEn: '',
    summary: '',
    summaryEn: '',
    body: [''],
    bodyEn: [''],
  };
}

function normalizeParagraphs(value: string) {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

function sortInsights(items: ShinhanInsight[]) {
  return [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

function cleanInsightForm(form: ShinhanInsight): ShinhanInsight {
  const body = form.body.length ? form.body : [''];

  return {
    ...form,
    id: form.id.trim() || createEmptyInsight().id,
    categoryLabel: form.categoryLabel.trim() || categoryLabels[form.category].ko,
    categoryLabelEn: form.categoryLabelEn.trim() || categoryLabels[form.category].en,
    authorEn: form.author,
    titleEn: form.title,
    summaryEn: form.summary,
    body,
    bodyEn: body,
  };
}

function getOperatorVisibleInsightSnapshot(insight: ShinhanInsight) {
  return {
    category: insight.category,
    publishedAt: insight.publishedAt,
    author: insight.author,
    title: insight.title,
    summary: insight.summary,
    body: insight.body,
  };
}

function upsertInsight(content: NewsContent, selectedId: string, form: ShinhanInsight) {
  const nextForm = cleanInsightForm(form);
  const exists = content.shinhanInsights.some((item) => item.id === selectedId || item.id === nextForm.id);
  const nextInsights = exists
    ? content.shinhanInsights.map((item) => (item.id === selectedId || item.id === nextForm.id ? nextForm : item))
    : [nextForm, ...content.shinhanInsights];

  return {
    content: {
      ...content,
      shinhanInsights: sortInsights(nextInsights),
    },
    form: nextForm,
  };
}

export function AdminShinhanInsightsPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const [content, setContent] = useState<NewsContent>(() => cloneValue(staticSiteContent.news));
  const [savedContent, setSavedContent] = useState<NewsContent>(() => cloneValue(staticSiteContent.news));
  const [selectedId, setSelectedId] = useState('');
  const [form, setForm] = useState<ShinhanInsight>(() => createEmptyInsight());
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!session.isAuthenticated) {
      return;
    }

    void (async () => {
      try {
        const response = await fetch('/api/admin/content/news', {
          credentials: 'same-origin',
        });
        const payload = (await response.json()) as GroupResponse;
        const nextContent = isNewsContent(payload.content)
          ? { ...cloneValue(staticSiteContent.news), ...cloneValue(payload.content) }
          : cloneValue(staticSiteContent.news);

        setContent(nextContent);
        setSavedContent(nextContent);
        const firstInsight = sortInsights(nextContent.shinhanInsights)[0];
        if (firstInsight) {
          setSelectedId(firstInsight.id);
          setForm(cloneValue(firstInsight));
        }
      } catch {
        const fallback = cloneValue(staticSiteContent.news);
        setContent(fallback);
        setSavedContent(fallback);
        const firstInsight = sortInsights(fallback.shinhanInsights)[0];
        if (firstInsight) {
          setSelectedId(firstInsight.id);
          setForm(cloneValue(firstInsight));
        }
      }
    })();
  }, [session.isAuthenticated]);

  const sortedInsights = useMemo(() => sortInsights(content.shinhanInsights), [content.shinhanInsights]);
  const hasChanges = useMemo(() => JSON.stringify(content) !== JSON.stringify(savedContent), [content, savedContent]);
  const selectedInsight = useMemo(() => content.shinhanInsights.find((item) => item.id === selectedId), [content.shinhanInsights, selectedId]);
  const formHasChanges = useMemo(() => {
    if (!selectedInsight) {
      return Boolean(form.title || form.summary || form.body.join('').trim());
    }

    return JSON.stringify(getOperatorVisibleInsightSnapshot(form)) !== JSON.stringify(getOperatorVisibleInsightSnapshot(selectedInsight));
  }, [form, selectedInsight]);

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

  const updateForm = <K extends keyof ShinhanInsight>(key: K, value: ShinhanInsight[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleCategoryChange = (value: ShinhanInsightCategory) => {
    updateForm('category', value);
    updateForm('categoryLabel', categoryLabels[value].ko);
    updateForm('categoryLabelEn', categoryLabels[value].en);
  };

  const handleSelectInsight = (insight: ShinhanInsight) => {
    setSelectedId(insight.id);
    setForm(cloneValue(insight));
    setMessage('');
  };

  const handleNewInsight = () => {
    const next = createEmptyInsight();
    setSelectedId('');
    setForm(next);
    setMessage('');
  };

  const handleApplyForm = () => {
    const next = upsertInsight(content, selectedId, form);

    setContent(next.content);
    setSelectedId(next.form.id);
    setForm(next.form);
    setMessage(t('편집 내용이 반영되었습니다. 저장 버튼을 눌러 완료하세요.', 'Changes are staged. Press Save to finish.'));
  };

  const handleDelete = () => {
    if (!selectedId) {
      return;
    }

    setContent((current) => ({
      ...current,
      shinhanInsights: current.shinhanInsights.filter((item) => item.id !== selectedId),
    }));
    handleNewInsight();
    setMessage(t('삭제 내용이 반영되었습니다. 저장 버튼을 눌러 완료하세요.', 'Deletion is staged. Press Save to finish.'));
  };

  const handleSave = async () => {
    try {
      const next = formHasChanges ? upsertInsight(content, selectedId, form) : { content, form };
      const response = await fetch('/api/admin/content/news', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: next.content }),
      });
      const payload = (await response.json()) as GroupResponse;

      if (!response.ok) {
        throw new Error(payload.message ?? '저장에 실패했습니다.');
      }

      const nextContent = isNewsContent(payload.content) ? cloneValue(payload.content) : next.content;
      setContent(nextContent);
      setSavedContent(nextContent);
      setSelectedId(next.form.id);
      setForm(next.form);
      setMessage(t('저장되었습니다.', 'Saved.'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('저장에 실패했습니다.', 'Save failed.'));
    }
  };

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <AdminPanel>
          <AdminTopRow>
            <div>
              <P.Kicker>Admin</P.Kicker>
              <P.SectionTitle>{t('신한 Insights 관리', 'Shinhan Insights Admin')}</P.SectionTitle>
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
            {adminNavigationItems.map((item) => (
              <AdminSubnavLink key={item.id} to={item.to} $active={item.id === 'news'}>
                {item.label}
              </AdminSubnavLink>
            ))}
          </AdminSubnav>

          <AdminSubnav>
            <AdminSubnavLink to="/admin/news/shinhan-news">신한 NEWS</AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/newsletter">소식지</AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/shinhan-insights" $active>
              신한 Insights
            </AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t('읽기 전용 모드에서는 내용을 확인할 수 있지만 저장은 비활성화됩니다.', 'You can review content in read-only mode, but saves are disabled.')}
            </AdminReadonlyBanner>
          ) : null}

          <AdminSplitGrid>
            <AdminPanel>
              <AdminTopRow>
                <div>
                  <P.Kicker>목록</P.Kicker>
                  <AdminMuted>신한 Insights 글을 선택합니다.</AdminMuted>
                </div>
                <AdminButton type="button" $secondary onClick={handleNewInsight}>
                  새 글
                </AdminButton>
              </AdminTopRow>

              <AdminList>
                {sortedInsights.map((insight) => (
                  <AdminListItem key={insight.id} $active={insight.id === selectedId} onClick={() => handleSelectInsight(insight)}>
                    <AdminListMeta>
                      <span>{insight.publishedAt}</span>
                      <span>{insight.categoryLabel}</span>
                    </AdminListMeta>
                    <AdminListTitle>{insight.title || '제목 없음'}</AdminListTitle>
                    <AdminListSummary>{insight.summary || '요약 문구 없음'}</AdminListSummary>
                  </AdminListItem>
                ))}
              </AdminList>
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>글 편집</P.Kicker>
              <AdminForm
                onSubmit={(event) => {
                  event.preventDefault();
                  handleApplyForm();
                }}
              >
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>게시일</AdminLabel>
                    <AdminInput
                      type="date"
                      value={form.publishedAt}
                      disabled={session.isReadOnly}
                      onChange={(event) => updateForm('publishedAt', event.target.value)}
                    />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>카테고리</AdminLabel>
                    <AdminSelect
                      value={form.category}
                      disabled={session.isReadOnly}
                      onChange={(event) => handleCategoryChange(event.target.value as ShinhanInsightCategory)}
                    >
                      {shinhanInsightCategories
                        .filter((category) => category.value !== 'all')
                        .map((category) => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                    </AdminSelect>
                  </AdminField>
                  <AdminField>
                    <AdminLabel>작성자</AdminLabel>
                    <AdminInput value={form.author} disabled={session.isReadOnly} onChange={(event) => updateForm('author', event.target.value)} />
                  </AdminField>
                </AdminFieldGrid>

                <AdminField>
                  <AdminLabel>제목</AdminLabel>
                  <AdminInput value={form.title} disabled={session.isReadOnly} onChange={(event) => updateForm('title', event.target.value)} />
                </AdminField>
                <AdminField>
                  <AdminLabel>요약</AdminLabel>
                  <AdminTextarea value={form.summary} disabled={session.isReadOnly} onChange={(event) => updateForm('summary', event.target.value)} />
                </AdminField>
                <AdminField>
                  <AdminLabel>본문</AdminLabel>
                  <AdminTextarea
                    value={form.body.join('\n')}
                    disabled={session.isReadOnly}
                    onChange={(event) => updateForm('body', normalizeParagraphs(event.target.value))}
                  />
                </AdminField>
                <AdminActionRow>
                  <AdminButton type="submit" disabled={session.isReadOnly}>
                    편집 내용 반영
                  </AdminButton>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly || (!hasChanges && !formHasChanges)}>
                    저장
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={handleDelete} disabled={session.isReadOnly || !selectedId}>
                    삭제
                  </AdminButton>
                </AdminActionRow>
                {message ? <AdminHint>{message}</AdminHint> : null}
              </AdminForm>
            </AdminPanel>
          </AdminSplitGrid>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
