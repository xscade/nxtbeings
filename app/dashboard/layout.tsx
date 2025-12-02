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
    <div className="min-h-screen bg-slate-50">
      {isCompany ? (
        <DashboardSidebar user={session.user} />
      ) : (
        <TalentSidebar user={session.user} />
      )}
      <div className="lg:pl-64">
        <DashboardHeader user={session.user} />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
