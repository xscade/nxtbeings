import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { TalentSidebar } from "@/components/dashboard/TalentSidebar";
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

  const isCompany = session.user.role === "company";

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects - Matching Homepage */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Main Center Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-primary/5 rounded-full blur-[150px]" />
        
        {/* Floating Gradients */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-400/15 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-400/15 rounded-full blur-[100px]" />
        
        {/* Glassmorphic Overlay */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]" />
      </div>

      {/* Sidebar */}
      {isCompany ? (
        <DashboardSidebar user={session.user} />
      ) : (
        <TalentSidebar user={session.user} />
      )}
      
      {/* Main Content */}
      <div className="lg:pl-72 relative z-10">
        <DashboardHeader user={session.user} />
        <main className="p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
