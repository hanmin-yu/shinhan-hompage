export function getNewsletterAssetSlug(downloadHref?: string) {
  if (!downloadHref) return null;

  const fileName = downloadHref.split('/').pop();
  if (!fileName || !fileName.endsWith('.zip')) return null;

  return fileName.replace('.zip', '');
}

export function getNewsletterPdfUrl(downloadHref?: string, previewManifestUrl?: string | null) {
  if (downloadHref?.toLowerCase().endsWith('.pdf')) {
    return downloadHref;
  }

  if (previewManifestUrl) {
    return previewManifestUrl.replace(/manifest\.json$/i, 'newsletter.pdf');
  }

  const assetSlug = getNewsletterAssetSlug(downloadHref);
  return assetSlug ? `/newsletters/render/${assetSlug}/newsletter.pdf` : null;
}

export function getNewsletterPdfFileName(title: string) {
  const safeTitle = title
    .replace(/[\\/:*?"<>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return `${safeTitle || 'newsletter'}.pdf`;
}

const newsletterTitleBrand = 'Zoom In Trade';

export function withNewsletterTitleBrand(title: string) {
  if (title.includes(newsletterTitleBrand)) {
    return title;
  }

  return `${newsletterTitleBrand} - ${title}`;
}

export function withNewsletterTitleBrandRecord<T extends { title: string; titleEn?: string }>(item: T): T {
  return {
    ...item,
    title: withNewsletterTitleBrand(item.title),
    titleEn: item.titleEn ? withNewsletterTitleBrand(item.titleEn) : item.titleEn,
  };
}
