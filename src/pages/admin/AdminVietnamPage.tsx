import styled from '@emotion/styled';
import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';
import * as P from '../../components/site/PagePrimitives';
import { staticSiteContent } from '../../data/siteContentStatic';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import type { VietnamContent } from '../../types/site';
import {
  AdminActionRow,
  AdminButton,
  AdminField,
  AdminHint,
  AdminInput,
  AdminLabel,
  AdminModeBadge,
  AdminPanel,
  AdminReadonlyBanner,
  AdminSubnav,
  AdminSubnavLink,
  AdminTextarea,
  AdminTopRow,
} from './AdminShared';
import { adminNavigationItems } from './adminContentConfig';

type GroupResponse = {
  mode: string;
  groupId: 'vietnam';
  content: VietnamContent;
  message?: string;
};

type JsonPath = Array<string | number>;

const sectionTabs: { id: keyof VietnamContent; label: string }[] = [
  { id: 'hero', label: '메인 비주얼' },
  { id: 'navigation', label: '메뉴' },
  { id: 'about', label: '소개' },
  { id: 'people', label: '구성원' },
  { id: 'services', label: '업무분야' },
  { id: 'itSolutions', label: 'IT Solutions' },
  { id: 'news', label: '소식/자료' },
  { id: 'contact', label: '문의/소셜' },
];

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function isLocalizedText(value: unknown): value is { ko: string; en: string; vi?: string } {
  return isPlainObject(value) && typeof value.ko === 'string' && typeof value.en === 'string';
}

function formatLabel(key: string | number) {
  if (typeof key === 'number') {
    return `항목 ${key + 1}`;
  }

  const labels: Record<string, string> = {
    ko: '한국어',
    en: '영어',
    vi: '베트남어',
    id: 'ID',
    path: '경로',
    label: '메뉴명',
    title: '제목',
    summary: '요약',
    body: '본문',
    image: '이미지',
    imagePosition: '이미지 위치',
    email: 'Email',
    phone: '대표번호',
    onlineInquiryHref: '온라인 문의 링크',
    naverBlogUrl: '네이버 블로그',
    facebookUrl: 'Facebook',
    manager: '담당자',
    team: '팀',
    publishedAt: '게시일',
    href: '링크',
    category: '분류',
    group: '구분',
    name: '이름',
    role: '직책',
    highlights: '주요 이력',
    details: '상세 내용',
    children: '하위 메뉴',
    members: '구성원 목록',
    items: '항목 목록',
  };

  return labels[key] ?? key.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_-]+/g, ' ');
}

function createEmptyValue(template: unknown): unknown {
  if (Array.isArray(template)) {
    return [];
  }

  if (isPlainObject(template)) {
    return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, createEmptyValue(value)]));
  }

  return '';
}

function updateAtPath(root: unknown, path: JsonPath, nextValue: unknown): unknown {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...tail] = path;

  if (Array.isArray(root) && typeof head === 'number') {
    return root.map((item, index) => (index === head ? updateAtPath(item, tail, nextValue) : item));
  }

  if (isPlainObject(root)) {
    return {
      ...root,
      [head]: updateAtPath(root[head], tail, nextValue),
    };
  }

  return root;
}

function removeAtPath(root: unknown, path: JsonPath): unknown {
  if (path.length === 1 && Array.isArray(root) && typeof path[0] === 'number') {
    return root.filter((_, index) => index !== path[0]);
  }

  const [head, ...tail] = path;

  if (Array.isArray(root) && typeof head === 'number') {
    return root.map((item, index) => (index === head ? removeAtPath(item, tail) : item));
  }

  if (isPlainObject(root)) {
    return {
      ...root,
      [head]: removeAtPath(root[head], tail),
    };
  }

  return root;
}

function insertArrayItemAtPath(root: unknown, path: JsonPath, item: unknown): unknown {
  if (path.length === 0) {
    return Array.isArray(root) ? [...root, item] : [item];
  }

  const [head, ...tail] = path;

  if (Array.isArray(root) && typeof head === 'number') {
    return root.map((value, index) => (index === head ? insertArrayItemAtPath(value, tail, item) : value));
  }

  if (isPlainObject(root)) {
    return {
      ...root,
      [head]: insertArrayItemAtPath(root[head], tail, item),
    };
  }

  return root;
}

function getValueAtPath(root: unknown, path: JsonPath): unknown {
  return path.reduce((current, key) => {
    if (Array.isArray(current) && typeof key === 'number') {
      return current[key];
    }

    if (isPlainObject(current)) {
      return current[key];
    }

    return undefined;
  }, root);
}

function getArrayItemName(item: unknown, index: number) {
  if (isPlainObject(item)) {
    const candidates = [item.title, item.label, item.name, item.id];
    const display = candidates.find((value) => {
      if (typeof value === 'string') return value.trim();
      if (isLocalizedText(value)) return value.ko.trim();
      return false;
    });

    if (typeof display === 'string') return display;
    if (isLocalizedText(display)) return display.ko;
  }

  return `항목 ${index + 1}`;
}

function shouldUseTextarea(path: JsonPath, value: string) {
  const key = String(path[path.length - 1] ?? '');
  return /summary|body|mission|transport|details|highlights|text/i.test(key) || value.length > 70 || value.includes('\n');
}

export function AdminVietnamPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const [draftContent, setDraftContent] = useState<VietnamContent>(() => cloneValue(staticSiteContent.vietnam));
  const [savedContent, setSavedContent] = useState<VietnamContent>(() => cloneValue(staticSiteContent.vietnam));
  const [activeSection, setActiveSection] = useState<keyof VietnamContent>('hero');
  const [dataLoading, setDataLoading] = useState(true);
  const [message, setMessage] = useState('');
  const hasChanges = useMemo(() => JSON.stringify(draftContent) !== JSON.stringify(savedContent), [draftContent, savedContent]);

  useEffect(() => {
    if (!session.isAuthenticated) {
      return;
    }

    let ignore = false;

    async function loadContent() {
      setDataLoading(true);

      try {
        const response = await fetch('/api/admin/content/vietnam', {
          credentials: 'same-origin',
        });
        const payload = (await response.json()) as GroupResponse;

        if (!response.ok) {
          throw new Error(payload.message ?? '베트남 콘텐츠를 불러오지 못했습니다.');
        }

        if (!ignore) {
          setDraftContent(cloneValue(payload.content));
          setSavedContent(cloneValue(payload.content));
        }
      } catch (error) {
        if (!ignore) {
          setMessage(error instanceof Error ? error.message : '베트남 콘텐츠를 불러오지 못했습니다.');
        }
      } finally {
        if (!ignore) {
          setDataLoading(false);
        }
      }
    }

    void loadContent();

    return () => {
      ignore = true;
    };
  }, [session.isAuthenticated]);

  const setValueAtPath = (path: JsonPath, nextValue: unknown) => {
    setDraftContent((current) => updateAtPath(current, path, nextValue) as VietnamContent);
  };

  const removeArrayItem = (path: JsonPath) => {
    setDraftContent((current) => removeAtPath(current, path) as VietnamContent);
  };

  const addArrayItem = (path: JsonPath) => {
    const target = getValueAtPath(draftContent, path);
    if (!Array.isArray(target)) {
      return;
    }

    const template = target[0] ?? '';
    setDraftContent((current) => insertArrayItemAtPath(current, path, createEmptyValue(template)) as VietnamContent);
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/admin/content/vietnam', {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: draftContent }),
      });
      const payload = (await response.json()) as GroupResponse;

      if (!response.ok) {
        throw new Error(payload.message ?? '저장에 실패했습니다.');
      }

      setDraftContent(cloneValue(payload.content));
      setSavedContent(cloneValue(payload.content));
      setMessage('베트남 법인 콘텐츠가 저장되었습니다.');
    } catch (error) {
      setMessage(error instanceof Error ? error.message : '저장에 실패했습니다.');
    }
  };

  const renderEditor = (value: unknown, path: JsonPath, label: string, depth = 0): ReactNode => {
    if (isLocalizedText(value)) {
      return (
        <EditorGroup key={path.join('.')} $depth={depth}>
          <EditorTitle>{label}</EditorTitle>
          <LanguageGrid>
            {(['ko', 'en', 'vi'] as const).map((key) => (
              <AdminField key={key}>
                <AdminLabel>{formatLabel(key)}</AdminLabel>
                {shouldUseTextarea([...path, key], value[key] ?? '') ? (
                  <AdminTextarea
                    value={value[key] ?? ''}
                    disabled={session.isReadOnly}
                    onChange={(event) => setValueAtPath([...path, key], event.target.value)}
                  />
                ) : (
                  <AdminInput
                    value={value[key] ?? ''}
                    disabled={session.isReadOnly}
                    onChange={(event) => setValueAtPath([...path, key], event.target.value)}
                  />
                )}
              </AdminField>
            ))}
          </LanguageGrid>
        </EditorGroup>
      );
    }

    if (Array.isArray(value)) {
      return (
        <EditorGroup key={path.join('.')} $depth={depth}>
          <EditorTop>
            <EditorTitle>{label}</EditorTitle>
            <AdminButton type="button" $secondary onClick={() => addArrayItem(path)} disabled={session.isReadOnly || !value.length}>
              항목 추가
            </AdminButton>
          </EditorTop>
          {value.map((item, index) => (
            <ArrayCard key={`${path.join('.')}-${index}`}>
              <EditorTop>
                <ArrayTitle>{getArrayItemName(item, index)}</ArrayTitle>
                <AdminButton type="button" $secondary onClick={() => removeArrayItem([...path, index])} disabled={session.isReadOnly}>
                  삭제
                </AdminButton>
              </EditorTop>
              {renderEditor(item, [...path, index], `항목 ${index + 1}`, depth + 1)}
            </ArrayCard>
          ))}
        </EditorGroup>
      );
    }

    if (isPlainObject(value)) {
      return (
        <EditorGroup key={path.join('.')} $depth={depth}>
          <EditorTitle>{label}</EditorTitle>
          <FieldStack>
            {Object.entries(value).map(([key, child]) => renderEditor(child, [...path, key], formatLabel(key), depth + 1))}
          </FieldStack>
        </EditorGroup>
      );
    }

    if (typeof value === 'string') {
      return (
        <AdminField key={path.join('.')}>
          <AdminLabel>{label}</AdminLabel>
          {shouldUseTextarea(path, value) ? (
            <AdminTextarea value={value} disabled={session.isReadOnly} onChange={(event) => setValueAtPath(path, event.target.value)} />
          ) : (
            <AdminInput value={value} disabled={session.isReadOnly} onChange={(event) => setValueAtPath(path, event.target.value)} />
          )}
        </AdminField>
      );
    }

    return null;
  };

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
              <P.Kicker>Vietnam Admin</P.Kicker>
              <P.SectionTitle>베트남 법인 관리자</P.SectionTitle>
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
              <AdminSubnavLink key={item.id} to={item.to} $active={item.id === 'vietnam'}>
                {item.label}
              </AdminSubnavLink>
            ))}
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>읽기 전용 모드에서는 베트남 법인 콘텐츠 저장이 비활성화됩니다.</AdminReadonlyBanner>
          ) : null}

          <VietnamAdminLayout>
            <SectionRail>
              {sectionTabs.map((tab) => (
                <SectionButton key={tab.id} type="button" data-active={activeSection === tab.id ? 'true' : undefined} onClick={() => setActiveSection(tab.id)}>
                  {tab.label}
                </SectionButton>
              ))}
            </SectionRail>

            <EditorPanel>
              <EditorTop>
                <div>
                  <EditorTitle>{sectionTabs.find((tab) => tab.id === activeSection)?.label}</EditorTitle>
                  <AdminHint>한국어, 영어, 베트남어 필드를 함께 관리합니다. 베트남어가 비어 있으면 공개 화면에서 영어, 한국어 순서로 대체됩니다.</AdminHint>
                </div>
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly || !hasChanges || dataLoading}>
                    저장
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => window.open('/vn', '_blank', 'noopener,noreferrer')}>
                    공개 페이지 보기
                  </AdminButton>
                </AdminActionRow>
              </EditorTop>

              {dataLoading ? <AdminHint>베트남 콘텐츠를 불러오는 중입니다.</AdminHint> : renderEditor(draftContent[activeSection], [activeSection], sectionTabs.find((tab) => tab.id === activeSection)?.label ?? String(activeSection))}
              {message ? <AdminHint>{message}</AdminHint> : null}
            </EditorPanel>
          </VietnamAdminLayout>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}

const VietnamAdminLayout = styled.div`
  display: grid;
  grid-template-columns: 220px minmax(0, 1fr);
  gap: 18px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

const SectionRail = styled.nav`
  display: grid;
  align-content: start;
  gap: 6px;
`;

const SectionButton = styled.button`
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid rgba(20, 75, 157, 0.12);
  background: #ffffff;
  color: ${palette.textBody};
  font-size: 0.9rem;
  font-weight: 850;
  text-align: left;
  cursor: pointer;

  &[data-active='true'] {
    border-color: rgba(20, 75, 157, 0.32);
    background: linear-gradient(180deg, rgba(235, 244, 255, 0.98), rgba(228, 239, 255, 0.94));
    color: ${palette.blueDeep};
  }
`;

const EditorPanel = styled.div`
  display: grid;
  gap: 16px;
`;

const EditorGroup = styled.div<{ $depth: number }>`
  display: grid;
  gap: 12px;
  padding: ${({ $depth }) => ($depth === 0 ? '0' : '16px')};
  border: ${({ $depth }) => ($depth === 0 ? '0' : '1px solid rgba(20, 75, 157, 0.12)')};
  background: ${({ $depth }) => ($depth === 0 ? 'transparent' : 'rgba(248, 251, 255, 0.72)')};
`;

const EditorTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

const EditorTitle = styled.h3`
  margin: 0;
  color: ${palette.blueDeep};
  font-size: 1.08rem;
  font-weight: 900;
`;

const FieldStack = styled.div`
  display: grid;
  gap: 14px;
`;

const LanguageGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
`;

const ArrayCard = styled.div`
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid rgba(20, 75, 157, 0.12);
  background: #ffffff;
`;

const ArrayTitle = styled.strong`
  color: ${palette.blueDeep};
  font-size: 0.94rem;
`;
