import type { LinkItem, NavItem } from '../types/site';

export const headerNavigation: NavItem[] = [
  {
    id: 'about',
    label: '신한 소개',
    href: '/about',
    children: [
      { id: 'about-overview', label: '신한소개', href: '/about' },
      { id: 'about-history', label: '연혁', href: '/about/history' },
      { id: 'about-message', label: '인사말', href: '/about/message' },
      { id: 'about-location', label: '오시는 길', href: '/about/location' },
    ],
  },
  {
    id: 'members',
    label: '구성원',
    href: '/members',
    children: [
      { id: 'members-org', label: '조직도', href: '/members/org' },
      { id: 'members-experts', label: '분야별 전문가', href: '/members/experts' },
    ],
  },
  {
    id: 'services',
    label: '업무분야',
    href: '/services',
    children: [
      { id: 'services-import-export', label: '수출입통관', href: '/services/import-export' },
      {
        id: 'services-quarantine-check',
        label: '검역',
        href: '/services/quarantine-requirements',
      },
      {
        id: 'services-requirements',
        label: '요건',
        href: '/services/quarantine-requirements',
      },
      {
        id: 'services-consulting-fta',
        label: 'FTA',
        href: '/services/consulting/fta',
      },
      { id: 'services-consulting-aeo', label: 'AEO', href: '/services/consulting/aeo' },
      {
        id: 'services-consulting-customs-audit',
        label: '관세조사',
        href: '/services/consulting/customs-audit',
      },
      {
        id: 'services-consulting-foreign-exchange',
        label: '외환검사/조사',
        href: '/services/consulting/foreign-exchange',
      },
      { id: 'services-consulting-acva', label: 'ACVA', href: '/services/consulting/acva' },
      {
        id: 'services-consulting-penalty',
        label: '범칙조사',
        href: '/services/consulting/penalty-investigation',
      },
      {
        id: 'services-consulting-tax-appeal',
        label: '조세불복',
        href: '/services/consulting/tax-appeal',
      },
      { id: 'services-consulting-refund', label: '환급', href: '/services/consulting/refund' },
      {
        id: 'services-consulting-trade',
        label: '기타 관세무역컨설팅',
        href: '/services/consulting/trade-consulting',
      },
      { id: 'services-it', label: 'IT', href: '/it' },
      { id: 'services-logistics', label: '물류', href: '/services/logistics' },
      { id: 'services-vietnam', label: '베트남', href: '/services/vietnam' },
      { id: 'services-us-fda', label: '미국 FDA', href: '/services/us-fda' },
    ],
  },
  {
    id: 'it',
    label: 'IT',
    href: '/it',
    children: [{ id: 'it-overview', label: 'IT 서비스 소개', href: '/it' }],
  },
  {
    id: 'news',
    label: '소식/자료',
    href: '/news',
    children: [
      { id: 'news-issue-report', label: '이슈리포트', href: '/news/issue-report' },
      { id: 'news-newsletter', label: '소식지', href: '/news/newsletter' },
      { id: 'news-seminar', label: '세미나', href: '/news/seminar' },
      { id: 'news-blog', label: '블로그', href: '/news/blog' },
    ],
  },
  {
    id: 'etc',
    label: '기타',
    href: '/offices',
    children: [
      { id: 'offices-all', label: '사무소 전체보기', href: '/offices' },
      { id: 'recruit', label: '채용', href: '/recruit' },
      { id: 'contact-us', label: 'Contact US', href: '/contact' },
    ],
  },
];

export const mobileQuickLinks: LinkItem[] = [
  { id: 'consult', label: '상담접수', href: '/contact' },
  { id: 'report', label: '이슈 리포트', href: '/news/issue-report' },
  { id: 'members', label: '구성원', href: '/members/experts' },
  { id: 'it', label: 'IT', href: '/it' },
  { id: 'directions', label: '오시는 길', href: '/about/location' },
];
