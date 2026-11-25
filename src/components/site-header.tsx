"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitcher from "@/components/language-switcher";
import { useI18n } from "@/lib/i18n/LanguageProvider";

type NavItem =
  | { label: string; href: string; children?: undefined }
  | {
      label: string;
      href: string;
      children: { label: string; href: string; hint: string }[];
    };

export default function SiteHeader() {
  const { t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bootcampOpen, setBootcampOpen] = useState(false);
  const [mobileBootcampOpen, setMobileBootcampOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const navItems: NavItem[] = [
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.demos, href: "/demos" },
    {
      label: t.nav.bootcamp,
      href: "/bootcamp",
      children: [
        {
          label: t.nav.bootcampFull,
          href: "/bootcamp",
          hint: t.nav.bootcampFullHint,
        },
        {
          label: t.nav.fieldAccel,
          href: "/field-acceleration",
          hint: t.nav.fieldAccelHint,
        },
      ],
    },
    { label: t.nav.work, href: "/#work" },
    { label: t.nav.process, href: "/#process" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.contact, href: "/#contact" },
  ];

  const openBootcamp = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setBootcampOpen(true);
  };
  const scheduleCloseBootcamp = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setBootcampOpen(false), 140);
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-copper z-[60] origin-left"
        style={{ scaleX, boxShadow: "0 0 8px rgba(196,120,43,0.4), 0 0 2px rgba(196,120,43,0.6)" }}
      />

      <div className="fixed top-0 left-0 right-0 z-50 bg-[#061525] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-end h-8">
          <a
            href="https://portal.nurnex.com"
            className="flex items-center gap-1.5 text-[11px] tracking-wide text-white/50 hover:text-copper transition-colors"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            {t.nav.portal}
          </a>
        </div>
      </div>

      <header className="fixed top-8 left-0 right-0 z-50 bg-ink-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-10 h-16 sm:h-20">
            <Link href="/" className="flex shrink-0 items-center group" aria-label="Nurnex Consulting home">
              <Image
                src="/nurnex-logo-white.svg"
                alt="Nurnex Consulting"
                width={946}
                height={130}
                priority
                unoptimized
                className="h-7 sm:h-8 w-auto -translate-y-[2px] opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {navItems.map((item) =>
                item.children ? (
                  <div
                    key={item.label}
                    className="relative"
                    onMouseEnter={openBootcamp}
                    onMouseLeave={scheduleCloseBootcamp}
                  >
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 text-muted hover:text-white transition-colors text-sm tracking-wide"
                      aria-expanded={bootcampOpen}
                      aria-haspopup="menu"
                      onFocus={openBootcamp}
                      onClick={() => setBootcampOpen((v) => !v)}
                    >
                      {item.label}
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        className={`transition-transform ${bootcampOpen ? "rotate-180" : ""}`}
                        aria-hidden
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {bootcampOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 6 }}
                          transition={{ duration: 0.16 }}
                          role="menu"
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-3 z-[70]"
                          onMouseEnter={openBootcamp}
                          onMouseLeave={scheduleCloseBootcamp}
                        >
                          <div className="w-80 rounded-xl border border-white/10 bg-ink-navy shadow-2xl shadow-black/50 overflow-hidden">
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                role="menuitem"
                                onClick={() => setBootcampOpen(false)}
                                className="block px-4 py-3.5 border-b border-white/5 last:border-b-0 hover:bg-copper/10 transition-colors"
                              >
                                <span className="block text-sm font-semibold text-white">{child.label}</span>
                                <span className="block text-xs text-muted mt-0.5">{child.hint}</span>
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-muted hover:text-white transition-colors text-sm tracking-wide"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <LanguageSwitcher />
              <Link
                href="/#contact"
                className="bg-copper hover:bg-copper/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-copper/20"
              >
                {t.nav.emailUs}
              </Link>
            </nav>

            <div className="lg:hidden flex items-center gap-2">
              <LanguageSwitcher compact />
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
              </svg>
            </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-ink-navy border-t border-white/5 overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-4 gap-1">
                {navItems.map((item) =>
                  item.children ? (
                    <div key={item.label} className="py-1">
                      <button
                        type="button"
                        onClick={() => setMobileBootcampOpen((v) => !v)}
                        className="w-full flex items-center justify-between text-muted hover:text-white transition-colors py-2 text-sm tracking-wide"
                        aria-expanded={mobileBootcampOpen}
                      >
                        {item.label}
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          className={`transition-transform ${mobileBootcampOpen ? "rotate-180" : ""}`}
                          aria-hidden
                        >
                          <path d="M6 9l6 6 6-6" />
                        </svg>
                      </button>
                      <AnimatePresence>
                        {mobileBootcampOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-3 border-l border-copper/30 ml-1 mb-2"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="block py-2.5"
                              >
                                <span className="block text-sm text-white font-medium">{child.label}</span>
                                <span className="block text-xs text-muted">{child.hint}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="text-muted hover:text-white transition-colors py-2 text-sm tracking-wide"
                    >
                      {item.label}
                    </Link>
                  )
                )}
                <a
                  href="https://portal.nurnex.com"
                  className="text-muted hover:text-copper transition-colors py-2 text-sm tracking-wide flex items-center gap-2"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                  {t.nav.portal}
                </a>
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="bg-copper text-white px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide text-center mt-2"
                >
                  {t.nav.emailUs}
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
