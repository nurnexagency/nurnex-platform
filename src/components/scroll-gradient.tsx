"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function ScrollGradientOverlay() {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const y = useTransform(scrollYProgress, [0, 1], ["-20%", "40%"]);

  return (
    <div
      className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <motion.div
        className="absolute w-[900px] h-[900px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(196,120,43,0.6) 0%, transparent 70%)",
          left: "calc(50% - 450px)",
          top: "calc(50% - 450px)",
          x,
          y,
          opacity: 0.04,
        }}
      />
    </div>
  );
}
