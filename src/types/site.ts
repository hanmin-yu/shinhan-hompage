export type SiteLanguage = 'ko' | 'en';

export type LinkItem = {
  id: string;
  label: string;
  href?: string;
  to?: string;
};

export type NavItem = LinkItem & {
  sectionId?: string;
  children?: NavItem[];
};

export type Member = {
  name: string;
  phone: string;
  email: string;
  title: string;
  department: string;
  practice: string;
  accent: string;
  image?: string;
};

export type HeroSlide = {
  label: string;
  labelEn?: string;
  eyebrow: string;
  eyebrowEn?: string;
  headline: string;
  headlineEn?: string;
  summary: string;
  summaryEn?: string;
  image: string;
  secondaryImage?: string;
  objectPosition?: string;
  secondaryObjectPosition?: string;
  mobileObjectPosition?: string;
  mobileSecondaryObjectPosition?: string;
  theme: 'deep-blue' | 'light-blue';
};

export type OfficeBranch = {
  id: string;
  label: string;
  shortLabel: string;
  region: string;
  summary: string;
  address: string;
  tel: string;
  fax?: string;
  accent: string;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
};

export type PracticeAreaDetail = {
  id: string;
  title: string;
  body: string;
};

export type IssueReport = {
  id: string;
  source: string;
  publishedAt: string;
  title: string;
  summary: string;
  url: string;
  image?: string;
  tags?: string[];
};

export type ItService = {
  category: string;
  title: string;
  body: string;
};

export type ShinhanNewsItem = {
  id: string;
  category: 'flash' | 'seminar';
  categoryLabel: string;
  title: string;
  summary: string;
  publishedAt: string;
  href: string;
};

export type NewsletterItem = {
  id: string;
  issue: string;
  title: string;
  summary: string;
  publishedAt: string;
  href: string;
  language?: string;
  downloadHref?: string;
};
