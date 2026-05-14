import type { NewsletterItem, ShinhanNewsItem } from '../types/site';
import { withNewsletterTitleBrand } from '../utils/newsletter';
import { filterVisibleShinhanNewsRecords } from '../utils/shinhanNews';
import { shinhanNewsArchive } from './shinhanNewsArchive';

export const shinhanNewsItems: ShinhanNewsItem[] = filterVisibleShinhanNewsRecords(shinhanNewsArchive);

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
    titleEn: '[April 2026 Newsletter] Zoom In Trade - The Unfamiliar Road',
    body: '사전심사 제도와 조사 대응 체크포인트',
    bodyEn: 'Advance ruling procedures and investigation response checkpoints',
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
    titleEn: '[March 2026 Newsletter] Zoom In Trade - Lower You Go, Taller the Trees',
    body: '수출입통관 SOP 운영과 보완 대응 사례',
    bodyEn: 'Import/export clearance SOP operations and corrective-response cases',
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
    titleEn: '[February 2026 Newsletter] Zoom In Trade - Warp and Weft',
    body: '원산지 검증 및 AEO 사후관리 실무 브리핑',
    bodyEn: 'Practical briefing on origin verification and AEO follow-up management',
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
    title: '[2025년 12월호 소식지] Zoom In Trade - 사과나무를 심으며',
    titleEn: '[December 2025 Newsletter] Zoom In Trade - Planting an apple tree',
    body: '2025년 12월호 소식지 - 사과나무를 심으며',
    bodyEn: 'December 2025 issue - Planting an apple tree',
    date: '2025.12',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-12-2026-01-ko.zip',
  },
  {
    title: '[December 2025 Newsletter] Zoom In Trade - Planting an apple tree',
    body: 'December 2025 issue - Planting an apple tree',
    date: '2025.12',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-12-2026-01-en.zip',
  },
  {
    title: '[2025년 11월호 소식지] Zoom In Trade - 단단한 일상',
    titleEn: '[November 2025 Newsletter] Zoom In Trade - A Steady Everyday Life',
    body: '2025년 11월호 소식지 - 단단한 일상',
    bodyEn: 'November 2025 issue - A Steady Everyday Life',
    date: '2025.11',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-11-ko.zip',
  },
  {
    title: '[November 2025 Newsletter] Zoom In Trade - A Steady Everyday Life',
    body: 'November 2025 issue - A Steady Everyday Life',
    date: '2025.11',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-11-en.zip',
  },
  {
    title: '[2025년 10월호 소식지] Zoom In Trade - 미련한 선택, 좁은 길',
    titleEn: '[October 2025 Newsletter] Zoom In Trade - The Foolish Choice, the Narrow Path',
    body: '2025년 10월호 소식지 - 미련한 선택, 좁은 길',
    bodyEn: 'October 2025 issue - The Foolish Choice, the Narrow Path',
    date: '2025.10',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-10-ko.zip',
  },
  {
    title: '[October 2025 Newsletter] Zoom In Trade - The Foolish Choice, the Narrow Path',
    body: 'October 2025 issue - The Foolish Choice, the Narrow Path',
    date: '2025.10',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-10-en.zip',
  },
  {
    title: '[2025년 9월호 소식지] Zoom In Trade - 나는 돌잡이로 이웃의 손을 잡았어요',
    titleEn: "[September 2025 Newsletter] Zoom In Trade - I held my neighbor's hand as a Doljabi at the first birthday party",
    body: '2025년 9월호 소식지 - 나는 돌잡이로 이웃의 손을 잡았어요',
    bodyEn: "September 2025 issue - I held my neighbor's hand as a Doljabi at the first birthday party",
    date: '2025.09',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-09-ko.zip',
  },
  {
    title: "[September 2025 Newsletter] Zoom In Trade - I held my neighbor's hand as a Doljabi at the first birthday party",
    body: "September 2025 issue - I held my neighbor's hand as a Doljabi at the first birthday party",
    date: '2025.09',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-09-en.zip',
  },
  {
    title: '[2025년 8월호 소식지] Zoom In Trade - 절대평가 상대평가',
    titleEn: '[August 2025 Newsletter] Zoom In Trade - Absolute Evaluation and Relative Evaluation',
    body: '2025년 8월호 소식지 - 절대평가 상대평가',
    bodyEn: 'August 2025 issue - Absolute Evaluation and Relative Evaluation',
    date: '2025.08',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-08-ko.zip',
  },
  {
    title: '[August 2025 Newsletter] Zoom In Trade - Absolute Evaluation and Relative Evaluation',
    body: 'August 2025 issue - Absolute Evaluation and Relative Evaluation',
    date: '2025.08',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-08-en.zip',
  },
  {
    title: '[2025년 7월호 소식지] Zoom In Trade - 유리와 거울',
    titleEn: '[July 2025 Newsletter] Zoom In Trade - Glass and Mirror',
    body: '2025년 7월호 소식지 - 유리와 거울',
    bodyEn: 'July 2025 issue - Glass and Mirror',
    date: '2025.07',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-07-ko.zip',
  },
  {
    title: '[July 2025 Newsletter] Zoom In Trade - Glass and Mirror',
    body: 'July 2025 issue - Glass and Mirror',
    date: '2025.07',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-07-en.zip',
  },
  {
    title: '[2025년 6월호 소식지] Zoom In Trade - 코페르니쿠스적 전환',
    titleEn: '[June 2025 Newsletter] Zoom In Trade - Copernican Revolution',
    body: '2025년 6월호 소식지 - 코페르니쿠스적 전환',
    bodyEn: 'June 2025 issue - Copernican Revolution',
    date: '2025.06',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-06-ko.zip',
  },
  {
    title: '[June 2025 Newsletter] Zoom In Trade - Copernican Revolution',
    body: 'June 2025 issue - Copernican Revolution',
    date: '2025.06',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-06-en.zip',
  },
  {
    title: '[2025년 5월호 소식지] Zoom In Trade - 선한 영향력',
    titleEn: '[May 2025 Newsletter] Zoom In Trade - Good Influence',
    body: '2025년 5월호 소식지 - 선한 영향력',
    bodyEn: 'May 2025 issue - Good Influence',
    date: '2025.05',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-05-ko.zip',
  },
  {
    title: '[May 2025 Newsletter] Zoom In Trade - Good Influence',
    body: 'May 2025 issue - Good Influence',
    date: '2025.05',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-05-en.zip',
  },
  {
    title: '[2025년 4월호 소식지] Zoom In Trade - 싱크홀',
    titleEn: '[April 2025 Newsletter] Zoom In Trade - Sinkhole',
    body: '2025년 4월호 소식지 - 싱크홀',
    bodyEn: 'April 2025 issue - Sinkhole',
    date: '2025.04',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-04-ko.zip',
  },
  {
    title: '[April 2025 Newsletter] Zoom In Trade - Sinkhole',
    body: 'April 2025 issue - Sinkhole',
    date: '2025.04',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-04-en.zip',
  },
  {
    title: '[2025년 3월호 소식지] Zoom In Trade - 창립 60주년',
    titleEn: '[March 2025 Newsletter] Zoom In Trade - 60th Anniversary',
    body: '2025년 3월호 소식지 - 창립 60주년',
    bodyEn: 'March 2025 issue - 60th Anniversary',
    date: '2025.03',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-03-ko.zip',
  },
  {
    title: '[March 2025 Newsletter] Zoom In Trade - 60th Anniversary',
    body: 'March 2025 issue - 60th Anniversary',
    date: '2025.03',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-03-en.zip',
  },
  {
    title: '[2025년 2월호 소식지] Zoom In Trade - 에코 체임버',
    titleEn: '[February 2025 Newsletter] Zoom In Trade - Echo Chamber',
    body: '2025년 2월호 소식지 - 에코 체임버',
    bodyEn: 'February 2025 issue - Echo Chamber',
    date: '2025.02',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2025-02-ko.zip',
  },
  {
    title: '[February 2025 Newsletter] Zoom In Trade - Echo Chamber',
    body: 'February 2025 issue - Echo Chamber',
    date: '2025.02',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2025-02-en.zip',
  },
  {
    title: '[2024년 12월~2025년 1월 통합 소식지] Zoom In Trade - 바라는 것들의 실상',
    titleEn: '[December 2024 to January 2025 Combined Newsletter] Zoom In Trade - The firm belief in what we hope for',
    body: '2024년 12월~2025년 1월 통합 소식지 - 바라는 것들의 실상',
    bodyEn: 'December 2024 to January 2025 combined issue - The firm belief in what we hope for',
    date: '2024.12~2025.01',
    language: '국문',
    downloadHref: '/newsletters/newsletter-2024-12-2025-01-ko.zip',
  },
  {
    title: '[December 2024 to January 2025 Combined Newsletter] Zoom In Trade - The firm belief in what we hope for',
    body: 'December 2024 to January 2025 combined issue - The firm belief in what we hope for',
    date: '2024.12~2025.01',
    language: '영문',
    downloadHref: '/newsletters/newsletter-2024-12-2025-01-en.zip',
  },
] as const;

export const newsletterItems: NewsletterItem[] = rawNewsletterItems.map((item, index) => ({
  id: `newsletter-${index + 1}`,
  issue: item.date,
  title: withNewsletterTitleBrand(item.title),
  titleEn: withNewsletterTitleBrand('titleEn' in item && item.titleEn ? item.titleEn : getNewsletterTitleEn(item.title)),
  summary: item.body,
  summaryEn: 'bodyEn' in item && item.bodyEn ? item.bodyEn : getNewsletterSummaryEn(item.body),
  publishedAt: item.date,
  href: item.downloadHref ?? '/news/newsletter',
  language: item.language,
  languageEn: item.language === '영문' ? 'English' : 'Korean',
  downloadHref: item.downloadHref,
}));
