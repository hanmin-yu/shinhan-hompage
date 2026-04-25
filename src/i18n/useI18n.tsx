import { createContext, useCallback, useContext, useEffect, useMemo, useState, type PropsWithChildren } from 'react';

import { translateKoToEn } from './koEnMap';
import type { SiteLanguage } from '../types/site';

type SiteLanguageContextValue = {
  language: SiteLanguage;
  setLanguage: (language: SiteLanguage) => void;
};

const SiteLanguageContext = createContext<SiteLanguageContextValue | null>(null);

export function SiteLanguageProvider({ children }: PropsWithChildren) {
  const [language, setLanguage] = useState<SiteLanguage>(() => {
    if (typeof window === 'undefined') return 'ko';
    const saved = window.localStorage.getItem('site-language');
    return saved === 'en' ? 'en' : 'ko';
  });

  useEffect(() => {
    window.localStorage.setItem('site-language', language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);
  return <SiteLanguageContext.Provider value={value}>{children}</SiteLanguageContext.Provider>;
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);
  if (!context) {
    throw new Error('useSiteLanguage must be used within SiteLanguageProvider');
  }
  return context;
}

export function useI18n() {
  const { language, setLanguage } = useSiteLanguage();

  const t = useCallback(
    (ko: string, en: string) => {
      return language === 'en' ? en : ko;
    },
    [language],
  );

  const tx = useCallback(
    (text: string) => {
      return language === 'en' ? translateKoToEn(text) : text;
    },
    [language],
  );

  return { language, setLanguage, t, tx };
}
