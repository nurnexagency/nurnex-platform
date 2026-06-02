# Nurnex Platform

A premium verified hiring platform. Candidates get AI-scored and verified before recruiters see them. No resume noise — only qualified, verified talent.

## Tech Stack

- **Frontend:** Next.js 16 (App Router), TypeScript, Tailwind CSS
- **Backend:** Supabase (Auth, Postgres, Storage)
- **AI:** OpenAI GPT-4o-mini for resume scoring and skill extraction
- **Hosting:** Vercel

## Getting Started

### Prerequisites

- Node.js 18+
- A Supabase project ([supabase.com](https://supabase.com))
- (Optional) An OpenAI API key for AI scoring

### Setup

1. **Clone and install:**

   ```bash
   cd nurnex-platform
   npm install
   ```

2. **Configure environment:**

   ```bash
   cp .env.local.example .env.local
   ```

   Fill in your Supabase URL, anon key, and (optionally) OpenAI API key.

3. **Set up the database:**

   Run `supabase/schema.sql` in your Supabase SQL Editor to create all tables, RLS policies, and storage buckets.

4. **Create storage buckets:**

   In Supabase Dashboard → Storage, create two buckets:
   - `resumes` (private)
   - `videos` (private)

5. **Run the dev server:**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── app/
│   ├── api/                  # AI scoring & verification endpoints
│   ├── dashboard/
│   │   ├── candidate/        # Candidate portal pages
│   │   └── recruiter/        # Recruiter portal pages
│   ├── login/                # Authentication
│   ├── signup/
│   └── page.tsx              # Landing page
├── components/               # Shared UI components
└── lib/
    ├── supabase/             # Supabase client utilities
    └── verification.ts       # Verification logic
```

## Features

- **AI Resume Scoring:** Resumes scored 0-100 with feedback
- **Skill Extraction:** Automatic skill identification and scoring
- **Video Introductions:** Three video uploads (intro, project, expectations)
- **Verification Gate:** Candidates must pass all checks before being visible
- **Job Board:** Recruiters post jobs, candidates browse and request interviews
- **Application Tracking:** Stage-based pipeline (Requested → Scheduled → Completed)

## Deployment

Deploy to Vercel:

```bash
npx vercel
```

Set environment variables in Vercel Dashboard → Settings → Environment Variables.
