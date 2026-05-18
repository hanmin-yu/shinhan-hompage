import type { IssueReport } from '../types/site';

export const issueReportSourceLinks = [
  {
    id: 'krcaa',
    label: '한국관세사회',
    url: 'https://krcaa.or.kr/_Document/Notify/N20601L.aspx?MenuCode=N20601',
    active: true,
  },
  {
    id: 'kita',
    label: '한국무역협회',
    url: 'https://www.kita.net/board/totalTradeNews/totalTradeNewsList.do',
    active: true,
  },
] as const;

export const fallbackIssueReports: IssueReport[] = [
  {
    id: 'issue-krcaa-3654',
    source: '한국관세사회',
    sourceEn: 'Korea Customs Brokers Association',
    publishedAt: '2026.04.24',
    title: '관세법인 설립 문턱 낮췄다…이인선 의원 ‘관세사법 개정안’ 본회의 통과',
    titleEn: 'Lower Barriers for Establishing Customs Corporations: Rep. Lee In-sun’s Customs Broker Act Amendment Passes Plenary Session',
    summary: '한국관세사회 언론 스크랩에서 수집한 외부 기사입니다.',
    summaryEn:
      'An external article collected from the Korea Customs Brokers Association news roundup.',
    url: 'https://www.inews24.com/view/1962967',
    tags: ['한국관세사회', '외부기사'],
    status: 'live',
  },
  {
    id: 'issue-kita-101129',
    source: '한국무역협회',
    sourceEn: 'Korea International Trade Association',
    publishedAt: '2026.04.27',
    title: '유턴기업 찾은 산업장관…"조만간 정책 개선방안 발표"',
    titleEn: 'Industry Minister Visits Reshoring Company and Announces Policy Improvement Plan',
    summary: '한국무역협회 무역뉴스에서 수집한 기사입니다.',
    summaryEn:
      'An article collected from the KITA trade news feed.',
    url: 'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101129&siteId=1',
    detailPath: '/trade-insights/details/issue-kita-101129.json',
    tags: ['한국무역협회', '무역뉴스'],
    status: 'live',
  },
];
