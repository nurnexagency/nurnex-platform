import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background text-foreground">
      <div className="text-center max-w-md">
        <div className="mb-6">
          <span className="text-7xl font-black text-primary/20">404</span>
        </div>
        <h1 className="text-2xl font-bold mb-3">Page not found</h1>
        <p className="text-muted text-sm mb-8">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-xl text-sm font-medium transition-colors"
          >
            Go home
          </Link>
          <Link
            href="/login"
            className="px-6 py-2.5 border border-border hover:border-primary/30 rounded-xl text-sm font-medium transition-colors"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
