"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ================================================================
   Job Listings
   ================================================================ */
interface Job {
  id: string;
  title: string;
  region: string;
  location: string;
  type: string;
  posted: string;
  status: "open" | "closed";
  description: string;
  responsibilities: string[];
  requirements: string[];
}

const jobs: Job[] = [
  {
    id: "sr-bi-consultant-boston",
    title: "Senior Power BI Consultant",
    region: "USA",
    location: "Boston, MA (Hybrid)",
    type: "Full-time",
    posted: "2026-04-12",
    status: "closed",
    description: "Lead end-to-end Power BI implementations for enterprise clients across healthcare and financial services. Design data models, build executive dashboards, and mentor junior analysts.",
    responsibilities: [
      "Architect and deliver Power BI solutions for mid-market and enterprise clients",
      "Design star-schema data models and write advanced DAX measures",
      "Conduct stakeholder workshops to define KPIs and reporting needs",
      "Implement row-level security and deployment pipelines",
      "Mentor junior consultants and review their deliverables",
    ],
    requirements: [
      "4+ years of Power BI development experience",
      "Strong DAX, Power Query (M), and data modelling skills",
      "Experience with SQL Server, Azure SQL, or Fabric lakehouses",
      "Excellent communication and client-facing skills",
      "Microsoft PL-300 certification preferred",
    ],
  },
  {
    id: "data-eng-istanbul",
    title: "Data Engineer",
    region: "Turkey",
    location: "Istanbul, Turkey (Remote)",
    type: "Full-time",
    posted: "2026-05-03",
    status: "closed",
    description: "Build and maintain data pipelines using Microsoft Fabric and Databricks for clients across Turkey and the Eastern Mediterranean region.",
    responsibilities: [
      "Design and implement ETL/ELT pipelines in Microsoft Fabric and Databricks",
      "Build and manage lakehouses with Delta Lake and medallion architecture",
      "Develop PySpark notebooks for large-scale data transformations",
      "Collaborate with BI consultants to ensure clean, modelled data delivery",
      "Monitor pipeline performance and implement data quality checks",
    ],
    requirements: [
      "3+ years of data engineering experience",
      "Proficiency in Python, PySpark, and SQL",
      "Hands-on experience with Databricks or Microsoft Fabric",
      "Understanding of data warehouse design patterns",
      "English and Turkish fluency required",
    ],
  },
  {
    id: "pa-consultant-dubai",
    title: "Power Platform Consultant",
    region: "Middle East",
    location: "Dubai, UAE (On-site)",
    type: "Full-time",
    posted: "2026-06-18",
    status: "open",
    description: "Deliver Power Apps and Power Automate solutions for enterprise clients in the GCC region. Automate business processes and build custom low-code applications.",
    responsibilities: [
      "Gather requirements and design Power Apps (Canvas and Model-driven)",
      "Build Power Automate flows for document approvals, notifications, and integrations",
      "Integrate solutions with SharePoint, Dataverse, and third-party APIs",
      "Train client teams on solution usage and maintenance",
      "Support pre-sales with technical demos and solution proposals",
    ],
    requirements: [
      "2+ years of Power Platform development experience",
      "Strong knowledge of Power Apps, Power Automate, and Dataverse",
      "Experience with SharePoint Online and Microsoft 365",
      "Excellent client communication skills",
      "PL-200 or PL-400 certification preferred",
    ],
  },
  {
    id: "jr-analyst-warsaw",
    title: "Junior Data Analyst",
    region: "Europe",
    location: "Warsaw, Poland (Remote)",
    type: "Full-time",
    posted: "2026-07-22",
    status: "closed",
    description: "Support our European client engagements with data analysis, dashboard development, and reporting. Great opportunity for early-career analysts to grow in a consulting environment.",
    responsibilities: [
      "Build and maintain Power BI reports and dashboards",
      "Write SQL queries to extract and transform data from client databases",
      "Clean and prepare datasets using Excel and Power Query",
      "Document data sources, business logic, and report specifications",
      "Assist senior consultants with client presentations and data storytelling",
    ],
    requirements: [
      "0\u20132 years of experience in data analytics or related field",
      "Proficiency in Excel, SQL, and Power BI",
      "Strong attention to detail and analytical thinking",
      "Ability to work independently in a remote setting",
      "English fluency required; Polish or other EU language is a plus",
    ],
  },
  {
    id: "ai-solutions-architect-boston",
    title: "AI Solutions Architect",
    region: "USA",
    location: "Boston, MA (Remote)",
    type: "Full-time",
    posted: "2026-08-05",
    status: "open",
    description: "Design and implement AI-powered solutions including document intelligence, predictive analytics, and intelligent automation for enterprise clients.",
    responsibilities: [
      "Architect AI solutions using Azure AI Services, OpenAI, and custom ML models",
      "Lead discovery sessions with clients to identify AI use cases and ROI",
      "Build document processing pipelines using Azure AI Document Intelligence",
      "Develop predictive analytics models and integrate them into Power BI dashboards",
      "Stay current with AI trends and evaluate emerging technologies for client value",
    ],
    requirements: [
      "5+ years in data science, ML engineering, or AI architecture",
      "Experience with Azure AI Services, OpenAI API, or similar platforms",
      "Strong Python skills (pandas, scikit-learn, transformers)",
      "Understanding of enterprise data architecture and cloud platforms",
      "AI-102 or DP-100 certification preferred",
    ],
  },
  {
    id: "bi-consultant-baku",
    title: "BI Consultant",
    region: "Western Asia",
    location: "Baku, Azerbaijan (Hybrid)",
    type: "Full-time",
    posted: "2026-08-28",
    status: "open",
    description: "Deliver business intelligence solutions for clients in the Caucasus and Central Asia region. Build dashboards, train users, and drive data-driven decision making.",
    responsibilities: [
      "Develop Power BI dashboards and reports for regional clients",
      "Conduct data analysis using SQL and Excel to support business decisions",
      "Lead training sessions for client teams on Power BI and data literacy",
      "Collaborate with the Boston HQ team on global project standards",
      "Manage multiple client engagements and deliver on schedule",
    ],
    requirements: [
      "2+ years of BI or data analytics experience",
      "Strong Power BI, SQL, and Excel skills",
      "Experience working with clients in a consulting environment",
      "Azerbaijani and English fluency required; Russian is a plus",
      "Bachelor\u2019s degree in Computer Science, Business, or related field",
    ],
  },
  {
    id: "sr-data-eng-boston",
    title: "Senior Data Engineer (Fabric & Databricks)",
    region: "USA",
    location: "Boston, MA (Hybrid)",
    type: "Contract",
    posted: "2026-09-15",
    status: "open",
    description: "Lead complex data platform implementations using Microsoft Fabric and Databricks for our largest US clients. 6-month contract with potential to convert to full-time.",
    responsibilities: [
      "Design end-to-end data platform architectures using Fabric and Databricks",
      "Implement medallion architecture with Delta Lake for enterprise data lakes",
      "Build and optimize Spark jobs for large-scale data processing",
      "Establish CI/CD pipelines for data engineering workflows",
      "Mentor team members and establish engineering best practices",
    ],
    requirements: [
      "6+ years of data engineering experience",
      "Expert-level Databricks and/or Microsoft Fabric skills",
      "Strong PySpark, Delta Lake, and SQL expertise",
      "Experience with Azure Data Factory, Synapse, or similar services",
      "DP-600 or Databricks certification preferred",
    ],
  },
  {
    id: "marketing-dubai",
    title: "Digital Marketing Specialist",
    region: "Middle East",
    location: "Dubai, UAE (Remote)",
    type: "Part-time",
    posted: "2026-10-01",
    status: "open",
    description: "Drive brand awareness and lead generation for Nurnex Consulting across the MENA region through digital marketing, content creation, and social media management.",
    responsibilities: [
      "Manage Nurnex social media accounts (LinkedIn, Instagram, TikTok) for MENA region",
      "Create engaging content about data analytics, AI, and digital transformation",
      "Run targeted ad campaigns to generate leads for consulting services and bootcamp",
      "Track campaign performance and optimize based on analytics",
      "Collaborate with the US team on global marketing strategy",
    ],
    requirements: [
      "2+ years of digital marketing experience",
      "Strong content creation skills (copywriting, basic design, video)",
      "Experience with LinkedIn Ads, Google Ads, and social media management tools",
      "Understanding of B2B marketing in technology or consulting",
      "English and Arabic fluency preferred",
    ],
  },
];

const regions = ["All", "USA", "Europe", "Turkey", "Western Asia", "Middle East"];

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const posted = new Date(dateStr + "T00:00:00");
  const days = Math.floor((now.getTime() - posted.getTime()) / 86400000);
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/* ================================================================
   Page
   ================================================================ */
export default function CareersPage() {
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [expandedJob, setExpandedJob] = useState<string | null>(null);

  const filtered = selectedRegion === "All" ? jobs : jobs.filter(j => j.region === selectedRegion);
  const openCount = jobs.filter(j => j.status === "open").length;

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative pt-36 sm:pt-44 pb-16 sm:pb-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,120,43,0.08)_0%,_transparent_50%)]" />
          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold mb-6 bg-copper/10 border border-copper/20 text-copper">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {openCount} Open Positions
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Join the <span className="text-copper">Nurnex</span> Team
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-muted text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              We are building the future of data and AI consulting. Work with world-class clients,
              solve real problems, and grow your career &#8212; from anywhere.
            </motion.p>
          </div>
        </section>

        {/* Stats */}
        <section className="py-8 border-y border-border bg-card/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: "5", label: "Global Offices" },
                { value: `${openCount}`, label: "Open Roles" },
                { value: "100%", label: "Remote-Friendly" },
                { value: "4", label: "Regions Hiring" },
              ].map((s, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-copper">{s.value}</div>
                  <div className="text-xs sm:text-sm text-muted mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Filter + Jobs */}
        <section className="py-16 sm:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Region Filter */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="flex flex-wrap gap-2 mb-10">
              {regions.map(r => (
                <button key={r} onClick={() => setSelectedRegion(r)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedRegion === r
                      ? "bg-copper text-white"
                      : "bg-card border border-border text-muted hover:text-white hover:border-copper/40"
                  }`}>
                  {r}
                </button>
              ))}
            </motion.div>

            {/* Job Cards */}
            <div className="space-y-4">
              {filtered.map((job, i) => (
                <motion.div key={job.id} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.3}
                  className="bg-card border border-border rounded-2xl overflow-hidden hover:border-copper/30 transition-all">

                  {/* Job Header */}
                  <button onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    className="w-full text-left p-5 sm:p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                            job.status === "open"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : "bg-muted/10 text-muted border border-border"
                          }`}>
                            {job.status === "open" ? "Open" : "Filled"}
                          </span>
                          <span className="text-xs text-muted">{job.type}</span>
                          <span className="text-xs text-muted">&#183; {timeAgo(job.posted)}</span>
                        </div>
                        <h3 className="text-white font-semibold text-lg">{job.title}</h3>
                        <div className="flex items-center gap-3 mt-1.5 text-sm text-muted">
                          <span className="flex items-center gap-1">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
                              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
                            </svg>
                            {job.location}
                          </span>
                          <span className="text-copper text-xs font-medium">{job.region}</span>
                        </div>
                      </div>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                        className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${expandedJob === job.id ? "rotate-180" : ""}`}>
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </button>

                  {/* Expanded Details */}
                  {expandedJob === job.id && (
                    <div className="px-5 sm:px-6 pb-6 border-t border-border/50 pt-5">
                      <p className="text-muted text-sm leading-relaxed mb-5">{job.description}</p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-3">Responsibilities</h4>
                          <ul className="space-y-2">
                            {job.responsibilities.map((r, ri) => (
                              <li key={ri} className="flex items-start gap-2 text-muted text-sm">
                                <span className="text-copper mt-0.5 flex-shrink-0">&#8226;</span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold text-sm mb-3">Requirements</h4>
                          <ul className="space-y-2">
                            {job.requirements.map((r, ri) => (
                              <li key={ri} className="flex items-start gap-2 text-muted text-sm">
                                <span className="text-copper mt-0.5 flex-shrink-0">&#8226;</span>
                                {r}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-border/50">
                        <span className="text-muted text-xs">Posted {formatDate(job.posted)}</span>
                        {job.status === "open" ? (
                          <Link href="/#contact"
                            className="bg-copper hover:bg-copper/90 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-copper/30">
                            Apply Now
                          </Link>
                        ) : (
                          <span className="text-muted text-sm italic">This position has been filled</span>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted text-lg">No positions in this region right now.</p>
                <p className="text-muted text-sm mt-2">Check back soon or <Link href="/#contact" className="text-copper hover:text-white transition-colors">send us your resume</Link>.</p>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 sm:py-20 bg-card/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">Don&#39;t See Your Role?</h2>
              <p className="text-muted text-lg mb-8 max-w-xl mx-auto">
                We are always looking for talented people. Send us your resume and we will reach out when the right opportunity opens.
              </p>
              <Link href="/#contact"
                className="inline-block bg-copper hover:bg-copper/90 text-white px-8 py-4 rounded-xl text-base font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-copper/30 hover:scale-105">
                Send Your Resume
              </Link>
            </motion.div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
