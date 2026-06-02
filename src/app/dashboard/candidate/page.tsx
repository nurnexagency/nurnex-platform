"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { type VerificationChecklist } from "@/lib/verification";
import Link from "next/link";
import { PageLoader } from "@/components/spinner";

type Profile = {
  full_name: string | null;
  verification_status: string;
  resume_score: number | null;
  field: string | null;
};

export default function CandidateDashboard() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [checklist, setChecklist] = useState<VerificationChecklist | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const [{ data: p }, { data: videos }] = await Promise.all([
        supabase
          .from("profiles")
          .select("full_name, verification_status, resume_score, field, resume_url, portfolio_url, github_url")
          .eq("id", user.id)
          .single(),
        supabase
          .from("candidate_videos")
          .select("type")
          .eq("user_id", user.id),
      ]);

      setProfile(p);

      const videoTypes = new Set(videos?.map((v: { type: string }) => v.type) ?? []);
      const cl: VerificationChecklist = {
        hasResume: !!p?.resume_url,
        resumeScorePassing: (p?.resume_score ?? 0) >= 60,
        hasIntroVideo: videoTypes.has("intro"),
        hasProjectVideo: videoTypes.has("project"),
        hasExpectationsVideo: videoTypes.has("expectations"),
        hasPortfolioUrl: !!(p?.portfolio_url || p?.github_url),
        allMet: false,
      };
      cl.allMet =
        cl.hasResume &&
        cl.resumeScorePassing &&
        cl.hasIntroVideo &&
        cl.hasProjectVideo &&
        cl.hasExpectationsVideo &&
        cl.hasPortfolioUrl;
      setChecklist(cl);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <PageLoader />;

  const items = checklist
    ? [
        { label: "Upload resume", done: checklist.hasResume, href: "/dashboard/candidate/profile" },
        { label: "Resume score ≥ 60", done: checklist.resumeScorePassing, href: "/dashboard/candidate/profile" },
        { label: "Intro video", done: checklist.hasIntroVideo, href: "/dashboard/candidate/videos" },
        { label: "Project video", done: checklist.hasProjectVideo, href: "/dashboard/candidate/videos" },
        { label: "Expectations video", done: checklist.hasExpectationsVideo, href: "/dashboard/candidate/videos" },
        { label: "Portfolio or GitHub URL", done: checklist.hasPortfolioUrl, href: "/dashboard/candidate/profile" },
      ]
    : [];

  const completedCount = items.filter((i) => i.done).length;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">
        Welcome{profile?.full_name ? `, ${profile.full_name}` : ""}
      </h1>
      <p className="text-muted text-sm mb-8">
        {profile?.field ? profile.field + " • " : ""}
        {profile?.verification_status === "verified" ? (
          <span className="text-accent">✦ Verified</span>
        ) : (
          "Complete your profile to get verified"
        )}
      </p>

      {profile?.verification_status === "verified" ? (
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
          <h2 className="text-accent font-semibold mb-2">You&apos;re Verified</h2>
          <p className="text-sm text-muted">
            Your profile is visible to recruiters. Browse open positions and
            wait for interview invitations.
          </p>
          <Link
            href="/dashboard/candidate/jobs"
            className="inline-block mt-4 text-sm text-primary hover:underline"
          >
            Browse Jobs →
          </Link>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold">Verification Checklist</h2>
            <span className="text-sm text-muted">
              {completedCount}/{items.length} completed
            </span>
          </div>
          <div className="w-full bg-background rounded-full h-2 mb-6">
            <div
              className="bg-primary h-2 rounded-full transition-all"
              style={{
                width: `${(completedCount / items.length) * 100}%`,
              }}
            />
          </div>
          <div className="space-y-3">
            {items.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-3 text-sm group"
              >
                <span
                  className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs ${
                    item.done
                      ? "bg-primary border-primary text-white"
                      : "border-border text-transparent"
                  }`}
                >
                  ✓
                </span>
                <span
                  className={
                    item.done
                      ? "text-muted line-through"
                      : "text-foreground group-hover:text-primary transition-colors"
                  }
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {profile?.resume_score != null && (
        <div className="mt-6 bg-card border border-border rounded-xl p-6">
          <h3 className="font-semibold mb-2">Resume Score</h3>
          <div className="flex items-center gap-4">
            <div
              className={`text-4xl font-bold ${
                profile.resume_score >= 60 ? "text-primary" : "text-red-400"
              }`}
            >
              {profile.resume_score}
            </div>
            <span className="text-sm text-muted">/ 100</span>
          </div>
        </div>
      )}
    </div>
  );
}
