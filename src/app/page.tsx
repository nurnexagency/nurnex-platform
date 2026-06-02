"use client";

import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useInView,
  useReducedMotion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { HeroMovingBackdrop } from "@/components/HeroMovingBackdrop";

function AnimatedCounter({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

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
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 50 }}
      animate={
        reduce ? {} : isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }
      }
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function SplitLine({
  text,
  className,
  delayBase = 0,
}: {
  text: string;
  className?: string;
  delayBase?: number;
}) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block mr-[0.25em] last:mr-0"
          initial={{ opacity: 0, y: 48, rotateX: -40 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{
            duration: 0.85,
            delay: delayBase + i * 0.07,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{ transformOrigin: "50% 50%" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const ROTATING_LINES = [
  "Proof before visibility.",
  "Invite-only.",
  "AI-scored readiness.",
];

export default function LandingPage() {
  const [hoveredEye, setHoveredEye] = useState<"left" | "right" | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const reduceMotion = useReducedMotion();

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const parallaxX = useSpring(mx, { stiffness: 40, damping: 22 });
  const parallaxY = useSpring(my, { stiffness: 40, damping: 22 });

  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setLineIdx((j) => (j + 1) % ROTATING_LINES.length);
    }, 3200);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  function onHeroMouseMove(e: React.MouseEvent<HTMLElement>) {
    if (reduceMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px * 56);
    my.set(py * 36);
  }

  function onHeroMouseLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <motion.header
        initial={reduceMotion ? false : { opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: reduceMotion ? 0 : 0.9 }}
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
            <a
              href="#vision"
              className="hover:text-foreground transition-colors duration-300"
            >
              Vision
            </a>
            <a
              href="#candidates"
              className="hover:text-foreground transition-colors duration-300"
            >
              Candidates
            </a>
            <a
              href="#recruiters"
              className="hover:text-foreground transition-colors duration-300"
            >
              Recruiters
            </a>
            <Link
              href="/about"
              className="hover:text-foreground transition-colors duration-300"
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

      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        onMouseMove={onHeroMouseMove}
        onMouseLeave={onHeroMouseLeave}
      >
        <motion.div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{ x: parallaxX, y: parallaxY }}
        >
          <div className="absolute -top-[30%] left-[15%] w-[90vw] max-w-[920px] aspect-square rounded-full bg-primary/25 blur-[140px] hero-aurora-a" />
          <div className="absolute -bottom-[35%] right-[5%] w-[85vw] max-w-[780px] aspect-square rounded-full bg-accent/15 blur-[130px] hero-aurora-b" />
          <div className="absolute top-[35%] right-[25%] w-[40vw] max-w-[420px] aspect-square rounded-full bg-blue-400/10 blur-[100px] hero-aurora-a" />
        </motion.div>

        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
          <div className="hero-mesh" aria-hidden />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_70%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.11),transparent_58%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(212,175,55,0.06),transparent_52%)]" />
          <HeroMovingBackdrop />
        </div>

        <div className="absolute inset-0 z-[2] pointer-events-none overflow-hidden">
          <div className="absolute inset-0 -translate-y-[1%] scale-[1.07]">
            <motion.video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-[1.4s] brightness-[0.9] contrast-[1.07] saturate-[1.12]"
              style={{ opacity: videoReady ? 0.66 : 0 }}
              onLoadedData={() => setVideoReady(true)}
              onError={() => setVideoReady(false)}
            >
              <source src="/videoplayback.mp4" type="video/mp4" />
            </motion.video>
          </div>
          {/* Grade: align footage with primary / gold trust signals */}
          <div
            className="absolute inset-0 mix-blend-soft-light opacity-[0.38]"
            style={{
              background:
                "linear-gradient(118deg, rgba(59,130,246,0.35) 0%, transparent 45%, rgba(212,175,55,0.28) 100%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/40 to-background" />
          <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background/95 via-background/35 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_38%,transparent_0%,transparent_28%,rgba(11,11,11,0.45)_65%,rgba(11,11,11,0.94)_100%)]" />
        </div>

        <div className="hero-grain z-[3]" aria-hidden />

        <div className="hero-corners" aria-hidden>
          <span className="tl" />
          <span className="tr" />
          <span className="bl" />
          <span className="br" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-[4] flex items-center justify-center opacity-[0.22]">
          <div
            className="absolute w-[min(96vw,920px)] aspect-square rounded-full border border-white/[0.07]"
            style={{
              animation: reduceMotion ? undefined : "orbit-spin 52s linear infinite",
            }}
          />
          <div
            className="absolute w-[min(78vw,740px)] aspect-square rounded-full border border-dashed border-white/[0.06]"
            style={{
              animation: reduceMotion ? undefined : "orbit-spin 72s linear infinite reverse",
            }}
          />
        </div>

        <div className="pointer-events-none absolute z-[5] hidden xl:block left-[6%] top-[28%] w-[280px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
            className="rounded-2xl border border-white/10 bg-card/45 backdrop-blur-xl p-4 shadow-2xl shadow-black/40"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted mb-3">
              Live signal
            </p>
            <div className="flex items-center justify-between gap-3 mb-3">
              <span className="text-xs font-semibold text-foreground">
                Verification queue
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/15 text-primary font-bold">
                STRICT
              </span>
            </div>
            <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                initial={{ width: "12%" }}
                animate={{ width: "68%" }}
                transition={{
                  duration: reduceMotion ? 0 : 2.4,
                  delay: reduceMotion ? 0 : 1.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
            <p className="mt-3 text-[11px] text-muted leading-snug">
              Profiles unlock recruiter visibility only after resume score,
              videos, and portfolio checks clear.
            </p>
          </motion.div>
        </div>

        <div className="pointer-events-none absolute z-[5] hidden xl:block right-[6%] bottom-[26%] w-[280px]">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.25 }}
            className="rounded-2xl border border-white/10 bg-card/45 backdrop-blur-xl p-4 shadow-2xl shadow-black/40"
          >
            <p className="text-[10px] uppercase tracking-[0.28em] text-muted mb-3">
              Recruiter view
            </p>
            <div className="space-y-2">
              {[
                { t: "Verified talent pool", s: "ON" },
                { t: "Resume screening", s: "SKIP" },
                { t: "Video-first review", s: "ON" },
              ].map((row) => (
                <div
                  key={row.t}
                  className="flex items-center justify-between text-xs border border-white/[0.06] rounded-xl px-3 py-2 bg-background/40"
                >
                  <span className="text-muted">{row.t}</span>
                  <span className="text-[10px] font-black tracking-wider text-accent">
                    {row.s}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="relative z-[6] w-full max-w-6xl mx-auto px-6 pt-24 pb-28 text-center">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="flex flex-col items-center gap-4 mb-10"
          >
            <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl shadow-[0_0_0_1px_rgba(255,255,255,0.04)_inset]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-40" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.26em] text-foreground/90">
                Verified graph · early access
              </span>
            </div>

            <div className="h-7 md:h-8 overflow-hidden flex items-center justify-center">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={ROTATING_LINES[lineIdx]}
                  initial={reduceMotion ? false : { y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={reduceMotion ? undefined : { y: -16, opacity: 0 }}
                  transition={{ duration: 0.45 }}
                  className="text-sm md:text-base text-muted font-medium tracking-wide"
                >
                  {ROTATING_LINES[lineIdx]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <h1 className="text-[clamp(2.75rem,8vw,7.5rem)] font-black leading-[0.88] tracking-tighter mb-8 perspective-[1200px]">
            <span className="block text-white drop-shadow-[0_20px_80px_rgba(0,0,0,0.65)]">
              <SplitLine text="Beyond the noise." delayBase={0.25} />
            </span>
            <span className="block mt-3 md:mt-4 bg-[linear-gradient(90deg,#3b82f6,#93c5fd,#e8d48b,#d4af37,#3b82f6)] bg-clip-text text-transparent bg-[length:200%_auto] hero-shimmer-text drop-shadow-[0_25px_90px_rgba(59,130,246,0.22)]">
              <SplitLine text="Invited on proof." delayBase={0.55} />
            </span>
          </h1>

          <motion.p
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: reduceMotion ? 0 : 1.05 }}
            className="text-base md:text-lg text-muted/90 max-w-xl mx-auto mb-14 font-light leading-relaxed"
          >
            Verified hiring graph — AI scores, video proof, direct invites.
            Two portals, one standard. Early access.
          </motion.p>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: reduceMotion ? 0 : 1.35 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-10 md:gap-20 mb-12 relative"
          >
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(92vw,560px)] h-[min(92vw,560px)] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.06)_0%,transparent_62%)] pointer-events-none" />

            <Link
              href="/signup?role=candidate"
              onMouseEnter={() => setHoveredEye("left")}
              onMouseLeave={() => setHoveredEye(null)}
              className="group relative z-[1]"
            >
              <div
                className={`relative w-44 h-44 md:w-56 md:h-56 rounded-full border-2 transition-all duration-700 flex items-center justify-center overflow-hidden backdrop-blur-md ${
                  hoveredEye === "left"
                    ? "border-primary shadow-[0_0_80px_rgba(59,130,246,0.45)] scale-[1.06] bg-primary/[0.06]"
                    : "border-white/[0.14] hover:border-primary/55 bg-white/[0.02]"
                }`}
              >
                <div
                  className={`absolute inset-[14px] rounded-full bg-gradient-to-br from-primary/25 to-transparent transition-all duration-700 ${
                    hoveredEye === "left"
                      ? "opacity-100 scale-100"
                      : "opacity-35 scale-95"
                  }`}
                />
                <div
                  className={`relative w-[4.5rem] h-[4.5rem] md:w-[5.25rem] md:h-[5.25rem] rounded-full bg-gradient-to-br from-primary to-blue-400 flex items-center justify-center transition-all duration-500 ring-2 ring-white/10 ${
                    hoveredEye === "left"
                      ? "scale-110 shadow-xl shadow-primary/50"
                      : ""
                  }`}
                >
                  <svg
                    className="w-9 h-9 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                    />
                  </svg>
                </div>
                <div
                  className={`absolute inset-3 rounded-full border transition-all duration-700 ${
                    hoveredEye === "left"
                      ? "border-primary/40 opacity-100"
                      : "border-transparent opacity-0"
                  }`}
                  style={{
                    borderStyle: "dashed",
                    animation: reduceMotion
                      ? undefined
                      : hoveredEye === "left"
                        ? "orbit-spin 10s linear infinite"
                        : undefined,
                  }}
                />
              </div>
              <p
                className={`mt-5 text-[11px] md:text-xs font-black uppercase tracking-[0.28em] transition-colors duration-300 text-center ${
                  hoveredEye === "left" ? "text-primary" : "text-muted"
                }`}
              >
                Candidate portal
              </p>
            </Link>

            <div className="hidden sm:flex flex-col items-center gap-3 text-white/25">
              <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/35 to-transparent" />
              <div className="relative">
                <div className="w-9 h-9 rotate-45 border border-white/15 bg-white/[0.03] backdrop-blur-sm shadow-[0_0_40px_rgba(212,175,55,0.12)]" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-[9px] font-black tracking-[0.35em] text-accent/90 -rotate-45">
                    NX
                  </span>
                </div>
              </div>
              <div className="w-px h-14 bg-gradient-to-b from-transparent via-white/35 to-transparent" />
            </div>

            <Link
              href="/signup?role=recruiter"
              onMouseEnter={() => setHoveredEye("right")}
              onMouseLeave={() => setHoveredEye(null)}
              className="group relative z-[1]"
            >
              <div
                className={`relative w-44 h-44 md:w-56 md:h-56 rounded-full border-2 transition-all duration-700 flex items-center justify-center overflow-hidden backdrop-blur-md ${
                  hoveredEye === "right"
                    ? "border-accent shadow-[0_0_80px_rgba(212,175,55,0.38)] scale-[1.06] bg-accent/[0.06]"
                    : "border-white/[0.14] hover:border-accent/55 bg-white/[0.02]"
                }`}
              >
                <div
                  className={`absolute inset-[14px] rounded-full bg-gradient-to-br from-accent/25 to-transparent transition-all duration-700 ${
                    hoveredEye === "right"
                      ? "opacity-100 scale-100"
                      : "opacity-35 scale-95"
                  }`}
                />
                <div
                  className={`relative w-[4.5rem] h-[4.5rem] md:w-[5.25rem] md:h-[5.25rem] rounded-full bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center transition-all duration-500 ring-2 ring-white/10 ${
                    hoveredEye === "right"
                      ? "scale-110 shadow-xl shadow-accent/45"
                      : ""
                  }`}
                >
                  <svg
                    className="w-9 h-9 text-background"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z"
                    />
                  </svg>
                </div>
                <div
                  className={`absolute inset-3 rounded-full border transition-all duration-700 ${
                    hoveredEye === "right"
                      ? "border-accent/40 opacity-100"
                      : "border-transparent opacity-0"
                  }`}
                  style={{
                    borderStyle: "dashed",
                    animation: reduceMotion
                      ? undefined
                      : hoveredEye === "right"
                        ? "orbit-spin 10s linear infinite reverse"
                        : undefined,
                  }}
                />
              </div>
              <p
                className={`mt-5 text-[11px] md:text-xs font-black uppercase tracking-[0.28em] transition-colors duration-300 text-center ${
                  hoveredEye === "right" ? "text-accent" : "text-muted"
                }`}
              >
                Recruiter portal
              </p>
            </Link>
          </motion.div>

          {!videoReady && (
            <p className="text-[11px] text-muted/60 max-w-md mx-auto mb-10 leading-relaxed">
              Place <span className="text-foreground/80 font-mono">videoplayback.mp4</span>{" "}
              in <span className="text-foreground/80 font-mono">public/</span> for the
              muted hero background.
            </p>
          )}

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 2.2 }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] text-muted uppercase tracking-[0.35em]">
              Explore
            </span>
            <motion.div
              animate={reduceMotion ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 2.2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border border-white/15 flex justify-center pt-2 bg-white/[0.02]"
            >
              <div className="w-0.5 h-2 rounded-full bg-white/35" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section id="vision" className="py-32 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <FadeIn>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
              The Vision
            </p>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.9] max-w-5xl mb-6">
              We reinvented how talent meets opportunity
              <span className="text-muted">
                {" "}
                — through precision, proof, and trust.
              </span>
            </h2>
          </FadeIn>

          <div className="grid md:grid-cols-3 gap-px mt-20 bg-white/5 rounded-2xl overflow-hidden">
            <FadeIn delay={0}>
              <div className="group bg-background p-10 md:p-12 h-full hover:bg-card/50 transition-all duration-500">
                <span className="text-6xl font-black text-white/[0.03] group-hover:text-primary/10 transition-colors duration-500 block mb-4">
                  01
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  AI Verification
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  Every resume is scored by AI. Every skill quantified. Every
                  candidate must prove themselves before being seen.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="group bg-background p-10 md:p-12 h-full hover:bg-card/50 transition-all duration-500">
                <span className="text-6xl font-black text-white/[0.03] group-hover:text-accent/10 transition-colors duration-500 block mb-4">
                  02
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors duration-300">
                  Video Proof
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  3 mandatory videos reveal communication, thinking, and
                  personality. Recruiters see the human — not just the paper.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="group bg-background p-10 md:p-12 h-full hover:bg-card/50 transition-all duration-500">
                <span className="text-6xl font-black text-white/[0.03] group-hover:text-primary/10 transition-colors duration-500 block mb-4">
                  03
                </span>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  Direct Access
                </h3>
                <p className="text-muted leading-relaxed text-sm">
                  No applications. No black holes. Recruiters invite verified
                  candidates directly. Interviews happen in days, not months.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeIn className="text-center">
              <p className="text-4xl md:text-5xl font-black">
                <AnimatedCounter target={100} suffix="%" />
              </p>
              <p className="text-xs text-muted mt-2 uppercase tracking-wider">
                Verified Only
              </p>
            </FadeIn>
            <FadeIn className="text-center" delay={0.1}>
              <p className="text-4xl md:text-5xl font-black">
                <AnimatedCounter target={3} />
              </p>
              <p className="text-xs text-muted mt-2 uppercase tracking-wider">
                Video Proofs
              </p>
            </FadeIn>
            <FadeIn className="text-center" delay={0.2}>
              <p className="text-4xl md:text-5xl font-black">
                <AnimatedCounter target={0} />
              </p>
              <p className="text-xs text-muted mt-2 uppercase tracking-wider">
                Applications
              </p>
            </FadeIn>
            <FadeIn className="text-center" delay={0.3}>
              <p className="text-4xl md:text-5xl font-black text-primary">AI</p>
              <p className="text-xs text-muted mt-2 uppercase tracking-wider">
                Powered
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="candidates" className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeIn>
              <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-6">
                For Candidates
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] mb-8">
                Your skills speak.
                <span className="text-muted block mt-1">We amplify them.</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-10">
                Stop sending resumes into the void. Get verified, show your
                proof, and let recruiters come to you.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "AI resume scoring with feedback",
                  "Skill-by-skill breakdown",
                  "Video profiles that show the real you",
                  "Direct invites from recruiters",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <div className="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/signup?role=candidate"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-background rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all hover:shadow-xl hover:shadow-white/10"
              >
                Join as Candidate
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/5 rounded-3xl blur-3xl" />
                <div className="relative bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl p-7 space-y-3">
                  <div className="flex items-center gap-4 bg-background/60 rounded-2xl p-4 border border-white/5">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold">
                      S
                    </div>
                    <div>
                      <p className="font-bold text-sm">Sarah Mitchell</p>
                      <p className="text-xs text-muted">Data Analyst • Verified</p>
                    </div>
                    <div className="ml-auto">
                      <p className="text-2xl font-black text-primary">82</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      ["SQL", 78],
                      ["Python", 85],
                      ["Power BI", 72],
                    ].map(([s, v]) => (
                      <div
                        key={s as string}
                        className="bg-background/60 rounded-xl p-3 border border-white/5 text-center"
                      >
                        <p className="text-lg font-black text-primary">{v}</p>
                        <p className="text-[10px] text-muted uppercase mt-0.5">
                          {s}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="bg-background/60 rounded-xl p-3 border border-white/5">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[10px] text-muted uppercase tracking-wider">
                        3/3 Videos
                      </span>
                    </div>
                    <div className="w-full h-1 bg-white/5 rounded-full">
                      <div className="h-full w-full bg-gradient-to-r from-primary to-accent rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      <section id="recruiters" className="py-32 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <FadeIn delay={0.2} className="order-2 md:order-1">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl blur-3xl" />
                <div className="relative bg-card/60 backdrop-blur-xl border border-white/10 rounded-3xl p-7 space-y-3">
                  <div className="bg-background/60 rounded-2xl p-4 border border-white/5 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm">Senior Data Analyst</p>
                      <p className="text-xs text-muted">TechCorp • Remote</p>
                    </div>
                    <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full font-bold">
                      8 Matches
                    </span>
                  </div>
                  {[
                    {
                      n: "Alex Chen",
                      s: 88,
                      c: "from-primary to-blue-400",
                    },
                    {
                      n: "Maria Santos",
                      s: 79,
                      c: "from-accent to-yellow-400",
                    },
                    {
                      n: "James Park",
                      s: 75,
                      c: "from-green-400 to-emerald-500",
                    },
                  ].map(({ n, s, c }) => (
                    <div
                      key={n}
                      className="flex items-center gap-3 bg-background/60 rounded-xl p-3 border border-white/5"
                    >
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${c} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {n[0]}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold">{n}</p>
                        <p className="text-xs text-muted">
                          Score: {s} • Verified
                        </p>
                      </div>
                      <button
                        type="button"
                        className="text-[10px] border border-white/10 hover:border-accent/50 px-3 py-1.5 rounded-lg font-bold uppercase tracking-wider transition-all hover:bg-accent/10"
                      >
                        Invite
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
            <FadeIn className="order-1 md:order-2">
              <p className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-6">
                For Recruiters
              </p>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-[0.9] mb-8">
                Hire without
                <span className="text-muted block mt-1">screening.</span>
              </h2>
              <p className="text-muted text-lg leading-relaxed mb-10">
                Every candidate is pre-verified. Watch their thinking. Check
                scores. Invite directly.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  "Only verified candidates visible",
                  "Video + skill insights before contact",
                  "Direct scheduling",
                  "Pay only on successful hire",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm">
                    <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    </div>
                    <span className="text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/signup?role=recruiter"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-accent/80 text-background rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all hover:shadow-xl hover:shadow-accent/20"
              >
                Join as Recruiter
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </FadeIn>
          </div>
        </div>
      </section>

      <section className="py-32 border-t border-white/5 relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-[150px] rounded-full" />
        </div>
        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-[0.85] mb-8">
              The future of hiring
              <span className="block text-muted mt-2">starts here.</span>
            </h2>
            <p className="text-muted text-lg max-w-2xl mx-auto mb-12 font-light">
              Built on proof. Powered by AI. Designed for those who are serious.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link
                href="/signup?role=candidate"
                className="px-12 py-5 bg-white text-background rounded-full font-bold text-sm uppercase tracking-wider hover:scale-105 transition-all hover:shadow-2xl hover:shadow-white/20"
              >
                I&apos;m a Candidate
              </Link>
              <Link
                href="/signup?role=recruiter"
                className="px-12 py-5 border border-white/20 hover:border-accent/50 rounded-full font-bold text-sm uppercase tracking-wider hover:bg-white/5 hover:scale-105 transition-all"
              >
                I&apos;m a Recruiter
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-white/5 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <span className="text-white font-black text-xs">N</span>
            </div>
            <span className="font-black uppercase tracking-tight">Nurnex</span>
          </div>
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Nurnex. All rights reserved.
          </p>
          <div className="flex gap-8 text-xs text-muted uppercase tracking-wider">
            <Link href="/about" className="hover:text-foreground transition-colors">
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
