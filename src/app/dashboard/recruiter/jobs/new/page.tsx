"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { getDemoSessionClient } from "@/lib/demo-auth";
import { createDemoJob, seedDemoApplicationsForJob } from "@/lib/demo-data";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/spinner";
import { toast } from "@/components/toast";

const EXPERIENCE_LEVELS = ["Junior", "Mid-Level", "Senior", "Lead", "Any"];

export default function NewJobPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [bookingUrl, setBookingUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const skillsArray = skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!isSupabaseConfigured()) {
      const demo = getDemoSessionClient();
      if (!demo) {
        toast("Not signed in.", "error");
        setLoading(false);
        return;
      }
      const job = createDemoJob(demo.userId, {
        title,
        description,
        skills_required: skillsArray,
        experience_level: experienceLevel || null,
        booking_url: bookingUrl || null,
      });
      seedDemoApplicationsForJob(job.id);
      toast("Job posted (demo mode). Sample applications added.", "success");
      router.push("/dashboard/recruiter/jobs");
      return;
    }

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      toast("Not signed in.", "error");
      setLoading(false);
      return;
    }

    const { error } = await supabase.from("jobs").insert({
      recruiter_id: user.id,
      title,
      description,
      skills_required: skillsArray,
      experience_level: experienceLevel || null,
      booking_url: bookingUrl || null,
    });

    if (error) {
      toast(error.message, "error");
      setLoading(false);
      return;
    }

    toast("Job posted successfully", "success");
    router.push("/dashboard/recruiter/jobs");
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-1">Post a New Job</h1>
      <p className="text-muted text-sm mb-8">
        Create a job listing visible to verified candidates.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div>
            <label className="block text-sm text-muted mb-1.5">
              Job Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="e.g. Senior Frontend Developer"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Description
            </label>
            <textarea
              rows={5}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition resize-none"
              placeholder="Describe the role, responsibilities, and requirements..."
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Skills (comma-separated)
            </label>
            <input
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="React, TypeScript, Node.js"
            />
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Experience Level
            </label>
            <select
              value={experienceLevel}
              onChange={(e) => setExperienceLevel(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
            >
              <option value="">Select level</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm text-muted mb-1.5">
              Booking / Calendar URL (optional)
            </label>
            <input
              type="url"
              value={bookingUrl}
              onChange={(e) => setBookingUrl(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="https://calendly.com/your-link"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="px-6 py-2.5 bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
        >
          {loading && <Spinner className="h-4 w-4" />}
          Post Job
        </button>
      </form>
    </div>
  );
}
