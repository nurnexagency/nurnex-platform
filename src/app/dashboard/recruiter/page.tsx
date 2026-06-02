"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getDemoSessionClient } from "@/lib/demo-auth";
import { getDemoJobs, countDemoApplications, SAMPLE_CANDIDATES } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { PageLoader } from "@/components/spinner";

type Stats = {
  jobCount: number;
  applicationCount: number;
  candidateCount: number;
};

export default function RecruiterDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        const demo = getDemoSessionClient();
        if (demo?.role === "recruiter") {
          const jobs = getDemoJobs(demo.userId);
          const apps = countDemoApplications(demo.userId);
          setStats({
            jobCount: jobs.length,
            applicationCount: apps,
            candidateCount: SAMPLE_CANDIDATES.length,
          });
        } else {
          setStats({ jobCount: 0, applicationCount: 0, candidateCount: 0 });
        }
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setStats({ jobCount: 0, applicationCount: 0, candidateCount: 0 });
        setLoading(false);
        return;
      }

      const [{ count: jobCount }, { count: applicationCount }, { count: candidateCount }] =
        await Promise.all([
          supabase
            .from("jobs")
            .select("*", { count: "exact", head: true })
            .eq("recruiter_id", user.id),
          supabase
            .from("applications")
            .select("*, jobs!inner(*)", { count: "exact", head: true })
            .eq("jobs.recruiter_id", user.id),
          supabase
            .from("profiles")
            .select("*", { count: "exact", head: true })
            .eq("role", "candidate")
            .eq("verification_status", "verified"),
        ]);

      setStats({
        jobCount: jobCount ?? 0,
        applicationCount: applicationCount ?? 0,
        candidateCount: candidateCount ?? 0,
      });
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <PageLoader />;

  const cards = [
    {
      label: "Active Jobs",
      value: stats?.jobCount ?? 0,
      href: "/dashboard/recruiter/jobs",
      color: "text-primary",
    },
    {
      label: "Applications",
      value: stats?.applicationCount ?? 0,
      href: "/dashboard/recruiter/jobs",
      color: "text-accent",
    },
    {
      label: "Verified Candidates",
      value: stats?.candidateCount ?? 0,
      href: "/dashboard/recruiter/candidates",
      color: "text-green-400",
    },
  ];

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-1">Recruiter Dashboard</h1>
      <p className="text-muted text-sm mb-8">
        Manage your jobs and discover verified candidates.
      </p>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
          >
            <p className="text-sm text-muted mb-2">{card.label}</p>
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <Link
          href="/dashboard/recruiter/board"
          className="flex-1 bg-gradient-to-br from-primary/20 to-accent/10 border border-primary/30 rounded-xl p-6 hover:border-primary/50 transition-colors"
        >
          <p className="text-xs text-primary font-semibold uppercase tracking-wider mb-1">
            Agency board
          </p>
          <p className="font-bold text-foreground">
            Members &middot; Assignments &middot; Results
          </p>
          <p className="text-sm text-muted mt-2">
            Run your recruiting desk: team, roles, imports, fees, candidate
            notes.
          </p>
        </Link>
        <Link
          href="/dashboard/recruiter/onboarding"
          className="flex-1 bg-card border border-border rounded-xl p-6 hover:border-accent/30 transition-colors"
        >
          <p className="text-xs text-muted font-semibold uppercase tracking-wider mb-1">
            Agency setup
          </p>
          <p className="font-bold text-foreground">
            Partner terms &amp; company profile
          </p>
          <p className="text-sm text-muted mt-2">
            Update onboarding or re-download the partnership PDF anytime.
          </p>
        </Link>
      </div>

      <div className="flex gap-4">
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors"
        >
          Post a Job
        </Link>
        <Link
          href="/dashboard/recruiter/candidates"
          className="px-6 py-3 bg-card border border-border hover:border-primary/30 text-foreground rounded-xl text-sm font-medium transition-colors"
        >
          Browse Candidates
        </Link>
      </div>
    </div>
  );
}
