import { Sidebar } from "@/components/sidebar";
import { ErrorBoundary } from "@/components/error-boundary";

export default function RecruiterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar role="recruiter" />
      <main className="flex-1 p-8">
        <ErrorBoundary>{children}</ErrorBoundary>
      </main>
    </div>
  );
}
