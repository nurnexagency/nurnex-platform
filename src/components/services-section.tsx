"use client";

import { useState, useEffect, useCallback, useId } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ConstellationBg from "@/components/bg/constellation-bg";

interface ServiceData {
  icon: React.ReactNode;
  name: string;
  shortDesc: string;
  fullDesc: string;
  includes: string[];
  forWhom: string;
  timeline: string;
  category: "microsoft" | "digital";
}

const services: ServiceData[] = [
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M9 17H5a2 2 0 0 0-2 2m14-2h4a2 2 0 0 1 2 2M12 3v4m0 0a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
        <circle cx="12" cy="11" r="1" fill="currentColor" />
      </svg>
    ),
    name: "Discovery & Roadmap Sprint",
    shortDesc: "Rapid assessment of your data landscape with a prioritized transformation roadmap.",
    fullDesc:
      "A focused 1-week engagement where we assess your current Microsoft environment, interview key stakeholders, and deliver a prioritized roadmap with architecture recommendations and a fixed-price quote for implementation.\n\nWe dig into your existing M365 tenant, data sources, and application landscape to identify the highest-ROI opportunities. You walk away with a clear, actionable plan — not a 100-page report that gathers dust.",
    includes: [
      "Stakeholder interviews",
      "M365 / data / apps assessment",
      "Prioritized use-case backlog ranked by ROI",
      "Architecture and licensing sketch",
      "90-day implementation roadmap",
    ],
    forWhom: "CTOs, IT Directors, Digital Transformation leads",
    timeline: "1–2 weeks",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M7 14l3-3 2 2 5-5" />
      </svg>
    ),
    name: "Power BI Executive Dashboards",
    shortDesc: "Real-time analytics and KPI dashboards that drive executive decision-making.",
    fullDesc:
      "Replace scattered Excel reports with a single source of truth. We design and build governed Power BI dashboards that leadership actually trusts — with proper data modeling, security, and automated refresh.\n\nFrom KPI discovery through to production deployment, we build dashboards that answer real business questions and update automatically so you never have to chase numbers again.",
    includes: [
      "KPI discovery workshop",
      "Semantic data model",
      "3–8+ dashboard pages",
      "Row-level security",
      "Automated refresh",
      "Documentation and handoff training",
    ],
    forWhom: "CFOs, COOs, department heads, BI managers",
    timeline: "3–12 weeks depending on scope",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M12 2v6m0 8v6M2 12h6m8 0h6" />
        <circle cx="12" cy="12" r="3" />
        <path d="M4.93 4.93l4.24 4.24m5.66 5.66l4.24 4.24M4.93 19.07l4.24-4.24m5.66-5.66l4.24-4.24" />
      </svg>
    ),
    name: "Workflow & Approval Automation",
    shortDesc: "Power Automate flows that eliminate manual processes and accelerate approvals.",
    fullDesc:
      "Eliminate email-chain approvals and manual tracking. We map your processes and build automated workflows with full audit trails, notifications, and SLA tracking using Power Automate and Dataverse.\n\nWhether it's expense approvals, onboarding workflows, or procurement chains, we replace manual handoffs with reliable, auditable automation that your compliance team will love.",
    includes: [
      "Process mapping",
      "Automated approval flows",
      "SharePoint / Dataverse integration",
      "Notifications and SLA tracking",
      "Admin documentation",
    ],
    forWhom: "Operations, HR, Finance, IT departments",
    timeline: "2–12 weeks depending on complexity",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
        <path d="M14 2v6h6M8 13h8M8 17h4" />
      </svg>
    ),
    name: "Power BI / Excel Rescue",
    shortDesc: "Fix broken reports, optimize slow models, and migrate legacy Excel workflows.",
    fullDesc:
      "Your existing reports are slow, broken, or nobody trusts the numbers. We diagnose the root cause, refactor the data model, optimize DAX, fix refresh issues, and hand back a performant, documented solution.\n\nWe've rescued dashboards that took 45 minutes to refresh and turned them into sub-minute experiences. If your team has lost faith in the data, we restore it.",
    includes: [
      "Performance diagnosis",
      "Model and DAX refactoring",
      "Refresh optimization",
      "Usage documentation",
    ],
    forWhom: "Teams with broken or slow existing Power BI / massive Excel",
    timeline: "1–5 weeks",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    name: "Power Platform CoE & Governance",
    shortDesc: "Center of Excellence setup with DLP policies, environment strategy, and monitoring.",
    fullDesc:
      "Prevent shadow IT chaos. We design and implement a Center of Excellence framework so your organization can scale Power Platform adoption safely — with proper environments, security policies, and citizen-developer guardrails.\n\nFrom DLP policies to ALM pipelines, we put the scaffolding in place that lets innovation happen without exposing your organization to risk.",
    includes: [
      "Environment strategy",
      "DLP policies",
      "ALM / pipeline setup",
      "Monitoring dashboards",
      "Citizen-developer policy",
      "Admin training",
    ],
    forWhom: "CIOs, IT governance, regulated industries",
    timeline: "4–14 weeks",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M2 20h20M5 20V8l7-5 7 5v12" />
        <rect x="9" y="12" width="6" height="8" />
      </svg>
    ),
    name: "Azure Data Pipelines",
    shortDesc: "End-to-end data engineering on Azure: ingestion, transformation, and warehousing.",
    fullDesc:
      "Connect siloed data sources into a reliable, governed data platform. We build production-grade pipelines using Azure Data Factory, Synapse, or Fabric — with monitoring, CI/CD, and documentation.\n\nWhether you need a lakehouse, a star-schema warehouse, or a hybrid approach, we architect and deliver pipelines that run unattended and alert you before problems become outages.",
    includes: [
      "Pipeline architecture design",
      "ADF / Synapse / Fabric implementation",
      "Lakehouse / warehouse pattern",
      "Monitoring and alerting",
      "Basic CI/CD",
    ],
    forWhom: "Data engineering teams, IT departments",
    timeline: "6 weeks – 6 months",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6l-4 5-4-5c-1.5-1.5-3-3.5-3-6a7 7 0 0 1 7-7Z" />
        <circle cx="12" cy="9" r="2" />
      </svg>
    ),
    name: "Copilot & AI Readiness",
    shortDesc: "Prepare your organization for Microsoft 365 Copilot with data hygiene and adoption.",
    fullDesc:
      "Before deploying Microsoft Copilot or AI Builder, we assess your security posture, data residency requirements, and organizational readiness — then design a safe pilot roadmap so AI delivers value without risk.\n\nWe help you navigate sensitivity labels, data residency for UAE/Saudi/EU regulations, and identify the pilot use-cases where Copilot will deliver the fastest, safest ROI.",
    includes: [
      "Security and data residency checklist",
      "Sensitivity label review",
      "Pilot use-case identification",
      "Copilot / AI Builder roadmap",
      "Implementation recommendations",
    ],
    forWhom: "Innovation teams, digital transformation leads, UAE/Saudi/EU-regulated firms",
    timeline: "2–8 weeks",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M7 20h10M3 10h18" />
        <circle cx="8" cy="10" r="1" fill="currentColor" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
    name: "Custom Power Apps",
    shortDesc: "Bespoke canvas and model-driven apps tailored to your unique business processes.",
    fullDesc:
      "Replace spreadsheet-driven operations with purpose-built business applications. We design and develop Canvas or Model-driven apps with proper data architecture, role-based access, and mobile support.\n\nFrom intake forms to full-featured line-of-business apps, we build solutions that your team actually wants to use — with Dataverse under the hood for enterprise-grade reliability.",
    includes: [
      "App design and prototyping",
      "Canvas or Model-driven development",
      "Dataverse integration",
      "Role-based security",
      "Mobile optimization",
      "Admin documentation",
    ],
    forWhom: "Line-of-business managers, operations teams",
    timeline: "4–12 weeks",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" />
        <path d="M8 7h8M8 11h6" />
      </svg>
    ),
    name: "Corporate Training",
    shortDesc: "Hands-on workshops for Power BI, Power Apps, and Power Automate for your team.",
    fullDesc:
      "Ensure your investment in Microsoft tools actually sticks. We deliver hands-on workshops for analysts, citizen developers, and executives — customized to your data and real business scenarios.\n\nNo generic slide decks. Every lab uses your actual data and business context so participants leave ready to apply what they learned on Monday morning.",
    includes: [
      "Customized curriculum",
      "Hands-on labs with your data",
      "Instructor-led sessions (virtual or on-site)",
      "Post-training reference materials",
    ],
    forWhom: "HR L&D, IT enablement teams",
    timeline: "1–5 days per cohort",
  },
  {
    category: "microsoft",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    name: "Managed Support Retainer",
    shortDesc: "Ongoing expert support with guaranteed response times and proactive monitoring.",
    fullDesc:
      "After go-live, keep your solutions healthy with ongoing monthly support. We handle enhancements, bug fixes, performance monitoring, and backlog grooming so your team can focus on the business.\n\nThink of it as having a senior Microsoft consultant on speed dial — without the overhead of a full-time hire. We proactively monitor, suggest improvements, and keep everything running smoothly.",
    includes: [
      "Monthly support hours",
      "Report enhancements",
      "Bug fixes",
      "Refresh monitoring",
      "Monthly health check",
      "Backlog grooming",
    ],
    forWhom: "Post-project clients",
    timeline: "Ongoing monthly",
  },
  {
    category: "digital",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <circle cx="12" cy="12" r="9" />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </svg>
    ),
    name: "Website & Web Application Development",
    shortDesc: "Modern, conversion-focused websites and web apps — designed, built, and launched end to end.",
    fullDesc:
      "We design and develop professional websites and web applications that look premium, load fast, and convert visitors into customers. From marketing sites to enrollment platforms, dashboards, and customer portals — we ship production-ready digital products.\n\nOur builds include responsive design, secure backends, payment integrations where needed, and documentation so your team can operate confidently after launch.",
    includes: [
      "UX / UI design and brand-aligned layouts",
      "Responsive website or web application development",
      "Secure backend, forms, and integrations",
      "CMS or admin workflows where required",
      "Performance, SEO foundations, and launch support",
      "Handover documentation and training",
    ],
    forWhom: "Businesses, academies, and organizations that need a polished digital presence or custom web product",
    timeline: "4–16 weeks depending on scope",
  },
  {
    category: "digital",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-7 h-7" aria-hidden>
        <rect x="7" y="2" width="10" height="20" rx="2" />
        <path d="M11 18h2" />
      </svg>
    ),
    name: "iOS & Android Mobile App Development",
    shortDesc:
      "iPhone, iPad, and Android apps — App Store live today; Android / Google Play available on request.",
    fullDesc:
      "We build mobile applications for iOS and Android that families and customers actually use — enrollment apps, training apps, client portals, and operational tools. Our shipped client work includes live iOS App Store products; Android and Google Play delivery is available as part of the same engagement when you need both platforms.\n\nApps can connect to your website, Firebase or secure backends, Stripe billing, messaging workflows, and analytics — so mobile becomes part of your business system, not a disconnected brochure.",
    includes: [
      "iOS (iPhone / iPad) development with App Store submission",
      "Android development & Google Play available on request",
      "Backend connectivity, auth, and secure data flows",
      "Payments, enrollment, or training features as needed",
      "Push notifications, App Clips, and platform features where relevant",
      "QA, launch support, and post-release maintenance options",
    ],
    forWhom: "Education providers, service businesses, and organizations needing mobile products alongside web",
    timeline: "6–20 weeks depending on platforms and features",
  },
];

const microsoftServices = services.filter((s) => s.category === "microsoft");
const digitalServices = services.filter((s) => s.category === "digital");

const cardVariants = {
  hidden: { opacity: 0, y: 60, rotateX: 12, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    },
  }),
};

function ServiceModal({
  service,
  onClose,
}: {
  service: ServiceData;
  onClose: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-hidden
      />

      <motion.div
        className="relative bg-card-bg border border-white/10 rounded-2xl p-6 sm:p-8 max-w-2xl w-full max-h-[85vh] overflow-y-auto modal-scroll"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 text-muted hover:text-white transition-colors p-1"
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="flex items-start gap-4 mb-6 pr-8">
          <div className="text-copper flex-shrink-0 mt-1">{service.icon}</div>
          <h2 id={titleId} className="text-white font-bold text-xl sm:text-2xl leading-tight">
            {service.name}
          </h2>
        </div>

        <div className="mb-6">
          {service.fullDesc.split("\n\n").map((para, i) => (
            <p key={i} className="text-muted text-sm sm:text-base leading-relaxed mb-3 last:mb-0">
              {para}
            </p>
          ))}
        </div>

        <div className="mb-6">
          <h3 className="text-white font-semibold text-base mb-3 flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" stroke="#C4782B" strokeWidth="1.5" className="w-4 h-4" aria-hidden>
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
            What&apos;s Included
          </h3>
          <ul className="space-y-2">
            {service.includes.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <span className="text-copper mt-0.5 flex-shrink-0" aria-hidden>
                  ✦
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-ink-navy/50 rounded-xl p-4">
            <p className="text-copper text-xs tracking-wide uppercase mb-1.5">Who It&apos;s For</p>
            <p className="text-white text-sm">{service.forWhom}</p>
          </div>
          <div className="bg-ink-navy/50 rounded-xl p-4">
            <p className="text-copper text-xs tracking-wide uppercase mb-1.5">Typical Timeline</p>
            <p className="text-white text-sm">{service.timeline}</p>
          </div>
        </div>

        <a
          href="#contact"
          onClick={onClose}
          className="block w-full text-center bg-copper hover:bg-copper/90 text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-copper/20"
        >
          Email Us to Schedule
        </a>
      </motion.div>
    </motion.div>
  );
}

function ServiceCard({
  service,
  index,
  onOpen,
}: {
  service: ServiceData;
  index: number;
  onOpen: () => void;
}) {
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onOpen();
      }
    },
    [onOpen]
  );

  return (
    <motion.div
      custom={index}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={cardVariants}
      role="button"
      tabIndex={0}
      aria-label={`${service.name}. Learn more.`}
      onClick={onOpen}
      onKeyDown={onKeyDown}
      className="group relative bg-card-bg border border-white/5 rounded-xl p-6 hover:border-copper/30 transition-all duration-300 hover:shadow-[0_4px_30px_rgba(196,120,43,0.1)] flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-navy"
      style={{ transformStyle: "preserve-3d" }}
    >
      <div className="text-copper mb-4 group-hover:scale-110 transition-transform duration-300">
        {service.icon}
      </div>
      <h3 className="text-white font-semibold text-base mb-2 leading-snug">{service.name}</h3>
      <p className="text-muted text-sm leading-relaxed mb-4 flex-1">{service.shortDesc}</p>
      <div className="flex items-center mt-auto pt-4 border-t border-white/5">
        <span className="text-copper text-sm font-medium group-hover:tracking-wider transition-all duration-300">
          Learn More →
        </span>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openByName = (name: string) => {
    const idx = services.findIndex((s) => s.name === name);
    if (idx >= 0) setSelectedIndex(idx);
  };

  return (
    <section id="services" className="relative py-20 sm:py-28 bg-ink-navy overflow-hidden">
      <ConstellationBg />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.5) 30px, rgba(255,255,255,0.5) 31px)",
          opacity: 0.03,
        }}
      />
      <div className="absolute top-0 right-0 w-1/2 h-1/2 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,rgba(196,120,43,0.04)_0%,transparent_70%)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-16"
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">Our Expertise</p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">What We Deliver</h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Microsoft analytics, automation, and cloud — plus websites and iOS &amp; Android
            applications when you need the full digital stack.
          </p>
        </motion.div>

        <div className="mb-14">
          <h3 className="text-white font-semibold text-lg mb-2 tracking-wide">Microsoft Stack</h3>
          <p className="text-muted text-sm mb-6 max-w-2xl">
            Power BI, Power Platform, Azure, Copilot readiness, training, and managed support.
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            style={{ perspective: "1200px" }}
          >
            {microsoftServices.map((service, i) => (
              <ServiceCard
                key={service.name}
                service={service}
                index={i}
                onOpen={() => openByName(service.name)}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold text-lg mb-2 tracking-wide">Digital Products</h3>
          <p className="text-muted text-sm mb-6 max-w-2xl">
            Websites and mobile apps — with Microsoft automation and dashboards behind them when you need both.
          </p>
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            style={{ perspective: "1200px" }}
          >
            {digitalServices.map((service, i) => (
              <ServiceCard
                key={service.name}
                service={service}
                index={i}
                onOpen={() => openByName(service.name)}
              />
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <ServiceModal
            service={services[selectedIndex]}
            onClose={() => setSelectedIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
