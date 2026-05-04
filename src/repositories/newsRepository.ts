import { newsletterItems, shinhanNewsItems } from '../data/newsStaticSeeds';
import type { NewsletterRecord, ShinhanNewsDetail, ShinhanNewsRecord } from '../types/site';
import { getNewsletterAssetSlug, getNewsletterPdfFileName, getNewsletterPdfUrl } from '../utils/newsletter';
import { sortShinhanNewsRecords } from '../utils/shinhanNews';

function toShinhanNewsRecord(item: (typeof shinhanNewsItems)[number], detail?: ShinhanNewsDetail): ShinhanNewsRecord {
  return {
    ...item,
    titleEn: item.title,
    summaryEn: item.summary,
    author: detail?.author,
    bodyHtml: detail?.bodyHtml,
    status: 'published',
    updatedAt: item.publishedAt,
  };
}

function buildShinhanNewsRecords(): ShinhanNewsRecord[] {
  return shinhanNewsItems.map((item) => toShinhanNewsRecord(item));
}

function buildNewsletterRecords(): NewsletterRecord[] {
  return newsletterItems.map((item) => {
    const assetSlug = getNewsletterAssetSlug(item.downloadHref);
    const previewManifestUrl = assetSlug ? `/newsletters/render/${assetSlug}/manifest.json` : null;

    return {
      ...item,
      downloadUrl: getNewsletterPdfUrl(item.downloadHref, previewManifestUrl) ?? undefined,
      downloadFileName: getNewsletterPdfFileName(item.title),
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
  return shinhanNewsItems.find((item) => item.id === newsId) ?? null;
}

export async function getShinhanNewsRecordWithDetail(newsId: string) {
  const item = getShinhanNewsRecord(newsId);

  if (!item) {
    return null;
  }

  const { shinhanNewsDetails } = await import('../data/shinhanNewsDetails');
  return toShinhanNewsRecord(item, shinhanNewsDetails[newsId]);
}

export function getNewsletterRecords() {
  return [...newsletterRecords].sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));
}

export function getNewsletterRecord(newsletterId: string) {
  return newsletterRecords.find((item) => item.id === newsletterId) ?? null;
}
