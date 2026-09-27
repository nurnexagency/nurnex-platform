"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import CurrentFlowBg from "@/components/bg/current-flow-bg";

const phases = [
  {
    num: "01",
    tag: "INITIATION",
    title: "Ambassador or Direct Intake",
    summary: "Start with a Nurnex Ambassador in your region — or email us directly. Both paths lead to the same discovery process.",
    details: [
      "Prefer a local partner? Your ambassador provides a confidential briefing on our capabilities and gathers context so the first technical call is already focused.",
      "Prefer to go direct? Email consulting@nurnex.com (or use Email Us to Schedule on this site) — we open the same Discovery Sprint path without an intermediary.",
      "Either way, you get a dedicated liaison through the engagement so communication stays clear between your team and ours.",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <circle cx="16" cy="10" r="5" stroke="#C4782B" strokeWidth="1.5" fill="none" />
        <path d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke="#C4782B" strokeWidth="1.5" fill="none" />
        <circle cx="26" cy="8" r="3" stroke="#C4782B" strokeWidth="1" fill="none" opacity="0.5" />
        <path d="M23 18c2.5-1 5-0.5 7 1" stroke="#C4782B" strokeWidth="1" fill="none" opacity="0.5" />
      </svg>
    ),
  },
  {
    num: "02",
    tag: "DIAGNOSIS",
    title: "Discovery & Deep Dive",
    summary: "A structured first call to map your challenges — followed by a two-week preliminary discovery with temporary access to your environment.",
    details: [
      "The first call is diagnostic: we identify problems, pain points, and the gap between your current state and desired outcomes.",
      "Nurnex requests temporary, scoped access to relevant systems. Our team conducts a methodical assessment — no guesswork.",
      "Within two weeks, we deliver a comprehensive preliminary findings report covering technical debt, quick wins, and strategic opportunities.",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <circle cx="16" cy="16" r="10" stroke="#C4782B" strokeWidth="1.5" fill="none" />
        <circle cx="16" cy="16" r="4" stroke="#C4782B" strokeWidth="1" fill="none" />
        <line x1="16" y1="6" x2="16" y2="2" stroke="#C4782B" strokeWidth="1.5" />
        <line x1="16" y1="30" x2="16" y2="26" stroke="#C4782B" strokeWidth="1.5" />
        <line x1="6" y1="16" x2="2" y2="16" stroke="#C4782B" strokeWidth="1.5" />
        <line x1="30" y1="16" x2="26" y2="16" stroke="#C4782B" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "03",
    tag: "PROPOSAL",
    title: "Full Offer & Architecture",
    summary: "We present a fixed-scope proposal: the complete picture, project timeline, team composition, tooling, and delivery methodology.",
    details: [
      "A formal proposal meeting covers the full solution architecture, milestones, deliverables, and the exact team members who will support your project.",
      "You see the complete picture: project timeline, bi-weekly client check-ins, escalation paths, and how we measure success at each stage.",
      "We outline the tools that govern quality: Confluence for all documentation and findings, Jira for every ticket, comment, and change request — fully transparent.",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <rect x="5" y="3" width="22" height="26" rx="2" stroke="#C4782B" strokeWidth="1.5" fill="none" />
        <line x1="10" y1="10" x2="22" y2="10" stroke="#C4782B" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="14" x2="22" y2="14" stroke="#C4782B" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="18" x2="18" y2="18" stroke="#C4782B" strokeWidth="1" opacity="0.6" />
        <path d="M13 23l2 2 4-4" stroke="#C4782B" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    num: "04",
    tag: "EXECUTION",
    title: "Build, Review, Deliver",
    summary: "A supervised delivery cycle with a dedicated Project Manager, QA Analyst, and bi-weekly client meetings — nothing ships without review gates.",
    details: [
      "Every project is led by a Project Manager who owns the schedule and a QA Analyst who controls every change before it reaches your environment.",
      "Bi-weekly meetings with your team ensure alignment. Your ambassador stays the direct bridge — no chasing emails or waiting for updates.",
      "All work is documented in Confluence in real-time. Every task, comment, and decision lives in Jira — creating a complete audit trail you own.",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <rect x="3" y="6" width="26" height="20" rx="2" stroke="#C4782B" strokeWidth="1.5" fill="none" />
        <line x1="3" y1="12" x2="29" y2="12" stroke="#C4782B" strokeWidth="1" opacity="0.4" />
        <rect x="6" y="15" width="5" height="3" rx="0.5" fill="#C4782B" opacity="0.5" />
        <rect x="13" y="15" width="5" height="3" rx="0.5" fill="#C4782B" opacity="0.3" />
        <rect x="20" y="15" width="5" height="3" rx="0.5" fill="#C4782B" opacity="0.7" />
        <rect x="6" y="20" width="5" height="3" rx="0.5" fill="#C4782B" opacity="0.3" />
        <rect x="13" y="20" width="5" height="3" rx="0.5" fill="#C4782B" opacity="0.6" />
      </svg>
    ),
  },
  {
    num: "05",
    tag: "HANDOVER",
    title: "Complete Ownership Transfer",
    summary: "Everything we built, documented, and tracked becomes yours — Confluence pages, Jira boards, technical assets, and trained team knowledge.",
    details: [
      "On completion, you receive the full Confluence knowledge base: architecture decisions, runbooks, configuration guides, and lessons learned.",
      "Your Jira board with every ticket, status change, comment, and resolution is preserved — a complete project history for audit or future reference.",
      "Knowledge transfer sessions ensure your internal team can operate, modify, and extend everything independently.",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <path d="M8 16l4 4 8-8" stroke="#C4782B" strokeWidth="2" />
        <circle cx="16" cy="16" r="13" stroke="#C4782B" strokeWidth="1.5" fill="none" />
        <path d="M16 3v3M16 26v3M3 16h3M26 16h3" stroke="#C4782B" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    num: "06",
    tag: "CONTINUITY",
    title: "Retainer & Long-Term Support",
    summary: "Choose ongoing managed support or on-call maintenance — your systems stay healthy, your documentation stays current, your team stays enabled.",
    details: [
      "Monthly retainer options give you dedicated support hours for enhancements, monitoring, and proactive health checks.",
      "On-call maintenance is available for organizations that prefer pay-per-incident flexibility — with priority SLA response times.",
      "Whether short-term or long-term, every client retains full access to all documentation, configurations, and project artifacts — forever.",
    ],
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
        <circle cx="16" cy="16" r="12" stroke="#C4782B" strokeWidth="1.5" fill="none" />
        <path d="M16 8v8l5 3" stroke="#C4782B" strokeWidth="1.5" />
        <circle cx="16" cy="16" r="2" fill="#C4782B" />
        <path d="M4 16a12 12 0 0 1 12-12" stroke="#C4782B" strokeWidth="2" opacity="0.3" strokeDasharray="3 3" />
      </svg>
    ),
  },
];

const toolBadges = [
  { name: "Confluence", desc: "Documentation & Knowledge Base" },
  { name: "Jira", desc: "Ticketing & Change Control" },
  { name: "Bi-Weekly Reviews", desc: "Client Alignment Meetings" },
  { name: "Review Gates", desc: "QA-Controlled Deployments" },
];

function PhaseCard({ phase, index, isExpanded, onToggle }: {
  phase: typeof phases[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40, rotateY: index % 2 === 0 ? -5 : 5 }}
      whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="relative group"
      style={{ perspective: "1200px" }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-expanded={isExpanded}
        aria-label={`${phase.title}. ${isExpanded ? "Collapse" : "See details"}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`relative bg-card-bg border rounded-2xl p-6 sm:p-8 cursor-pointer transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-copper focus-visible:ring-offset-2 focus-visible:ring-offset-ink-navy ${
          isExpanded
            ? "border-copper/40 shadow-xl shadow-copper/8"
            : "border-white/5 hover:border-copper/20 hover:shadow-lg hover:shadow-copper/5"
        }`}
      >
        {/* Phase number + connector line */}
        <div className="flex items-start gap-5">
          {/* Left: Number + Icon */}
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500 ${
              isExpanded ? "bg-copper/20 ring-1 ring-copper/40" : "bg-copper/10"
            }`}>
              <div className="w-7 h-7">
                {phase.icon}
              </div>
            </div>
            <span className="text-copper/40 text-[10px] font-mono tracking-wider mt-2">{phase.num}</span>
          </div>

          {/* Right: Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-copper text-[10px] font-bold tracking-[0.3em] uppercase bg-copper/10 px-2.5 py-0.5 rounded-full">
                {phase.tag}
              </span>
            </div>
            <h3 className="text-white font-semibold text-lg sm:text-xl mb-2 leading-tight">
              {phase.title}
            </h3>
            <p className="text-muted text-sm leading-relaxed">
              {phase.summary}
            </p>

            {/* Expanded details */}
            <motion.div
              initial={false}
              animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pt-5 mt-5 border-t border-white/5 space-y-3">
                {phase.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isExpanded ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                    transition={{ duration: 0.3, delay: isExpanded ? i * 0.1 : 0 }}
                    className="flex items-start gap-3"
                  >
                    <span className="text-copper mt-1 flex-shrink-0 text-xs">◆</span>
                    <p className="text-muted/90 text-sm leading-relaxed">{detail}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Toggle hint */}
            <div className="mt-4 flex items-center gap-2">
              <motion.span
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-copper text-xs"
              >
                ▼
              </motion.span>
              <span className="text-copper/60 text-xs tracking-wide">
                {isExpanded ? "Collapse" : "See details"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function ProcessSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section id="process" className="relative py-20 sm:py-28 bg-ink-navy overflow-hidden">
      <CurrentFlowBg />
      {/* Background: subtle circuit-board pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          linear-gradient(90deg, rgba(196,120,43,0.03) 1px, transparent 1px),
          linear-gradient(0deg, rgba(196,120,43,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />
      {/* Radial glow at center */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_50%_30%,rgba(196,120,43,0.04),transparent_60%)]" />

      <div ref={sectionRef} className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">
            Our Methodology
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            How We Work
          </h2>
          <p className="text-muted text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Every engagement follows a proven six-phase methodology — from first introduction
            through long-term support. You can start via a regional Ambassador or email us
            directly; both routes enter the same process. Click any phase for details.
          </p>
        </motion.div>

        {/* Vertical timeline connector */}
        <div className="relative mt-14 sm:mt-20">
          {/* Timeline line */}
          <div className="absolute left-[2.15rem] sm:left-[2.4rem] top-0 bottom-0 w-px">
            <motion.div
              className="w-full h-full bg-gradient-to-b from-copper/30 via-copper/15 to-copper/5"
              initial={{ scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {/* Phase cards */}
          <div className="space-y-5">
            {phases.map((phase, i) => (
              <PhaseCard
                key={phase.num}
                phase={phase}
                index={i}
                isExpanded={expandedIndex === i}
                onToggle={() => setExpandedIndex(expandedIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>

        {/* Tooling badges */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 sm:mt-20"
        >
          <p className="text-center text-white/40 text-xs tracking-[0.3em] uppercase mb-6">
            Governance & Transparency Stack
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {toolBadges.map((tool, i) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-card-bg/80 backdrop-blur-sm border border-white/5 rounded-xl p-4 text-center hover:border-copper/20 transition-all duration-300 group"
              >
                <p className="text-white font-semibold text-sm group-hover:text-copper transition-colors">
                  {tool.name}
                </p>
                <p className="text-muted text-[11px] mt-1 leading-snug">
                  {tool.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-12 text-center"
        >
          <p className="text-muted text-sm mb-5 max-w-lg mx-auto">
            Every deliverable, every decision, every line of documentation — yours to keep, regardless of engagement length.
          </p>
          <a
            href="#contact"
            className="inline-block bg-copper hover:bg-copper/90 text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-all hover:shadow-lg hover:shadow-copper/20 text-sm cta-float"
          >
            Start With a Discovery Call
          </a>
        </motion.div>
      </div>
    </section>
  );
}
