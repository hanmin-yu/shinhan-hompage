import { translateKoToEn } from '../i18n/koEnMap';
import type { LinkItem, NavItem, SiteLanguage } from '../types/site';

export const headerNavigation: NavItem[] = [
  {
    id: 'about',
    label: '신한 소개',
    to: '/about',
    children: [
      { id: 'about-overview', label: '회사소개', to: '/about' },
      { id: 'about-message', label: '인사말', to: '/about/message' },
      { id: 'about-history', label: '연혁', to: '/about/history' },
      { id: 'about-location', label: '오시는 길', to: '/about/location' },
    ],
  },
  {
    id: 'members',
    label: '구성원',
    to: '/members',
    children: [
      { id: 'members-org', label: '조직도', to: '/members/org' },
      { id: 'members-executives', label: '대표 구성원', to: '/members/executives' },
      { id: 'members-experts', label: '전문가', to: '/members/experts' },
    ],
  },
  {
    id: 'services',
    label: '업무분야',
    to: '/services',
    children: [
      { id: 'service-import', label: '수출입통관', to: '/services/import-export' },
      { id: 'service-quarantine', label: '검역·요건', to: '/services/quarantine' },
      { id: 'service-fta', label: 'FTA', to: '/services/consulting/fta' },
      { id: 'service-aeo', label: 'AEO', to: '/services/consulting/aeo' },
      { id: 'service-audit', label: '관세조사', to: '/services/consulting/customs-audit' },
      { id: 'service-forex', label: '외환검사·조사', to: '/services/consulting/foreign-exchange' },
      { id: 'service-acva', label: 'ACVA', to: '/services/consulting/acva' },
      { id: 'service-tax', label: '조세불복', to: '/services/consulting/tax-appeal' },
      { id: 'service-refund', label: '관세환급', to: '/services/consulting/refund' },
      { id: 'service-logistics', label: '물류서비스', to: '/services/logistics' },
      { id: 'service-vietnam', label: '베트남', to: '/services/vietnam' },
      { id: 'service-fda', label: '미국 FDA', to: '/services/us-fda' },
    ],
  },
  {
    id: 'it',
    label: 'IT',
    to: '/it',
    children: [
      { id: 'it-main', label: '관세·IT 융합 서비스', to: '/it' },
      { id: 'it-customs-view', label: 'Customs View', href: 'https://www.customsview.com' },
    ],
  },
  {
    id: 'news',
    label: '소식/자료',
    to: '/news',
    children: [
      { id: 'news-report', label: '이슈 리포트', to: '/news/issue-report' },
      { id: 'news-shinhan', label: '신한 뉴스', to: '/news/shinhan-news' },
      { id: 'news-newsletter', label: '뉴스레터', to: '/news/newsletter' },
      { id: 'news-seminar', label: '세미나', to: '/news/seminar' },
      { id: 'news-blog', label: '블로그', to: '/news/blog' },
    ],
  },
];

export const mobileQuickLinks: LinkItem[] = [
  { id: 'consult', label: 'Contact US', to: '/contact' },
  { id: 'recruit', label: '채용', to: '/recruit' },
  { id: 'offices', label: '사무소', to: '/offices' },
  { id: 'directions', label: '오시는 길', to: '/about/location' },
];

function localizeLabel(label: string, language: SiteLanguage) {
  return language === 'en' ? translateKoToEn(label) : label;
}

function localizeNavItems(items: NavItem[], language: SiteLanguage): NavItem[] {
  return items.map((item) => ({
    ...item,
    label: localizeLabel(item.label, language),
    children: item.children ? localizeNavItems(item.children, language) : undefined,
  }));
}

export function getHeaderNavigation(language: SiteLanguage) {
  return localizeNavItems(headerNavigation, language);
}

export function getMobileQuickLinks(language: SiteLanguage): LinkItem[] {
  return mobileQuickLinks.map((item) => ({
    ...item,
    label: localizeLabel(item.label, language),
  }));
}
