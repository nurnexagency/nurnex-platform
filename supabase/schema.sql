-- =============================================================
-- Nurnex Platform — Full Database Schema
-- Run this in the Supabase SQL Editor to set up all tables,
-- RLS policies, and storage buckets.
-- =============================================================

-- ----- PROFILES (extends auth.users) -----
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  role text not null check (role in ('candidate', 'recruiter')),
  field text,
  bio text,
  resume_url text,
  resume_score integer,
  resume_feedback jsonb,
  github_url text,
  portfolio_url text,
  avatar_url text,
  verification_status text default 'pending' check (verification_status in ('pending', 'verified', 'rejected')),
  is_paid boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- CANDIDATE VIDEOS -----
create table public.candidate_videos (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null check (type in ('intro', 'project', 'expectations')),
  video_url text not null,
  transcript text,
  evaluation jsonb,
  created_at timestamptz default now(),
  unique(user_id, type)
);

-- ----- SKILL SCORES -----
create table public.skill_scores (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade,
  skill_name text not null,
  score integer not null check (score >= 0 and score <= 100),
  source text default 'ai_estimate',
  created_at timestamptz default now(),
  unique(user_id, skill_name)
);

-- ----- JOBS -----
create table public.jobs (
  id uuid default gen_random_uuid() primary key,
  recruiter_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  description text,
  skills_required text[],
  experience_level text,
  booking_url text,
  status text default 'active' check (status in ('active', 'closed', 'draft')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- APPLICATIONS -----
create table public.applications (
  id uuid default gen_random_uuid() primary key,
  candidate_id uuid references public.profiles(id) on delete cascade,
  job_id uuid references public.jobs(id) on delete cascade,
  stage text default 'invited' check (stage in ('invited', 'requested', 'scheduled', 'completed', 'rejected')),
  meeting_link text,
  scheduled_at timestamptz,
  notes text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- =============================================================
-- RECRUITER BOARD — Agencies, Members, Assignments, Comments
-- =============================================================

-- ----- AGENCIES (one per recruiter signup) -----
create table public.agencies (
  id uuid default gen_random_uuid() primary key,
  owner_id uuid references public.profiles(id) on delete cascade not null unique,
  company_name text not null,
  email text not null,
  employee_count integer default 0,
  focus_area text,
  address text,
  weekly_job_limit integer default 10,
  agreement_accepted_at timestamptz,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ----- AGENCY MEMBERS (team within an agency) -----
create table public.agency_members (
  id uuid default gen_random_uuid() primary key,
  agency_id uuid references public.agencies(id) on delete cascade not null,
  first_name text not null,
  last_name text not null,
  description text default '',
  created_at timestamptz default now()
);

-- ----- AGENCY ASSIGNMENTS (internal hiring mandates) -----
create table public.agency_assignments (
  id uuid default gen_random_uuid() primary key,
  agency_id uuid references public.agencies(id) on delete cascade not null,
  member_id uuid references public.agency_members(id) on delete set null,
  title text not null,
  description text default '',
  due_date date,
  created_at timestamptz default now()
);

-- ----- AGENCY COMMENTS (candidate feedback on agency) -----
create table public.agency_comments (
  id uuid default gen_random_uuid() primary key,
  agency_id uuid references public.agencies(id) on delete cascade not null,
  author_name text not null default 'Candidate',
  text text not null,
  assignment_id uuid references public.agency_assignments(id) on delete set null,
  created_at timestamptz default now()
);

-- =============================================================
-- ROW LEVEL SECURITY
-- =============================================================

alter table public.profiles enable row level security;
alter table public.candidate_videos enable row level security;
alter table public.skill_scores enable row level security;
alter table public.jobs enable row level security;
alter table public.applications enable row level security;

-- ----- Profiles policies -----
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert with check (auth.uid() = id);

create policy "Recruiters can view verified candidates"
  on public.profiles for select using (
    (select role from public.profiles where id = auth.uid()) = 'recruiter'
    and role = 'candidate'
    and verification_status = 'verified'
  );

-- ----- Videos policies -----
create policy "Users manage own videos"
  on public.candidate_videos for all using (auth.uid() = user_id);

create policy "Recruiters view verified candidate videos"
  on public.candidate_videos for select using (
    exists (select 1 from public.profiles where id = candidate_videos.user_id and verification_status = 'verified')
    and (select role from public.profiles where id = auth.uid()) = 'recruiter'
  );

-- ----- Skill scores policies -----
create policy "Users manage own scores"
  on public.skill_scores for all using (auth.uid() = user_id);

create policy "Recruiters view verified candidate scores"
  on public.skill_scores for select using (
    exists (select 1 from public.profiles where id = skill_scores.user_id and verification_status = 'verified')
    and (select role from public.profiles where id = auth.uid()) = 'recruiter'
  );

-- ----- Jobs policies -----
create policy "Anyone can view active jobs"
  on public.jobs for select using (status = 'active');

create policy "Recruiters manage own jobs"
  on public.jobs for all using (auth.uid() = recruiter_id);

-- ----- Applications policies -----
create policy "Candidates manage own applications"
  on public.applications for all using (auth.uid() = candidate_id);

create policy "Recruiters view applications for own jobs"
  on public.applications for select using (
    exists (select 1 from public.jobs where id = applications.job_id and recruiter_id = auth.uid())
  );

create policy "Recruiters update applications for own jobs"
  on public.applications for update using (
    exists (select 1 from public.jobs where id = applications.job_id and recruiter_id = auth.uid())
  );

-- ----- Agency tables RLS -----
alter table public.agencies enable row level security;
alter table public.agency_members enable row level security;
alter table public.agency_assignments enable row level security;
alter table public.agency_comments enable row level security;

create policy "Recruiters manage own agency"
  on public.agencies for all using (auth.uid() = owner_id);

create policy "Agency members — owner manages"
  on public.agency_members for all using (
    exists (select 1 from public.agencies where id = agency_members.agency_id and owner_id = auth.uid())
  );

create policy "Agency assignments — owner manages"
  on public.agency_assignments for all using (
    exists (select 1 from public.agencies where id = agency_assignments.agency_id and owner_id = auth.uid())
  );

create policy "Agency comments — owner manages"
  on public.agency_comments for all using (
    exists (select 1 from public.agencies where id = agency_comments.agency_id and owner_id = auth.uid())
  );

-- =============================================================
-- STORAGE BUCKETS
-- Run these in the Supabase SQL Editor or configure via Dashboard:
--
-- 1. Create bucket "resumes" (private):
--    insert into storage.buckets (id, name, public) values ('resumes', 'resumes', false);
--
-- 2. Create bucket "videos" (private):
--    insert into storage.buckets (id, name, public) values ('videos', 'videos', false);
--
-- 3. Storage policies for "resumes":
--    create policy "Users upload own resume"
--      on storage.objects for insert
--      with check (bucket_id = 'resumes' and (storage.foldername(name))[1] = auth.uid()::text);
--
--    create policy "Users read own resume"
--      on storage.objects for select
--      using (bucket_id = 'resumes' and (storage.foldername(name))[1] = auth.uid()::text);
--
--    create policy "Recruiters read verified candidate resumes"
--      on storage.objects for select
--      using (
--        bucket_id = 'resumes'
--        and exists (
--          select 1 from public.profiles
--          where id = (storage.foldername(name))[1]::uuid
--          and verification_status = 'verified'
--        )
--        and (select role from public.profiles where id = auth.uid()) = 'recruiter'
--      );
--
-- 4. Storage policies for "videos" — same pattern as resumes.
-- =============================================================
