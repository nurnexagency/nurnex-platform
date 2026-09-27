"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex items-center justify-center py-3 bg-ink-navy">
      {/* Left line — draws outward from center */}
      <motion.div
        className="h-px flex-1 max-w-[200px] bg-gradient-to-r from-transparent to-copper/30"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "right" }}
      />

      {/* Center diamond — scales in first */}
      <motion.span
        className="mx-3 text-copper text-xs"
        initial={{ scale: 0, opacity: 0 }}
        animate={inView ? { scale: 1, opacity: 0.6 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        ◆
      </motion.span>

      {/* Right line — draws outward from center */}
      <motion.div
        className="h-px flex-1 max-w-[200px] bg-gradient-to-l from-transparent to-copper/30"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        style={{ transformOrigin: "left" }}
      />
    </div>
  );
}
