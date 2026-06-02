"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getDemoCandidate, type DemoCandidate } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { PageLoader } from "@/components/spinner";
import Link from "next/link";

type CandidateProfile = {
  id: string;
  full_name: string | null;
  email: string;
  field: string | null;
  bio: string | null;
  resume_url: string | null;
  resume_score: number | null;
  github_url: string | null;
  portfolio_url: string | null;
};

type Video = { type: string; video_url: string };
type Skill = { skill_name: string; score: number };

export default function CandidateDetailPage() {
  const params = useParams();
  const candidateId = params.id as string;

  const [profile, setProfile] = useState<CandidateProfile | null>(null);
  const [videos, setVideos] = useState<Video[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        const c: DemoCandidate | undefined = getDemoCandidate(candidateId);
        if (c) {
          setProfile({
            id: c.id,
            full_name: c.full_name,
            email: c.email,
            field: c.field,
            bio: c.bio,
            resume_url: c.resume_url,
            resume_score: c.resume_score,
            github_url: c.github_url,
            portfolio_url: c.portfolio_url,
          });
          setSkills(c.skills);
          setVideos(c.videos.filter((v) => v.video_url));
        }
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const [{ data: p }, { data: v }, { data: s }] = await Promise.all([
        supabase
          .from("profiles")
          .select(
            "id, full_name, email, field, bio, resume_url, resume_score, github_url, portfolio_url"
          )
          .eq("id", candidateId)
          .single(),
        supabase
          .from("candidate_videos")
          .select("type, video_url")
          .eq("user_id", candidateId),
        supabase
          .from("skill_scores")
          .select("skill_name, score")
          .eq("user_id", candidateId)
          .order("score", { ascending: false }),
      ]);

      setProfile(p);
      setVideos(v ?? []);
      setSkills(s ?? []);
      setLoading(false);
    }
    load();
  }, [candidateId]);

  if (loading) return <PageLoader />;
  if (!profile) {
    return (
      <div className="text-center py-20">
        <p className="text-muted">Candidate not found.</p>
        <Link
          href="/dashboard/recruiter/candidates"
          className="text-primary hover:underline text-sm mt-4 inline-block"
        >
          ← Back to Candidates
        </Link>
      </div>
    );
  }

  const videoLabels: Record<string, string> = {
    intro: "Introduction",
    project: "Project Explanation",
    expectations: "Expectations",
  };

  return (
    <div className="max-w-3xl">
      <Link
        href="/dashboard/recruiter/candidates"
        className="text-sm text-muted hover:text-foreground transition-colors mb-6 inline-block"
      >
        ← Back to Candidates
      </Link>

      <div className="bg-card border border-border rounded-xl p-6 mb-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-bold">
              {profile.full_name ?? "Unnamed"}
            </h1>
            <p className="text-muted text-sm mt-1">
              {profile.field ?? "No field"} &bull; {profile.email}
            </p>
          </div>
          <span className="text-xs bg-accent/10 text-accent px-3 py-1 rounded-full">
            ✦ Verified
          </span>
        </div>

        {profile.bio && (
          <p className="text-sm text-muted mt-4">{profile.bio}</p>
        )}

        <div className="flex gap-4 mt-4">
          {profile.github_url && (
            <a
              href={profile.github_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              GitHub →
            </a>
          )}
          {profile.portfolio_url && (
            <a
              href={profile.portfolio_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Portfolio →
            </a>
          )}
          {profile.resume_url && (
            <a
              href={profile.resume_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-primary hover:underline"
            >
              Resume →
            </a>
          )}
        </div>
      </div>

      {profile.resume_score != null && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="font-semibold mb-3">Resume Score</h2>
          <div className="flex items-center gap-4">
            <div
              className={`text-4xl font-bold ${
                profile.resume_score >= 80
                  ? "text-accent"
                  : profile.resume_score >= 60
                    ? "text-primary"
                    : "text-red-400"
              }`}
            >
              {profile.resume_score}
            </div>
            <span className="text-sm text-muted">/ 100</span>
          </div>
        </div>
      )}

      {skills.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6 mb-6">
          <h2 className="font-semibold mb-4">Skills</h2>
          <div className="space-y-3">
            {skills.map((skill) => (
              <div key={skill.skill_name}>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>{skill.skill_name}</span>
                  <span className="text-muted">{skill.score}/100</span>
                </div>
                <div className="w-full bg-background rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {videos.length > 0 && (
        <div className="bg-card border border-border rounded-xl p-6">
          <h2 className="font-semibold mb-4">Videos</h2>
          <div className="space-y-4">
            {videos.map((video) => (
              <div key={video.type}>
                <p className="text-sm text-muted mb-2">
                  {videoLabels[video.type] ?? video.type}
                </p>
                <video
                  src={video.video_url}
                  controls
                  className="w-full max-h-64 rounded-lg bg-background"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
