"use client";

import { useEffect, useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getDemoSessionClient } from "@/lib/demo-auth";
import { getDemoCandidateApplications } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { PageLoader } from "@/components/spinner";

type Application = {
  id: string;
  stage: string;
  meeting_link: string | null;
  scheduled_at?: string | null;
  created_at: string;
  jobs: { title: string; description: string | null } | null;
};

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        const demo = getDemoSessionClient();
        if (demo) {
          const apps = getDemoCandidateApplications(demo.userId);
          setApplications(
            apps.map((a) => ({
              id: a.id,
              stage: a.stage,
              meeting_link: a.meeting_link,
              created_at: a.created_at,
              jobs: a.jobs,
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
        .from("applications")
        .select("*, jobs:job_id(title, description)")
        .eq("candidate_id", user.id)
        .order("created_at", { ascending: false });

      setApplications((data as unknown as Application[]) ?? []);
      setLoading(false);
    }
    load();
  }, []);

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

  const stageSteps = ["requested", "scheduled", "completed"];

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-bold mb-1">My Applications</h1>
      <p className="text-muted text-sm mb-8">
        Track your interview requests and their progress.
      </p>

      {applications.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <p className="text-muted">No applications yet.</p>
          <p className="text-sm text-muted mt-2">
            Browse jobs and request interviews to see them here.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map((app) => (
            <div
              key={app.id}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold">
                    {app.jobs?.title ?? "Unknown Job"}
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    Applied {new Date(app.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2.5 py-1 rounded-full capitalize ${stageBadge(app.stage)}`}
                >
                  {app.stage}
                </span>
              </div>

              <div className="flex items-center gap-1 mb-4">
                {stageSteps.map((step, i) => {
                  const currentIdx = stageSteps.indexOf(app.stage);
                  const isActive = i <= currentIdx;
                  return (
                    <div
                      key={step}
                      className="flex items-center gap-1 flex-1"
                    >
                      <div
                        className={`h-1.5 rounded-full flex-1 ${
                          isActive ? "bg-primary" : "bg-border"
                        }`}
                      />
                    </div>
                  );
                })}
              </div>

              {app.meeting_link && (
                <a
                  href={app.meeting_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-sm text-primary hover:underline"
                >
                  Join Meeting \u2192
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
