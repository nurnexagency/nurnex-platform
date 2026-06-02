"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getDemoCandidates, type DemoCandidate } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { PageLoader } from "@/components/spinner";

type Candidate = {
  id: string;
  full_name: string | null;
  email: string;
  field: string | null;
  resume_score: number | null;
  bio: string | null;
};

export default function CandidatesPage() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [fieldFilter, setFieldFilter] = useState("");

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        const dc = getDemoCandidates(fieldFilter || undefined);
        setCandidates(
          dc.map((c: DemoCandidate) => ({
            id: c.id,
            full_name: c.full_name,
            email: c.email,
            field: c.field,
            resume_score: c.resume_score,
            bio: c.bio,
          }))
        );
        setLoading(false);
        return;
      }

      const supabase = createClient();
      let query = supabase
        .from("profiles")
        .select("id, full_name, email, field, resume_score, bio")
        .eq("role", "candidate")
        .eq("verification_status", "verified")
        .order("resume_score", { ascending: false, nullsFirst: false });

      if (fieldFilter) {
        query = query.eq("field", fieldFilter);
      }

      const { data } = await query;
      setCandidates(data ?? []);
      setLoading(false);
    }
    load();
  }, [fieldFilter]);

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">Verified Candidates</h1>
          <p className="text-muted text-sm">
            Browse verified candidate profiles.
          </p>
        </div>
        <select
          value={fieldFilter}
          onChange={(e) => {
            setLoading(true);
            setFieldFilter(e.target.value);
          }}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Fields</option>
          <option value="Data Analyst">Data Analyst</option>
          <option value="Developer">Developer</option>
          <option value="Designer">Designer</option>
          <option value="Other">Other</option>
        </select>
      </div>

      {candidates.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted">No verified candidates found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {candidates.map((candidate) => (
            <Link
              key={candidate.id}
              href={`/dashboard/recruiter/candidates/${candidate.id}`}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">
                    {candidate.full_name ?? "Unnamed"}
                  </h3>
                  <p className="text-sm text-muted">
                    {candidate.field ?? "No field specified"}
                  </p>
                </div>
                {candidate.resume_score != null && (
                  <div
                    className={`text-lg font-bold ${
                      candidate.resume_score >= 80
                        ? "text-accent"
                        : candidate.resume_score >= 60
                          ? "text-primary"
                          : "text-muted"
                    }`}
                  >
                    {candidate.resume_score}
                  </div>
                )}
              </div>
              {candidate.bio && (
                <p className="text-sm text-muted line-clamp-2">
                  {candidate.bio}
                </p>
              )}
              <div className="mt-3 flex items-center gap-2">
                <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">
                  ✦ Verified
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
