"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const NAV_LINKS = [
  { href: "/#vision", label: "Vision" },
  { href: "/#candidates", label: "Candidates" },
  { href: "/#recruiters", label: "Recruiters" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);

  return (
    <>
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: reduce ? 0 : 0.9 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/40 border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 ring-1 ring-white/10">
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-foreground font-black text-lg tracking-tight uppercase">
              Nurnex
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] text-muted uppercase tracking-wider font-semibold">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`hover:text-foreground transition-colors duration-300 ${
                  pathname === link.href ? "text-foreground" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="hidden sm:inline-block text-[13px] text-muted hover:text-foreground transition-colors px-4 py-2 uppercase tracking-wider font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-[13px] bg-white text-background px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-white/25 hover:scale-[1.03]"
            >
              Get Started
            </Link>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden ml-1 p-2 text-muted hover:text-foreground transition-colors"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                {open ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[73px] left-0 right-0 z-40 bg-background/95 backdrop-blur-xl border-b border-white/10 md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="px-3 py-3 text-sm text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors uppercase tracking-wider font-semibold"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-3 py-3 text-sm text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors uppercase tracking-wider font-semibold"
              >
                Sign In
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
