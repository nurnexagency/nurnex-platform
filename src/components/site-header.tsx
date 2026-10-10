"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Regions", href: "/#regions" },
  { label: "Contact", href: "/#contact" },
];

export default function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <>
      {/* Scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[1.5px] bg-copper z-[60] origin-left"
        style={{ scaleX, boxShadow: "0 0 8px rgba(196,120,43,0.4), 0 0 2px rgba(196,120,43,0.6)" }}
      />

      <header className="fixed top-0 left-0 right-0 z-50 bg-ink-navy/95 backdrop-blur-md border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group" aria-label="Nurnex Consulting home">
              <Image
                src="/nurnex-logo-white.svg"
                alt="Nurnex Consulting"
                width={945}
                height={152}
                priority
                unoptimized
                className="h-7 sm:h-8 w-auto opacity-95 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted hover:text-white transition-colors text-sm tracking-wide"
                >
                  {item.label}
              </Link>
            ))}
              <Link
                href="/#contact"
                className="bg-copper hover:bg-copper/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-copper/20"
              >
                Email Us
              </Link>
            </nav>

            {/* Mobile Toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-white p-2"
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                {mobileOpen ? (
                  <path d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-ink-navy border-t border-white/5 overflow-hidden"
            >
              <nav className="flex flex-col px-4 py-4 gap-3">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-muted hover:text-white transition-colors py-2 text-sm tracking-wide"
                  >
                    {item.label}
              </Link>
            ))}
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="bg-copper text-white px-5 py-2.5 rounded-lg text-sm font-medium tracking-wide text-center mt-2"
                >
                  Email Us
                </Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
