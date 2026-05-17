import type { SiteContentGroupKey } from '../../types/site';

export const adminContentGroups: { id: SiteContentGroupKey; label: string; labelEn: string; summary: string; summaryEn: string }[] = [
  {
    id: 'global',
    label: '전역 설정',
    labelEn: 'Global Settings',
    summary: '메뉴, 푸터, 공통 링크, 대표 연락처를 관리합니다.',
    summaryEn: 'Manage navigation, footer, shared links, and contact info.',
  },
  {
    id: 'home',
    label: '홈',
    labelEn: 'Home',
    summary: '메인 비주얼, 이슈, 대표 구성원 소개를 관리합니다.',
    summaryEn: 'Manage the main visuals, updates, and featured people.',
  },
  {
    id: 'about',
    label: '회사소개',
    labelEn: 'About',
    summary: '회사소개, 연혁, 인사말, 위치 안내 문구를 관리합니다.',
    summaryEn: 'Manage about, history, message, and location copy.',
  },
  {
    id: 'services',
    label: '업무분야',
    labelEn: 'Services',
    summary: '업무분야 랜딩과 상세 서비스 콘텐츠를 관리합니다.',
    summaryEn: 'Manage service landing and detailed service content.',
  },
  {
    id: 'recruit',
    label: '채용',
    labelEn: 'Recruit',
    summary: '채용 소개, 직무, 복리후생, 링크를 관리합니다.',
    summaryEn: 'Manage recruiting copy, roles, benefits, and links.',
  },
  {
    id: 'contact',
    label: '문의',
    labelEn: 'Contact',
    summary: '문의 및 부정행위 접수창구 문구를 관리합니다.',
    summaryEn: 'Manage contact and ethics reporting copy.',
  },
  {
    id: 'offices',
    label: '본지사 안내',
    labelEn: 'Offices',
    summary: '사무소/관계사 정보와 본문 문구를 관리합니다.',
    summaryEn: 'Manage office/affiliate info and office page copy.',
  },
  {
    id: 'it',
    label: 'IT',
    labelEn: 'IT',
    summary: 'IT 소개, 서비스, 담당자 연결을 관리합니다.',
    summaryEn: 'Manage IT copy, services, and contact links.',
  },
  {
    id: 'members',
    label: '구성원 설정',
    labelEn: 'Member Settings',
    summary: '전문가 카테고리 배치와 구성원 설정값을 관리합니다.',
    summaryEn: 'Manage expert category assignments and member settings.',
  },
  {
    id: 'legal',
    label: '법적고지',
    labelEn: 'Legal',
    summary: '약관, 개인정보처리방침, 채용면책, 이메일수집거부를 관리합니다.',
    summaryEn: 'Manage terms, privacy, recruiting notice, and email protection copy.',
  },
];
