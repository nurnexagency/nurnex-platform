"use client";

import { motion } from "framer-motion";
import {
  CATALOGUE_URL,
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  CONTACT_PHONE,
  CONTACT_TEL,
} from "@/lib/contact";
import { useI18n } from "@/lib/i18n/LanguageProvider";
import SocialLinks from "./social-links";

export default function ContactSection() {
  const { t } = useI18n();

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
            {t.contact.eyebrow}
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t.contact.title}
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto mb-4 leading-relaxed">
            {t.contact.body}
          </p>
          <p className="text-muted/70 text-sm max-w-xl mx-auto mb-10 leading-relaxed">
            {t.contact.ambassador}{" "}
            <a href="#ambassadors" className="text-copper hover:underline">
              {t.contact.becomeAmbassador}
            </a>
            .
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={CONTACT_MAILTO}
              className="inline-block bg-copper hover:bg-copper/90 text-white px-10 py-4 rounded-lg font-medium tracking-wide transition-all duration-300 hover:shadow-xl hover:shadow-copper/20 text-base cta-float"
            >
              {t.contact.ctaPrimary}
            </a>
            <a
              href={CATALOGUE_URL}
              download="Nurnex_Consulting_Catalogue.pdf"
              className="inline-block border border-copper/50 text-white hover:bg-copper/10 px-8 py-4 rounded-lg font-medium tracking-wide transition-all duration-300 text-base"
            >
              {t.contact.downloadCatalogue}
            </a>
          </div>
          <p className="text-muted/50 text-xs mt-3">
            Opens your email to {CONTACT_EMAIL}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6 text-muted text-sm"
        >
          <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-copper transition-colors">
            {CONTACT_EMAIL}
          </a>
          <a href={CONTACT_TEL} className="hover:text-copper transition-colors">
            {CONTACT_PHONE}
          </a>
        </motion.div>

        <div className="mt-10 flex justify-center">
          <SocialLinks />
        </div>
      </div>
    </section>
  );
}
