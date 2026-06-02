/**
 * Local Supabase CLI defaults — used only when public env vars are missing in development.
 * @see https://supabase.com/docs/guides/cli/local-development
 */
const LOCAL_SUPABASE_URL = "http://127.0.0.1:54321";
const LOCAL_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()
  );
}

/** URL + anon key for browser and server clients. Never uses fallbacks in production. */
export function getSupabaseCredentials(): { url: string; anonKey: string } {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();
  if (url && anonKey) {
    return { url, anonKey };
  }
  if (process.env.NODE_ENV !== "production") {
    if (typeof console !== "undefined") {
      console.warn(
        "[Nurnex] NEXT_PUBLIC_SUPABASE_URL / ANON_KEY missing — using local Supabase defaults. " +
          "Copy .env.local.example to .env.local for your cloud project, or run `npx supabase start`."
      );
    }
    return { url: LOCAL_SUPABASE_URL, anonKey: LOCAL_SUPABASE_ANON_KEY };
  }
  throw new Error(
    "NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are required in production."
  );
}
