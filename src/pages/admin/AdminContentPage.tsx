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
} from './AdminShared';
import { adminContentGroups } from './adminContentConfig';

type GroupResponse = {
  mode: string;
  groupId: SiteContentGroupKey;
  content: unknown;
};

type JsonPath = Array<string | number>;
type RecruitContent = SiteContentPayload['recruit'];
type HomeContent = SiteContentPayload['home'];
type ServicesContent = SiteContentPayload['services'];

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

const PagePreviewFrame = styled.iframe`
  display: block;
  width: 100%;
  height: clamp(620px, 74vh, 860px);
  min-height: 620px;
  border: 1px solid ${palette.line};
  border-radius: 10px;
  background: #ffffff;
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

const homeOperatorSectionEntries: Array<[string, string, string]> = [
  ['heroSlides', '메인 비주얼', 'Main Visuals'],
  ['practice', '업무분야', 'Practice Areas'],
  ['issue', '무역동향', 'Trade Insights'],
  ['newsletter', '소식지', 'Newsletter'],
  ['offices', '사무소', 'Offices'],
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
  headline: '메인 문구',
  headlineEn: '영문 메인 문구',
  eyebrow: '상단 문구',
  eyebrowEn: '영문 상단 문구',
  mobileImage: '모바일 이미지 경로',
  objectPosition: '이미지 위치',
  mobileObjectPosition: '모바일 이미지 위치',
  theme: '화면 톤',
  membersTitle: '대표 구성원 제목',
  membersTitleEn: '영문 대표 구성원 제목',
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

const adminSectionLabelMap: Record<string, string> = {
  overview: '개요',
  history: '연혁',
  message: '인사말',
  location: '오시는 길',
  contact: '문의',
  ethics: '부정행위 접수창구',
  servicesLanding: '업무분야 메인',
  consultingLanding: '컨설팅',
  landing: '소식/자료 메인',
  insights: '신한 Insights',
};

function getAdminSectionLabel(key: string, fallbackLabels: Record<string, string>) {
  return adminSectionLabelMap[key] ?? fallbackLabels[key] ?? formatLabel(key);
}

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
  if (path.length === 0) {
    return Array.isArray(root) ? [...root, item] : [item];
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

function isHomeContent(value: unknown): value is HomeContent {
  return isPlainObject(value) && Array.isArray(value.heroSlides) && isPlainObject(value.copy);
}

function isServicesContent(value: unknown): value is ServicesContent {
  return (
    isPlainObject(value) &&
    Array.isArray(value.serviceDetailPages) &&
    Array.isArray(value.serviceLandingGroups) &&
    isPlainObject(value.copy)
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

function HomeContentEditor({
  content,
  activeSectionKey,
  readOnly,
  setValueAtPath,
  addArrayItem,
  moveArrayItem,
  removeArrayItem,
  t,
}: {
  content: HomeContent;
  activeSectionKey: string;
  readOnly: boolean;
  setValueAtPath: (path: JsonPath, nextValue: unknown) => void;
  addArrayItem: (path: JsonPath, arrayValue: unknown[]) => void;
  moveArrayItem: (path: JsonPath, fromIndex: number, toIndex: number) => void;
  removeArrayItem: (path: JsonPath) => void;
  t: (ko: string, en: string) => string;
}) {
  const copySectionFields: Record<string, Array<[keyof HomeContent['copy'] & string, string]>> = {
    practice: [
      ['practiceGhost', '배경 영문'],
      ['practiceTitle', '제목'],
      ['practiceTitleEn', '영문 제목'],
      ['practiceSummary', '요약 문구'],
      ['practiceSummaryEn', '영문 요약 문구'],
    ],
    issue: [
      ['issueGhost', '배경 영문'],
      ['issueTitle', '제목'],
      ['issueTitleEn', '영문 제목'],
      ['issueViewLabel', '버튼 문구'],
      ['issueViewLabelEn', '영문 버튼 문구'],
    ],
    newsletter: [
      ['newsletterGhost', '배경 영문'],
      ['newsletterTitle', '제목'],
      ['newsletterTitleEn', '영문 제목'],
      ['newsletterViewLabel', '버튼 문구'],
      ['newsletterViewLabelEn', '영문 버튼 문구'],
    ],
    offices: [
      ['officesGhost', '배경 영문'],
      ['officesTitle', '제목'],
      ['officesTitleEn', '영문 제목'],
      ['officesSummary', '요약 문구'],
      ['officesSummaryEn', '영문 요약 문구'],
      ['officesViewLabel', '버튼 문구'],
      ['officesViewLabelEn', '영문 버튼 문구'],
    ],
  };
  const copyDefaults: Record<string, string> = {
    practiceGhost: 'PRACTICE AREAS',
    practiceTitle: '업무 분야',
    practiceTitleEn: 'Practice Areas',
    practiceSummary: '전문 인력의 실무 경험을 바탕으로 수출입통관, 검역·요건, FTA, AEO, 조사 대응과 외환 이슈까지 연결해 대응합니다.',
    practiceSummaryEn:
      'Our professionals connect practical experience across clearance, requirements, FTA, AEO, audit response, and foreign exchange issues.',
    issueGhost: 'TRADE INSIGHTS',
    issueTitle: '무역 동향',
    issueTitleEn: 'Trade Insights',
    issueViewLabel: '무역 동향 전체보기',
    issueViewLabelEn: 'View all Trade Insights',
    newsletterGhost: 'NEWSLETTER',
    newsletterTitle: '소식지',
    newsletterTitleEn: 'Shinhan Newsletter',
    newsletterViewLabel: '소식지 전체보기',
    newsletterViewLabelEn: 'View all Shinhan Newsletters',
    officesGhost: 'OFFICES',
    officesTitle: '사무소',
    officesTitleEn: 'Offices',
    officesSummary: '국내 주요 지사와 베트남 현지 법인을 연결해 고객사의 통관과 물류 현장 가까이에서 대응합니다.',
    officesSummaryEn: 'Our domestic branches and Vietnam office support customs and logistics operations close to client sites.',
    officesViewLabel: '사무소 전체보기',
    officesViewLabelEn: 'View all offices',
  };

  const sectionFields = copySectionFields[activeSectionKey];

  if (sectionFields) {
    return (
      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{homeOperatorSectionEntries.find(([key]) => key === activeSectionKey)?.[1] ?? '홈 섹션'}</OperatorTitle>
            <OperatorHelp>홈 화면 해당 섹션의 제목, 요약, 버튼 문구를 수정합니다.</OperatorHelp>
          </div>
        </OperatorSectionHead>
        <OperatorGrid>
          {sectionFields.map(([key, label]) => (
            <AdminField key={key}>
              <AdminLabel>{label}</AdminLabel>
              {shouldUseTextarea(['copy', key], String(content.copy[key] ?? copyDefaults[key] ?? '')) ? (
                <AdminTextarea
                  value={String(content.copy[key] ?? copyDefaults[key] ?? '')}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['copy', key], event.target.value)}
                />
              ) : (
                <AdminInput
                  value={String(content.copy[key] ?? copyDefaults[key] ?? '')}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['copy', key], event.target.value)}
                />
              )}
            </AdminField>
          ))}
        </OperatorGrid>
      </OperatorSection>
    );
  }

  return (
    <OperatorSection>
      <OperatorSectionHead>
        <div>
          <OperatorTitle>{t('메인 비주얼 문구', 'Main Visual Copy')}</OperatorTitle>
          <OperatorHelp>
            {t('홈 첫 화면 슬라이드의 문구와 이미지 경로를 수정합니다.', 'Edit the copy and image paths for the home hero slides.')}
          </OperatorHelp>
        </div>
        <AdminButton type="button" $secondary onClick={() => addArrayItem(['heroSlides'], content.heroSlides)} disabled={readOnly}>
          슬라이드 추가
        </AdminButton>
      </OperatorSectionHead>
      <OperatorEditor>
        {content.heroSlides.map((slide, index) => (
          <OperatorItemWide key={`home-slide-${index}`}>
            <OperatorItemHead>
              <div>
                <OperatorBadge>{t(`슬라이드 ${index + 1}`, `Slide ${index + 1}`)}</OperatorBadge>
                <OperatorTitle>{slide.label}</OperatorTitle>
              </div>
              <InlineActions>
                <MiniButton type="button" onClick={() => moveArrayItem(['heroSlides'], index, index - 1)} disabled={readOnly || index === 0}>
                  위로
                </MiniButton>
                <MiniButton type="button" onClick={() => moveArrayItem(['heroSlides'], index, index + 1)} disabled={readOnly || index === content.heroSlides.length - 1}>
                  아래로
                </MiniButton>
                <MiniButton type="button" onClick={() => removeArrayItem(['heroSlides', index])} disabled={readOnly || content.heroSlides.length <= 1}>
                  삭제
                </MiniButton>
              </InlineActions>
            </OperatorItemHead>
            <OperatorInline>
              <AdminField>
                <AdminLabel>{t('관리용 이름', 'Admin Label')}</AdminLabel>
                <AdminInput value={slide.label} disabled={readOnly} onChange={(event) => setValueAtPath(['heroSlides', index, 'label'], event.target.value)} />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('영문 관리용 이름', 'English Label')}</AdminLabel>
                <AdminInput
                  value={slide.labelEn ?? ''}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'labelEn'], event.target.value)}
                />
              </AdminField>
            </OperatorInline>
            <OperatorInline>
              <AdminField>
                <AdminLabel>{t('상단 문구', 'Eyebrow')}</AdminLabel>
                <AdminInput value={slide.eyebrow} disabled={readOnly} onChange={(event) => setValueAtPath(['heroSlides', index, 'eyebrow'], event.target.value)} />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('영문 상단 문구', 'English Eyebrow')}</AdminLabel>
                <AdminInput
                  value={slide.eyebrowEn ?? ''}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'eyebrowEn'], event.target.value)}
                />
              </AdminField>
            </OperatorInline>
            <OperatorInline>
              <AdminField>
                <AdminLabel>{t('메인 문구', 'Headline')}</AdminLabel>
                <AdminTextarea
                  value={slide.headline}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'headline'], event.target.value)}
                />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('영문 메인 문구', 'English Headline')}</AdminLabel>
                <AdminTextarea
                  value={slide.headlineEn ?? ''}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'headlineEn'], event.target.value)}
                />
              </AdminField>
            </OperatorInline>
            <OperatorInline>
              <AdminField>
                <AdminLabel>{t('요약 문구', 'Summary')}</AdminLabel>
                <AdminTextarea value={slide.summary} disabled={readOnly} onChange={(event) => setValueAtPath(['heroSlides', index, 'summary'], event.target.value)} />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('영문 요약 문구', 'English Summary')}</AdminLabel>
                <AdminTextarea
                  value={slide.summaryEn ?? ''}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'summaryEn'], event.target.value)}
                />
              </AdminField>
            </OperatorInline>
            <OperatorInline>
              <AdminField>
                <AdminLabel>{t('이미지 경로', 'Image Path')}</AdminLabel>
                <AdminInput value={slide.image} disabled={readOnly} onChange={(event) => setValueAtPath(['heroSlides', index, 'image'], event.target.value)} />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('모바일 이미지 경로', 'Mobile Image Path')}</AdminLabel>
                <AdminInput
                  value={slide.mobileImage ?? ''}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'mobileImage'], event.target.value)}
                />
              </AdminField>
            </OperatorInline>
            <OperatorInline>
              <AdminField>
                <AdminLabel>{t('이미지 위치', 'Image Position')}</AdminLabel>
                <AdminInput
                  value={slide.objectPosition ?? ''}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'objectPosition'], event.target.value)}
                />
              </AdminField>
              <AdminField>
                <AdminLabel>{t('모바일 이미지 위치', 'Mobile Image Position')}</AdminLabel>
                <AdminInput
                  value={slide.mobileObjectPosition ?? ''}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['heroSlides', index, 'mobileObjectPosition'], event.target.value)}
                />
              </AdminField>
            </OperatorInline>
          </OperatorItemWide>
        ))}
      </OperatorEditor>
    </OperatorSection>
  );
}

function TextArrayEditor({
  title,
  items,
  path,
  readOnly,
  setValueAtPath,
  insertItemAtPath,
  moveArrayItem,
  removeArrayItem,
}: {
  title: string;
  items: string[];
  path: JsonPath;
  readOnly: boolean;
  setValueAtPath: (path: JsonPath, nextValue: unknown) => void;
  insertItemAtPath: (path: JsonPath, item: unknown) => void;
  moveArrayItem: (path: JsonPath, fromIndex: number, toIndex: number) => void;
  removeArrayItem: (path: JsonPath) => void;
}) {
  return (
    <OperatorItemWide>
      <OperatorItemHead>
        <OperatorTitle>{title}</OperatorTitle>
        <AdminButton type="button" $secondary onClick={() => insertItemAtPath(path, '')} disabled={readOnly}>
          항목 추가
        </AdminButton>
      </OperatorItemHead>
      <OperatorEditor>
        {items.map((item, index) => (
          <OperatorItem key={`${path.join('.')}-${index}`}>
            <OperatorItemHead>
              <OperatorBadge>{String(index + 1).padStart(2, '0')}</OperatorBadge>
              <InlineActions>
                <MiniButton type="button" onClick={() => moveArrayItem(path, index, index - 1)} disabled={readOnly || index === 0}>
                  위로
                </MiniButton>
                <MiniButton type="button" onClick={() => moveArrayItem(path, index, index + 1)} disabled={readOnly || index === items.length - 1}>
                  아래로
                </MiniButton>
                <MiniButton type="button" onClick={() => removeArrayItem([...path, index])} disabled={readOnly}>
                  삭제
                </MiniButton>
              </InlineActions>
            </OperatorItemHead>
            <AdminTextarea value={item} disabled={readOnly} onChange={(event) => setValueAtPath([...path, index], event.target.value)} />
          </OperatorItem>
        ))}
      </OperatorEditor>
    </OperatorItemWide>
  );
}

function ServicesContentEditor({
  content,
  activeSectionKey,
  readOnly,
  setValueAtPath,
  insertItemAtPath,
  moveArrayItem,
  removeArrayItem,
}: {
  content: ServicesContent;
  activeSectionKey: string;
  readOnly: boolean;
  setValueAtPath: (path: JsonPath, nextValue: unknown) => void;
  insertItemAtPath: (path: JsonPath, item: unknown) => void;
  moveArrayItem: (path: JsonPath, fromIndex: number, toIndex: number) => void;
  removeArrayItem: (path: JsonPath) => void;
}) {
  if (activeSectionKey === 'serviceHubCards' || activeSectionKey === 'consultingHubCards') {
    const cards = content[activeSectionKey];

    return (
      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{activeSectionKey === 'serviceHubCards' ? '업무분야 카드' : '컨설팅 카드'}</OperatorTitle>
            <OperatorHelp>업무분야 상위 화면에 노출되는 카드 문구와 링크를 수정합니다.</OperatorHelp>
          </div>
          <AdminButton type="button" $secondary onClick={() => insertItemAtPath([activeSectionKey], { title: '', body: '', href: '' })} disabled={readOnly}>
            카드 추가
          </AdminButton>
        </OperatorSectionHead>
        <OperatorGrid>
          {cards.map((card, index) => (
            <OperatorItem key={`${activeSectionKey}-${index}`}>
              <OperatorItemHead>
                <OperatorBadge>{String(index + 1).padStart(2, '0')}</OperatorBadge>
                <InlineActions>
                  <MiniButton type="button" onClick={() => moveArrayItem([activeSectionKey], index, index - 1)} disabled={readOnly || index === 0}>
                    위로
                  </MiniButton>
                  <MiniButton type="button" onClick={() => moveArrayItem([activeSectionKey], index, index + 1)} disabled={readOnly || index === cards.length - 1}>
                    아래로
                  </MiniButton>
                  <MiniButton type="button" onClick={() => removeArrayItem([activeSectionKey, index])} disabled={readOnly}>
                    삭제
                  </MiniButton>
                </InlineActions>
              </OperatorItemHead>
              <AdminField>
                <AdminLabel>제목</AdminLabel>
                <AdminInput value={card.title} disabled={readOnly} onChange={(event) => setValueAtPath([activeSectionKey, index, 'title'], event.target.value)} />
              </AdminField>
              <AdminField>
                <AdminLabel>설명</AdminLabel>
                <AdminTextarea value={card.body} disabled={readOnly} onChange={(event) => setValueAtPath([activeSectionKey, index, 'body'], event.target.value)} />
              </AdminField>
              <AdminField>
                <AdminLabel>연결 주소</AdminLabel>
                <AdminInput value={card.href} disabled={readOnly} onChange={(event) => setValueAtPath([activeSectionKey, index, 'href'], event.target.value)} />
              </AdminField>
            </OperatorItem>
          ))}
        </OperatorGrid>
      </OperatorSection>
    );
  }

  if (activeSectionKey === 'serviceLandingGroups') {
    return (
      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>하부 메뉴 구성</OperatorTitle>
            <OperatorHelp>업무분야의 그룹과 세부 메뉴명을 수정합니다.</OperatorHelp>
          </div>
          <AdminButton
            type="button"
            $secondary
            onClick={() =>
              insertItemAtPath(['serviceLandingGroups'], {
                id: 'consulting',
                heading: '',
                headingEn: '',
                title: '',
                titleEn: '',
                primaryHref: '',
                description: '',
                descriptionEn: '',
                image: '',
                items: [],
              })
            }
            disabled={readOnly}
          >
            그룹 추가
          </AdminButton>
        </OperatorSectionHead>
        <OperatorEditor>
          {content.serviceLandingGroups.map((group, groupIndex) => (
            <OperatorItemWide key={`service-menu-group-${groupIndex}`}>
              <OperatorItemHead>
                <div>
                  <OperatorBadge>{group.id}</OperatorBadge>
                  <OperatorTitle>{group.title}</OperatorTitle>
                </div>
                <InlineActions>
                  <MiniButton type="button" onClick={() => moveArrayItem(['serviceLandingGroups'], groupIndex, groupIndex - 1)} disabled={readOnly || groupIndex === 0}>
                    위로
                  </MiniButton>
                  <MiniButton
                    type="button"
                    onClick={() => moveArrayItem(['serviceLandingGroups'], groupIndex, groupIndex + 1)}
                    disabled={readOnly || groupIndex === content.serviceLandingGroups.length - 1}
                  >
                    아래로
                  </MiniButton>
                  <MiniButton type="button" onClick={() => removeArrayItem(['serviceLandingGroups', groupIndex])} disabled={readOnly}>
                    삭제
                  </MiniButton>
                </InlineActions>
              </OperatorItemHead>
              <OperatorGrid>
                <AdminField>
                  <AdminLabel>그룹 ID</AdminLabel>
                  <AdminInput value={group.id} disabled={readOnly} onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'id'], event.target.value)} />
                </AdminField>
                <AdminField>
                  <AdminLabel>상단 라벨</AdminLabel>
                  <AdminInput
                    value={group.heading}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'heading'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>영문 상단 라벨</AdminLabel>
                  <AdminInput
                    value={group.headingEn}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'headingEn'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>제목</AdminLabel>
                  <AdminInput value={group.title} disabled={readOnly} onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'title'], event.target.value)} />
                </AdminField>
                <AdminField>
                  <AdminLabel>영문 제목</AdminLabel>
                  <AdminInput
                    value={group.titleEn}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'titleEn'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>대표 링크</AdminLabel>
                  <AdminInput
                    value={group.primaryHref}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'primaryHref'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>이미지 경로</AdminLabel>
                  <AdminInput value={group.image} disabled={readOnly} onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'image'], event.target.value)} />
                </AdminField>
                <AdminField>
                  <AdminLabel>설명</AdminLabel>
                  <AdminTextarea
                    value={group.description}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'description'], event.target.value)}
                  />
                </AdminField>
                <AdminField>
                  <AdminLabel>영문 설명</AdminLabel>
                  <AdminTextarea
                    value={group.descriptionEn}
                    disabled={readOnly}
                    onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'descriptionEn'], event.target.value)}
                  />
                </AdminField>
              </OperatorGrid>
              <OperatorItemWide>
                <OperatorItemHead>
                  <OperatorTitle>세부 메뉴</OperatorTitle>
                  <AdminButton
                    type="button"
                    $secondary
                    onClick={() => insertItemAtPath(['serviceLandingGroups', groupIndex, 'items'], { label: '', labelEn: '', href: '' })}
                    disabled={readOnly}
                  >
                    메뉴 추가
                  </AdminButton>
                </OperatorItemHead>
                <OperatorGrid>
                  {group.items.map((item, itemIndex) => (
                    <OperatorItem key={`service-menu-${groupIndex}-${itemIndex}`}>
                      <OperatorItemHead>
                        <OperatorBadge>{String(itemIndex + 1).padStart(2, '0')}</OperatorBadge>
                        <InlineActions>
                          <MiniButton
                            type="button"
                            onClick={() => moveArrayItem(['serviceLandingGroups', groupIndex, 'items'], itemIndex, itemIndex - 1)}
                            disabled={readOnly || itemIndex === 0}
                          >
                            위로
                          </MiniButton>
                          <MiniButton
                            type="button"
                            onClick={() => moveArrayItem(['serviceLandingGroups', groupIndex, 'items'], itemIndex, itemIndex + 1)}
                            disabled={readOnly || itemIndex === group.items.length - 1}
                          >
                            아래로
                          </MiniButton>
                          <MiniButton type="button" onClick={() => removeArrayItem(['serviceLandingGroups', groupIndex, 'items', itemIndex])} disabled={readOnly}>
                            삭제
                          </MiniButton>
                        </InlineActions>
                      </OperatorItemHead>
                      <OperatorInline>
                        <AdminField>
                          <AdminLabel>메뉴명</AdminLabel>
                          <AdminInput
                            value={item.label}
                            disabled={readOnly}
                            onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'items', itemIndex, 'label'], event.target.value)}
                          />
                        </AdminField>
                        <AdminField>
                          <AdminLabel>영문 메뉴명</AdminLabel>
                          <AdminInput
                            value={item.labelEn}
                            disabled={readOnly}
                            onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'items', itemIndex, 'labelEn'], event.target.value)}
                          />
                        </AdminField>
                        <AdminField>
                          <AdminLabel>연결 주소</AdminLabel>
                          <AdminInput
                            value={item.href}
                            disabled={readOnly}
                            onChange={(event) => setValueAtPath(['serviceLandingGroups', groupIndex, 'items', itemIndex, 'href'], event.target.value)}
                          />
                        </AdminField>
                      </OperatorInline>
                    </OperatorItem>
                  ))}
                </OperatorGrid>
              </OperatorItemWide>
            </OperatorItemWide>
          ))}
        </OperatorEditor>
      </OperatorSection>
    );
  }

  if (activeSectionKey === 'servicesLanding' || activeSectionKey === 'consultingLanding') {
    const copy = content.copy[activeSectionKey];

    return (
      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{activeSectionKey === 'servicesLanding' ? '업무분야 메인' : '컨설팅 메인'}</OperatorTitle>
            <OperatorHelp>업무분야 상위 화면의 제목과 소개 문구를 수정합니다.</OperatorHelp>
          </div>
        </OperatorSectionHead>
        <OperatorGrid>
          {Object.entries(copy).map(([key, value]) => (
            <AdminField key={key}>
              <AdminLabel>{formatLabel(key)}</AdminLabel>
              {Array.isArray(value) ? (
                <AdminTextarea
                  value={value.join('\n')}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['copy', activeSectionKey, key], event.target.value.split('\n'))}
                />
              ) : shouldUseTextarea(['copy', activeSectionKey, key], String(value ?? '')) ? (
                <AdminTextarea
                  value={String(value ?? '')}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['copy', activeSectionKey, key], event.target.value)}
                />
              ) : (
                <AdminInput
                  value={String(value ?? '')}
                  disabled={readOnly}
                  onChange={(event) => setValueAtPath(['copy', activeSectionKey, key], event.target.value)}
                />
              )}
            </AdminField>
          ))}
        </OperatorGrid>
      </OperatorSection>
    );
  }

  const detailIndex = content.serviceDetailPages.findIndex((page) => `detail:${page.id}` === activeSectionKey);
  const detail = content.serviceDetailPages[detailIndex];

  if (!detail) {
    return <AdminHint>수정할 업무분야 페이지를 선택해주세요.</AdminHint>;
  }

  const basePath: JsonPath = ['serviceDetailPages', detailIndex];

  return (
    <OperatorEditor>
      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>{detail.title}</OperatorTitle>
            <OperatorHelp>상세 업무 페이지의 모든 주요 콘텐츠를 수정합니다.</OperatorHelp>
          </div>
        </OperatorSectionHead>
        <OperatorGrid>
          <AdminField>
            <AdminLabel>페이지 제목</AdminLabel>
            <AdminInput value={detail.title} disabled={readOnly} onChange={(event) => setValueAtPath([...basePath, 'title'], event.target.value)} />
          </AdminField>
          <AdminField>
            <AdminLabel>분류명</AdminLabel>
            <AdminInput value={detail.groupTitle} disabled={readOnly} onChange={(event) => setValueAtPath([...basePath, 'groupTitle'], event.target.value)} />
          </AdminField>
          <AdminField>
            <AdminLabel>영문 분류명</AdminLabel>
            <AdminInput value={detail.groupTitleEn} disabled={readOnly} onChange={(event) => setValueAtPath([...basePath, 'groupTitleEn'], event.target.value)} />
          </AdminField>
          <AdminField>
            <AdminLabel>히어로 이미지 경로</AdminLabel>
            <AdminInput value={detail.heroImage ?? ''} disabled={readOnly} onChange={(event) => setValueAtPath([...basePath, 'heroImage'], event.target.value)} />
          </AdminField>
          <AdminField>
            <AdminLabel>요약</AdminLabel>
            <AdminTextarea value={detail.summary} disabled={readOnly} onChange={(event) => setValueAtPath([...basePath, 'summary'], event.target.value)} />
          </AdminField>
          <AdminField>
            <AdminLabel>부제목</AdminLabel>
            <AdminTextarea value={detail.subtitle ?? ''} disabled={readOnly} onChange={(event) => setValueAtPath([...basePath, 'subtitle'], event.target.value)} />
          </AdminField>
          <AdminField>
            <AdminLabel>개요</AdminLabel>
            <AdminTextarea value={detail.overview} disabled={readOnly} onChange={(event) => setValueAtPath([...basePath, 'overview'], event.target.value)} />
          </AdminField>
        </OperatorGrid>
      </OperatorSection>

      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>핵심 리스트</OperatorTitle>
            <OperatorHelp>상세 페이지의 범위와 체크포인트를 수정합니다.</OperatorHelp>
          </div>
        </OperatorSectionHead>
        <OperatorGrid>
          <TextArrayEditor
            title="주요 범위"
            items={detail.scope}
            path={[...basePath, 'scope']}
            readOnly={readOnly}
            setValueAtPath={setValueAtPath}
            insertItemAtPath={insertItemAtPath}
            moveArrayItem={moveArrayItem}
            removeArrayItem={removeArrayItem}
          />
          <TextArrayEditor
            title="체크포인트"
            items={detail.checkpoints}
            path={[...basePath, 'checkpoints']}
            readOnly={readOnly}
            setValueAtPath={setValueAtPath}
            insertItemAtPath={insertItemAtPath}
            moveArrayItem={moveArrayItem}
            removeArrayItem={removeArrayItem}
          />
        </OperatorGrid>
      </OperatorSection>

      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>세부 콘텐츠 섹션</OperatorTitle>
            <OperatorHelp>페이지 본문에 나오는 제목, 문단, 리스트, 단계형 내용을 수정합니다.</OperatorHelp>
          </div>
          <AdminButton
            type="button"
            $secondary
            onClick={() => insertItemAtPath([...basePath, 'contentSections'], { heading: '새 섹션', headingEn: '', body: [''], list: [], steps: [] })}
            disabled={readOnly}
          >
            섹션 추가
          </AdminButton>
        </OperatorSectionHead>
        <OperatorEditor>
          {(detail.contentSections ?? []).map((section, sectionIndex) => {
            const sectionPath: JsonPath = [...basePath, 'contentSections', sectionIndex];

            return (
              <OperatorItemWide key={`${detail.id}-section-${sectionIndex}`}>
                <OperatorItemHead>
                  <OperatorTitle>{section.heading}</OperatorTitle>
                  <InlineActions>
                    <MiniButton
                      type="button"
                      onClick={() => moveArrayItem([...basePath, 'contentSections'], sectionIndex, sectionIndex - 1)}
                      disabled={readOnly || sectionIndex === 0}
                    >
                      위로
                    </MiniButton>
                    <MiniButton
                      type="button"
                      onClick={() => moveArrayItem([...basePath, 'contentSections'], sectionIndex, sectionIndex + 1)}
                      disabled={readOnly || sectionIndex === (detail.contentSections?.length ?? 0) - 1}
                    >
                      아래로
                    </MiniButton>
                    <MiniButton type="button" onClick={() => removeArrayItem(sectionPath)} disabled={readOnly}>
                      삭제
                    </MiniButton>
                  </InlineActions>
                </OperatorItemHead>
                <OperatorInline>
                  <AdminField>
                    <AdminLabel>섹션 제목</AdminLabel>
                    <AdminInput value={section.heading} disabled={readOnly} onChange={(event) => setValueAtPath([...sectionPath, 'heading'], event.target.value)} />
                  </AdminField>
                  <AdminField>
                    <AdminLabel>영문 섹션 제목</AdminLabel>
                    <AdminInput value={section.headingEn ?? ''} disabled={readOnly} onChange={(event) => setValueAtPath([...sectionPath, 'headingEn'], event.target.value)} />
                  </AdminField>
                </OperatorInline>
                <TextArrayEditor
                  title="본문 문단"
                  items={section.body ?? []}
                  path={[...sectionPath, 'body']}
                  readOnly={readOnly}
                  setValueAtPath={setValueAtPath}
                  insertItemAtPath={insertItemAtPath}
                  moveArrayItem={moveArrayItem}
                  removeArrayItem={removeArrayItem}
                />
                <TextArrayEditor
                  title="리스트"
                  items={section.list ?? []}
                  path={[...sectionPath, 'list']}
                  readOnly={readOnly}
                  setValueAtPath={setValueAtPath}
                  insertItemAtPath={insertItemAtPath}
                  moveArrayItem={moveArrayItem}
                  removeArrayItem={removeArrayItem}
                />
                <TextArrayEditor
                  title="단계"
                  items={section.steps ?? []}
                  path={[...sectionPath, 'steps']}
                  readOnly={readOnly}
                  setValueAtPath={setValueAtPath}
                  insertItemAtPath={insertItemAtPath}
                  moveArrayItem={moveArrayItem}
                  removeArrayItem={removeArrayItem}
                />
              </OperatorItemWide>
            );
          })}
        </OperatorEditor>
      </OperatorSection>

      <OperatorSection>
        <OperatorSectionHead>
          <div>
            <OperatorTitle>연결 정보</OperatorTitle>
            <OperatorHelp>담당자, 관련 전문가, 관련 링크를 수정합니다.</OperatorHelp>
          </div>
        </OperatorSectionHead>
        <OperatorGrid>
          <TextArrayEditor
            title="관련 전문가"
            items={detail.relatedExpertNames}
            path={[...basePath, 'relatedExpertNames']}
            readOnly={readOnly}
            setValueAtPath={setValueAtPath}
            insertItemAtPath={insertItemAtPath}
            moveArrayItem={moveArrayItem}
            removeArrayItem={removeArrayItem}
          />
          <OperatorItemWide>
            <OperatorItemHead>
              <OperatorTitle>담당자</OperatorTitle>
              <AdminButton type="button" $secondary onClick={() => insertItemAtPath([...basePath, 'contactPoints'], { name: '', role: '', phone: '', email: '' })} disabled={readOnly}>
                담당자 추가
              </AdminButton>
            </OperatorItemHead>
            <OperatorEditor>
              {(detail.contactPoints ?? []).map((contact, contactIndex) => (
                <OperatorItem key={`${detail.id}-contact-${contactIndex}`}>
                  <OperatorItemHead>
                    <OperatorBadge>{String(contactIndex + 1).padStart(2, '0')}</OperatorBadge>
                    <InlineActions>
                      <MiniButton type="button" onClick={() => moveArrayItem([...basePath, 'contactPoints'], contactIndex, contactIndex - 1)} disabled={readOnly || contactIndex === 0}>
                        위로
                      </MiniButton>
                      <MiniButton
                        type="button"
                        onClick={() => moveArrayItem([...basePath, 'contactPoints'], contactIndex, contactIndex + 1)}
                        disabled={readOnly || contactIndex === (detail.contactPoints?.length ?? 0) - 1}
                      >
                        아래로
                      </MiniButton>
                      <MiniButton type="button" onClick={() => removeArrayItem([...basePath, 'contactPoints', contactIndex])} disabled={readOnly}>
                        삭제
                      </MiniButton>
                    </InlineActions>
                  </OperatorItemHead>
                  <OperatorInline>
                    <AdminField>
                      <AdminLabel>이름</AdminLabel>
                      <AdminInput
                        value={contact.name}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'contactPoints', contactIndex, 'name'], event.target.value)}
                      />
                    </AdminField>
                    <AdminField>
                      <AdminLabel>직함/역할</AdminLabel>
                      <AdminInput
                        value={contact.role ?? ''}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'contactPoints', contactIndex, 'role'], event.target.value)}
                      />
                    </AdminField>
                    <AdminField>
                      <AdminLabel>전화번호</AdminLabel>
                      <AdminInput
                        value={contact.phone ?? ''}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'contactPoints', contactIndex, 'phone'], event.target.value)}
                      />
                    </AdminField>
                    <AdminField>
                      <AdminLabel>이메일</AdminLabel>
                      <AdminInput
                        value={contact.email ?? ''}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'contactPoints', contactIndex, 'email'], event.target.value)}
                      />
                    </AdminField>
                  </OperatorInline>
                </OperatorItem>
              ))}
            </OperatorEditor>
          </OperatorItemWide>
          <OperatorItemWide>
            <OperatorItemHead>
              <OperatorTitle>관련 링크</OperatorTitle>
              <AdminButton type="button" $secondary onClick={() => insertItemAtPath([...basePath, 'relatedResources'], { label: '', href: '' })} disabled={readOnly}>
                링크 추가
              </AdminButton>
            </OperatorItemHead>
            <OperatorEditor>
              {detail.relatedResources.map((resource, resourceIndex) => (
                <OperatorItem key={`${detail.id}-resource-${resourceIndex}`}>
                  <OperatorItemHead>
                    <OperatorBadge>{String(resourceIndex + 1).padStart(2, '0')}</OperatorBadge>
                    <MiniButton type="button" onClick={() => removeArrayItem([...basePath, 'relatedResources', resourceIndex])} disabled={readOnly}>
                      삭제
                    </MiniButton>
                  </OperatorItemHead>
                  <OperatorInline>
                    <AdminField>
                      <AdminLabel>링크명</AdminLabel>
                      <AdminInput
                        value={resource.label}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'relatedResources', resourceIndex, 'label'], event.target.value)}
                      />
                    </AdminField>
                    <AdminField>
                      <AdminLabel>주소</AdminLabel>
                      <AdminInput
                        value={resource.href}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'relatedResources', resourceIndex, 'href'], event.target.value)}
                      />
                    </AdminField>
                  </OperatorInline>
                </OperatorItem>
              ))}
            </OperatorEditor>
          </OperatorItemWide>
          <OperatorItemWide>
            <OperatorItemHead>
              <OperatorTitle>문서 이미지</OperatorTitle>
              <AdminButton type="button" $secondary onClick={() => insertItemAtPath([...basePath, 'documentImages'], { src: '', alt: '', caption: '' })} disabled={readOnly}>
                이미지 추가
              </AdminButton>
            </OperatorItemHead>
            <OperatorEditor>
              {(detail.documentImages ?? []).map((image, imageIndex) => (
                <OperatorItem key={`${detail.id}-document-image-${imageIndex}`}>
                  <OperatorItemHead>
                    <OperatorBadge>{String(imageIndex + 1).padStart(2, '0')}</OperatorBadge>
                    <MiniButton type="button" onClick={() => removeArrayItem([...basePath, 'documentImages', imageIndex])} disabled={readOnly}>
                      삭제
                    </MiniButton>
                  </OperatorItemHead>
                  <OperatorInline>
                    <AdminField>
                      <AdminLabel>이미지 경로</AdminLabel>
                      <AdminInput
                        value={image.src}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'documentImages', imageIndex, 'src'], event.target.value)}
                      />
                    </AdminField>
                    <AdminField>
                      <AdminLabel>이미지 설명</AdminLabel>
                      <AdminInput
                        value={image.alt}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'documentImages', imageIndex, 'alt'], event.target.value)}
                      />
                    </AdminField>
                    <AdminField>
                      <AdminLabel>캡션</AdminLabel>
                      <AdminInput
                        value={image.caption ?? ''}
                        disabled={readOnly}
                        onChange={(event) => setValueAtPath([...basePath, 'documentImages', imageIndex, 'caption'], event.target.value)}
                      />
                    </AdminField>
                  </OperatorInline>
                </OperatorItem>
              ))}
            </OperatorEditor>
          </OperatorItemWide>
        </OperatorGrid>
      </OperatorSection>
    </OperatorEditor>
  );
}

void PreviewBox;
void PreviewPlaceholder;
void PreviewBlock;
void PreviewList;
void recruitOperatorSectionOrder;
void isRecruitContent;
void RecruitContentEditor;
void RecruitLivePreview;

export function AdminContentPage() {
  const { t } = useI18n();
  const { session, loading, logout } = useAdminSession();
  const params = useParams<{ groupId: SiteContentGroupKey }>();
  const groupId = params.groupId ?? 'global';
  const group = adminContentGroups.find((item) => item.id === groupId);
  const [draftContent, setDraftContent] = useState<unknown>(null);
  const [savedContent, setSavedContent] = useState<unknown>(null);
  const [message, setMessage] = useState('');
  const [selectedSectionKey, setSelectedSectionKey] = useState<string>('');
  const [previewVersion, setPreviewVersion] = useState(0);

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
        const firstKey =
          group.id === 'home' && isHomeContent(nextContent)
            ? 'heroSlides'
            : group.id === 'services' && isServicesContent(nextContent)
              ? 'servicesLanding'
              : isPlainObject(nextContent.copy)
                ? (Object.keys(nextContent.copy)[0] ?? '')
                : '';
        setSelectedSectionKey(firstKey);
      }
      setMessage('');
    })();
  }, [group, session.isAuthenticated]);

  const hasChanges = useMemo(
    () => JSON.stringify(draftContent) !== JSON.stringify(savedContent),
    [draftContent, savedContent],
  );

  const sectionLabels = group ? previewLabelMap[group.id] ?? {} : {};
  const isHomeEditor = group?.id === 'home' && isHomeContent(draftContent);
  const isServicesEditor = group?.id === 'services' && isServicesContent(draftContent);
  const copyRoot = useMemo(() => (isPlainObject(draftContent) && isPlainObject(draftContent.copy) ? draftContent.copy : null), [draftContent]);
  const topLevelEntries = useMemo(
    () => {
      if (isHomeEditor) {
        return homeOperatorSectionEntries.map(([key, label]) => [key, key === 'heroSlides' ? draftContent.heroSlides : draftContent.copy, label] as [string, unknown, string]);
      }

      if (isServicesEditor) {
        return [
          ['servicesLanding', draftContent.copy.servicesLanding, '업무분야 메인'],
          ['consultingLanding', draftContent.copy.consultingLanding, '컨설팅 메인'],
          ['serviceHubCards', draftContent.serviceHubCards, '업무분야 카드'],
          ['consultingHubCards', draftContent.consultingHubCards, '컨설팅 카드'],
          ['serviceLandingGroups', draftContent.serviceLandingGroups, '하부 메뉴 구성'],
          ...draftContent.serviceDetailPages.map((page) => [`detail:${page.id}`, page, page.title] as [string, unknown, string]),
        ] satisfies Array<[string, unknown, string]>;
      }

      return copyRoot ? Object.entries(copyRoot) : [];
    },
    [copyRoot, draftContent, isHomeEditor, isServicesEditor],
  );
  const activeSectionEntry = topLevelEntries.find(([key]) => key === selectedSectionKey) ?? topLevelEntries[0] ?? null;
  const previewPath =
    isServicesEditor && activeSectionEntry?.[0].startsWith('detail:') && isPlainObject(activeSectionEntry[1]) && typeof activeSectionEntry[1].path === 'string'
      ? activeSectionEntry[1].path
      : group
        ? previewPaths[group.id]
        : undefined;
  const previewUrl = previewPath ? `${window.location.origin}${previewPath}?adminPreview=${previewVersion}` : undefined;

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

  const insertItemAtPath = (path: JsonPath, item: unknown) => {
    setDraftContent((current: unknown) => insertArrayItemAtPath(current, path, item));
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
  void renderPreview;

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
              대시보드
            </AdminSubnavLink>
            {adminContentGroups.map((item) => (
              <AdminSubnavLink
                key={item.id}
                to={item.id === 'members' ? '/admin/members' : `/admin/content/${item.id}`}
                $active={item.id === group.id}
              >
                {item.label}
              </AdminSubnavLink>
            ))}
            <AdminSubnavLink to="/admin/news/shinhan-news" $active={false}>
              뉴스/소식지
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
              <P.Kicker>문구 선택</P.Kicker>
              <AdminHint>수정할 문구 영역만 선택합니다.</AdminHint>
              <SectionRail>
                {topLevelEntries.map(([key, value, label]) => (
                  <SectionRailButton
                    key={key}
                    type="button"
                    $active={(activeSectionEntry?.[0] ?? '') === key}
                    onClick={() => setSelectedSectionKey(key)}
                  >
                    <SectionRailTitle>{label ?? getAdminSectionLabel(key, sectionLabels)}</SectionRailTitle>
                    <SectionRailMeta>
                      {Array.isArray(value)
                        ? `${value.length}개 항목`
                        : isPlainObject(value)
                          ? `${Object.keys(value).length}개 필드`
                          : '단일 값'}
                    </SectionRailMeta>
                  </SectionRailButton>
                ))}
              </SectionRail>
            </AdminPanel>

            <AdminPanel>
              <P.Kicker>{t('문구 편집', 'Copy Editor')}</P.Kicker>
              <AdminHint>{t(group.summary, group.summaryEn)}</AdminHint>
              <AdminForm>
                {isHomeEditor ? (
                  <HomeContentEditor
                    content={draftContent}
                    activeSectionKey={activeSectionEntry?.[0] ?? 'heroSlides'}
                    readOnly={session.isReadOnly}
                    setValueAtPath={setValueAtPath}
                    addArrayItem={addArrayItem}
                    moveArrayItem={moveArrayItem}
                    removeArrayItem={removeArrayItem}
                    t={t}
                  />
                ) : isServicesEditor ? (
                  <ServicesContentEditor
                    content={draftContent}
                    activeSectionKey={activeSectionEntry?.[0] ?? 'servicesLanding'}
                    readOnly={session.isReadOnly}
                    setValueAtPath={setValueAtPath}
                    insertItemAtPath={insertItemAtPath}
                    moveArrayItem={moveArrayItem}
                    removeArrayItem={removeArrayItem}
                  />
                ) : activeSectionEntry ? (
                  renderEditor(
                    activeSectionEntry[1],
                    ['copy', activeSectionEntry[0]],
                    getAdminSectionLabel(activeSectionEntry[0], sectionLabels),
                    0,
                  )
                ) : (
                  <AdminHint>{t('이 페이지에는 관리자에서 수정할 문구 필드가 없습니다.', 'This page has no editable copy fields.')}</AdminHint>
                )}
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
                <P.Kicker>{t('실제 페이지 미리보기', 'Live Page Preview')}</P.Kicker>
                {previewUrl ? (
                  <>
                    <AdminActionRow>
                      <PreviewLink href={previewUrl} target="_blank" rel="noreferrer">
                        {t('새 탭에서 크게 보기', 'Open Larger Preview')}
                      </PreviewLink>
                    </AdminActionRow>
                    <PagePreviewFrame
                      key={previewUrl}
                      title={t(`${group.label} 실제 페이지 미리보기`, `${group.labelEn} live page preview`)}
                      src={previewUrl}
                    />
                  </>
                ) : (
                  <AdminHint>{t('이 그룹은 별도 페이지 미리보기를 제공하지 않습니다.', 'This group does not expose a dedicated page preview.')}</AdminHint>
                )}
              </AdminPanel>
            </PreviewShell>
          </CmsLayout>
        </AdminPanel>
      </P.PageContainer>
    </P.PageSection>
  );
}
