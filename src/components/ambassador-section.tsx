"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT_EMAIL } from "@/lib/contact";

const FORM_NAME = "ambassador-application";

const roles = [
  {
    title: "Represent Nurnex",
    desc: "Be our trusted local face in your country — with businesses, schools, and public-sector organizations.",
  },
  {
    title: "Open the Right Doors",
    desc: "Introduce organizations that need dashboards, automation, websites, or apps, and set up the first meeting.",
  },
  {
    title: "Be the Bridge",
    desc: "Join key meetings, translate when needed, and keep communication flowing between clients and our team.",
  },
  {
    title: "Bring Client Wishes to Us",
    desc: "Pass on questions, concerns, and new requests so every client relationship keeps moving forward.",
  },
];

const perks = [
  "Paid for your client work, plus bonuses for new clients you bring",
  "No fees, no daily hours, no sales targets",
  "Our team handles all technical work, proposals, and pricing",
  "Onboarding, catalogue, and message templates provided",
];

const regions = ["UAE & GCC", "Azerbaijan", "Turkey", "Poland & EU", "Central Asia"];

type Status = "idle" | "sending" | "sent" | "error";

const inputClass =
  "w-full bg-ink-navy/60 border border-white/10 rounded-lg px-4 py-3 text-sm text-white placeholder:text-muted/60 focus:outline-none focus:border-copper/60 focus:ring-1 focus:ring-copper/40 transition-colors";

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="block text-xs text-muted mb-1.5 tracking-wide">
        {label}
        {required && <span className="text-copper"> *</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </label>
  );
}

export default function AmbassadorSection() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    data.set("form-name", FORM_NAME);
    setStatus("sending");
    try {
      const res = await fetch("/__forms.html", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(data as unknown as Record<string, string>).toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="ambassadors" className="relative py-20 sm:py-28 bg-dark-bg overflow-hidden">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_20%_30%,rgba(196,120,43,0.07),transparent_55%)]" />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, transparent, transparent 40px, rgba(255,255,255,0.6) 40px, rgba(255,255,255,0.6) 41px)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">Partner With Us</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Become a Nurnex Ambassador
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Well connected in your country? Represent Nurnex locally, open doors for organizations
            that need our services, and be the bridge between them and our team.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {roles.map((r) => (
                <div
                  key={r.title}
                  className="bg-card-bg border border-white/5 rounded-xl p-5 hover:border-copper/25 transition-colors"
                >
                  <p className="text-white font-semibold text-sm mb-1.5">{r.title}</p>
                  <p className="text-muted text-sm leading-relaxed">{r.desc}</p>
                </div>
              ))}
            </div>

            <ul className="space-y-3 mb-8">
              {perks.map((p) => (
                <li key={p} className="flex items-start gap-3 text-sm text-muted">
                  <span className="text-copper mt-0.5" aria-hidden>
                    ◆
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <p className="text-white/55 text-xs tracking-[0.3em] uppercase mb-3">Currently welcoming</p>
            <div className="flex flex-wrap gap-2">
              {regions.map((r) => (
                <span
                  key={r}
                  className="text-xs text-white bg-copper/10 border border-copper/25 rounded-full px-3 py-1.5"
                >
                  {r}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-card-bg border border-white/10 rounded-2xl p-6 sm:p-8"
          >
            {status === "sent" ? (
              <div className="text-center py-10" role="status">
                <p className="text-copper text-3xl mb-3" aria-hidden>
                  ✓
                </p>
                <p className="text-white font-semibold text-lg mb-2">Application received</p>
                <p className="text-muted text-sm leading-relaxed max-w-sm mx-auto">
                  Thank you. We review every application personally and will reply by email within a
                  few working days.
                </p>
              </div>
            ) : (
              <form name={FORM_NAME} onSubmit={onSubmit} className="space-y-4">
                <p className="text-white font-semibold text-lg mb-1">Apply to join</p>
                <p className="text-muted text-sm mb-4">
                  Tell us about yourself. We&apos;ll follow up with the full program details.
                </p>
                <p className="hidden">
                  <label>
                    Leave this empty <input name="bot-field" tabIndex={-1} autoComplete="off" />
                  </label>
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Field label="Full name" name="name" required autoComplete="name" />
                  <Field label="Email" name="email" type="email" required autoComplete="email" />
                  <Field label="Phone / WhatsApp" name="phone" type="tel" autoComplete="tel" />
                  <Field label="Country" name="country" required autoComplete="country-name" />
                  <Field label="City" name="city" autoComplete="address-level2" />
                  <Field label="Languages" name="languages" placeholder="e.g. English, Arabic" />
                </div>
                <Field label="LinkedIn profile" name="linkedin" type="url" placeholder="https://linkedin.com/in/…" />
                <label className="block">
                  <span className="block text-xs text-muted mb-1.5 tracking-wide">
                    Your background and the organizations you know<span className="text-copper"> *</span>
                  </span>
                  <textarea
                    name="background"
                    required
                    rows={4}
                    placeholder="Your experience, industries, and the kinds of companies or institutions in your network."
                    className={`${inputClass} resize-y`}
                  />
                </label>
                <Field label="How did you hear about us?" name="source" />
                <label className="flex items-start gap-3 text-xs text-muted">
                  <input
                    type="checkbox"
                    name="consent"
                    value="yes"
                    required
                    className="mt-0.5 accent-[#C4782B]"
                  />
                  <span>
                    I agree that Nurnex may contact me about the Ambassador Program, as described in the{" "}
                    <Link href="/privacy" className="text-copper hover:underline">
                      Privacy Policy
                    </Link>
                    .
                  </span>
                </label>
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full bg-copper hover:bg-copper/90 disabled:opacity-60 text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-copper/20"
                >
                  {status === "sending" ? "Sending…" : "Submit Application"}
                </button>
                {status === "error" && (
                  <p className="text-sm text-red-300" role="alert">
                    Something went wrong. Please try again, or email us at{" "}
                    <a
                      href={`mailto:${CONTACT_EMAIL}?subject=Ambassador%20application`}
                      className="text-copper underline"
                    >
                      {CONTACT_EMAIL}
                    </a>
                    .
                  </p>
                )}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
