"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { clearDemoSession } from "@/lib/demo-auth";
import { createClient } from "@/lib/supabase/client";

type NavItem = {
  label: string;
  href: string;
  icon: string;
};

const candidateNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/candidate", icon: "◆" },
  { label: "Profile", href: "/dashboard/candidate/profile", icon: "◉" },
  { label: "Videos", href: "/dashboard/candidate/videos", icon: "▶" },
  { label: "Jobs", href: "/dashboard/candidate/jobs", icon: "◈" },
  { label: "Applications", href: "/dashboard/candidate/applications", icon: "◇" },
];

const recruiterNav: NavItem[] = [
  { label: "Dashboard", href: "/dashboard/recruiter", icon: "◆" },
  { label: "Agency setup", href: "/dashboard/recruiter/onboarding", icon: "◎" },
  { label: "Agency board", href: "/dashboard/recruiter/board", icon: "▣" },
  { label: "Post Job", href: "/dashboard/recruiter/jobs/new", icon: "✦" },
  { label: "My Jobs", href: "/dashboard/recruiter/jobs", icon: "◈" },
  { label: "Candidates", href: "/dashboard/recruiter/candidates", icon: "◉" },
];

export function Sidebar({ role }: { role: "candidate" | "recruiter" }) {
  const pathname = usePathname();
  const router = useRouter();
  const items = role === "candidate" ? candidateNav : recruiterNav;

  async function handleSignOut() {
    clearDemoSession();
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-accent font-bold text-xl tracking-tight">
            NURNEX
          </span>
        </Link>
        <p className="text-xs text-muted mt-1 capitalize">{role} Portal</p>
      </div>

      <nav className="flex-1 py-4">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/dashboard/${role}` &&
              pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-6 py-3 text-sm transition-colors ${
                isActive
                  ? "text-primary bg-primary/10 border-r-2 border-primary"
                  : "text-muted hover:text-foreground hover:bg-white/5"
              }`}
            >
              <span className="text-xs">{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-border px-4 pt-3 pb-1">
        <p className="text-[10px] text-muted uppercase tracking-wider px-2 mb-2">
          Nurnex
        </p>
        <Link
          href="/"
          className="flex items-center gap-3 px-2 py-2 text-sm text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
        >
          <span className="text-xs">⌂</span>
          Home
        </Link>
        <Link
          href="/about"
          className="flex items-center gap-3 px-2 py-2 text-sm text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
        >
          <span className="text-xs">◇</span>
          About
        </Link>
        <a
          href="mailto:MovlanAliyev@Nurnex.com"
          className="flex items-center gap-3 px-2 py-2 text-sm text-muted hover:text-foreground hover:bg-white/5 rounded-lg transition-colors"
        >
          <span className="text-xs">✉</span>
          Contact Us
        </a>
      </div>

      <div className="p-4 border-t border-border">
        <button
          onClick={handleSignOut}
          className="w-full text-left text-sm text-muted hover:text-foreground transition-colors px-2 py-2"
        >
          Sign Out
        </button>
      </div>
    </aside>
  );
}
