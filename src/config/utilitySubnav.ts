import type { SectionSubnavConfig } from './sectionSubnav';

export const utilitySubnav = {
  kicker: 'Shinhan Guide',
  kickerEn: 'Shinhan Guide',
  title: '고객 안내',
  titleEn: 'Client Guide',
  summary: '문의, 채용, 오시는 길 정보를 빠르게 확인할 수 있습니다.',
  summaryEn: 'Find contact, recruiting, and directions information quickly.',
  items: [
    { label: '문의', labelEn: 'Contact', to: '/contact', heroImage: '/hero/menu-utility-contact-ai.png', heroPosition: 'center 50%' },
    { label: '부정행위 접수창구', labelEn: 'Ethics Reporting', to: '/contact/ethics', heroImage: '/hero/menu-utility-ethics-ai.png', heroPosition: 'center 50%' },
    { label: '채용', labelEn: 'Recruit', to: '/recruit', heroImage: '/hero/menu-utility-recruit-ai.png', heroPosition: 'center 50%' },
    { label: '오시는 길', labelEn: 'Directions', to: '/location', heroImage: '/hero/menu-utility-directions-ai.png', heroPosition: 'center 50%' },
  ],
} satisfies SectionSubnavConfig;
