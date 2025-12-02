import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/signin");
  }

  // If onboarding not completed, redirect to onboarding
  if (!session.user.onboardingCompleted) {
    redirect(`/onboarding/${session.user.role}`);
  }

  // For now, show a simple dashboard
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h1 className="text-3xl font-bold text-slate-900">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-slate-500 mt-2">
            You&apos;re signed in as a {session.user.role === "company" ? "Company" : "Talent"}.
          </p>
          
          <div className="mt-8 p-6 rounded-xl bg-blue-50 border border-blue-100">
            <p className="text-blue-700">
              🎉 Your account is set up! Dashboard features coming soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

