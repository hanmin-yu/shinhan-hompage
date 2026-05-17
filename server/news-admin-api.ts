import { createHmac, randomUUID } from 'node:crypto';
import { promises as fs } from 'node:fs';
import path from 'node:path';

import express, { type NextFunction, type Request, type Response } from 'express';
import multer from 'multer';
import unzipper from 'unzipper';

import { newsletterItems, shinhanNewsItems } from '../src/data/newsStaticSeeds';
import { staticSiteContent } from '../src/data/siteContentStatic';
import { shinhanNewsDetails } from '../src/data/shinhanNewsDetails';
import { handleIssueReportsRequest } from '../src/server/issueReportsHttp';
import type { AdminSession, ManagedMember, SiteContentGroupKey, SiteContentPayload, NewsletterRecord, ShinhanNewsRecord } from '../src/types/site';
import { sortShinhanNewsRecords } from '../src/utils/shinhanNews';

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

const STORAGE_ROOT = resolveManagedContentRoot();
const SHINHAN_NEWS_ROOT = path.join(STORAGE_ROOT, 'news/shinhan-news');
const SHINHAN_NEWS_INDEX_PATH = path.join(SHINHAN_NEWS_ROOT, 'index.json');
const SHINHAN_NEWS_ITEMS_ROOT = path.join(SHINHAN_NEWS_ROOT, 'items');
const SHINHAN_NEWS_ASSETS_ROOT = path.join(SHINHAN_NEWS_ROOT, 'assets');
const NEWSLETTER_ROOT = path.join(STORAGE_ROOT, 'news/newsletter');
const NEWSLETTER_INDEX_PATH = path.join(NEWSLETTER_ROOT, 'index.json');
const NEWSLETTER_FILES_ROOT = path.join(NEWSLETTER_ROOT, 'files');
const SITE_ROOT = path.join(STORAGE_ROOT, 'site');
const SITE_CONTENT_PATH = path.join(SITE_ROOT, 'content.json');
const SITE_ASSETS_ROOT = path.join(SITE_ROOT, 'assets');
const PUBLIC_ROOT = path.resolve(process.cwd(), 'public');

const SITE_CONTENT_GROUPS: SiteContentGroupKey[] = ['global', 'home', 'news', 'about', 'services', 'recruit', 'contact', 'offices', 'it', 'members', 'legal'];

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

function resolveManagedContentRoot() {
  const configuredRoot = process.env.MANAGED_CONTENT_ROOT?.trim();

  if (configuredRoot) {
    return path.resolve(configuredRoot);
  }

  return path.resolve(process.cwd(), 'storage/managed-content');
}

function createOpaqueId(prefix: string) {
  return `${prefix}-${randomUUID()}`;
}

function createOpaqueFileName(originalName: string | undefined, fallbackExtension: string) {
  const extension = originalName ? path.extname(path.basename(originalName)).toLowerCase() : '';
  return `${randomUUID()}${extension || fallbackExtension}`;
}

function sanitizeId(value: string, prefix: string) {
  const normalized = value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return normalized || `${prefix}-${randomUUID()}`;
}

function resolveRecordId(value: string | null | undefined, prefix: string) {
  const trimmed = value?.trim();
  return trimmed ? sanitizeId(trimmed, prefix) : createOpaqueId(prefix);
}

function sortByPublishedDate<T extends { publishedAt: string }>(items: T[]) {
  return [...items].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

function padDatePart(value: number | string) {
  return String(value).padStart(2, '0');
}

function getTodayDateLabel() {
  const now = new Date();
  return `${now.getFullYear()}.${padDatePart(now.getMonth() + 1)}.${padDatePart(now.getDate())}`;
}

function getCurrentIssueLabel() {
  const now = new Date();
  return `${now.getFullYear()}.${padDatePart(now.getMonth() + 1)}`;
}

function inferNewsletterMetadata(fileName?: string) {
  const baseName = fileName ? path.basename(fileName).replace(/\.[^.]+$/i, '').trim() : '';
  const issueMatch =
    baseName.match(/(20\d{2})\s*[년._-]?\s*(1[0-2]|0?[1-9])\s*월?/i) ??
    baseName.match(/(20\d{2})\s*[-._]\s*(1[0-2]|0?[1-9])/i);
  const issue = issueMatch ? `${issueMatch[1]}.${padDatePart(issueMatch[2])}` : getCurrentIssueLabel();

  return {
    issue,
    publishedAt: issue ? `${issue}.01` : getTodayDateLabel(),
    title: baseName || '신한관세법인 소식지',
    summary: `${issue} 신한관세법인 소식지`,
  };
}

function toPublicUrl(...segments: string[]) {
  return `/${segments.map((segment) => segment.split('/').map(encodeURIComponent).join('/')).join('/')}`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function plainTextToHtml(value: string) {
  return value
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, '<br>')}</p>`)
    .join('\n');
}

function isImageUpload(file: Express.Multer.File) {
  return /^image\/(png|jpe?g|webp|gif)$/i.test(file.mimetype);
}

async function writeShinhanNewsImage(newsId: string, file: Express.Multer.File) {
  if (!isImageUpload(file)) {
    throw new Error('이미지 파일은 PNG, JPG, WEBP, GIF 형식만 업로드할 수 있습니다.');
  }

  const assetRoot = path.join(SHINHAN_NEWS_ASSETS_ROOT, newsId);
  await fs.mkdir(assetRoot, { recursive: true });

  const storedFileName = createOpaqueFileName(file.originalname, '.png');
  await fs.writeFile(path.join(assetRoot, storedFileName), file.buffer);

  return toPublicUrl('managed-content', 'news', 'shinhan-news', 'assets', newsId, storedFileName);
}

function replaceImageMarkers(bodyHtml: string, uploadIds: string[], urls: string[]) {
  return uploadIds.reduce((nextHtml, uploadId, index) => {
    const url = urls[index];

    if (!url) {
      return nextHtml;
    }

    return nextHtml.split(`__NEWS_IMAGE_ID__${uploadId}__`).join(url);
  }, bodyHtml);
}

function parseJsonStringArray(value?: string) {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
}

async function ensureStorageRoots() {
  await fs.mkdir(SHINHAN_NEWS_ITEMS_ROOT, { recursive: true });
  await fs.mkdir(SHINHAN_NEWS_ASSETS_ROOT, { recursive: true });
  await fs.mkdir(NEWSLETTER_FILES_ROOT, { recursive: true });
  await fs.mkdir(SITE_ASSETS_ROOT, { recursive: true });
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

function cloneStaticSiteContent() {
  return JSON.parse(JSON.stringify(staticSiteContent)) as SiteContentPayload;
}

function isSiteContentGroupKey(value: string): value is SiteContentGroupKey {
  return SITE_CONTENT_GROUPS.includes(value as SiteContentGroupKey);
}

async function readStoredSiteContent() {
  return readJsonFile<SiteContentPayload>(SITE_CONTENT_PATH);
}

async function loadSiteContentPayload() {
  const stored = await readStoredSiteContent();
  return stored ?? cloneStaticSiteContent();
}

async function saveSiteContentPayload(payload: SiteContentPayload) {
  await writeJsonFile(SITE_CONTENT_PATH, payload);
  return payload;
}

function createManagedMemberId(name: string) {
  const normalized = name
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9가-힣]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return `member-${normalized || randomUUID()}`;
}

function removeMemberReferences(content: SiteContentPayload, memberId: string) {
  const nextContent = cloneStaticSiteContent();
  Object.assign(nextContent, content);
  nextContent.members = JSON.parse(JSON.stringify(content.members));
  nextContent.members.managedMembers = content.members.managedMembers.filter((member) => member.id !== memberId);
  nextContent.members.expertCategoryConfig.assignments = Object.fromEntries(
    Object.entries(content.members.expertCategoryConfig.assignments).map(([category, memberIds]) => [
      category,
      memberIds.filter((id) => id !== memberId),
    ]),
  );
  nextContent.members.expertCategoryConfig.highlights = Object.fromEntries(
    Object.entries(content.members.expertCategoryConfig.highlights).map(([category, highlights]) => {
      const nextHighlights = { ...highlights };
      delete nextHighlights[memberId];
      return [category, nextHighlights];
    }),
  );
  nextContent.it.contactMemberIds = content.it.contactMemberIds.filter((id) => id !== memberId);
  return nextContent;
}

async function writeManagedAsset(group: string, file: Express.Multer.File) {
  if (!isImageUpload(file)) {
    throw new Error('이미지 파일은 PNG, JPG, WEBP, GIF 형식만 업로드할 수 있습니다.');
  }

  const assetGroup = group.trim() || 'general';
  const outputRoot = path.join(SITE_ASSETS_ROOT, assetGroup);
  await fs.mkdir(outputRoot, { recursive: true });

  const storedFileName = createOpaqueFileName(file.originalname, '.png');
  await fs.writeFile(path.join(outputRoot, storedFileName), file.buffer);

  return toPublicUrl('managed-content', 'site', 'assets', assetGroup, storedFileName);
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

async function saveShinhanNewsRecord(
  payload: Partial<ShinhanNewsRecord> & {
    title: string;
    summary: string;
    publishedAt: string;
    bodyHtml?: string;
    bodyText?: string;
    entryType?: 'notice' | 'flash' | 'seminar';
    bodyImageIds?: string;
  },
  files: Partial<Record<'bodyImages' | 'flashImage', Express.Multer.File[]>> = {},
) {
  const newsId = resolveRecordId(payload.id, 'news');
  const existingIndex = (await readStoredShinhanNewsIndex()) ?? staticShinhanNewsRecords.map(({ bodyHtml, ...item }) => ({
    ...item,
    bodyFile: undefined,
  }));
  const existing = existingIndex.find((item) => item.id === newsId) ?? null;
  const bodyFile = existing?.bodyFile ?? createOpaqueFileName(undefined, '.html');
  const entryType = payload.entryType ?? (payload.category === 'seminar' ? 'seminar' : 'flash');
  const category = entryType === 'seminar' ? 'seminar' : 'flash';
  const categoryLabel = entryType === 'notice' ? '공지' : entryType === 'seminar' ? '세미나' : 'FLASH';
  const bodyImages = files.bodyImages ?? [];
  const bodyImageIds = parseJsonStringArray(payload.bodyImageIds);
  const bodyImageUrls = await Promise.all(bodyImages.map((file) => writeShinhanNewsImage(newsId, file)));
  const flashImage = files.flashImage?.[0];
  const flashImageUrl = flashImage ? await writeShinhanNewsImage(newsId, flashImage) : null;
  const rawBodyHtml = payload.bodyHtml?.trim() || (payload.bodyText ? plainTextToHtml(payload.bodyText) : '');
  const bodyHtmlWithInlineImages = replaceImageMarkers(rawBodyHtml, bodyImageIds, bodyImageUrls);
  const nextBodyHtml =
    flashImageUrl && entryType === 'flash'
      ? `<figure class="shinhan-news-flash-image"><img src="${flashImageUrl}" alt="${escapeHtml(payload.title.trim())}"></figure>${bodyHtmlWithInlineImages}`
      : bodyHtmlWithInlineImages;
  const nextRecord: StoredShinhanNewsIndexEntry = {
    id: newsId,
    category,
    categoryLabel,
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
  await fs.writeFile(path.join(SHINHAN_NEWS_ITEMS_ROOT, bodyFile), nextBodyHtml, 'utf-8');
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
  const newsletterId = resolveRecordId(fields.id, 'newsletter');
  const existingItems = (await readStoredNewsletterIndex()) ?? staticNewsletterRecords;
  const existing = existingItems.find((item) => item.id === newsletterId) ?? null;
  const originalFile = files.originalFile?.[0];
  const previewZip = files.previewZip?.[0];

  if (!existing && !originalFile) {
    throw new Error('새 소식지는 PDF 파일이 필요합니다.');
  }

  if (originalFile && path.extname(originalFile.originalname).toLowerCase() !== '.pdf') {
    throw new Error('소식지는 PDF 파일만 업로드할 수 있습니다.');
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

    const originalDownloadName = path.basename(originalFile.originalname);
    const storedFileName = createOpaqueFileName(originalFile.originalname, '.pdf');
    const outputPath = path.join(originalRoot, storedFileName);
    await fs.writeFile(outputPath, originalFile.buffer);

    downloadFileName = originalDownloadName;
    downloadUrl = toPublicUrl('managed-content', 'news', 'newsletter', 'files', newsletterId, 'original', storedFileName);

    if (!previewZip) {
      previewManifestUrl = null;
      previewImages = undefined;
    }
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

  const inferred = inferNewsletterMetadata(originalFile?.originalname ?? existing?.downloadFileName ?? existing?.title);
  const nextIssue = (fields.issue ?? existing?.issue ?? inferred.issue).trim();
  const nextTitle = (fields.title ?? existing?.title ?? inferred.title).trim();
  const nextSummary = (fields.summary ?? existing?.summary ?? inferred.summary).trim();

  const nextRecord: StoredNewsletterIndexEntry = {
    id: newsletterId,
    issue: nextIssue,
    title: nextTitle,
    titleEn: (fields.titleEn ?? fields.title ?? existing?.titleEn ?? existing?.title ?? nextTitle).trim(),
    summary: nextSummary,
    summaryEn: (fields.summaryEn ?? fields.summary ?? existing?.summaryEn ?? existing?.summary ?? nextSummary).trim(),
    publishedAt: (fields.publishedAt ?? existing?.publishedAt ?? inferred.publishedAt).trim(),
    href: `/news/newsletter/${newsletterId}`,
    language: (fields.language ?? existing?.language ?? '국문').trim() || undefined,
    languageEn: (fields.languageEn ?? existing?.languageEn ?? 'Korean').trim() || undefined,
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

app.use(async (request, response, next) => {
  try {
    const handled = await handleIssueReportsRequest(request, response);

    if (!handled) {
      next();
    }
  } catch (error) {
    next(error);
  }
});

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
    sendJson(response, 404, { message: '글을 찾을 수 없습니다.' });
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

app.get('/api/content/site', async (_request, response) => {
  sendJson(response, 200, await loadSiteContentPayload());
});

app.get('/api/admin/content/site', requireAdmin, async (_request, response) => {
  sendJson(response, 200, {
    mode: RUNTIME_MODE,
    content: await loadSiteContentPayload(),
  });
});

app.get('/api/admin/content/:groupId', requireAdmin, async (request, response) => {
  if (!isSiteContentGroupKey(request.params.groupId)) {
    sendJson(response, 404, { message: '콘텐츠 그룹을 찾을 수 없습니다.' });
    return;
  }

  const content = await loadSiteContentPayload();
  sendJson(response, 200, {
    mode: RUNTIME_MODE,
    groupId: request.params.groupId,
    content: content[request.params.groupId],
  });
});

app.put('/api/admin/content/:groupId', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  if (!isSiteContentGroupKey(request.params.groupId)) {
    sendJson(response, 404, { message: '콘텐츠 그룹을 찾을 수 없습니다.' });
    return;
  }

  const payload = request.body?.content;

  if (!payload || typeof payload !== 'object') {
    sendJson(response, 400, { message: '저장할 콘텐츠가 비어 있습니다.' });
    return;
  }

  const content = await loadSiteContentPayload();
  const nextContent = {
    ...content,
    [request.params.groupId]: payload,
  } as SiteContentPayload;

  await saveSiteContentPayload(nextContent);

  sendJson(response, 200, {
    mode: RUNTIME_MODE,
    groupId: request.params.groupId,
    content: nextContent[request.params.groupId],
  });
});

app.get('/api/admin/members', requireAdmin, async (_request, response) => {
  const content = await loadSiteContentPayload();
  sendJson(response, 200, {
    mode: RUNTIME_MODE,
    members: content.members.managedMembers,
    expertCategoryConfig: content.members.expertCategoryConfig,
    contactMemberIds: content.it.contactMemberIds,
  });
});

app.post('/api/admin/members', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  const payload = request.body?.member as Partial<ManagedMember> | undefined;

  if (!payload?.name?.trim()) {
    sendJson(response, 400, { message: '이름은 필수입니다.' });
    return;
  }

  const content = await loadSiteContentPayload();
  const member: ManagedMember = {
    id: payload.id?.trim() || createManagedMemberId(payload.name),
    name: payload.name.trim(),
    phone: payload.phone?.trim() ?? '',
    email: payload.email?.trim() ?? '',
    title: payload.title?.trim() ?? '',
    department: payload.department?.trim() ?? '',
    practice: payload.practice?.trim() ?? '',
    accent: payload.accent?.trim() ?? '#526f9e',
    image: payload.image?.trim() || undefined,
    imageFit: payload.imageFit,
    imagePosition: payload.imagePosition?.trim() || undefined,
    careerHighlights: Array.isArray(payload.careerHighlights)
      ? payload.careerHighlights.map((item) => item.trim()).filter(Boolean)
      : [],
    groups: Array.isArray(payload.groups) && payload.groups.length ? payload.groups : ['expert'],
  };

  const existingIndex = content.members.managedMembers.findIndex((item) => item.id === member.id);
  const managedMembers = [...content.members.managedMembers];

  if (existingIndex >= 0) {
    managedMembers[existingIndex] = member;
  } else {
    managedMembers.unshift(member);
  }

  const nextContent: SiteContentPayload = {
    ...content,
    members: {
      ...content.members,
      managedMembers,
    },
  };

  await saveSiteContentPayload(nextContent);
  sendJson(response, 200, { member });
});

app.put('/api/admin/members/:memberId', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  const payload = request.body?.member as Partial<ManagedMember> | undefined;
  const memberId = request.params.memberId;
  const content = await loadSiteContentPayload();
  const existingIndex = content.members.managedMembers.findIndex((item) => item.id === memberId);

  if (existingIndex < 0) {
    sendJson(response, 404, { message: '구성원을 찾을 수 없습니다.' });
    return;
  }

  const current = content.members.managedMembers[existingIndex];
  const member: ManagedMember = {
    ...current,
    ...payload,
    id: memberId,
    name: payload?.name?.trim() || current.name,
    phone: payload?.phone?.trim() ?? current.phone,
    email: payload?.email?.trim() ?? current.email,
    title: payload?.title?.trim() ?? current.title,
    department: payload?.department?.trim() ?? current.department,
    practice: payload?.practice?.trim() ?? current.practice,
    accent: payload?.accent?.trim() ?? current.accent,
    image: payload?.image?.trim() || current.image,
    imagePosition: payload?.imagePosition?.trim() || current.imagePosition,
    careerHighlights: Array.isArray(payload?.careerHighlights)
      ? payload!.careerHighlights!.map((item) => item.trim()).filter(Boolean)
      : current.careerHighlights,
    groups: Array.isArray(payload?.groups) && payload.groups.length ? payload.groups : current.groups,
  };

  const managedMembers = [...content.members.managedMembers];
  managedMembers[existingIndex] = member;

  const nextContent: SiteContentPayload = {
    ...content,
    members: {
      ...content.members,
      managedMembers,
    },
  };

  await saveSiteContentPayload(nextContent);
  sendJson(response, 200, { member });
});

app.delete('/api/admin/members/:memberId', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  const content = await loadSiteContentPayload();
  const target = content.members.managedMembers.find((member) => member.id === request.params.memberId);

  if (!target) {
    sendJson(response, 404, { message: '구성원을 찾을 수 없습니다.' });
    return;
  }

  const nextContent = removeMemberReferences(content, request.params.memberId);
  await saveSiteContentPayload(nextContent);

  sendJson(response, 200, { ok: true });
});

app.put('/api/admin/members/config', requireAdmin, async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  const expertCategoryConfig = request.body?.expertCategoryConfig;
  const contactMemberIds = request.body?.contactMemberIds;

  if (!expertCategoryConfig || typeof expertCategoryConfig !== 'object' || !Array.isArray(contactMemberIds)) {
    sendJson(response, 400, { message: '구성원 설정 값이 올바르지 않습니다.' });
    return;
  }

  const content = await loadSiteContentPayload();
  const nextContent: SiteContentPayload = {
    ...content,
    members: {
      ...content.members,
      expertCategoryConfig,
    },
    it: {
      ...content.it,
      contactMemberIds,
    },
  };

  await saveSiteContentPayload(nextContent);
  sendJson(response, 200, { ok: true });
});

app.post('/api/admin/assets/upload', requireAdmin, upload.single('file'), async (request, response) => {
  if (!ensureEnabled(response)) {
    return;
  }

  const file = request.file;
  if (!file) {
    sendJson(response, 400, { message: '업로드할 파일이 필요합니다.' });
    return;
  }

  try {
    const url = await writeManagedAsset(String(request.body?.group ?? 'general'), file);
    sendJson(response, 200, { url });
  } catch (error) {
    sendJson(response, 400, {
      message: error instanceof Error ? error.message : '자산 업로드에 실패했습니다.',
    });
  }
});

app.get('/api/admin/news/shinhan-news', requireAdmin, async (_request, response) => {
  sendJson(response, 200, {
    items: await loadShinhanNewsRecords(true),
    mode: RUNTIME_MODE,
  });
});

app.post(
  '/api/admin/news/shinhan-news',
  requireAdmin,
  upload.fields([
    { name: 'bodyImages', maxCount: 20 },
    { name: 'flashImage', maxCount: 1 },
  ]),
  async (request, response) => {
    if (!ensureEnabled(response)) {
      return;
    }

    try {
      const item = await saveShinhanNewsRecord(
        request.body ?? {},
        request.files as Partial<Record<'bodyImages' | 'flashImage', Express.Multer.File[]>>,
      );
      sendJson(response, 200, item);
    } catch (error) {
      sendJson(response, 400, {
        message: error instanceof Error ? error.message : '글 저장에 실패했습니다.',
      });
    }
  },
);

app.put(
  '/api/admin/news/shinhan-news/:newsId',
  requireAdmin,
  upload.fields([
    { name: 'bodyImages', maxCount: 20 },
    { name: 'flashImage', maxCount: 1 },
  ]),
  async (request, response) => {
    if (!ensureEnabled(response)) {
      return;
    }

    try {
      const item = await saveShinhanNewsRecord(
        {
          ...(request.body ?? {}),
          id: request.params.newsId,
        },
        request.files as Partial<Record<'bodyImages' | 'flashImage', Express.Multer.File[]>>,
      );
      sendJson(response, 200, item);
    } catch (error) {
      sendJson(response, 400, {
        message: error instanceof Error ? error.message : '글 수정에 실패했습니다.',
      });
    }
  },
);

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
