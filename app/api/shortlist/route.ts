import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Shortlist from "@/models/Shortlist";
import User from "@/models/User";

// GET - Fetch company's shortlisted candidates
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = {
      companyId: session.user.id,
    };

    if (status) {
      query.status = status;
    }

    // Get shortlisted candidates with talent details
    const [shortlists, total] = await Promise.all([
      Shortlist.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Shortlist.countDocuments(query),
    ]);

    // Get talent details for each shortlist
    const talentIds = shortlists.map((s) => s.talentId);
    const talents = await User.find({ _id: { $in: talentIds } })
      .select("name email image talentProfile")
      .lean();

    const talentMap = new Map(talents.map((t) => [t._id.toString(), t]));

    const enrichedShortlists = shortlists.map((s) => {
      const talent = talentMap.get(s.talentId.toString());
      return {
        id: s._id.toString(),
        status: s.status,
        notes: s.notes,
        createdAt: s.createdAt,
        updatedAt: s.updatedAt,
        talent: talent
          ? {
              id: talent._id.toString(),
              name: talent.name,
              email: talent.email,
              image: talent.image,
              ...talent.talentProfile,
            }
          : null,
      };
    });

    return NextResponse.json({
      shortlists: enrichedShortlists,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching shortlist:", error);
    return NextResponse.json(
      { error: "Failed to fetch shortlist" },
      { status: 500 }
    );
  }
}

// POST - Add candidate to shortlist
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { talentId, notes } = await request.json();

    if (!talentId) {
      return NextResponse.json(
        { error: "Talent ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify talent exists
    const talent = await User.findOne({ _id: talentId, role: "talent" });
    if (!talent) {
      return NextResponse.json(
        { error: "Talent not found" },
        { status: 404 }
      );
    }

    // Check if already shortlisted
    const existing = await Shortlist.findOne({
      companyId: session.user.id,
      talentId,
    });

    if (existing) {
      return NextResponse.json(
        { error: "Candidate already shortlisted" },
        { status: 400 }
      );
    }

    // Create shortlist entry
    const shortlist = await Shortlist.create({
      companyId: session.user.id,
      talentId,
      status: "shortlisted",
      notes,
    });

    return NextResponse.json({
      message: "Candidate added to shortlist",
      shortlist: {
        id: shortlist._id.toString(),
        status: shortlist.status,
        notes: shortlist.notes,
        createdAt: shortlist.createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding to shortlist:", error);
    return NextResponse.json(
      { error: "Failed to add to shortlist" },
      { status: 500 }
    );
  }
}

