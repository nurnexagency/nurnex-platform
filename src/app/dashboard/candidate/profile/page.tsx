"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Spinner, PageLoader } from "@/components/spinner";
import { toast } from "@/components/toast";

type ProfileData = {
  full_name: string;
  field: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
  resume_url: string;
  resume_score: number | null;
  resume_feedback: { score: number; feedback: string[]; formatting_issues: string[] } | null;
};

const FIELDS = ["Data Analyst", "Developer", "Designer", "Other"];

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>({
    full_name: "",
    field: "",
    bio: "",
    github_url: "",
    portfolio_url: "",
    resume_url: "",
    resume_score: null,
    resume_feedback: null,
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [scoring, setScoring] = useState(false);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("profiles")
        .select(
          "full_name, field, bio, github_url, portfolio_url, resume_url, resume_score, resume_feedback"
        )
        .eq("id", user.id)
        .single();

      if (data) {
        setProfile({
          full_name: data.full_name ?? "",
          field: data.field ?? "",
          bio: data.bio ?? "",
          github_url: data.github_url ?? "",
          portfolio_url: data.portfolio_url ?? "",
          resume_url: data.resume_url ?? "",
          resume_score: data.resume_score,
          resume_feedback: data.resume_feedback as ProfileData["resume_feedback"],
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: profile.full_name,
        field: profile.field,
        bio: profile.bio,
        github_url: profile.github_url,
        portfolio_url: profile.portfolio_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id);

    if (error) {
      toast(error.message, "error");
    } else {
      toast("Profile updated", "success");

      try {
        await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: user.id }),
        });
      } catch {
        // verification check is best-effort
      }
    }
    setSaving(false);
  }

  async function handleResumeUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return;

    const path = `${user.id}/resume.pdf`;

    const { error: uploadError } = await supabase.storage
      .from("resumes")
      .upload(path, file, { upsert: true });

    if (uploadError) {
      toast("Failed to upload resume: " + uploadError.message, "error");
      setUploading(false);
      return;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("resumes").getPublicUrl(path);

    await supabase
      .from("profiles")
      .update({ resume_url: publicUrl })
      .eq("id", user.id);

    setProfile((prev) => ({ ...prev, resume_url: publicUrl }));
    toast("Resume uploaded", "success");
    setUploading(false);

    scoreResume(user.id);
  }

  async function scoreResume(userId: string) {
    setScoring(true);
    try {
      const res = await fetch("/api/score-resume", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.score != null) {
        setProfile((prev) => ({
          ...prev,
          resume_score: data.score,
          resume_feedback: data,
        }));
        toast(`Resume scored: ${data.score}/100`, "success");

        await fetch("/api/score-skills", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        await fetch("/api/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });
      }
    } catch {
      toast("Failed to score resume", "error");
    }
    setScoring(false);
  }

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Profile</h1>
      <p className="text-muted text-sm mb-8">
        Complete your profile to get verified by recruiters.
      </p>

      <form onSubmit={handleSave} className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">Full Name</label>
            <input
              type="text"
              value={profile.full_name}
              onChange={(e) =>
                setProfile((p) => ({ ...p, full_name: e.target.value }))
              }
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Field</label>
            <select
              value={profile.field}
              onChange={(e) =>
                setProfile((p) => ({ ...p, field: e.target.value }))
              }
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
            >
              <option value="">Select a field</option>
              {FIELDS.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={profile.bio}
              onChange={(e) =>
                setProfile((p) => ({ ...p, bio: e.target.value }))
              }
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              GitHub URL
            </label>
            <input
              type="url"
              value={profile.github_url}
              onChange={(e) =>
                setProfile((p) => ({ ...p, github_url: e.target.value }))
              }
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="https://github.com/username"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Portfolio URL
            </label>
            <input
              type="url"
              value={profile.portfolio_url}
              onChange={(e) =>
                setProfile((p) => ({ ...p, portfolio_url: e.target.value }))
              }
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="https://your-portfolio.com"
            />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-6">
          <label className="block text-sm text-muted mb-3">Resume (PDF)</label>
          {profile.resume_url && (
            <p className="text-xs text-primary mb-3">✓ Resume uploaded</p>
          )}
          <input
            type="file"
            accept=".pdf"
            onChange={handleResumeUpload}
            disabled={uploading}
            className="text-sm text-muted"
          />
          {uploading && (
            <div className="flex items-center gap-2 mt-2 text-sm text-muted">
              <Spinner className="h-4 w-4" /> Uploading...
            </div>
          )}
          {scoring && (
            <div className="flex items-center gap-2 mt-2 text-sm text-muted">
              <Spinner className="h-4 w-4" /> Scoring resume with AI...
            </div>
          )}
        </div>

        {profile.resume_score != null && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h3 className="font-semibold mb-3">Resume Score</h3>
            <div className="flex items-center gap-4 mb-4">
              <div
                className={`text-4xl font-bold ${
                  profile.resume_score >= 60 ? "text-primary" : "text-red-400"
                }`}
              >
                {profile.resume_score}
              </div>
              <span className="text-sm text-muted">/ 100</span>
            </div>
            {profile.resume_feedback?.feedback && (
              <div>
                <p className="text-sm text-muted mb-2">Feedback:</p>
                <ul className="space-y-1">
                  {profile.resume_feedback.feedback.map((f, i) => (
                    <li key={i} className="text-sm text-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">•</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {profile.resume_feedback?.formatting_issues &&
              profile.resume_feedback.formatting_issues.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm text-muted mb-2">
                    Formatting Issues:
                  </p>
                  <ul className="space-y-1">
                    {profile.resume_feedback.formatting_issues.map((f, i) => (
                      <li
                        key={i}
                        className="text-sm text-red-400 flex items-start gap-2"
                      >
                        <span className="mt-0.5">⚠</span> {f}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        )}

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
        >
          {saving && <Spinner className="h-4 w-4" />}
          Save Profile
        </button>
      </form>
    </div>
  );
}
