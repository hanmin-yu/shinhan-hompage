export function getNewsletterAssetSlug(downloadHref?: string) {
  if (!downloadHref) return null;

  const fileName = downloadHref.split('/').pop();
  if (!fileName || !fileName.endsWith('.zip')) return null;

  return fileName.replace('.zip', '');
}
