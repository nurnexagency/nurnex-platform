"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, Suspense } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import {
  demoSignUp,
  isNetworkAuthError,
} from "@/lib/demo-auth";
import { Spinner } from "@/components/spinner";
import { toast } from "@/components/toast";

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const defaultRole = searchParams.get("role") === "recruiter" ? "recruiter" : "candidate";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"candidate" | "recruiter">(defaultRole);
  const [loading, setLoading] = useState(false);

  function demoFallback() {
    try {
      demoSignUp(email, password, role);
      toast("Demo account created (offline mode). Add .env.local for real auth.", "success");
      router.push(
        role === "recruiter"
          ? "/dashboard/recruiter/onboarding"
          : "/dashboard/candidate"
      );
    } catch (demoErr) {
      toast(demoErr instanceof Error ? demoErr.message : "Demo signup failed", "error");
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    if (!isSupabaseConfigured()) {
      demoFallback();
      setLoading(false);
      return;
    }

    try {
      const supabase = createClient();
      const { error, data } = await supabase.auth.signUp({ email, password });

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

      if (data.user) {
        const hasSession = !!data.session;

        const { error: profileError } = await supabase
          .from("profiles")
          .insert({ id: data.user.id, email, role });

        if (profileError && !profileError.message.includes("duplicate")) {
          toast(
            hasSession
              ? "Account created but profile setup failed. Try logging in."
              : "Account created! Check your email to confirm, then sign in.",
            hasSession ? "error" : "success"
          );
          setLoading(false);
          return;
        }

        if (hasSession) {
          toast("Account created!", "success");
          router.push(
            role === "recruiter"
              ? "/dashboard/recruiter/onboarding"
              : "/dashboard/candidate"
          );
        } else {
          toast(
            "Account created! Check your email to confirm, then sign in.",
            "success"
          );
          router.push("/login");
        }
      } else {
        toast("Check your email to confirm your account.", "success");
        router.push("/login");
      }
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
    <form
      onSubmit={handleSignup}
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
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
          placeholder="••••••••"
        />
      </div>
      <div>
        <label className="block text-sm text-muted mb-3">I am a...</label>
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setRole("candidate")}
            className={`p-4 rounded-xl border text-sm font-medium text-center transition-all ${
              role === "candidate"
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-background text-muted hover:border-primary/30"
            }`}
          >
            <div className="text-lg mb-1">◉</div>
            Candidate
            <div className="text-xs text-muted mt-1">Looking for work</div>
          </button>
          <button
            type="button"
            onClick={() => setRole("recruiter")}
            className={`p-4 rounded-xl border text-sm font-medium text-center transition-all ${
              role === "recruiter"
                ? "border-accent bg-accent/10 text-accent"
                : "border-border bg-background text-muted hover:border-accent/30"
            }`}
          >
            <div className="text-lg mb-1">✦</div>
            Recruiter
            <div className="text-xs text-muted mt-1">Hiring talent</div>
          </button>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
      >
        {loading && <Spinner className="h-4 w-4" />}
        Create Account
      </button>
    </form>
  );
}

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="text-accent font-bold text-2xl tracking-tight">
            NURNEX
          </Link>
          <p className="text-muted text-sm mt-2">Create your account</p>
        </div>

        <Suspense fallback={<div className="bg-card border border-border rounded-xl p-6 h-96 animate-pulse" />}>
          <SignupForm />
        </Suspense>

        <p className="text-center text-sm text-muted mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
        <p className="text-center text-xs text-muted mt-4 max-w-sm mx-auto leading-relaxed">
          No Supabase keys? You can still explore the app: sign up will fall back to a
          local demo account. For production, copy{" "}
          <code className="text-foreground/80">.env.local.example</code> to{" "}
          <code className="text-foreground/80">.env.local</code>.
        </p>
      </div>
    </div>
  );
}
