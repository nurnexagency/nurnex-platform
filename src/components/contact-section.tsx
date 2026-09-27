"use client";

import { motion } from "framer-motion";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_PHONE,
  CONTACT_TEL,
} from "@/lib/contact";

export default function ContactSection() {
  return (
    <section id="contact" className="relative py-20 sm:py-28 bg-ink-navy overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-[rgba(196,120,43,0.06)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(196,120,43,0.08)_0%,_transparent_60%)]" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 49px, rgba(255,255,255,0.3) 49px, rgba(255,255,255,0.3) 50px), repeating-linear-gradient(90deg, transparent, transparent 49px, rgba(255,255,255,0.3) 49px, rgba(255,255,255,0.3) 50px)",
          opacity: 0.02,
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">
            Start Your Journey
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Ready to Move Forward?
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            Email us to schedule a complimentary 30-minute discovery call. We&apos;ll
            review your Microsoft landscape, website or app needs, identify quick
            wins, and outline a roadmap — no commitment required.
          </p>
          <p className="text-muted/70 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            Prefer a regional partner first? You can also start through a Nurnex
            Ambassador — either path leads to the same discovery process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <a
            href={CONTACT_MAILTO}
            className="inline-block bg-copper hover:bg-copper/90 text-white px-10 py-4 rounded-lg font-medium tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-copper/20 text-base cta-float"
          >
            Email Us to Schedule
          </a>
          <p className="text-muted/50 text-xs mt-3">
            Opens your email to {CONTACT_EMAIL}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12"
        >
          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C4782B"
              strokeWidth="1.5"
              className="w-5 h-5 flex-shrink-0"
              aria-hidden
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            <a
              href={CONTACT_TEL}
              className="text-muted hover:text-copper transition-colors text-sm"
            >
              {CONTACT_PHONE}
            </a>
          </div>

          <div className="flex items-center gap-3">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#C4782B"
              strokeWidth="1.5"
              className="w-5 h-5 flex-shrink-0"
              aria-hidden
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 7l-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-muted hover:text-copper transition-colors text-sm"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
