import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Shortlist from "@/models/Shortlist";
import User from "@/models/User";
import Link from "next/link";
import { 
  Users, 
  Star, 
  UserCheck, 
  TrendingUp, 
  ArrowRight, 
  Briefcase, 
  Eye,
  MessageSquare,
  Sparkles
} from "lucide-react";

// Company Stats
async function getCompanyStats(companyId: string) {
  await connectToDatabase();

  const [totalTalent, shortlistedCount, contactedCount, hiredCount] = await Promise.all([
    User.countDocuments({ role: "talent", onboardingCompleted: true }),
    Shortlist.countDocuments({ companyId, status: "shortlisted" }),
    Shortlist.countDocuments({ companyId, status: "contacted" }),
    Shortlist.countDocuments({ companyId, status: "hired" }),
  ]);

  return { totalTalent, shortlistedCount, contactedCount, hiredCount };
}

async function getRecentShortlists(companyId: string) {
  await connectToDatabase();

  const shortlists = await Shortlist.find({ companyId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  if (shortlists.length === 0) return [];

  const talentIds = shortlists.map((s) => s.talentId);
  const talents = await User.find({ _id: { $in: talentIds } })
    .select("name image talentProfile")
    .lean();

  const talentMap = new Map(talents.map((t) => [t._id.toString(), t]));

  return shortlists.map((s) => {
    const talent = talentMap.get(s.talentId.toString());
    return {
      id: s._id.toString(),
      status: s.status,
      createdAt: s.createdAt,
      talent: talent
        ? {
            id: talent._id.toString(),
            name: talent.name,
            image: talent.image,
            title: talent.talentProfile?.title,
          }
        : null,
    };
  });
}

// Talent Stats
async function getTalentStats(talentId: string) {
  await connectToDatabase();

  const [totalInterested, shortlistedCount, contactedCount, interviewingCount] = await Promise.all([
    Shortlist.countDocuments({ talentId }),
    Shortlist.countDocuments({ talentId, status: "shortlisted" }),
    Shortlist.countDocuments({ talentId, status: "contacted" }),
    Shortlist.countDocuments({ talentId, status: "interviewing" }),
  ]);

  return { totalInterested, shortlistedCount, contactedCount, interviewingCount };
}

async function getTalentProfile(talentId: string) {
  await connectToDatabase();
  const user = await User.findById(talentId).select("name talentProfile").lean();
  return user;
}

async function getRecentOpportunities(talentId: string) {
  await connectToDatabase();

  const shortlists = await Shortlist.find({ talentId })
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  if (shortlists.length === 0) return [];

  const companyIds = shortlists.map((s) => s.companyId);
  const companies = await User.find({ _id: { $in: companyIds } })
    .select("name companyProfile")
    .lean();

  const companyMap = new Map(companies.map((c) => [c._id.toString(), c]));

  return shortlists.map((s) => {
    const company = companyMap.get(s.companyId.toString());
    return {
      id: s._id.toString(),
      status: s.status,
      createdAt: s.createdAt,
      company: company
        ? {
            id: company._id.toString(),
            name: company.companyProfile?.companyName || company.name,
          }
        : null,
    };
  });
}

// Company Dashboard Component
function CompanyDashboard({ 
  session, 
  stats, 
  recentShortlists 
}: { 
  session: { user: { name?: string | null } }; 
  stats: Awaited<ReturnType<typeof getCompanyStats>>; 
  recentShortlists: Awaited<ReturnType<typeof getRecentShortlists>>;
}) {
  const statCards = [
    { name: "Available Talent", value: stats.totalTalent, icon: Users, color: "blue", href: "/dashboard/browse" },
    { name: "Shortlisted", value: stats.shortlistedCount, icon: Star, color: "amber", href: "/dashboard/shortlist" },
    { name: "Contacted", value: stats.contactedCount, icon: TrendingUp, color: "violet", href: "/dashboard/shortlist?status=contacted" },
    { name: "Hired", value: stats.hiredCount, icon: UserCheck, color: "emerald", href: "/dashboard/shortlist?status=hired" },
  ];

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
    violet: "bg-violet-50 text-violet-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {session.user.name?.split(" ")[0]}
        </h1>
        <p className="text-slate-500 mt-1">Here&apos;s what&apos;s happening with your talent search.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl ${colorMap[stat.color]} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Shortlists</h2>
          <Link href="/dashboard/shortlist" className="text-sm text-blue-600 hover:text-blue-700 font-medium">View all</Link>
        </div>
        
        {recentShortlists.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Star className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-500 mt-4">No candidates shortlisted yet.</p>
            <Link href="/dashboard/browse" className="inline-flex items-center gap-2 mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              Browse talent <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentShortlists.map((item) => (
              <li key={item.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center text-slate-600 font-medium">
                    {item.talent?.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.talent?.name || "Unknown"}</p>
                    <p className="text-xs text-slate-500 truncate">{item.talent?.title || "No title"}</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                    ${item.status === "shortlisted" ? "bg-amber-50 text-amber-700" : ""}
                    ${item.status === "contacted" ? "bg-blue-50 text-blue-700" : ""}
                    ${item.status === "interviewing" ? "bg-violet-50 text-violet-700" : ""}
                    ${item.status === "hired" ? "bg-emerald-50 text-emerald-700" : ""}
                    ${item.status === "rejected" ? "bg-slate-100 text-slate-600" : ""}
                  `}>
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

// Talent Dashboard Component
function TalentDashboard({ 
  session, 
  stats, 
  profile,
  recentOpportunities 
}: { 
  session: { user: { name?: string | null } }; 
  stats: Awaited<ReturnType<typeof getTalentStats>>;
  profile: Awaited<ReturnType<typeof getTalentProfile>>;
  recentOpportunities: Awaited<ReturnType<typeof getRecentOpportunities>>;
}) {
  const statCards = [
    { name: "Companies Interested", value: stats.totalInterested, icon: Eye, color: "violet", href: "/dashboard/opportunities" },
    { name: "Shortlisted By", value: stats.shortlistedCount, icon: Star, color: "amber", href: "/dashboard/opportunities" },
    { name: "Contacted", value: stats.contactedCount, icon: MessageSquare, color: "blue", href: "/dashboard/opportunities" },
    { name: "Interviewing", value: stats.interviewingCount, icon: Briefcase, color: "emerald", href: "/dashboard/opportunities" },
  ];

  const colorMap: Record<string, string> = {
    violet: "bg-violet-50 text-violet-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  const profileComplete = profile?.talentProfile?.title && 
    profile?.talentProfile?.skills && 
    profile?.talentProfile?.skills.length > 0 &&
    profile?.talentProfile?.bio;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {session.user.name?.split(" ")[0]}
        </h1>
        <p className="text-slate-500 mt-1">Here&apos;s your activity on Nxtbeings.</p>
      </div>

      {/* Profile Completion Banner */}
      {!profileComplete && (
        <div className="bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl p-6 text-white">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles className="w-6 h-6" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">Complete your profile</h3>
              <p className="text-white/80 mt-1">
                Profiles with complete information get 3x more views from companies.
              </p>
              <Link
                href="/dashboard/profile"
                className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-white text-violet-600 rounded-lg font-medium text-sm hover:bg-white/90 transition-colors"
              >
                Update profile
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link
            key={stat.name}
            href={stat.href}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <div className="flex items-center justify-between">
              <div className={`w-12 h-12 rounded-xl ${colorMap[stat.color]} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-400 group-hover:translate-x-1 transition-all" />
            </div>
            <div className="mt-4">
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-sm text-slate-500 mt-1">{stat.name}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-900">Recent Interest</h2>
          <Link href="/dashboard/opportunities" className="text-sm text-violet-600 hover:text-violet-700 font-medium">View all</Link>
        </div>
        
        {recentOpportunities.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Briefcase className="w-12 h-12 text-slate-200 mx-auto" />
            <p className="text-slate-500 mt-4">No companies have shown interest yet.</p>
            <p className="text-sm text-slate-400 mt-2">Complete your profile to get discovered!</p>
          </div>
        ) : (
          <ul className="divide-y divide-slate-100">
            {recentOpportunities.map((item) => (
              <li key={item.id} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-medium">
                    {item.company?.name?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">{item.company?.name || "Unknown Company"}</p>
                    <p className="text-xs text-slate-500">Interested in your profile</p>
                  </div>
                  <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                    ${item.status === "shortlisted" ? "bg-amber-50 text-amber-700" : ""}
                    ${item.status === "contacted" ? "bg-blue-50 text-blue-700" : ""}
                    ${item.status === "interviewing" ? "bg-violet-50 text-violet-700" : ""}
                    ${item.status === "hired" ? "bg-emerald-50 text-emerald-700" : ""}
                  `}>
                    {item.status}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default async function DashboardPage() {
  const session = await auth();
  
  if (!session?.user) return null;

  if (session.user.role === "company") {
    const stats = await getCompanyStats(session.user.id);
    const recentShortlists = await getRecentShortlists(session.user.id);
    return <CompanyDashboard session={session} stats={stats} recentShortlists={recentShortlists} />;
  }

  // Talent dashboard
  const stats = await getTalentStats(session.user.id);
  const profile = await getTalentProfile(session.user.id);
  const recentOpportunities = await getRecentOpportunities(session.user.id);
  return <TalentDashboard session={session} stats={stats} profile={profile} recentOpportunities={recentOpportunities} />;
}
