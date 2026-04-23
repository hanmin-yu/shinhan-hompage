import type { LinkItem, NavItem } from '../types/site';

export const headerNavigation: NavItem[] = [
  {
    id: 'about',
    label: '신한소개',
    href: '#about',
    sectionId: 'about',
    children: [
      { id: 'about-overview', label: '신한소개', href: '#about', sectionId: 'about' },
      { id: 'about-history', label: '연혁', href: '#about', sectionId: 'about' },
      { id: 'about-message', label: '인사말', href: '#about', sectionId: 'about' },
      { id: 'about-offices', label: '오시는 길', href: '#offices', sectionId: 'offices' },
    ],
  },
  {
    id: 'members',
    label: '구성원',
    href: '#members',
    sectionId: 'members',
    children: [
      { id: 'members-org', label: '조직도', href: '#members', sectionId: 'members' },
      { id: 'members-experts', label: '분야별 전문가', href: '#members', sectionId: 'members' },
    ],
  },
  {
    id: 'practice',
    label: '업무분야',
    href: '#practice',
    sectionId: 'practice',
    children: [
      {
        id: 'practice-import-export',
        label: '수출입통관',
        href: '#practice-import-export',
        sectionId: 'practice-import-export',
      },
      {
        id: 'practice-quarantine',
        label: '검역/요건',
        href: '#practice-quarantine',
        sectionId: 'practice-quarantine',
      },
      {
        id: 'practice-consulting-group',
        label: '컨설팅',
        href: '#practice',
        sectionId: 'practice',
        children: [
          { id: 'practice-fta', label: 'FTA', href: '#practice-fta', sectionId: 'practice-fta' },
          { id: 'practice-aeo', label: 'AEO', href: '#practice-aeo', sectionId: 'practice-aeo' },
          {
            id: 'practice-investigation-customs',
            label: '관세조사',
            href: '#practice-investigation',
            sectionId: 'practice-investigation',
          },
          {
            id: 'practice-investigation-forex',
            label: '외환검사/조사',
            href: '#practice-investigation',
            sectionId: 'practice-investigation',
          },
          { id: 'practice-acva', label: 'ACVA', href: '#practice-acva', sectionId: 'practice-acva' },
          {
            id: 'practice-penalty',
            label: '범칙조사',
            href: '#practice-investigation',
            sectionId: 'practice-investigation',
          },
          { id: 'practice-tax', label: '조세불복', href: '#practice-tax', sectionId: 'practice-tax' },
          { id: 'practice-refund', label: '환급', href: '#practice-refund', sectionId: 'practice-refund' },
          {
            id: 'practice-consulting',
            label: '기타 관세무역컨설팅',
            href: '#practice-consulting',
            sectionId: 'practice-consulting',
          },
        ],
      },
      {
        id: 'practice-services-group',
        label: '기타 서비스',
        href: '#practice',
        sectionId: 'practice',
        children: [
          { id: 'practice-logistics', label: '물류', href: '#practice-logistics', sectionId: 'practice-logistics' },
          { id: 'practice-vietnam', label: '베트남', href: '#practice-vietnam', sectionId: 'practice-vietnam' },
          { id: 'practice-fda', label: '미국 FDA', href: '#practice-fda', sectionId: 'practice-fda' },
        ],
      },
    ],
  },
  {
    id: 'it',
    label: 'IT',
    href: '#it',
    sectionId: 'it',
    children: [{ id: 'it-service', label: 'IT 서비스 소개', href: '#it', sectionId: 'it' }],
  },
  {
    id: 'news',
    label: '소식/자료',
    href: '#news',
    sectionId: 'news',
    children: [
      { id: 'issue-report', label: '이슈리포트', href: '#issue-report', sectionId: 'issue-report' },
      { id: 'newsletter', label: '소식지', href: '#news', sectionId: 'news' },
      { id: 'seminar', label: '세미나', href: '#news', sectionId: 'news' },
      { id: 'blog', label: '블로그', href: '#news', sectionId: 'news' },
    ],
  },
  {
    id: 'offices',
    label: '사무소',
    href: '#offices',
    sectionId: 'offices',
    children: [
      { id: 'offices-all', label: '사무소 전체보기', href: '#offices', sectionId: 'offices' },
    ],
  },
  {
    id: 'contact',
    label: '문의',
    href: '#contact',
    sectionId: 'contact',
    children: [
      { id: 'contact-us', label: 'Contact Us', href: '#contact', sectionId: 'contact' },
    ],
  },
];

export const mobileQuickLinks: LinkItem[] = [
  { id: 'consult', label: '상담접수', href: '#contact' },
  { id: 'report', label: '이슈 리포트', href: '#issue-report' },
  { id: 'members', label: '구성원', href: '#members' },
  { id: 'it', label: 'IT', href: '#it' },
  { id: 'directions', label: '오시는 길', href: '#offices' },
];

export const quickMenuLinks = [
  { id: 'online', label: '온라인 상담', href: '#offices', kind: 'online' as const },
  { id: 'kakao', label: '카톡상담', href: '#offices', kind: 'kakao' as const },
  { id: 'phone', label: '전화상담', href: '#offices', kind: 'phone' as const },
];
