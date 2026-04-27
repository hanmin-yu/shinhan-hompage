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
    titleEn: '관세법인 설립 문턱 낮췄다…이인선 의원 ‘관세사법 개정안’ 본회의 통과',
    summary: '한국관세사회 언론 스크랩에서 수집한 외부 기사입니다.',
    summaryEn:
      'An external article collected from the Korea Customs Brokers Association news roundup.',
    url: 'https://www.inews24.com/view/1962967',
    tags: ['한국관세사회', '외부기사'],
    status: 'live',
  },
  {
    id: 'issue-kita-101130',
    source: '한국무역협회',
    sourceEn: 'Korea International Trade Association',
    publishedAt: '2026.04.27',
    title: '트럼프 "해상봉쇄 효과적…이란 송유관 사흘후면 내부 폭발"',
    titleEn: '트럼프 "해상봉쇄 효과적…이란 송유관 사흘후면 내부 폭발"',
    summary: '한국무역협회 무역뉴스에서 수집한 기사입니다.',
    summaryEn:
      'An article collected from the KITA trade news feed.',
    url: 'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101130&siteId=2',
    tags: ['한국무역협회', '무역뉴스'],
    status: 'live',
  },
];
