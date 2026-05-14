import { resolveNewsAdminMode } from '../config/newsAdminMode';
import type { NewsletterRecord, ShinhanNewsRecord } from '../types/site';
import { getNewsletterDownloadFileName, getNewsletterPdfUrl, withNewsletterTitleBrandRecord } from '../utils/newsletter';
import {
  getNewsletterRecord as getStaticNewsletterRecord,
  getNewsletterRecords as getStaticNewsletterRecords,
  getShinhanNewsRecordWithDetail as getStaticShinhanNewsRecordWithDetail,
  getShinhanNewsRecords as getStaticShinhanNewsRecords,
} from './newsRepository';
import { sortShinhanNewsRecords } from '../utils/shinhanNews';

type NewsListResponse<T> = {
  items: T[];
};

const API_TIMEOUT_MS = 800;

function isEnabledMode() {
  return resolveNewsAdminMode() === 'enabled';
}

function mergeRecordsById<T extends { id: string }>(baseItems: T[], overrideItems: T[]) {
  const records = new Map(baseItems.map((item) => [item.id, item]));

  overrideItems.forEach((item) => {
    records.set(item.id, item);
  });

  return [...records.values()];
}

function normalizeNewsletterRecord(item: NewsletterRecord): NewsletterRecord {
  const brandedItem = withNewsletterTitleBrandRecord(item);

  return {
    ...brandedItem,
    downloadUrl: getNewsletterPdfUrl(item.downloadUrl ?? item.downloadHref, item.previewManifestUrl) ?? undefined,
    downloadFileName: getNewsletterDownloadFileName(
      getNewsletterPdfUrl(item.downloadUrl ?? item.downloadHref, item.previewManifestUrl),
      brandedItem.title,
    ),
  };
}

async function fetchJson<T>(url: string) {
  const controller = new AbortController();
  const timeoutId = globalThis.setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      credentials: 'same-origin',
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status}`);
    }

    return (await response.json()) as T;
  } finally {
    globalThis.clearTimeout(timeoutId);
  }
}

export async function loadShinhanNewsRecords() {
  const staticItems = getStaticShinhanNewsRecords();

  if (!isEnabledMode()) {
    return staticItems;
  }

  try {
    const payload = await fetchJson<NewsListResponse<ShinhanNewsRecord>>('/api/news/shinhan-news');
    return sortShinhanNewsRecords(mergeRecordsById(staticItems, payload.items ?? []));
  } catch {
    return staticItems;
  }
}

export async function loadShinhanNewsRecord(newsId: string) {
  if (!isEnabledMode()) {
    return getStaticShinhanNewsRecordWithDetail(newsId);
  }

  try {
    return await fetchJson<ShinhanNewsRecord>(`/api/news/shinhan-news/${newsId}`);
  } catch {
    return getStaticShinhanNewsRecordWithDetail(newsId);
  }
}

export async function loadNewsletterRecords() {
  const staticItems = getStaticNewsletterRecords();

  if (!isEnabledMode()) {
    return staticItems;
  }

  try {
    const payload = await fetchJson<NewsListResponse<NewsletterRecord>>('/api/news/newsletters');
    return mergeRecordsById(staticItems, payload.items ?? [])
      .map(normalizeNewsletterRecord)
      .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
  } catch {
    return staticItems;
  }
}

export async function loadNewsletterRecord(newsletterId: string) {
  if (!isEnabledMode()) {
    return getStaticNewsletterRecord(newsletterId);
  }

  try {
    return normalizeNewsletterRecord(await fetchJson<NewsletterRecord>(`/api/news/newsletters/${newsletterId}`));
  } catch {
    return getStaticNewsletterRecord(newsletterId);
  }
}
