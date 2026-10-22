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
}

/* ================================================================
   Shared small SVG icon builders
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
   Solution Data: 7 Showcases
   ================================================================ */

const solutions: SolutionDef[] = [
  /* ?? Power Automate 1: Invoice Processing ???????????? */
  {
    id: "invoice-automation",
    title: "Invoice Processing Automation",
    subtitle: "Zero-touch invoices from receipt to ledger",
    description:
      "Eliminate manual invoice data entry. Invoices arrive by email or scan, " +
      "AI extracts every field, policies are checked automatically, and the right " +
      "manager approves with one tap. Approved invoices post to your ERP with a " +
      "complete audit trail.",
    accent: "#0078D4",
    accentBg: "#D6ECFF",
    category: "power-automate",
    categoryLabel: "Power Automate",
    layout: "flow",
    tags: ["Invoices", "Automation", "Approvals", "AI"],
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

  /* ?? Power Automate 2: Employee Leave ???????????????? */
  {
    id: "leave-management",
    title: "Employee Leave Management",
    subtitle: "One-tap leave requests with automatic routing",
    description:
      "Employees request time off from Teams or their phone. The flow checks " +
      "balances, routes to the right manager, updates the shared calendar, notifies " +
      "HR, and sends confirmation. No more email chains or spreadsheet tracking.",
    accent: "#008272",
    accentBg: "#D4F5EF",
    category: "power-automate",
    categoryLabel: "Power Automate",
    layout: "flow",
    tags: ["HR", "Leave", "Approvals", "Teams"],
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

  /* ?? Power Automate 3: Incident Response ????????????? */
  {
    id: "incident-response",
    title: "Incident Response & Escalation",
    subtitle: "From alert to resolution with automatic escalation",
    description:
      "When something breaks, every second counts. This flow detects incidents " +
      "from monitoring alerts, classifies severity, assigns to the right team, " +
      "tracks resolution progress, and escalates if SLAs are at risk. Full " +
      "post-incident reporting is generated automatically.",
    accent: "#D83B01",
    accentBg: "#FFE0D1",
    category: "power-automate",
    categoryLabel: "Power Automate",
    layout: "flow",
    tags: ["IT Ops", "Incidents", "Escalation", "SLA"],
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

  /* ?? Data Architecture 1: Databricks Lakehouse ??????? */
  {
    id: "databricks-lakehouse",
    title: "Databricks Lakehouse Pipeline",
    subtitle: "Bronze to Gold: raw data to business-ready insights",
    description:
      "See how a modern Databricks lakehouse transforms raw data from dozens of " +
      "sources into trusted, analytics-ready datasets. The medallion architecture " +
      "(Bronze, Silver, Gold) ensures data quality improves at every layer, " +
      "with Unity Catalog providing governance across the entire platform.",
    accent: "#FF3621",
    accentBg: "#FFD6D1",
    category: "data",
    categoryLabel: "Data Platform",
    layout: "layers",
    tags: ["Databricks", "Lakehouse", "Delta Lake", "Spark"],
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

  /* ?? Data Architecture 2: Snowflake Cloud ???????????? */
  {
    id: "snowflake-analytics",
    title: "Snowflake Cloud Analytics",
    subtitle: "Scalable warehousing with zero administration",
    description:
      "See how Snowflake separates compute from storage to deliver instant " +
      "scalability. Data flows from diverse sources through automated Snowpipe " +
      "ingestion, lands in structured models, and serves dashboards, data shares, " +
      "and APIs with near-zero maintenance.",
    accent: "#29B5E8",
    accentBg: "#D4F0FA",
    category: "data",
    categoryLabel: "Data Platform",
    layout: "layers",
    tags: ["Snowflake", "Warehouse", "Analytics", "Data Sharing"],
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

  /* ?? AI 1: Document Intelligence ????????????????????? */
  {
    id: "document-intelligence",
    title: "Intelligent Document Processing",
    subtitle: "AI reads your documents so your team does not have to",
    description:
      "Invoices, contracts, forms, and applications pile up. Our AI document " +
      "processing solution reads them, extracts every field with high accuracy, " +
      "validates the data, and triggers the right downstream action. Humans " +
      "review only exceptions, not every single document.",
    accent: "#0078D4",
    accentBg: "#D6ECFF",
    category: "ai",
    categoryLabel: "AI Solutions",
    layout: "pipeline",
    tags: ["AI", "Documents", "OCR", "Extraction"],
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

  /* ?? AI 2: Predictive Analytics ?????????????????????? */
  {
    id: "predictive-analytics",
    title: "Predictive Analytics Engine",
    subtitle: "Your historical data predicts what happens next",
    description:
      "Turn years of transaction, sales, and operations data into forward-looking " +
      "predictions. We build ML models that forecast demand, score churn risk, " +
      "detect anomalies, and surface insights - all delivered inside Power BI " +
      "dashboards your team already uses.",
    accent: "#742774",
    accentBg: "#EDD6ED",
    category: "ai",
    categoryLabel: "AI Solutions",
    layout: "pipeline",
    tags: ["ML", "Predictions", "Forecasting", "Analytics"],
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
   Arrow Component (animated connecting arrow)
   ================================================================ */

function FlowArrow({ accent, vertical }: { accent: string; vertical?: boolean }) {
  return (
    <div className={`flex items-center justify-center ${vertical ? "py-1" : "px-0 sm:px-1"}`}>
      <svg
        width={vertical ? 20 : 40}
        height={vertical ? 30 : 20}
        viewBox={vertical ? "0 0 20 30" : "0 0 40 20"}
        className="flex-shrink-0"
      >
        {vertical ? (
          <>
            <line x1="10" y1="0" x2="10" y2="24" stroke={accent} strokeWidth="2" strokeDasharray="4 3"
              className="animate-flow-vertical" />
            <polygon points="6,22 10,30 14,22" fill={accent} />
          </>
        ) : (
          <>
            <line x1="0" y1="10" x2="32" y2="10" stroke={accent} strokeWidth="2" strokeDasharray="4 3"
              className="animate-flow-horizontal" />
            <polygon points="30,5 40,10 30,15" fill={accent} />
          </>
        )}
      </svg>
    </div>
  );
}

/* ================================================================
   Stage Card Component
   ================================================================ */

function StageCard({
  stage,
  accent,
  index,
  activeIndex,
  layout,
}: {
  stage: Stage;
  accent: string;
  index: number;
  activeIndex: number;
  layout: "flow" | "layers" | "pipeline";
}) {
  const isActive = index === activeIndex;

  const layerLabels = ["Source", "Ingest", "Process", "Model", "Serve"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      className={`relative rounded-xl border p-3 sm:p-4 transition-all duration-500 ${
        layout === "flow" ? "min-w-[140px] sm:min-w-[160px]" :
        layout === "layers" ? "min-w-[130px] sm:min-w-[150px]" :
        "min-w-[140px] sm:min-w-[170px]"
      }`}
      style={{
        background: isActive ? `${accent}15` : "rgba(14,42,66,0.6)",
        borderColor: isActive ? `${accent}50` : "rgba(255,255,255,0.08)",
        boxShadow: isActive ? `0 0 20px ${accent}20` : "none",
      }}
    >
      {/* Layer label for architecture layout */}
      {layout === "layers" && (
        <div className="text-[9px] uppercase tracking-widest mb-1.5 font-semibold"
          style={{ color: isActive ? accent : "#6B7280" }}>
          {layerLabels[index] || ""}
        </div>
      )}

      {/* Icon */}
      <div className="mb-2 transition-colors duration-300" style={{ color: isActive ? accent : "#8B9DB5" }}>
        {stage.icon}
      </div>

      {/* Title */}
      <h4 className="text-white text-xs sm:text-sm font-semibold mb-1">{stage.title}</h4>
      <p className="text-muted text-[10px] sm:text-xs leading-relaxed mb-2">{stage.desc}</p>

      {/* Sub items */}
      {stage.subItems && (
        <div className="space-y-0.5">
          {stage.subItems.map((item, i) => (
            <div key={i} className="flex items-center gap-1.5 text-[9px] sm:text-[10px]"
              style={{ color: isActive ? `${accent}CC` : "#6B7280" }}>
              <div className="w-1 h-1 rounded-full flex-shrink-0" style={{ background: isActive ? accent : "#4B5563" }} />
              {item}
            </div>
          ))}
        </div>
      )}

      {/* Active pulse dot */}
      {isActive && (
        <motion.div
          className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
          style={{ background: accent }}
          animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}

/* ================================================================
   Annotation Item (reused from power-app-showcase pattern)
   ================================================================ */

function AnnotationItem({
  annotation,
  accent,
  index,
  isVisible,
}: {
  annotation: Annotation;
  accent: string;
  index: number;
  isVisible: boolean;
}) {
  const isLeft = annotation.side === "left";

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={isVisible ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.15 }}
      className={`flex items-start gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"} ${isLeft ? "text-right" : "text-left"}`}
    >
      <div className="flex-1">
        <div className="text-white text-sm font-semibold mb-0.5">{annotation.label}</div>
        <div className="text-muted text-xs leading-relaxed">{annotation.desc}</div>
      </div>
      <div className="flex items-center gap-0 mt-1">
        {isLeft && <div className="w-6 sm:w-10 h-px opacity-40" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />}
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: accent, boxShadow: `0 0 8px ${accent}60` }}>
          <motion.div className="w-full h-full rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            style={{ background: accent }} />
        </div>
        {!isLeft && <div className="w-6 sm:w-10 h-px opacity-40" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />}
      </div>
    </motion.div>
  );
}

/* ================================================================
   Feature Icon
   ================================================================ */

function FeatureIcon({ accent }: { accent: string }) {
  return (
    <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: `${accent}15` }}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    </div>
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
    const t = setTimeout(() => setShowAnnotations(true), 600);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextStage, 3000);
    return () => clearInterval(interval);
  }, [nextStage]);

  if (!sol) return null;

  const leftAnnotations = sol.annotations.filter((a) => a.side === "left");
  const rightAnnotations = sol.annotations.filter((a) => a.side === "right");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md overflow-y-auto"
    >
      <button onClick={onClose}
        className="fixed top-4 right-4 z-[110] text-muted hover:text-white transition-colors p-2 bg-card/50 rounded-full backdrop-blur-sm"
        aria-label="Close">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      {/* Header */}
      <div className="pt-8 sm:pt-12 pb-6 text-center px-4">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium border mb-4"
          style={{ background: `${sol.accent}15`, borderColor: `${sol.accent}30`, color: sol.accent }}>
          {categoryIconMap[sol.category]}
          {sol.categoryLabel}
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
          {sol.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-muted text-base sm:text-lg max-w-xl mx-auto">
          {sol.subtitle}
        </motion.p>
      </div>

      {/* Flow Diagram + Annotations */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-4">
          {/* Left annotations */}
          <div className="hidden lg:flex flex-col justify-center gap-8 flex-1 max-w-xs">
            {leftAnnotations.map((a, i) => (
              <AnnotationItem key={i} annotation={a} accent={sol.accent} index={i} isVisible={showAnnotations} />
            ))}
          </div>

          {/* Stage flow diagram */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex-shrink-0"
          >
            {/* Glow */}
            <div className="relative">
              <div className="absolute -inset-6 rounded-3xl opacity-10 blur-3xl" style={{ background: sol.accent }} />

              {/* Desktop: horizontal flow */}
              <div className="hidden sm:flex items-start gap-0 relative">
                {sol.stages.map((stage, i) => (
                  <div key={i} className="flex items-start">
                    <div onClick={() => setActiveStage(i)} className="cursor-pointer">
                      <StageCard stage={stage} accent={sol.accent} index={i} activeIndex={activeStage} layout={sol.layout} />
                    </div>
                    {i < sol.stages.length - 1 && (
                      <div className="flex items-center self-center mt-8">
                        <FlowArrow accent={sol.accent} />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Mobile: vertical flow */}
              <div className="sm:hidden flex flex-col items-center gap-0 relative">
                {sol.stages.map((stage, i) => (
                  <div key={i} className="flex flex-col items-center w-full max-w-[280px]">
                    <div onClick={() => setActiveStage(i)} className="cursor-pointer w-full">
                      <StageCard stage={stage} accent={sol.accent} index={i} activeIndex={activeStage} layout={sol.layout} />
                    </div>
                    {i < sol.stages.length - 1 && <FlowArrow accent={sol.accent} vertical />}
                  </div>
                ))}
              </div>
            </div>

            {/* Stage nav dots */}
            <div className="flex items-center justify-center gap-3 mt-6">
              {sol.stages.map((stage, i) => (
                <button key={i} onClick={() => setActiveStage(i)} className="flex flex-col items-center gap-1.5 group">
                  <div className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      background: i === activeStage ? sol.accent : "#374151",
                      boxShadow: i === activeStage ? `0 0 8px ${sol.accent}60` : "none",
                      transform: i === activeStage ? "scale(1.4)" : "scale(1)",
                    }} />
                  <span className={`text-[10px] transition-colors hidden sm:block ${i === activeStage ? "text-white" : "text-gray-600"}`}>
                    {stage.title}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right annotations */}
          <div className="hidden lg:flex flex-col justify-center gap-8 flex-1 max-w-xs">
            {rightAnnotations.map((a, i) => (
              <AnnotationItem key={i} annotation={a} accent={sol.accent} index={i + 2} isVisible={showAnnotations} />
            ))}
          </div>
        </div>

        {/* Mobile annotations */}
        <div className="lg:hidden mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
          {sol.annotations.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="flex items-start gap-3 bg-card/50 rounded-xl p-4 border border-border/50">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style={{ background: sol.accent }} />
              <div>
                <div className="text-white text-sm font-semibold">{a.label}</div>
                <div className="text-muted text-xs mt-0.5">{a.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Features */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          className="font-display text-2xl font-bold text-white text-center mb-8">
          Key Capabilities
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sol.features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08 }}
              className="bg-card/60 border border-border/50 rounded-xl p-4 hover:border-opacity-100 transition-all group"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${sol.accent}40`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; }}>
              <div className="flex items-start gap-3">
                <FeatureIcon accent={sol.accent} />
                <div>
                  <div className="text-white text-sm font-semibold">{f.label}</div>
                  <div className="text-muted text-xs mt-0.5 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 mb-16 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
          className="text-muted text-sm sm:text-base leading-relaxed mb-8">
          {sol.description}
        </motion.p>
        <motion.a initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1 }}
          href="/#contact" onClick={onClose}
          className="inline-block px-8 py-3.5 rounded-xl text-white font-semibold text-sm tracking-wide transition-all hover:shadow-xl"
          style={{ background: sol.accent, boxShadow: `0 4px 20px ${sol.accent}40` }}>
          Build This For My Business
        </motion.a>
      </div>
    </motion.div>
  );
}

/* ================================================================
   Card Preview (mini flow diagram for grid cards)
   ================================================================ */

export function SolutionCardPreview({ solutionId }: { solutionId: string }) {
  const sol = solutions.find((s) => s.id === solutionId);
  if (!sol) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden p-4">
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${sol.accent}08, ${sol.accent}15)` }} />

      {/* Mini flow preview */}
      <div className="relative flex items-center gap-1 z-10">
        {sol.stages.slice(0, 4).map((stage, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-16 h-16 rounded-lg border flex flex-col items-center justify-center gap-0.5"
              style={{
                background: i === 0 ? `${sol.accent}15` : "rgba(14,42,66,0.6)",
                borderColor: i === 0 ? `${sol.accent}40` : "rgba(255,255,255,0.06)",
              }}>
              <div style={{ color: i === 0 ? sol.accent : "#6B7280" }} className="scale-75">
                {stage.icon}
              </div>
              <span className="text-[7px] text-gray-400 leading-tight text-center px-0.5">{stage.title}</span>
            </div>
            {i < 3 && (
              <svg width="12" height="8" viewBox="0 0 12 8" className="flex-shrink-0">
                <line x1="0" y1="4" x2="8" y2="4" stroke={sol.accent} strokeWidth="1" strokeOpacity="0.4" />
                <polygon points="7,1.5 12,4 7,6.5" fill={sol.accent} fillOpacity="0.4" />
              </svg>
            )}
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-card via-card/80 to-transparent" />
    </div>
  );
}

/* ================================================================
   Export metadata for demos page
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
