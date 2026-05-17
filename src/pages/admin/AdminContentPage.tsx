import styled from '@emotion/styled';
import { Fragment, type ReactNode, useEffect, useMemo, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';

import { palette } from '../../components/home/homeStyles';
import * as P from '../../components/site/PagePrimitives';
import { useAdminSession } from '../../hooks/useAdminSession';
import { useI18n } from '../../i18n/useI18n';
import type { SiteContentGroupKey, SiteContentPayload } from '../../types/site';
import {
  AdminActionRow,
  AdminButton,
  AdminField,
  AdminForm,
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
  AdminUploadBox,
  AdminUploadMeta,
  AdminUploadTitle,
} from './AdminShared';
import { adminContentGroups } from './adminContentConfig';

type GroupResponse = {
  mode: string;
  groupId: SiteContentGroupKey;
  content: unknown;
};

type JsonPath = Array<string | number>;
type RecruitContent = SiteContentPayload['recruit'];

const PreviewShell = styled.div`
  display: grid;
  gap: 16px;
`;

const CmsLayout = styled.div`
  display: grid;
  grid-template-columns: 260px minmax(0, 1fr) minmax(360px, 0.72fr);
  gap: 18px;

  @media (max-width: 1120px) {
    grid-template-columns: 240px minmax(0, 1fr);
  }

  @media (max-width: 980px) {
    grid-template-columns: 1fr;
  }
`;

const SectionRail = styled.div`
  display: grid;
  align-content: start;
  gap: 10px;
`;

const SectionRailButton = styled.button<{ $active?: boolean }>`
  display: grid;
  gap: 4px;
  padding: 14px 16px;
  border: 1px solid ${({ $active }) => ($active ? palette.blue : palette.line)};
  background: ${({ $active }) =>
    $active ? 'linear-gradient(180deg, rgba(234, 243, 255, 0.98), rgba(246, 250, 255, 0.98))' : '#ffffff'};
  text-align: left;
  cursor: pointer;
  box-shadow: ${({ $active }) => ($active ? '0 14px 30px rgba(16, 53, 114, 0.08)' : 'none')};
`;

const SectionRailTitle = styled.strong`
  color: ${palette.blueDeep};
  font-size: 0.94rem;
  font-weight: 800;
  line-height: 1.4;
`;

const SectionRailMeta = styled.span`
  color: ${palette.textMuted};
  font-size: 0.82rem;
  line-height: 1.5;
`;

const NestedGroup = styled.div<{ $depth: number }>`
  display: grid;
  gap: 12px;
  padding: ${({ $depth }) => ($depth === 0 ? '0' : '16px')};
  border: ${({ $depth }) => ($depth === 0 ? '0' : `1px solid ${palette.line}`)};
  background: ${({ $depth }) => ($depth === 0 ? 'transparent' : 'rgba(248, 251, 255, 0.84)')};
`;

const NestedTitle = styled.h3<{ $depth: number }>`
  margin: 0;
  color: ${palette.blueDeep};
  font-size: ${({ $depth }) => ($depth <= 1 ? '1rem' : '0.92rem')};
  font-weight: 800;
  line-height: 1.4;
`;

const ArrayItemCard = styled.div`
  display: grid;
  gap: 12px;
  padding: 16px;
  border: 1px solid ${palette.line};
  background: #ffffff;
`;

const ArrayItemTop = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
`;

const ArrayItemTitle = styled.strong`
  color: ${palette.textPrimary};
  font-size: 0.94rem;
  font-weight: 800;
`;

const InlineActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const MiniButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 34px;
  padding: 0 12px;
  border: 1px solid ${palette.lineStrong};
  background: #ffffff;
  color: ${palette.blueDeep};
  font-size: 0.82rem;
  font-weight: 800;
  cursor: pointer;

  &:disabled {
    opacity: 0.45;
    cursor: default;
  }
`;

const BooleanToggle = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: ${palette.textPrimary};
  font-size: 0.92rem;
  font-weight: 700;
`;

const PreviewBox = styled.div`
  display: grid;
  gap: 14px;
  padding: 18px;
  border: 1px solid ${palette.line};
  background: rgba(255, 255, 255, 0.98);
`;

const PreviewHero = styled.div`
  display: grid;
  gap: 12px;
  padding: 18px;
  border: 1px solid ${palette.line};
  background:
    radial-gradient(circle at top right, rgba(37, 103, 194, 0.08), transparent 28%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.98), rgba(247, 251, 255, 0.96));
`;

const PreviewEyebrow = styled.span`
  color: ${palette.blueDeep};
  font-size: 0.8rem;
  font-weight: 800;
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PreviewHeadline = styled.h3`
  margin: 0;
  color: ${palette.textPrimary};
  font-size: 1.34rem;
  font-weight: 800;
  line-height: 1.28;
`;

const PreviewBlock = styled.div<{ $depth: number }>`
  display: grid;
  gap: 8px;
  padding-left: ${({ $depth }) => ($depth === 0 ? '0' : `${$depth * 12}px`)};
  border-left: ${({ $depth }) => ($depth === 0 ? '0' : `1px solid rgba(20, 75, 157, 0.12)`)};
`;

const PreviewLabel = styled.strong`
  color: ${palette.blueDeep};
  font-size: 0.86rem;
  font-weight: 800;
  line-height: 1.45;
`;

const PreviewValue = styled.div`
  color: ${palette.textBody};
  font-size: 0.92rem;
  line-height: 1.66;
  word-break: keep-all;
  white-space: pre-wrap;
`;

const PreviewList = styled.ul`
  display: grid;
  gap: 8px;
  margin: 0;
  padding-left: 18px;
`;

const PreviewLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border: 1px solid ${palette.blue};
  background: linear-gradient(180deg, ${palette.blue}, #0f3674);
  color: #ffffff;
  font-size: 0.92rem;
  font-weight: 700;
`;

const PreviewPlaceholder = styled.div`
  display: grid;
  gap: 12px;
  place-items: center;
  min-height: 280px;
  padding: 24px;
  border: 1px dashed ${palette.lineStrong};
  background: rgba(255, 255, 255, 0.86);
  text-align: center;
`;

const OperatorEditor = styled.div`
  display: grid;
  gap: 22px;
`;

const OperatorSection = styled.section`
  display: grid;
  gap: 16px;
  padding: 20px;
  border: 1px solid ${palette.line};
  background: #ffffff;
`;

const OperatorSectionHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  justify-content: space-between;
  gap: 14px;
`;

const OperatorTitle = styled.h3`
  margin: 0;
  color: ${palette.blueDeep};
  font-size: 1.08rem;
  font-weight: 850;
  line-height: 1.35;
`;

const OperatorHelp = styled.p`
  margin: 6px 0 0;
  color: ${palette.textMuted};
  font-size: 0.9rem;
  line-height: 1.65;
  word-break: keep-all;
`;

const OperatorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const OperatorItem = styled.div`
  display: grid;
  gap: 14px;
  padding: 16px;
  border: 1px solid ${palette.line};
  background: linear-gradient(180deg, #ffffff, rgba(247, 251, 255, 0.9));
`;

const OperatorItemWide = styled(OperatorItem)`
  grid-column: 1 / -1;
`;

const OperatorItemHead = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

const OperatorBadge = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 28px;
  padding: 0 10px;
  border-radius: 999px;
  background: rgba(37, 103, 194, 0.1);
  color: ${palette.blue};
  font-size: 0.78rem;
  font-weight: 850;
`;

const OperatorInline = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

const TagEditorList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const TagEditorItem = styled.div`
  display: inline-grid;
  grid-template-columns: minmax(120px, 1fr) auto;
  gap: 6px;
  align-items: center;
  max-width: 260px;
  padding: 8px;
  border: 1px solid rgba(37, 103, 194, 0.14);
  border-radius: 999px;
  background: rgba(245, 249, 255, 0.9);
`;

const CompactInput = styled(AdminInput)`
  min-height: 34px;
  padding: 0 10px;
  border-radius: 999px;
  font-size: 0.84rem;
`;

const RecruitPreviewGrid = styled.div`
  display: grid;
  gap: 14px;
`;

const RecruitPreviewChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

const RecruitPreviewChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  padding: 0 11px;
  border-radius: 999px;
  background: rgba(37, 103, 194, 0.1);
  color: ${palette.blueDeep};
  font-size: 0.82rem;
  font-weight: 800;
`;

const RecruitPreviewCard = styled.div`
  display: grid;
  gap: 8px;
  padding: 14px;
  border: 1px solid ${palette.line};
  background: #ffffff;
`;

const previewPaths: Partial<Record<SiteContentGroupKey, string>> = {
  global: '/',
  home: '/',
  news: '/news',
  about: '/about',
  services: '/services',
  recruit: '/recruit',
  contact: '/contact',
  offices: '/offices',
  it: '/it',
  members: '/members',
  legal: '/legal/privacy',
};

const recruitOperatorSectionOrder: Array<keyof RecruitContent> = [
  'copy',
  'recruitRoles',
  'recruitBenefitSummaryCards',
  'recruitBenefitDisplayGroups',
  'recruitPostingLinks',
];

const fieldLabelMap: Record<string, string> = {
  brandMarkPath: '브랜드 로고 경로',
  utilityLinks: '상단 우측 링크',
  footerLinks: '푸터 링크',
  footerSocialLinks: '소셜 링크',
  siteContact: '대표 연락처',
  footerCopyright: '푸터 카피',
  headerNavigation: '상단 메뉴',
  mobileQuickLinks: '모바일 바로가기',
  sectionSubnav: '섹션 서브메뉴',
  utilitySubnav: '고객 안내 서브메뉴',
  label: '한글명',
  labelEn: '영문명',
  title: '제목',
  titleEn: '영문 제목',
  summary: '요약',
  summaryEn: '영문 요약',
  body: '본문',
  bodyEn: '영문 본문',
  copy: '문구 설정',
  items: '하위 항목',
  href: '링크',
  to: '내부 링크',
  image: '이미지 경로',
  imageAlt: '이미지 설명',
  imageAltEn: '영문 이미지 설명',
  heroImage: '히어로 이미지',
  heroPosition: '히어로 이미지 위치',
  titleLines: '제목 라인',
  kicker: '상단 소제목',
  kickerEn: '영문 소제목',
  lead: '리드 문구',
  leadEn: '영문 리드 문구',
  leadLines: '리드 문구 목록',
  leadLinesEn: '영문 리드 문구 목록',
  factLabels: '핵심 지표 라벨',
  factLabelsEn: '영문 핵심 지표 라벨',
  navigation: '네비게이션',
  contactMemberIds: '담당자 연결',
  itServices: 'IT 서비스',
  itOverview: 'IT 소개',
  officeBranches: '본지사/관계사',
  recruitRoles: '모집 직무',
  recruitPostingLinks: '지원 링크',
  recruitBenefitGroups: '복리후생 원본',
  recruitBenefitDisplayGroups: '복리후생 노출 순서',
  recruitBenefitSummaryCards: '대표 복리후생 카드',
  rolesTitle: '모집 직무 제목',
  rolesTitleEn: '영문 모집 직무 제목',
  benefitsTitle: '복리후생 제목',
  benefitsTitleEn: '영문 복리후생 제목',
  detailedBenefitsTitle: '전체 혜택 제목',
  detailedBenefitsTitleEn: '영문 전체 혜택 제목',
  applyTitle: '지원 링크 제목',
  applyTitleEn: '영문 지원 링크 제목',
  serviceHubCards: '업무분야 카드',
  consultingHubCards: '컨설팅 카드',
  serviceLandingGroups: '업무 그룹',
  serviceDetailPages: '상세 서비스',
  managedMembers: '구성원 목록',
  expertCategoryConfig: '전문가 카테고리',
  legalPages: '법적고지 문서',
  issueReports: '무역 동향',
  practiceAreaDetails: '업무 요약',
  heroSlides: '메인 비주얼',
  categories: '카테고리',
  assignments: '전문가 배치',
  highlights: '강조 문구',
  phone: '전화번호',
  email: '이메일',
  address: '주소',
  addressEn: '영문 주소',
  businessNumber: '사업자번호',
  category: '분류',
  categoryEn: '영문 분류',
  accent: '강조 문구',
  accentEn: '영문 강조 문구',
  description: '설명',
  descriptionEn: '영문 설명',
  tags: '태그',
  shortLabel: '짧은 이름',
  shortLabelEn: '영문 짧은 이름',
  region: '권역',
  regionEn: '영문 권역',
  tel: '대표번호',
  fax: '팩스',
  websiteUrl: '웹사이트 주소',
  websiteLabel: '웹사이트 이름',
  locations: '세부 위치',
  mapQuery: '지도 검색어',
  mapQueryEn: '영문 지도 검색어',
  naverMapUrl: '네이버 지도 링크',
  coordinates: '좌표',
  lat: '위도',
  lng: '경도',
  name: '이름',
  department: '부서',
  practice: '전문분야',
  imageFit: '이미지 채움 방식',
  imagePosition: '이미지 위치',
  careerHighlights: '경력 요약',
  groups: '그룹',
  overview: '개요',
  scope: '주요 범위',
  checkpoints: '체크포인트',
  contentSections: '세부 섹션',
  contactPoints: '담당자',
  relatedResources: '관련 링크',
  relatedExpertNames: '연결 전문가',
  issue: '발행 호수',
  publishedAt: '게시일',
};

const previewLabelMap: Partial<Record<SiteContentGroupKey, Record<string, string>>> = {
  global: {
    headerNavigation: '상단 메뉴',
    utilityLinks: '우측 유틸 링크',
    mobileQuickLinks: '모바일 퀵 링크',
    footerLinks: '푸터 링크',
    footerSocialLinks: '소셜 링크',
    siteContact: '대표 연락처',
    utilitySubnav: '유틸 서브메뉴',
  },
  home: {
    heroSlides: '메인 비주얼',
    issueReports: '무역 동향',
    practiceAreaDetails: '업무분야 요약',
    copy: '홈 문구',
  },
  news: {
    shinhanInsights: '신한 Insights',
    copy: '뉴스 페이지 문구',
  },
  about: {
    copy: '페이지 문구',
    aboutTimeline: '연혁 데이터',
    historyMilestones: '주요 연혁',
    managementValues: '경영이념',
    organizationUnits: '조직 소개',
  },
  services: {
    copy: '업무분야 소개 문구',
    serviceHubCards: '업무분야 카드',
    consultingHubCards: '컨설팅 카드',
    serviceLandingGroups: '업무 그룹',
    serviceDetailPages: '상세 서비스',
  },
  recruit: {
    copy: '채용 소개 문구',
    recruitRoles: '모집 직무',
    recruitBenefitSummaryCards: '대표 혜택',
    recruitBenefitDisplayGroups: '전체 혜택',
    recruitPostingLinks: '지원 링크',
  },
  contact: {
    copy: '문의/윤리 접수 문구',
  },
  offices: {
    copy: '본지사 안내 문구',
    officeBranches: '사무소/관계사 목록',
  },
  it: {
    copy: 'IT 페이지 문구',
    itOverview: 'IT 소개',
    itServices: 'IT 서비스',
    contactMemberIds: '담당자 연결',
  },
  members: {
    copy: '구성원 페이지 문구',
    expertCategoryConfig: '전문가 카테고리',
    managedMembers: '구성원 데이터',
  },
  legal: {
    legalPages: '법적고지 문서',
  },
};

function cloneValue<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

function formatLabel(key: string | number) {
  if (typeof key === 'number') {
    return `항목 ${key + 1}`;
  }

  if (fieldLabelMap[key]) {
    return fieldLabelMap[key];
  }

  return key
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/[_-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function shouldUseTextarea(path: JsonPath, value: string) {
  const key = String(path[path.length - 1] ?? '');
  return /title|summary|body|lead|description|text|paragraph|html|notice|message|overview|copyright/i.test(key) || value.length > 90 || value.includes('\n');
}

function updateAtPath(root: unknown, path: JsonPath, nextValue: unknown): unknown {
  if (path.length === 0) {
    return nextValue;
  }

  const [head, ...tail] = path;

  if (Array.isArray(root)) {
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

function moveArrayItemAtPath(root: unknown, path: JsonPath, fromIndex: number, toIndex: number): unknown {
  if (path.length === 0 && Array.isArray(root)) {
    const next = [...root];
    const [item] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, item);
    return next;
  }

  const [head, ...tail] = path;

  if (Array.isArray(root) && typeof head === 'number') {
    return root.map((item, index) => (index === head ? moveArrayItemAtPath(item, tail, fromIndex, toIndex) : item));
  }

  if (isPlainObject(root)) {
    return {
      ...root,
      [head]: moveArrayItemAtPath(root[head], tail, fromIndex, toIndex),
    };
  }

  return root;
}

function createEmptyValue(template: unknown): unknown {
  if (Array.isArray(template)) {
    return [];
  }

  if (isPlainObject(template)) {
    return Object.fromEntries(Object.entries(template).map(([key, value]) => [key, createEmptyValue(value)]));
  }

  if (typeof template === 'number') {
    return 0;
  }

  if (typeof template === 'boolean') {
    return false;
  }

  return '';
}

function getArrayItemDisplayName(item: unknown, index: number) {
  if (isPlainObject(item)) {
    const candidates = [item.title, item.label, item.name, item.heading, item.category, item.issue, item.id];
    const display = candidates.find((value) => typeof value === 'string' && value.trim().length > 0);
    if (display) {
      return String(display);
    }
  }

  if (typeof item === 'string' && item.trim()) {
    return item;
  }

  return `항목 ${index + 1}`;
}

function insertArrayItemAtPath(root: unknown, path: JsonPath, item: unknown): unknown {
  if (path.length === 0 && Array.isArray(root)) {
    return [...root, item];
  }

  const [head, ...tail] = path;

  if (Array.isArray(root) && typeof head === 'number') {
    return root.map((current, index) => (index === head ? insertArrayItemAtPath(current, tail, item) : current));
  }

  if (isPlainObject(root)) {
    return {
      ...root,
      [head]: insertArrayItemAtPath(root[head], tail, item),
    };
  }

  return root;
}

function isRecruitContent(value: unknown): value is RecruitContent {
  return (
    isPlainObject(value) &&
    isPlainObject(value.copy) &&
    Array.isArray(value.recruitRoles) &&
    Array.isArray(value.recruitPostingLinks) &&
    Array.isArray(value.recruitBenefitSummaryCards) &&
    Array.isArray(value.recruitBenefitDisplayGroups)
  );
}

type RecruitEditorProps = {
  content: RecruitContent;
  readOnly: boolean;
  setValueAtPath: (path: JsonPath, nextValue: unknown) => void;
  addArrayItem: (path: JsonPath, arrayValue: unknown[]) => void;
  moveArrayItem: (path: JsonPath, fromIndex: number, toIndex: number) => void;
  removeArrayItem: (path: JsonPath) => void;
  t: (ko: string, en: string) => string;
};

function RecruitContentEditor({
  content,
  readOnly,
  setValueAtPath,
  addArrayItem,
  moveArrayItem,
  removeArrayItem,
  t,
}: RecruitEditorProps) {
  const copyFields: Array<keyof RecruitContent['copy']> = [
    'title',
    'titleEn',
    'rolesTitle',
    'rolesTitleEn',
    'benefitsTitle',
    'benefitsTitleEn',
    'detailedBenefitsTitle',
    'detailedBenefitsTitleEn',
    'applyTitle',
    'applyTitleEn',
  ];

  return (
    <OperatorEditor>
      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{t('채용 페이지 문구', 'Recruit Page Copy')}</OperatorTitle>
            <OperatorHelp>{t('상단 제목과 주요 섹션 제목을 수정합니다.', 'Edit the page title and section headings.')}</OperatorHelp>
          </div>
        </OperatorSectionHead>
        <OperatorGrid>
          {copyFields.map((field) => (
            <AdminField key={field}>
              <AdminLabel>{formatLabel(field)}</AdminLabel>
              <AdminInput
                value={content.copy[field] ?? ''}
                disabled={readOnly}
                onChange={(event) => setValueAtPath(['copy', field], event.target.value)}
              />
            </AdminField>
          ))}
        </OperatorGrid>
      </OperatorSection>

      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{t('모집 직무', 'Open Roles')}</OperatorTitle>
            <OperatorHelp>{t('채용 페이지에 표시되는 직무명을 관리합니다.', 'Manage role labels shown on the recruit page.')}</OperatorHelp>
          </div>
          <AdminButton type="button" $secondary onClick={() => addArrayItem(['recruitRoles'], content.recruitRoles)} disabled={readOnly}>
            {t('직무 추가', 'Add Role')}
          </AdminButton>
        </OperatorSectionHead>
        <OperatorGrid>
          {content.recruitRoles.map((role, index) => (
            <OperatorItem key={`role-${index}`}>
              <OperatorItemHead>
                <OperatorBadge>{String(index + 1).padStart(2, '0')}</OperatorBadge>
                <InlineActions>
                  <MiniButton type="button" onClick={() => moveArrayItem(['recruitRoles'], index, index - 1)} disabled={readOnly || index === 0}>
                    {t('위로', 'Up')}
                  </MiniButton>
                  <MiniButton
                    type="button"
                    onClick={() => moveArrayItem(['recruitRoles'], index, index + 1)}
                    disabled={readOnly || index === content.recruitRoles.length - 1}
                  >
                    {t('아래로', 'Down')}
                  </MiniButton>
                  <MiniButton type="button" onClick={() => removeArrayItem(['recruitRoles', index])} disabled={readOnly}>
                    {t('삭제', 'Delete')}
                  </MiniButton>
                </InlineActions>
              </OperatorItemHead>
              <OperatorInline>
                <AdminField>
                  <AdminLabel>{t('직무명', 'Role')}</AdminLabel>
                  <AdminInput value={role.title} disabled={readOnly} onChange={(event) => setValueAtPath(['recruitRoles', index, 'title'], event.target.value)} />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('영문 직무명', 'English Role')}</AdminLabel>
                  <AdminInput
                    value={role.titleEn}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['recruitRoles', index, 'titleEn'], event.target.value)}
                  />
                </AdminField>
              </OperatorInline>
            </OperatorItem>
          ))}
        </OperatorGrid>
      </OperatorSection>

      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{t('대표 복리후생 카드', 'Featured Benefits')}</OperatorTitle>
            <OperatorHelp>{t('복리후생 상단 3개 카드의 문구와 이미지를 관리합니다.', 'Edit the three featured benefit cards.')}</OperatorHelp>
          </div>
        </OperatorSectionHead>
        <OperatorGrid>
          {content.recruitBenefitSummaryCards.map((card, index) => (
            <OperatorItem key={`benefit-summary-${index}`}>
              <OperatorItemHead>
                <OperatorBadge>{card.accent || t('대표 카드', 'Featured')}</OperatorBadge>
                <InlineActions>
                  <MiniButton
                    type="button"
                    onClick={() => moveArrayItem(['recruitBenefitSummaryCards'], index, index - 1)}
                    disabled={readOnly || index === 0}
                  >
                    {t('위로', 'Up')}
                  </MiniButton>
                  <MiniButton
                    type="button"
                    onClick={() => moveArrayItem(['recruitBenefitSummaryCards'], index, index + 1)}
                    disabled={readOnly || index === content.recruitBenefitSummaryCards.length - 1}
                  >
                    {t('아래로', 'Down')}
                  </MiniButton>
                </InlineActions>
              </OperatorItemHead>
              <OperatorInline>
                <AdminField>
                  <AdminLabel>{t('제목', 'Title')}</AdminLabel>
                  <AdminInput
                    value={card.title}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['recruitBenefitSummaryCards', index, 'title'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('영문 제목', 'English Title')}</AdminLabel>
                  <AdminInput
                    value={card.titleEn}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['recruitBenefitSummaryCards', index, 'titleEn'], event.target.value)}
                  />
                </AdminField>
              </OperatorInline>
              <AdminField>
                <AdminLabel>{t('설명', 'Description')}</AdminLabel>
                <AdminTextarea
                  value={card.description}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['recruitBenefitSummaryCards', index, 'description'], event.target.value)}
                />
              </AdminField>
              <OperatorInline>
                <AdminField>
                  <AdminLabel>{t('강조 라벨', 'Accent')}</AdminLabel>
                  <AdminInput
                    value={card.accent}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['recruitBenefitSummaryCards', index, 'accent'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('이미지 경로', 'Image Path')}</AdminLabel>
                  <AdminInput
                    value={card.image}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['recruitBenefitSummaryCards', index, 'image'], event.target.value)}
                  />
                </AdminField>
              </OperatorInline>
              <AdminField as="div">
                <AdminLabel>{t('태그', 'Tags')}</AdminLabel>
                <TagEditorList>
                  {card.tags.map((tag, tagIndex) => (
                    <TagEditorItem key={`summary-${index}-tag-${tagIndex}`}>
                      <CompactInput
                        value={tag.label}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath(['recruitBenefitSummaryCards', index, 'tags', tagIndex, 'label'], event.target.value)}
                      />
                      <MiniButton type="button" onClick={() => removeArrayItem(['recruitBenefitSummaryCards', index, 'tags', tagIndex])} disabled={readOnly}>
                        {t('삭제', 'Delete')}
                      </MiniButton>
                    </TagEditorItem>
                  ))}
                  <MiniButton type="button" onClick={() => addArrayItem(['recruitBenefitSummaryCards', index, 'tags'], card.tags)} disabled={readOnly}>
                    {t('태그 추가', 'Add Tag')}
                  </MiniButton>
                </TagEditorList>
              </AdminField>
            </OperatorItem>
          ))}
        </OperatorGrid>
      </OperatorSection>

      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{t('전체 혜택 리스트', 'Benefit List')}</OperatorTitle>
            <OperatorHelp>{t('카테고리별 혜택명과 설명을 관리합니다.', 'Edit benefit names and descriptions by category.')}</OperatorHelp>
          </div>
          <AdminButton
            type="button"
            $secondary
            onClick={() => addArrayItem(['recruitBenefitDisplayGroups'], content.recruitBenefitDisplayGroups)}
            disabled={readOnly}
          >
            {t('카테고리 추가', 'Add Category')}
          </AdminButton>
        </OperatorSectionHead>
        {content.recruitBenefitDisplayGroups.map((group, groupIndex) => (
          <OperatorItemWide key={`benefit-group-${groupIndex}`}>
            <OperatorItemHead>
              <div>
                <OperatorBadge>{t(`${group.items.length}개 혜택`, `${group.items.length} benefits`)}</OperatorBadge>
                <OperatorTitle>{group.category || t('혜택 카테고리', 'Benefit Category')}</OperatorTitle>
              </div>
              <InlineActions>
                <MiniButton
                  type="button"
                  onClick={() => moveArrayItem(['recruitBenefitDisplayGroups'], groupIndex, groupIndex - 1)}
                  disabled={readOnly || groupIndex === 0}
                >
                  {t('위로', 'Up')}
                </MiniButton>
                <MiniButton
                  type="button"
                  onClick={() => moveArrayItem(['recruitBenefitDisplayGroups'], groupIndex, groupIndex + 1)}
                  disabled={readOnly || groupIndex === content.recruitBenefitDisplayGroups.length - 1}
                >
                  {t('아래로', 'Down')}
                </MiniButton>
                <MiniButton type="button" onClick={() => removeArrayItem(['recruitBenefitDisplayGroups', groupIndex])} disabled={readOnly}>
                  {t('삭제', 'Delete')}
                </MiniButton>
              </InlineActions>
            </OperatorItemHead>
            <OperatorInline>
              <AdminField>
                <AdminLabel>{t('카테고리명', 'Category')}</AdminLabel>
                <AdminInput
                  value={group.category}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['recruitBenefitDisplayGroups', groupIndex, 'category'], event.target.value)}
                />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('영문 카테고리명', 'English Category')}</AdminLabel>
                <AdminInput
                  value={group.categoryEn}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['recruitBenefitDisplayGroups', groupIndex, 'categoryEn'], event.target.value)}
                />
              </AdminField>
            </OperatorInline>
            <OperatorGrid>
              {group.items.map((item, itemIndex) => (
                <OperatorItem key={`benefit-item-${groupIndex}-${itemIndex}`}>
                  <OperatorItemHead>
                    <OperatorBadge>{String(itemIndex + 1).padStart(2, '0')}</OperatorBadge>
                    <InlineActions>
                      <MiniButton
                        type="button"
                        onClick={() => moveArrayItem(['recruitBenefitDisplayGroups', groupIndex, 'items'], itemIndex, itemIndex - 1)}
                        disabled={readOnly || itemIndex === 0}
                      >
                        {t('위로', 'Up')}
                      </MiniButton>
                      <MiniButton
                        type="button"
                        onClick={() => moveArrayItem(['recruitBenefitDisplayGroups', groupIndex, 'items'], itemIndex, itemIndex + 1)}
                        disabled={readOnly || itemIndex === group.items.length - 1}
                      >
                        {t('아래로', 'Down')}
                      </MiniButton>
                      <MiniButton
                        type="button"
                        onClick={() => removeArrayItem(['recruitBenefitDisplayGroups', groupIndex, 'items', itemIndex])}
                        disabled={readOnly}
                      >
                        {t('삭제', 'Delete')}
                      </MiniButton>
                    </InlineActions>
                  </OperatorItemHead>
                  <OperatorInline>
                    <AdminField>
                      <AdminLabel>{t('혜택명', 'Benefit')}</AdminLabel>
                      <AdminInput
                        value={item.label}
                        disabled={readOnly}
                        onChange={(event) =>
                          setValueAtPath(['recruitBenefitDisplayGroups', groupIndex, 'items', itemIndex, 'label'], event.target.value)
                        }
                      />
                    </AdminField>
                    <AdminField>
                      <AdminLabel>{t('영문 혜택명', 'English Benefit')}</AdminLabel>
                      <AdminInput
                        value={item.labelEn}
                        disabled={readOnly}
                        onChange={(event) =>
                          setValueAtPath(['recruitBenefitDisplayGroups', groupIndex, 'items', itemIndex, 'labelEn'], event.target.value)
                        }
                      />
                    </AdminField>
                  </OperatorInline>
                  <AdminField>
                    <AdminLabel>{t('짧은 설명', 'Short Description')}</AdminLabel>
                    <AdminTextarea
                      value={item.detail}
                      disabled={readOnly}
                      onChange={(event) =>
                        setValueAtPath(['recruitBenefitDisplayGroups', groupIndex, 'items', itemIndex, 'detail'], event.target.value)
                      }
                    />
                  </AdminField>
                </OperatorItem>
              ))}
            </OperatorGrid>
            <AdminActionRow>
              <AdminButton
                type="button"
                $secondary
                onClick={() => addArrayItem(['recruitBenefitDisplayGroups', groupIndex, 'items'], group.items)}
                disabled={readOnly}
              >
                {t('혜택 추가', 'Add Benefit')}
              </AdminButton>
            </AdminActionRow>
          </OperatorItemWide>
        ))}
      </OperatorSection>

      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{t('지원 링크', 'Application Links')}</OperatorTitle>
            <OperatorHelp>{t('하단 채용 바로가기 버튼을 관리합니다.', 'Edit application links shown at the bottom.')}</OperatorHelp>
          </div>
          <AdminButton type="button" $secondary onClick={() => addArrayItem(['recruitPostingLinks'], content.recruitPostingLinks)} disabled={readOnly}>
            {t('링크 추가', 'Add Link')}
          </AdminButton>
        </OperatorSectionHead>
        <OperatorGrid>
          {content.recruitPostingLinks.map((link, index) => (
            <OperatorItem key={`posting-link-${index}`}>
              <OperatorItemHead>
                <OperatorBadge>{String(index + 1).padStart(2, '0')}</OperatorBadge>
                <InlineActions>
                  <MiniButton type="button" onClick={() => removeArrayItem(['recruitPostingLinks', index])} disabled={readOnly}>
                    {t('삭제', 'Delete')}
                  </MiniButton>
                </InlineActions>
              </OperatorItemHead>
              <OperatorInline>
                <AdminField>
                  <AdminLabel>{t('버튼명', 'Button Label')}</AdminLabel>
                  <AdminInput
                    value={link.label}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['recruitPostingLinks', index, 'label'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>{t('영문 버튼명', 'English Label')}</AdminLabel>
                  <AdminInput
                    value={link.labelEn}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['recruitPostingLinks', index, 'labelEn'], event.target.value)}
                  />
                </AdminField>
              </OperatorInline>
              <AdminField>
                <AdminLabel>{t('연결 주소', 'URL')}</AdminLabel>
                <AdminInput value={link.href} disabled={readOnly} onChange={(event) => setValueAtPath(['recruitPostingLinks', index, 'href'], event.target.value)} />
              </AdminField>
            </OperatorItem>
          ))}
        </OperatorGrid>
      </OperatorSection>
    </OperatorEditor>
  );
}

function RecruitLivePreview({ content, t }: { content: RecruitContent; t: (ko: string, en: string) => string }) {
  const totalBenefits = content.recruitBenefitDisplayGroups.reduce((sum, group) => sum + group.items.length, 0);

  return (
    <RecruitPreviewGrid>
      <PreviewHero>
        <PreviewEyebrow>{t('채용', 'Recruit')}</PreviewEyebrow>
        <PreviewHeadline>{content.copy.title}</PreviewHeadline>
        <PreviewValue>{t('신한관세법인은 유능한 인재를 기다립니다.', 'Shinhan Customs Service is looking for exceptional talent.')}</PreviewValue>
      </PreviewHero>
      <RecruitPreviewCard>
        <PreviewLabel>{content.copy.rolesTitle}</PreviewLabel>
        <RecruitPreviewChips>
          {content.recruitRoles.map((role, index) => (
            <RecruitPreviewChip key={`preview-role-${index}`}>{role.title}</RecruitPreviewChip>
          ))}
        </RecruitPreviewChips>
      </RecruitPreviewCard>
      <RecruitPreviewCard>
        <PreviewLabel>{content.copy.benefitsTitle}</PreviewLabel>
        <PreviewValue>{t(`대표 카드 ${content.recruitBenefitSummaryCards.length}개, 전체 혜택 ${totalBenefits}개`, `${content.recruitBenefitSummaryCards.length} featured cards, ${totalBenefits} benefits`)}</PreviewValue>
        <RecruitPreviewChips>
          {content.recruitBenefitSummaryCards.map((card, index) => (
            <RecruitPreviewChip key={`preview-benefit-${index}`}>{card.title}</RecruitPreviewChip>
          ))}
        </RecruitPreviewChips>
      </RecruitPreviewCard>
      <RecruitPreviewCard>
        <PreviewLabel>{content.copy.applyTitle}</PreviewLabel>
        <RecruitPreviewChips>
          {content.recruitPostingLinks.map((link, index) => (
            <RecruitPreviewChip key={`preview-link-${index}`}>{link.label}</RecruitPreviewChip>
          ))}
        </RecruitPreviewChips>
      </RecruitPreviewCard>
    </RecruitPreviewGrid>
  );
}

export function AdminContentPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const params = useParams<{ groupId: SiteContentGroupKey }>();
  const groupId = params.groupId ?? 'global';
  const group = adminContentGroups.find((item) => item.id === groupId);
  const [draftContent, setDraftContent] = useState<unknown>(null);
  const [savedContent, setSavedContent] = useState<unknown>(null);
  const [message, setMessage] = useState('');
  const [assetGroup, setAssetGroup] = useState<string>(groupId);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>('');
  const [previewVersion, setPreviewVersion] = useState(0);

  useEffect(() => {
    setAssetGroup(groupId);
  }, [groupId]);

  useEffect(() => {
    setSelectedSectionKey('');
  }, [groupId]);

  useEffect(() => {
    if (!session.isAuthenticated || !group) {
      return;
    }

    void (async () => {
      const response = await fetch(`/api/admin/content/${group.id}`, {
        credentials: 'same-origin',
      });

      const payload = (await response.json()) as GroupResponse;
      const nextContent = cloneValue(payload.content);
      setDraftContent(nextContent);
      setSavedContent(nextContent);
      if (isPlainObject(nextContent)) {
        const firstKey = group.id === 'recruit' && isRecruitContent(nextContent) ? recruitOperatorSectionOrder[0] : (Object.keys(nextContent)[0] ?? '');
        setSelectedSectionKey(firstKey);
      }
      setMessage('');
    })();
  }, [group, session.isAuthenticated]);

  const hasChanges = useMemo(
    () => JSON.stringify(draftContent) !== JSON.stringify(savedContent),
    [draftContent, savedContent],
  );

  const previewPath = group ? previewPaths[group.id] : undefined;
  const sectionLabels = group ? previewLabelMap[group.id] ?? {} : {};
  const topLevelEntries = useMemo(
    () => {
      if (group?.id === 'recruit' && isRecruitContent(draftContent)) {
        return recruitOperatorSectionOrder.map((key) => [key, draftContent[key]] as [string, unknown]);
      }

      return isPlainObject(draftContent) ? Object.entries(draftContent) : [];
    },
    [draftContent, group?.id],
  );
  const isRecruitEditor = group?.id === 'recruit' && isRecruitContent(draftContent);
  const activeSectionEntry = topLevelEntries.find(([key]) => key === selectedSectionKey) ?? topLevelEntries[0] ?? null;

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

  if (!group) {
    return <Navigate to="/admin" replace />;
  }

  const setValueAtPath = (path: JsonPath, nextValue: unknown) => {
    setDraftContent((current: unknown) => updateAtPath(current, path, nextValue));
  };

  const addArrayItem = (path: JsonPath, arrayValue: unknown[]) => {
    const template = arrayValue[0];
    setDraftContent((current: unknown) => insertArrayItemAtPath(current, path, createEmptyValue(template)));
  };

  const moveArrayItem = (path: JsonPath, fromIndex: number, toIndex: number) => {
    setDraftContent((current: unknown) => moveArrayItemAtPath(current, path, fromIndex, toIndex));
  };

  const removeArrayItem = (path: JsonPath) => {
    setDraftContent((current: unknown) => removeAtPath(current, path));
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`/api/admin/content/${group.id}`, {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: draftContent }),
      });

      const payload = (await response.json()) as GroupResponse & { message?: string };

      if (!response.ok) {
        throw new Error(payload.message ?? '저장에 실패했습니다.');
      }

      const nextContent = cloneValue(payload.content);
      setDraftContent(nextContent);
      setSavedContent(nextContent);
      setPreviewVersion((current) => current + 1);
      setMessage(t('저장되었습니다.', 'Saved.'));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t('저장에 실패했습니다.', 'Save failed.'));
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage(t('업로드할 이미지를 선택해주세요.', 'Select an image to upload.'));
      return;
    }

    const formData = new FormData();
    formData.append('group', assetGroup);
    formData.append('file', selectedFile);

    const response = await fetch('/api/admin/assets/upload', {
      method: 'POST',
      credentials: 'same-origin',
      body: formData,
    });

    const payload = (await response.json()) as { url?: string; message?: string };

    if (!response.ok || !payload.url) {
      setMessage(payload.message ?? t('이미지 업로드에 실패했습니다.', 'Image upload failed.'));
      return;
    }

    setMessage(`${t('업로드 완료', 'Uploaded')}: ${payload.url}`);
    setSelectedFile(null);
  };

  const renderEditor = (value: unknown, path: JsonPath, label: string, depth = 0): ReactNode => {
    if (Array.isArray(value)) {
      return (
        <NestedGroup key={path.join('.')} $depth={depth}>
          <NestedTitle $depth={depth}>{label}</NestedTitle>
          {value.map((item, index) => (
            <ArrayItemCard key={`${path.join('.')}-${index}`}>
              <ArrayItemTop>
                <ArrayItemTitle>{getArrayItemDisplayName(item, index)}</ArrayItemTitle>
                <InlineActions>
                  <MiniButton type="button" onClick={() => moveArrayItem(path, index, index - 1)} disabled={index === 0 || session.isReadOnly}>
                    {t('위로', 'Up')}
                  </MiniButton>
                  <MiniButton
                    type="button"
                    onClick={() => moveArrayItem(path, index, index + 1)}
                    disabled={index === value.length - 1 || session.isReadOnly}
                  >
                    {t('아래로', 'Down')}
                  </MiniButton>
                  <MiniButton type="button" onClick={() => removeArrayItem([...path, index])} disabled={session.isReadOnly}>
                    {t('삭제', 'Delete')}
                  </MiniButton>
                </InlineActions>
              </ArrayItemTop>
              {renderEditor(item, [...path, index], getArrayItemDisplayName(item, index), depth + 1)}
            </ArrayItemCard>
          ))}
          <AdminActionRow>
            <AdminButton type="button" $secondary onClick={() => addArrayItem(path, value)} disabled={session.isReadOnly}>
              {t('항목 추가', 'Add Item')}
            </AdminButton>
          </AdminActionRow>
        </NestedGroup>
      );
    }

    if (isPlainObject(value)) {
      return (
        <NestedGroup key={path.join('.')} $depth={depth}>
          {depth > 0 ? <NestedTitle $depth={depth}>{label}</NestedTitle> : null}
          {Object.entries(value).map(([entryKey, entryValue]) => (
            <Fragment key={`${path.join('.')}-${entryKey}`}>
              {renderEditor(entryValue, [...path, entryKey], formatLabel(entryKey), depth + 1)}
            </Fragment>
          ))}
        </NestedGroup>
      );
    }

    if (typeof value === 'boolean') {
      return (
        <AdminField as="div" key={path.join('.')}>
          <AdminLabel>{label}</AdminLabel>
          <BooleanToggle>
            <input
              type="checkbox"
              checked={value}
              disabled={session.isReadOnly}
              onChange={(event) => setValueAtPath(path, event.target.checked)}
            />
            <span>{value ? t('사용', 'Enabled') : t('미사용', 'Disabled')}</span>
          </BooleanToggle>
        </AdminField>
      );
    }

    if (typeof value === 'number') {
      return (
        <AdminField key={path.join('.')}>
          <AdminLabel>{label}</AdminLabel>
          <AdminInput
            type="number"
            value={String(value)}
            disabled={session.isReadOnly}
            onChange={(event) => setValueAtPath(path, Number(event.target.value))}
          />
        </AdminField>
      );
    }

    const stringValue = typeof value === 'string' ? value : '';

    return (
      <AdminField key={path.join('.')}>
        <AdminLabel>{label}</AdminLabel>
        {shouldUseTextarea(path, stringValue) ? (
          <AdminTextarea value={stringValue} disabled={session.isReadOnly} onChange={(event) => setValueAtPath(path, event.target.value)} />
        ) : (
          <AdminInput value={stringValue} disabled={session.isReadOnly} onChange={(event) => setValueAtPath(path, event.target.value)} />
        )}
      </AdminField>
    );
  };

  const renderPreview = (value: unknown, label: string, depth = 0): ReactNode => {
    if (Array.isArray(value)) {
      return (
        <PreviewBlock key={`${label}-${depth}`} $depth={depth}>
          <PreviewLabel>{label}</PreviewLabel>
          <PreviewList>
            {value.map((item, index) => (
              <li key={`${label}-${index}`}>{renderPreview(item, `${formatLabel(label)} ${index + 1}`, depth + 1)}</li>
            ))}
          </PreviewList>
        </PreviewBlock>
      );
    }

    if (isPlainObject(value)) {
      return (
        <PreviewBlock key={`${label}-${depth}`} $depth={depth}>
          {depth > 0 ? <PreviewLabel>{label}</PreviewLabel> : null}
          {Object.entries(value).map(([entryKey, entryValue]) => (
            <Fragment key={`${label}-${entryKey}`}>{renderPreview(entryValue, formatLabel(entryKey), depth + 1)}</Fragment>
          ))}
        </PreviewBlock>
      );
    }

    return (
      <PreviewBlock key={`${label}-${depth}`} $depth={depth}>
        <PreviewLabel>{label}</PreviewLabel>
        <PreviewValue>{typeof value === 'string' || typeof value === 'number' ? String(value) : value ? 'true' : 'false'}</PreviewValue>
      </PreviewBlock>
    );
  };

  const previewHeadline = activeSectionEntry ? (sectionLabels[activeSectionEntry[0]] ?? formatLabel(activeSectionEntry[0])) : t(group.label, group.labelEn);
  const previewSummary = activeSectionEntry
    ? t(
        '현재 선택한 섹션의 구조와 문구를 카드 형태로 확인할 수 있습니다.',
        'Review the selected section as cards and structured copy.',
      )
    : t('수정할 섹션을 선택하면 미리보기가 표시됩니다.', 'Choose a section to display its preview.');

  return (
    <P.PageSection tone="soft">
      <P.PageContainer data-reveal>
        <AdminPanel>
          <AdminTopRow>
            <div>
              <P.Kicker>Admin</P.Kicker>
              <P.SectionTitle>{t(group.label, group.labelEn)}</P.SectionTitle>
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
              {t('대시보드', 'Dashboard')}
            </AdminSubnavLink>
            {adminContentGroups.map((item) => (
              <AdminSubnavLink
                key={item.id}
                to={item.id === 'members' ? '/admin/members' : `/admin/content/${item.id}`}
                $active={item.id === group.id}
              >
                {t(item.label, item.labelEn)}
              </AdminSubnavLink>
            ))}
            <AdminSubnavLink to="/admin/news/shinhan-news" $active={false}>
              {t('뉴스/소식지', 'News / Newsletter')}
            </AdminSubnavLink>
          </AdminSubnav>

          {session.isReadOnly ? (
            <AdminReadonlyBanner>
              {t(
                '읽기 전용 모드에서는 내용을 확인할 수 있지만 저장과 업로드는 비활성화됩니다.',
                'You can review content in read-only mode, but saves and uploads are disabled.',
              )}
            </AdminReadonlyBanner>
          ) : null}

          <CmsLayout>
            <AdminPanel>
              <P.Kicker>{t('섹션 선택', 'Sections')}</P.Kicker>
              <AdminHint>{t('페이지를 구성하는 주요 블록을 선택해 수정합니다.', 'Select the content block you want to edit.')}</AdminHint>
              <SectionRail>
                {topLevelEntries.map(([key, value]) => (
                  <SectionRailButton
                    key={key}
                    type="button"
                    $active={(activeSectionEntry?.[0] ?? '') === key}
                    onClick={() => setSelectedSectionKey(key)}
                  >
                    <SectionRailTitle>{sectionLabels[key] ?? formatLabel(key)}</SectionRailTitle>
                    <SectionRailMeta>
                      {Array.isArray(value)
                        ? t(`${value.length}개 항목`, `${value.length} items`)
                        : isPlainObject(value)
                          ? t(`${Object.keys(value).length}개 필드`, `${Object.keys(value).length} fields`)
                          : t('단일 값', 'Single value')}
                    </SectionRailMeta>
                  </SectionRailButton>
                ))}
              </SectionRail>
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>{t('콘텐츠 편집', 'Content Editor')}</P.Kicker>
              <AdminHint>
                {isRecruitEditor
                  ? t('운영자가 바로 수정할 수 있도록 채용 페이지 항목을 폼으로 나눴습니다.', 'Recruit content is split into operator-friendly forms.')
                  : t(group.summary, group.summaryEn)}
              </AdminHint>
              <AdminForm>
                {isRecruitEditor ? (
                  <RecruitContentEditor
                    content={draftContent}
                    readOnly={session.isReadOnly}
                    setValueAtPath={setValueAtPath}
                    addArrayItem={addArrayItem}
                    moveArrayItem={moveArrayItem}
                    removeArrayItem={removeArrayItem}
                    t={t}
                  />
                ) : activeSectionEntry ? (
                  renderEditor(activeSectionEntry[1], [activeSectionEntry[0]], sectionLabels[activeSectionEntry[0]] ?? formatLabel(activeSectionEntry[0]), 0)
                ) : null}
                <AdminActionRow>
                  <AdminButton type="button" onClick={() => void handleSave()} disabled={session.isReadOnly || !hasChanges}>
                    {t('저장', 'Save')}
                  </AdminButton>
                  <AdminButton type="button" $secondary onClick={() => setDraftContent(cloneValue(savedContent))}>
                    {t('되돌리기', 'Reset')}
                  </AdminButton>
                </AdminActionRow>
                {message ? <AdminHint>{message}</AdminHint> : null}
              </AdminForm>
            </AdminPanel>

            <PreviewShell>
              <AdminPanel>
                <P.Kicker>{t('실시간 미리보기', 'Live Preview')}</P.Kicker>
                {isRecruitEditor ? (
                  <RecruitLivePreview content={draftContent} t={t} />
                ) : (
                  <>
                    <PreviewHero>
                      <PreviewEyebrow>{t(group.label, group.labelEn)}</PreviewEyebrow>
                      <PreviewHeadline>{previewHeadline}</PreviewHeadline>
                      <PreviewValue>{previewSummary}</PreviewValue>
                    </PreviewHero>
                    <PreviewBox>
                      {activeSectionEntry ? renderPreview(activeSectionEntry[1], sectionLabels[activeSectionEntry[0]] ?? formatLabel(activeSectionEntry[0]), 0) : null}
                    </PreviewBox>
                  </>
                )}
              </AdminPanel>

              <AdminPanel>
                <P.Kicker>{t('페이지 미리보기', 'Page Preview')}</P.Kicker>
                {previewPath ? (
                  <>
                    <AdminActionRow>
                      <PreviewLink href={`${previewPath}?adminPreview=${previewVersion}`} target="_blank" rel="noreferrer">
                        {t('새 탭에서 보기', 'Open in New Tab')}
                      </PreviewLink>
                    </AdminActionRow>
                    <PreviewPlaceholder>
                      <PreviewValue>
                        {t(
                          '실제 페이지는 새 탭에서 바로 확인할 수 있습니다. 저장 후 새 탭 미리보기로 확인해 주세요.',
                          'Open the real page in a new tab. Save first, then verify the visual result there.',
                        )}
                      </PreviewValue>
                    </PreviewPlaceholder>
                  </>
                ) : (
                  <AdminHint>{t('이 그룹은 별도 페이지 미리보기를 제공하지 않습니다.', 'This group does not expose a dedicated page preview.')}</AdminHint>
                )}
              </AdminPanel>

              <AdminPanel>
                <P.Kicker>{t('이미지 업로드', 'Asset Upload')}</P.Kicker>
                <AdminHint>
                  {t(
                    '주요 페이지 이미지와 구성원 사진은 업로드 후 반환된 경로를 관련 이미지 필드에 넣어 연결합니다.',
                    'Upload hero/member images here, then paste the returned path into the related image field.',
                  )}
                </AdminHint>
                <AdminForm>
                  <AdminField>
                    <AdminLabel>{t('저장 폴더 그룹', 'Asset Group')}</AdminLabel>
                    <AdminInput value={assetGroup} onChange={(event) => setAssetGroup(event.target.value)} />
                  </AdminField>
                  <AdminUploadBox $active={Boolean(selectedFile)} $disabled={session.isReadOnly}>
                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp,image/gif"
                      disabled={session.isReadOnly}
                      onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
                    />
                    <AdminUploadTitle>{selectedFile ? selectedFile.name : t('이미지 선택', 'Select Image')}</AdminUploadTitle>
                    <AdminUploadMeta>{t('PNG, JPG, WEBP, GIF 업로드 가능', 'PNG, JPG, WEBP, GIF supported')}</AdminUploadMeta>
                  </AdminUploadBox>
                  <AdminActionRow>
                    <AdminButton type="button" onClick={() => void handleUpload()} disabled={session.isReadOnly || !selectedFile}>
                      {t('업로드', 'Upload')}
                    </AdminButton>
                  </AdminActionRow>
                </AdminForm>
              </AdminPanel>
            </PreviewShell>
          </CmsLayout>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
