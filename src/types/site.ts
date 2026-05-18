import type {
  RecruitBenefitGroup,
  RecruitBenefitSummaryCard,
  RecruitPostingLink,
  RecruitRole,
  ServiceDetailContent,
  ServiceLandingGroup,
} from '../data/pageContent';
import type { ShinhanInsight } from '../data/shinhanInsights';

export type SiteLanguage = 'ko' | 'en';
export type NewsAdminMode = 'readonly' | 'enabled';

export type LinkItem = {
  id: string;
  label: string;
  labelEn?: string;
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
  id?: string;
  name: string;
  phone: string;
  email: string;
  title: string;
  department: string;
  practice: string;
  accent: string;
  image?: string;
  imageFit?: 'contain' | 'cover';
  imagePosition?: string;
  careerHighlights?: string[];
};

export type ManagedMemberGroup = 'featured' | 'executive' | 'expert' | 'advisor';

export type ManagedMember = Member & {
  id: string;
  groups: ManagedMemberGroup[];
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
  mobileImage?: string;
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
  mapQuery?: string;
  mapQueryEn?: string;
  naverMapUrl?: string;
  googleMapUrl?: string;
  googleMapEmbedUrl?: string;
  locations?: {
    id: string;
    label: string;
    labelEn: string;
    address: string;
    addressEn: string;
    mapQuery?: string;
    mapQueryEn?: string;
    naverMapUrl?: string;
    googleMapUrl?: string;
    googleMapEmbedUrl?: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  }[];
  shortLabel: string;
  shortLabelEn: string;
  region: string;
  regionEn: string;
  summary: string;
  summaryEn: string;
  address: string;
  addressEn: string;
  tel: string;
  email?: string;
  fax?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  image?: string;
  imagePosition?: string;
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
  detailPath?: string;
  detail?: IssueReportDetail;
  status?: 'live' | 'placeholder';
  image?: string;
  tags?: string[];
};

export type IssueReportAttachment = {
  name: string;
  url: string;
};

export type IssueReportDetail = {
  id?: string;
  title?: string;
  source?: string;
  registeredAt?: string;
  updatedAt?: string;
  body?: string[];
  attachments?: IssueReportAttachment[];
  originalUrl?: string;
};

export type ItService = {
  category: string;
  categoryEn: string;
  title: string;
  titleEn: string;
  summary?: string;
  summaryEn?: string;
  body: string;
  bodyEn: string;
  images?: {
    src: string;
    alt: string;
    altEn?: string;
  }[];
};

export type ShinhanNewsItem = {
  id: string;
  category: 'flash' | 'seminar';
  categoryLabel: string;
  title: string;
  summary: string;
  publishedAt: string;
};

export type ShinhanNewsDetail = {
  author?: string;
  legacyUrl?: string;
  bodyHtml?: string;
};

export type ShinhanNewsRecord = ShinhanNewsItem & {
  titleEn: string;
  summaryEn: string;
  author?: string;
  bodyHtml?: string;
  status: 'published';
  createdAt?: string;
  updatedAt?: string;
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
  downloadUrl?: string;
};

export type NewsletterRecord = NewsletterItem & {
  status: 'published';
  previewManifestUrl?: string | null;
  previewImages?: string[];
  downloadFileName?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type NewsLandingCopy = {
  lead: string;
  leadEn: string;
  introItems: [string, string, string, string];
  introItemsEn: [string, string, string, string];
};

export type ShinhanInsightsPageCopy = {
  searchPlaceholder: string;
  searchPlaceholderEn: string;
  emptyMessage: string;
  emptyMessageEn: string;
  backToListLabel: string;
  backToListLabelEn: string;
};

export type AdminSession = {
  mode: NewsAdminMode;
  isAuthenticated: boolean;
  isReadOnly: boolean;
  username?: string;
};

export type ManagedSectionSubnavItem = {
  label: string;
  labelEn: string;
  to: string;
  matchPrefixes?: string[];
  heroImage?: string;
  heroPosition?: string;
};

export type ManagedSectionSubnavConfig = {
  kicker: string;
  kickerEn: string;
  title: string;
  titleEn: string;
  summary?: string;
  summaryEn?: string;
  items: ManagedSectionSubnavItem[];
};

export type ExpertCategoryConfig = {
  categories: string[];
  assignments: Record<string, string[]>;
  highlights: Record<string, Record<string, string[]>>;
};

export type GlobalNavigationContent = {
  brandMarkPath: string;
  utilityLinks: LinkItem[];
  footerLinks: LinkItem[];
  footerSocialLinks: LinkItem[];
  siteContact: SiteContact;
  footerCopyright: {
    ko: string;
    en: string;
  };
  headerNavigation: NavItem[];
  mobileQuickLinks: LinkItem[];
  sectionSubnav: Record<string, ManagedSectionSubnavConfig>;
  utilitySubnav: ManagedSectionSubnavConfig;
};

export type ServicesLandingCopy = {
  heroTitle: string;
  heroTitleEn: string;
  heroLead: string;
  heroLeadEn: string;
  factLabels: [string, string, string];
  factLabelsEn: [string, string, string];
  serviceMapTitle: string;
  serviceMapTitleEn: string;
  detailTitle: string;
  detailTitleEn: string;
};

export type ConsultingLandingCopy = {
  heroTitle: string;
  heroTitleEn: string;
  heroLead: string;
  heroLeadEn: string;
  sectionTitle: string;
  sectionTitleEn: string;
};

export type AboutOverviewCopy = {
  visualTitle: string;
  visualTitleEn: string;
  heroTitle: string;
  heroTitleEn: string;
  leadParagraphs: [string, string];
  leadParagraphsEn: [string, string];
  factLabels: [string, string, string];
  factLabelsEn: [string, string, string];
  philosophyTitle: string;
  philosophyTitleEn: string;
  philosophyBody: string;
  philosophyBodyEn: string;
  serviceTitle: string;
  serviceTitleEn: string;
};

export type AboutHistoryCopy = {
  heroTitle: string;
  heroTitleEn: string;
  lead: string;
  leadEn: string;
  body: string;
  bodyEn: string;
  factLabels: [string, string, string];
  factLabelsEn: [string, string, string];
  featuredBody: string;
  featuredBodyEn: string;
};

export type AboutMessageCopy = {
  leadTitleTop: string;
  leadTitleTopEn: string;
  leadTitleBottom: string;
  leadTitleBottomEn: string;
  leadHeading: string;
  leadHeadingEn: string;
  introParagraphs: string[];
  introParagraphsEn: string[];
  secondTitle: string;
  secondTitleEn: string;
  secondParagraphs: string[];
  secondParagraphsEn: string[];
  thanks: string;
  thanksEn: string;
};

export type AboutLocationCopy = {
  aboutTitle: string;
  aboutTitleEn: string;
  standaloneTitle: string;
  standaloneTitleEn: string;
};

export type ContactPageCopy = {
  title: string;
  titleEn: string;
  lead: string;
  leadEn: string;
  mainContactTitle: string;
  mainContactTitleEn: string;
  inquiryTitle: string;
  inquiryTitleEn: string;
  inquiryText: string;
  inquiryTextEn: string;
  mainPhone?: string;
  fax?: string;
  email?: string;
  address?: string;
  addressEn?: string;
  businessNumber?: string;
  inquiryEmail?: string;
};

export type EthicsPageCopy = {
  title: string;
  titleEn: string;
  lead: string;
  leadEn: string;
  basisText: string;
  basisTextEn: string;
  policyTitle: string;
  policyTitleEn: string;
  policyNotice: string;
  policyNoticeEn: string;
  onlineTitle: string;
  onlineTitleEn: string;
  onlineText: string;
  onlineTextEn: string;
  reportEmail?: string;
  reportPhone?: string;
};

export type OfficesPageCopy = {
  title: string;
  titleEn: string;
  leadLines: [string, string];
  leadLinesEn: [string, string];
  factLabels: [string, string, string];
  factLabelsEn: [string, string, string];
  primaryGroupTitle: string;
  primaryGroupTitleEn: string;
  affiliateGroupTitle: string;
  affiliateGroupTitleEn: string;
};

export type RecruitPageCopy = {
  title: string;
  titleEn: string;
  rolesTitle: string;
  rolesTitleEn: string;
  benefitsTitle: string;
  benefitsTitleEn: string;
  detailedBenefitsTitle: string;
  detailedBenefitsTitleEn: string;
  applyTitle: string;
  applyTitleEn: string;
};

export type ItPageCopy = {
  overviewTitle: string;
  overviewTitleEn: string;
  contactTitle: string;
  contactTitleEn: string;
};

export type MembersPageCopy = {
  executivesTitle: string;
  executivesTitleEn: string;
  expertsEmptyMessage: string;
  expertsEmptyMessageEn: string;
  orgTitle: string;
  orgTitleEn: string;
};

export type SiteContentPayload = {
  global: GlobalNavigationContent;
  home: {
    heroSlides: HeroSlide[];
    issueReports: IssueReport[];
    practiceAreaDetails: PracticeAreaDetail[];
    copy: Record<string, unknown>;
  };
  news: {
    shinhanInsights: ShinhanInsight[];
    copy: {
      landing: NewsLandingCopy;
      insights: ShinhanInsightsPageCopy;
    };
  };
  about: {
    aboutStrengths: { title: string; body: string }[];
    aboutTimeline: { period: string; year: string; event: string; eventEn: string }[];
    historyMilestones: { year: string; ko: string; en: string }[];
    managementValues: { title: string; body: string }[];
    organizationUnits: { title: string; body: string }[];
    copy: {
      overview: AboutOverviewCopy;
      history: AboutHistoryCopy;
      message: AboutMessageCopy;
      location: AboutLocationCopy;
    };
  };
  services: {
    serviceHubCards: {
      title: string;
      body: string;
      href: string;
    }[];
    consultingHubCards: {
      title: string;
      body: string;
      href: string;
    }[];
    serviceLandingGroups: ServiceLandingGroup[];
    serviceDetailPages: ServiceDetailContent[];
    copy: {
      servicesLanding: ServicesLandingCopy;
      consultingLanding: ConsultingLandingCopy;
    };
  };
  recruit: {
    recruitRoles: RecruitRole[];
    recruitPostingLinks: RecruitPostingLink[];
    recruitBenefitGroups: RecruitBenefitGroup[];
    recruitBenefitDisplayGroups: RecruitBenefitGroup[];
    recruitBenefitSummaryCards: RecruitBenefitSummaryCard[];
    copy: RecruitPageCopy;
  };
  contact: {
    copy: {
      contact: ContactPageCopy;
      ethics: EthicsPageCopy;
    };
  };
  offices: {
    officeBranches: OfficeBranch[];
    copy: OfficesPageCopy;
  };
  it: {
    itOverview: {
      title: string;
      titleEn: string;
      summary: string;
      summaryEn: string;
      body: string;
      bodyEn: string;
    };
    itServices: ItService[];
    contactMemberIds: string[];
    copy: ItPageCopy;
  };
  members: {
    managedMembers: ManagedMember[];
    expertCategoryConfig: ExpertCategoryConfig;
    copy: MembersPageCopy;
  };
  legal: {
    legalPages: Record<LegalPageContent['id'], LegalPageContent>;
  };
};

export type SiteContentGroupKey =
  | 'global'
  | 'home'
  | 'news'
  | 'about'
  | 'services'
  | 'recruit'
  | 'contact'
  | 'offices'
  | 'it'
  | 'members'
  | 'legal';
