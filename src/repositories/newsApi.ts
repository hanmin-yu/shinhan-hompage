import { resolveNewsAdminMode } from '../config/newsAdminMode';
import type { NewsletterRecord, ShinhanNewsRecord } from '../types/site';
import {
  getNewsletterRecord as getStaticNewsletterRecord,
  getNewsletterRecords as getStaticNewsletterRecords,
  getShinhanNewsRecord as getStaticShinhanNewsRecord,
  getShinhanNewsRecords as getStaticShinhanNewsRecords,
} from './newsRepository';

type NewsListResponse<T> = {
  items: T[];
};

function isEnabledMode() {
  return resolveNewsAdminMode() === 'enabled';
}

async function fetchJson<T>(url: string) {
  const response = await fetch(url, {
    credentials: 'same-origin',
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function loadShinhanNewsRecords() {
  if (!isEnabledMode()) {
    return getStaticShinhanNewsRecords();
  }

  try {
    const payload = await fetchJson<NewsListResponse<ShinhanNewsRecord>>('/api/news/shinhan-news');
    return payload.items;
  } catch {
    return getStaticShinhanNewsRecords();
  }
}

export async function loadShinhanNewsRecord(newsId: string) {
  if (!isEnabledMode()) {
    return getStaticShinhanNewsRecord(newsId);
  }

  try {
    return await fetchJson<ShinhanNewsRecord>(`/api/news/shinhan-news/${newsId}`);
  } catch {
    return getStaticShinhanNewsRecord(newsId);
  }
}

export async function loadNewsletterRecords() {
  if (!isEnabledMode()) {
    return getStaticNewsletterRecords();
  }

  try {
    const payload = await fetchJson<NewsListResponse<NewsletterRecord>>('/api/news/newsletters');
    return payload.items;
  } catch {
    return getStaticNewsletterRecords();
  }
}

export async function loadNewsletterRecord(newsletterId: string) {
  if (!isEnabledMode()) {
    return getStaticNewsletterRecord(newsletterId);
  }

  try {
    return await fetchJson<NewsletterRecord>(`/api/news/newsletters/${newsletterId}`);
  } catch {
    return getStaticNewsletterRecord(newsletterId);
  }
}
