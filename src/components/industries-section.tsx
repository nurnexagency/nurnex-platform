"use client";

import { motion } from "framer-motion";

const industries = [
  {
    name: "Financial Services",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M2 20h20M5 20V8l7-5 7 5v12" />
        <rect x="9" y="12" width="6" height="8" />
        <path d="M9 8h6" />
      </svg>
    ),
  },
  {
    name: "Healthcare",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M8 2h8v6h6v8h-6v6H8v-6H2V8h6Z" />
      </svg>
    ),
  },
  {
    name: "Education",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M22 10l-10-6L2 10l10 6 10-6Z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
        <path d="M22 10v6" />
      </svg>
    ),
  },
  {
    name: "Logistics",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <rect x="1" y="3" width="15" height="13" rx="1" />
        <path d="M16 8h4l3 3v5h-7V8Z" />
        <circle cx="5.5" cy="18.5" r="2.5" />
        <circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
  },
  {
    name: "Government",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3" />
        <path d="M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11" />
      </svg>
    ),
  },
];

export default function IndustriesSection() {
  return (
    <section className="relative py-16 sm:py-24 bg-dark-bg border-y border-white/5 overflow-hidden">
      {/* Radial copper gradient */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,rgba(196,120,43,0.03)_0%,transparent_70%)]" />
      {/* Concentric circles radar pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-radial-gradient(circle at 50% 50%, transparent, transparent 59px, rgba(196,120,43,0.03) 59px, rgba(196,120,43,0.03) 60px)" }} />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-14"
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">
            Sector Expertise
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Industries We Serve
          </h2>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {industries.map((industry, i) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.5, duration: 0.6, delay: i * 0.1 }}
              className="flex items-center gap-3 bg-card-bg border border-white/5 rounded-full px-6 py-3 hover:border-copper/30 hover:shadow-[0_4px_20px_rgba(196,120,43,0.1)] transition-all duration-300 group cursor-default"
            >
              <span className="text-copper group-hover:scale-110 transition-transform">
                {industry.icon}
              </span>
              <span className="text-white text-sm font-medium">
                {industry.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
