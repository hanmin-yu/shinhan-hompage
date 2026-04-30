import type { SectionSubnavConfig } from './sectionSubnav';

export const utilitySubnav = {
  kicker: 'Shinhan Guide',
  kickerEn: 'Shinhan Guide',
  title: '고객 안내',
  titleEn: 'Client Guide',
  summary: '문의, 채용, 오시는 길 정보를 빠르게 확인할 수 있습니다.',
  summaryEn: 'Find contact, recruiting, and directions information quickly.',
  items: [
    { label: '문의', labelEn: 'Contact', to: '/contact' },
    { label: '채용', labelEn: 'Recruit', to: '/recruit' },
    { label: '오시는 길', labelEn: 'Directions', to: '/location' },
  ],
} satisfies SectionSubnavConfig;
