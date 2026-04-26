export type SiteLanguage = 'ko' | 'en';

export type LinkItem = {
  id: string;
  label: string;
  href?: string;
  to?: string;
};

export type SiteContact = {
  phone: string;
  email: string;
  address: string;
  addressEn: string;
  businessNumber: string;
};

export type LegalPageSection = {
  title: string;
  titleEn: string;
  paragraphs: string[];
  paragraphsEn: string[];
  bullets?: string[];
  bulletsEn?: string[];
};

export type LegalPageContent = {
  id: 'terms' | 'privacy' | 'recruit-disclaimer' | 'no-email-collection';
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  sections: LegalPageSection[];
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
  labelEn: string;
  shortLabel: string;
  shortLabelEn: string;
  region: string;
  regionEn: string;
  summary: string;
  summaryEn: string;
  address: string;
  addressEn: string;
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
  sourceEn: string;
  publishedAt: string;
  title: string;
  titleEn: string;
  summary: string;
  summaryEn: string;
  url: string;
  status?: 'live' | 'placeholder';
  image?: string;
  tags?: string[];
};

export type ItService = {
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  body: string;
  bodyEn: string;
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
  titleEn: string;
  summary: string;
  summaryEn: string;
  publishedAt: string;
  href: string;
  language?: string;
  languageEn?: string;
  downloadHref?: string;
};
