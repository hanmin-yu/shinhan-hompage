import type { SiteContentGroupKey } from '../../types/site';

export const adminContentGroups: { id: SiteContentGroupKey; label: string; labelEn: string; summary: string; summaryEn: string }[] = [
  {
    id: 'home',
    label: '홈',
    labelEn: 'Home',
    summary: '홈 화면에 표시되는 주요 문구를 수정합니다.',
    summaryEn: 'Edit main homepage copy.',
  },
  {
    id: 'about',
    label: '회사소개',
    labelEn: 'About',
    summary: '회사소개, 연혁, 인사말 문구를 수정합니다.',
    summaryEn: 'Edit about, history, and message copy.',
  },
  {
    id: 'services',
    label: '업무분야',
    labelEn: 'Services',
    summary: '업무분야 페이지의 제목과 소개 문구를 수정합니다.',
    summaryEn: 'Edit service page headings and intro copy.',
  },
  {
    id: 'recruit',
    label: '채용',
    labelEn: 'Recruit',
    summary: '채용 페이지 제목과 섹션 문구를 수정합니다.',
    summaryEn: 'Edit recruit page headings and section copy.',
  },
  {
    id: 'contact',
    label: '문의',
    labelEn: 'Contact',
    summary: '문의 및 부정행위 접수창구 문구를 수정합니다.',
    summaryEn: 'Edit contact and ethics page copy.',
  },
  {
    id: 'offices',
    label: '본지사 안내',
    labelEn: 'Offices',
    summary: '본지사 안내 페이지 문구를 수정합니다.',
    summaryEn: 'Edit office page copy.',
  },
  {
    id: 'it',
    label: 'IT',
    labelEn: 'IT',
    summary: 'IT 페이지 문구를 수정합니다.',
    summaryEn: 'Edit IT page copy.',
  },
  {
    id: 'members',
    label: '구성원',
    labelEn: 'Members',
    summary: '임원진과 분야별 전문가를 추가, 수정, 삭제합니다.',
    summaryEn: 'Add, edit, and remove executives and experts.',
  },
];
