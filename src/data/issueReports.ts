import type { IssueReport } from '../types/site';

export const issueReportSourceLinks = [
  {
    id: 'krcaa',
    label: '한국관세사회',
    url: 'https://krcaa.or.kr/_Document/Notify/N20601L.aspx?MenuCode=N20601',
    active: true,
  },
  {
    id: 'customs',
    label: '관세청',
    url: 'https://www.customs.go.kr/',
    active: false,
  },
  {
    id: 'kita',
    label: '한국무역협회',
    url: 'https://www.kita.net/board/notice/noticeList.do',
    active: true,
  },
  {
    id: 'kotra',
    label: 'KOTRA',
    url: 'https://www.kotra.or.kr/subList/20000005978',
    active: true,
  },
] as const;

export const fallbackIssueReports: IssueReport[] = [
  {
    id: 'issue-krcaa-fallback',
    source: '한국관세사회',
    sourceEn: 'Korea Customs Brokers Association',
    publishedAt: '2026.04.24',
    title: '한국관세사회 제공 이슈 링크 모음',
    titleEn: 'Curated Issue Links from the Korea Customs Brokers Association',
    summary: '한국관세사회 알림마당 페이지에서 최신 관세·통상 관련 기사 링크를 수집하도록 연결된 기본 항목입니다.',
    summaryEn:
      'A default item connected to collect the latest customs and trade article links from the Korea Customs Brokers Association notice page.',
    url: 'https://krcaa.or.kr/_Document/Notify/N20601L.aspx?MenuCode=N20601',
    tags: ['한국관세사회', '외부기사'],
    status: 'live',
  },
  {
    id: 'issue-customs-placeholder',
    source: '관세청',
    sourceEn: 'Korea Customs Service',
    publishedAt: '준비중',
    title: '관세청 연동 준비 중',
    titleEn: 'Korea Customs Service Feed in Preparation',
    summary: '관세청은 요청하신 대로 수집 대상 틀만 먼저 만들어 두었고, 실제 파서는 다음 단계에서 연결할 수 있도록 자리만 잡아둔 상태입니다.',
    summaryEn:
      'Per the requested scope, only the collection structure for Korea Customs Service has been prepared so far, with the actual parser reserved for a later step.',
    url: 'https://www.customs.go.kr/',
    tags: ['관세청', 'placeholder'],
    status: 'placeholder',
  },
  {
    id: 'issue-kita-fallback',
    source: '한국무역협회',
    sourceEn: 'Korea International Trade Association',
    publishedAt: '2026.04.24',
    title: '한국무역협회 공지사항 연동',
    titleEn: 'KITA Notice Feed Connection',
    summary: '한국무역협회 공지사항 목록을 기준으로 제목과 작성일을 수집하도록 연결된 기본 항목입니다.',
    summaryEn:
      'A default item connected to collect titles and published dates from the KITA notice list.',
    url: 'https://www.kita.net/board/notice/noticeList.do',
    tags: ['한국무역협회', '공지사항'],
    status: 'live',
  },
  {
    id: 'issue-kotra-fallback',
    source: 'KOTRA',
    sourceEn: 'KOTRA',
    publishedAt: '2026.04.23',
    title: 'KOTRA 뉴스레터 연동',
    titleEn: 'KOTRA Newsletter Feed Connection',
    summary: 'KOTRA 뉴스레터 목록을 기준으로 최신 게시물을 수집하도록 연결된 기본 항목입니다.',
    summaryEn:
      'A default item connected to collect the latest posts from the KOTRA newsletter list.',
    url: 'https://www.kotra.or.kr/subList/20000005978',
    tags: ['KOTRA', '뉴스레터'],
    status: 'live',
  },
];
