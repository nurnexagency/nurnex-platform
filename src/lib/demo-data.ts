/**
 * Demo data engine — localStorage-backed jobs, applications, and sample candidates.
 * Used when Supabase is not configured so every recruiter page works offline.
 */

const JOBS_KEY = "nurnex-demo-jobs";
const APPS_KEY = "nurnex-demo-applications";

export type DemoJob = {
  id: string;
  recruiter_id: string;
  title: string;
  description: string;
  skills_required: string[];
  experience_level: string | null;
  booking_url: string | null;
  status: "active" | "closed" | "draft";
  created_at: string;
  updated_at: string;
};

export type DemoApplication = {
  id: string;
  candidate_id: string;
  job_id: string;
  stage: "invited" | "requested" | "scheduled" | "completed" | "rejected";
  meeting_link: string | null;
  scheduled_at: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type DemoCandidate = {
  id: string;
  full_name: string | null;
  email: string;
  field: string | null;
  bio: string | null;
  resume_url: string | null;
  resume_score: number | null;
  github_url: string | null;
  portfolio_url: string | null;
  verification_status: "verified";
  skills: { skill_name: string; score: number }[];
  videos: { type: string; video_url: string }[];
};

function uid(): string {
  return crypto.randomUUID();
}

function readList<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(key) || "[]") as T[];
  } catch {
    return [];
  }
}

function writeList<T>(key: string, data: T[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(data));
}

// ─── Jobs ────────────────────────────────────────────────────────────────

export function getDemoJobs(recruiterId: string): DemoJob[] {
  return readList<DemoJob>(JOBS_KEY).filter(
    (j) => j.recruiter_id === recruiterId
  );
}

export function getDemoJob(jobId: string): DemoJob | undefined {
  return readList<DemoJob>(JOBS_KEY).find((j) => j.id === jobId);
}

export function createDemoJob(
  recruiterId: string,
  data: {
    title: string;
    description: string;
    skills_required: string[];
    experience_level: string | null;
    booking_url: string | null;
  }
): DemoJob {
  const now = new Date().toISOString();
  const job: DemoJob = {
    id: uid(),
    recruiter_id: recruiterId,
    ...data,
    status: "active",
    created_at: now,
    updated_at: now,
  };
  const all = readList<DemoJob>(JOBS_KEY);
  all.unshift(job);
  writeList(JOBS_KEY, all);
  return job;
}

export function updateDemoJobStatus(
  jobId: string,
  status: DemoJob["status"]
) {
  const all = readList<DemoJob>(JOBS_KEY);
  const idx = all.findIndex((j) => j.id === jobId);
  if (idx >= 0) {
    all[idx].status = status;
    all[idx].updated_at = new Date().toISOString();
    writeList(JOBS_KEY, all);
  }
}

// ─── Applications ────────────────────────────────────────────────────────

export function getDemoApplications(jobId: string): (DemoApplication & {
  profiles: { full_name: string | null; email: string; field: string | null };
})[] {
  const apps = readList<DemoApplication>(APPS_KEY).filter(
    (a) => a.job_id === jobId
  );
  return apps.map((a) => {
    const candidate = SAMPLE_CANDIDATES.find((c) => c.id === a.candidate_id);
    return {
      ...a,
      profiles: {
        full_name: candidate?.full_name ?? "Unknown",
        email: candidate?.email ?? "unknown@example.com",
        field: candidate?.field ?? null,
      },
    };
  });
}

export function countDemoApplications(recruiterId: string): number {
  const jobs = getDemoJobs(recruiterId);
  const jobIds = new Set(jobs.map((j) => j.id));
  return readList<DemoApplication>(APPS_KEY).filter((a) =>
    jobIds.has(a.job_id)
  ).length;
}

export function updateDemoApplicationStage(
  appId: string,
  stage: DemoApplication["stage"],
  meetingLink?: string
) {
  const all = readList<DemoApplication>(APPS_KEY);
  const idx = all.findIndex((a) => a.id === appId);
  if (idx >= 0) {
    all[idx].stage = stage;
    if (meetingLink) all[idx].meeting_link = meetingLink;
    all[idx].updated_at = new Date().toISOString();
    writeList(APPS_KEY, all);
  }
}

export function seedDemoApplicationsForJob(jobId: string) {
  const existing = readList<DemoApplication>(APPS_KEY);
  if (existing.some((a) => a.job_id === jobId)) return;

  const picks = SAMPLE_CANDIDATES.slice(0, 3);
  const now = new Date().toISOString();
  const newApps: DemoApplication[] = picks.map((c) => ({
    id: uid(),
    candidate_id: c.id,
    job_id: jobId,
    stage: "requested",
    meeting_link: null,
    scheduled_at: null,
    notes: null,
    created_at: now,
    updated_at: now,
  }));
  writeList(APPS_KEY, [...existing, ...newApps]);
}

// ─── Sample candidates (static, always available) ────────────────────────

export const SAMPLE_CANDIDATES: DemoCandidate[] = [
  {
    id: "demo-cand-001",
    full_name: "Sarah Mitchell",
    email: "sarah.mitchell@example.com",
    field: "Data Analyst",
    bio: "Data analyst with 4 years of experience in SQL, Python, and business intelligence. Built dashboards used by 200+ stakeholders at a Fortune 500 company.",
    resume_url: null,
    resume_score: 82,
    github_url: "https://github.com/sarahmitchell",
    portfolio_url: "https://sarahmitchell.dev",
    verification_status: "verified",
    skills: [
      { skill_name: "SQL", score: 78 },
      { skill_name: "Python", score: 85 },
      { skill_name: "Power BI", score: 72 },
      { skill_name: "Tableau", score: 68 },
    ],
    videos: [
      { type: "intro", video_url: "" },
      { type: "project", video_url: "" },
      { type: "expectations", video_url: "" },
    ],
  },
  {
    id: "demo-cand-002",
    full_name: "Alex Chen",
    email: "alex.chen@example.com",
    field: "Developer",
    bio: "Full-stack engineer specializing in React, TypeScript, and Node.js. Led frontend architecture at a Series B startup. Open-source contributor.",
    resume_url: null,
    resume_score: 88,
    github_url: "https://github.com/alexchen",
    portfolio_url: "https://alexchen.io",
    verification_status: "verified",
    skills: [
      { skill_name: "React", score: 92 },
      { skill_name: "TypeScript", score: 88 },
      { skill_name: "Node.js", score: 81 },
      { skill_name: "PostgreSQL", score: 74 },
    ],
    videos: [
      { type: "intro", video_url: "" },
      { type: "project", video_url: "" },
      { type: "expectations", video_url: "" },
    ],
  },
  {
    id: "demo-cand-003",
    full_name: "Maria Santos",
    email: "maria.santos@example.com",
    field: "Designer",
    bio: "Product designer with 6 years in SaaS. Expert in Figma, design systems, and user research. Previously at Stripe and Notion.",
    resume_url: null,
    resume_score: 79,
    github_url: null,
    portfolio_url: "https://mariasantos.design",
    verification_status: "verified",
    skills: [
      { skill_name: "Figma", score: 94 },
      { skill_name: "Design Systems", score: 86 },
      { skill_name: "User Research", score: 78 },
      { skill_name: "Prototyping", score: 82 },
    ],
    videos: [
      { type: "intro", video_url: "" },
      { type: "project", video_url: "" },
      { type: "expectations", video_url: "" },
    ],
  },
  {
    id: "demo-cand-004",
    full_name: "James Park",
    email: "james.park@example.com",
    field: "Developer",
    bio: "Backend engineer focused on distributed systems, Go, and Kubernetes. 5 years at cloud infrastructure companies.",
    resume_url: null,
    resume_score: 75,
    github_url: "https://github.com/jamespark",
    portfolio_url: null,
    verification_status: "verified",
    skills: [
      { skill_name: "Go", score: 84 },
      { skill_name: "Kubernetes", score: 79 },
      { skill_name: "AWS", score: 76 },
      { skill_name: "PostgreSQL", score: 72 },
    ],
    videos: [
      { type: "intro", video_url: "" },
      { type: "project", video_url: "" },
    ],
  },
  {
    id: "demo-cand-005",
    full_name: "Priya Sharma",
    email: "priya.sharma@example.com",
    field: "Data Analyst",
    bio: "ML engineer and data scientist. Built recommendation engines serving 10M+ users. Strong in Python, TensorFlow, and statistical modeling.",
    resume_url: null,
    resume_score: 91,
    github_url: "https://github.com/priyasharma",
    portfolio_url: "https://priyasharma.ai",
    verification_status: "verified",
    skills: [
      { skill_name: "Python", score: 93 },
      { skill_name: "TensorFlow", score: 87 },
      { skill_name: "SQL", score: 82 },
      { skill_name: "Statistics", score: 89 },
    ],
    videos: [
      { type: "intro", video_url: "" },
      { type: "project", video_url: "" },
      { type: "expectations", video_url: "" },
    ],
  },
];

export function getDemoCandidates(fieldFilter?: string): DemoCandidate[] {
  let list = [...SAMPLE_CANDIDATES];
  if (fieldFilter) {
    list = list.filter((c) => c.field === fieldFilter);
  }
  return list.sort(
    (a, b) => (b.resume_score ?? 0) - (a.resume_score ?? 0)
  );
}

export function getDemoCandidate(
  candidateId: string
): DemoCandidate | undefined {
  return SAMPLE_CANDIDATES.find((c) => c.id === candidateId);
}
