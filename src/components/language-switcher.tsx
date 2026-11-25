"use client";

import { useEffect, useRef, useState } from "react";
import { LOCALES } from "@/lib/i18n/dictionaries";
import { useI18n } from "@/lib/i18n/LanguageProvider";

export default function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const current = LOCALES.find((l) => l.code === locale) ?? LOCALES[0];

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 text-muted hover:text-white hover:border-copper/40 transition-colors ${
          compact ? "px-2.5 py-1.5 text-xs" : "px-3 py-2 text-sm"
        }`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t.nav.language}
      >
        <span className="font-semibold tracking-wide text-white/90">{current.native}</span>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute end-0 top-full mt-2 z-[80] min-w-[10.5rem] rounded-xl border border-white/10 bg-ink-navy shadow-2xl shadow-black/50 overflow-hidden"
        >
          {LOCALES.map((l) => (
            <button
              key={l.code}
              type="button"
              role="option"
              aria-selected={l.code === locale}
              onClick={() => {
                setLocale(l.code);
                setOpen(false);
              }}
              className={`w-full text-start px-3.5 py-2.5 text-sm transition-colors ${
                l.code === locale
                  ? "bg-copper/15 text-copper"
                  : "text-muted hover:bg-white/5 hover:text-white"
              }`}
            >
              <span className="font-semibold me-2">{l.native}</span>
              <span className="text-xs opacity-80">{l.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
