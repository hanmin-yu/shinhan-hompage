import type { IssueReport } from '../types/site';

export const issueReportsSnapshotGeneratedAt = '2026-04-27T09:00:00+09:00';

const rows = [
  [
    'issue-kita-101130',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.27',
    '트럼프 "해상봉쇄 효과적…이란 송유관 사흘후면 내부 폭발"',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101130&siteId=2',
  ],
  [
    'issue-kita-101129',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.27',
    '유턴기업 찾은 산업장관…"조만간 정책 개선방안 발표"',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101129&siteId=1',
  ],
  [
    'issue-kita-101128',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.27',
    '중기부, 지역창업 페스티벌 개최…"창업 열풍 확산"',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101128&siteId=1',
  ],
  [
    'issue-kita-101127',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.27',
    '중기부, 기술사업화에 최대 1억5천만원 지원',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101127&siteId=1',
  ],
  [
    'issue-kita-101126',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.27',
    '환율, 미·이란 종전협상 교착 속 하락 출발…1,470원대',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101126&siteId=6',
  ],
  [
    'issue-kita-101125',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.26',
    '中, 미얀마 새 정부 지지 표명…"에너지 안보 등 협력"',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101125&siteId=2',
  ],
  [
    'issue-kita-101124',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.26',
    '반등 못하는 韓 잠재성장률…OECD "내년 4분기 1.5%, 사상 최저"',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101124&siteId=1',
  ],
  [
    'issue-kita-101123',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.26',
    '나랏돈 절반 묶인 의무지출…기초연금·교육교부금만 100조',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101123&siteId=1',
  ],
  [
    'issue-kita-101122',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.26',
    '중동 전쟁에 원화 흔들…지난달 실질가치 금융위기 후 최저',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101122&siteId=6',
  ],
  [
    'issue-kita-101121',
    '한국무역협회',
    'Korea International Trade Association',
    '2026.04.26',
    '호르무즈발 공급 충격…원유·나프타·헬륨 수입 동반 감소',
    'https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=101121&siteId=1',
  ],
  [
    'issue-krcaa-3654',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '관세법인 설립 문턱 낮췄다…이인선 의원 ‘관세사법 개정안’ 본회의 통과',
    'https://www.inews24.com/view/1962967',
  ],
  [
    'issue-krcaa-3653',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '이철규 의원 "국가자원안보 특별법 일부개정법률안 국회 본회의 통과"',
    'https://www.kukinews.com/article/view/kuk202604230244',
  ],
  [
    'issue-krcaa-3652',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '한-일 관세청, ‘국가간 전자상거래 활성화-지식재산권 보호 협력 강화’ 합의',
    'https://www.sejungilbo.com/news/articleView.html?idxno=58158',
  ],
  [
    'issue-krcaa-3651',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '이명구 관세청장, 한-유럽 기업 간담회 참석…정책 방향 공유',
    'https://www.ccdailynews.com/news/articleView.html?idxno=2412533',
  ],
  [
    'issue-krcaa-3650',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '국내 반입 직전 끊었다…관세청, 동남아 공조로 마약 657kg 차단',
    'https://www.joseilbo.com/news/htmls/2026/04/20260423567102.html',
  ],
  [
    'issue-krcaa-3649',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '이종욱 관세청 차장, 안양 우편집중국 방문해 마약 2차 저지선 현장 점검',
    'http://www.josetongsin.com/news/view.html?section=136&category=139&no=34435',
  ],
  [
    'issue-krcaa-3648',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    "'바쿠다(BACUDA) 프로젝트'로 K-관세행정 확산한다",
    'https://www.taxtimes.co.kr/news/article.html?no=274846',
  ],
  [
    'issue-krcaa-3647',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '현대차 인도법인, 공기청정기 수입 분류 갈등… 34억 관세 부과받아',
    'https://www.g-enews.com/view.php?ud=2026042409300620282bd56fbc3c_1',
  ],
  [
    'issue-krcaa-3646',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    '한국·베트남 기업인 500명 집결… 미래산업 협력 논의',
    'https://www.econonews.co.kr/news/articleView.html?idxno=436635',
  ],
  [
    'issue-krcaa-3645',
    '한국관세사회',
    'Korea Customs Brokers Association',
    '2026.04.24',
    `백악관 "중국, 美 AI 기술 '산업 규모'로 훔쳐"`,
    'https://www.edaily.co.kr/News/Read?newsId=03099606645419400&mediaCodeNo=257&OutLnkChk=Y',
  ],
] as const;

function buildSummary(source: string) {
  return source === '한국관세사회'
    ? '한국관세사회 언론 스크랩에서 수집한 외부 기사입니다.'
    : '한국무역협회 무역뉴스에서 수집한 기사입니다.';
}

function buildSummaryEn(sourceEn: string) {
  return sourceEn === 'Korea Customs Brokers Association'
    ? 'An external article collected from the Korea Customs Brokers Association news roundup.'
    : 'An article collected from the KITA trade news feed.';
}

export const issueReportsSnapshot: IssueReport[] = rows.map(([id, source, sourceEn, publishedAt, title, url]) => ({
  id,
  source,
  sourceEn,
  publishedAt,
  title,
  titleEn: title,
  summary: buildSummary(source),
  summaryEn: buildSummaryEn(sourceEn),
  url,
  tags: [source],
  status: 'live',
}));
