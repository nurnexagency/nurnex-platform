import Image from "next/image";
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_TEL } from "@/lib/contact";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink-navy border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 h-32 pointer-events-none bg-gradient-to-b from-[rgba(196,120,43,0.03)] to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/nurnex-logo.jpg"
                alt="Nurnex Consulting"
                width={32}
                height={32}
                className="rounded-full ring-1 ring-copper/30 h-auto w-8"
              />
              <span className="text-white font-semibold tracking-[0.2em] text-sm">
                NURNEX CONSULTING
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed max-w-md">
              Microsoft analytics, automation, and cloud consulting — plus
              websites and iOS &amp; Android apps — for organizations across
              Europe, Asia, and the Middle East. Guiding enterprises forward.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-medium tracking-wide mb-4">
              Navigation
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Services", href: "/#services" },
                { label: "Work", href: "/#work" },
                { label: "Process", href: "/#process" },
                { label: "About", href: "/#about" },
                { label: "Regions", href: "/#regions" },
                { label: "Contact", href: "/#contact" },
              ].map((item) => (
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
              Get in Touch
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
              <li className="pt-1">Boston · Dubai · Baku · Warsaw</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-xs">
            © {year} Nurnex Consulting. All rights reserved.
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
            <p className="text-muted/60 text-xs">Guiding enterprises forward.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
