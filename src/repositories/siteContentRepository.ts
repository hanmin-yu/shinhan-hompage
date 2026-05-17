import { resolveNewsAdminMode } from '../config/newsAdminMode';
import { staticSiteContent } from '../data/siteContentStatic';
import type { SiteContentPayload } from '../types/site';

const API_TIMEOUT_MS = 1200;

function isEnabledMode() {
  return resolveNewsAdminMode() === 'enabled';
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

export function getStaticSiteContent() {
  return staticSiteContent;
}

export async function loadSiteContent() {
  if (!isEnabledMode()) {
    return staticSiteContent;
  }

  try {
    return await fetchJson<SiteContentPayload>('/api/content/site');
  } catch {
    return staticSiteContent;
  }
}
