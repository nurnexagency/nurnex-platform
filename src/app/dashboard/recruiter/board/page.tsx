"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { getDemoSessionClient } from "@/lib/demo-auth";
import { createClient } from "@/lib/supabase/client";
import { loadBoard, saveBoard } from "@/lib/recruiter-board/storage";
import type {
  Assignment,
  BoardMember,
  CandidateComment,
  RecruiterBoardData,
} from "@/lib/recruiter-board/types";
import { emptyBoard } from "@/lib/recruiter-board/types";
import { PageLoader } from "@/components/spinner";
import { toast } from "@/components/toast";

type Tab = "members" | "assignments" | "comments";

function genId() {
  return crypto.randomUUID();
}

function norm(s: string) {
  return s
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/[^a-z0-9 ]/g, "")
    .trim();
}

export default function RecruiterBoardPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("members");
  const [data, setData] = useState<RecruiterBoardData>(emptyBoard());
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(
    null
  );

  const [mFirst, setMFirst] = useState("");
  const [mLast, setMLast] = useState("");
  const [mDesc, setMDesc] = useState("");

  const [aTitle, setATitle] = useState("");
  const [aDesc, setADesc] = useState("");
  const [aDue, setADue] = useState("");
  const [aMemberId, setAMemberId] = useState("");

  const [commentText, setCommentText] = useState("");
  const [commentAuthor, setCommentAuthor] = useState("Candidate");

  const persist = useCallback(
    (next: RecruiterBoardData) => {
      if (!userId) return;
      setData(next);
      saveBoard(userId, next);
    },
    [userId]
  );

  useEffect(() => {
    async function run() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let uid: string | null = user?.id ?? null;

      if (!uid) {
        const demo = getDemoSessionClient();
        if (demo?.role !== "recruiter") {
          router.replace("/login");
          return;
        }
        uid = demo.userId;
      } else {
        if (!user) {
          router.replace("/login");
          return;
        }
        const roleRow = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .maybeSingle();
        if (roleRow.data?.role !== "recruiter") {
          router.replace("/dashboard/candidate");
          return;
        }
      }

      setUserId(uid);
      const board = loadBoard(uid);
      if (!board.agency) {
        router.replace("/dashboard/recruiter/onboarding");
        return;
      }
      setData(board);
      if (board.members.length) {
        setSelectedMemberId(board.members[0].id);
      }
      setLoading(false);
    }
    run();
  }, [router]);

  const effectiveMemberId = useMemo(() => {
    if (
      selectedMemberId &&
      data.members.some((m) => m.id === selectedMemberId)
    ) {
      return selectedMemberId;
    }
    return null;
  }, [data.members, selectedMemberId]);

  const filteredAssignments = useMemo(() => {
    if (!effectiveMemberId) return data.assignments;
    return data.assignments.filter((a) => a.memberId === effectiveMemberId);
  }, [data.assignments, effectiveMemberId]);

  // ─── Members ───────────────────────────────────────────────

  function addMember(e: React.FormEvent) {
    e.preventDefault();
    if (!mFirst.trim() || !mLast.trim()) {
      toast("First and last name required.", "error");
      return;
    }
    const m: BoardMember = {
      id: genId(),
      firstName: mFirst.trim(),
      lastName: mLast.trim(),
      description: mDesc.trim(),
    };
    const next = { ...data, members: [...data.members, m] };
    persist(next);
    setMFirst("");
    setMLast("");
    setMDesc("");
    setSelectedMemberId(m.id);
    toast("Member added.", "success");
  }

  function deleteMember(id: string) {
    const member = data.members.find((m) => m.id === id);
    if (!member) return;
    const assignmentCount = data.assignments.filter(
      (a) => a.memberId === id
    ).length;
    const msg =
      assignmentCount > 0
        ? `Delete ${member.firstName} ${member.lastName} and their ${assignmentCount} assignment(s)?`
        : `Delete ${member.firstName} ${member.lastName}?`;
    if (!confirm(msg)) return;
    persist({
      ...data,
      members: data.members.filter((m) => m.id !== id),
      assignments: data.assignments.filter((a) => a.memberId !== id),
    });
    if (selectedMemberId === id) setSelectedMemberId(null);
    toast("Member deleted.", "success");
  }

  // ─── Assignments ───────────────────────────────────────────

  function addAssignment(e: React.FormEvent) {
    e.preventDefault();
    const mid = aMemberId || effectiveMemberId || selectedMemberId;
    if (!mid) {
      toast("Add a member or pick who owns this assignment.", "error");
      return;
    }
    if (!aTitle.trim()) {
      toast("Job title required.", "error");
      return;
    }
    const row: Assignment = {
      id: genId(),
      memberId: mid,
      title: aTitle.trim(),
      description: aDesc.trim(),
      dueDate: aDue || new Date().toISOString().slice(0, 10),
    };
    persist({ ...data, assignments: [...data.assignments, row] });
    setATitle("");
    setADesc("");
    setADue("");
    toast("Assignment created.", "success");
  }

  function deleteAssignment(id: string) {
    if (!confirm("Delete this assignment?")) return;
    persist({
      ...data,
      assignments: data.assignments.filter((a) => a.id !== id),
    });
    toast("Assignment deleted.", "success");
  }

  async function onImportExcel(file: File | null) {
    if (!file) return;
    try {
      const XLSX = await import("xlsx");
      const buf = await file.arrayBuffer();
      const wb = XLSX.read(buf, { type: "array" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
        defval: "",
      });
      if (!rows.length) {
        toast("Sheet is empty.", "error");
        return;
      }
      let added = 0;
      const nextAssignments = [...data.assignments];
      for (const raw of rows) {
        const keys = Object.keys(raw);
        const map: Record<string, string> = {};
        for (const k of keys) {
          map[norm(k)] = String(raw[k] ?? "").trim();
        }
        const title =
          map["title"] ||
          map["jobtitle"] ||
          map["job title"] ||
          map["role"] ||
          "";
        const description =
          map["description"] ||
          map["jobdescription"] ||
          map["job description"] ||
          "";
        let due =
          map["duedate"] ||
          map["due date"] ||
          map["due"] ||
          map["deadline"] ||
          "";
        const mf =
          map["memberfirstname"] ||
          map["first name"] ||
          map["firstname"] ||
          map["recruiter first"] ||
          "";
        const ml =
          map["memberlastname"] ||
          map["last name"] ||
          map["lastname"] ||
          map["recruiter last"] ||
          "";
        if (!title) continue;
        let memberId =
          effectiveMemberId ?? selectedMemberId ?? data.members[0]?.id;
        if (mf || ml) {
          const hit = data.members.find(
            (m) =>
              norm(m.firstName) === norm(mf) && norm(m.lastName) === norm(ml)
          );
          if (hit) memberId = hit.id;
        }
        if (!memberId) continue;
        if (/^\d+(\.\d+)?$/.test(due)) {
          const n = parseFloat(due);
          const utc = Math.round((n - 25569) * 86400 * 1000);
          due = new Date(utc).toISOString().slice(0, 10);
        }
        nextAssignments.push({
          id: genId(),
          memberId,
          title,
          description,
          dueDate: due || new Date().toISOString().slice(0, 10),
        });
        added += 1;
      }
      persist({ ...data, assignments: nextAssignments });
      toast(`Imported ${added} row(s).`, "success");
    } catch {
      toast("Could not read Excel file.", "error");
    }
  }

  // ─── Comments ──────────────────────────────────────────────

  function addComment(e: React.FormEvent) {
    e.preventDefault();
    if (!commentText.trim()) return;
    const c: CandidateComment = {
      id: genId(),
      text: commentText.trim(),
      author: commentAuthor.trim() || "Candidate",
      createdAt: new Date().toISOString(),
      assignmentId: filteredAssignments[0]?.id,
    };
    persist({ ...data, comments: [...data.comments, c] });
    setCommentText("");
    toast("Comment added.", "success");
  }

  function deleteComment(id: string) {
    persist({
      ...data,
      comments: data.comments.filter((c) => c.id !== id),
    });
    toast("Comment deleted.", "success");
  }

  if (loading || !userId) return <PageLoader />;

  const agency = data.agency!;

  return (
    <div className="max-w-6xl">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            Agency board
          </p>
          <h1 className="text-2xl font-bold">{agency.companyName}</h1>
          <p className="text-sm text-muted mt-1">
            {agency.focusArea} &middot; Weekly publish cap:{" "}
            {agency.weeklyJobLimit} jobs
          </p>
        </div>
        <Link
          href="/dashboard/recruiter"
          className="text-sm text-primary hover:underline"
        >
          ← Recruiter home
        </Link>
      </div>

      {/* ─── Tab bar ─── */}
      <div className="flex flex-wrap gap-2 mb-8">
        {(
          [
            ["members", "Members"],
            ["assignments", "Assignments"],
            ["comments", "Candidate Comments"],
          ] as const
        ).map(([k, label]) => (
          <button
            key={k}
            type="button"
            onClick={() => setTab(k)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === k
                ? "bg-primary text-white"
                : "bg-card border border-border text-muted hover:text-foreground"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* ═══════════════ MEMBERS TAB ═══════════════ */}
      {tab === "members" && (
        <div className="grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={addMember}
            className="bg-card border border-border rounded-2xl p-6 space-y-4 h-fit"
          >
            <h2 className="font-semibold">Add team member</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted">First name</label>
                <input
                  value={mFirst}
                  onChange={(e) => setMFirst(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted">Last name</label>
                <input
                  value={mLast}
                  onChange={(e) => setMLast(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-muted">Short description</label>
              <textarea
                value={mDesc}
                onChange={(e) => setMDesc(e.target.value)}
                rows={3}
                className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                placeholder="Senior recruiter · Tech practice"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium"
            >
              Save member
            </button>
          </form>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold mb-4">
              Members ({data.members.length})
            </h2>
            {data.members.length === 0 && (
              <p className="text-sm text-muted">No members yet.</p>
            )}
            <ul className="space-y-3">
              {data.members.map((m) => (
                <li
                  key={m.id}
                  className={`rounded-xl border px-4 py-3 transition-colors ${
                    selectedMemberId === m.id
                      ? "border-primary bg-primary/10"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <button
                      type="button"
                      className="text-left flex-1"
                      onClick={() => {
                        setSelectedMemberId(m.id);
                        setTab("assignments");
                      }}
                    >
                      <p className="font-medium">
                        {m.firstName} {m.lastName}
                      </p>
                      {m.description && (
                        <p className="text-xs text-muted mt-1">
                          {m.description}
                        </p>
                      )}
                      <p className="text-[10px] text-primary mt-2 uppercase tracking-wider">
                        View assignments →
                      </p>
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteMember(m.id)}
                      className="text-xs text-red-400 hover:text-red-300 shrink-0 mt-0.5"
                      title="Delete member"
                    >
                      ✕
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* ═══════════════ ASSIGNMENTS TAB ═══════════════ */}
      {tab === "assignments" && (
        <div className="grid lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 space-y-4">
            <div className="bg-card border border-border rounded-2xl p-4">
              <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                Filter by member
              </h3>
              <button
                type="button"
                onClick={() => setSelectedMemberId(null)}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm mb-2 ${
                  selectedMemberId === null
                    ? "bg-primary/15 text-primary"
                    : "hover:bg-white/5"
                }`}
              >
                All assignments
              </button>
              <ul className="space-y-1 max-h-64 overflow-y-auto">
                {data.members.map((m) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onClick={() => setSelectedMemberId(m.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                        selectedMemberId === m.id
                          ? "bg-accent/15 text-accent"
                          : "hover:bg-white/5"
                      }`}
                    >
                      {m.firstName} {m.lastName}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card border border-border border-dashed rounded-2xl p-4">
              <h3 className="text-sm font-semibold mb-2">Import Excel</h3>
              <p className="text-xs text-muted mb-3">
                Columns: Title, Description, DueDate, MemberFirstName,
                MemberLastName (headers flexible).
              </p>
              <input
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => onImportExcel(e.target.files?.[0] ?? null)}
                className="text-xs w-full"
              />
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6">
            <form
              onSubmit={addAssignment}
              className="bg-card border border-border rounded-2xl p-6 space-y-4"
            >
              <h2 className="font-semibold">New assignment</h2>
              <div>
                <label className="text-xs text-muted">Owner (member)</label>
                <select
                  value={
                    aMemberId ||
                    effectiveMemberId ||
                    selectedMemberId ||
                    ""
                  }
                  onChange={(e) => setAMemberId(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="">Select member</option>
                  {data.members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.firstName} {m.lastName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs text-muted">Job title</label>
                <input
                  value={aTitle}
                  onChange={(e) => setATitle(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted">Job description</label>
                <textarea
                  value={aDesc}
                  onChange={(e) => setADesc(e.target.value)}
                  rows={4}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted">Hiring due date</label>
                <input
                  type="date"
                  value={aDue}
                  onChange={(e) => setADue(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium"
              >
                Create assignment
              </button>
            </form>

            <div className="bg-card border border-border rounded-2xl p-6">
              <h2 className="font-semibold mb-4">
                Assignments
                {effectiveMemberId && data.members.length
                  ? ` \u00b7 ${
                      data.members.find((x) => x.id === effectiveMemberId)
                        ?.firstName
                    }`
                  : ""}
                <span className="text-muted font-normal text-sm ml-2">
                  ({filteredAssignments.length})
                </span>
              </h2>
              <div className="space-y-3 max-h-[480px] overflow-y-auto">
                {filteredAssignments.length === 0 && (
                  <p className="text-sm text-muted">
                    No assignments for this view.
                  </p>
                )}
                {filteredAssignments.map((a) => {
                  const owner = data.members.find(
                    (m) => m.id === a.memberId
                  );
                  return (
                    <div
                      key={a.id}
                      className="border border-border rounded-xl p-4 text-sm"
                    >
                      <div className="flex justify-between gap-2">
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{a.title}</p>
                          <p className="text-xs text-primary mt-1">
                            {owner
                              ? `${owner.firstName} ${owner.lastName}`
                              : "Unassigned"}
                          </p>
                        </div>
                        <div className="flex items-start gap-2 shrink-0">
                          <span className="text-xs text-muted whitespace-nowrap">
                            Due {a.dueDate}
                          </span>
                          <button
                            type="button"
                            onClick={() => deleteAssignment(a.id)}
                            className="text-xs text-red-400 hover:text-red-300"
                            title="Delete assignment"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                      {a.description && (
                        <p className="text-muted text-xs mt-2 leading-relaxed break-words whitespace-pre-wrap">
                          {a.description}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════ COMMENTS TAB ═══════════════ */}
      {tab === "comments" && (
        <div className="max-w-2xl">
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <h2 className="font-semibold mb-4">Post a comment</h2>
            <form onSubmit={addComment} className="space-y-3">
              <div>
                <label className="text-xs text-muted">Display name</label>
                <input
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="text-xs text-muted">Comment</label>
                <textarea
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  rows={3}
                  className="mt-1 w-full bg-background border border-border rounded-lg px-3 py-2 text-sm resize-y"
                  placeholder="Feedback visible to your agency…"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-medium"
              >
                Post comment
              </button>
            </form>
          </div>

          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="font-semibold mb-4">
              Comments ({data.comments.length})
            </h2>
            {data.comments.length === 0 && (
              <p className="text-sm text-muted">No comments yet.</p>
            )}
            <ul className="space-y-3">
              {[...data.comments].reverse().map((c) => (
                <li
                  key={c.id}
                  className="border border-border rounded-xl p-4 min-w-0"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <p className="text-xs text-muted">
                      <span className="font-medium text-foreground/80">
                        {c.author}
                      </span>{" "}
                      &middot;{" "}
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                    <button
                      type="button"
                      onClick={() => deleteComment(c.id)}
                      className="text-xs text-red-400 hover:text-red-300 shrink-0"
                      title="Delete comment"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-sm text-foreground/90 break-words whitespace-pre-wrap overflow-hidden">
                    {c.text}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
