"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  demoSignIn,
  getDemoSession,
  isNetworkAuthError,
} from "@/lib/demo-auth";
import { Spinner } from "@/components/spinner";
import { toast } from "@/components/toast";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function demoFallback() {
    try {
      demoSignIn(email, password);
      toast("Signed in (offline demo mode).", "success");
      const demo = getDemoSession();
      router.push(
        demo?.role === "recruiter" ? "/dashboard/recruiter" : "/dashboard/candidate"
      );
    } catch (demoErr) {
      toast(
        demoErr instanceof Error ? demoErr.message : "Invalid email or password (demo mode).",
        "error"
      );
    }
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!isSupabaseConfigured()) {
      demoFallback();
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (isNetworkAuthError(error)) {
          demoFallback();
          setLoading(false);
          return;
        }
        toast(error.message, "error");
        setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      router.push(
        profile?.role === "recruiter"
          ? "/dashboard/recruiter"
          : "/dashboard/candidate"
      );
    } catch (err) {
      if (isNetworkAuthError(err)) {
        demoFallback();
      } else {
        toast(err instanceof Error ? err.message : "Something went wrong", "error");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-accent font-bold text-2xl tracking-tight">
            NURNEX
          </Link>
          <p className="text-muted text-sm mt-2">Sign in to your account</p>
        </div>

        <form
          onSubmit={handleLogin}
          className="bg-card border border-border rounded-xl p-6 space-y-4"
        >
          <div>
            <label className="block text-sm text-muted mb-1.5">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label className="block text-sm text-muted mb-1.5">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
          >
            {loading && <Spinner className="h-4 w-4" />}
            Sign In
          </button>
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-xs text-muted hover:text-primary transition-colors"
            >
              Forgot password?
            </Link>
          </div>
        </form>

        <p className="text-center text-sm text-muted mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
