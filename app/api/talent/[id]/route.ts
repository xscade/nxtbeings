import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Shortlist from "@/models/Shortlist";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectToDatabase();

    const talent = await User.findOne({
      _id: id,
      role: "talent",
    })
      .select("name email image talentProfile createdAt")
      .lean();

    if (!talent) {
      return NextResponse.json({ error: "Talent not found" }, { status: 404 });
    }

    // Check if this talent is shortlisted by the company
    let shortlistStatus = null;
    if (session.user.role === "company") {
      const shortlist = await Shortlist.findOne({
        companyId: session.user.id,
        talentId: id,
      }).lean();
      
      if (shortlist) {
        shortlistStatus = {
          id: shortlist._id.toString(),
          status: shortlist.status,
          notes: shortlist.notes,
        };
      }
    }

    return NextResponse.json({
      talent: {
        id: talent._id.toString(),
        name: talent.name,
        email: talent.email,
        image: talent.image,
        ...talent.talentProfile,
        createdAt: talent.createdAt,
      },
      shortlist: shortlistStatus,
    });
  } catch (error) {
    console.error("Error fetching talent:", error);
    return NextResponse.json(
      { error: "Failed to fetch talent" },
      { status: 500 }
    );
  }
}

