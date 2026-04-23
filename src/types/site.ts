export type FontMode = 'nanum' | 'notosans';

export type LinkItem = {
  id: string;
  label: string;
  href: string;
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
  image: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
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
  source: string;
  date: string;
  title: string;
  body: string;
  image: string;
  related: string[];
  tags: string[];
};

export type ItService = {
  category: string;
  title: string;
  body: string;
};

export type NewsItem = {
  category: string;
  title: string;
  body: string;
};

