"use client";

import Link from "next/link";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { useRef } from "react";

function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 40 }}
      animate={
        reduce ? {} : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }
      }
      transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const DIFFERENTIATORS = [
  {
    num: "01",
    title: "Verification-first identity",
    desc: "Every candidate is AI-scored, video-verified, and portfolio-checked before a recruiter ever sees them. No fakes, no fluff, no ghosting.",
    accent: "text-primary",
  },
  {
    num: "02",
    title: "Video proof over paper promises",
    desc: "Three mandatory videos — intro, project walkthrough, expectations — let recruiters see the human behind the resume in under 5 minutes.",
    accent: "text-accent",
  },
  {
    num: "03",
    title: "AI resume scoring & skill mapping",
    desc: "Our AI reads every resume and scores it 0–100 with skill-by-skill breakdowns. Recruiters filter on signal, not keywords.",
    accent: "text-primary",
  },
  {
    num: "04",
    title: "Direct recruiter invitations",
    desc: "No applications. No black-hole inboxes. Recruiters browse verified talent and invite directly. Interviews happen in days, not months.",
    accent: "text-accent",
  },
  {
    num: "05",
    title: "Portfolio & GitHub integration",
    desc: "Candidates link real work — repos, live projects, case studies. Recruiters see proof of capability, not just claims.",
    accent: "text-primary",
  },
  {
    num: "06",
    title: "Premium, not mass-market",
    desc: "We are not for everyone. The bar is high on purpose. That is what makes being on Nurnex mean something — for both sides.",
    accent: "text-accent",
  },
];

const STATS = [
  { value: "100%", label: "Verified talent only" },
  { value: "3", label: "Mandatory video proofs" },
  { value: "AI", label: "Resume & skill scoring" },
  { value: "$0", label: "Cost to candidates" },
];

export default function AboutPage() {
  const reduce = useReducedMotion();

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* ─── Nav ─── */}
      <motion.header
        initial={reduce ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl bg-background/40 border-b border-white/[0.06]"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-primary to-accent flex items-center justify-center shadow-lg shadow-primary/25 ring-1 ring-white/10">
              <span className="text-white font-black text-sm">N</span>
            </div>
            <span className="text-foreground font-black text-lg tracking-tight uppercase">
              Nurnex
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-[13px] text-muted uppercase tracking-wider font-semibold">
            <Link
              href="/"
              className="hover:text-foreground transition-colors duration-300"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-foreground"
            >
              About
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-[13px] text-muted hover:text-foreground transition-colors px-4 py-2 uppercase tracking-wider font-semibold"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="text-[13px] bg-white text-background px-5 py-2.5 rounded-full font-bold uppercase tracking-wider transition-all hover:shadow-lg hover:shadow-white/25 hover:scale-[1.03]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </motion.header>

      {/* ─── Hero ─── */}
      <section className="relative pt-40 pb-24 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[10%] left-[10%] w-[60vw] max-w-[600px] aspect-square rounded-full bg-primary/20 blur-[160px]" />
          <div className="absolute bottom-[5%] right-[8%] w-[50vw] max-w-[500px] aspect-square rounded-full bg-accent/15 blur-[140px]" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-foreground/90">
                About Nurnex
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h1 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black leading-[0.88] tracking-tighter mb-8">
              We are building the{" "}
              <span className="bg-[linear-gradient(90deg,#3b82f6,#93c5fd,#e8d48b,#d4af37)] bg-clip-text text-transparent bg-[length:200%_auto]">
                hiring standard
              </span>{" "}
              the world deserves.
            </h1>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted/90 max-w-2xl mx-auto font-light leading-relaxed">
              Nurnex is a verified professional graph — AI scoring, video proof,
              portfolio-backed identity, and direct recruiter access. No noise.
              No spam. No application treadmill.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── Stats ─── */}
      <section className="py-16 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s, i) => (
            <FadeIn key={s.label} delay={i * 0.08} className="text-center">
              <p className="text-3xl md:text-4xl font-black">{s.value}</p>
              <p className="text-xs text-muted mt-2 uppercase tracking-wider">
                {s.label}
              </p>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* ─── Story ─── */}
      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <FadeIn>
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
                The origin
              </p>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight leading-[0.92] mb-6">
                Born from frustration.
                <span className="text-muted block mt-1">
                  Built with precision.
                </span>
              </h2>
              <div className="space-y-4 text-muted leading-relaxed text-[15px]">
                <p>
                  Hiring is broken. Candidates send hundreds of applications into
                  black holes. Recruiters drown in unqualified resumes. Both sides
                  waste months.
                </p>
                <p>
                  Nurnex was founded by{" "}
                  <span className="text-foreground font-semibold">
                    Movlan Aliyev
                  </span>{" "}
                  — developer, designer, and founder — to fix this from first
                  principles: what if every candidate was verified{" "}
                  <em>before</em> a recruiter ever saw them?
                </p>
                <p>
                  That single idea became a platform: AI-scored resumes, mandatory
                  video introductions, portfolio verification, and direct recruiter
                  invitations. No applications. No guesswork. Just proof meeting
                  opportunity.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl shadow-black/30">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-black text-xl shadow-lg">
                    MA
                  </div>
                  <div>
                    <p className="font-bold text-lg">Movlan Aliyev</p>
                    <p className="text-sm text-muted">
                      Founder &amp; Lead Developer
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-3 bg-background/50 rounded-xl px-4 py-3 border border-white/5">
                    <span className="text-primary text-xs">◆</span>
                    <span className="text-muted">Role</span>
                    <span className="ml-auto text-foreground font-medium">
                      Developer &amp; Founder
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-background/50 rounded-xl px-4 py-3 border border-white/5">
                    <span className="text-accent text-xs">◆</span>
                    <span className="text-muted">Platform</span>
                    <span className="ml-auto text-foreground font-medium">
                      Nurnex Agency
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-background/50 rounded-xl px-4 py-3 border border-white/5">
                    <span className="text-primary text-xs">◆</span>
                    <span className="text-muted">Stack</span>
                    <span className="ml-auto text-foreground font-medium">
                      Next.js &middot; AI &middot; Supabase
                    </span>
                  </div>
                  <div className="flex items-center gap-3 bg-background/50 rounded-xl px-4 py-3 border border-white/5">
                    <span className="text-accent text-xs">◆</span>
                    <span className="text-muted">Backed by</span>
                    <span className="ml-auto text-foreground font-medium">
                      DOM Tech &amp; Chess Academy
                    </span>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Backed by ─── */}
      <section className="py-20 border-t border-white/5">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-xs text-muted uppercase tracking-[0.3em] mb-4">
              Supported by
            </p>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4">
              DOM Tech &amp; Chess Academy
            </h2>
            <p className="text-muted max-w-2xl mx-auto leading-relaxed mb-8">
              Nurnex is proudly backed by{" "}
              <a
                href="https://domtechacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                DOM Tech Academy
              </a>{" "}
              and{" "}
              <a
                href="https://domchessacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                DOM Chess Academy
              </a>{" "}
              — organizations dedicated to education, strategic thinking, and
              building the next generation of talent. The same values drive
              Nurnex: precision, discipline, and high standards.
            </p>
            <div className="flex items-center justify-center gap-8">
              <a
                href="https://domtechacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/15 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:border-primary/40 transition-all"
              >
                DOM Tech Academy →
              </a>
              <a
                href="https://domchessacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-white/15 rounded-xl text-sm font-medium text-muted hover:text-foreground hover:border-accent/40 transition-all"
              >
                DOM Chess Academy →
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Differentiators ─── */}
      <section className="py-28 border-t border-white/5">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-6">
              Why Nurnex wins
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[0.9] max-w-3xl mb-6">
              What makes us the{" "}
              <span className="text-primary">number one</span> choice.
            </h2>
            <p className="text-muted max-w-2xl leading-relaxed mb-16">
              Every feature exists because the old way failed. Here is exactly
              why recruiters and candidates choose Nurnex over everything else.
            </p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-px bg-white/5 rounded-2xl overflow-hidden">
            {DIFFERENTIATORS.map((d, i) => (
              <FadeIn key={d.num} delay={i * 0.08}>
                <div className="group bg-background p-8 md:p-10 h-full hover:bg-card/50 transition-all duration-500">
                  <span
                    className={`text-5xl font-black text-white/[0.03] group-hover:${d.accent.replace("text-", "text-")}/10 transition-colors duration-500 block mb-3`}
                  >
                    {d.num}
                  </span>
                  <h3
                    className={`text-lg font-bold mb-3 group-hover:${d.accent.replace("text-", "text-")} transition-colors duration-300`}
                  >
                    {d.title}
                  </h3>
                  <p className="text-muted leading-relaxed text-sm">
                    {d.desc}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why people choose us ─── */}
      <section className="py-28 border-t border-white/5 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-primary/5 blur-[150px] rounded-full" />
        </div>

        <div className="max-w-5xl mx-auto px-6 relative">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
                The Nurnex promise
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[0.9] mb-6">
                Built for people who are{" "}
                <span className="text-accent">serious</span>.
              </h2>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-6">
            <FadeIn delay={0}>
              <div className="bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-5">
                  <span className="text-primary font-bold text-lg">C</span>
                </div>
                <h3 className="font-bold text-lg mb-3">For Candidates</h3>
                <ul className="space-y-2.5 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Free to join — forever
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    AI feedback on your resume
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Video profile that shows the real you
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Recruiters come to you with invites
                  </li>
                  <li className="flex gap-2">
                    <span className="text-primary mt-0.5">✓</span>
                    Your skills scored and displayed
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center mb-5">
                  <span className="text-accent font-bold text-lg">R</span>
                </div>
                <h3 className="font-bold text-lg mb-3">For Recruiters</h3>
                <ul className="space-y-2.5 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Only verified, pre-screened talent
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Watch video intros before contact
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    AI skill scores save screening time
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Direct invite — no middleman
                  </li>
                  <li className="flex gap-2">
                    <span className="text-accent mt-0.5">✓</span>
                    Agency board with full team management
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-card/60 backdrop-blur-xl border border-white/10 rounded-2xl p-8 h-full">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 border border-white/10 flex items-center justify-center mb-5">
                  <span className="text-foreground font-bold text-lg">N</span>
                </div>
                <h3 className="font-bold text-lg mb-3">The Nurnex edge</h3>
                <ul className="space-y-2.5 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    Premium product, not a job board
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    High bar = high trust on both sides
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    Portfolio + GitHub + video + AI in one
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    Backed by education-first organizations
                  </li>
                  <li className="flex gap-2">
                    <span className="text-foreground mt-0.5">✓</span>
                    Built to become the global standard
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── Mission ─── */}
      <section className="py-28 border-t border-white/5 relative">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-[0.88] mb-8">
              Our mission is simple.
              <span className="block text-muted mt-2">
                Make hiring honest.
              </span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-12 font-light leading-relaxed">
              We believe the best candidate should get the job — not the one who
              games the system. Nurnex exists to make that real.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/signup?role=candidate"
                className="px-12 py-5 bg-white text-background rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all hover:shadow-2xl hover:shadow-white/20"
              >
                Join as Candidate
              </Link>
              <Link
                href="/signup?role=recruiter"
                className="px-12 py-5 border border-white/20 hover:border-accent/50 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/5 hover:scale-105 transition-all"
              >
                Join as Recruiter
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-black text-xs">N</span>
            </div>
            <span className="font-black uppercase tracking-tight">Nurnex</span>
          </div>
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Nurnex. Designed by Movlan Aliyev.
            All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-muted uppercase tracking-wider">
            <Link
              href="/"
              className="hover:text-foreground transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <a
              href="mailto:MovlanAliyev@Nurnex.com"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
