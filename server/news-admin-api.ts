import { createHmac, randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import express, { type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import unzipper from 'unzipper';

import { newsletterItems, shinhanNewsItems } from '../src/data/newsStaticSeeds';
import { shinhanNewsDetails } from '../src/data/shinhanNewsDetails';
import type { AdminSession, NewsletterRecord, ShinhanNewsRecord } from '../src/types/site';
import { isShinhanNewsNotice, sortShinhanNewsRecords } from '../src/utils/shinhanNews';

type StoredShinhanNewsIndexEntry = Omit<ShinhanNewsRecord, 'bodyHtml'> & {
  bodyFile?: string;
};

type StoredNewsletterIndexEntry = NewsletterRecord;

type RequestWithSession = Request & {
  adminSession?: AdminSession;
};

const app = express();
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 100 * 1024 * 1024,
  },
});

const PORT = Number(process.env.NEWS_ADMIN_API_PORT ?? 4174);
const RUNTIME_MODE = process.env.NEWS_ADMIN_RUNTIME_MODE === 'readonly' ? 'readonly' : 'enabled';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME ?? 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? 'admin1234';
const SESSION_SECRET = process.env.SESSION_SECRET ?? 'local-news-admin-secret';
const COOKIE_NAME = 'shinhan_news_admin_session';

const STORAGE_ROOT = path.resolve(process.cwd(), 'storage/managed-content');
const SHINHAN_NEWS_ROOT = path.join(STORAGE_ROOT, 'news/shinhan-news');
const SHINHAN_NEWS_INDEX_PATH = path.join(SHINHAN_NEWS_ROOT, 'index.json');
const SHINHAN_NEWS_ITEMS_ROOT = path.join(SHINHAN_NEWS_ROOT, 'items');
const NEWSLETTER_ROOT = path.join(STORAGE_ROOT, 'news/newsletter');
const NEWSLETTER_INDEX_PATH = path.join(NEWSLETTER_ROOT, 'index.json');
const NEWSLETTER_FILES_ROOT = path.join(NEWSLETTER_ROOT, 'files');
const PUBLIC_ROOT = path.resolve(process.cwd(), 'public');

const staticShinhanNewsRecords: ShinhanNewsRecord[] = sortShinhanNewsRecords(
  shinhanNewsItems.map((item) => {
    const detail = shinhanNewsDetails[item.id];

    return {
      ...item,
      titleEn: item.title,
      summaryEn: item.summary,
      author: detail?.author,
      bodyHtml: detail?.bodyHtml,
      status: 'published' as const,
      createdAt: item.publishedAt,
      updatedAt: item.publishedAt,
    };
  }),
);

const staticNewsletterRecords: NewsletterRecord[] = newsletterItems
  .map((item) => ({
    ...item,
    downloadUrl: item.downloadHref,
    status: 'published' as const,
    previewManifestUrl: item.downloadHref
      ? `/newsletters/render/${item.downloadHref.split('/').pop()?.replace(/\.zip$/i, '')}/manifest.json`
      : null,
    createdAt: item.publishedAt,
    updatedAt: item.publishedAt,
  }))
  .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

app.use(express.json({ limit: '12mb' }));
app.use('/managed-content', express.static(STORAGE_ROOT));

function sendJson(response: Response, statusCode: number, payload: unknown) {
  response.status(statusCode).json(payload);
}

function ensureEnabled(response: Response) {
  if (RUNTIME_MODE === 'enabled') {
    return true;
  }

  sendJson(response, 501, {
    message: '현재 런타임은 읽기 전용입니다.',
    code: 'NEWS_ADMIN_READONLY',
  });
  return false;
}

function parseCookies(request: Request) {
  const rawCookie = request.headers.cookie ?? '';

  return rawCookie.split(';').reduce<Record<string, string>>((accumulator, pair) => {
    const [rawKey, ...rawValue] = pair.split('=');
    const key = rawKey?.trim();

    if (!key) {
      return accumulator;
    }

    accumulator[key] = decodeURIComponent(rawValue.join('=').trim());
    return accumulator;
  }, {});
}

function signSession(username: string) {
  const signature = createHmac('sha256', SESSION_SECRET).update(username).digest('hex');
  return `${username}.${signature}`;
}

function verifySession(token?: string | null) {
  if (!token) {
    return null;
  }

  const [username, signature] = token.split('.');

  if (!username || !signature) {
    return null;
  }

  const expected = createHmac('sha256', SESSION_SECRET).update(username).digest('hex');
  return expected === signature ? username : null;
}

function buildSession(request: Request): AdminSession {
  if (RUNTIME_MODE !== 'enabled') {
    return {
      mode: 'readonly',
      isAuthenticated: false,
      isReadOnly: true,
    };
  }

  const cookies = parseCookies(request);
  const username = verifySession(cookies[COOKIE_NAME]);

  return {
    mode: 'enabled',
    isAuthenticated: Boolean(username),
    isReadOnly: false,
    username: username ?? undefined,
  };
}

function attachSession(request: RequestWithSession, _response: Response, next: NextFunction) {
  request.adminSession = buildSession(request);
  next();
}

function requireAdmin(request: RequestWithSession, response: Response, next: NextFunction) {
  if (!request.adminSession?.isAuthenticated) {
    sendJson(response, 401, {
      message: '관리자 로그인이 필요합니다.',
      code: 'NEWS_ADMIN_UNAUTHORIZED',
    });
    return;
  }

  next();
}

function setSessionCookie(response: Response, username: string) {
  response.setHeader(
    'Set-Cookie',
    `${COOKIE_NAME}=${encodeURIComponent(signSession(username))}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${60 * 60 * 8}`,
  );
}

function clearSessionCookie(response: Response) {
  response.setHeader('Set-Cookie', `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`);
}

function sanitizeId(value: string, prefix: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || `${prefix}-${randomUUID()}`;
}

function sortByPublishedDate<T extends { publishedAt: string }>(items: T[]) {
  return [...items].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

function toPublicUrl(...segments: string[]) {
  return `/${segments.map((segment) => segment.split('/').map(encodeURIComponent).join('/')).join('/')}`;
}

async function ensureStorageRoots() {
  await fs.mkdir(SHINHAN_NEWS_ITEMS_ROOT, { recursive: true });
  await fs.mkdir(NEWSLETTER_FILES_ROOT, { recursive: true });
}

async function readJsonFile<T>(filePath: string) {
  try {
    const raw = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function writeJsonFile(filePath: string, payload: unknown) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(payload, null, 2), 'utf-8');
}

async function fileExists(filePath: string) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function readStaticPreviewManifest(previewManifestUrl: string) {
  const manifestPath = path.join(PUBLIC_ROOT, previewManifestUrl.replace(/^\//, ''));
  return readJsonFile<{ slug?: string; pdf?: string | null; images: string[] }>(manifestPath);
}

async function readStoredShinhanNewsIndex() {
  return readJsonFile<StoredShinhanNewsIndexEntry[]>(SHINHAN_NEWS_INDEX_PATH);
}

async function readStoredNewsletterIndex() {
  return readJsonFile<StoredNewsletterIndexEntry[]>(NEWSLETTER_INDEX_PATH);
}

async function loadShinhanNewsRecords(includeBodyHtml: boolean) {
  const storedIndex = await readStoredShinhanNewsIndex();

  if (!storedIndex) {
    return includeBodyHtml
      ? staticShinhanNewsRecords
      : staticShinhanNewsRecords.map(({ bodyHtml, ...item }) => ({ ...item, bodyHtml: undefined }));
  }

  const items = await Promise.all(
    storedIndex.map(async (item) => {
      const storedBodyPath = item.bodyFile ? path.join(SHINHAN_NEWS_ITEMS_ROOT, item.bodyFile) : null;
      const staticFallback = staticShinhanNewsRecords.find((record) => record.id === item.id)?.bodyHtml;
      let bodyHtml: string | undefined;

      if (includeBodyHtml && storedBodyPath && (await fileExists(storedBodyPath))) {
        bodyHtml = await fs.readFile(storedBodyPath, 'utf-8');
      } else if (includeBodyHtml) {
        bodyHtml = staticFallback;
      }

      return {
        ...item,
        bodyHtml,
      } satisfies ShinhanNewsRecord;
    }),
  );

  return sortShinhanNewsRecords(items);
}

async function loadShinhanNewsRecord(newsId: string) {
  const items = await loadShinhanNewsRecords(true);
  return items.find((item) => item.id === newsId) ?? null;
}

async function loadNewsletterRecords() {
  const storedIndex = await readStoredNewsletterIndex();
  return sortByPublishedDate(storedIndex ?? staticNewsletterRecords);
}

async function loadNewsletterRecord(newsletterId: string) {
  const items = await loadNewsletterRecords();
  return items.find((item) => item.id === newsletterId) ?? null;
}

async function unzipPreview(buffer: Buffer, destinationDir: string) {
  await fs.rm(destinationDir, { recursive: true, force: true });
  await fs.mkdir(destinationDir, { recursive: true });

  const zip = await unzipper.Open.buffer(buffer);

  await Promise.all(
    zip.files.map(async (entry) => {
      if (entry.type === 'Directory') {
        return;
      }

      const normalizedPath = entry.path.replace(/\\/g, '/');

      if (normalizedPath.includes('..')) {
        throw new Error('ZIP 파일 경로가 올바르지 않습니다.');
      }

      const outputPath = path.join(destinationDir, normalizedPath);
      await fs.mkdir(path.dirname(outputPath), { recursive: true });
      await fs.writeFile(outputPath, await entry.buffer());
    }),
  );
}

async function saveShinhanNewsRecord(payload: Partial<ShinhanNewsRecord> & { title: string; summary: string; publishedAt: string; bodyHtml?: string }) {
  const newsId = sanitizeId(payload.id ?? payload.title, 'news');
  const bodyFile = `${newsId}.html`;
  const existingIndex = (await readStoredShinhanNewsIndex()) ?? staticShinhanNewsRecords.map(({ bodyHtml, ...item }) => ({
    ...item,
    bodyFile: undefined,
  }));
  const existing = existingIndex.find((item) => item.id === newsId) ?? null;
  const nextRecord: StoredShinhanNewsIndexEntry = {
    id: newsId,
    category: payload.category === 'seminar' ? 'seminar' : 'flash',
    categoryLabel: payload.category === 'seminar' ? '세미나' : existing && isShinhanNewsNotice(existing) ? '공지' : 'FLASH',
    title: payload.title.trim(),
    titleEn: (payload.titleEn ?? payload.title).trim(),
    summary: payload.summary.trim(),
    summaryEn: (payload.summaryEn ?? payload.summary).trim(),
    publishedAt: payload.publishedAt.trim(),
    author: payload.author?.trim() || undefined,
    status: 'published',
    createdAt: payload.createdAt ?? existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    bodyFile,
  };

  const nextIndex = existingIndex.some((item) => item.id === newsId)
    ? existingIndex.map((item) => (item.id === newsId ? nextRecord : item))
    : [nextRecord, ...existingIndex];

  await fs.mkdir(SHINHAN_NEWS_ITEMS_ROOT, { recursive: true });
  await fs.writeFile(path.join(SHINHAN_NEWS_ITEMS_ROOT, bodyFile), payload.bodyHtml ?? '', 'utf-8');
  await writeJsonFile(SHINHAN_NEWS_INDEX_PATH, sortShinhanNewsRecords(nextIndex));

  return loadShinhanNewsRecord(newsId);
}

async function deleteShinhanNews(newsId: string) {
  const existingIndex = (await readStoredShinhanNewsIndex()) ?? staticShinhanNewsRecords.map(({ bodyHtml, ...item }) => ({
    ...item,
    bodyFile: undefined,
  }));
  const target = existingIndex.find((item) => item.id === newsId);
  const nextIndex = existingIndex.filter((item) => item.id !== newsId);

  await writeJsonFile(SHINHAN_NEWS_INDEX_PATH, nextIndex);

  if (target?.bodyFile) {
    await fs.rm(path.join(SHINHAN_NEWS_ITEMS_ROOT, target.bodyFile), { force: true });
  }
}

async function saveNewsletterRecord(
  fields: Record<string, string | undefined>,
  files: Partial<Record<'originalFile' | 'previewZip', Express.Multer.File[]>>,
) {
  const newsletterId = sanitizeId(fields.id ?? fields.title ?? fields.issue ?? randomUUID(), 'newsletter');
  const existingItems = (await readStoredNewsletterIndex()) ?? staticNewsletterRecords;
  const existing = existingItems.find((item) => item.id === newsletterId) ?? null;
  const originalFile = files.originalFile?.[0];
  const previewZip = files.previewZip?.[0];

  if (!existing && (!originalFile || !previewZip)) {
    throw new Error('새 소식지는 원본 파일과 preview ZIP이 모두 필요합니다.');
  }

  const itemRoot = path.join(NEWSLETTER_FILES_ROOT, newsletterId);
  const originalRoot = path.join(itemRoot, 'original');
  const previewRoot = path.join(itemRoot, 'preview');

  let downloadUrl = existing?.downloadUrl ?? existing?.downloadHref ?? undefined;
  let previewManifestUrl = existing?.previewManifestUrl ?? null;
  let previewImages = existing?.previewImages ?? undefined;
  let downloadFileName = existing?.downloadFileName ?? undefined;

  if (originalFile) {
    await fs.rm(originalRoot, { recursive: true, force: true });
    await fs.mkdir(originalRoot, { recursive: true });

    const safeName = path.basename(originalFile.originalname);
    const outputPath = path.join(originalRoot, safeName);
    await fs.writeFile(outputPath, originalFile.buffer);

    downloadFileName = safeName;
    downloadUrl = toPublicUrl('managed-content', 'news', 'newsletter', 'files', newsletterId, 'original', safeName);
  }

  if (previewZip) {
    await unzipPreview(previewZip.buffer, previewRoot);
    const manifestPath = path.join(previewRoot, 'manifest.json');
    const manifest = await readJsonFile<{ images: string[] }>(manifestPath);

    if (!manifest) {
      throw new Error('preview ZIP 안에 manifest.json 이 필요합니다.');
    }

    previewManifestUrl = toPublicUrl('managed-content', 'news', 'newsletter', 'files', newsletterId, 'preview', 'manifest.json');
    previewImages = manifest.images;
  }

  const nextRecord: StoredNewsletterIndexEntry = {
    id: newsletterId,
    issue: (fields.issue ?? existing?.issue ?? '').trim(),
    title: (fields.title ?? existing?.title ?? '').trim(),
    titleEn: (fields.titleEn ?? fields.title ?? existing?.titleEn ?? existing?.title ?? '').trim(),
    summary: (fields.summary ?? existing?.summary ?? '').trim(),
    summaryEn: (fields.summaryEn ?? fields.summary ?? existing?.summaryEn ?? existing?.summary ?? '').trim(),
    publishedAt: (fields.publishedAt ?? existing?.publishedAt ?? '').trim(),
    href: existing?.href ?? `/news/newsletter/${newsletterId}`,
    language: (fields.language ?? existing?.language ?? '').trim() || undefined,
    languageEn: (fields.languageEn ?? existing?.languageEn ?? '').trim() || undefined,
    downloadHref: downloadUrl,
    downloadUrl,
    previewManifestUrl,
    previewImages,
    downloadFileName,
    status: 'published',
    createdAt: existing?.createdAt ?? new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const nextItems = existingItems.some((item) => item.id === newsletterId)
    ? existingItems.map((item) => (item.id === newsletterId ? nextRecord : item))
    : [nextRecord, ...existingItems];

  await writeJsonFile(NEWSLETTER_INDEX_PATH, sortByPublishedDate(nextItems));
  return nextRecord;
}

async function deleteNewsletter(newsletterId: string) {
  const existingItems = (await readStoredNewsletterIndex()) ?? staticNewsletterRecords;
  const nextItems = existingItems.filter((item) => item.id !== newsletterId);
  await writeJsonFile(NEWSLETTER_INDEX_PATH, nextItems);
  await fs.rm(path.join(NEWSLETTER_FILES_ROOT, newsletterId), { recursive: true, force: true });
}

async function readNewsletterPreviewManifest(newsletterId: string) {
  const record = await loadNewsletterRecord(newsletterId);

  if (!record?.previewManifestUrl) {
    return null;
  }

  if (record.previewManifestUrl.startsWith('/managed-content/')) {
    return readJsonFile<{ slug?: string; pdf?: string | null; images: string[] }>(
      path.join(STORAGE_ROOT, record.previewManifestUrl.replace('/managed-content/', '')),
    );
  }

  return readStaticPreviewManifest(record.previewManifestUrl);
}

app.use(attachSession);

app.get('/api/admin/session', (request: RequestWithSession, response) => {
  sendJson(response, 200, request.adminSession ?? buildSession(request));
});

app.post('/api/admin/login', (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  const username = typeof request.body?.username === 'string' ? request.body.username : '';
  const password = typeof request.body?.password === 'string' ? request.body.password : '';

  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    sendJson(response, 401, {
      message: '아이디 또는 비밀번호가 올바르지 않습니다.',
      code: 'NEWS_ADMIN_INVALID_CREDENTIALS',
    });
    return;
  }

  setSessionCookie(response, username);
  sendJson(response, 200, {
    mode: 'enabled',
    isAuthenticated: true,
    isReadOnly: false,
    username,
  } satisfies AdminSession);
});

app.post('/api/admin/logout', (_request, response) => {
  clearSessionCookie(response);
  sendJson(response, 200, { ok: true });
});

app.get('/api/news/shinhan-news', async (_request, response) => {
  sendJson(response, 200, { items: await loadShinhanNewsRecords(false) });
});

app.get('/api/news/shinhan-news/:newsId', async (request, response) => {
  const item = await loadShinhanNewsRecord(request.params.newsId);

  if (!item) {
    sendJson(response, 404, { message: '기사를 찾을 수 없습니다.' });
    return;
  }

  sendJson(response, 200, item);
});

app.get('/api/news/newsletters', async (_request, response) => {
  sendJson(response, 200, { items: await loadNewsletterRecords() });
});

app.get('/api/news/newsletters/:newsletterId', async (request, response) => {
  const item = await loadNewsletterRecord(request.params.newsletterId);

  if (!item) {
    sendJson(response, 404, { message: '소식지를 찾을 수 없습니다.' });
    return;
  }

  sendJson(response, 200, item);
});

app.get('/api/news/newsletters/:newsletterId/preview/manifest', async (request, response) => {
  const manifest = await readNewsletterPreviewManifest(request.params.newsletterId);

  if (!manifest) {
    sendJson(response, 404, { message: '미리보기 파일을 찾을 수 없습니다.' });
    return;
  }

  sendJson(response, 200, manifest);
});

app.get('/api/admin/news/shinhan-news', requireAdmin, async (_request, response) => {
  sendJson(response, 200, {
    items: await loadShinhanNewsRecords(true),
    mode: RUNTIME_MODE,
  });
});

app.post('/api/admin/news/shinhan-news', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  try {
    const item = await saveShinhanNewsRecord(request.body ?? {});
    sendJson(response, 200, item);
  } catch (error) {
    sendJson(response, 400, {
      message: error instanceof Error ? error.message : '기사 저장에 실패했습니다.',
    });
  }
});

app.put('/api/admin/news/shinhan-news/:newsId', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  try {
    const item = await saveShinhanNewsRecord({
      ...(request.body ?? {}),
      id: request.params.newsId,
    });
    sendJson(response, 200, item);
  } catch (error) {
    sendJson(response, 400, {
      message: error instanceof Error ? error.message : '기사 수정에 실패했습니다.',
    });
  }
});

app.delete('/api/admin/news/shinhan-news/:newsId', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  await deleteShinhanNews(request.params.newsId);
  sendJson(response, 200, { ok: true });
});

app.get('/api/admin/news/newsletters', requireAdmin, async (_request, response) => {
  sendJson(response, 200, {
    items: await loadNewsletterRecords(),
    mode: RUNTIME_MODE,
  });
});

app.post(
  '/api/admin/news/newsletters',
  requireAdmin,
  upload.fields([
    { name: 'originalFile', maxCount: 1 },
    { name: 'previewZip', maxCount: 1 },
  ]),
  async (request, response) => {
    if (!ensureEnabled(response)) {
      return;
    }

    try {
      const item = await saveNewsletterRecord(
        request.body as Record<string, string | undefined>,
        request.files as Partial<Record<'originalFile' | 'previewZip', Express.Multer.File[]>>,
      );
      sendJson(response, 200, item);
    } catch (error) {
      sendJson(response, 400, {
        message: error instanceof Error ? error.message : '소식지 저장에 실패했습니다.',
      });
    }
  },
);

app.put(
  '/api/admin/news/newsletters/:newsletterId',
  requireAdmin,
  upload.fields([
    { name: 'originalFile', maxCount: 1 },
    { name: 'previewZip', maxCount: 1 },
  ]),
  async (request, response) => {
    if (!ensureEnabled(response)) {
      return;
    }

    try {
      const item = await saveNewsletterRecord(
        {
          ...(request.body as Record<string, string | undefined>),
          id: request.params.newsletterId,
        },
        request.files as Partial<Record<'originalFile' | 'previewZip', Express.Multer.File[]>>,
      );
      sendJson(response, 200, item);
    } catch (error) {
      sendJson(response, 400, {
        message: error instanceof Error ? error.message : '소식지 수정에 실패했습니다.',
      });
    }
  },
);

app.delete('/api/admin/news/newsletters/:newsletterId', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  await deleteNewsletter(request.params.newsletterId);
  sendJson(response, 200, { ok: true });
});

app.use((_request, response) => {
  sendJson(response, 404, { message: 'Not Found' });
});

await ensureStorageRoots();
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`[news-admin-api] listening on http://localhost:${PORT}`);
});
