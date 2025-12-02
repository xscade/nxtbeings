import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Shortlist from "@/models/Shortlist";
import User from "@/models/User";

// GET - Get companies that have shortlisted this talent
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    // Find all shortlist entries where this talent is shortlisted
    const shortlists = await Shortlist.find({ talentId: session.user.id })
      .sort({ createdAt: -1 })
      .lean();

    if (shortlists.length === 0) {
      return NextResponse.json({ opportunities: [], stats: { total: 0, shortlisted: 0, contacted: 0, interviewing: 0 } });
    }

    // Get company details
    const companyIds = shortlists.map((s) => s.companyId);
    const companies = await User.find({ _id: { $in: companyIds } })
      .select("name email image companyProfile")
      .lean();

    const companyMap = new Map(companies.map((c) => [c._id.toString(), c]));

    // Enrich shortlists with company data
    const opportunities = shortlists.map((s) => {
      const company = companyMap.get(s.companyId.toString());
      return {
        id: s._id.toString(),
        status: s.status,
        createdAt: s.createdAt,
        company: company
          ? {
              id: company._id.toString(),
              name: company.companyProfile?.companyName || company.name,
              email: company.email,
              image: company.image,
              website: company.companyProfile?.website,
              size: company.companyProfile?.size,
              industry: company.companyProfile?.industry,
            }
          : null,
      };
    });

    // Calculate stats
    const stats = {
      total: shortlists.length,
      shortlisted: shortlists.filter((s) => s.status === "shortlisted").length,
      contacted: shortlists.filter((s) => s.status === "contacted").length,
      interviewing: shortlists.filter((s) => s.status === "interviewing").length,
    };

    return NextResponse.json({ opportunities, stats });
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    return NextResponse.json(
      { error: "Failed to fetch opportunities" },
      { status: 500 }
    );
  }
}

