"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getDemoSessionClient } from "@/lib/demo-auth";
import {
  getDemoJobs,
  getDemoApplications,
  updateDemoApplicationStage,
  updateDemoJobStatus,
  type DemoJob,
} from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { PageLoader } from "@/components/spinner";
import { toast } from "@/components/toast";

type Job = {
  id: string;
  title: string;
  description: string;
  status: string;
  skills_required: string[];
  experience_level: string | null;
  booking_url: string | null;
  created_at: string;
};

type Application = {
  id: string;
  candidate_id: string;
  stage: string;
  meeting_link: string | null;
  scheduled_at: string | null;
  created_at: string;
  profiles: {
    full_name: string | null;
    email: string;
    field: string | null;
  } | null;
};

export default function RecruiterJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loadingApps, setLoadingApps] = useState(false);
  const [isDemo, setIsDemo] = useState(false);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        const demo = getDemoSessionClient();
        if (demo) {
          setIsDemo(true);
          const dj = getDemoJobs(demo.userId);
          setJobs(
            dj.map((j: DemoJob) => ({
              id: j.id,
              title: j.title,
              description: j.description,
              status: j.status,
              skills_required: j.skills_required,
              experience_level: j.experience_level,
              booking_url: j.booking_url,
              created_at: j.created_at,
            }))
          );
        }
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("jobs")
        .select("*")
        .eq("recruiter_id", user.id)
        .order("created_at", { ascending: false });

      setJobs(data ?? []);
      setLoading(false);
    }
    load();
  }, []);

  function loadApplications(jobId: string) {
    if (expandedJob === jobId) {
      setExpandedJob(null);
      return;
    }
    setExpandedJob(jobId);
    setLoadingApps(true);

    if (isDemo) {
      const apps = getDemoApplications(jobId);
      setApplications(apps);
      setLoadingApps(false);
      return;
    }

    const supabase = createClient();
    supabase
      .from("applications")
      .select("*, profiles:candidate_id(full_name, email, field)")
      .eq("job_id", jobId)
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setApplications((data as unknown as Application[]) ?? []);
        setLoadingApps(false);
      });
  }

  function handleUpdateStage(
    applicationId: string,
    stage: string,
    meetingLink?: string
  ) {
    if (isDemo) {
      updateDemoApplicationStage(
        applicationId,
        stage as "scheduled" | "completed",
        meetingLink
      );
      setApplications((prev) =>
        prev.map((a) =>
          a.id === applicationId
            ? {
                ...a,
                stage,
                ...(meetingLink ? { meeting_link: meetingLink } : {}),
              }
            : a
        )
      );
      toast("Application updated", "success");
      return;
    }

    const supabase = createClient();
    const updateData: Record<string, string> = { stage };
    if (meetingLink) updateData.meeting_link = meetingLink;

    supabase
      .from("applications")
      .update(updateData)
      .eq("id", applicationId)
      .then(({ error }) => {
        if (error) {
          toast(error.message, "error");
          return;
        }
        setApplications((prev) =>
          prev.map((a) =>
            a.id === applicationId
              ? {
                  ...a,
                  stage,
                  ...(meetingLink ? { meeting_link: meetingLink } : {}),
                }
              : a
          )
        );
        toast("Application updated", "success");
      });
  }

  function handleCloseJob(jobId: string) {
    if (isDemo) {
      updateDemoJobStatus(jobId, "closed");
      setJobs((prev) =>
        prev.map((j) => (j.id === jobId ? { ...j, status: "closed" } : j))
      );
      toast("Job closed", "success");
      return;
    }
    const supabase = createClient();
    supabase
      .from("jobs")
      .update({ status: "closed" })
      .eq("id", jobId)
      .then(({ error }) => {
        if (error) {
          toast(error.message, "error");
          return;
        }
        setJobs((prev) =>
          prev.map((j) => (j.id === jobId ? { ...j, status: "closed" } : j))
        );
        toast("Job closed", "success");
      });
  }

  if (loading) return <PageLoader />;

  const stageBadge = (stage: string) => {
    const colors: Record<string, string> = {
      requested: "bg-yellow-900/30 text-yellow-400",
      invited: "bg-blue-900/30 text-blue-400",
      scheduled: "bg-primary/20 text-primary",
      completed: "bg-green-900/30 text-green-400",
      rejected: "bg-red-900/30 text-red-400",
    };
    return colors[stage] ?? "bg-border text-muted";
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-1">My Jobs</h1>
          <p className="text-muted text-sm">
            Manage your job listings and applications.
          </p>
        </div>
        <Link
          href="/dashboard/recruiter/jobs/new"
          className="px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-lg text-sm font-medium transition-colors"
        >
          + New Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted mb-4">No jobs posted yet.</p>
          <Link
            href="/dashboard/recruiter/jobs/new"
            className="text-primary hover:underline text-sm"
          >
            Post your first job →
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-6">
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
                    {job.description && (
                      <p className="text-xs text-muted mt-2 line-clamp-2 max-w-lg">
                        {job.description}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full ${
                        job.status === "active"
                          ? "bg-green-900/30 text-green-400"
                          : "bg-border text-muted"
                      }`}
                    >
                      {job.status}
                    </span>
                    {job.status === "active" && (
                      <button
                        onClick={() => handleCloseJob(job.id)}
                        className="text-xs text-red-400 hover:underline"
                      >
                        Close
                      </button>
                    )}
                  </div>
                </div>

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

                <button
                  onClick={() => loadApplications(job.id)}
                  className="mt-4 text-sm text-primary hover:underline"
                >
                  {expandedJob === job.id
                    ? "Hide Applications"
                    : "View Applications"}
                </button>
              </div>

              {expandedJob === job.id && (
                <div className="border-t border-border p-6 bg-background/50">
                  {loadingApps ? (
                    <p className="text-sm text-muted">Loading...</p>
                  ) : applications.length === 0 ? (
                    <p className="text-sm text-muted">No applications yet.</p>
                  ) : (
                    <div className="space-y-3">
                      {applications.map((app) => (
                        <div
                          key={app.id}
                          className="flex items-center justify-between bg-card border border-border rounded-lg p-4"
                        >
                          <div>
                            <p className="font-medium text-sm">
                              {app.profiles?.full_name ??
                                app.profiles?.email ??
                                "Unknown"}
                            </p>
                            <p className="text-xs text-muted">
                              {app.profiles?.field ?? "No field"}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`text-xs px-2 py-0.5 rounded-full ${stageBadge(app.stage)}`}
                            >
                              {app.stage}
                            </span>
                            {app.stage === "requested" && (
                              <button
                                onClick={() => {
                                  const link = prompt("Enter meeting link:");
                                  if (link) {
                                    handleUpdateStage(
                                      app.id,
                                      "scheduled",
                                      link
                                    );
                                  }
                                }}
                                className="text-xs text-primary hover:underline"
                              >
                                Schedule
                              </button>
                            )}
                            {app.stage === "scheduled" && (
                              <button
                                onClick={() =>
                                  handleUpdateStage(app.id, "completed")
                                }
                                className="text-xs text-green-400 hover:underline"
                              >
                                Complete
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
