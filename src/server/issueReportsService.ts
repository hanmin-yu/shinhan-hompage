import { issueReportsSnapshot, issueReportsSnapshotGeneratedAt } from '../data/issueReportsSnapshot';
import type { IssueReport } from '../types/site';

export type IssueReportApiResponse = {
  reports: IssueReport[];
  failedSources: string[];
  succeededSources: string[];
  refreshedAt?: string;
};

type IssueReportSourceResult = {
  source: LiveIssueReportSource;
  reports: IssueReport[];
};

type IssueReportCacheState = {
  payload: IssueReportApiResponse;
  cachedAt: number;
};

type KrcaaFormState = {
  viewState: string;
  viewStateGenerator: string;
  eventValidation: string;
  totalRows: string;
};

type RuntimeMode = 'snapshot-only' | 'cache-with-refresh';
type LiveIssueReportSource = '한국관세사회' | '한국무역협회';

const MAX_ITEMS_PER_SOURCE = 50;
const ISSUE_REPORT_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const KRCAA_URL = 'https://krcaa.or.kr/_Document/Notify/N20601L.aspx?MenuCode=N20601';
const KITA_URL = 'https://www.kita.net/board/totalTradeNews/totalTradeNewsList.do';
const LIVE_ISSUE_REPORT_SOURCES: LiveIssueReportSource[] = ['한국관세사회', '한국무역협회'];
const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (compatible; ShinhanIssueReportBot/1.0; +https://shinhan.customsservice.co.kr)',
} as const;

let issueReportCache: IssueReportCacheState | null = null;
let issueReportRefreshPromise: Promise<IssueReportApiResponse> | null = null;

function getEnv() {
  const runtime = globalThis as typeof globalThis & {
    process?: {
      env?: Record<string, string | undefined>;
    };
  };

  return runtime.process?.env ?? {};
}

function resolveRuntimeMode(): RuntimeMode {
  const env = getEnv();
  const configured = env.ISSUE_REPORT_RUNTIME_MODE;

  if (configured === 'snapshot-only' || configured === 'cache-with-refresh') {
    return configured;
  }

  return env.VERCEL ? 'snapshot-only' : 'cache-with-refresh';
}

function decodeHtmlEntities(value: string) {
  const named = value
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>');

  return named.replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)));
}

function stripTags(value: string) {
  return value.replace(/<[^>]*>/g, ' ');
}

function cleanText(value: string) {
  return decodeHtmlEntities(stripTags(value)).replace(/\s+/g, ' ').trim();
}

function normalizeDate(value: string) {
  const trimmed = value.trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    return trimmed.replace(/-/g, '.');
  }

  return trimmed;
}

function reportDateValue(value: string) {
  if (!/^\d{4}\.\d{2}\.\d{2}$/.test(value)) {
    return Number.NEGATIVE_INFINITY;
  }

  return new Date(value.replace(/\./g, '-')).getTime();
}

function dedupeReports(reports: IssueReport[]) {
  const seen = new Set<string>();

  return reports.filter((report) => {
    const key = `${report.source}:${report.title}:${report.publishedAt}`;

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function summarize(source: LiveIssueReportSource) {
  return source === '한국관세사회'
    ? '한국관세사회 언론 스크랩에서 수집한 외부 기사입니다.'
    : '한국무역협회 무역뉴스에서 수집한 기사입니다.';
}

function summarizeEn(source: LiveIssueReportSource) {
  return source === '한국관세사회'
    ? 'An external article collected from the Korea Customs Brokers Association news roundup.'
    : 'An article collected from the KITA trade news feed.';
}

function createReport(params: {
  id: string;
  source: LiveIssueReportSource;
  publishedAt: string;
  title: string;
  url: string;
}) {
  const sourceEn =
    params.source === '한국관세사회' ? 'Korea Customs Brokers Association' : 'Korea International Trade Association';

  return {
    id: params.id,
    source: params.source,
    sourceEn,
    publishedAt: params.publishedAt,
    title: params.title,
    titleEn: params.title,
    summary: summarize(params.source),
    summaryEn: summarizeEn(params.source),
    url: params.url,
    tags: [params.source],
    status: 'live',
  } satisfies IssueReport;
}

async function fetchText(url: string, init?: RequestInit, encoding: string = 'utf-8') {
  const response = await fetch(url, {
    ...init,
    headers: {
      ...REQUEST_HEADERS,
      ...(init?.headers ?? {}),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  const buffer = await response.arrayBuffer();
  return new TextDecoder(encoding).decode(buffer);
}

function parseKrcaaFormState(html: string): KrcaaFormState {
  const viewState = html.match(/name="__VIEWSTATE" id="__VIEWSTATE" value="([^"]+)"/)?.[1];
  const viewStateGenerator = html.match(/name="__VIEWSTATEGENERATOR" id="__VIEWSTATEGENERATOR" value="([^"]+)"/)?.[1];
  const eventValidation = html.match(/name="__EVENTVALIDATION" id="__EVENTVALIDATION" value="([^"]+)"/)?.[1];
  const totalRows =
    html.match(/document\.frm\.totRowLast\.value = (\d+)/)?.[1] ??
    html.match(/name="totRowLast" value="(\d+)"/)?.[1] ??
    '0';

  if (!viewState || !viewStateGenerator || !eventValidation) {
    throw new Error('Failed to parse KRCAA form state');
  }

  return {
    viewState,
    viewStateGenerator,
    eventValidation,
    totalRows,
  };
}

function parseKrcaaReports(html: string) {
  const section = html.match(/<tbody>[\s\S]*?<\/tbody>/)?.[0] ?? html;
  const pattern =
    /fLink\('([^']+)','(\d+)'\)[\s\S]*?style='color:;'>([\s\S]*?)<\/a>[\s\S]*?<td style='text-align:CENTER;width:13%;'>(\d{4}-\d{2}-\d{2})<\/td>/g;
  const items: IssueReport[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(section))) {
    items.push(
      createReport({
        id: `issue-krcaa-${match[2]}`,
        source: '한국관세사회',
        publishedAt: normalizeDate(match[4]),
        title: cleanText(match[3]),
        url: cleanText(match[1]),
      }),
    );
  }

  return items;
}

function parseKitaReports(html: string) {
  const section = html.match(/<ul class="board-list box box-radius theme-board1">([\s\S]*?)<\/ul>/)?.[1] ?? html;
  const pattern =
    /<a href="javascript:void\(0\);" onclick="goDetailPage\('(\d+)', '(\d+)'\);"[^>]*>([\s\S]*?)<\/a>[\s\S]*?<span class="date">([\d.]+)<\/span>/g;
  const items: IssueReport[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(section))) {
    items.push(
      createReport({
        id: `issue-kita-${match[1]}`,
        source: '한국무역협회',
        publishedAt: normalizeDate(match[4]),
        title: cleanText(match[3]),
        url: `https://www.kita.net/board/totalTradeNews/totalTradeNewsDetail.do?no=${match[1]}&siteId=${match[2]}`,
      }),
    );
  }

  return items;
}

async function collectPaginatedReports(fetchPage: (page: number) => Promise<string>, parse: (html: string) => IssueReport[]) {
  const items: IssueReport[] = [];
  const seen = new Set<string>();

  for (let page = 1; items.length < MAX_ITEMS_PER_SOURCE; page += 1) {
    const html = await fetchPage(page);
    const pageItems = parse(html);

    if (!pageItems.length) {
      break;
    }

    let added = 0;

    for (const item of pageItems) {
      if (seen.has(item.id)) {
        continue;
      }

      seen.add(item.id);
      items.push(item);
      added += 1;

      if (items.length >= MAX_ITEMS_PER_SOURCE) {
        break;
      }
    }

    if (added === 0) {
      break;
    }
  }

  return items.slice(0, MAX_ITEMS_PER_SOURCE);
}

async function collectKrcaaReports() {
  let latestState: KrcaaFormState | null = null;

  return collectPaginatedReports(
    async (page) => {
      if (page === 1 || !latestState) {
        const html = await fetchText(KRCAA_URL, undefined, 'euc-kr');
        latestState = parseKrcaaFormState(html);
        return html;
      }

      const body = new URLSearchParams({
        __VIEWSTATE: latestState.viewState,
        __VIEWSTATEGENERATOR: latestState.viewStateGenerator,
        __EVENTVALIDATION: latestState.eventValidation,
        url: '/_Document/Notify/N20601L.aspx?',
        MenuCode: 'N20601',
        SEQ: '',
        gotopage: String(page),
        totRowLast: latestState.totalRows,
      }).toString();

      const html = await fetchText(
        KRCAA_URL,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body,
        },
        'euc-kr',
      );
      latestState = parseKrcaaFormState(html);
      return html;
    },
    parseKrcaaReports,
  );
}

async function collectKitaReports() {
  return collectPaginatedReports(async (page) => {
    const body = new URLSearchParams({
      pageIndex: String(page),
    }).toString();

    return fetchText(KITA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    });
  }, parseKitaReports);
}

async function buildIssueReports(): Promise<IssueReportApiResponse> {
  const sourceEntries = [
    {
      source: '한국관세사회' as const,
      collect: collectKrcaaReports,
    },
    {
      source: '한국무역협회' as const,
      collect: collectKitaReports,
    },
  ];

  const results = await Promise.allSettled(
    sourceEntries.map(async ({ source, collect }): Promise<IssueReportSourceResult> => ({
      source,
      reports: await collect(),
    })),
  );

  const reports: IssueReport[] = [];
  const failedSources: string[] = [];
  const succeededSources: string[] = [];

  results.forEach((result, index) => {
    const source = sourceEntries[index].source;

    if (result.status === 'fulfilled' && result.value.reports.length > 0) {
      reports.push(...result.value.reports);
      succeededSources.push(source);
      return;
    }

    failedSources.push(source);
  });

  return {
    reports: dedupeReports(reports).sort((left, right) => reportDateValue(right.publishedAt) - reportDateValue(left.publishedAt)),
    failedSources,
    succeededSources,
    refreshedAt: new Date().toISOString(),
  };
}

function buildSnapshotPayload(): IssueReportApiResponse {
  return {
    reports: issueReportsSnapshot,
    failedSources: [],
    succeededSources: [...LIVE_ISSUE_REPORT_SOURCES],
    refreshedAt: issueReportsSnapshotGeneratedAt,
  };
}

function isIssueReportCacheFresh(now = Date.now()) {
  if (!issueReportCache) {
    return false;
  }

  return now - issueReportCache.cachedAt < ISSUE_REPORT_CACHE_TTL_MS;
}

async function performIssueReportsRefresh() {
  if (issueReportRefreshPromise) {
    return issueReportRefreshPromise;
  }

  issueReportRefreshPromise = (async () => {
    try {
      const payload = await buildIssueReports();

      issueReportCache = {
        payload,
        cachedAt: Date.now(),
      };

      return payload;
    } finally {
      issueReportRefreshPromise = null;
    }
  })();

  return issueReportRefreshPromise;
}

export async function getIssueReportsPayload(forceRefresh = false) {
  const snapshotPayload = buildSnapshotPayload();
  const runtimeMode = resolveRuntimeMode();

  if (runtimeMode === 'snapshot-only') {
    return snapshotPayload;
  }

  if (!forceRefresh && isIssueReportCacheFresh()) {
    return issueReportCache!.payload;
  }

  try {
    return await performIssueReportsRefresh();
  } catch {
    if (issueReportCache) {
      return issueReportCache.payload;
    }

    return snapshotPayload;
  }
}
