"use client";

import Link from "next/link";
import { useState } from "react";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/client";
import { Spinner } from "@/components/spinner";
import { toast } from "@/components/toast";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    if (!isSupabaseConfigured()) {
      toast("Password reset is not available in demo mode.", "error");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast(error.message, "error");
    } else {
      setSent(true);
      toast("Password reset link sent to your email.", "success");
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link
            href="/"
            className="text-accent font-bold text-2xl tracking-tight"
          >
            NURNEX
          </Link>
          <p className="text-muted text-sm mt-2">Reset your password</p>
        </div>

        {sent ? (
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <div className="text-4xl mb-4">&#9993;</div>
            <h2 className="font-semibold text-lg mb-2">Check your email</h2>
            <p className="text-sm text-muted mb-6">
              We sent a password reset link to{" "}
              <span className="text-foreground font-medium">{email}</span>.
              Click the link in the email to set a new password.
            </p>
            <p className="text-xs text-muted mb-4">
              Did not receive it? Check your spam folder or try again.
            </p>
            <button
              onClick={() => setSent(false)}
              className="text-sm text-primary hover:underline"
            >
              Try a different email
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-card border border-border rounded-xl p-6 space-y-4"
          >
            <div>
              <label className="block text-sm text-muted mb-1.5">
                Email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-background border border-border rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition"
                placeholder="you@example.com"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 disabled:opacity-50 text-white rounded-lg py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2"
            >
              {loading && <Spinner className="h-4 w-4" />}
              Send reset link
            </button>
          </form>
        )}

        <p className="text-center text-sm text-muted mt-6">
          Remember your password?{" "}
          <Link href="/login" className="text-primary hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
