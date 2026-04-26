import { execFile } from 'node:child_process';
import type { IncomingMessage, ServerResponse } from 'node:http';
import { promisify } from 'node:util';

import type { Connect, Plugin } from 'vite';

import type { IssueReport } from '../src/types/site';

const execFileAsync = promisify(execFile);

const MAX_ITEMS_PER_SOURCE = 50;
const ISSUE_REPORT_CACHE_TTL_MS = 24 * 60 * 60 * 1000;
const LIVE_ISSUE_REPORT_SOURCES = ['한국관세사회', '한국무역협회', 'KOTRA'] as const;
const KRCAA_URL = 'https://krcaa.or.kr/_Document/Notify/N20601L.aspx?MenuCode=N20601';
const KITA_URL = 'https://www.kita.net/board/notice/noticeList.do';
const KOTRA_URL = 'https://www.kotra.or.kr/subList/20000005978';
const KOTRA_LIST_AJAX_URL = 'https://www.kotra.or.kr/module/ntt/unity/selectNttListAjax.do';
const KOTRA_DETAIL_AJAX_URL = 'https://www.kotra.or.kr/module/ntt/unity/selectNttDetailAjax.do';

type IssueReportSourceResult = {
  source: string;
  reports: IssueReport[];
};

type IssueReportApiResponse = {
  reports: IssueReport[];
  failedSources: string[];
  succeededSources: string[];
  refreshedAt?: string;
};

type IssueReportCacheState = {
  payload: IssueReportApiResponse;
  cachedAt: number;
};

let issueReportCache: IssueReportCacheState | null = null;
let issueReportRefreshPromise: Promise<IssueReportApiResponse> | null = null;

type KrcaaFormState = {
  viewState: string;
  viewStateGenerator: string;
  eventValidation: string;
  totalRows: string;
};

function escapeShellArgument(value: string) {
  return value.replace(/'/g, `'\\''`);
}

async function execShell(command: string) {
  const { stdout } = await execFileAsync('/bin/sh', ['-lc', command], {
    maxBuffer: 1024 * 1024 * 8,
  });

  return stdout;
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

function summarize(source: string, extra?: string) {
  const tail = extra ? ` ${extra}` : '';
  return `${source} 원문 목록에서 수집한 항목입니다.${tail}`.trim();
}

function getKotraProxyUrl(postId: string) {
  return `/issue-report-proxy/kotra/${postId}`;
}

function createEmptyIssueReportResponse(): IssueReportApiResponse {
  return {
    reports: [],
    failedSources: [...LIVE_ISSUE_REPORT_SOURCES],
    succeededSources: [],
    refreshedAt: issueReportCache?.payload.refreshedAt,
  };
}

function parseKitaReports(html: string): IssueReport[] {
  const section = html.match(/<ul class="board-list[\s\S]*?<\/ul>/)?.[0] ?? html;
  const pattern =
    /<li[\s\S]*?<span class="badge">([\s\S]*?)<\/span>[\s\S]*?onclick="goDetailPage\('(\d+)'\);" title="([^"]+)"[\s\S]*?<span class="date">([\d.]+)<\/span>[\s\S]*?<\/li>/g;
  const items: IssueReport[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(section))) {
    const category = cleanText(match[1]);
    const postIndex = match[2];
    const title = cleanText(match[3]);
    const publishedAt = normalizeDate(match[4]);

    items.push({
      id: `issue-kita-${postIndex}`,
      source: '한국무역협회',
      publishedAt,
      title,
      summary: summarize('한국무역협회', category ? `분류: ${category}.` : undefined),
      url: `https://www.kita.net/board/notice/noticeDetail.do?postIndex=${postIndex}`,
      tags: category ? [category] : ['공지사항'],
      status: 'live',
    });
  }

  return items;
}

function parseKotraReports(html: string): IssueReport[] {
  const pattern =
    /<tr>[\s\S]*?<a href="javascript:void\(0\);" onclick="fnView\('(\d+)',[\s\S]*?\);">([\s\S]*?)<\/a>[\s\S]*?<td>(\d{4}-\d{2}-\d{2})<\/td>[\s\S]*?<\/tr>/g;
  const items: IssueReport[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(html))) {
    const postId = match[1];
    const title = cleanText(match[2]);
    const publishedAt = normalizeDate(match[3]);

    items.push({
      id: `issue-kotra-${postId}`,
      source: 'KOTRA',
      publishedAt,
      title,
      summary: summarize('KOTRA', '상세는 KOTRA 뉴스레터 목록에서 확인할 수 있습니다.'),
      url: getKotraProxyUrl(postId),
      tags: ['KOTRA', '뉴스레터'],
      status: 'live',
    });
  }

  return items;
}

function parseKrcaaReports(html: string): IssueReport[] {
  const section = html.match(/<tbody>[\s\S]*?<\/tbody>/)?.[0] ?? html;
  const pattern =
    /fLink\('([^']+)','(\d+)'\)[\s\S]*?style='color:;'>([\s\S]*?)<\/a>[\s\S]*?<td style='text-align:CENTER;width:13%;'>(\d{4}-\d{2}-\d{2})<\/td>/g;
  const items: IssueReport[] = [];
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(section))) {
    const url = cleanText(match[1]);
    const articleId = match[2];
    const title = cleanText(match[3]);
    const publishedAt = normalizeDate(match[4]);

    items.push({
      id: `issue-krcaa-${articleId}`,
      source: '한국관세사회',
      publishedAt,
      title,
      summary: summarize('한국관세사회', '기관 선별 외부 기사 링크입니다.'),
      url,
      tags: ['한국관세사회', '외부기사'],
      status: 'live',
    });
  }

  return items;
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
        const html = await execShell(`curl -L '${escapeShellArgument(KRCAA_URL)}' | iconv -f cp949 -t utf-8`);
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

      const html = await execShell(
        `curl -L -X POST '${escapeShellArgument(KRCAA_URL)}' -H 'Content-Type: application/x-www-form-urlencoded' --data '${escapeShellArgument(body)}' | iconv -f cp949 -t utf-8`,
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
      postIndex: '',
      pageIndex: String(page),
      expandSeachYn: 'N',
    }).toString();

    return execShell(
      `curl -L -X POST '${escapeShellArgument(KITA_URL)}' -H 'Content-Type: application/x-www-form-urlencoded' --data '${escapeShellArgument(body)}'`,
    );
  }, parseKitaReports);
}

async function collectKotraReports() {
  return collectPaginatedReports(async (page) => {
    const body = new URLSearchParams({
      siteSeq: '20000002134',
      bbsSeq: '20000026876',
      pageIndex: String(page),
      searchCondition: '',
      searchKeyword: '',
      menuSeq: '20000005978',
      pageMode: 'B',
      nttSeq: '',
      sitecntntsSeq: '20000004997',
      tabTyCode: 'dataManage',
      mngrAt: 'N',
    }).toString();

    return execShell(
      `curl -L -X POST '${escapeShellArgument(KOTRA_LIST_AJAX_URL)}' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' --data '${escapeShellArgument(body)}'`,
    );
  }, parseKotraReports);
}

async function fetchKotraDetailHtml(postId: string) {
  const body = new URLSearchParams({
    siteSeq: '20000002134',
    bbsSeq: '20000026876',
    nttSeq: postId,
    pageIndex: '1',
    searchCondition: '',
    searchKeyword: '',
    menuSeq: '20000005978',
    mngrAt: 'N',
    searchAt: '',
    cmntUseAt: 'N',
    listCount: '',
    sitecntntsSeq: '20000004997',
    parntsNttSeq: '',
    secretAt: '',
    atchFilePosblAt: 'Y',
    atchFilePosblCo: '3',
  }).toString();

  return execShell(
    `curl -L -X POST '${escapeShellArgument(KOTRA_DETAIL_AJAX_URL)}' -H 'Content-Type: application/x-www-form-urlencoded; charset=UTF-8' --data '${escapeShellArgument(body)}'`,
  );
}

function absolutizeKotraHtml(html: string) {
  return html
    .replace(/(href|src)=(")\/(?!\/)/g, '$1=$2https://www.kotra.or.kr/')
    .replace(/(href|src)=(')\/(?!\/)/g, "$1=$2https://www.kotra.or.kr/")
    .replace(/url\(\s*\/(?!\/)/g, 'url(https://www.kotra.or.kr/');
}

function parseKotraDetailPage(detailHtml: string, postId: string) {
  const title =
    cleanText(detailHtml.match(/<div class="list_tit">[\s\S]*?<h5>([\s\S]*?)<\/h5>/)?.[1] ?? '') || `KOTRA ${postId}`;
  const publishedAt =
    cleanText(detailHtml.match(/<p class="list_date">[\s\S]*?<span>([\d-:\s]+)<\/span>/)?.[1] ?? '') || '';
  const contentHtml = detailHtml.match(/<div class="conM_txt">([\s\S]*?)<\/div>\s*<\/div>/)?.[1] ?? '';

  return {
    title,
    publishedAt,
    contentHtml: absolutizeKotraHtml(contentHtml),
  };
}

async function buildIssueReports(): Promise<IssueReportApiResponse> {
  const sourceEntries = [
    {
      source: '한국관세사회',
      collect: collectKrcaaReports,
    },
    {
      source: '한국무역협회',
      collect: collectKitaReports,
    },
    {
      source: 'KOTRA',
      collect: collectKotraReports,
    },
  ] as const;

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

    if (result.status === 'fulfilled' && result.value.reports.length === 0) {
      failedSources.push(source);
      return;
    }

    failedSources.push(source);
  });

  return {
    reports: dedupeReports(reports).sort((left, right) => reportDateValue(right.publishedAt) - reportDateValue(left.publishedAt)),
    failedSources,
    succeededSources,
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
      const refreshedPayload = {
        ...payload,
        refreshedAt: new Date().toISOString(),
      } satisfies IssueReportApiResponse;

      issueReportCache = {
        payload: refreshedPayload,
        cachedAt: Date.now(),
      };

      return refreshedPayload;
    } finally {
      issueReportRefreshPromise = null;
    }
  })();

  return issueReportRefreshPromise;
}

async function refreshIssueReportsCache() {
  try {
    return await performIssueReportsRefresh();
  } catch (error) {
    if (issueReportCache) {
      return issueReportCache.payload;
    }

    throw error;
  }
}

function sendJson(response: ServerResponse, statusCode: number, payload: unknown) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'application/json; charset=utf-8');
  response.end(JSON.stringify(payload));
}

function sendHtml(response: ServerResponse, statusCode: number, html: string) {
  response.statusCode = statusCode;
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.end(html);
}

function createIssueReportMiddleware(): Connect.NextHandleFunction {
  return async (request: IncomingMessage, response: ServerResponse, next) => {
    const requestUrl = request.url ? new URL(request.url, 'http://localhost') : null;
    const kotraProxyMatch = requestUrl?.pathname.match(/^\/issue-report-proxy\/kotra\/(\d+)$/);

    if (requestUrl && kotraProxyMatch) {
      try {
        const postId = kotraProxyMatch[1];
        const detailHtml = await fetchKotraDetailHtml(postId);
        const detail = parseKotraDetailPage(detailHtml, postId);

        sendHtml(
          response,
          200,
          `<!doctype html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${detail.title}</title>
    <style>
      body {
        margin: 0;
        padding: 40px 20px 72px;
        background: #f4f8fc;
        color: #18375d;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      }
      main {
        max-width: 1040px;
        margin: 0 auto;
      }
      .shell {
        background: #fff;
        border: 1px solid rgba(20, 74, 149, 0.12);
        border-radius: 22px;
        box-shadow: 0 24px 42px rgba(16, 53, 114, 0.08);
        overflow: hidden;
      }
      .head {
        padding: 28px 32px 22px;
        border-bottom: 1px solid rgba(20, 74, 149, 0.1);
        background: linear-gradient(180deg, #f7fbff 0%, #ffffff 100%);
      }
      .meta {
        margin: 0 0 10px;
        color: #5b7698;
        font-size: 14px;
        font-weight: 700;
      }
      h1 {
        margin: 0;
        color: #153c6e;
        font-size: 30px;
        line-height: 1.4;
      }
      .actions {
        margin-top: 16px;
      }
      .actions a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 38px;
        padding: 0 14px;
        border-radius: 8px;
        border: 1px solid rgba(20, 75, 157, 0.16);
        background: #f6faff;
        color: #1b56a8;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
      }
      .content {
        padding: 30px 32px 40px;
        overflow-wrap: anywhere;
      }
      .content img {
        max-width: 100%;
        height: auto;
      }
      .content a {
        color: #1b56a8;
      }
      @media (max-width: 800px) {
        body {
          padding: 20px 12px 44px;
        }
        .head, .content {
          padding-left: 18px;
          padding-right: 18px;
        }
        h1 {
          font-size: 22px;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="shell">
        <div class="head">
          <p class="meta">${detail.publishedAt || ''}</p>
          <h1>${detail.title}</h1>
          <div class="actions">
            <a href="${KOTRA_URL}" target="_blank" rel="noreferrer">KOTRA 목록 보기</a>
          </div>
        </div>
        <div class="content">
          ${detail.contentHtml}
        </div>
      </div>
    </main>
  </body>
</html>`,
        );
      } catch {
        sendHtml(
          response,
          500,
          '<!doctype html><html lang="ko"><meta charset="utf-8"><title>KOTRA 상세 불러오기 실패</title><body style="font-family:sans-serif;padding:40px;">상세 페이지를 불러오지 못했습니다.</body></html>',
        );
      }
      return;
    }

    if (!requestUrl || requestUrl.pathname !== '/api/issue-reports') {
      next();
      return;
    }

    const forceRefresh = requestUrl.searchParams.get('refresh') === '1';

    try {
      if (forceRefresh) {
        const payload = await performIssueReportsRefresh();
        sendJson(response, 200, payload);
        return;
      }

      if (issueReportCache && isIssueReportCacheFresh()) {
        sendJson(response, 200, issueReportCache.payload);
        return;
      }

      if (issueReportCache) {
        void refreshIssueReportsCache().catch(() => undefined);
        sendJson(response, 200, issueReportCache.payload);
        return;
      }

      const payload = await refreshIssueReportsCache();
      sendJson(response, 200, payload);
    } catch {
      sendJson(response, forceRefresh ? 503 : 200, issueReportCache?.payload ?? createEmptyIssueReportResponse());
    }
  };
}

export function issueReportsProxyPlugin(): Plugin {
  return {
    name: 'issue-reports-proxy',
    configureServer(server) {
      server.middlewares.use(createIssueReportMiddleware());
    },
    configurePreviewServer(server) {
      server.middlewares.use(createIssueReportMiddleware());
    },
  };
}
