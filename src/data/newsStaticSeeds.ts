import type { NewsletterItem, ShinhanNewsItem } from '../types/site';
import { withNewsletterTitleBrand } from '../utils/newsletter';
import { shinhanNewsArchive } from './shinhanNewsArchive';

export const shinhanNewsItems: ShinhanNewsItem[] = shinhanNewsArchive;

function getNewsletterTitleEn(title: string) {
  switch (title) {
    case '[2026년 4월호 소식지] Zoom In Trade - 낯선 길':
      return '[April 2026 Newsletter] Zoom In Trade - The Unfamiliar Road';
    case '[2026년 4월호 소식지] Zoom In Trade - The Unfamiliar Road':
      return '[April 2026 Newsletter] Zoom In Trade - The Unfamiliar Road';
    case '[2026년 3월호 소식지] Zoom In Trade - Lower you go, taller the trees':
      return '[March 2026 Newsletter] Zoom In Trade - Lower You Go, Taller the Trees';
    case '[2026년 3월호 소식지] Zoom In Trade - Lower You Go, Taller the Trees':
      return '[March 2026 Newsletter] Zoom In Trade - Lower You Go, Taller the Trees';
    case '[2026년 2월호 소식지] Zoom In Trade - 날실과 씨실':
      return '[February 2026 Newsletter] Zoom In Trade - Warp and Weft';
    case '[2026년 2월호 소식지] Zoom In Trade - Warp and Weft':
      return '[February 2026 Newsletter] Zoom In Trade - Warp and Weft';
    case '[2025년 12월~2026년 1월 통합 소식지] Zoom In Trade - 사과나무를 심으며':
      return '[December 2025 to January 2026 Combined Newsletter] Zoom In Trade - Planting an apple tree';
    case '[2025년 12월~2026년 1월 통합 소식지] Zoom In Trade - Planting an apple tree':
      return '[December 2025 to January 2026 Combined Newsletter] Zoom In Trade - Planting an apple tree';
    default:
      return title;
  }
}

function getNewsletterSummaryEn(summary: string) {
  switch (summary) {
    case '사전심사 제도와 조사 대응 체크포인트':
      return 'Advance ruling procedures and investigation response checkpoints';
    case '수출입통관 SOP 운영과 보완 대응 사례':
      return 'Import/export clearance SOP operations and corrective-response cases';
    case '원산지 검증 및 AEO 사후관리 실무 브리핑':
      return 'Practical briefing on origin verification and AEO follow-up management';
    case '연말/연초 주요 정책 및 실무 이슈 통합본':
      return 'Combined issue covering key year-end and new-year policy and practice topics';
    default:
      return summary;
  }
}

const rawNewsletterItems = [
  {
    title: '[2026년 4월호 소식지] Zoom In Trade - 낯선 길',
    body: '사전심사 제도와 조사 대응 체크포인트',
    date: '2026.04',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2026-04-ko.zip',
  },
  {
    title: '[2026년 4월호 소식지] Zoom In Trade - The Unfamiliar Road',
    body: 'April issue (English) - customs risk and pre-ruling highlights',
    date: '2026.04',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2026-04-en.zip',
  },
  {
    title: '[2026년 3월호 소식지] Zoom In Trade - Lower you go, taller the trees',
    body: '수출입통관 SOP 운영과 보완 대응 사례',
    date: '2026.03',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2026-03-ko.zip',
  },
  {
    title: '[2026년 3월호 소식지] Zoom In Trade - Lower You Go, Taller the Trees',
    body: 'March issue (English) - operational SOP and compliance updates',
    date: '2026.03',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2026-03-en.zip',
  },
  {
    title: '[2026년 2월호 소식지] Zoom In Trade - 날실과 씨실',
    body: '원산지 검증 및 AEO 사후관리 실무 브리핑',
    date: '2026.02',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2026-02-ko.zip',
  },
  {
    title: '[2026년 2월호 소식지] Zoom In Trade - Warp and Weft',
    body: 'February issue (English) - origin verification and AEO follow-up',
    date: '2026.02',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2026-02-en.zip',
  },
  {
    title: '[2025년 12월~2026년 1월 통합 소식지] Zoom In Trade - 사과나무를 심으며',
    body: '연말/연초 주요 정책 및 실무 이슈 통합본',
    date: '2025.12~2026.01',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-12-2026-01-ko.zip',
  },
  {
    title: '[2025년 12월~2026년 1월 통합 소식지] Zoom In Trade - Planting an apple tree',
    body: 'Year-end combined issue (English) - key policy and practice updates',
    date: '2025.12~2026.01',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-12-2026-01-en.zip',
  },
] as const;

export const newsletterItems: NewsletterItem[] = rawNewsletterItems.map((item, index) => ({
  id: `newsletter-${index + 1}`,
  issue: item.date,
  title: withNewsletterTitleBrand(item.title),
  titleEn: withNewsletterTitleBrand(getNewsletterTitleEn(item.title)),
  summary: item.body,
  summaryEn: getNewsletterSummaryEn(item.body),
  publishedAt: item.date,
  href: item.downloadHref ?? '/news/newsletter',
  language: item.language,
  languageEn: item.language === '영문' ? 'English' : 'Korean',
  downloadHref: item.downloadHref,
}));
