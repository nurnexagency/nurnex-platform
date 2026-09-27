# Nurnex Consulting — nurnex.com

Marketing website for Nurnex Consulting: Microsoft analytics, automation, websites and iOS / Android apps.

Live: https://nurnex.com

## Stack

- Next.js 16 (App Router, Turbopack), React 19, TypeScript
- Tailwind CSS 4, Framer Motion
- WebGL ocean + Canvas 2D interactive section backgrounds
- Hosted on Netlify (static output)

## Run locally

```bash
nvm use            # Node 22 (see .nvmrc)
npm install
npm run dev        # http://localhost:3000
```

Before pushing:

```bash
npm run lint
npm run build
```

## Project layout

| Path | What it is |
|------|------------|
| `src/app/page.tsx` | Home page — section order |
| `src/app/privacy`, `src/app/terms` | Legal pages |
| `src/components/*-section.tsx` | Page sections (hero, services, portfolio, process, about, map, industries, contact) |
| `src/components/bg/` | Interactive section backgrounds (`canvas-scene.tsx` is the shared engine) |
| `src/components/scroll-waves.tsx` | WebGL ocean shader |
| `src/components/sun-arc.tsx`, `src/lib/sun-clock.ts` | Rising / setting sun shared with the ocean |
| `src/lib/contact.ts` | Email and phone used everywhere on the site |
| `public/` | Static assets (logo, icons) |

## How we collaborate

1. Create a branch from `master`: `git checkout -b feature/short-name`
2. Commit and push the branch, then open a Pull Request into `master`.
3. **CI** (GitHub Actions) runs lint, type-check and a production build on every PR.
4. **Netlify** posts a deploy preview link on the PR — check it on desktop and mobile.
5. When CI is green and the other person has reviewed, merge.

## Deployment

- Every merge / push to `master` deploys automatically to **nurnex.com** via Netlify's GitHub integration.
- Pull requests get their own Netlify preview URL; production is untouched until merge.
- DNS: `nurnex.com` → Netlify load balancer, `www` → CNAME to the Netlify site.
- To roll back, use **Deploys → Publish deploy** on an earlier deploy in Netlify, or revert the commit on `master`.

The previous recruiting-platform codebase is preserved on the `backup/recruiting-platform` branch.
