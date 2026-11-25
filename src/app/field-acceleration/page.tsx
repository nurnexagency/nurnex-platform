"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

const fapStats = [
  { value: "8", label: "Live Classes" },
  { value: "2 \u00d7 1 hr", label: "Classes Per Week" },
  { value: "1", label: "Month" },
  { value: "$400", label: "Per Track" },
];

const fapSteps = [
  { title: "Pick one combo track", desc: "Two tools that are used together in real freelance and business work." },
  { title: "8 live classes in 4 weeks", desc: "Two 1-hour classes per week in a small group, built around a real project." },
  { title: "Own at least 50% of the skill set", desc: "You will not leave as a full professional, but with a solid working foundation and a proven method to keep teaching yourself." },
  { title: "Stay in the community chat", desc: "After the month ends, post your questions any time with other graduates. We reply as soon as possible." },
];

const fapTracks = [
  {
    name: "Data Analyst Starter",
    combo: "SQL + Power BI",
    icon: "chart",
    who: "Freelancers who want to turn business data into dashboards.",
    weeks: ["SQL queries, joins and aggregations on a real dataset", "Power BI data model, DAX basics and a published dashboard"],
  },
  {
    name: "Business App Builder",
    combo: "Power Apps + Power Automate",
    icon: "rocket",
    who: "People who want to build internal apps and automate workflows for small businesses.",
    weeks: ["A canvas app on SharePoint lists: forms, galleries, navigation", "Approvals, notifications and scheduled flows connected to the app"],
  },
  {
    name: "Reporting Pro",
    combo: "Excel + Power Query + Power BI",
    icon: "table",
    who: "Office professionals ready to move from spreadsheets to automated reports.",
    weeks: ["Power Query cleaning, merging and reusable Excel models", "Power BI reports on Excel sources with one-click refresh"],
  },
  {
    name: "AI Automation",
    combo: "Power Automate + Copilot Studio",
    icon: "code",
    who: "Freelancers who want to sell AI-powered automations.",
    weeks: ["Flows, triggers and connectors across Outlook, Teams and SharePoint", "A Copilot Studio agent that answers from your documents and runs flows"],
  },
  {
    name: "Data Engineering Starter",
    combo: "Python + SQL + Databricks",
    icon: "layers",
    who: "Technical learners stepping into big data.",
    weeks: ["Python and pandas for data cleaning, SQL for analysis", "Databricks: Delta tables and a bronze / silver / gold pipeline"],
  },
  {
    name: "Fabric Fast Start",
    combo: "Microsoft Fabric + Power BI",
    icon: "cloud",
    who: "Analysts at companies that run on Microsoft.",
    weeks: ["Fabric lakehouse, dataflows and a first notebook", "Semantic model and a Direct Lake Power BI report"],
  },
];

const fapVsBootcamp = [
  { feature: "Duration", fap: "1 month", boot: "3 or 6 months" },
  { feature: "Live classes", fap: "8 hours", boot: "60\u2013120 hours" },
  { feature: "Scope", fap: "One combo track", boot: "Full curriculum" },
  { feature: "Goal", fap: "Start freelancing and keep learning", boot: "Become job-ready" },
  { feature: "Price", fap: "$400", boot: "$2,500\u2013$5,000" },
];

const faq = [
  {
    q: "What is the Field Acceleration Program?",
    a: "A one-month, $400 programme: 8 live 1-hour classes (two per week) on one combined skill track, such as SQL + Power BI or Power Apps + Power Automate. It gives you a solid foundation and a method to keep learning on your own. It is not a full bootcamp.",
  },
  {
    q: "Can the Field Acceleration Program lead to work with Nurnex?",
    a: "Within 3 months of finishing the programme you can take the Nurnex Skills Test. Graduates who pass are considered for paid project work with Nurnex. Passing the test does not guarantee work.",
  },
  {
    q: "Do I keep access to the community after the month ends?",
    a: "Yes. Field Acceleration graduates stay in the Nurnex community chat, where you can post questions at any time and we reply as soon as possible.",
  },
  {
    q: "Do I need experience?",
    a: "No. Each track starts with the essentials for that combo. If you can use a computer and want to build real project skills fast, you are ready.",
  },
];

function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    table: <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />,
    chart: (
      <>
        <path d="M3 3v18h18" />
        <path d="M7 15l4-5 3 3 5-7" />
      </>
    ),
    code: (
      <>
        <path d="M16 18l6-6-6-6" />
        <path d="M8 6l-6 6 6 6" />
      </>
    ),
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
    layers: (
      <>
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </>
    ),
    rocket: (
      <>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </>
    ),
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      {icons[name]}
    </svg>
  );
}

export default function FieldAccelerationPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <SiteHeader />
      <main className="pt-28 sm:pt-32 min-h-screen bg-dark-bg">
        <section className="relative py-16 sm:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,120,43,0.12)_0%,_transparent_55%)]" />
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}>
              <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold mb-5 bg-copper/10 border border-copper/20 text-copper">
                New — 1-Month Program · First cohorts January 2027
              </div>
              <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">Field Acceleration Program</h1>
              <p className="text-muted text-lg max-w-2xl mx-auto mb-8">
                For future freelancers and fast self-learners. In one month, learn a combined skill set used in real
                projects, get the right path from us, and keep growing on your own.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                <Link
                  href="/#contact"
                  className="bg-copper hover:bg-copper/90 text-white px-8 py-4 rounded-xl text-base font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-copper/30"
                >
                  Reserve a Track — $400
                </Link>
                <Link
                  href="/bootcamp"
                  className="border border-border text-muted hover:text-white hover:border-copper/40 px-8 py-4 rounded-xl text-base font-medium tracking-wide transition-all"
                >
                  Looking for the full Bootcamp?
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-8 border-y border-border bg-card/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {fapStats.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-card border border-border rounded-xl p-5 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-display font-bold text-copper">{s.value}</div>
                  <div className="text-xs sm:text-sm text-muted mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-2xl font-bold text-white mb-6 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
              {fapSteps.map((s, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i}
                  className="bg-card border border-border rounded-xl p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-copper/10 text-copper font-bold text-sm flex items-center justify-center mb-3">
                    {i + 1}
                  </div>
                  <h3 className="text-white font-semibold text-sm mb-1">{s.title}</h3>
                  <p className="text-muted text-xs leading-relaxed">{s.desc}</p>
                </motion.div>
              ))}
            </div>

            <h2 className="font-display text-2xl font-bold text-white mb-2 text-center">Choose Your Combo Track</h2>
            <p className="text-muted text-sm text-center mb-8">$400 per track · 8 live classes · one month</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
              {fapTracks.map((t, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  custom={i * 0.5}
                  className="bg-card border border-border rounded-2xl p-6 flex flex-col hover:border-copper/30 transition-all"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-copper/10 text-copper flex items-center justify-center flex-shrink-0">
                      <Icon name={t.icon} />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-base leading-tight">{t.name}</h3>
                      <div className="text-copper text-xs font-semibold">{t.combo}</div>
                    </div>
                  </div>
                  <p className="text-muted text-sm mb-4 leading-relaxed">{t.who}</p>
                  <div className="space-y-2 mt-auto">
                    {t.weeks.map((w, wi) => (
                      <div key={wi} className="flex gap-3 text-xs">
                        <span className="text-copper font-semibold whitespace-nowrap">
                          {wi === 0 ? "Weeks 1–2" : "Weeks 3–4"}
                        </span>
                        <span className="text-muted leading-relaxed">{w}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={0}
                className="bg-copper/5 border border-copper/20 rounded-2xl p-6 sm:p-8"
              >
                <div className="text-copper font-semibold text-sm mb-2">Path to Nurnex</div>
                <h3 className="font-display text-xl font-bold text-white mb-3">Finish the program, pass the test, work with us</h3>
                <p className="text-muted text-sm leading-relaxed mb-4">
                  Within 3 months of completing the program, you can take the Nurnex Skills Test. Graduates who pass
                  are considered for paid project work with Nurnex.
                </p>
                <p className="text-muted/70 text-xs">Passing the test does not guarantee work.</p>
              </motion.div>

              <motion.div
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                custom={1}
                className="bg-card border border-border rounded-2xl overflow-hidden"
              >
                <div className="grid grid-cols-[1fr_1fr_1fr] text-sm">
                  <div className="p-3 sm:p-4 font-semibold text-muted bg-ink-navy border-b border-border" />
                  <div className="p-3 sm:p-4 font-semibold text-copper text-center bg-ink-navy border-b border-border">
                    Field Acceleration
                  </div>
                  <div className="p-3 sm:p-4 font-semibold text-copper text-center bg-ink-navy border-b border-border">
                    Bootcamp
                  </div>
                  {fapVsBootcamp.map((row, i) => (
                    <div key={i} className="contents">
                      <div className={`p-3 text-white text-xs sm:text-sm border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-ink-navy/30"}`}>
                        {row.feature}
                      </div>
                      <div className={`p-3 text-muted text-xs text-center border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-ink-navy/30"}`}>
                        {row.fap}
                      </div>
                      <div className={`p-3 text-muted text-xs text-center border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-ink-navy/30"}`}>
                        {row.boot}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/#contact"
                className="bg-copper hover:bg-copper/90 text-white px-8 py-4 rounded-xl text-base font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-copper/30"
              >
                Reserve a Track — $400
              </Link>
              <a
                href="mailto:bootcamp@nurnex.com?subject=Field%20Acceleration%20Program"
                className="border border-border text-muted hover:text-white hover:border-copper/40 px-8 py-4 rounded-xl text-base font-medium tracking-wide transition-all"
              >
                Ask About a Track
              </a>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28 bg-card/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="font-display text-3xl font-bold text-white mb-10 text-center">FAQ</h2>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <div key={i} className="bg-card border border-border rounded-xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="text-white font-medium text-sm pr-4">{item.q}</span>
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
