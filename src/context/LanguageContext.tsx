import React, { createContext, useContext, useEffect, useState } from 'react';
import { en } from '../i18n/en';
import { hi } from '../i18n/hi';
import { mr } from '../i18n/mr';
import type { LanguageCode, TranslationContent } from '../i18n/types';

const STORAGE_KEY = 'sai_digital_agency_lang';

const TRANSLATIONS: Record<LanguageCode, TranslationContent> = {
  en,
  hi,
  mr,
};

interface LanguageContextValue {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationContent;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

function getInitialLanguage(): LanguageCode {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'hi' || saved === 'mr') {
      return saved;
    }
  } catch {
    // Ignore storage access errors in restricted iframe environments
  }
  return 'en';
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(getInitialLanguage);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage access errors
    }
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t: TRANSLATIONS[language],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return ctx;
}
