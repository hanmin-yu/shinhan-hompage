import { serviceLandingGroups } from '../data/pageContent';

export type SectionSubnavItem = {
  label: string;
  labelEn: string;
  to: string;
  matchPrefixes?: string[];
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
      { label: '회사소개', labelEn: 'Overview', to: '/about' },
      { label: '인사말', labelEn: 'Message', to: '/about/message' },
      { label: '연혁', labelEn: 'History', to: '/about/history' },
    ],
  },
  members: {
    kicker: 'Professionals',
    kickerEn: 'Professionals',
    title: '구성원',
    titleEn: 'Professionals',
    summary: '조직 구조와 분야별 전문가를 통해 신한의 실무 대응 체계를 확인할 수 있습니다.',
    summaryEn: 'Review Shinhan’s execution system through its organization and field-specific experts.',
    items: [
      { label: '조직도', labelEn: 'Organization', to: '/members/org' },
      { label: '임원진', labelEn: 'Executives', to: '/members/executives' },
      { label: '분야별 전문가', labelEn: 'Experts', to: '/members/experts' },
    ],
  },
  services: {
    kicker: 'Practice Areas',
    kickerEn: 'Practice Areas',
    title: '업무분야',
    titleEn: 'Services',
    summary: '통관, 검역·요건, 컨설팅, 특화 서비스까지 업무 체계를 한눈에 확인할 수 있습니다.',
    summaryEn: 'Review the full service system across clearance, requirements, consulting, and specialized support.',
    items: [
      {
        label: '수출입통관 및 환급',
        labelEn: 'Clearance & Refund',
        to: getServicePrimaryHref('clearance-refund'),
        matchPrefixes: ['/services/import-export', '/services/consulting/refund'],
      },
      {
        label: '검역·요건',
        labelEn: 'Quarantine / Requirements',
        to: getServicePrimaryHref('quarantine-requirements'),
        matchPrefixes: ['/services/quarantine', '/services/requirements'],
      },
      {
        label: '컨설팅',
        labelEn: 'Consulting',
        to: getServicePrimaryHref('consulting'),
        matchPrefixes: ['/services/consulting/'],
      },
      {
        label: '기타',
        labelEn: 'Specialized',
        to: getServicePrimaryHref('specialized'),
        matchPrefixes: ['/services/logistics', '/services/vietnam', '/services/us-fda'],
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
    items: [{ label: 'IT 서비스 소개', labelEn: 'IT Service Overview', to: '/it' }],
  },
  news: {
    kicker: 'News & Resources',
    kickerEn: 'News & Resources',
    title: '소식/자료',
    titleEn: 'News & Resources',
    summary: '이슈리포트와 주요 소식 리스트를 기관·채널별로 확인할 수 있습니다.',
    summaryEn: 'Browse issue reports and key news lists by institution and channel.',
    items: [
      { label: '이슈리포트', labelEn: 'Issue Reports', to: '/news/issue-report' },
      { label: '신한 NEWS', labelEn: 'Shinhan NEWS', to: '/news/shinhan-news' },
      {
        label: '소식지',
        labelEn: 'Newsletter',
        to: '/news/newsletter',
        matchPrefixes: ['/news/newsletter/'],
      },
    ],
  },
} satisfies Record<'about' | 'members' | 'services' | 'it' | 'news', SectionSubnavConfig>;
