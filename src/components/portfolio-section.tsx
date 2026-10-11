"use client";

import { motion } from "framer-motion";
import BlueprintBg from "@/components/bg/blueprint-bg";

const projects = [
  {
    client: "DOM Tech Academy",
    category: "Education · STEM",
    title: "Website + iOS App + Microsoft Support",
    description:
      "End-to-end digital product delivery for a robotics and coding academy: a production website for programs and enrollment, plus a mobile app on the App Store for applications, billing, and family workflows.",
    stack: ["Website", "iOS App", "Enrollment", "Stripe Billing", "Firebase"],
    support: [
      "Workflow & Approval Automation",
      "Power BI Executive Dashboards",
    ],
    links: [
      { label: "Live Website", href: "https://domtechacademy.com/" },
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/dom-tech-academy/id6787835656",
      },
    ],
    accent: "from-copper/20 to-transparent",
  },
  {
    client: "DOM Chess Academy",
    category: "Education · Chess",
    title: "iOS Training App + Ongoing Analytics Support",
    description:
      "A family-safe chess training app for young players — puzzles, memory drills, session tracking, and academy enrollment flows — published on the App Store and backed by Microsoft analytics and automation support.",
    stack: ["iOS App", "Training Modules", "Local Progress", "Enrollment"],
    support: [
      "Workflow & Approval Automation",
      "Power BI Executive Dashboards",
    ],
    links: [
      {
        label: "App Store",
        href: "https://apps.apple.com/us/app/dom-chess-academy/id6770395352",
      },
    ],
    accent: "from-white/10 to-transparent",
  },
  {
    client: "Regional Operations Client",
    category: "Microsoft · Analytics",
    title: "Power BI Executive Suite + Approval Automation",
    description:
      "Anonymized engagement for a multi-entity operations team: governed Power BI executive dashboards replaced spreadsheet reporting, with Power Automate approval workflows and documented handoff so leadership trusts a single source of truth.",
    stack: ["Power BI", "Data Modeling", "Row-Level Security", "Power Automate"],
    support: ["Managed Support Retainer", "Bi-Weekly Health Reviews"],
    links: [],
    accent: "from-copper/10 to-transparent",
    note: "Client name withheld under NDA. Outcomes: trusted monthly KPIs and audit-ready approval trails.",
  },
];

export default function PortfolioSection() {
  return (
    <section id="work" className="relative py-20 sm:py-28 bg-dark-bg overflow-hidden">
      <BlueprintBg />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #C4782B 0.8px, transparent 0.8px), radial-gradient(circle at 80% 70%, #C4782B 0.8px, transparent 0.8px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(196,120,43,0.05),transparent_55%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">
            Selected Work
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Selected Digital Products &amp; Microsoft Delivery
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Live websites and iOS apps we shipped, plus anonymized Microsoft
            analytics and automation delivery. Android / Google Play builds are
            available on request alongside iOS.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {projects.map((project, i) => (
            <motion.article
              key={project.client}
              initial={{ opacity: 0, y: 40, rotateX: 8 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.65, delay: i * 0.1 }}
              className={`group relative bg-card-bg border border-white/5 rounded-2xl overflow-hidden hover:border-copper/30 transition-all duration-300 hover:shadow-xl hover:shadow-copper/10 ${
                i === 2 ? "lg:col-span-2 lg:max-w-2xl lg:mx-auto w-full" : ""
              }`}
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.accent} opacity-60 pointer-events-none`}
              />

              <div className="relative p-7 sm:p-9 flex flex-col h-full">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <span className="text-copper text-[11px] font-bold tracking-[0.25em] uppercase bg-copper/10 px-2.5 py-1 rounded-full">
                    {project.category}
                  </span>
                  <span className="text-white/50 text-[11px] tracking-wider uppercase">
                    {project.links.length ? "Live Product" : "Confidential"}
                  </span>
                </div>

                <h3 className="text-white font-bold text-xl sm:text-2xl mb-1">
                  {project.client}
                </h3>
                <p className="text-copper text-sm font-medium mb-4">{project.title}</p>
                <p className="text-muted text-sm leading-relaxed mb-4 flex-1">
                  {project.description}
                </p>
                {"note" in project && project.note ? (
                  <p className="text-muted/70 text-xs italic mb-6">{project.note}</p>
                ) : null}

                <div className="mb-5">
                  <p className="text-white/55 text-[11px] tracking-[0.2em] uppercase mb-2.5">
                    Built
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.stack.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs text-muted border border-white/10 rounded-full px-3 py-1 bg-ink-navy/40"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-7">
                  <p className="text-white/55 text-[11px] tracking-[0.2em] uppercase mb-2.5">
                    Ongoing Microsoft Support
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.support.map((item) => (
                      <span
                        key={item}
                        className="text-xs text-copper border border-copper/20 rounded-full px-3 py-1 bg-copper/5"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {project.links.length > 0 ? (
                  <div className="flex flex-wrap gap-3 mt-auto pt-5 border-t border-white/5">
                    {project.links.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm text-white hover:text-copper transition-colors font-medium"
                      >
                        {link.label}
                        <span className="text-copper text-xs" aria-hidden>
                          ↗
                        </span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <div className="mt-auto pt-5 border-t border-white/5">
                    <p className="text-muted text-xs">
                      Reference available under NDA on request.
                    </p>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
