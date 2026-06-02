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

export function deleteDemoJob(jobId: string) {
  const all = readList<DemoJob>(JOBS_KEY).filter((j) => j.id !== jobId);
  writeList(JOBS_KEY, all);
  const apps = readList<DemoApplication>(APPS_KEY).filter(
    (a) => a.job_id !== jobId
  );
  writeList(APPS_KEY, apps);
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

// ─── Candidate-side demo storage ─────────────────────────────────────────

const CAND_PROFILE_KEY = "nurnex-demo-cand-profile:";
const CAND_VIDEOS_KEY = "nurnex-demo-cand-videos:";
const CAND_APPS_KEY = "nurnex-demo-cand-apps";

export type DemoCandidateProfile = {
  full_name: string;
  field: string;
  bio: string;
  github_url: string;
  portfolio_url: string;
  resume_url: string;
  resume_score: number | null;
  resume_feedback: {
    score: number;
    feedback: string[];
    formatting_issues: string[];
  } | null;
  verification_status: "pending" | "verified" | "rejected";
};

export type DemoCandidateVideoStatus = {
  intro: string;
  project: string;
  expectations: string;
};

export type DemoCandidateApp = {
  id: string;
  candidate_id: string;
  job_id: string;
  stage: "requested" | "scheduled" | "completed" | "rejected";
  meeting_link: string | null;
  created_at: string;
};

const DEFAULT_PROFILE: DemoCandidateProfile = {
  full_name: "",
  field: "",
  bio: "",
  github_url: "",
  portfolio_url: "",
  resume_url: "",
  resume_score: null,
  resume_feedback: null,
  verification_status: "pending",
};

export function getDemoCandidateProfile(userId: string): DemoCandidateProfile {
  if (typeof window === "undefined") return { ...DEFAULT_PROFILE };
  try {
    const raw = localStorage.getItem(CAND_PROFILE_KEY + userId);
    if (!raw) return { ...DEFAULT_PROFILE };
    return { ...DEFAULT_PROFILE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_PROFILE };
  }
}

export function saveDemoCandidateProfile(
  userId: string,
  data: Partial<DemoCandidateProfile>
) {
  if (typeof window === "undefined") return;
  const existing = getDemoCandidateProfile(userId);
  const merged = { ...existing, ...data };
  localStorage.setItem(CAND_PROFILE_KEY + userId, JSON.stringify(merged));
}

export function checkDemoVerification(userId: string): boolean {
  const p = getDemoCandidateProfile(userId);
  const v = getDemoCandidateVideos(userId);
  const allMet =
    !!p.resume_url &&
    (p.resume_score ?? 0) >= 60 &&
    !!v.intro &&
    !!v.project &&
    !!v.expectations &&
    !!(p.portfolio_url || p.github_url);
  if (allMet && p.verification_status !== "verified") {
    saveDemoCandidateProfile(userId, { verification_status: "verified" });
  }
  return allMet;
}

export function getDemoCandidateVideos(
  userId: string
): DemoCandidateVideoStatus {
  if (typeof window === "undefined")
    return { intro: "", project: "", expectations: "" };
  try {
    const raw = localStorage.getItem(CAND_VIDEOS_KEY + userId);
    if (!raw) return { intro: "", project: "", expectations: "" };
    return JSON.parse(raw);
  } catch {
    return { intro: "", project: "", expectations: "" };
  }
}

export function saveDemoCandidateVideo(
  userId: string,
  type: "intro" | "project" | "expectations",
  url: string
) {
  const existing = getDemoCandidateVideos(userId);
  existing[type] = url;
  localStorage.setItem(CAND_VIDEOS_KEY + userId, JSON.stringify(existing));
}

export function getDemoJobsForCandidates(): DemoJob[] {
  const fromRecruiters = readList<DemoJob>(JOBS_KEY).filter(
    (j) => j.status === "active"
  );

  const sampleJobs: DemoJob[] = SAMPLE_CANDIDATE_JOBS.filter(
    (sj) => !fromRecruiters.some((rj) => rj.id === sj.id)
  );

  return [...fromRecruiters, ...sampleJobs].sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

export function getDemoCandidateApplications(
  userId: string
): (DemoCandidateApp & { jobs: { title: string; description: string | null } })[] {
  const apps = readList<DemoCandidateApp>(CAND_APPS_KEY).filter(
    (a) => a.candidate_id === userId
  );
  const allJobs = getDemoJobsForCandidates();
  return apps.map((a) => {
    const job = allJobs.find((j) => j.id === a.job_id);
    return {
      ...a,
      jobs: {
        title: job?.title ?? "Unknown Job",
        description: job?.description ?? null,
      },
    };
  });
}

export function createDemoCandidateApplication(
  userId: string,
  jobId: string
): DemoCandidateApp {
  const app: DemoCandidateApp = {
    id: uid(),
    candidate_id: userId,
    job_id: jobId,
    stage: "requested",
    meeting_link: null,
    created_at: new Date().toISOString(),
  };
  const all = readList<DemoCandidateApp>(CAND_APPS_KEY);
  all.push(app);
  writeList(CAND_APPS_KEY, all);
  return app;
}

export function getDemoCandidateAppliedJobIds(userId: string): Set<string> {
  const apps = readList<DemoCandidateApp>(CAND_APPS_KEY).filter(
    (a) => a.candidate_id === userId
  );
  return new Set(apps.map((a) => a.job_id));
}

const SAMPLE_CANDIDATE_JOBS: DemoJob[] = [
  {
    id: "demo-job-001",
    recruiter_id: "demo-recruiter",
    title: "Senior Frontend Developer",
    description:
      "Build modern React/Next.js applications for our SaaS platform. You will lead component architecture and mentor junior engineers.",
    skills_required: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    experience_level: "Senior",
    booking_url: null,
    status: "active",
    created_at: new Date(Date.now() - 2 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 2 * 86400000).toISOString(),
  },
  {
    id: "demo-job-002",
    recruiter_id: "demo-recruiter",
    title: "Data Analyst",
    description:
      "Analyze business metrics, build dashboards, and deliver insights to leadership. SQL, Python, and BI tools required.",
    skills_required: ["SQL", "Python", "Tableau", "Power BI"],
    experience_level: "Mid-Level",
    booking_url: null,
    status: "active",
    created_at: new Date(Date.now() - 4 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 4 * 86400000).toISOString(),
  },
  {
    id: "demo-job-003",
    recruiter_id: "demo-recruiter",
    title: "Product Designer",
    description:
      "Own the end-to-end design process for our B2B platform. Figma expertise and design system experience required.",
    skills_required: ["Figma", "Design Systems", "User Research", "Prototyping"],
    experience_level: "Senior",
    booking_url: null,
    status: "active",
    created_at: new Date(Date.now() - 5 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 5 * 86400000).toISOString(),
  },
  {
    id: "demo-job-004",
    recruiter_id: "demo-recruiter",
    title: "Backend Engineer (Go)",
    description:
      "Design and build distributed microservices in Go. Experience with Kubernetes and cloud infrastructure preferred.",
    skills_required: ["Go", "Kubernetes", "AWS", "PostgreSQL"],
    experience_level: "Mid-Level",
    booking_url: null,
    status: "active",
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: "demo-job-005",
    recruiter_id: "demo-recruiter",
    title: "ML Engineer",
    description:
      "Build and deploy machine learning models at scale. Strong Python, TensorFlow/PyTorch, and MLOps skills needed.",
    skills_required: ["Python", "TensorFlow", "MLOps", "SQL"],
    experience_level: "Senior",
    booking_url: null,
    status: "active",
    created_at: new Date(Date.now() - 10 * 86400000).toISOString(),
    updated_at: new Date(Date.now() - 10 * 86400000).toISOString(),
  },
];
