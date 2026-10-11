"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SunArc from "@/components/sun-arc";
import { MOTTO } from "@/lib/brand";

const orbitingDiamonds = [
  { className: "diamond-orbit-1", size: 6, opacity: 0.5 },
  { className: "diamond-orbit-2", size: 5, opacity: 0.4 },
  { className: "diamond-orbit-3", size: 7, opacity: 0.35 },
  { className: "diamond-orbit-4", size: 4, opacity: 0.45 },
  { className: "diamond-orbit-5", size: 6, opacity: 0.3 },
  { className: "diamond-orbit-6", size: 5, opacity: 0.4 },
  { className: "diamond-orbit-7", size: 4, opacity: 0.35 },
  { className: "diamond-orbit-8", size: 7, opacity: 0.3 },
];

const floatingDiamonds = [
  { className: "diamond-float-1", size: 5, opacity: 0.35, style: { top: "8%", left: "12%" } as React.CSSProperties },
  { className: "diamond-float-2", size: 4, opacity: 0.3, style: { top: "82%", left: "18%" } as React.CSSProperties },
  { className: "diamond-float-3", size: 6, opacity: 0.25, style: { top: "12%", right: "10%" } as React.CSSProperties },
  { className: "diamond-float-4", size: 3, opacity: 0.35, style: { top: "78%", right: "14%" } as React.CSSProperties },
  { className: "diamond-float-5", size: 5, opacity: 0.3, style: { top: "42%", left: "3%" } as React.CSSProperties },
  { className: "diamond-float-6", size: 4, opacity: 0.28, style: { top: "55%", right: "5%" } as React.CSSProperties },
];

function CompassRose() {
  return (
    <div className="relative w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[500px] md:h-[500px]">
      {/* ── Copper glow aura — breathing warmth draws eye to center ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="copper-glow-aura w-[55%] h-[55%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(196,120,43,0.18) 0%, rgba(196,120,43,0.06) 40%, transparent 70%)",
          }}
        />
      </div>

      {/* ── Fibonacci golden spiral — subconscious visual harmony ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
      >
        <path
          d="M253,250 C253,247.5 251.5,245.5 250,245 C247,244 243,246.5 242,250 C240.5,255 244,261 250,263 C257.5,265.5 268,260 271,250 C274,238 263,219.5 250,217 C232,214 199,231 196,250 C192.5,277 216,333 250,337 C294,342 388,300 391,250 C394,195 316,110 250,107"
          fill="none"
          stroke="#C4782B"
          strokeWidth="0.8"
          opacity="0.05"
        />
      </svg>

      {/* ── Breathing pulse rings — 4s intervals matching relaxed breathing ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
      >
        <circle
          cx="250"
          cy="250"
          r="100"
          fill="none"
          stroke="#C4782B"
          strokeWidth="1"
          className="compass-breathe-pulse-1"
        />
        <circle
          cx="250"
          cy="250"
          r="100"
          fill="none"
          stroke="#C4782B"
          strokeWidth="0.8"
          className="compass-breathe-pulse-2"
        />
        <circle
          cx="250"
          cy="250"
          r="100"
          fill="none"
          stroke="#C4782B"
          strokeWidth="0.5"
          className="compass-breathe-pulse-3"
        />
      </svg>

      {/* ── Diamond particles (◆) — varying sizes, orbiting and floating ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Orbiting diamonds */}
        <div className="absolute inset-0 flex items-center justify-center">
          {orbitingDiamonds.map((d, i) => (
            <div
              key={`orbit-${i}`}
              className={`absolute w-full h-full flex items-center justify-center ${d.className}`}
            >
              <span
                className="text-copper"
                style={{ fontSize: `${d.size}px`, opacity: d.opacity }}
              >
                ◆
              </span>
            </div>
          ))}
        </div>
        {/* Floating diamonds with parallax */}
        {floatingDiamonds.map((d, i) => (
          <div key={`float-${i}`} className={`absolute ${d.className}`} style={d.style}>
            <span
              className="text-copper"
              style={{ fontSize: `${d.size}px`, opacity: d.opacity }}
            >
              ◆
            </span>
          </div>
        ))}
      </div>

      {/* ── NURNEX text orbit — 45s counter-clockwise (visual tension holds attention) ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 500"
      >
        <defs>
          <path
            id="nurnexOrbitPath"
            d="M 250,250 m -215,0 a 215,215 0 1,1 430,0 a 215,215 0 1,1 -430,0"
            fill="none"
          />
        </defs>
        <g className="compass-text-orbit">
          {[0, 25, 50, 75].map((offset) => (
            <text
              key={offset}
              fill="#C4782B"
              opacity="0.6"
              fontSize="18"
              fontWeight="600"
              letterSpacing="8"
            >
              <textPath href="#nurnexOrbitPath" startOffset={`${offset}%`}>
                NURNEX
              </textPath>
            </text>
          ))}
        </g>
      </svg>

      {/* ── Outer tick ring — 90s clockwise (slowest, grounding) ── */}
      <svg
        className="absolute inset-0 w-full h-full compass-outer-ticks"
        viewBox="0 0 500 500"
      >
        <circle
          cx="250"
          cy="250"
          r="180"
          fill="none"
          stroke="#C4782B"
          strokeWidth="1"
          opacity="0.3"
        />
        <circle
          cx="250"
          cy="250"
          r="160"
          fill="none"
          stroke="#C4782B"
          strokeWidth="0.5"
          opacity="0.2"
        />
        {Array.from({ length: 36 }).map((_, i) => {
          const angle = (i * 10 * Math.PI) / 180;
          const r1 = i % 9 === 0 ? 165 : 172;
          const r2 = 180;
          const x1 = Math.round((250 + r1 * Math.sin(angle)) * 100) / 100;
          const y1 = Math.round((250 - r1 * Math.cos(angle)) * 100) / 100;
          const x2 = Math.round((250 + r2 * Math.sin(angle)) * 100) / 100;
          const y2 = Math.round((250 - r2 * Math.cos(angle)) * 100) / 100;
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="#C4782B"
              strokeWidth={i % 9 === 0 ? 1.5 : 0.5}
              opacity={i % 9 === 0 ? 0.7 : 0.3}
            />
          );
        })}
      </svg>

      {/* ── Middle compass body — 60s clockwise ── */}
      <svg
        className="absolute inset-0 w-full h-full compass-main"
        viewBox="0 0 500 500"
      >
        <circle
          cx="250"
          cy="250"
          r="140"
          fill="none"
          stroke="#8B9DB5"
          strokeWidth="0.5"
          opacity="0.15"
        />

        {/* N cardinal — copper */}
        <polygon points="250,70 262,230 250,215 238,230" fill="#C4782B" opacity="0.9" />
        {/* S cardinal */}
        <polygon points="250,430 238,270 250,285 262,270" fill="#C4782B" opacity="0.7" />
        {/* E cardinal */}
        <polygon points="430,250 270,238 285,250 270,262" fill="#C4782B" opacity="0.7" />
        {/* W cardinal */}
        <polygon points="70,250 230,262 215,250 230,238" fill="#C4782B" opacity="0.7" />

        {/* NE diagonal — navy */}
        <polygon points="370,130 268,238 275,250 282,238" fill="#163350" opacity="0.8" />
        {/* SE diagonal */}
        <polygon points="370,370 268,262 275,250 282,262" fill="#163350" opacity="0.8" />
        {/* SW diagonal */}
        <polygon points="130,370 238,268 225,250 218,262" fill="#163350" opacity="0.8" />
        {/* NW diagonal */}
        <polygon points="130,130 238,238 225,250 218,238" fill="#163350" opacity="0.8" />
      </svg>

      {/* ── Inner ring — 30s counter-clockwise ── */}
      <svg
        className="absolute inset-0 w-full h-full compass-inner-ring"
        viewBox="0 0 500 500"
      >
        <circle cx="250" cy="250" r="35" fill="none" stroke="#C4782B" strokeWidth="1.5" opacity="0.6" />
        <circle cx="250" cy="250" r="25" fill="none" stroke="#C4782B" strokeWidth="1" opacity="0.4" />
        <circle cx="250" cy="250" r="8" fill="#C4782B" opacity="0.9" />
        <circle cx="250" cy="250" r="4" fill="#0A1F33" />
        <circle cx="250" cy="250" r="2" fill="#C4782B" />
      </svg>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-ink-navy overflow-hidden pt-20">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink-navy via-ink-navy/95 to-ink-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(196,120,43,0.06)_0%,_transparent_70%)]" />
      <SunArc />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 gap-6 sm:gap-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-[-10%] bottom-[-5%] h-[55%] -z-10 bg-[radial-gradient(ellipse_at_center,rgba(10,31,51,0.85)_0%,rgba(10,31,51,0.55)_45%,transparent_75%)] sm:opacity-70"
        />
        {/* Compass */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <CompassRose />
        </motion.div>

        {/* Text overlay */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col items-center gap-3 sm:gap-4 -mt-4"
        >
          <h1>
            <Image
              src="/nurnex-logo-white.svg"
              alt="Nurnex Consulting"
              width={946}
              height={130}
              priority
              unoptimized
              className="w-[280px] sm:w-[440px] md:w-[540px] h-auto drop-shadow-[0_4px_24px_rgba(10,31,51,0.6)]"
            />
          </h1>
          <p className="font-display text-copper text-lg sm:text-2xl md:text-[1.75rem] font-light tracking-[0.2em] [text-shadow:0_2px_14px_rgba(10,31,51,0.95),0_0_4px_rgba(10,31,51,0.8)]">
            {MOTTO}
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-muted text-sm sm:text-base md:text-lg max-w-2xl leading-relaxed [text-shadow:0_2px_12px_rgba(10,31,51,0.95),0_0_3px_rgba(10,31,51,0.8)]"
        >
          Microsoft analytics, automation, and cloud consulting — plus websites and iOS &amp; Android apps — for Europe, Asia, and&nbsp;the&nbsp;Middle&nbsp;East.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <a
            href="#contact"
            className="bg-copper hover:bg-copper/90 text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-all duration-300 hover:shadow-lg hover:shadow-copper/20 text-sm sm:text-base"
          >
            Email Us to Schedule
          </a>
          <a
            href="#services"
            className="border border-white/20 hover:border-copper/50 text-white px-8 py-3.5 rounded-lg font-medium tracking-wide transition-all duration-300 hover:bg-white/5 text-sm sm:text-base"
          >
            Explore Services
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
      >
        <svg
          width="24"
          height="36"
          viewBox="0 0 24 36"
          fill="none"
          className="text-muted/50"
        >
          <rect
            x="1"
            y="1"
            width="22"
            height="34"
            rx="11"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="12" cy="10" r="2" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
