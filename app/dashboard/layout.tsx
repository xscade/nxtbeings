import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  if (!session.user.onboardingCompleted) {
    redirect(`/onboarding/${session.user.role}`);
  }

  // For now, only company dashboard is implemented
  if (session.user.role !== "company") {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">Talent Dashboard Coming Soon</h1>
          <p className="text-slate-500 mt-2">We&apos;re building something amazing for you.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <DashboardSidebar user={session.user} />
      <div className="lg:pl-64">
        <DashboardHeader user={session.user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}

