import type { NewsAdminMode } from '../types/site';

function isReadonlyHost(hostname: string) {
  return hostname === 'shinhan-homepage.vercel.app' || hostname.endsWith('.vercel.app');
}

function isLocalEnabledHost(hostname: string) {
  return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0';
}

export function resolveNewsAdminMode(): NewsAdminMode {
  const configuredMode = import.meta.env.VITE_NEWS_ADMIN_MODE;

  if (configuredMode === 'readonly' || configuredMode === 'enabled') {
    return configuredMode;
  }

  if (typeof window !== 'undefined' && isLocalEnabledHost(window.location.hostname)) {
    return 'enabled';
  }

  if (typeof window !== 'undefined' && isReadonlyHost(window.location.hostname)) {
    return 'readonly';
  }

  return 'readonly';
}

export function isReadonlyNewsAdminMode() {
  return resolveNewsAdminMode() === 'readonly';
}
