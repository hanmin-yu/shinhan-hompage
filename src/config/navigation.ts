import { translateKoToEn } from '../i18n/koEnMap';
import type { LinkItem, NavItem, SiteLanguage } from '../types/site';

export const headerNavigation: NavItem[] = [
  {
    id: 'about',
    label: '신한 소개',
    to: '/about',
  },
  {
    id: 'members',
    label: '구성원',
    to: '/members',
  },
  {
    id: 'services',
    label: '업무분야',
    to: '/services',
  },
  {
    id: 'it',
    label: 'IT',
    to: '/it',
  },
  {
    id: 'news',
    label: '소식/자료',
    to: '/news',
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
