"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* ================================================================
   Types
   ================================================================ */

interface KpiItem { label: string; value: string; }
interface ListItem { text: string; status?: string; statusColor?: string; }
interface CheckItem { text: string; checked: boolean; }
interface TimelineItem { text: string; time: string; done: boolean; }
interface FormField { label: string; value?: string; }

type ScreenRow =
  | { type: "header"; title: string; showBack?: boolean; showSearch?: boolean }
  | { type: "kpis"; items: KpiItem[] }
  | { type: "section"; title: string }
  | { type: "list"; items: ListItem[] }
  | { type: "checklist"; items: CheckItem[] }
  | { type: "timeline"; items: TimelineItem[] }
  | { type: "form"; fields: FormField[] }
  | { type: "button"; label: string }
  | { type: "progress"; label: string; value: number }
  | { type: "tabs"; items: string[]; active: number }
  | { type: "chartBars"; values: number[]; labels: string[] }
  | { type: "chartDonut"; segments: { value: number; color: string }[]; center?: string }
  | { type: "gallery"; count: number; label?: string }
  | { type: "infoCard"; title: string; rows: { label: string; value: string }[] }
  | { type: "conversation"; messages: { from: string; text: string; isUser?: boolean }[] }
  | { type: "searchBar"; placeholder: string }
  | { type: "spacer" };

interface AppScreen {
  label: string;
  rows: ScreenRow[];
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

interface PowerAppDef {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  accentBg: string;
  screens: AppScreen[];
  annotations: Annotation[];
  features: Feature[];
  tags: string[];
  metrics: ImpactMetric[];
  problem: string;
  solution: string;
}

/* ================================================================
   Screen Row Renderer
   ================================================================ */

function RowRenderer({ row, accent }: { row: ScreenRow; accent: string }) {
  switch (row.type) {
    case "header":
      return (
        <div className="flex items-center gap-2 px-3 py-2.5" style={{ background: accent }}>
          {row.showBack && (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
          )}
          <span className="text-white text-[11px] font-semibold tracking-wide flex-1">{row.title}</span>
          {row.showSearch && (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
          )}
        </div>
      );

    case "kpis":
      return (
        <div className="flex gap-1.5 px-3 py-2">
          {row.items.map((k, i) => (
            <div key={i} className="flex-1 rounded-lg p-2 text-center" style={{ background: `${accent}15` }}>
              <div className="text-[13px] font-bold" style={{ color: accent }}>{k.value}</div>
              <div className="text-[7px] text-gray-500 mt-0.5">{k.label}</div>
            </div>
          ))}
        </div>
      );

    case "section":
      return <div className="px-3 pt-2 pb-1 text-[8px] font-semibold text-gray-400 uppercase tracking-wider">{row.title}</div>;

    case "list":
      return (
        <div className="px-3 space-y-1">
          {row.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-2">
              <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: item.statusColor || accent }} />
              <span className="text-[9px] text-gray-700 flex-1">{item.text}</span>
              {item.status && (
                <span className="text-[7px] px-1.5 py-0.5 rounded-full font-medium"
                  style={{ background: `${item.statusColor || accent}20`, color: item.statusColor || accent }}>
                  {item.status}
                </span>
              )}
            </div>
          ))}
        </div>
      );

    case "checklist":
      return (
        <div className="px-3 space-y-1">
          {row.items.map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-2.5 py-1.5">
              <div className="w-3.5 h-3.5 rounded border-2 flex items-center justify-center flex-shrink-0"
                style={{ borderColor: item.checked ? accent : "#D1D5DB", background: item.checked ? accent : "transparent" }}>
                {item.checked && (
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4">
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                )}
              </div>
              <span className={`text-[9px] ${item.checked ? "text-gray-400 line-through" : "text-gray-700"}`}>{item.text}</span>
            </div>
          ))}
        </div>
      );

    case "timeline":
      return (
        <div className="px-3 pl-6 space-y-0">
          {row.items.map((item, i) => (
            <div key={i} className="flex gap-2 relative pb-3">
              <div className="absolute left-0 top-0 bottom-0 flex flex-col items-center">
                <div className="w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 z-10"
                  style={{ borderColor: accent, background: item.done ? accent : "white" }} />
                {i < row.items.length - 1 && <div className="w-px flex-1" style={{ background: `${accent}30` }} />}
              </div>
              <div className="ml-4">
                <div className="text-[9px] text-gray-700 font-medium">{item.text}</div>
                <div className="text-[7px] text-gray-400">{item.time}</div>
              </div>
            </div>
          ))}
        </div>
      );

    case "form":
      return (
        <div className="px-3 space-y-2">
          {row.fields.map((f, i) => (
            <div key={i}>
              <div className="text-[7px] text-gray-500 font-medium mb-0.5">{f.label}</div>
              <div className="bg-gray-50 border border-gray-200 rounded-lg px-2.5 py-1.5 text-[9px] text-gray-400">
                {f.value || "Enter..."}
              </div>
            </div>
          ))}
        </div>
      );

    case "button":
      return (
        <div className="px-3 pt-2">
          <div className="text-center py-2 rounded-lg text-white text-[10px] font-semibold" style={{ background: accent }}>
            {row.label}
          </div>
        </div>
      );

    case "progress":
      return (
        <div className="px-3 py-1">
          <div className="flex justify-between mb-1">
            <span className="text-[8px] text-gray-600">{row.label}</span>
            <span className="text-[8px] font-semibold" style={{ color: accent }}>{row.value}%</span>
          </div>
          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${row.value}%`, background: accent }} />
          </div>
        </div>
      );

    case "tabs":
      return (
        <div className="flex gap-0 px-3 pt-1">
          {row.items.map((tab, i) => (
            <div key={i} className="flex-1 text-center py-1.5 text-[8px] font-medium border-b-2 transition-colors"
              style={{
                borderColor: i === row.active ? accent : "transparent",
                color: i === row.active ? accent : "#9CA3AF",
              }}>
              {tab}
            </div>
          ))}
        </div>
      );

    case "chartBars":
      return (
        <div className="px-3 py-2">
          <div className="flex items-end gap-1.5 h-16">
            {row.values.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                <div className="w-full rounded-t-sm" style={{ height: `${v}%`, background: `${accent}${i % 2 === 0 ? "CC" : "80"}` }} />
                <span className="text-[6px] text-gray-400">{row.labels[i]}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "chartDonut":
      return (
        <div className="flex justify-center py-3">
          <div className="relative w-20 h-20">
            <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
              {(() => {
                let offset = 0;
                return row.segments.map((seg, i) => {
                  const dash = (seg.value / 100) * 100;
                  const el = (
                    <circle key={i} cx="18" cy="18" r="15.9" fill="none" strokeWidth="3.5"
                      stroke={seg.color} strokeDasharray={`${dash} ${100 - dash}`} strokeDashoffset={`-${offset}`} />
                  );
                  offset += dash;
                  return el;
                });
              })()}
            </svg>
            {row.center && (
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-[10px] font-bold text-gray-700">{row.center}</span>
              </div>
            )}
          </div>
        </div>
      );

    case "gallery":
      return (
        <div className="px-3 py-1">
          {row.label && <div className="text-[8px] text-gray-500 mb-1">{row.label}</div>}
          <div className="grid grid-cols-3 gap-1">
            {Array.from({ length: row.count }).map((_, i) => (
              <div key={i} className="aspect-square rounded-lg bg-gray-100 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#D1D5DB" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" />
                  <path d="M21 15l-5-5L5 21" />
                </svg>
              </div>
            ))}
          </div>
        </div>
      );

    case "infoCard":
      return (
        <div className="px-3 py-1">
          <div className="bg-gray-50 rounded-xl p-2.5">
            <div className="text-[9px] font-semibold text-gray-700 mb-1.5">{row.title}</div>
            {row.rows.map((r, i) => (
              <div key={i} className="flex justify-between py-0.5">
                <span className="text-[7px] text-gray-400">{r.label}</span>
                <span className="text-[8px] text-gray-600 font-medium">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      );

    case "conversation":
      return (
        <div className="px-3 space-y-1.5 py-1">
          {row.messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.isUser ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-[80%] px-2.5 py-1.5 rounded-xl text-[8px] ${
                msg.isUser ? "text-white rounded-br-sm" : "bg-gray-100 text-gray-700 rounded-bl-sm"
              }`} style={msg.isUser ? { background: accent } : {}}>
                {!msg.isUser && <div className="text-[6px] font-semibold mb-0.5" style={{ color: accent }}>{msg.from}</div>}
                {msg.text}
              </div>
            </div>
          ))}
        </div>
      );

    case "searchBar":
      return (
        <div className="px-3 py-1">
          <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-2.5 py-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" />
            </svg>
            <span className="text-[9px] text-gray-400">{row.placeholder}</span>
          </div>
        </div>
      );

    case "spacer":
      return <div className="h-2" />;

    default:
      return null;
  }
}

/* ================================================================
   Phone Frame
   ================================================================ */

function PhoneFrame({
  children,
  accent,
  className = "",
}: {
  children: React.ReactNode;
  accent: string;
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Glow behind phone */}
      <div className="absolute -inset-8 rounded-[60px] opacity-20 blur-3xl" style={{ background: accent }} />

      {/* Phone body */}
      <div className="relative bg-[#1A1A2E] rounded-[36px] p-2 shadow-2xl shadow-black/50">
        {/* Screen */}
        <div className="bg-white rounded-[28px] overflow-hidden w-[260px]" style={{ height: 520 }}>
          {/* Status bar */}
          <div className="flex items-center justify-between px-5 py-1.5 bg-white">
            <span className="text-[9px] font-semibold text-gray-800">9:41</span>
            <div className="w-20 h-5 bg-black rounded-full" />
            <div className="flex items-center gap-1">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                <path d="M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z" />
              </svg>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="text-gray-800">
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z" />
              </svg>
            </div>
          </div>

          {/* Screen content */}
          <div className="overflow-y-auto" style={{ height: 470 }}>
            {children}
          </div>

          {/* Home indicator */}
          <div className="flex justify-center py-1.5 bg-white">
            <div className="w-24 h-1 rounded-full bg-gray-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================================================================
   App Data: 5 Power Apps
   ================================================================ */

const powerApps: PowerAppDef[] = [
  /* ?? 1. Employee Onboarding Hub ????????????????????????? */
  {
    id: "employee-onboarding",
    title: "Employee Onboarding Hub",
    subtitle: "Automated HR workflows that eliminate paperwork",
    description:
      "Transform your employee onboarding from scattered emails and paper forms " +
      "into a streamlined digital experience. New hires complete tasks, upload documents, " +
      "and track progress from day one. Managers approve and monitor everything in real time.",
    accent: "#7C3AED",
    accentBg: "#EDE9FE",
    tags: ["HR", "Onboarding", "Workflows", "Approvals"],
    metrics: [
      { value: "65%", label: "Faster Onboarding" },
      { value: "0", label: "Paper Forms" },
      { value: "100%", label: "Audit Trail" },
    ],
    problem: "New hires get lost in scattered emails, paper forms, and manual checklists. Managers forget follow-ups. IT equipment arrives late. Nobody knows the real onboarding status.",
    solution: "Every new hire gets a digital checklist that updates in real time. Documents upload securely. Approvals route automatically. Managers see exactly where every onboarding stands.",
    screens: [
      {
        label: "Dashboard",
        rows: [
          { type: "header", title: "Onboarding Hub", showSearch: true },
          { type: "kpis", items: [
            { label: "Active", value: "12" },
            { label: "Completed", value: "47" },
            { label: "Pending", value: "3" },
          ]},
          { type: "progress", label: "Q4 Onboarding Target", value: 78 },
          { type: "section", title: "New Hires This Week" },
          { type: "list", items: [
            { text: "Sarah Chen - Marketing", status: "Day 2", statusColor: "#7C3AED" },
            { text: "James Miller - Engineering", status: "Day 1", statusColor: "#059669" },
            { text: "Ana Ruiz - Sales", status: "Pre-start", statusColor: "#F59E0B" },
          ]},
          { type: "section", title: "Attention Required" },
          { type: "list", items: [
            { text: "IT Equipment - 2 pending setups", status: "Urgent", statusColor: "#EF4444" },
            { text: "Background checks - 1 delayed", status: "Review", statusColor: "#F59E0B" },
          ]},
        ],
      },
      {
        label: "Tasks",
        rows: [
          { type: "header", title: "Sarah Chen - Tasks", showBack: true },
          { type: "tabs", items: ["All Tasks", "Pending", "Completed"], active: 0 },
          { type: "progress", label: "Overall Progress", value: 65 },
          { type: "checklist", items: [
            { text: "Complete personal information form", checked: true },
            { text: "Upload government ID", checked: true },
            { text: "Sign employment agreement", checked: true },
            { text: "Set up direct deposit", checked: false },
            { text: "Complete IT security training", checked: false },
            { text: "Schedule team introduction", checked: false },
            { text: "Review company handbook", checked: false },
          ]},
        ],
      },
      {
        label: "Documents",
        rows: [
          { type: "header", title: "Document Portal", showBack: true },
          { type: "searchBar", placeholder: "Search documents..." },
          { type: "section", title: "Required Uploads" },
          { type: "list", items: [
            { text: "Government-issued ID", status: "Uploaded", statusColor: "#059669" },
            { text: "W-4 Tax Form", status: "Uploaded", statusColor: "#059669" },
            { text: "Direct Deposit Form", status: "Pending", statusColor: "#F59E0B" },
            { text: "Emergency Contact Info", status: "Missing", statusColor: "#EF4444" },
          ]},
          { type: "section", title: "Company Documents" },
          { type: "list", items: [
            { text: "Employee Handbook 2026", status: "View", statusColor: "#7C3AED" },
            { text: "Benefits Guide", status: "View", statusColor: "#7C3AED" },
          ]},
        ],
      },
      {
        label: "Approvals",
        rows: [
          { type: "header", title: "Approval Workflow", showBack: true },
          { type: "section", title: "Sarah Chen - Onboarding" },
          { type: "timeline", items: [
            { text: "HR Review - Maria Lopez", time: "Approved Oct 18", done: true },
            { text: "IT Setup Request", time: "Approved Oct 19", done: true },
            { text: "Manager Approval - David Park", time: "Pending review", done: false },
            { text: "Compliance Sign-off", time: "Waiting", done: false },
          ]},
          { type: "spacer" },
          { type: "infoCard", title: "Next Step", rows: [
            { label: "Assigned to", value: "David Park" },
            { label: "Due date", value: "Oct 24, 2026" },
            { label: "Department", value: "Marketing" },
          ]},
        ],
      },
    ],
    annotations: [
      { side: "left", label: "Live Progress Tracking", desc: "Real-time task completion status across all new hires" },
      { side: "left", label: "Smart Task Assignment", desc: "Auto-generated checklists based on role and department" },
      { side: "right", label: "Secure Document Portal", desc: "Upload, verify, and store HR documents with audit trails" },
      { side: "right", label: "Multi-Level Approvals", desc: "Automated routing through HR, IT, and management chains" },
    ],
    features: [
      { label: "Auto-Generated Task Lists", desc: "Role-based onboarding checklists created automatically" },
      { label: "Document Management", desc: "Secure upload, e-signatures, and compliance tracking" },
      { label: "Approval Workflows", desc: "Multi-step approval chains with email notifications" },
      { label: "Progress Analytics", desc: "Track onboarding KPIs and identify bottlenecks" },
      { label: "Microsoft 365 Integration", desc: "Syncs with Teams, Outlook, and SharePoint" },
      { label: "Manager Dashboard", desc: "Bird's-eye view of all team onboarding status" },
    ],
  },

  /* ?? 2. Field Inspection Pro ???????????????????????????? */
  {
    id: "field-inspection",
    title: "Field Inspection Pro",
    subtitle: "Mobile-first inspections with offline capability",
    description:
      "Equip your field teams with a powerful inspection app that works anywhere, " +
      "even without internet. Capture photos, fill checklists, record GPS locations, " +
      "and generate professional reports automatically. Never lose an inspection again.",
    accent: "#059669",
    accentBg: "#D1FAE5",
    tags: ["Field Service", "Inspections", "Mobile", "Offline"],
    metrics: [
      { value: "3x", label: "More Inspections/Day" },
      { value: "100%", label: "Offline Capable" },
      { value: "1 Tap", label: "PDF Reports" },
    ],
    problem: "Inspectors carry clipboards and paper forms. Photos get lost. Reports take days to write. Data never makes it into a system anyone can query.",
    solution: "Inspectors complete digital checklists on their phone, even offline. Photos are GPS-tagged automatically. PDF reports generate with one tap. Everything syncs when connected.",
    screens: [
      {
        label: "Sites",
        rows: [
          { type: "header", title: "Inspection Sites", showSearch: true },
          { type: "tabs", items: ["Active", "Scheduled", "Completed"], active: 0 },
          { type: "list", items: [
            { text: "Warehouse A - Building Safety", status: "In Progress", statusColor: "#059669" },
            { text: "Office Floor 3 - Fire Safety", status: "Scheduled", statusColor: "#2563EB" },
            { text: "Parking Garage - Structural", status: "Due Today", statusColor: "#F59E0B" },
            { text: "Server Room B - Compliance", status: "Overdue", statusColor: "#EF4444" },
          ]},
          { type: "section", title: "Completed Recently" },
          { type: "list", items: [
            { text: "Main Lobby - ADA Compliance", status: "Passed", statusColor: "#059669" },
            { text: "Kitchen Area - Health & Safety", status: "Issues", statusColor: "#F59E0B" },
          ]},
          { type: "spacer" },
          { type: "button", label: "+ New Inspection" },
        ],
      },
      {
        label: "Checklist",
        rows: [
          { type: "header", title: "Warehouse A Inspection", showBack: true },
          { type: "progress", label: "Completion", value: 42 },
          { type: "section", title: "Structural Integrity" },
          { type: "checklist", items: [
            { text: "Foundation - No visible cracks", checked: true },
            { text: "Load-bearing walls - Stable", checked: true },
            { text: "Roof structure - No sagging", checked: true },
            { text: "Floor condition - Level and intact", checked: false },
          ]},
          { type: "section", title: "Fire Safety" },
          { type: "checklist", items: [
            { text: "Extinguishers - In place and charged", checked: false },
            { text: "Exit signs - Illuminated", checked: false },
            { text: "Sprinkler system - Operational", checked: false },
          ]},
        ],
      },
      {
        label: "Photos",
        rows: [
          { type: "header", title: "Photo Evidence", showBack: true },
          { type: "section", title: "Captured Photos (4)" },
          { type: "gallery", count: 4, label: "Tap to annotate or add more" },
          { type: "spacer" },
          { type: "infoCard", title: "Location Data", rows: [
            { label: "GPS", value: "40.7128, -74.0060" },
            { label: "Accuracy", value: "3.2 meters" },
            { label: "Timestamp", value: "10:32 AM" },
          ]},
          { type: "spacer" },
          { type: "button", label: "Capture Photo" },
        ],
      },
      {
        label: "Report",
        rows: [
          { type: "header", title: "Inspection Summary", showBack: true },
          { type: "infoCard", title: "Report Details", rows: [
            { label: "Site", value: "Warehouse A" },
            { label: "Type", value: "Building Safety" },
            { label: "Inspector", value: "Mike Torres" },
            { label: "Date", value: "Oct 22, 2026" },
          ]},
          { type: "kpis", items: [
            { label: "Passed", value: "18" },
            { label: "Failed", value: "3" },
            { label: "N/A", value: "2" },
          ]},
          { type: "progress", label: "Overall Score", value: 86 },
          { type: "section", title: "Critical Findings" },
          { type: "list", items: [
            { text: "Floor crack in zone C - Needs repair", status: "Critical", statusColor: "#EF4444" },
            { text: "Exit sign dim in corridor B", status: "Minor", statusColor: "#F59E0B" },
          ]},
          { type: "button", label: "Generate PDF Report" },
        ],
      },
    ],
    annotations: [
      { side: "left", label: "Works Offline", desc: "Complete inspections without internet - syncs when connected" },
      { side: "left", label: "GPS-Tagged Evidence", desc: "Photos auto-tagged with location, time, and inspector ID" },
      { side: "right", label: "Custom Checklists", desc: "Build inspection templates for any industry or standard" },
      { side: "right", label: "Instant PDF Reports", desc: "One-tap professional reports with photos and findings" },
    ],
    features: [
      { label: "Offline Mode", desc: "Full functionality without internet connection" },
      { label: "Photo + Annotation", desc: "Capture, annotate, and organize photo evidence" },
      { label: "GPS Location Tracking", desc: "Auto-tag inspections with precise GPS coordinates" },
      { label: "Custom Templates", desc: "Build checklists for any regulation or standard" },
      { label: "PDF Report Generation", desc: "Professional reports generated with one tap" },
      { label: "Compliance Dashboard", desc: "Track pass rates and trends over time" },
    ],
  },

  /* ?? 3. ExpenseFlow ????????????????????????????????????? */
  {
    id: "expense-flow",
    title: "ExpenseFlow",
    subtitle: "Smart expense management with policy enforcement",
    description:
      "Stop chasing receipts and approvals. ExpenseFlow lets employees snap photos " +
      "of receipts, auto-extracts amounts, checks policy compliance, and routes to " +
      "the right manager. Real-time budget tracking keeps spending under control.",
    accent: "#2563EB",
    accentBg: "#DBEAFE",
    tags: ["Finance", "Expenses", "Approvals", "Budgets"],
    metrics: [
      { value: "80%", label: "Less Processing Time" },
      { value: "99%", label: "Policy Compliance" },
      { value: "Real-time", label: "Budget Visibility" },
    ],
    problem: "Receipts pile up in drawers. Expense reports take hours to fill out. Managers approve without checking policy. Finance has no real-time view of spending.",
    solution: "Snap a photo of the receipt. AI extracts the data. Policy rules validate automatically. The right manager approves with one tap. Budgets update in real time.",
    screens: [
      {
        label: "Dashboard",
        rows: [
          { type: "header", title: "ExpenseFlow" },
          { type: "chartDonut", segments: [
            { value: 35, color: "#2563EB" },
            { value: 25, color: "#7C3AED" },
            { value: 20, color: "#059669" },
            { value: 20, color: "#E5E7EB" },
          ], center: "$12.4K" },
          { type: "kpis", items: [
            { label: "This Month", value: "$4,230" },
            { label: "Pending", value: "$1,850" },
            { label: "Budget Left", value: "$3,770" },
          ]},
          { type: "section", title: "Recent Expenses" },
          { type: "list", items: [
            { text: "Client dinner - Steakhouse", status: "$186.50", statusColor: "#2563EB" },
            { text: "Uber to airport", status: "$42.00", statusColor: "#2563EB" },
            { text: "Hotel - 2 nights Chicago", status: "$478.00", statusColor: "#2563EB" },
            { text: "Office supplies", status: "$34.99", statusColor: "#2563EB" },
          ]},
        ],
      },
      {
        label: "Submit",
        rows: [
          { type: "header", title: "New Expense", showBack: true },
          { type: "form", fields: [
            { label: "Amount", value: "$186.50" },
            { label: "Category", value: "Client Entertainment" },
            { label: "Date", value: "Oct 21, 2026" },
            { label: "Description", value: "Client dinner at Morton's" },
            { label: "Project", value: "Acme Corp - Phase 2" },
          ]},
          { type: "spacer" },
          { type: "gallery", count: 1, label: "Receipt attached" },
          { type: "spacer" },
          { type: "button", label: "Submit for Approval" },
        ],
      },
      {
        label: "Approvals",
        rows: [
          { type: "header", title: "Approval Queue", showBack: true },
          { type: "tabs", items: ["Pending (4)", "Approved", "Rejected"], active: 0 },
          { type: "section", title: "Awaiting Your Review" },
          { type: "list", items: [
            { text: "Sarah C. - Client dinner ($186.50)", status: "Review", statusColor: "#F59E0B" },
            { text: "James M. - Software license ($299.00)", status: "Review", statusColor: "#F59E0B" },
            { text: "Ana R. - Travel expenses ($1,240)", status: "Review", statusColor: "#F59E0B" },
            { text: "Tom W. - Conference fee ($450.00)", status: "Review", statusColor: "#F59E0B" },
          ]},
          { type: "spacer" },
          { type: "infoCard", title: "Policy Alert", rows: [
            { label: "Ana's travel", value: "Exceeds daily limit" },
            { label: "Action needed", value: "Manager override" },
          ]},
        ],
      },
      {
        label: "Analytics",
        rows: [
          { type: "header", title: "Spend Analytics", showBack: true },
          { type: "tabs", items: ["Monthly", "Quarterly", "Annual"], active: 0 },
          { type: "section", title: "Spend by Category" },
          { type: "chartBars", values: [85, 60, 45, 35, 25], labels: ["Travel", "Meals", "Software", "Supplies", "Other"] },
          { type: "section", title: "Budget vs Actual" },
          { type: "progress", label: "Travel ($6.2K / $8K)", value: 77 },
          { type: "progress", label: "Meals ($2.1K / $3K)", value: 70 },
          { type: "progress", label: "Software ($4.5K / $5K)", value: 90 },
          { type: "progress", label: "Supplies ($800 / $2K)", value: 40 },
        ],
      },
    ],
    annotations: [
      { side: "left", label: "Receipt OCR Scanning", desc: "Snap a photo - amounts and vendors extracted automatically" },
      { side: "left", label: "Policy Auto-Check", desc: "Expenses validated against company spending policies" },
      { side: "right", label: "Smart Approval Routing", desc: "Auto-routed to the right manager based on amount and type" },
      { side: "right", label: "Real-Time Budget Tracking", desc: "Live budget meters so teams never overspend" },
    ],
    features: [
      { label: "Receipt OCR", desc: "Auto-extract amounts, dates, and vendors from photos" },
      { label: "Policy Engine", desc: "Automatic compliance checking against spending rules" },
      { label: "Approval Workflows", desc: "Multi-level routing based on amount thresholds" },
      { label: "Budget Dashboards", desc: "Real-time spend tracking by team and category" },
      { label: "ERP Integration", desc: "Export approved expenses to accounting systems" },
      { label: "Mileage Tracking", desc: "GPS-based mileage calculation and reimbursement" },
    ],
  },

  /* ?? 4. Asset Tracker 360 ??????????????????????????????? */
  {
    id: "asset-tracker",
    title: "Asset Tracker 360",
    subtitle: "Equipment lifecycle management with QR scanning",
    description:
      "Know where every piece of equipment is, who has it, and when it needs " +
      "maintenance. Scan QR codes to check assets in and out, schedule preventive " +
      "maintenance, and track depreciation. Never lose equipment again.",
    accent: "#EA580C",
    accentBg: "#FED7AA",
    tags: ["Assets", "Equipment", "Maintenance", "QR Codes"],
    metrics: [
      { value: "100%", label: "Asset Visibility" },
      { value: "40%", label: "Less Downtime" },
      { value: "Full", label: "Audit Trail" },
    ],
    problem: "Equipment goes missing. Nobody knows who has what. Maintenance gets skipped. Depreciation is tracked in spreadsheets that are always out of date.",
    solution: "Scan a QR code to see everything about any asset instantly. Maintenance alerts fire before deadlines. Check-in/out creates a complete custody chain. Depreciation calculates automatically.",
    screens: [
      {
        label: "Registry",
        rows: [
          { type: "header", title: "Asset Registry", showSearch: true },
          { type: "kpis", items: [
            { label: "Total Assets", value: "342" },
            { label: "Checked Out", value: "89" },
            { label: "Maintenance", value: "12" },
          ]},
          { type: "tabs", items: ["All", "Available", "In Use", "Repair"], active: 0 },
          { type: "list", items: [
            { text: "MacBook Pro 16\" - IT-2847", status: "In Use", statusColor: "#2563EB" },
            { text: "Dell Monitor 27\" - IT-3012", status: "Available", statusColor: "#059669" },
            { text: "Projector Epson - EQ-0445", status: "Repair", statusColor: "#EF4444" },
            { text: "iPad Air - IT-2901", status: "In Use", statusColor: "#2563EB" },
            { text: "Desk Stand Mount - OF-1122", status: "Available", statusColor: "#059669" },
          ]},
        ],
      },
      {
        label: "Detail",
        rows: [
          { type: "header", title: "Asset Detail", showBack: true },
          { type: "infoCard", title: "MacBook Pro 16\" (IT-2847)", rows: [
            { label: "Serial Number", value: "C02ZM1XXMD6R" },
            { label: "Purchase Date", value: "Mar 15, 2025" },
            { label: "Value", value: "$2,499.00" },
            { label: "Depreciation", value: "$832 (33%)" },
            { label: "Assigned To", value: "Sarah Chen" },
            { label: "Location", value: "Floor 3, Desk 12" },
          ]},
          { type: "progress", label: "Lifecycle (24 of 36 months)", value: 67 },
          { type: "section", title: "Maintenance History" },
          { type: "timeline", items: [
            { text: "Battery replacement", time: "Aug 2026", done: true },
            { text: "OS upgrade to macOS 17", time: "Jun 2026", done: true },
            { text: "Keyboard cleaning", time: "Mar 2026", done: true },
            { text: "Next service due", time: "Dec 2026", done: false },
          ]},
        ],
      },
      {
        label: "Schedule",
        rows: [
          { type: "header", title: "Maintenance Schedule", showBack: true },
          { type: "section", title: "This Week" },
          { type: "list", items: [
            { text: "Projector Epson EQ-0445 - Bulb replace", status: "Today", statusColor: "#EF4444" },
            { text: "HVAC Unit #3 - Filter change", status: "Wed", statusColor: "#F59E0B" },
            { text: "Fleet Van #2 - Oil change", status: "Fri", statusColor: "#2563EB" },
          ]},
          { type: "section", title: "Next Week" },
          { type: "list", items: [
            { text: "Server Rack B - Firmware update", status: "Mon", statusColor: "#7C3AED" },
            { text: "Printer HP-3300 - Toner replace", status: "Tue", statusColor: "#059669" },
          ]},
          { type: "section", title: "Overdue" },
          { type: "list", items: [
            { text: "Generator - Annual inspection", status: "5 days late", statusColor: "#EF4444" },
          ]},
        ],
      },
      {
        label: "Check In/Out",
        rows: [
          { type: "header", title: "Check In / Out", showBack: true },
          { type: "spacer" },
          { type: "form", fields: [
            { label: "Asset ID or QR Code" },
            { label: "Action", value: "Check Out" },
            { label: "Assigned To", value: "Select employee..." },
            { label: "Expected Return", value: "Select date..." },
            { label: "Notes" },
          ]},
          { type: "spacer" },
          { type: "button", label: "Scan QR Code" },
          { type: "spacer" },
          { type: "button", label: "Confirm Check-Out" },
        ],
      },
    ],
    annotations: [
      { side: "left", label: "QR / Barcode Scanner", desc: "Instant asset lookup by scanning any QR code or barcode" },
      { side: "left", label: "Depreciation Tracking", desc: "Automatic value calculation based on purchase and lifecycle" },
      { side: "right", label: "Preventive Maintenance", desc: "Scheduled alerts so equipment never misses a service date" },
      { side: "right", label: "Check-In / Check-Out", desc: "Full custody chain with employee assignment history" },
    ],
    features: [
      { label: "QR Code Scanning", desc: "Instant asset identification with phone camera" },
      { label: "Lifecycle Tracking", desc: "Monitor warranty, depreciation, and service schedules" },
      { label: "Maintenance Alerts", desc: "Automated reminders for preventive maintenance" },
      { label: "Check-In/Out System", desc: "Track who has what, when, and where" },
      { label: "Audit Trail", desc: "Complete history of every asset transaction" },
      { label: "Reporting Dashboard", desc: "Asset utilization, costs, and compliance reports" },
    ],
  },

  /* ?? 5. ServiceDesk ????????????????????????????????????? */
  {
    id: "service-desk",
    title: "ServiceDesk",
    subtitle: "IT support ticketing with SLA monitoring",
    description:
      "Give your support team a modern ticketing system that routes requests " +
      "automatically, tracks SLA compliance, and builds a knowledge base over time. " +
      "Employees submit tickets from their phone. Support teams resolve them faster.",
    accent: "#E11D48",
    accentBg: "#FFE4E6",
    tags: ["IT Support", "Ticketing", "SLA", "Knowledge Base"],
    metrics: [
      { value: "45%", label: "Faster Resolution" },
      { value: "40%", label: "Fewer Repeat Tickets" },
      { value: "99.5%", label: "SLA Compliance" },
    ],
    problem: "Support requests arrive by email, chat, and hallway conversations. Nothing is tracked consistently. SLAs breach silently. The same questions get answered over and over.",
    solution: "Every request becomes a tracked ticket with SLA timers. Auto-routing assigns the right person. A knowledge base answers common questions before they become tickets.",
    screens: [
      {
        label: "Board",
        rows: [
          { type: "header", title: "ServiceDesk", showSearch: true },
          { type: "kpis", items: [
            { label: "Open", value: "23" },
            { label: "In Progress", value: "8" },
            { label: "Resolved", value: "142" },
          ]},
          { type: "chartBars", values: [90, 65, 40, 85, 70, 55, 30], labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
          { type: "section", title: "Priority Tickets" },
          { type: "list", items: [
            { text: "VPN not connecting - Floor 5", status: "Critical", statusColor: "#EF4444" },
            { text: "Printer jam - Reception", status: "High", statusColor: "#F59E0B" },
            { text: "New laptop setup - J.Miller", status: "Medium", statusColor: "#2563EB" },
            { text: "Password reset - A.Ruiz", status: "Low", statusColor: "#059669" },
          ]},
        ],
      },
      {
        label: "New Ticket",
        rows: [
          { type: "header", title: "Create Ticket", showBack: true },
          { type: "form", fields: [
            { label: "Subject", value: "Cannot access shared drive" },
            { label: "Category", value: "Network & Access" },
            { label: "Priority", value: "High" },
            { label: "Description", value: "Getting 'access denied' error when trying to open the Q4 Sales folder on SharePoint..." },
            { label: "Location", value: "Floor 3, Desk 12" },
          ]},
          { type: "spacer" },
          { type: "gallery", count: 1, label: "Screenshot attached" },
          { type: "spacer" },
          { type: "button", label: "Submit Ticket" },
        ],
      },
      {
        label: "Ticket",
        rows: [
          { type: "header", title: "Ticket #1847", showBack: true },
          { type: "infoCard", title: "VPN Not Connecting", rows: [
            { label: "Status", value: "In Progress" },
            { label: "Priority", value: "Critical" },
            { label: "Assigned", value: "Tom Wilson" },
            { label: "SLA", value: "2h 15m remaining" },
          ]},
          { type: "section", title: "Conversation" },
          { type: "conversation", messages: [
            { from: "Sarah Chen", text: "VPN disconnects every 5 minutes since this morning. Tried restarting." },
            { from: "Tom Wilson", text: "Checking the VPN gateway logs now. Can you try connecting to VPN-US-East?" },
            { from: "Sarah Chen", text: "Same issue on VPN-US-East. Screenshot attached.", isUser: true },
          ]},
          { type: "spacer" },
          { type: "button", label: "Send Reply" },
        ],
      },
      {
        label: "Knowledge",
        rows: [
          { type: "header", title: "Knowledge Base", showBack: true },
          { type: "searchBar", placeholder: "Search articles..." },
          { type: "section", title: "Popular Articles" },
          { type: "list", items: [
            { text: "How to connect to VPN from home", status: "142 views", statusColor: "#E11D48" },
            { text: "Reset your password", status: "98 views", statusColor: "#E11D48" },
            { text: "Set up email on mobile", status: "87 views", statusColor: "#E11D48" },
            { text: "Request new software", status: "65 views", statusColor: "#E11D48" },
            { text: "Printer troubleshooting guide", status: "54 views", statusColor: "#E11D48" },
          ]},
          { type: "section", title: "Recently Added" },
          { type: "list", items: [
            { text: "macOS 17 upgrade instructions", status: "New", statusColor: "#059669" },
            { text: "Teams meeting room setup", status: "New", statusColor: "#059669" },
          ]},
        ],
      },
    ],
    annotations: [
      { side: "left", label: "SLA Monitoring", desc: "Live countdown timers ensure no ticket breaches its SLA" },
      { side: "left", label: "Auto-Routing", desc: "Tickets assigned to the right team based on category and skill" },
      { side: "right", label: "Conversation Threads", desc: "Rich back-and-forth with attachments and internal notes" },
      { side: "right", label: "Knowledge Base", desc: "Self-service articles reduce repeat tickets by 40%" },
    ],
    features: [
      { label: "SLA Tracking", desc: "Real-time monitoring with escalation alerts" },
      { label: "Auto-Assignment", desc: "Smart routing based on category, skill, and workload" },
      { label: "Rich Conversations", desc: "Threaded messages with file attachments" },
      { label: "Knowledge Base", desc: "Searchable articles with view analytics" },
      { label: "Performance Reports", desc: "Resolution times, satisfaction scores, trends" },
      { label: "Email Integration", desc: "Create tickets by sending email to support" },
    ],
  },
];

/* ================================================================
   Annotation Component
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
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`flex items-center gap-3 ${isLeft ? "flex-row" : "flex-row-reverse"}`}
    >
      <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
        <div className="text-white text-sm font-semibold mb-0.5">{annotation.label}</div>
        <div className="text-muted text-xs leading-relaxed">{annotation.desc}</div>
      </div>

      {/* Connecting line and dot */}
      <div className="flex items-center gap-0">
        {isLeft && <div className="w-8 sm:w-12 h-px opacity-40" style={{ background: `linear-gradient(to right, transparent, ${accent})` }} />}
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 shadow-lg" style={{ background: accent, boxShadow: `0 0 8px ${accent}60` }}>
          <motion.div
            className="w-full h-full rounded-full"
            animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, delay: index * 0.3 }}
            style={{ background: accent }}
          />
        </div>
        {!isLeft && <div className="w-8 sm:w-12 h-px opacity-40" style={{ background: `linear-gradient(to left, transparent, ${accent})` }} />}
      </div>
    </motion.div>
  );
}

/* ================================================================
   Feature Icon (checkmark diamond)
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
   Floating Orbs + Impact Metrics + Problem/Solution (shared)
   ================================================================ */

function FloatingOrbs({ accent }: { accent: string }) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.07] orb-drift-1" style={{ background: accent }} />
      <div className="absolute bottom-[20%] right-[10%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-[0.05] orb-drift-2" style={{ background: accent }} />
      <div className="absolute top-[60%] left-[50%] w-[300px] h-[300px] rounded-full blur-[80px] opacity-[0.04] orb-drift-3" style={{ background: accent }} />
    </div>
  );
}

function ImpactMetrics({ metrics, accent }: { metrics: ImpactMetric[]; accent: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
      className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-3xl mx-auto mb-10">
      {metrics.map((m, i) => (
        <motion.div key={i} initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 + i * 0.12, type: "spring", stiffness: 200, damping: 15 }}
          className="glass-strong rounded-2xl px-6 sm:px-8 py-4 sm:py-5 text-center min-w-[120px] hover:scale-105 transition-transform duration-300">
          <div className="text-2xl sm:text-3xl font-bold mb-1 gradient-text"
            style={{ backgroundImage: `linear-gradient(135deg, ${accent}, white)` }}>{m.value}</div>
          <div className="text-[11px] sm:text-xs text-gray-400 uppercase tracking-wider font-medium">{m.label}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function ProblemSolution({ problem, solution, accent }: { problem: string; solution: string; accent: string }) {
  return (
    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}
      className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500/60 rounded-r" />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-red-500/10 flex items-center justify-center">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </div>
            <span className="text-red-400 text-xs font-bold uppercase tracking-wider">Without This</span>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{problem}</p>
        </div>
        <div className="glass rounded-2xl p-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full rounded-r" style={{ background: `${accent}90` }} />
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: `${accent}15` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>
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
   Main Showcase View (renders inside modal)
   ================================================================ */

export function PowerAppShowcaseView({ appId, onClose }: { appId: string; onClose: () => void }) {
  const app = powerApps.find((a) => a.id === appId);
  const [activeScreen, setActiveScreen] = useState(0);
  const [showAnnotations, setShowAnnotations] = useState(false);

  const nextScreen = useCallback(() => {
    if (!app) return;
    setActiveScreen((s) => (s + 1) % app.screens.length);
  }, [app]);

  useEffect(() => {
    const timer = setTimeout(() => setShowAnnotations(true), 600);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(nextScreen, 5000);
    return () => clearInterval(interval);
  }, [nextScreen]);

  if (!app) return null;

  const leftAnnotations = app.annotations.filter((a) => a.side === "left");
  const rightAnnotations = app.annotations.filter((a) => a.side === "right");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-[#050A12] overflow-y-auto"
    >
      <FloatingOrbs accent={app.accent} />

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
          style={{ color: app.accent, borderColor: `${app.accent}25` }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
            <rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" />
          </svg>
          Power Apps
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 gradient-text"
          style={{ backgroundImage: `linear-gradient(135deg, white 30%, ${app.accent})` }}>
          {app.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-400 text-lg sm:text-xl max-w-xl mx-auto">
          {app.subtitle}
        </motion.p>
      </div>

      {/* Impact Metrics */}
      <div className="relative z-10">
        <ImpactMetrics metrics={app.metrics} accent={app.accent} />
      </div>

      {/* ?? Phone + Annotations ??????????????????????????? */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center lg:items-stretch gap-6 lg:gap-4">
          {/* Left annotations (desktop) */}
          <div className="hidden lg:flex flex-col justify-center gap-10 flex-1 max-w-xs">
            {leftAnnotations.map((a, i) => (
              <AnnotationItem key={i} annotation={a} accent={app.accent} index={i} isVisible={showAnnotations} />
            ))}
          </div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, type: "spring", stiffness: 80 }}
            className="flex flex-col items-center"
          >
            <PhoneFrame accent={app.accent}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeScreen}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="pb-2"
                >
                  {app.screens[activeScreen].rows.map((row, i) => (
                    <RowRenderer key={i} row={row} accent={app.accent} />
                  ))}
                </motion.div>
              </AnimatePresence>
            </PhoneFrame>

            {/* Screen nav dots */}
            <div className="flex items-center gap-3 mt-6">
              {app.screens.map((screen, i) => (
                <button
                  key={i}
                  onClick={() => setActiveScreen(i)}
                  className="flex flex-col items-center gap-1.5 group"
                >
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      background: i === activeScreen ? app.accent : "#374151",
                      boxShadow: i === activeScreen ? `0 0 10px ${app.accent}60` : "none",
                      transform: i === activeScreen ? "scale(1.3)" : "scale(1)",
                    }}
                  />
                  <span className={`text-[10px] transition-colors ${i === activeScreen ? "text-white" : "text-gray-600"}`}>
                    {screen.label}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Right annotations (desktop) */}
          <div className="hidden lg:flex flex-col justify-center gap-10 flex-1 max-w-xs">
            {rightAnnotations.map((a, i) => (
              <AnnotationItem key={i} annotation={a} accent={app.accent} index={i + 2} isVisible={showAnnotations} />
            ))}
          </div>
        </div>

        {/* Mobile annotations */}
        <div className="lg:hidden mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {app.annotations.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.08 }}
              className="glass rounded-xl p-4 flex items-start gap-3 hover:scale-[1.02] transition-transform">
              <div className="w-2.5 h-2.5 rounded-full flex-shrink-0 mt-1" style={{ background: app.accent }} />
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
        <ProblemSolution problem={app.problem} solution={app.solution} accent={app.accent} />
      </div>

      {/* Features */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 mb-8">
        <motion.h2 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          className="font-display text-2xl sm:text-3xl font-bold text-white text-center mb-10">
          Key Capabilities
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {app.features.map((f, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75 + i * 0.07 }}
              className="glass rounded-2xl p-5 group hover:scale-[1.03] transition-all duration-300 cursor-default"
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${app.accent}40`; e.currentTarget.style.boxShadow = `0 4px 20px ${app.accent}15`; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}>
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${app.accent}12` }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={app.accent} strokeWidth="2.5">
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

      {/* CTA */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mt-14 mb-20 text-center">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
          className="text-gray-400 text-sm sm:text-base leading-relaxed mb-10">
          {app.description}
        </motion.p>
        <motion.a initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          href="/#contact" onClick={onClose}
          className="shimmer-btn inline-block px-10 py-4 rounded-2xl text-white font-bold text-sm sm:text-base tracking-wide transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          style={{ background: `linear-gradient(135deg, ${app.accent}, ${app.accent}CC)`, boxShadow: `0 8px 32px ${app.accent}40` }}>
          Build This For My Business
        </motion.a>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }}
          className="text-gray-500 text-xs mt-4">
          Free discovery call - No commitment required
        </motion.p>
      </div>
    </motion.div>
  );
}

/* ================================================================
   Card Preview (used in demo grid cards)
   ================================================================ */

export function PowerAppCardPreview({ appId }: { appId: string }) {
  const app = powerApps.find((a) => a.id === appId);
  if (!app) return null;

  const firstScreen = app.screens[0];

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse at center, ${app.accent}15, transparent 70%)` }} />

      {/* Mini phone preview */}
      <div className="relative transform scale-[0.42] origin-center">
        <div className="bg-[#1A1A2E] rounded-[36px] p-2 shadow-2xl">
          <div className="bg-white rounded-[28px] overflow-hidden w-[260px]" style={{ height: 460 }}>
            {/* Mini status bar */}
            <div className="flex items-center justify-between px-5 py-1.5 bg-white">
              <span className="text-[9px] font-semibold text-gray-800">9:41</span>
              <div className="w-20 h-5 bg-black rounded-full" />
              <div className="w-6" />
            </div>
            {/* Screen content */}
            <div className="overflow-hidden" style={{ height: 410 }}>
              {firstScreen.rows.map((row, i) => (
                <RowRenderer key={i} row={row} accent={app.accent} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Gradient overlay at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-card via-card/80 to-transparent" />
    </div>
  );
}

/* ================================================================
   Export app metadata for demos page
   ================================================================ */

export interface PowerAppMeta {
  id: string;
  title: string;
  subtitle: string;
  tags: string[];
  accent: string;
}

export const powerAppMetas: PowerAppMeta[] = powerApps.map((a) => ({
  id: a.id,
  title: a.title,
  subtitle: a.subtitle,
  tags: a.tags,
  accent: a.accent,
}));
