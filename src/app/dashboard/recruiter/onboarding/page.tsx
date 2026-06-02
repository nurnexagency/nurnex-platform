"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getDemoSessionClient } from "@/lib/demo-auth";
import { createClient } from "@/lib/supabase/client";
import { downloadPartnershipPdf } from "@/lib/recruiter-board/partnership-pdf";
import { loadBoard, saveBoard } from "@/lib/recruiter-board/storage";
import type { AgencyProfile } from "@/lib/recruiter-board/types";
import { PageLoader } from "@/components/spinner";
import { toast } from "@/components/toast";

export default function RecruiterOnboardingPage() {
  const router = useRouter();
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeCount, setEmployeeCount] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [address, setAddress] = useState("");
  const [weeklyJobLimit, setWeeklyJobLimit] = useState("10");
  const [agreed, setAgreed] = useState(false);

  const [alreadyComplete, setAlreadyComplete] = useState(false);

  useEffect(() => {
    async function run() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      let uid: string | null = user?.id ?? null;
      let userEmail = user?.email ?? "";

      if (!uid) {
        const demo = getDemoSessionClient();
        if (demo?.role !== "recruiter") {
          router.replace("/login");
          return;
        }
        uid = demo.userId;
        userEmail = demo.email;
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
      if (userEmail) setEmail(userEmail);
      const board = loadBoard(uid);
      if (board.agency) {
        setAlreadyComplete(true);
        setCompanyName(board.agency.companyName);
        setEmail(board.agency.email);
        setEmployeeCount(String(board.agency.employeeCount));
        setFocusArea(board.agency.focusArea);
        setAddress(board.agency.address);
        setWeeklyJobLimit(String(board.agency.weeklyJobLimit));
        setAgreed(true);
      }
      setLoading(false);
    }
    run();
  }, [router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!userId || !agreed) {
      toast("Please accept the partner agreement.", "error");
      return;
    }

    const ec = parseInt(employeeCount, 10);
    const wl = parseInt(weeklyJobLimit, 10);
    if (!companyName.trim() || !email.trim() || !focusArea.trim() || !address.trim()) {
      toast("Fill in all fields.", "error");
      return;
    }
    if (Number.isNaN(ec) || ec < 0) {
      toast("Enter a valid employee count.", "error");
      return;
    }
    if (Number.isNaN(wl) || wl < 1) {
      toast("Weekly job limit must be at least 1.", "error");
      return;
    }

    setSubmitting(true);
    const agreedAt = new Date().toISOString();

    try {
      const res = await fetch("/api/recruiter/agreement", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyName: companyName.trim(),
          email: email.trim(),
          employeeCount: ec,
          focusArea: focusArea.trim(),
          address: address.trim(),
          weeklyJobLimit: wl,
          agreedAt,
        }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        toast((j as { error?: string }).error ?? "Could not record agreement.", "error");
        setSubmitting(false);
        return;
      }

      const agency: AgencyProfile = {
        companyName: companyName.trim(),
        email: email.trim(),
        employeeCount: ec,
        focusArea: focusArea.trim(),
        address: address.trim(),
        weeklyJobLimit: wl,
        agreementAcceptedAt: agreedAt,
      };

      const board = loadBoard(userId);
      board.agency = agency;
      saveBoard(userId, board);

      downloadPartnershipPdf(agency.companyName, agency.email);
      toast(
        "Agreement saved. PDF download started. Check inbox once email is configured (Resend).",
        "success"
      );
      router.push("/dashboard/recruiter/board");
    } catch {
      toast("Something went wrong.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading || !userId) return <PageLoader />;

  return (
    <div className="max-w-2xl">
      <p className="text-xs text-muted uppercase tracking-wider mb-2">
        Recruiter · Agency setup
      </p>
      <h1 className="text-2xl font-bold mb-1">Partner onboarding</h1>
      <p className="text-muted text-sm mb-8">
        Register your recruiting agency. After you accept the terms, we record the
        agreement and generate a PDF summary. Email delivery works when{" "}
        <code className="text-foreground/80 text-xs">RESEND_API_KEY</code> is set;
        until then, details are logged on the server.
      </p>

      {alreadyComplete && (
        <div className="mb-6 rounded-xl border border-accent/30 bg-accent/10 px-4 py-3 flex flex-wrap items-center gap-3">
          <span className="text-sm text-foreground">
            Agency profile is on file. You can open the board or download the PDF again.
          </span>
          <Link
            href="/dashboard/recruiter/board"
            className="text-sm font-medium text-primary hover:underline"
          >
            Open agency board
          </Link>
          <button
            type="button"
            onClick={() =>
              companyName.trim() &&
              downloadPartnershipPdf(companyName.trim(), email.trim())
            }
            className="text-sm font-medium text-accent hover:underline"
          >
            Download PDF again
          </button>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="bg-card border border-border rounded-2xl p-6 space-y-5"
      >
        <div>
          <label className="block text-sm text-muted mb-1.5">Company name (agency)</label>
          <input
            required
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="Acme Talent Partners"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1.5">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1.5">Number of employees</label>
          <input
            type="number"
            min={0}
            required
            value={employeeCount}
            onChange={(e) => setEmployeeCount(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="e.g. 25"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1.5">
            Main focus (roles / sector)
          </label>
          <input
            required
            value={focusArea}
            onChange={(e) => setFocusArea(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
            placeholder="e.g. Technology · Finance · Executive search"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1.5">Agency address</label>
          <textarea
            required
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-y"
            placeholder="Street, city, region, postal code, country"
          />
        </div>
        <div>
          <label className="block text-sm text-muted mb-1.5">
            Weekly job publish limit
          </label>
          <input
            type="number"
            min={1}
            required
            value={weeklyJobLimit}
            onChange={(e) => setWeeklyJobLimit(e.target.value)}
            className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
          />
          <p className="text-xs text-muted mt-1">
            Maximum new or active listings per calendar week (you can enforce tiers later).
          </p>
        </div>

        <div className="rounded-xl border border-border bg-background/60 p-4 space-y-3">
          <p className="text-sm font-medium text-foreground">Partner agreement</p>
          <p className="text-xs text-muted leading-relaxed">
            By checking the box below, the recruiting agency named above and Nurnex agree
            to partner on the platform. For each successful hire, the agency commits to a{" "}
            <strong className="text-foreground">minimum USD $1,000</strong> commission to
            Nurnex; the amount may vary by sector and candidate. Exact fees will appear in
            your agency board when you publish assignments. A PDF summary is generated on
            accept. Emails are sent to MovlanAliyev@Nurnex.com and your address when email
            is configured.
          </p>
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 rounded border-border"
            />
            <span className="text-sm text-foreground">
              I have read and accept the partner terms described above.
            </span>
          </label>
        </div>

        <div className="flex flex-wrap gap-3 pt-2">
          <button
            type="submit"
            disabled={submitting || !agreed}
            className="px-6 py-3 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium"
          >
            {submitting
              ? "Saving…"
              : alreadyComplete
                ? "Update & submit again"
                : "Complete setup & download PDF"}
          </button>
          <Link
            href="/dashboard/recruiter"
            className="px-6 py-3 border border-border rounded-xl text-sm text-muted hover:text-foreground"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}
