"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================================================================
   Types
   ================================================================ */

interface Stage {
  icon: React.ReactNode;
  title: string;
  desc: string;
  subItems?: string[];
}

interface Annotation {
  side: "left" | "right";
  label: string;
  desc: string;
}

interface Feature {
  label: string;
  desc: string;
}

interface ImpactMetric {
  value: string;
  label: string;
}

interface SolutionDef {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  accentBg: string;
  category: "power-automate" | "data" | "ai";
  categoryLabel: string;
  layout: "flow" | "layers" | "pipeline";
  stages: Stage[];
  annotations: Annotation[];
  features: Feature[];
  tags: string[];
  metrics: ImpactMetric[];
  problem: string;
  solution: string;
}

/* ================================================================
   Icons
   ================================================================ */

const icons = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 4L12 13 2 4" />
    </svg>
  ),
  scan: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M8 12h8M8 8h3M8 16h5" />
    </svg>
  ),
  check: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M9 12l2 2 4-4" /><circle cx="12" cy="12" r="10" />
    </svg>
  ),
  route: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M16 3h5v5M4 20L20.5 3.5M21 16v5h-5M15 15l5.5 5.5M4 4l5 5" />
    </svg>
  ),
  database: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4.03 3-9 3s-9-1.34-9-3" />
      <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
    </svg>
  ),
  lightning: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  ),
  calendar: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="3" y="4" width="18" height="18" rx="2" /><path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  ),
  people: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  bell: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  ),
  alert: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82Z" />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
    </svg>
  ),
  assign: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
      <path d="M19 8v6M22 11h-6" />
    </svg>
  ),
  track: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  ),
  report: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
    </svg>
  ),
  sources: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="2" y="2" width="8" height="8" rx="1" /><rect x="14" y="2" width="8" height="8" rx="1" />
      <rect x="2" y="14" width="8" height="8" rx="1" /><rect x="14" y="14" width="8" height="8" rx="1" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 2L2 7l10 5 10-5-10-5Z" /><path d="M2 12l10 5 10-5" /><path d="M2 17l10 5 10-5" />
    </svg>
  ),
  transform: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M4 12a8 8 0 0 1 13.7-5.6L20 8.5" /><path d="M20 3.5v5h-5" />
      <path d="M20 12a8 8 0 0 1-13.7 5.6L4 15.5" /><path d="M4 20.5v-5h5" />
    </svg>
  ),
  gold: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2Z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M7 14l3-3 2 2 5-5" />
    </svg>
  ),
  snowpipe: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M22 12h-6l-2 3h-4l-2-3H2" />
      <path d="M5.45 5.11L2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11Z" />
    </svg>
  ),
  model: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.5-1.5 4.5-3 6l-4 5-4-5c-1.5-1.5-3-3.5-3-6a7 7 0 0 1 7-7Z" />
      <circle cx="12" cy="9" r="2" />
    </svg>
  ),
  share: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
      <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  ),
  doc: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
      <path d="M14 2v6h6" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M9.5 2A5.5 5.5 0 0 0 5 9c0 1.5.5 2.5 1.5 3.5L9 15v2h6v-2l2.5-2.5c1-1 1.5-2 1.5-3.5A5.5 5.5 0 0 0 14.5 2" />
      <path d="M12 2v7M9 19h6M10 22h4" />
    </svg>
  ),
  sparkle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8Z" />
      <path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8Z" />
    </svg>
  ),
  output: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M9 17H5a2 2 0 0 0-2 2m14-2h4a2 2 0 0 1 2 2" /><path d="M12 3v12m0 0l4-4m-4 4l-4-4" />
    </svg>
  ),
  history: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <path d="M3 3v5h5" /><path d="M3.05 13A9 9 0 1 0 6 5.3L3 8" /><path d="M12 7v5l4 2" />
    </svg>
  ),
  gear: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  target: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
    </svg>
  ),
  dashboard: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
      <rect x="3" y="3" width="7" height="9" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" />
      <rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="16" width="7" height="5" rx="1" />
    </svg>
  ),
};

/* ================================================================
   Solution Data
   ================================================================ */

const solutions: SolutionDef[] = [
  {
    id: "invoice-automation",
    title: "Invoice Processing Automation",
    subtitle: "Zero-touch invoices from receipt to ledger",
    description: "Eliminate manual invoice data entry. Invoices arrive by email or scan, AI extracts every field, policies are checked automatically, and the right manager approves with one tap. Approved invoices post to your ERP with a complete audit trail.",
    accent: "#0078D4", accentBg: "#D6ECFF",
    category: "power-automate", categoryLabel: "Power Automate", layout: "flow",
    tags: ["Invoices", "Automation", "Approvals", "AI"],
    metrics: [
      { value: "85%", label: "Faster Processing" },
      { value: "99.5%", label: "Extraction Accuracy" },
      { value: "$240K", label: "Saved Annually" },
    ],
    problem: "Your team manually enters invoice data, chases approvals via email, and spends hours matching POs. Errors slip through. Auditors ask questions. Staff time is wasted.",
    solution: "AI reads every invoice automatically. Policy checks run in milliseconds. Approvals route to the right person instantly. Your ERP stays current without anyone touching a keyboard.",
    stages: [
      { icon: icons.email, title: "Receive", desc: "Invoice arrives via email or scan", subItems: ["Email trigger", "SharePoint upload", "Scanner feed"] },
      { icon: icons.scan, title: "AI Extract", desc: "OCR reads all fields automatically", subItems: ["Vendor name", "Amount", "Line items", "Due date"] },
      { icon: icons.check, title: "Validate", desc: "Policy rules checked in real time", subItems: ["Budget limit", "Duplicate check", "PO match"] },
      { icon: icons.route, title: "Approve", desc: "Routed to the right manager", subItems: ["Amount threshold", "Department head", "Email + Teams"] },
      { icon: icons.database, title: "Post to ERP", desc: "Approved invoice posted to ledger", subItems: ["Journal entry", "Audit trail", "Confirmation"] },
    ],
    annotations: [
      { side: "left", label: "AI-Powered Extraction", desc: "Azure AI reads invoices with 99%+ accuracy" },
      { side: "left", label: "Policy Compliance Engine", desc: "Auto-validates against your spending rules" },
      { side: "right", label: "Smart Approval Routing", desc: "Routes by amount, department, and vendor" },
      { side: "right", label: "Full Audit Trail", desc: "Every step logged for compliance and audit" },
    ],
    features: [
      { label: "Zero Manual Entry", desc: "AI extracts vendor, amount, line items, and dates" },
      { label: "Policy Auto-Check", desc: "Budget limits, duplicate detection, PO matching" },
      { label: "Multi-Level Approvals", desc: "Amount-based routing with escalation rules" },
      { label: "ERP Integration", desc: "Posts directly to your accounting system" },
      { label: "Exception Handling", desc: "Flags issues for human review before posting" },
      { label: "Audit & Compliance", desc: "Complete trail from receipt to ledger entry" },
    ],
  },
  {
    id: "leave-management",
    title: "Employee Leave Management",
    subtitle: "One-tap leave requests with automatic routing",
    description: "Employees request time off from Teams or their phone. The flow checks balances, routes to the right manager, updates the shared calendar, notifies HR, and sends confirmation. No more email chains or spreadsheet tracking.",
    accent: "#008272", accentBg: "#D4F5EF",
    category: "power-automate", categoryLabel: "Power Automate", layout: "flow",
    tags: ["HR", "Leave", "Approvals", "Teams"],
    metrics: [
      { value: "3 min", label: "Average Request Time" },
      { value: "100%", label: "Digital Process" },
      { value: "0", label: "Manual Errors" },
    ],
    problem: "Leave requests happen via email. Managers forget to respond. HR updates spreadsheets manually. Calendars are always out of date. Nobody knows who is available next week.",
    solution: "One tap from Teams. Balance checked instantly. Manager approves on their phone. Calendar updates automatically. Everyone sees who is in and who is out.",
    stages: [
      { icon: icons.calendar, title: "Request", desc: "Employee submits from Teams or app", subItems: ["Date range", "Leave type", "Delegate"] },
      { icon: icons.people, title: "Manager Review", desc: "Manager approves or requests changes", subItems: ["Teams notification", "One-tap approve", "Comments"] },
      { icon: icons.check, title: "HR Process", desc: "Balance deducted and recorded", subItems: ["Balance check", "Accrual update", "Policy validation"] },
      { icon: icons.calendar, title: "Calendar Update", desc: "Shared calendar auto-updated", subItems: ["Outlook sync", "Team visibility", "Delegate activated"] },
      { icon: icons.bell, title: "Confirmation", desc: "Employee and team notified", subItems: ["Email confirm", "Teams message", "Manager summary"] },
    ],
    annotations: [
      { side: "left", label: "Teams & Mobile First", desc: "Request leave without leaving Teams" },
      { side: "left", label: "Auto Balance Check", desc: "Validates available days before routing" },
      { side: "right", label: "Calendar Sync", desc: "Outlook and team calendars updated instantly" },
      { side: "right", label: "Full Visibility", desc: "Managers see team availability at a glance" },
    ],
    features: [
      { label: "Teams Integration", desc: "Submit and approve directly from Microsoft Teams" },
      { label: "Balance Tracking", desc: "Real-time leave balances by type and employee" },
      { label: "Auto Calendar Sync", desc: "Outlook and shared calendars updated automatically" },
      { label: "Delegation Rules", desc: "Auto-assign delegate when employee is away" },
      { label: "Policy Enforcement", desc: "Block requests that violate leave policies" },
      { label: "Analytics Dashboard", desc: "Leave trends, peak periods, and utilization reports" },
    ],
  },
  {
    id: "incident-response",
    title: "Incident Response & Escalation",
    subtitle: "From alert to resolution with automatic escalation",
    description: "When something breaks, every second counts. This flow detects incidents from monitoring alerts, classifies severity, assigns to the right team, tracks resolution progress, and escalates if SLAs are at risk.",
    accent: "#D83B01", accentBg: "#FFE0D1",
    category: "power-automate", categoryLabel: "Power Automate", layout: "flow",
    tags: ["IT Ops", "Incidents", "Escalation", "SLA"],
    metrics: [
      { value: "90%", label: "Faster Response" },
      { value: "99.8%", label: "SLA Compliance" },
      { value: "4x", label: "Team Coverage" },
    ],
    problem: "Alerts arrive in different inboxes. Nobody knows who is handling what. Critical issues sit unnoticed. SLAs breach because escalation depends on someone remembering to check.",
    solution: "Every alert is caught, classified, and assigned in seconds. SLA timers tick automatically. Escalation fires before deadlines pass. Post-incident reports write themselves.",
    stages: [
      { icon: icons.alert, title: "Alert", desc: "Incident detected from monitoring", subItems: ["System alert", "User report", "Threshold breach"] },
      { icon: icons.tag, title: "Classify", desc: "Auto-categorized by severity", subItems: ["Critical / High / Medium", "Category tag", "Impact scope"] },
      { icon: icons.assign, title: "Assign", desc: "Routed to the right response team", subItems: ["Skill match", "Availability", "On-call roster"] },
      { icon: icons.track, title: "Track", desc: "SLA timer with auto-escalation", subItems: ["Live timer", "Status updates", "Escalation rules"] },
      { icon: icons.report, title: "Resolve", desc: "Close ticket and generate report", subItems: ["Root cause", "Resolution log", "Post-mortem"] },
    ],
    annotations: [
      { side: "left", label: "Multi-Source Detection", desc: "Catches alerts from monitoring, email, and user reports" },
      { side: "left", label: "AI Classification", desc: "Auto-categorizes severity and assigns priority" },
      { side: "right", label: "SLA Escalation", desc: "Automatic escalation when response time is at risk" },
      { side: "right", label: "Post-Incident Reports", desc: "Auto-generated root cause and resolution documentation" },
    ],
    features: [
      { label: "Multi-Source Alerts", desc: "Detect from monitoring tools, email, or manual report" },
      { label: "Auto-Classification", desc: "AI assigns severity, category, and priority" },
      { label: "Smart Assignment", desc: "Routes to available team members by skill" },
      { label: "SLA Monitoring", desc: "Live timers with automatic escalation chains" },
      { label: "Communication Hub", desc: "Status updates to stakeholders via Teams and email" },
      { label: "Post-Mortem Reports", desc: "Automated incident documentation and trend analysis" },
    ],
  },
  {
    id: "databricks-lakehouse",
    title: "Databricks Lakehouse Pipeline",
    subtitle: "Bronze to Gold: raw data to business-ready insights",
    description: "See how a modern Databricks lakehouse transforms raw data from dozens of sources into trusted, analytics-ready datasets. The medallion architecture ensures data quality improves at every layer.",
    accent: "#FF3621", accentBg: "#FFD6D1",
    category: "data", categoryLabel: "Data Platform", layout: "layers",
    tags: ["Databricks", "Lakehouse", "Delta Lake", "Spark"],
    metrics: [
      { value: "10x", label: "Faster Queries" },
      { value: "60%", label: "Cost Reduction" },
      { value: "PB", label: "Scale Ready" },
    ],
    problem: "Data sits in silos. Analysts wait hours for queries. Data quality is inconsistent. Nobody trusts the numbers. Engineering spends more time fixing pipelines than building new ones.",
    solution: "One unified lakehouse. Raw data lands in Bronze, gets cleaned in Silver, and serves business-ready Gold tables. Queries run 10x faster. Everyone trusts the single source of truth.",
    stages: [
      { icon: icons.sources, title: "Data Sources", desc: "Connect all your data origins", subItems: ["Databases", "APIs", "Files", "Streaming"] },
      { icon: icons.database, title: "Bronze Layer", desc: "Raw ingestion, exact copies", subItems: ["Raw landing zone", "Append-only", "Schema on read"] },
      { icon: icons.transform, title: "Silver Layer", desc: "Cleaned and conformed data", subItems: ["Deduplication", "Type casting", "Business keys"] },
      { icon: icons.gold, title: "Gold Layer", desc: "Business-ready aggregates", subItems: ["Star schema", "KPI tables", "ML features"] },
      { icon: icons.chart, title: "Consumers", desc: "Power BI, ML models, and APIs", subItems: ["Dashboards", "ML serving", "Reverse ETL"] },
    ],
    annotations: [
      { side: "left", label: "Delta Lake ACID", desc: "Reliable transactions on every table - no data corruption" },
      { side: "left", label: "Unity Catalog", desc: "Centralized governance, lineage, and access control" },
      { side: "right", label: "Auto-Scaling Spark", desc: "Clusters scale up and down based on workload" },
      { side: "right", label: "MLflow Integration", desc: "Train, track, and deploy ML models alongside data" },
    ],
    features: [
      { label: "Medallion Architecture", desc: "Bronze, Silver, Gold layers for progressive data quality" },
      { label: "Delta Lake", desc: "ACID transactions, time travel, and schema enforcement" },
      { label: "Unity Catalog", desc: "Centralized governance with fine-grained access control" },
      { label: "Auto-Scaling", desc: "Compute scales automatically to match workload" },
      { label: "MLflow", desc: "End-to-end ML lifecycle alongside your data" },
      { label: "Cost Optimization", desc: "Photon engine and spot instances cut compute costs" },
    ],
  },
  {
    id: "snowflake-analytics",
    title: "Snowflake Cloud Analytics",
    subtitle: "Scalable warehousing with zero administration",
    description: "See how Snowflake separates compute from storage to deliver instant scalability. Data flows from diverse sources through automated Snowpipe ingestion into structured models.",
    accent: "#29B5E8", accentBg: "#D4F0FA",
    category: "data", categoryLabel: "Data Platform", layout: "layers",
    tags: ["Snowflake", "Warehouse", "Analytics", "Data Sharing"],
    metrics: [
      { value: "0", label: "Admin Overhead" },
      { value: "< 1s", label: "Scale-Up Time" },
      { value: "100+", label: "Source Connectors" },
    ],
    problem: "Your warehouse is slow, expensive, and needs constant tuning. Sharing data with partners means copying files. Scaling up takes days of planning and provisioning.",
    solution: "Snowflake scales in seconds, needs zero tuning, and shares live data without copying. Your team focuses on insights, not infrastructure. Costs stay predictable with auto-suspend.",
    stages: [
      { icon: icons.sources, title: "Data Sources", desc: "SaaS, databases, files, and APIs", subItems: ["Salesforce", "SAP", "PostgreSQL", "REST APIs"] },
      { icon: icons.snowpipe, title: "Snowpipe Ingest", desc: "Continuous automated loading", subItems: ["Auto-ingest", "Streaming", "File notification"] },
      { icon: icons.layers, title: "Staging", desc: "Raw tables with auto-schema", subItems: ["Semi-structured", "Variant columns", "Metadata"] },
      { icon: icons.model, title: "Analytics Models", desc: "Star schema for fast queries", subItems: ["Dimensional model", "dbt transforms", "Tests"] },
      { icon: icons.share, title: "Data Products", desc: "Dashboards, shares, and APIs", subItems: ["Power BI", "Data shares", "Marketplace"] },
    ],
    annotations: [
      { side: "left", label: "Separation of Compute", desc: "Scale warehouses independently - pay only for what you use" },
      { side: "left", label: "Auto Snowpipe", desc: "Data loads continuously without manual scheduling" },
      { side: "right", label: "Secure Data Sharing", desc: "Share live data with partners without copying it" },
      { side: "right", label: "Near-Zero Admin", desc: "No tuning, no indexing, no vacuuming needed" },
    ],
    features: [
      { label: "Elastic Scaling", desc: "Spin up warehouses in seconds, scale to any size" },
      { label: "Snowpipe Streaming", desc: "Continuous data loading with sub-minute latency" },
      { label: "Data Sharing", desc: "Share live, governed data without copying" },
      { label: "Semi-Structured", desc: "Native support for JSON, Avro, Parquet, and XML" },
      { label: "Time Travel", desc: "Query historical data up to 90 days back" },
      { label: "dbt Integration", desc: "Modern analytics engineering with dbt transforms" },
    ],
  },
  {
    id: "document-intelligence",
    title: "Intelligent Document Processing",
    subtitle: "AI reads your documents so your team does not have to",
    description: "Invoices, contracts, forms, and applications pile up. Our AI document processing solution reads them, extracts every field with high accuracy, validates the data, and triggers the right downstream action.",
    accent: "#0078D4", accentBg: "#D6ECFF",
    category: "ai", categoryLabel: "AI Solutions", layout: "pipeline",
    tags: ["AI", "Documents", "OCR", "Extraction"],
    metrics: [
      { value: "99%+", label: "Extraction Accuracy" },
      { value: "80%", label: "Time Saved" },
      { value: "24/7", label: "Processing" },
    ],
    problem: "Staff spend hours copying data from invoices, contracts, and forms into systems. Errors creep in. Backlogs grow. High-value employees do low-value data entry.",
    solution: "AI reads every document in seconds with 99%+ accuracy. Only exceptions need human review. Your team focuses on decisions, not data entry. The backlog disappears.",
    stages: [
      { icon: icons.doc, title: "Document Input", desc: "Invoices, contracts, forms arrive", subItems: ["PDF / image upload", "Email attachment", "Scanner feed"] },
      { icon: icons.brain, title: "AI Extraction", desc: "Azure AI reads every field", subItems: ["Document Intelligence", "Custom models", "99%+ accuracy"] },
      { icon: icons.check, title: "Validate & Enrich", desc: "Cross-check with master data", subItems: ["Field validation", "Duplicate check", "Data enrichment"] },
      { icon: icons.output, title: "Structured Output", desc: "Clean data triggers actions", subItems: ["Database entry", "Approval flow", "ERP posting"] },
    ],
    annotations: [
      { side: "left", label: "Pre-Built + Custom Models", desc: "Azure AI models for invoices, receipts, contracts, and custom forms" },
      { side: "left", label: "Human-in-the-Loop", desc: "Low-confidence extractions routed to a person for review" },
      { side: "right", label: "Multi-Format Support", desc: "Handles PDFs, scans, photos, and handwritten text" },
      { side: "right", label: "Downstream Automation", desc: "Extracted data triggers approval flows and ERP posting" },
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
    accent: "#742774", accentBg: "#EDD6ED",
    category: "ai", categoryLabel: "AI Solutions", layout: "pipeline",
    tags: ["ML", "Predictions", "Forecasting", "Analytics"],
    metrics: [
      { value: "92%", label: "Model Accuracy" },
      { value: "3 mo", label: "Forecast Horizon" },
      { value: "Real-time", label: "Scoring" },
    ],
    problem: "You make decisions based on what already happened. Churn surprises you. Demand forecasts are gut feel. Anomalies surface days after the damage is done.",
    solution: "ML models trained on your history predict what happens next. Churn risk scores before customers leave. Demand forecasts plan inventory. Anomalies flag in real time.",
    stages: [
      { icon: icons.history, title: "Historical Data", desc: "Transactions, events, and metrics", subItems: ["Sales history", "Customer behavior", "Operational logs"] },
      { icon: icons.gear, title: "Feature Engineering", desc: "Transform raw data into ML features", subItems: ["Time series", "Aggregations", "Embeddings"] },
      { icon: icons.sparkle, title: "Model Training", desc: "Azure ML trains and validates", subItems: ["AutoML", "Cross-validation", "Explainability"] },
      { icon: icons.target, title: "Prediction & Scoring", desc: "Real-time and batch predictions", subItems: ["Demand forecast", "Churn score", "Anomaly flag"] },
      { icon: icons.dashboard, title: "Insights", desc: "Results in Power BI and your apps", subItems: ["Dashboard", "Alerts", "Recommended actions"] },
    ],
    annotations: [
      { side: "left", label: "Explainable AI", desc: "Every prediction comes with the factors that drove it" },
      { side: "left", label: "Auto Retraining", desc: "Models retrain on new data to stay accurate over time" },
      { side: "right", label: "Power BI Integration", desc: "Predictions surface directly in your dashboards" },
      { side: "right", label: "Accuracy Monitoring", desc: "Continuous tracking of prediction quality vs actuals" },
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
   Floating Background Orbs
   ================================================================ */

function FloatingOrbs({ accent }: { accent: string }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07] orb-drift-1"
        style={{ background: accent }} />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05] orb-drift-2"
        style={{ background: accent }} />
      <div className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.04] orb-drift-3"
        style={{ background: accent }} />
    </div>
  );
}

/* ================================================================
   Impact Metrics Bar
   ================================================================ */

function ImpactMetrics({ metrics, accent }: { metrics: ImpactMetric[]; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-3xl mx-auto mb-12"
    >
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 200, damping: 15 }}
          className="glass-strong rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-center min-w-[120px] group hover:scale-105 transition-transform duration-300"
        >
          <div className="text-2xl sm:text-3xl font-bold mb-1 gradient-text"
            style={{ backgroundImage: `linear-gradient(135deg, ${accent}, white)` }}>
            {m.value}
          </div>
          <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">
            {m.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ================================================================
   Flow Arrow with animated particles
   ================================================================ */

function FlowArrow({ accent, vertical }: { accent: string; vertical?: boolean }) {
  return (
    <div className={`flex items-center justify-center relative ${vertical ? "py-1.5" : "px-1"}`}>
      <svg
        width={vertical ? 20 : 44}
        height={vertical ? 34 : 20}
        viewBox={vertical ? "0 0 20 34" : "0 0 44 20"}
        className="flex-shrink-0"
      >
        {vertical ? (
          <>
            <line x1="10" y1="0" x2="10" y2="26" stroke={accent} strokeWidth="2" strokeDasharray="4 3" strokeOpacity="0.4"
              className="animate-flow-vertical" />
            <polygon points="6,24 10,34 14,24" fill={accent} fillOpacity="0.6" />
          </>
        ) : (
          <>
            <line x1="0" y1="10" x2="34" y2="10" stroke={accent} strokeWidth="2" strokeDasharray="4 3" strokeOpacity="0.4"
              className="animate-flow-horizontal" />
            <polygon points="32,5 44,10 32,15" fill={accent} fillOpacity="0.6" />
          </>
        )}
      </svg>
      {/* Animated particle */}
      <div className={`absolute ${vertical ? "particle-v" : "particle-h"}`}
        style={{ [vertical ? "top" : "left"]: 0 }}>
        <div className="w-1.5 h-1.5 rounded-full" style={{ background: accent, boxShadow: `0 0 6px ${accent}` }} />
      </div>
    </div>
  );
}

/* ================================================================
   Glass Stage Card
   ================================================================ */

function StageCard({
  stage, accent, index, activeIndex, layout,
}: {
  stage: Stage; accent: string; index: number; activeIndex: number; layout: string;
}) {
  const isActive = index === activeIndex;
  const layerLabels = ["Source", "Ingest", "Process", "Model", "Serve"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.5, type: "spring", stiffness: 120 }}
      className={`relative rounded-2xl transition-all duration-500 ${
        layout === "flow" ? "min-w-[140px] sm:min-w-[155px]" :
        layout === "layers" ? "min-w-[130px] sm:min-w-[150px]" :
        "min-w-[140px] sm:min-w-[165px]"
      } ${isActive ? "glass-strong" : "glass"}`}
      style={{
        boxShadow: isActive
          ? `0 0 30px ${accent}25, 0 8px 32px rgba(0,0,0,0.3)`
          : "0 4px 16px rgba(0,0,0,0.2)",
        transform: isActive ? "translateY(-4px)" : "translateY(0)",
      }}
    >
      {/* Active glow ring */}
      {isActive && (
        <div className="absolute -inset-px rounded-2xl opacity-60"
          style={{ background: `linear-gradient(135deg, ${accent}40, transparent, ${accent}20)` }} />
      )}

      <div className="relative p-3 sm:p-4">
        {/* Layer label */}
        {layout === "layers" && (
          <div className="text-[9px] uppercase tracking-[0.15em] mb-2 font-bold"
            style={{ color: isActive ? accent : "#6B7280" }}>
            {layerLabels[index] || ""}
          </div>
        )}

        {/* Step number */}
        <div className="flex items-start justify-between mb-2">
          <div className="p-1.5 rounded-xl transition-all duration-300"
            style={{ background: isActive ? `${accent}20` : "rgba(255,255,255,0.04)", color: isActive ? accent : "#8B9DB5" }}>
            {stage.icon}
          </div>
          <span className="text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center"
            style={{ background: isActive ? accent : "rgba(255,255,255,0.06)", color: isActive ? "white" : "#6B7280" }}>
            {index + 1}
          </span>
        </div>

        <h4 className="text-white text-xs sm:text-sm font-bold mb-1">{stage.title}</h4>
        <p className="text-gray-400 text-[10px] sm:text-xs leading-relaxed mb-2">{stage.desc}</p>

        {/* Sub items with stagger */}
        {stage.subItems && (
          <div className="space-y-0.5">
            {stage.subItems.map((item, i) => (
              <motion.div
                key={i}
                initial={false}
                animate={{ opacity: isActive ? 1 : 0.5 }}
                className="flex items-center gap-1.5 text-[9px] sm:text-[10px]"
                style={{ color: isActive ? `${accent}DD` : "#6B7280" }}
              >
                <div className="w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: isActive ? accent : "#4B5563" }} />
                {item}
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Active indicator pulse */}
      {isActive && (
        <motion.div
          className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full"
          style={{ background: accent, boxShadow: `0 0 12px ${accent}` }}
          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ================================================================
   Glass Annotation
   ================================================================ */

function AnnotationItem({
  annotation, accent, index, isVisible,
}: {
  annotation: Annotation; accent: string; index: number; isVisible: boolean;
}) {
  const isLeft = annotation.side === "left";
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + index * 0.15, type: "spring", stiffness: 80 }}
      className={`flex items-center gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`flex-1 glass rounded-xl p-4 ${isLeft ? "text-right" : "text-left"} group hover:scale-[1.02] transition-transform duration-300`}
        style={{ borderColor: `${accent}15` }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${accent}40`; }}
        onMouseLeave={(e) => { e.currentTarget.style.borderColor = `${accent}15`; }}>
        <div className="text-white text-sm font-bold mb-0.5">{annotation.label}</div>
        <div className="text-gray-400 text-xs leading-relaxed">{annotation.desc}</div>
      </div>

      {/* Connecting line + pulse dot */}
      <div className="flex items-center gap-0">
        {isLeft && <div className="w-6 sm:w-10 h-px opacity-30" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />}
        <div className="relative w-3 h-3 flex-shrink-0">
          <div className="absolute inset-0 rounded-full" style={{ background: accent }} />
          <motion.div className="absolute inset-0 rounded-full"
            animate={{ scale: [1, 2.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: index * 0.4 }}
            style={{ background: accent }} />
        </div>
        {!isLeft && <div className="w-6 sm:w-10 h-px opacity-30" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />}
      </div>
    </motion.div>
  );
}

/* ================================================================
   Problem / Solution Section
   ================================================================ */

function ProblemSolution({ problem, solution, accent }: { problem: string; solution: string; accent: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Problem */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/60 rounded-r" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </div>
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Without This</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{problem}</p>
        </div>

        {/* Solution */}
        <div className="glass rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-1 h-full rounded-r" style={{ background: `${accent}90` }} />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <span className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>With Nurnex</span>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed">{solution}</p>
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   Category icons for demo page
   ================================================================ */

const categoryIconMap: Record<string, React.ReactNode> = {
  "power-automate": icons.lightning,
  data: icons.layers,
  ai: icons.sparkle,
};

/* ================================================================
   Main Showcase View
   ================================================================ */

export function SolutionShowcaseView({ solutionId, onClose }: { solutionId: string; onClose: () => void }) {
  const sol = solutions.find((s) => s.id === solutionId);
  const [activeStage, setActiveStage] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(false);

  const nextStage = useCallback(() => {
    if (!sol) return;
    setActiveStage((s) => (s + 1) % sol.stages.length);
  }, [sol]);

  useEffect(() => {
    const t = setTimeout(() => setShowAnnotations(true), 500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextStage, 3500);
    return () => clearInterval(interval);
  }, [nextStage]);

  if (!sol) return null;

  const leftAnns = sol.annotations.filter((a) => a.side === "left");
  const rightAnns = sol.annotations.filter((a) => a.side === "right");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#050A12] overflow-y-auto"
    >
      <FloatingOrbs accent={sol.accent} />

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
          className="inline-flex items-center gap-2 glass rounded-full px-5 py-2 text-xs font-semibold mb-5"
          style={{ color: sol.accent, borderColor: `${sol.accent}25` }}>
          {categoryIconMap[sol.category]}
          {sol.categoryLabel}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 gradient-text"
          style={{ backgroundImage: `linear-gradient(135deg, white 30%, ${sol.accent})` }}
        >
          {sol.title}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto"
        >
          {sol.subtitle}
        </motion.p>
      </div>

      {/* Impact Metrics */}
      <div className="relative z-10">
        <ImpactMetrics metrics={sol.metrics} accent={sol.accent} />
      </div>

      {/* Flow + Annotations */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-5">
          {/* Left annotations */}
          <div className="hidden lg:flex flex-col justify-center gap-6 flex-1 max-w-[280px]">
            {leftAnns.map((a, i) => (
              <AnnotationItem key={i} annotation={a} accent={sol.accent} index={i} isVisible={showAnnotations} />
            ))}
          </div>

          {/* Stage Flow */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="flex-shrink-0">
            {/* Desktop: horizontal */}
            <div className="hidden sm:flex items-start gap-0">
              {sol.stages.map((stage, i) => (
                <div key={i} className="flex items-start">
                  <div onClick={() => setActiveStage(i)} className="cursor-pointer">
                    <StageCard stage={stage} accent={sol.accent} index={i} activeIndex={activeStage} layout={sol.layout} />
                  </div>
                  {i < sol.stages.length - 1 && (
                    <div className="flex items-center self-center mt-12">
                      <FlowArrow accent={sol.accent} />
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: vertical */}
            <div className="sm:hidden flex flex-col items-center gap-0 max-w-[300px] mx-auto">
              {sol.stages.map((stage, i) => (
                <div key={i} className="flex flex-col items-center w-full">
                  <div onClick={() => setActiveStage(i)} className="cursor-pointer w-full">
                    <StageCard stage={stage} accent={sol.accent} index={i} activeIndex={activeStage} layout={sol.layout} />
                  </div>
                  {i < sol.stages.length - 1 && <FlowArrow accent={sol.accent} vertical />}
                </div>
              ))}
            </div>

            {/* Nav dots */}
            <div className="flex items-center justify-center gap-4 mt-6">
              {sol.stages.map((stage, i) => (
                <button key={i} onClick={() => setActiveStage(i)} className="flex flex-col items-center gap-1.5 group">
                  <div className="w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                      background: i === activeStage ? sol.accent : "rgba(255,255,255,0.1)",
                      boxShadow: i === activeStage ? `0 0 12px ${sol.accent}80` : "none",
                      transform: i === activeStage ? "scale(1.5)" : "scale(1)",
                    }} />
                  <span className={`text-[10px] transition-colors hidden sm:block ${
                    i === activeStage ? "text-white font-medium" : "text-gray-600"
                  }`}>{stage.title}</span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right annotations */}
          <div className="hidden lg:flex flex-col justify-center gap-6 flex-1 max-w-[280px]">
            {rightAnns.map((a, i) => (
              <AnnotationItem key={i} annotation={a} accent={sol.accent} index={i + 2} isVisible={showAnnotations} />
            ))}
          </div>
        </div>

        {/* Mobile annotations */}
        <div className="lg:hidden mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sol.annotations.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="glass rounded-xl p-4 flex items-start gap-3 hover:scale-[1.02] transition-transform">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style={{ background: sol.accent }} />
              <div>
                <div className="text-white text-sm font-bold">{a.label}</div>
                <div className="text-gray-400 text-xs mt-0.5">{a.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Problem / Solution */}
      <div className="relative z-10">
        <ProblemSolution problem={sol.problem} solution={sol.solution} accent={sol.accent} />
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          Key Capabilities
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sol.features.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.07 }}
              className="glass rounded-2xl p-5 group hover:scale-[1.03] transition-all duration-300 cursor-default"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${sol.accent}40`; e.currentTarget.style.boxShadow = `0 4px 20px ${sol.accent}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors duration-300"
                  style={{ background: `${sol.accent}12` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={sol.accent} strokeWidth="2.5">
                    <path d="M20 6L9 17l-5-5" />
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

      {/* Description + CTA */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 mb-20 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10">
          {sol.description}
        </motion.p>

        <motion.a
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
          href="/#contact"
          onClick={onClose}
          className="shimmer-btn inline-block px-10 py-4 rounded-2xl text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${sol.accent}, ${sol.accent}CC)`, boxShadow: `0 8px 32px ${sol.accent}40` }}
        >
          Build This For My Business
        </motion.a>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="text-gray-500 text-xs mt-4"
        >
          Free discovery call - No commitment required
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ================================================================
   Card Preview (enhanced with glass + glow)
   ================================================================ */

export function SolutionCardPreview({ solutionId }: { solutionId: string }) {
  const sol = solutions.find((s) => s.id === solutionId);
  if (!sol) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0"
        style={{ background: `radial-gradient(ellipse at center, ${sol.accent}12, transparent 70%)` }} />

      {/* Mini flow preview */}
      <div className="relative flex items-center gap-1.5 z-10">
        {sol.stages.slice(0, 4).map((stage, i) => (
          <div key={i} className="flex items-center gap-1.5">
            <div className="w-[62px] h-[62px] rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all duration-300"
              style={{
                background: i === 0 ? `${sol.accent}18` : "rgba(255,255,255,0.03)",
                border: `1px solid ${i === 0 ? `${sol.accent}35` : "rgba(255,255,255,0.06)"}`,
                boxShadow: i === 0 ? `0 0 16px ${sol.accent}15` : "none",
              }}>
              <div style={{ color: i === 0 ? sol.accent : "#6B7280" }} className="scale-[0.7]">{stage.icon}</div>
              <span className="text-[6.5px] text-gray-500 leading-tight text-center px-0.5 font-medium">{stage.title}</span>
            </div>
            {i < 3 && (
              <svg width="14" height="8" viewBox="0 0 14 8" className="flex-shrink-0">
                <line x1="0" y1="4" x2="9" y2="4" stroke={sol.accent} strokeWidth="1.5" strokeOpacity="0.3" strokeDasharray="2 2" />
                <polygon points="8,1.5 14,4 8,6.5" fill={sol.accent} fillOpacity="0.35" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-card via-card/80 to-transparent" />
    </div>
  );
}

/* ================================================================
   Exports
   ================================================================ */

export interface SolutionMeta {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  accent: string;
  category: "power-automate" | "data" | "ai";
  categoryLabel: string;
}

export const solutionMetas: SolutionMeta[] = solutions.map((s) => ({
  id: s.id,
  title: s.title,
  subtitle: s.subtitle,
  tags: s.tags,
  accent: s.accent,
  category: s.category,
  categoryLabel: s.categoryLabel,
}));
