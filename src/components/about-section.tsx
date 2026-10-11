"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedCounter({ target, suffix = "" }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  const numericTarget = parseInt(target.replace(/\D/g, "")) || 0;

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = numericTarget;
    const duration = 2000;
    const startTime = Date.now();

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setCount(start);
      if (progress >= 1) clearInterval(timer);
    }, 16);

    return () => clearInterval(timer);
  }, [inView, numericTarget]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  { value: "5", label: "Regional Hubs", suffix: "" },
  { value: "15", label: "Service Lines", suffix: "" },
  { value: "5", label: "Industries Served", suffix: "" },
  { value: "1", label: "USA Headquarters", suffix: "" },
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-20 sm:py-28 bg-ink-navy overflow-hidden">
      {/* Horizontal ruled-paper pattern */}
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 39px, rgba(255,255,255,0.4) 39px, rgba(255,255,255,0.4) 40px)", opacity: 0.02 }} />
      {/* Navy-to-darker gradient */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.15)]" />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14 sm:mb-20"
        >
          <p className="text-copper text-sm tracking-[0.3em] uppercase mb-3">
            Our Edge
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Why Nurnex
          </h2>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", bounce: 0.4, duration: 0.8, delay: i * 0.12 }}
              className="text-center"
            >
              <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-copper mb-2 digital-ticker">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <p className="text-muted text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Value propositions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { title: "Enterprise Architecture", desc: "US enterprise-grade delivery quality — governed data models, proper security, and scalable foundations — without Big-4 overhead." },
            { title: "Microsoft, AI + Digital Products", desc: "Power BI, Power Platform, Azure, AI and machine learning, and legacy modernization — plus websites and iOS & Android apps when you need the full stack." },
            { title: "Cross-Border Delivery", desc: "Headquartered in the USA with hubs across Europe, the Middle East, and Western Asia — we deliver where your business operates." },
            { title: "Fixed-Price Clarity", desc: "Every engagement starts with a Discovery Sprint. You get a clear scope, fixed price, and no surprises — before any major build begins." },
            { title: "Supervised Quality", desc: "Senior-led architecture with review gates at every stage. Your solutions are built to last, not patched together by juniors." },
            { title: "Enablement Focus", desc: "We don't just build — we train your team so solutions stick after we leave. Knowledge transfer is part of every engagement." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card-bg border border-white/5 rounded-2xl p-6 sm:p-8 hover:border-copper/20 transition-all duration-300 hover:shadow-lg hover:shadow-copper/5"
            >
              <h3 className="text-white font-semibold text-lg mb-3">{item.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
