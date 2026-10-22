"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================================================================
   AI Display Data
   ================================================================ */

interface AiInput { label: string; desc: string; icon: React.ReactNode; }
interface AiOutput { field: string; value: string; confidence: number; }

interface AiSolution {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  tags: string[];
  metrics: { value: string; label: string }[];
  problem: string;
  solution: string;
  inputs: AiInput[];
  processingSteps: string[];
  outputs: AiOutput[];
  features: { label: string; desc: string }[];
  coreLabel: string;
  coreDesc: string;
}

const docIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6" />
  </svg>
);
const chartIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M3 3v18h18" /><path d="M7 15l4-5 3 3 5-7" />
  </svg>
);
const peopleIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
  </svg>
);
const signalIcon = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
  </svg>
);

const aiSolutions: AiSolution[] = [
  {
    id: "document-intelligence",
    title: "Intelligent Document Processing",
    subtitle: "AI reads your documents so your team does not have to",
    description: "Invoices, contracts, forms, and applications pile up. Our AI document processing solution reads them, extracts every field with high accuracy, validates the data, and triggers the right downstream action.",
    accent: "#0078D4",
    tags: ["AI", "Documents", "OCR", "Extraction"],
    metrics: [
      { value: "99%+", label: "Extraction Accuracy" },
      { value: "80%", label: "Time Saved" },
      { value: "24/7", label: "Processing" },
    ],
    problem: "Staff spend hours copying data from invoices, contracts, and forms into systems. Errors creep in. Backlogs grow. High-value employees do low-value data entry.",
    solution: "AI reads every document in seconds with 99%+ accuracy. Only exceptions need human review. Your team focuses on decisions, not data entry. The backlog disappears.",
    coreLabel: "Azure AI",
    coreDesc: "Document Intelligence",
    inputs: [
      { label: "Invoice PDF", desc: "Acme Corp - 3 pages", icon: docIcon },
      { label: "Contract Scan", desc: "Service agreement", icon: docIcon },
      { label: "Application Form", desc: "Vendor onboarding", icon: docIcon },
    ],
    processingSteps: [
      "Analyzing document layout...",
      "Extracting text fields...",
      "Validating against master data...",
      "Enriching with business context...",
      "Processing complete",
    ],
    outputs: [
      { field: "Vendor", value: "Acme Corporation", confidence: 99.2 },
      { field: "Amount", value: "$4,250.00", confidence: 99.8 },
      { field: "Invoice #", value: "INV-2026-4471", confidence: 99.5 },
      { field: "Due Date", value: "Nov 15, 2026", confidence: 98.1 },
      { field: "PO Match", value: "PO-2026-889", confidence: 97.3 },
    ],
    features: [
      { label: "Azure AI Document Intelligence", desc: "Pre-built models for invoices, receipts, and IDs" },
      { label: "Custom Model Training", desc: "Train on your specific document formats" },
      { label: "Confidence Scoring", desc: "Only route low-confidence extractions for review" },
      { label: "Multi-Format Support", desc: "PDFs, images, scans, and handwritten documents" },
      { label: "Data Validation", desc: "Cross-reference against master data and business rules" },
      { label: "Action Triggers", desc: "Auto-start approval flows, ERP posting, or alerts" },
    ],
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics Engine",
    subtitle: "Your historical data predicts what happens next",
    description: "Turn years of transaction, sales, and operations data into forward-looking predictions. We build ML models that forecast demand, score churn risk, detect anomalies, and surface insights - all delivered inside Power BI.",
    accent: "#742774",
    tags: ["ML", "Predictions", "Forecasting", "Analytics"],
    metrics: [
      { value: "92%", label: "Model Accuracy" },
      { value: "3 mo", label: "Forecast Horizon" },
      { value: "Real-time", label: "Scoring" },
    ],
    problem: "You make decisions based on what already happened. Churn surprises you. Demand forecasts are gut feel. Anomalies surface days after the damage is done.",
    solution: "ML models trained on your history predict what happens next. Churn risk scores before customers leave. Demand forecasts plan inventory. Anomalies flag in real time.",
    coreLabel: "Azure ML",
    coreDesc: "Prediction Engine",
    inputs: [
      { label: "Sales History", desc: "24 months, 50K records", icon: chartIcon },
      { label: "Customer Data", desc: "12,400 accounts", icon: peopleIcon },
      { label: "Market Signals", desc: "Real-time indicators", icon: signalIcon },
    ],
    processingSteps: [
      "Engineering features...",
      "Training model ensemble...",
      "Cross-validating results...",
      "Computing predictions...",
      "Scoring complete",
    ],
    outputs: [
      { field: "Q1 Revenue", value: "$2.4M forecast", confidence: 92 },
      { field: "Churn Risk", value: "15 accounts flagged", confidence: 89 },
      { field: "Demand Spike", value: "Week 3, February", confidence: 87 },
      { field: "Anomalies", value: "3 transactions flagged", confidence: 95 },
      { field: "Top Driver", value: "Seasonality + promo", confidence: 84 },
    ],
    features: [
      { label: "Demand Forecasting", desc: "Predict sales, inventory needs, and resource demand" },
      { label: "Churn Prediction", desc: "Identify at-risk customers before they leave" },
      { label: "Anomaly Detection", desc: "Flag unusual patterns in transactions and operations" },
      { label: "Explainable Results", desc: "Plain-language explanations of what drives predictions" },
      { label: "Auto Retraining", desc: "Models update automatically as new data arrives" },
      { label: "Dashboard Delivery", desc: "Predictions embedded in Power BI with drill-through" },
    ],
  },
];

/* ================================================================
   Neural Background - floating nodes with connection lines
   ================================================================ */

function NeuralBackground({ accent }: { accent: string }) {
  const nodes = [
    { x: "8%", y: "15%", delay: 0 }, { x: "22%", y: "35%", delay: 1 },
    { x: "15%", y: "65%", delay: 0.5 }, { x: "85%", y: "20%", delay: 1.5 },
    { x: "78%", y: "55%", delay: 0.8 }, { x: "92%", y: "75%", delay: 1.2 },
    { x: "45%", y: "85%", delay: 0.3 }, { x: "55%", y: "10%", delay: 2 },
    { x: "35%", y: "50%", delay: 1.8 }, { x: "65%", y: "70%", delay: 0.6 },
    { x: "72%", y: "30%", delay: 1.4 }, { x: "28%", y: "80%", delay: 2.2 },
  ];

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient orbs */}
      <div className="absolute top-[20%] left-[20%] w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.06] orb-drift-1" style={{ background: accent }} />
      <div className="absolute bottom-[10%] right-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.04] orb-drift-2" style={{ background: accent }} />

      {/* Neural nodes */}
      {nodes.map((node, i) => (
        <div key={i} className="absolute neural-drift" style={{ left: node.x, top: node.y, animationDelay: `${node.delay}s` }}>
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent, opacity: 0.3, boxShadow: `0 0 6px ${accent}40` }} />
        </div>
      ))}

      {/* Connection lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.04]" style={{ stroke: accent }}>
        <line x1="8%" y1="15%" x2="22%" y2="35%" strokeWidth="1" />
        <line x1="22%" y1="35%" x2="35%" y2="50%" strokeWidth="1" />
        <line x1="85%" y1="20%" x2="78%" y2="55%" strokeWidth="1" />
        <line x1="78%" y1="55%" x2="65%" y2="70%" strokeWidth="1" />
        <line x1="55%" y1="10%" x2="72%" y2="30%" strokeWidth="1" />
        <line x1="15%" y1="65%" x2="28%" y2="80%" strokeWidth="1" />
        <line x1="45%" y1="85%" x2="65%" y2="70%" strokeWidth="1" />
      </svg>
    </div>
  );
}

/* ================================================================
   AI Core Visualization - the "brain"
   ================================================================ */

function AiCore({ accent, label, desc, processingStep }: {
  accent: string; label: string; desc: string; processingStep: string;
}) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      {/* Outer orbit ring */}
      <div className="absolute inset-0 ai-orbit">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1">
          <div className="w-2.5 h-2.5 rounded-full" style={{ background: accent, boxShadow: `0 0 10px ${accent}` }} />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1">
          <div className="w-2 h-2 rounded-full" style={{ background: accent, opacity: 0.5 }} />
        </div>
      </div>

      {/* Outer ring */}
      <div className="absolute inset-2 rounded-full border opacity-20 ai-orbit" style={{ borderColor: accent }} />

      {/* Middle orbit ring (reverse) */}
      <div className="absolute inset-6 ai-orbit-reverse">
        <div className="absolute top-0 right-2">
          <div className="w-2 h-2 rounded-full" style={{ background: accent, opacity: 0.7 }} />
        </div>
        <div className="absolute bottom-2 left-0">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent, opacity: 0.4 }} />
        </div>
      </div>

      {/* Middle ring */}
      <div className="absolute inset-8 rounded-full border opacity-15" style={{ borderColor: accent, borderStyle: "dashed" }} />

      {/* Inner glow */}
      <div className="absolute inset-12 rounded-full ai-core-pulse"
        style={{ background: `radial-gradient(circle, ${accent}30, transparent)` }} />

      {/* Core center */}
      <div className="relative z-10 glass-strong rounded-full w-24 h-24 flex flex-col items-center justify-center"
        style={{ boxShadow: `0 0 40px ${accent}30, inset 0 0 20px ${accent}10` }}>
        <div className="text-xs font-bold" style={{ color: accent }}>{label}</div>
        <div className="text-[8px] text-gray-400 mt-0.5">{desc}</div>
      </div>

      {/* Processing status */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap">
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full ai-node-pulse" style={{ color: accent, background: accent }} />
          <span className="text-[10px] font-mono" style={{ color: `${accent}CC` }}>
            {processingStep}<span className="typing-cursor">|</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   Input Card
   ================================================================ */

function InputCard({ input, accent, index, isProcessing }: {
  input: AiInput; accent: string; index: number; isProcessing: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.5 + index * 0.15, type: "spring", stiffness: 80 }}
      className="glass rounded-xl p-3.5 flex items-center gap-3 group hover:scale-[1.03] transition-all duration-300 relative overflow-hidden"
      style={{ borderColor: isProcessing ? `${accent}30` : undefined }}
    >
      {/* Scan line */}
      {isProcessing && (
        <div className="absolute left-0 w-full h-0.5 ai-scan-line" style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)`, animationDelay: `${index * 0.8}s` }} />
      )}

      <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: `${accent}15`, color: accent }}>
        {input.icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-white text-sm font-semibold">{input.label}</div>
        <div className="text-gray-500 text-[10px]">{input.desc}</div>
      </div>

      {/* Connection dot */}
      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: isProcessing ? accent : `${accent}40` }}>
        {isProcessing && (
          <motion.div className="w-full h-full rounded-full"
            animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: index * 0.3 }}
            style={{ background: accent }} />
        )}
      </div>
    </motion.div>
  );
}

/* ================================================================
   Output Result Card with confidence bar
   ================================================================ */

function OutputCard({ output, accent, index, show }: {
  output: AiOutput; accent: string; index: number; show: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={show ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
      transition={{ delay: index * 0.2, type: "spring", stiffness: 80 }}
      className="glass rounded-xl p-3.5 relative overflow-hidden hover:scale-[1.03] transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <div className="text-gray-400 text-[10px] uppercase tracking-wider font-medium">{output.field}</div>
          <div className="text-white text-sm font-bold mt-0.5">{output.value}</div>
        </div>
        <div className="flex items-center gap-1">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          <span className="text-[11px] font-bold font-mono" style={{ color: accent }}>{output.confidence}%</span>
        </div>
      </div>
      {/* Confidence bar */}
      <div className="h-1 rounded-full bg-white/5 overflow-hidden">
        <div className="h-full rounded-full confidence-fill"
          style={{
            width: `${output.confidence}%`,
            background: `linear-gradient(90deg, ${accent}, ${output.confidence > 95 ? "#22C55E" : accent}CC)`,
            animationDelay: `${0.8 + index * 0.2}s`,
          }} />
      </div>
    </motion.div>
  );
}

/* ================================================================
   Connection Lines (Input -> Core -> Output)
   ================================================================ */

function ConnectionLine({ accent, direction, active }: {
  accent: string; direction: "right" | "left"; active: boolean;
}) {
  return (
    <div className="hidden lg:flex items-center px-2">
      <svg width="60" height="20" viewBox="0 0 60 20">
        <line x1="0" y1="10" x2="50" y2="10" stroke={accent} strokeWidth="1.5"
          strokeDasharray="4 3" strokeOpacity={active ? 0.5 : 0.15}
          className={active ? "animate-flow-horizontal" : ""} />
        {direction === "right" && <polygon points="48,5 60,10 48,15" fill={accent} fillOpacity={active ? 0.6 : 0.15} />}
        {direction === "left" && <polygon points="12,5 0,10 12,15" fill={accent} fillOpacity={active ? 0.6 : 0.15} />}
      </svg>
      {active && (
        <div className="absolute particle-h">
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 8px ${accent}` }} />
        </div>
      )}
    </div>
  );
}

/* ================================================================
   Main AI Showcase View
   ================================================================ */

export function AiShowcaseView({ solutionId, onClose }: { solutionId: string; onClose: () => void }) {
  const sol = aiSolutions.find((s) => s.id === solutionId);
  const [processingIdx, setProcessingIdx] = useState(0);
  const [showOutputs, setShowOutputs] = useState(false);

  useEffect(() => {
    if (!sol) return;
    const interval = setInterval(() => {
      setProcessingIdx((prev) => {
        const next = (prev + 1) % sol.processingSteps.length;
        if (next === sol.processingSteps.length - 1) setShowOutputs(true);
        return next;
      });
    }, 2500);
    const showTimer = setTimeout(() => setShowOutputs(true), 3000);
    return () => { clearInterval(interval); clearTimeout(showTimer); };
  }, [sol]);

  if (!sol) return null;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#030810] overflow-y-auto">

      <NeuralBackground accent={sol.accent} />

      {/* Close */}
      <button onClick={onClose}
        className="fixed top-4 right-4 z-[110] glass rounded-full p-2.5 text-gray-400 hover:text-white transition-colors"
        aria-label="Close">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Hero */}
      <div className="relative z-10 pt-10 sm:pt-14 pb-4 text-center px-4">
        <motion.div initial={{ opacity: 0, y: -15 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-xs font-semibold mb-5"
          style={{ background: `${sol.accent}12`, border: `1px solid ${sol.accent}25`, color: sol.accent }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z" />
            <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
          </svg>
          AI Solutions
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 gradient-text"
          style={{ backgroundImage: `linear-gradient(135deg, white 20%, ${sol.accent}, ${sol.accent}88)` }}>
          {sol.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto">
          {sol.subtitle}
        </motion.p>
      </div>

      {/* Impact Metrics */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
        className="relative z-10 flex flex-wrap justify-center gap-4 sm:gap-6 max-w-3xl mx-auto mb-14 px-4">
        {sol.metrics.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 + i * 0.12, type: "spring", stiffness: 200, damping: 15 }}
            className="glass-strong rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-center min-w-[120px] hover:scale-105 transition-transform duration-300">
            <div className="text-2xl sm:text-3xl font-bold mb-1 gradient-text"
              style={{ backgroundImage: `linear-gradient(135deg, ${sol.accent}, white)` }}>{m.value}</div>
            <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">{m.label}</div>
          </motion.div>
        ))}
      </motion.div>

      {/* ?? Main AI Processing Visualization ?????????????? */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        {/* Section title */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
          className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.2em] font-bold mb-2" style={{ color: sol.accent }}>Live Processing Demo</div>
          <div className="text-gray-500 text-sm">Watch how AI processes your data in real time</div>
        </motion.div>

        {/* Desktop: 3-column layout (Inputs | Core | Outputs) */}
        <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center gap-6 lg:gap-0">

          {/* Inputs Column */}
          <div className="w-full lg:w-64 space-y-3">
            <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3 flex items-center gap-2">
              <div className="w-5 h-px" style={{ background: sol.accent, opacity: 0.5 }} />
              Input Data
            </div>
            {sol.inputs.map((input, i) => (
              <InputCard key={i} input={input} accent={sol.accent} index={i} isProcessing={processingIdx > 0} />
            ))}
          </div>

          {/* Connection lines + Core */}
          <div className="flex items-center gap-0">
            <ConnectionLine accent={sol.accent} direction="right" active={processingIdx > 0} />

            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 80 }}
              className="my-6 lg:my-0">
              <AiCore accent={sol.accent} label={sol.coreLabel} desc={sol.coreDesc}
                processingStep={sol.processingSteps[processingIdx]} />
            </motion.div>

            <ConnectionLine accent={sol.accent} direction="right" active={showOutputs} />
          </div>

          {/* Outputs Column */}
          <div className="w-full lg:w-72 space-y-3">
            <div className="text-xs uppercase tracking-wider text-gray-500 font-bold mb-3 flex items-center gap-2">
              <div className="w-5 h-px" style={{ background: "#22C55E", opacity: 0.5 }} />
              AI Results
            </div>
            <AnimatePresence>
              {sol.outputs.map((output, i) => (
                <OutputCard key={i} output={output} accent={sol.accent} index={i} show={showOutputs} />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Problem / Solution */}
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-red-500/60 rounded-r" />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
              </div>
              <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Without AI</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">{sol.problem}</p>
          </div>
          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full rounded-r" style={{ background: `${sol.accent}90` }} />
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${sol.accent}15` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={sol.accent} strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: sol.accent }}>With Nurnex AI</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">{sol.solution}</p>
          </div>
        </div>
      </motion.div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          AI Capabilities
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sol.features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.05 + i * 0.07 }}
              className="glass rounded-2xl p-5 hover:scale-[1.03] transition-all duration-300 cursor-default group"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${sol.accent}40`; e.currentTarget.style.boxShadow = `0 4px 24px ${sol.accent}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${sol.accent}12` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sol.accent} strokeWidth="2.5">
                    <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-white text-sm font-bold">{f.label}</div>
                  <div className="text-gray-400 text-xs mt-1 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 mb-20 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10">
          {sol.description}
        </motion.p>
        <motion.a initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 }}
          href="/#contact" onClick={onClose}
          className="shimmer-btn inline-block px-10 py-4 rounded-2xl text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${sol.accent}, ${sol.accent}CC)`, boxShadow: `0 8px 32px ${sol.accent}40` }}>
          Build AI For My Business
        </motion.a>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="text-gray-500 text-xs mt-4">
          Free AI feasibility assessment - No commitment required
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ================================================================
   AI Card Preview (for grid) - brain/neural visual
   ================================================================ */

export function AiCardPreview({ solutionId }: { solutionId: string }) {
  const sol = aiSolutions.find((s) => s.id === solutionId);
  if (!sol) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${sol.accent}12, transparent 70%)` }} />

      {/* Mini AI core visualization */}
      <div className="relative z-10" style={{ width: 100, height: 100 }}>
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border opacity-20 ai-orbit" style={{ borderColor: sol.accent }} />
        <div className="absolute inset-3 rounded-full border opacity-10 ai-orbit-reverse" style={{ borderColor: sol.accent, borderStyle: "dashed" }} />

        {/* Core */}
        <div className="absolute inset-6 rounded-full flex items-center justify-center ai-core-pulse"
          style={{ background: `radial-gradient(circle, ${sol.accent}25, transparent)` }}>
          <div className="w-10 h-10 rounded-full glass-strong flex items-center justify-center"
            style={{ boxShadow: `0 0 20px ${sol.accent}30` }}>
            <svg viewBox="0 0 24 24" fill="none" stroke={sol.accent} strokeWidth="1.5" className="w-5 h-5">
              <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z" />
            </svg>
          </div>
        </div>

        {/* Orbiting dot */}
        <div className="absolute inset-0 ai-orbit">
          <div className="absolute top-0 left-1/2 -translate-x-1/2">
            <div className="w-2 h-2 rounded-full" style={{ background: sol.accent, boxShadow: `0 0 6px ${sol.accent}` }} />
          </div>
        </div>
      </div>

      {/* Small label */}
      <div className="absolute bottom-12 text-center">
        <div className="text-[9px] uppercase tracking-wider font-bold" style={{ color: sol.accent, opacity: 0.7 }}>
          AI-Powered
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card via-card/80 to-transparent" />
    </div>
  );
}

/* ================================================================
   Check if a solution ID is an AI solution
   ================================================================ */

export function isAiSolution(solutionId: string): boolean {
  return aiSolutions.some((s) => s.id === solutionId);
}
