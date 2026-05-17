import { serviceLandingGroups } from '../data/pageContent';

export type SectionSubnavItem = {
  label: string;
  labelEn: string;
  to: string;
  matchPrefixes?: string[];
  heroImage?: string;
  heroPosition?: string;
};

export type SectionSubnavConfig = {
  kicker: string;
  kickerEn: string;
  title: string;
  titleEn: string;
  summary?: string;
  summaryEn?: string;
  items: SectionSubnavItem[];
};

const getServicePrimaryHref = (groupId: (typeof serviceLandingGroups)[number]['id']) =>
  serviceLandingGroups.find((group) => group.id === groupId)?.primaryHref ?? '/services/import-export';

export const sectionSubnav = {
  about: {
    kicker: 'Shinhan Intro',
    kickerEn: 'Shinhan Intro',
    title: '신한 소개',
    titleEn: 'About Shinhan',
    summary: '1965년부터 이어온 신뢰, 네트워크, 비전과 브랜드 정체성을 소개합니다.',
    summaryEn: 'Explore Shinhan’s trust, network, vision, and brand identity built since 1965.',
    items: [
      { label: '회사소개', labelEn: 'Overview', to: '/about', heroImage: '/hero/menu-about-shinhan-ai.png', heroPosition: 'center 50%' },
      { label: '인사말', labelEn: 'Message', to: '/about/message', heroImage: '/hero/menu-about-message-ai.png', heroPosition: 'center 50%' },
      { label: '연혁', labelEn: 'History', to: '/about/history', heroImage: '/hero/menu-about-history-ai.png', heroPosition: 'center 50%' },
      { label: '본지사 안내', labelEn: 'Headquarters & Branches', to: '/offices', heroImage: '/hero/menu-about-offices-ai.png', heroPosition: 'center 50%' },
    ],
  },
  members: {
    kicker: 'Professionals',
    kickerEn: 'Professionals',
    title: '구성원',
    titleEn: 'Professionals',
    summary: '임원진과 분야별 전문가를 통해 신한의 실무 대응 체계를 확인할 수 있습니다.',
    summaryEn: 'Review Shinhan’s execution system through executives and field-specific experts.',
    items: [
      { label: '임원진', labelEn: 'Executives', to: '/members/executives', heroImage: '/hero/menu-members-executives-ai.png', heroPosition: 'center 50%' },
      { label: '분야별 전문가', labelEn: 'Experts', to: '/members/experts', heroImage: '/hero/menu-members-experts-ai.png', heroPosition: 'center 50%' },
    ],
  },
  services: {
    kicker: 'Practice Areas',
    kickerEn: 'Practice Areas',
    title: '업무분야',
    titleEn: 'Services',
    summary: '통관, 컨설팅, 검역·요건, 특화 서비스까지 업무 체계를 한눈에 확인할 수 있습니다.',
    summaryEn: 'Review the full service system across clearance, consulting, requirements, and specialized support.',
    items: [
      {
        label: '수출입통관 및 환급',
        labelEn: 'Clearance & Refund',
        to: getServicePrimaryHref('clearance-refund'),
        matchPrefixes: ['/services/import-export', '/services/consulting/refund'],
        heroImage: '/hero/menu-services-clearance-ai.png',
        heroPosition: 'center 50%',
      },
      {
        label: '컨설팅',
        labelEn: 'Consulting',
        to: getServicePrimaryHref('consulting'),
        matchPrefixes: [
          '/services/consulting/fta',
          '/services/consulting/aeo',
          '/services/consulting/customs-audit',
          '/services/consulting/foreign-exchange',
          '/services/consulting/acva',
          '/services/consulting/penalty-investigation',
          '/services/consulting/tax-appeal',
        ],
        heroImage: '/hero/menu-services-consulting-ai.png',
        heroPosition: 'center 50%',
      },
      {
        label: '검역·요건',
        labelEn: 'Quarantine / Requirements',
        to: getServicePrimaryHref('quarantine-requirements'),
        matchPrefixes: ['/services/quarantine', '/services/requirements'],
        heroImage: '/hero/menu-services-quarantine-wine-ai.png',
        heroPosition: 'center 50%',
      },
      {
        label: '물류',
        labelEn: 'Logistics',
        to: getServicePrimaryHref('logistics'),
        matchPrefixes: ['/services/logistics'],
        heroImage: '/hero/service-logistics-ai.png',
        heroPosition: 'center 50%',
      },
      {
        label: '베트남',
        labelEn: 'Vietnam',
        to: getServicePrimaryHref('vietnam'),
        matchPrefixes: ['/services/vietnam'],
        heroImage: '/hero/service-vietnam-ai.png',
        heroPosition: 'center 50%',
      },
      {
        label: '미국 FDA',
        labelEn: 'US FDA',
        to: getServicePrimaryHref('us-fda'),
        matchPrefixes: ['/services/us-fda'],
        heroImage: '/hero/service-us-fda-ai.png',
        heroPosition: 'center 50%',
      },
    ],
  },
  it: {
    kicker: 'IT',
    kickerEn: 'IT',
    title: 'IT',
    titleEn: 'IT',
    summary: '관세 업무와 IT 기술을 연결하는 신한의 디지털 실행 역량을 소개합니다.',
    summaryEn: 'Discover Shinhan’s digital execution capabilities connecting customs operations with IT.',
    items: [{ label: 'IT 서비스 소개', labelEn: 'IT Service Overview', to: '/it', heroImage: '/hero/menu-it-ai.png', heroPosition: 'center 50%' }],
  },
  news: {
    kicker: 'News & Resources',
    kickerEn: 'News & Resources',
    title: '소식/자료',
    titleEn: 'News & Resources',
    summary: '신한 NEWS, 세미나/교육, 소식지를 채널별로 확인할 수 있습니다.',
    summaryEn: 'Browse Shinhan NEWS, seminars/training, and newsletters by channel.',
    items: [
      { label: '신한 NEWS', labelEn: 'Shinhan NEWS', to: '/news/shinhan-news', heroImage: '/hero/menu-news-shinhan-ai.png', heroPosition: 'center 50%' },
      { label: '무역 동향', labelEn: 'Trade Insights', to: '/news/issue-report', heroImage: '/hero/menu-news-trade-insights-ai.png', heroPosition: 'center 50%' },
      {
        label: '세미나/교육',
        labelEn: 'Seminar / Training',
        to: '/news/seminar',
        matchPrefixes: ['/news/seminar/'],
        heroImage: '/hero/menu-news-seminar-ai.png',
        heroPosition: 'center 50%',
      },
      {
        label: '소식지',
        labelEn: 'Newsletter',
        to: '/news/newsletter',
        matchPrefixes: ['/news/newsletter/'],
        heroImage: '/hero/menu-news-newsletter-ai.png',
        heroPosition: 'center 50%',
      },
    ],
  },
} satisfies Record<'about' | 'members' | 'services' | 'it' | 'news', SectionSubnavConfig>;
