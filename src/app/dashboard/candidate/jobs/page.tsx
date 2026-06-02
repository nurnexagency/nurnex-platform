"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getDemoSessionClient } from "@/lib/demo-auth";
import {
  getDemoJobsForCandidates,
  getDemoCandidateAppliedJobIds,
  createDemoCandidateApplication,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { Spinner, PageLoader } from "@/components/spinner";
import { toast } from "@/components/toast";

type Job = {
  id: string;
  title: string;
  description: string | null;
  skills_required: string[];
  experience_level: string | null;
  created_at: string;
  booking_url: string | null;
};

export default function CandidateJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState<string | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Set<string>>(new Set());
  const [skillFilter, setSkillFilter] = useState("");
  const [fieldFilter, setFieldFilter] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [demoUserId, setDemoUserId] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        const demo = getDemoSessionClient();
        setIsDemo(true);
        if (demo) {
          setDemoUserId(demo.userId);
          setAppliedJobs(getDemoCandidateAppliedJobIds(demo.userId));
        }
        const dj = getDemoJobsForCandidates();
        setJobs(
          dj.map((j) => ({
            id: j.id,
            title: j.title,
            description: j.description,
            skills_required: j.skills_required,
            experience_level: j.experience_level,
            created_at: j.created_at,
            booking_url: j.booking_url,
          }))
        );
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data: jobsData } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "active")
        .order("created_at", { ascending: false });

      setJobs(jobsData ?? []);

      if (user) {
        const { data: apps } = await supabase
          .from("applications")
          .select("job_id")
          .eq("candidate_id", user.id);

        setAppliedJobs(
          new Set(apps?.map((a: { job_id: string }) => a.job_id) ?? [])
        );
      }

      setLoading(false);
    }
    load();
  }, []);

  async function handleApply(jobId: string) {
    setApplying(jobId);

    if (isDemo && demoUserId) {
      createDemoCandidateApplication(demoUserId, jobId);
      setAppliedJobs((prev) => new Set(prev).add(jobId));
      toast("Interview requested! (demo mode)", "success");
      setApplying(null);
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      setApplying(null);
      return;
    }

    const { error } = await supabase.from("applications").insert({
      candidate_id: user.id,
      job_id: jobId,
      stage: "requested",
    });

    if (error) {
      toast(error.message, "error");
    } else {
      toast("Interview requested!", "success");
      setAppliedJobs((prev) => new Set(prev).add(jobId));
    }
    setApplying(null);
  }

  const filtered = jobs.filter((job) => {
    if (
      skillFilter &&
      !job.skills_required?.some((s) =>
        s.toLowerCase().includes(skillFilter.toLowerCase())
      )
    )
      return false;
    if (
      fieldFilter &&
      job.experience_level?.toLowerCase() !== fieldFilter.toLowerCase()
    )
      return false;
    return true;
  });

  if (loading) return <PageLoader />;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">Browse Jobs</h1>
      <p className="text-muted text-sm mb-6">
        Explore open positions and request interviews.
      </p>

      <div className="flex gap-3 mb-8">
        <input
          type="text"
          placeholder="Filter by skill..."
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 flex-1"
        />
        <select
          value={fieldFilter}
          onChange={(e) => setFieldFilter(e.target.value)}
          className="bg-card border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
        >
          <option value="">All Levels</option>
          <option value="Junior">Junior</option>
          <option value="Mid-Level">Mid-Level</option>
          <option value="Senior">Senior</option>
          <option value="Lead">Lead</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted">No jobs found matching your filters.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold mb-1">{job.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted">
                    {job.experience_level && (
                      <span>{job.experience_level}</span>
                    )}
                    <span>
                      {new Date(job.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {job.description && (
                <p className="text-sm text-muted mt-3 line-clamp-3">
                  {job.description}
                </p>
              )}

              {job.skills_required?.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.skills_required.map((skill) => (
                    <span
                      key={skill}
                      className="text-xs bg-background border border-border px-2 py-0.5 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-4">
                {appliedJobs.has(job.id) ? (
                  <span className="text-sm text-primary">
                    &#10003; Interview Requested
                  </span>
                ) : (
                  <button
                    onClick={() => handleApply(job.id)}
                    disabled={applying === job.id}
                    className="px-4 py-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    {applying === job.id && <Spinner className="h-4 w-4" />}
                    Request Interview
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
