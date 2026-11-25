"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { dictionaries, LOCALES, type Dict, type Locale } from "./dictionaries";

const STORAGE_KEY = "nurnex-locale";

type Ctx = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dict;
  dir: "ltr" | "rtl";
};

const LanguageContext = createContext<Ctx | null>(null);

function isLocale(v: string | null): v is Locale {
  return !!v && ["en", "az", "ru", "tr", "ar"].includes(v);
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLocale(saved)) setLocaleState(saved);
    } catch {
      /* ignore */
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const dir = LOCALES.find((l) => l.code === locale)?.dir ?? "ltr";

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const value = useMemo(
    () => ({ locale, setLocale, t: dictionaries[locale], dir }),
    [locale, setLocale, dir]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useI18n must be used within LanguageProvider");
  return ctx;
}
