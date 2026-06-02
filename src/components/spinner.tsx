export function Spinner({ className = "" }: { className?: string }) {
  return (
    <div
      className={`inline-block h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Spinner className="h-8 w-8 text-primary" />
    </div>
  );
}
