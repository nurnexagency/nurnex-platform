/**
 * Simple in-memory rate limiter for API routes.
 * Keyed by IP. Resets automatically via sliding window.
 * For production at scale, replace with Redis (Upstash) or Vercel KV.
 */

const windowMs = 60_000;
const maxRequests = 30;

const hits = new Map<string, { count: number; resetAt: number }>();

setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(key);
  }
}, 60_000);

export function rateLimit(ip: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  let entry = hits.get(ip);

  if (!entry || entry.resetAt <= now) {
    entry = { count: 0, resetAt: now + windowMs };
    hits.set(ip, entry);
  }

  entry.count += 1;
  const remaining = Math.max(0, maxRequests - entry.count);
  return { allowed: entry.count <= maxRequests, remaining };
}
