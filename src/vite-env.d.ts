/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NEWS_ADMIN_MODE?: 'readonly' | 'enabled';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
