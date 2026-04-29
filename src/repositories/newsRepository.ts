import { newsletterItems, shinhanNewsItems } from '../data/newsStaticSeeds';
import { shinhanNewsDetails } from '../data/shinhanNewsDetails';
import type { NewsletterRecord, ShinhanNewsRecord } from '../types/site';
import { sortShinhanNewsRecords } from '../utils/shinhanNews';

function buildShinhanNewsRecords(): ShinhanNewsRecord[] {
  return shinhanNewsItems.map((item) => {
    const detail = shinhanNewsDetails[item.id];

    return {
      ...item,
      titleEn: item.title,
      summaryEn: item.summary,
      author: detail?.author,
      bodyHtml: detail?.bodyHtml,
      status: 'published',
      updatedAt: item.publishedAt,
    };
  });
}

function buildNewsletterRecords(): NewsletterRecord[] {
  return newsletterItems.map((item) => {
    const previewManifestUrl = item.downloadHref
      ? `/newsletters/render/${item.downloadHref.split('/').pop()?.replace(/\.zip$/i, '')}/manifest.json`
      : null;

    return {
      ...item,
      downloadUrl: item.downloadHref,
      status: 'published',
      previewManifestUrl,
      updatedAt: item.publishedAt,
    };
  });
}

const shinhanNewsRecords = buildShinhanNewsRecords();
const newsletterRecords = buildNewsletterRecords();

export function getShinhanNewsRecords() {
  return sortShinhanNewsRecords(shinhanNewsRecords);
}

export function getShinhanNewsRecord(newsId: string) {
  return shinhanNewsRecords.find((item) => item.id === newsId) ?? null;
}

export function getNewsletterRecords() {
  return [...newsletterRecords].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

export function getNewsletterRecord(newsletterId: string) {
  return newsletterRecords.find((item) => item.id === newsletterId) ?? null;
}
