"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

interface Demo {
  id: string;
  title: string;
  subtitle: string;
  category: "power-bi" | "power-apps" | "power-automate" | "azure" | "web";
  categoryLabel: string;
  description: string;
  embedUrl: string | null;
  embedType: "powerbi" | "video" | "image";
  tags: string[];
  comingSoon?: boolean;
}

const demos: Demo[] = [
  {
    id: "corporate-financial-report",
    title: "Corporate Financial Report",
    subtitle: "Interactive financial overview and analysis",
    category: "power-bi",
    categoryLabel: "Power BI",
    description:
      "Explore a live corporate financial dashboard built with Power BI. " +
      "Analyze revenue, expenses, margins, and trends across business units. " +
      "See how executive dashboards turn financial data into actionable insights " +
      "with drill-through, KPI cards, and comparative analysis.",
    embedUrl: "https://app.powerbi.com/view?r=eyJrIjoiMDllYzViMWItYjcxYS00MzM0LWE4NDEtZTYxNDU3YThhMGRiIiwidCI6Ijg4NzdlNTYyLTIxNTAtNDczMC04ZjMwLTg4YTEwMDFkNjY1ZSJ9&pageName=48bf016e084dec8e6dcc",
    embedType: "powerbi",
    tags: ["Finance", "Revenue", "KPIs", "Drill-Through"],
  },
  {
    id: "hr-analytics",
    title: "HR People Analytics",
    subtitle: "Workforce insights and retention dashboard",
    category: "power-bi",
    categoryLabel: "Power BI",
    description:
      "A sample HR analytics dashboard showing headcount trends, " +
      "turnover analysis, diversity metrics, and department comparisons. " +
      "See how Power BI transforms HR data into strategic workforce insights.",
    embedUrl: null,
    embedType: "powerbi",
    tags: ["HR", "Workforce", "Retention", "Diversity"],
    comingSoon: true,
  },
  {
    id: "approval-workflow",
    title: "Approval Workflow Automation",
    subtitle: "Multi-stage approval with email notifications",
    category: "power-automate",
    categoryLabel: "Power Automate",
    description:
      "Watch how a purchase order approval moves through a multi-stage " +
      "Power Automate flow: manager approval, finance review, auto-notifications, " +
      "and audit trail. No code, fully governed.",
    embedUrl: null,
    embedType: "video",
    tags: ["Approvals", "Workflows", "Notifications", "Governance"],
    comingSoon: true,
  },
  {
    id: "inventory-app",
    title: "Inventory Management App",
    subtitle: "Mobile-first stock tracking with barcode scan",
    category: "power-apps",
    categoryLabel: "Power Apps",
    description:
      "A canvas Power App for warehouse teams: scan barcodes, update stock levels, " +
      "trigger reorder alerts, and sync with Dataverse. Runs on any phone or tablet.",
    embedUrl: null,
    embedType: "video",
    tags: ["Inventory", "Mobile", "Barcode", "Dataverse"],
    comingSoon: true,
  },
];

const categoryColors: Record<string, string> = {
  "power-bi": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "power-apps": "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "power-automate": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  azure: "bg-sky-500/10 text-sky-400 border-sky-500/20",
  web: "bg-green-500/10 text-green-400 border-green-500/20",
};

const categoryIcons: Record<string, React.ReactNode> = {
  "power-bi": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7 14l3-3 2 2 5-5" />
    </svg>
  ),
  "power-apps": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <path d="M12 18h.01" />
    </svg>
  ),
  "power-automate": (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  azure: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  web: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  ),
};

export default function DemosPage() {
  const [activeDemo, setActiveDemo] = useState<Demo | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(demos.map((d) => d.category)))];

  const filtered =
    filter === "all" ? demos : demos.filter((d) => d.category === filter);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background pt-28 sm:pt-32 pb-20">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted hover:text-copper transition-colors text-sm mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to home
          </Link>

          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Interactive Demos
          </h1>
          <p className="text-muted text-lg sm:text-xl max-w-2xl leading-relaxed">
            Explore live dashboards and solution templates we build for clients.
            Click any demo to interact with it directly in your browser.
          </p>
        </section>

        {/* Filters */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => {
              const label =
                cat === "all"
                  ? "All"
                  : demos.find((d) => d.category === cat)?.categoryLabel || cat;
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all border " +
                    (filter === cat
                      ? "bg-copper text-white border-copper"
                      : "bg-card border-border text-muted hover:text-white hover:border-copper/40")
                  }
                >
                  {label}
                </button>
              );
            })}
          </div>
        </section>

        {/* Demo Grid */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((demo) => (
              <motion.div
                key={demo.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={
                  "group relative bg-card border border-border rounded-2xl overflow-hidden transition-all hover:border-copper/40 hover:shadow-lg hover:shadow-copper/5 " +
                  (demo.comingSoon ? "opacity-60" : "cursor-pointer")
                }
                onClick={() => !demo.comingSoon && setActiveDemo(demo)}
              >
                {/* Preview area */}
                <div className="relative h-48 bg-ink-navy/50 flex items-center justify-center overflow-hidden">
                  {demo.embedUrl && demo.embedType === "powerbi" ? (
                    <div className="absolute inset-0 pointer-events-none">
                      <iframe
                        title={demo.title + " preview"}
                        src={demo.embedUrl}
                        className="w-full h-full border-0 scale-[0.5] origin-top-left"
                        style={{ width: "200%", height: "200%" }}
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-3 text-muted/40">
                      <div className="w-16 h-16 rounded-xl bg-border/30 flex items-center justify-center">
                        {categoryIcons[demo.category]}
                      </div>
                      {demo.comingSoon && (
                        <span className="text-xs uppercase tracking-widest text-copper/60 font-semibold">
                          Coming Soon
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className={
                        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border " +
                        (categoryColors[demo.category] || "")
                      }
                    >
                      {categoryIcons[demo.category]}
                      {demo.categoryLabel}
                    </span>
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-1 group-hover:text-copper transition-colors">
                    {demo.title}
                  </h3>
                  <p className="text-muted text-sm mb-3">{demo.subtitle}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {demo.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] text-muted/60 bg-border/30 px-2 py-0.5 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {!demo.comingSoon && (
                  <div className="absolute top-4 right-4 bg-copper/90 text-white text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                    Open Demo
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-card border border-border rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-3">
              Want a dashboard like this for your business?
            </h2>
            <p className="text-muted text-sm sm:text-base max-w-xl mx-auto mb-6">
              We build custom Power BI dashboards, Power Apps, and automations
              tailored to your data and workflows. Start with a free discovery call.
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-copper hover:bg-copper/90 text-white px-6 py-3 rounded-lg text-sm font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-copper/20"
            >
              Book a Discovery Call
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />

      {/* Fullscreen demo modal */}
      <AnimatePresence>
        {activeDemo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col"
          >
            {/* Modal header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-ink-navy border-b border-border">
              <div className="flex items-center gap-3">
                <span
                  className={
                    "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border " +
                    (categoryColors[activeDemo.category] || "")
                  }
                >
                  {categoryIcons[activeDemo.category]}
                  {activeDemo.categoryLabel}
                </span>
                <h2 className="text-white font-semibold text-sm sm:text-base">
                  {activeDemo.title}
                </h2>
              </div>
              <button
                onClick={() => setActiveDemo(null)}
                className="text-muted hover:text-white transition-colors p-2"
                aria-label="Close demo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Embed area */}
            <div className="flex-1 relative">
              {activeDemo.embedUrl ? (
                <iframe
                  title={activeDemo.title}
                  src={activeDemo.embedUrl}
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center max-w-md px-6">
                    <div className="w-20 h-20 rounded-2xl bg-card border border-border flex items-center justify-center mx-auto mb-6 text-muted">
                      {categoryIcons[activeDemo.category]}
                    </div>
                    <h3 className="text-white text-xl font-semibold mb-3">
                      Demo coming soon
                    </h3>
                    <p className="text-muted text-sm leading-relaxed mb-2">
                      {activeDemo.description}
                    </p>
                    <p className="text-copper text-xs">
                      The interactive embed will appear here once published.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Description bar */}
            <div className="px-4 sm:px-6 py-3 bg-ink-navy border-t border-border">
              <p className="text-muted text-xs sm:text-sm max-w-3xl">
                {activeDemo.description}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
