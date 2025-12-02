import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Portfolio from "@/models/Portfolio";

// GET - Get public talent profile by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectToDatabase();

    // Find talent user
    const user = await User.findOne({
      _id: id,
      role: "talent",
    }).select("-password");

    if (!user) {
      return NextResponse.json(
        { error: "Talent not found" },
        { status: 404 }
      );
    }

    // Get portfolio data
    const portfolio = await Portfolio.findOne({ userId: id });

    // Build public profile response
    const profile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email, // For contact purposes
      image: user.image,
      title: user.talentProfile?.title || "AI Professional",
      skills: user.talentProfile?.skills || [],
      experience: user.talentProfile?.experience || "",
      bio: user.talentProfile?.bio || "",
      hourlyRate: user.talentProfile?.hourlyRate || null,
      availability: user.talentProfile?.availability || "Available",
      verified: user.talentProfile?.verified || false,
      portfolio: portfolio ? {
        headline: portfolio.headline,
        summary: portfolio.summary,
        links: portfolio.links || [],
        projects: portfolio.projects || [],
        files: portfolio.files || [],
      } : null,
      memberSince: user.createdAt,
    };

    return NextResponse.json({ profile });
  } catch (error) {
    console.error("Error fetching talent profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch talent profile" },
      { status: 500 }
    );
  }
}

