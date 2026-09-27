"use client";

import { useEffect, useRef } from "react";

const MASK =
  "radial-gradient(circle 240px at var(--mx) var(--my), #000 0%, rgba(0,0,0,0.6) 45%, transparent 100%)";

/** Work: a faint drafting grid; the cursor becomes a lens revealing the copper blueprint with live coordinates. */
export default function BlueprintBg() {
  const rootRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = root.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const inside = x >= 0 && y >= 0 && x <= rect.width && y <= rect.height;
      root.style.setProperty("--mx", `${x}px`);
      root.style.setProperty("--my", `${y}px`);
      root.style.setProperty("--on", inside ? "1" : "0");
      if (labelRef.current && inside) {
        labelRef.current.textContent = `X ${String(Math.round(x)).padStart(4, "0")} · Y ${String(Math.round(y)).padStart(4, "0")}`;
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-0 pointer-events-none overflow-hidden"
      style={{ ["--mx" as string]: "50%", ["--my" as string]: "50%", ["--on" as string]: "0" }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="blueprint-scan absolute inset-x-0 h-24" />

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--on)",
          backgroundImage:
            "linear-gradient(rgba(196,120,43,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(196,120,43,0.45) 1px, transparent 1px), linear-gradient(rgba(196,120,43,0.14) 1px, transparent 1px), linear-gradient(90deg, rgba(196,120,43,0.14) 1px, transparent 1px)",
          backgroundSize: "48px 48px, 48px 48px, 12px 12px, 12px 12px",
          maskImage: MASK,
          WebkitMaskImage: MASK,
        }}
      />

      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: "var(--on)",
          background:
            "radial-gradient(circle 180px at var(--mx) var(--my), rgba(196,120,43,0.10), transparent 70%)",
        }}
      />

      <div
        className="absolute inset-x-0 h-px transition-opacity duration-300"
        style={{ top: "var(--my)", opacity: "calc(var(--on) * 0.35)", background: "linear-gradient(90deg, transparent, #C4782B 20%, #C4782B 80%, transparent)" }}
      />
      <div
        className="absolute inset-y-0 w-px transition-opacity duration-300"
        style={{ left: "var(--mx)", opacity: "calc(var(--on) * 0.35)", background: "linear-gradient(180deg, transparent, #C4782B 20%, #C4782B 80%, transparent)" }}
      />

      <span
        ref={labelRef}
        className="absolute font-mono text-[10px] tracking-[0.2em] text-copper/80 transition-opacity duration-300"
        style={{
          left: "calc(var(--mx) + 14px)",
          top: "calc(var(--my) + 14px)",
          opacity: "var(--on)",
        }}
      />
    </div>
  );
}
