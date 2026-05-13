export function getNewsletterAssetSlug(downloadHref?: string) {
  if (!downloadHref) return null;

  const fileName = downloadHref.split('/').pop();
  if (!fileName || !fileName.endsWith('.zip')) return null;

  return fileName.replace('.zip', '');
}

function getRenderAssetSlug(previewManifestUrl?: string | null) {
  if (!previewManifestUrl) return null;

  const match = previewManifestUrl.match(/\/newsletters\/render\/([^/]+)\/manifest\.json$/i);
  return match?.[1] ?? null;
}

function getPathFileName(path?: string | null) {
  if (!path) return null;

  const cleanPath = path.split(/[?#]/)[0];
  const fileName = cleanPath.split('/').pop();

  return fileName ? decodeURIComponent(fileName) : null;
}

export function getNewsletterPdfUrl(downloadHref?: string, previewManifestUrl?: string | null) {
  if (downloadHref?.toLowerCase().endsWith('.pdf')) {
    return downloadHref;
  }

  if (previewManifestUrl) {
    const assetSlug = getNewsletterAssetSlug(downloadHref) ?? getRenderAssetSlug(previewManifestUrl);
    const pdfFileName = assetSlug ? `${assetSlug}.pdf` : 'newsletter.pdf';

    return previewManifestUrl.replace(/manifest\.json$/i, pdfFileName);
  }

  const assetSlug = getNewsletterAssetSlug(downloadHref);
  return assetSlug ? `/newsletters/render/${assetSlug}/${assetSlug}.pdf` : null;
}

export function getNewsletterPdfFileName(title: string) {
  const safeTitle = title
    .replace(/[\\/:*?"<>|]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  return `${safeTitle || 'newsletter'}.pdf`;
}

export function getNewsletterDownloadFileName(downloadUrl?: string | null, fallbackTitle?: string) {
  if (fallbackTitle) {
    return getNewsletterPdfFileName(fallbackTitle);
  }

  const fileName = getPathFileName(downloadUrl);

  if (fileName?.toLowerCase().endsWith('.pdf')) {
    return fileName;
  }

  if (fileName?.toLowerCase().endsWith('.zip')) {
    return fileName.replace(/\.zip$/i, '.pdf');
  }

  return 'newsletter.pdf';
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
