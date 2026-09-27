"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { getSunState, HORIZON_VH } from "@/lib/sun-clock";

export default function SunArc() {
  const sunRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const diskRef = useRef<HTMLDivElement>(null);
  const skyRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    let raf = 0;

    const frame = (now: number) => {
      const sun = sunRef.current;
      const glow = glowRef.current;
      const disk = diskRef.current;
      const sky = skyRef.current;
      if (!sun || !glow || !disk || !sky) return;

      const s = getSunState(now, reduceMotion);
      const [r, g, b] = s.color;
      const x = (window.innerWidth * s.xPct) / 100;
      const y = (window.innerHeight * s.yVh) / 100;

      sun.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      sun.style.opacity = String(s.opacity);
      glow.style.background = `radial-gradient(circle, rgba(${r},${g},${b},0.45) 0%, rgba(${r},${g},${b},0.12) 35%, transparent 70%)`;
      disk.style.background = `radial-gradient(circle, #fffaf0 0%, rgb(${r},${g},${b}) 70%, rgba(${r},${g},${b},0.9) 100%)`;
      disk.style.boxShadow = `0 0 40px 12px rgba(${r},${g},${b},0.55), 0 0 120px 40px rgba(${r},${g},${b},0.25)`;

      const warmth = (1 - Math.min(1, s.elevation * 1.6)) * s.opacity;
      sky.style.opacity = String(warmth * 0.9);
      sky.style.background = `radial-gradient(ellipse 45% 60% at ${s.xPct}% 100%, rgba(${r},${g},${b},0.35) 0%, rgba(${r},${g},${b},0.08) 45%, transparent 75%)`;

      if (!reduceMotion) raf = requestAnimationFrame(frame);
    };

    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [reduceMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <div
        ref={skyRef}
        className="absolute inset-x-0"
        style={{ top: `${HORIZON_VH - 35}vh`, height: "35vh", opacity: 0 }}
      />
      <div ref={sunRef} className="absolute left-0 top-0 will-change-transform" style={{ opacity: 0 }}>
        <div
          ref={glowRef}
          className="absolute rounded-full"
          style={{ width: 560, height: 560, left: -280, top: -280 }}
        />
        <div
          ref={diskRef}
          className="absolute rounded-full"
          style={{ width: 64, height: 64, left: -32, top: -32 }}
        />
      </div>
    </div>
  );
}
