"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

/* ================================================================
   Animation helpers
   ================================================================ */
const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(6px)" },
  visible: (i: number) => ({
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  }),
};

/* ================================================================
   Data
   ================================================================ */
const stats = [
  { value: "60\u2013120", label: "Total Hours" },
  { value: "10\u201315", label: "Students Per Cohort" },
  { value: "100%", label: "Live & Online" },
  { value: "$0", label: "Software Cost" },
];

const syllabus3 = [
  { weeks: "1\u20132", title: "Excel Power User", desc: "Formulas, pivot tables, Power Query, charts, data cleaning", icon: "table" },
  { weeks: "3\u20136", title: "SQL Mastery", desc: "SELECT, JOINs, window functions, database design, CTEs", icon: "database" },
  { weeks: "7\u201310", title: "Power BI & DAX", desc: "Data modelling, dashboards, advanced DAX, row-level security", icon: "chart" },
  { weeks: "11\u201312", title: "Storytelling & Career", desc: "Data storytelling, presentations, resume, LinkedIn, capstone", icon: "star" },
];

const syllabus6extra = [
  { weeks: "13\u201316", title: "Python & Automation", desc: "Pandas, matplotlib, APIs, automated reporting pipelines", icon: "code" },
  { weeks: "17\u201318", title: "Microsoft Fabric", desc: "Lakehouses, dataflows, Spark notebooks, Direct Lake", icon: "cloud" },
  { weeks: "19\u201320", title: "Databricks", desc: "PySpark, Delta Lake, medallion architecture, SQL dashboards", icon: "layers" },
  { weeks: "21\u201324", title: "Power Platform & Career", desc: "Power Apps, Power Automate, data engineering, mock interviews, graduation", icon: "rocket" },
];

const comparison = [
  { feature: "Excel + Power Query", three: true, six: true },
  { feature: "SQL (Fundamentals + Advanced)", three: true, six: true },
  { feature: "Power BI + DAX", three: true, six: true },
  { feature: "Data Modelling & Storytelling", three: true, six: true },
  { feature: "Python + Automation", three: false, six: true },
  { feature: "Microsoft Fabric", three: false, six: true },
  { feature: "Databricks (Spark + Delta Lake)", three: false, six: true },
  { feature: "Power Platform", three: false, six: true },
  { feature: "Career Support (LinkedIn, Interviews)", three: "$750 add-on", six: true },
  { feature: "Post-Grad Weekly Coaching", three: "$750 add-on", six: true },
  { feature: "Capstone Projects", three: "1", six: "2" },
  { feature: "Certificate", three: "Data Analyst", six: "BI & Data Engineer" },
  { feature: "Minimum Starting Salary", three: "$50K\u2013$70K", six: "$70K\u2013$95K" },
];

const included = [
  "Live classes 3x per week with an experienced instructor",
  "All class recordings available within 24 hours",
  "Slides, datasets, and cheat sheets for every week",
  "Weekly homework with personalised feedback",
  "Online quizzes and practical exams",
  "1-on-1 office hours by appointment (1 hr/week)",
  "Student community (WhatsApp / Discord)",
  "Nurnex certificate upon graduation",
  "Portfolio-ready capstone project(s)",
];

const faq = [
  { q: "Do I need any experience?", a: "No. We start from the basics. If you can use a computer and are willing to learn, you are ready." },
  { q: "What software do I need?", a: "Everything is free. Power BI Desktop, Python, SQL tools, Databricks Community Edition \u2014 all free to download. We show you how in the first class." },
  { q: "Do I need a Windows computer?", a: "Power BI Desktop requires Windows. If you have a Mac, we will help you set up a free Windows virtual machine." },
  { q: "What if I miss a class?", a: "Every class is recorded and uploaded within 24 hours. You can watch it anytime and ask questions in the next session." },
  { q: "Can I upgrade from 3-month to 6-month?", a: "Yes. Pay the $2,500 difference and join the next cohort for Weeks 13\u201324. Nothing is wasted." },
  { q: "How do I pay?", a: "Bank transfer (Wise, Zelle, or direct deposit). Monthly payment plans are available." },
  { q: "Will you help me find a job?", a: "Yes. Career support includes LinkedIn optimisation, resume writing, mock interviews, and recruiter introductions. Included in the 6-month programme or available as a $750 add-on for the 3-month programme." },
  { q: "How many students per class?", a: "10\u201315 maximum. Small cohorts mean more attention, more feedback, and a better learning experience." },
];

/* ================================================================
   Icon components
   ================================================================ */
function Icon({ name }: { name: string }) {
  const icons: Record<string, React.ReactNode> = {
    table: <path d="M3 3h18v18H3zM3 9h18M3 15h18M9 3v18M15 3v18" />,
    database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    chart: <><path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" /></>,
    star: <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />,
    code: <><path d="M16 18l6-6-6-6" /><path d="M8 6l-6 6 6 6" /></>,
    cloud: <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" />,
    layers: <><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></>,
    rocket: <><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" /></>,
    check: <path d="M20 6L9 17l-5-5" />,
    x: <path d="M18 6L6 18M6 6l12 12" />,
  };
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
      {icons[name]}
    </svg>
  );
}

/* ================================================================
   Page
   ================================================================ */
export default function BootcampPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<"3" | "6">("6");

  /* Countdown to enrollment deadline: Dec 15, 2026 at midnight EST */
  const enrollDeadline = new Date("2026-12-15T00:00:00-05:00").getTime();
  const [countdown, setCountdown] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, enrollDeadline - Date.now());
      setCountdown({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000) / 60000),
        seconds: Math.floor((diff % 60000) / 1000),
      });
    };
    const first = setTimeout(tick, 0);
    const id = setInterval(tick, 1000);
    return () => { clearTimeout(first); clearInterval(id); };
  }, [enrollDeadline]);

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen bg-background">

        {/* Hero */}
        <section className="relative pt-36 sm:pt-44 pb-20 sm:pb-28 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(196,120,43,0.1)_0%,_transparent_50%)]" />
          <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full bg-copper/5 blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-blue-500/5 blur-[100px]" />

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold mb-6 bg-copper/10 border border-copper/20 text-copper">
              <span className="w-2 h-2 rounded-full bg-copper animate-pulse" />
              Coming Soon &#8212; Classes Start January 1, 2027
            </motion.div>

            <motion.h1 variants={fadeUp} initial="hidden" animate="visible" custom={1}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
              Become a <span className="text-copper">Data Analyst</span> in 3 or 6 Months
            </motion.h1>

            <motion.p variants={fadeUp} initial="hidden" animate="visible" custom={2}
              className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Live online classes. Small cohorts. Real projects. No experience needed.
              Graduate with the skills, portfolio, and certificate companies hire for.
            </motion.p>

            {/* Countdown */}
            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3}
              className="mb-10">
              <p className="text-muted text-sm mb-4 tracking-wide uppercase">Enrollment closes December 15, 2026</p>
              <div className="flex items-center justify-center gap-3 sm:gap-5">
                {(countdown
                  ? [
                      { value: countdown.days, label: "Days" },
                      { value: countdown.hours, label: "Hours" },
                      { value: countdown.minutes, label: "Minutes" },
                      { value: countdown.seconds, label: "Seconds" },
                    ]
                  : [
                      { value: null, label: "Days" },
                      { value: null, label: "Hours" },
                      { value: null, label: "Minutes" },
                      { value: null, label: "Seconds" },
                    ]
                ).map((unit) => (
                  <div key={unit.label} className="flex flex-col items-center">
                    <div className="bg-card border border-border rounded-xl w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                      <span className="font-display text-2xl sm:text-3xl font-bold text-copper tabular-nums">
                        {unit.value !== null ? String(unit.value).padStart(2, "0") : "--"}
                      </span>
                    </div>
                    <span className="text-muted text-[10px] sm:text-xs mt-1.5 uppercase tracking-wider">{unit.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4}
              className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact"
                className="bg-copper hover:bg-copper/90 text-white px-8 py-4 rounded-xl text-base font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-copper/30 hover:scale-105">
                Reserve Your Spot
              </Link>
              <a href="#syllabus"
                className="border border-border text-muted hover:text-white hover:border-copper/40 px-8 py-4 rounded-xl text-base font-medium tracking-wide transition-all">
                See What You Will Learn
              </a>
            </motion.div>
          </div>
        </section>

        {/* ?? Stats Bar ??????????????????????????????????? */}
        <section className="relative py-8 border-y border-border bg-card/50">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((s, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="text-center">
                  <div className="text-2xl sm:text-3xl font-display font-bold text-copper">{s.value}</div>
                  <div className="text-xs sm:text-sm text-muted mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ?? Who Is This For ????????????????????????????? */}
        <section className="py-20 sm:py-28">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Who Is This Bootcamp For?</h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">No matter where you are starting from, we meet you there.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Career Changers", desc: "You work in a different field and want to switch to data. We teach you everything from scratch.", emoji: "&#128640;" },
                { title: "Recent Graduates", desc: "You have a degree but no practical data skills. We give you the hands-on experience employers want.", emoji: "&#127891;" },
                { title: "Working Professionals", desc: "You already use Excel at work and want to level up to Power BI, SQL, and beyond.", emoji: "&#128188;" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                  className="bg-card border border-border rounded-2xl p-6 hover:border-copper/30 transition-all hover:shadow-lg hover:shadow-copper/5">
                  <div className="text-3xl mb-4" dangerouslySetInnerHTML={{ __html: item.emoji }} />
                  <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ?? What You Will Learn (Syllabus Overview) ????? */}
        <section id="syllabus" className="py-20 sm:py-28 bg-card/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">What You Will Learn</h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">A structured, week-by-week curriculum designed to take you from zero to job-ready.</p>
            </motion.div>

            {/* 3-Month Core */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-copper/10 text-copper px-4 py-1.5 rounded-full text-sm font-semibold">3-Month Core</div>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {syllabus3.map((item, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:border-copper/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-copper/10 text-copper flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} />
                    </div>
                    <div>
                      <div className="text-xs text-copper font-semibold mb-1">Weeks {item.weeks}</div>
                      <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 6-Month Extension */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-purple-500/10 text-purple-400 px-4 py-1.5 rounded-full text-sm font-semibold">6-Month Extension</div>
                <div className="flex-1 h-px bg-border" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {syllabus6extra.map((item, i) => (
                  <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i}
                    className="bg-card border border-border rounded-xl p-5 flex gap-4 hover:border-purple-500/30 transition-all">
                    <div className="w-10 h-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} />
                    </div>
                    <div>
                      <div className="text-xs text-purple-400 font-semibold mb-1">Weeks {item.weeks}</div>
                      <h3 className="text-white font-semibold text-sm mb-1">{item.title}</h3>
                      <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="text-center mt-10">
              <p className="text-muted text-sm">Full week-by-week breakdown available upon request. <Link href="/#contact" className="text-copper hover:text-white transition-colors">Contact us</Link> for details.</p>
            </motion.div>
          </div>
        </section>

        {/* ?? Schedule ???????????????????????????????????? */}
        <section className="py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Class Schedule</h2>
              <p className="text-muted text-lg">5 hours per week. Three sessions. Everything live.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {[
                { label: "Group A", times: [{ day: "Monday", time: "5:00 \u2013 7:00 PM" }, { day: "Wednesday", time: "5:00 \u2013 7:00 PM" }, { day: "Saturday", time: "10:00 \u2013 11:00 AM" }] },
                { label: "Group B", times: [{ day: "Monday", time: "7:45 \u2013 9:45 PM" }, { day: "Wednesday", time: "7:45 \u2013 9:45 PM" }, { day: "Saturday", time: "11:45 AM \u2013 12:45 PM" }] },
              ].map((group, gi) => (
                <motion.div key={gi} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={gi}
                  className="bg-card border border-border rounded-2xl p-6">
                  <div className="text-copper font-semibold text-sm mb-4">{group.label}</div>
                  <div className="space-y-3">
                    {group.times.map((t, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium">{t.day}</span>
                        <span className="text-muted text-sm">{t.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-muted text-xs">45-minute break between groups. Both groups follow the same syllabus.</p>
          </div>
        </section>

        {/* ?? Comparison + Pricing ???????????????????????? */}
        <section id="pricing" className="py-20 sm:py-28 bg-card/30">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Choose Your Programme</h2>
              <p className="text-muted text-lg max-w-2xl mx-auto">Both programmes make you job-ready. The difference is how far you go.</p>
            </motion.div>

            {/* Plan cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
              {/* 3-Month */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
                onClick={() => setSelectedPlan("3")}
                className={`relative bg-card border-2 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all ${selectedPlan === "3" ? "border-copper shadow-lg shadow-copper/10" : "border-border hover:border-copper/30"}`}>
                <div className="text-copper font-semibold text-sm mb-1">3-Month Programme</div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">Data Analyst Fast Track</h3>
                <p className="text-muted text-sm mb-6">Excel, SQL, Power BI &#8212; from zero to job-ready in 12 weeks</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-4xl font-bold text-white">$2,500</span>
                  <span className="text-muted text-sm">or $900/mo &#215; 3</span>
                </div>
                <div className="text-copper text-xs font-medium mb-6">Early bird: $1,800 (first 2 cohorts)</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> 60 hours of live instruction</div>
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> 1 capstone project</div>
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> Nurnex Data Analyst Certificate</div>
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> Min. starting salary: $50K\u2013$70K</div>
                </div>
              </motion.div>

              {/* 6-Month */}
              <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={1}
                onClick={() => setSelectedPlan("6")}
                className={`relative bg-card border-2 rounded-2xl p-6 sm:p-8 cursor-pointer transition-all ${selectedPlan === "6" ? "border-copper shadow-lg shadow-copper/10" : "border-border hover:border-copper/30"}`}>
                <div className="absolute -top-3 right-6 bg-copper text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
                <div className="text-copper font-semibold text-sm mb-1">6-Month Programme</div>
                <h3 className="font-display text-2xl font-bold text-white mb-1">Full BI & Data Engineer</h3>
                <p className="text-muted text-sm mb-6">Everything in 3-month + Python, Fabric, Databricks, career support</p>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="font-display text-4xl font-bold text-white">$5,000</span>
                  <span className="text-muted text-sm">or $900/mo &#215; 6</span>
                </div>
                <div className="text-copper text-xs font-medium mb-6">Early bird: $3,600 (first 2 cohorts)</div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> 120 hours of live instruction</div>
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> 2 capstone projects</div>
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> Career support included</div>
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> Nurnex BI & Data Engineer Certificate</div>
                  <div className="flex items-center gap-2 text-muted"><span className="text-green-400"><Icon name="check" /></span> Min. starting salary: $70K\u2013$95K</div>
                </div>
              </motion.div>
            </div>

            {/* Comparison table */}
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="bg-card border border-border rounded-2xl overflow-hidden">
              <div className="grid grid-cols-[1fr_100px_100px] sm:grid-cols-[1fr_140px_140px] text-sm">
                {/* Header */}
                <div className="p-4 font-semibold text-muted bg-ink-navy border-b border-border">Feature</div>
                <div className="p-4 font-semibold text-copper text-center bg-ink-navy border-b border-border">3-Month</div>
                <div className="p-4 font-semibold text-copper text-center bg-ink-navy border-b border-border">6-Month</div>
                {/* Rows */}
                {comparison.map((row, i) => (
                  <div key={i} className="contents">
                    <div className={`p-3 sm:p-4 text-white text-xs sm:text-sm border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-ink-navy/30"}`}>{row.feature}</div>
                    <div className={`p-3 sm:p-4 text-center border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-ink-navy/30"}`}>
                      {row.three === true ? <span className="text-green-400 font-bold">&#10003;</span>
                       : row.three === false ? <span className="text-muted">&#8212;</span>
                       : <span className="text-muted text-xs">{row.three}</span>}
                    </div>
                    <div className={`p-3 sm:p-4 text-center border-b border-border/50 ${i % 2 === 0 ? "bg-card" : "bg-ink-navy/30"}`}>
                      {row.six === true ? <span className="text-green-400 font-bold">&#10003;</span>
                       : row.six === false ? <span className="text-muted">&#8212;</span>
                       : <span className="text-muted text-xs">{row.six}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}
              className="bg-copper/5 border border-copper/20 rounded-xl p-5 mt-8 text-center">
              <p className="text-copper text-sm font-medium">
                <strong>Can&#39;t decide?</strong> Start with 3 months. Upgrade to 6 months anytime and pay only the $2,500 difference.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ?? What's Included ????????????????????????????? */}
        <section className="py-20 sm:py-28">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Everything You Get</h2>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {included.map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.5}
                  className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-copper/20 transition-all">
                  <div className="w-5 h-5 rounded-full bg-copper/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg viewBox="0 0 24 24" fill="none" stroke="#C4782B" strokeWidth="3" className="w-3 h-3"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <span className="text-white text-sm">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ?? FAQ ?????????????????????????????????????????? */}
        <section className="py-20 sm:py-28 bg-card/30">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0} className="text-center mb-14">
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Frequently Asked Questions</h2>
            </motion.div>
            <div className="space-y-3">
              {faq.map((item, i) => (
                <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={i * 0.3}
                  className="bg-card border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-left">
                    <span className="text-white font-medium text-sm pr-4">{item.q}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      className={`w-5 h-5 text-muted flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`}>
                      <path d="M6 9l6 6 6-6" />
                    </svg>
                  </button>
                  {openFaq === i && (
                    <div className="px-5 pb-5">
                      <p className="text-muted text-sm leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ?? CTA ?????????????????????????????????????????? */}
        <section className="py-20 sm:py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_rgba(196,120,43,0.1)_0%,_transparent_50%)]" />
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div variants={fadeUp} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0}>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-4">Ready to Start Your Data Career?</h2>
              <p className="text-muted text-lg mb-3 max-w-xl mx-auto">
                Limited to 10&#8211;15 students per group. Reserve your seat before enrollment closes.
              </p>
              <p className="text-copper font-semibold text-base mb-10">
                Classes start January 1, 2027 &#8212; Enrollment closes December 15, 2026
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                <Link href="/#contact"
                  className="bg-copper hover:bg-copper/90 text-white px-10 py-4 rounded-xl text-base font-semibold tracking-wide transition-all hover:shadow-lg hover:shadow-copper/30 hover:scale-105">
                  Reserve Your Spot
                </Link>
                <a href="#syllabus"
                  className="border border-border text-muted hover:text-white hover:border-copper/40 px-10 py-4 rounded-xl text-base font-medium tracking-wide transition-all">
                  View Syllabus
                </a>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-muted">
                <span>&#128231; bootcamp@nurnex.com</span>
                <span>&#128222; +1 (339) 206-8081</span>
              </div>
            </motion.div>
          </div>
        </section>

      </main>
      <SiteFooter />
    </>
  );
}
