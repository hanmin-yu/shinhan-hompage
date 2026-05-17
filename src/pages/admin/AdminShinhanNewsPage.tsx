import styled from '@emotion/styled';
import { useEffect, useMemo, useRef, useState } from 'react';
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
  AdminListTitle,
  AdminModeBadge,
  AdminPanel,
  AdminReadonlyBanner,
  AdminSelect,
  AdminSectionTitle,
  AdminSplitGrid,
  AdminSubnav,
  AdminSubnavLink,
  AdminTopRow,
  AdminUploadBox,
  AdminUploadMeta,
  AdminUploadTitle,
} from './AdminShared';
import { adminNavigationItems } from './adminContentConfig';

type AdminNewsListResponse = {
  items: ShinhanNewsRecord[];
  mode: NewsAdminMode;
};

type NewsFormCategory = 'notice' | 'flash' | 'seminar';

type NewsFormState = {
  id: string | null;
  category: NewsFormCategory;
  publishedAt: string;
  title: string;
  author: string;
  bodyHtml: string;
};

type EditorImageUpload = {
  id: string;
  file: File;
  previewUrl: string;
};

const emptyForm: NewsFormState = {
  id: null,
  category: 'notice',
  publishedAt: '',
  title: '',
  author: '',
  bodyHtml: '',
};

function normalizeSearch(value: string) {
  return value.toLowerCase().replace(/\s+/g, '');
}

const RichEditor = styled.div`
  min-height: 260px;
  padding: 18px;
  border-radius: 8px;
  border: 1px solid rgba(20, 75, 157, 0.16);
  background: #ffffff;
  color: #26384d;
  font-size: 0.95rem;
  line-height: 1.72;
  outline: none;
  overflow: auto;

  &:focus {
    border-color: rgba(20, 75, 157, 0.38);
    box-shadow: 0 0 0 3px rgba(20, 75, 157, 0.08);
  }

  &:empty::before {
    content: '';
    color: #8c99aa;
  }

  p {
    margin: 0 0 1em;
  }

  img {
    display: block;
    max-width: 100%;
    height: auto;
    margin: 16px auto;
    border-radius: 10px;
    box-shadow: 0 14px 30px rgba(16, 53, 114, 0.12);
  }
`;

const EditorToolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const InlineUploadButton = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 38px;
  padding: 0 13px;
  border-radius: 6px;
  border: 1px solid rgba(20, 75, 157, 0.22);
  background: #ffffff;
  color: #123f85;
  font-size: 0.84rem;
  font-weight: 800;
  cursor: ${({ $disabled }) => ($disabled ? 'default' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.55 : 1)};

  input {
    display: none;
  }
`;

const UploadPreview = styled.img`
  display: block;
  width: min(100%, 360px);
  max-height: 280px;
  object-fit: contain;
  border-radius: 8px;
  border: 1px solid rgba(20, 75, 157, 0.14);
  background: #ffffff;
`;

const EditorHeader = styled.div`
  display: grid;
  gap: 12px;
  padding-bottom: 14px;
  border-bottom: 1px solid rgba(20, 75, 157, 0.12);
`;

export function AdminShinhanNewsPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const editorRef = useRef<HTMLDivElement | null>(null);
  const [items, setItems] = useState<ShinhanNewsRecord[]>([]);
  const [dataLoading, setDataLoading] = useState(true);
  const [form, setForm] = useState<NewsFormState>(emptyForm);
  const [editorImages, setEditorImages] = useState<EditorImageUpload[]>([]);
  const [flashImage, setFlashImage] = useState<File | null>(null);
  const [flashImagePreview, setFlashImagePreview] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState<string | null>(null);

  const selectedItem = useMemo(() => items.find((item) => item.id === form.id) ?? null, [form.id, items]);
  const filteredItems = useMemo(() => {
    const query = normalizeSearch(searchQuery);

    if (!query) {
      return items;
    }

    return items.filter((item) =>
      normalizeSearch([item.title, item.titleEn, item.categoryLabel, item.publishedAt, item.author ?? ''].join(' ')).includes(query),
    );
  }, [items, searchQuery]);
  const isFlash = form.category === 'flash';
  const isNotice = form.category === 'notice';

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== form.bodyHtml) {
      editorRef.current.innerHTML = form.bodyHtml;
    }
  }, [form.id, form.bodyHtml]);

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

  function resolveFormCategory(item: ShinhanNewsRecord): NewsFormCategory {
    if (item.categoryLabel === '공지') {
      return 'notice';
    }

    return item.category;
  }

  function clearUploadState() {
    editorImages.forEach((image) => URL.revokeObjectURL(image.previewUrl));

    if (flashImagePreview) {
      URL.revokeObjectURL(flashImagePreview);
    }

    setEditorImages([]);
    setFlashImage(null);
    setFlashImagePreview(null);
  }

  function selectItem(item: ShinhanNewsRecord) {
    clearUploadState();
    setForm({
      id: item.id,
      category: resolveFormCategory(item),
      publishedAt: item.publishedAt,
      title: item.title,
      author: item.author ?? '',
      bodyHtml: item.bodyHtml ?? '',
    });
    setMessage(null);
  }

  function resetForm() {
    clearUploadState();
    setForm(emptyForm);
    if (editorRef.current) {
      editorRef.current.innerHTML = '';
    }
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

  function syncEditorHtml() {
    setForm((current) => ({
      ...current,
      bodyHtml: editorRef.current?.innerHTML ?? current.bodyHtml,
    }));
  }

  function insertEditorImage(files: FileList | null) {
    if (!files?.length || session.isReadOnly) {
      return;
    }

    const nextImages = Array.from(files)
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        id: globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(16).slice(2)}`,
        file,
        previewUrl: URL.createObjectURL(file),
      }));

    if (!nextImages.length) {
      return;
    }

    setEditorImages((current) => [...current, ...nextImages]);

    const imageHtml = nextImages
      .map(
        (image) =>
          `<figure><img src="${image.previewUrl}" data-upload-id="${image.id}" alt=""><figcaption>${image.file.name}</figcaption></figure>`,
      )
      .join('');
    const nextHtml = `${editorRef.current?.innerHTML ?? form.bodyHtml}${imageHtml}`;

    if (editorRef.current) {
      editorRef.current.innerHTML = nextHtml;
    }

    setForm((current) => ({ ...current, bodyHtml: nextHtml }));
  }

  function updateFlashImage(file: File | null) {
    if (flashImagePreview) {
      URL.revokeObjectURL(flashImagePreview);
    }

    setFlashImage(file);
    setFlashImagePreview(file ? URL.createObjectURL(file) : null);
  }

  function getBodyHtmlForSave() {
    const html = editorRef.current?.innerHTML ?? form.bodyHtml;
    const document = new DOMParser().parseFromString(`<div>${html}</div>`, 'text/html');

    document.querySelectorAll<HTMLImageElement>('img[data-upload-id]').forEach((image) => {
      const uploadId = image.dataset.uploadId;

      if (uploadId) {
        image.setAttribute('src', `__NEWS_IMAGE_ID__${uploadId}__`);
      }
    });

    return document.body.firstElementChild?.innerHTML ?? html;
  }

  async function handleSave() {
    if (session.isReadOnly) {
      return;
    }

    if (!form.title.trim() || !form.publishedAt.trim()) {
      setMessage(t('제목과 게시일을 입력해주세요.', 'Please enter the title and published date.'));
      return;
    }

    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `/api/admin/news/shinhan-news/${form.id}` : '/api/admin/news/shinhan-news';

    const bodyHtmlForSave = getBodyHtmlForSave().trim();

    if (isNotice && !bodyHtmlForSave) {
      setMessage(t('공지 본문을 입력해주세요.', 'Please enter the notice body.'));
      return;
    }

    if (isFlash && !form.id && !flashImage && !bodyHtmlForSave) {
      setMessage(t('FLASH 이미지를 업로드해주세요.', 'Please upload a FLASH image.'));
      return;
    }

    const uploadIdsInBody = new Set<string>();
    new DOMParser()
      .parseFromString(`<div>${editorRef.current?.innerHTML ?? form.bodyHtml}</div>`, 'text/html')
      .querySelectorAll<HTMLImageElement>('img[data-upload-id]')
      .forEach((image) => {
        if (image.dataset.uploadId) {
          uploadIdsInBody.add(image.dataset.uploadId);
        }
      });
    const uploadImages = editorImages.filter((image) => uploadIdsInBody.has(image.id));
    const formData = new FormData();

    formData.set('id', form.id ?? '');
    formData.set('entryType', form.category);
    formData.set('category', form.category === 'seminar' ? 'seminar' : 'flash');
    formData.set('categoryLabel', form.category === 'notice' ? '공지' : form.category === 'seminar' ? '세미나' : 'FLASH');
    formData.set('publishedAt', form.publishedAt.trim());
    formData.set('title', form.title.trim());
    formData.set('titleEn', form.title.trim());
    formData.set('summary', form.title.trim());
    formData.set('summaryEn', form.title.trim());
    formData.set('author', form.author.trim());
    formData.set('bodyHtml', bodyHtmlForSave);
    formData.set('bodyImageIds', JSON.stringify(uploadImages.map((image) => image.id)));
    if (selectedItem?.createdAt) {
      formData.set('createdAt', selectedItem.createdAt);
    }

    uploadImages.forEach((image) => {
      formData.append('bodyImages', image.file);
    });

    if (flashImage) {
      formData.append('flashImage', flashImage);
    }

    const response = await fetch(url, {
      method,
      credentials: 'same-origin',
      body: formData,
    });

    const payload = (await response.json()) as ShinhanNewsRecord | { message?: string };

    if (!response.ok) {
      setMessage('message' in payload ? payload.message ?? t('글 저장에 실패했습니다.', 'Failed to save the post.') : t('글 저장에 실패했습니다.', 'Failed to save the post.'));
      return;
    }

    const nextItem = payload as ShinhanNewsRecord;
    clearUploadState();
    await reloadItems(nextItem.id);
    setMessage(t('글 저장이 완료되었습니다.', 'The post has been saved.'));
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
      setMessage(t('글 삭제에 실패했습니다.', 'Failed to delete the post.'));
      return;
    }

    await reloadItems(null);
    setForm(emptyForm);
    setMessage(t('선택한 글을 삭제했습니다.', 'The selected post has been deleted.'));
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
            <AdminSubnavLink to="/admin" $active={false}>
              대시보드
            </AdminSubnavLink>
            {adminNavigationItems.map((item) => (
              <AdminSubnavLink key={item.id} to={item.to} $active={item.id === 'news'}>
                {item.label}
              </AdminSubnavLink>
            ))}
          </AdminSubnav>

          <AdminSubnav>
            <AdminSubnavLink to="/admin/news/shinhan-news" $active>
              신한 NEWS
            </AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/newsletter">소식지</AdminSubnavLink>
            <AdminSubnavLink to="/admin/news/shinhan-insights">신한 Insights</AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '데모 환경에서는 글 작성, 수정, 삭제가 비활성화되어 있습니다. 내부 서버 운영 시 같은 화면에서 저장 API만 연결하면 됩니다.',
                'In the demo environment post create, edit, and delete actions are disabled. On the internal server the same screen can be activated by wiring the save APIs.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <AdminSplitGrid>
            <AdminPanel>
              <P.Kicker>Archive</P.Kicker>
              <AdminSectionTitle>{t('현재 글 목록', 'Current Posts')}</AdminSectionTitle>
              <AdminField>
                <AdminLabel>{t('검색', 'Search')}</AdminLabel>
                <AdminInput
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder={t('제목, 구분, 날짜로 검색', 'Search by title, category, or date')}
                />
              </AdminField>
              {dataLoading ? <P.CardText>{t('글 목록을 불러오는 중입니다.', 'Loading posts.')}</P.CardText> : null}
              {!dataLoading ? (
                <AdminList>
                  {filteredItems.map((item) => (
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
                        <span>{getShinhanNewsSourceLabel(item, t('세미나/교육', 'Seminar / Training'))}</span>
                      </AdminListMeta>
                      <AdminListTitle>{t(item.title, item.titleEn)}</AdminListTitle>
                    </AdminListItem>
                  ))}
                  {!filteredItems.length ? <P.CardText>{t('검색 조건에 맞는 글이 없습니다.', 'No posts match the search.')}</P.CardText> : null}
                </AdminList>
              ) : null}
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>Editor</P.Kicker>
              <EditorHeader>
                <AdminSectionTitle>{t('글 작성 폼', 'Post Form')}</AdminSectionTitle>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly}>
                    {t('글 저장', 'Save Post')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => void handleDelete()} disabled={session.isReadOnly || !form.id}>
                    {t('글 삭제', 'Delete Post')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={resetForm}>
                    {t('새 글 작성', 'New Post')}
                  </AdminButton>
                </AdminActionRow>
              </EditorHeader>
              <AdminForm>
                <AdminFieldGrid>
                  <AdminField>
                    <AdminLabel>{t('구분', 'Category')}</AdminLabel>
                    <AdminSelect
                      value={form.category}
                      onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as NewsFormCategory }))}
                      disabled={session.isReadOnly}
                    >
                      <option value="notice">{t('공지', 'Notice')}</option>
                      <option value="flash">FLASH</option>
                      <option value="seminar">{t('세미나/교육', 'Seminar / Training')}</option>
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
                    placeholder={t('글 제목', 'Post title')}
                    disabled={session.isReadOnly}
                  />
                </AdminField>
                {isFlash ? (
                  <AdminUploadBox $active={Boolean(flashImagePreview)} $disabled={session.isReadOnly}>
                    <AdminUploadTitle>{t('FLASH 이미지 업로드', 'Upload FLASH Image')}</AdminUploadTitle>
                    {flashImage ? <AdminUploadMeta>{flashImage.name}</AdminUploadMeta> : null}
                    <input
                      type="file"
                      accept="image/*"
                      disabled={session.isReadOnly}
                      onChange={(event) => updateFlashImage(event.target.files?.[0] ?? null)}
                    />
                    {flashImagePreview ? <UploadPreview src={flashImagePreview} alt="" /> : null}
                  </AdminUploadBox>
                ) : null}
                <AdminField as="div">
                  <AdminLabel>{isNotice ? t('공지 본문', 'Notice Body') : t('본문', 'Body')}</AdminLabel>
                  <EditorToolbar>
                    <InlineUploadButton $disabled={session.isReadOnly}>
                      {t('본문 사진 넣기', 'Insert Image')}
                      <input type="file" accept="image/*" multiple disabled={session.isReadOnly} onChange={(event) => insertEditorImage(event.target.files)} />
                    </InlineUploadButton>
                  </EditorToolbar>
                  <RichEditor
                    ref={editorRef}
                    contentEditable={!session.isReadOnly}
                    suppressContentEditableWarning
                    onInput={syncEditorHtml}
                  />
                </AdminField>
                {message ? <AdminHint>{message}</AdminHint> : null}
              </AdminForm>
            </AdminPanel>
          </AdminSplitGrid>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
