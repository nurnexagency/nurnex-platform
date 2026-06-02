import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-white font-black text-xs">N</span>
              </div>
              <span className="font-black uppercase tracking-tight">
                Nurnex
              </span>
            </div>
            <p className="text-xs text-muted leading-relaxed max-w-[220px]">
              Verified hiring graph. AI scores, video proof, direct invites.
              Built by Movlan Aliyev.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-4">
              Platform
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/signup?role=candidate"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Join as Candidate
              </Link>
              <Link
                href="/signup?role=recruiter"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Join as Recruiter
              </Link>
              <Link
                href="/login"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-4">
              Company
            </p>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/about"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                About Us
              </Link>
              <a
                href="mailto:MovlanAliyev@Nurnex.com"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                Contact
              </a>
              <a
                href="https://domtechacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                DOM Tech Academy
              </a>
              <a
                href="https://domchessacademy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors"
              >
                DOM Chess Academy
              </a>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-foreground/80 mb-4">
              Contact
            </p>
            <div className="flex flex-col gap-2.5 text-sm text-muted">
              <a
                href="mailto:MovlanAliyev@Nurnex.com"
                className="hover:text-foreground transition-colors"
              >
                MovlanAliyev@Nurnex.com
              </a>
              <p>Nurnex Agency</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            &copy; {new Date().getFullYear()} Nurnex. Designed by Movlan
            Aliyev. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted">
            <Link
              href="/about"
              className="hover:text-foreground transition-colors"
            >
              About
            </Link>
            <a
              href="mailto:MovlanAliyev@Nurnex.com"
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
