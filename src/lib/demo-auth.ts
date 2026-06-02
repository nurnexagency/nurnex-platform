/**
 * Offline demo auth when Supabase is unreachable (no .env, no local `supabase start`).
 * Session is stored in localStorage and mirrored in a cookie so middleware allows /dashboard.
 */

export const DEMO_COOKIE_NAME = "nurnex_demo_session";

const USERS_KEY = "nurnex-demo-users";
const SESSION_KEY = "nurnex-demo-session";

export type DemoRole = "candidate" | "recruiter";

export type DemoUserRecord = {
  userId: string;
  email: string;
  password: string;
  role: DemoRole;
};

export type DemoSession = {
  userId: string;
  email: string;
  role: DemoRole;
};

/** For Edge middleware — parse raw cookie value (no `document`). */
export function parseDemoSessionCookieValue(
  raw: string | undefined
): DemoSession | null {
  if (!raw) return null;
  try {
    const s = JSON.parse(decodeURIComponent(raw)) as DemoSession;
    if (s?.userId && (s.role === "candidate" || s.role === "recruiter")) {
      return s;
    }
  } catch {
    /* ignore */
  }
  return null;
}

export function syncDemoSessionToCookie(session: DemoSession | null) {
  if (typeof document === "undefined") return;
  if (!session) {
    document.cookie = `${DEMO_COOKIE_NAME}=; path=/; max-age=0; SameSite=Lax`;
    return;
  }
  const v = encodeURIComponent(JSON.stringify(session));
  document.cookie = `${DEMO_COOKIE_NAME}=${v}; path=/; max-age=${
    86400 * 7
  }; SameSite=Lax`;
}

function readUsers(): DemoUserRecord[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]") as DemoUserRecord[];
  } catch {
    return [];
  }
}

function writeUsers(users: DemoUserRecord[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function demoSignUp(
  email: string,
  password: string,
  role: DemoRole
): DemoSession {
  const users = readUsers();
  const normalized = email.trim().toLowerCase();
  if (users.some((u) => u.email.toLowerCase() === normalized)) {
    throw new Error("An account with this email already exists (demo storage).");
  }
  const userId = crypto.randomUUID();
  const record: DemoUserRecord = {
    userId,
    email: email.trim(),
    password,
    role,
  };
  writeUsers([...users, record]);
  const session: DemoSession = { userId, email: record.email, role };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  syncDemoSessionToCookie(session);
  return session;
}

export function demoSignIn(email: string, password: string): DemoSession {
  const users = readUsers();
  const normalized = email.trim().toLowerCase();
  const hit = users.find(
    (u) => u.email.toLowerCase() === normalized && u.password === password
  );
  if (!hit) {
    throw new Error("Invalid email or password (demo mode).");
  }
  const session: DemoSession = {
    userId: hit.userId,
    email: hit.email,
    role: hit.role,
  };
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  syncDemoSessionToCookie(session);
  return session;
}

export function getDemoSession(): DemoSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as DemoSession;
  } catch {
    return null;
  }
}

/** Prefer localStorage; if empty, restore from `document.cookie` (middleware only sets cookie). */
export function getDemoSessionClient(): DemoSession | null {
  const fromStorage = getDemoSession();
  if (fromStorage) return fromStorage;
  if (typeof document === "undefined") return null;
  const m = document.cookie.match(
    new RegExp(`(?:^|; )${DEMO_COOKIE_NAME}=([^;]*)`)
  );
  const raw = m?.[1] ? decodeURIComponent(m[1]) : undefined;
  const parsed = parseDemoSessionCookieValue(raw);
  if (parsed) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(parsed));
  }
  return parsed;
}

export function clearDemoSession() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_KEY);
  syncDemoSessionToCookie(null);
}

export function isNetworkAuthError(err: unknown): boolean {
  const msg = err instanceof Error ? err.message : String(err);
  return (
    /fetch|network|failed to connect|load failed|ECONNREFUSED|NetworkError/i.test(
      msg
    ) ||
    (typeof err === "object" &&
      err !== null &&
      "name" in err &&
      (err as { name: string }).name === "AuthRetryableFetchError")
  );
}
