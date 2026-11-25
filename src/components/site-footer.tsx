"use client";

import Image from "next/image";
import { MOTTO } from "@/lib/brand";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL } from "@/lib/contact";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import SocialLinks from "./social-links";

export default function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const navLinks = [
    { label: t.nav.services, href: "/#services" },
    { label: t.nav.work, href: "/#work" },
    { label: t.nav.process, href: "/#process" },
    { label: t.nav.about, href: "/#about" },
    { label: t.nav.regions, href: "/#regions" },
    { label: "Ambassadors", href: "/#ambassadors" },
    { label: t.nav.contact, href: "/#contact" },
    { label: "Partner Portal", href: "https://portal.nurnex.com" },
  ];

  return (
    <footer className="relative bg-ink-navy border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-[rgba(196,120,43,0.03)] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <div className="mb-5">
              <Image
                src="/nurnex-logo-white.svg"
                alt="Nurnex Consulting"
                width={946}
                height={130}
                unoptimized
                className="h-8 w-auto"
              />
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-md">
              {t.footer.blurb} {MOTTO}
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium tracking-wide mb-4">
              {t.footer.navigation}
            </h4>
            <ul className="space-y-2">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-muted hover:text-copper transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium tracking-wide mb-4">
              {t.footer.getInTouch}
            </h4>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-copper transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={CONTACT_TEL}
                  className="hover:text-copper transition-colors"
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className="pt-1">Boston · Warsaw · Istanbul · Baku · Dubai</li>
            </ul>
            <SocialLinks className="mt-5" />
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {year} Nurnex Consulting. {t.footer.rights}
          </p>
          <div className="flex items-center gap-5">
            <a
              href="/privacy"
              className="text-muted hover:text-copper transition-colors text-xs"
            >
              Privacy
            </a>
            <a
              href="/terms"
              className="text-muted hover:text-copper transition-colors text-xs"
            >
              Terms
            </a>
            <p className="font-display text-copper/80 text-xs tracking-[0.15em]">{MOTTO}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
