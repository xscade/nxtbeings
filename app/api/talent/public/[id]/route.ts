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

    // Build public profile response with all talentProfile fields
    const profile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      image: user.image,
      title: user.talentProfile?.title || "AI Professional",
      bio: user.talentProfile?.bio || "",
      hourlyRate: user.talentProfile?.hourlyRate || null,
      verified: user.talentProfile?.verified || false,
      memberSince: user.createdAt,
      
      // Include the full talentProfile for nested access
      talentProfile: {
        title: user.talentProfile?.title,
        tagline: user.talentProfile?.tagline,
        bio: user.talentProfile?.bio,
        location: user.talentProfile?.location,
        timezone: user.talentProfile?.timezone,
        available: user.talentProfile?.available,
        availableFrom: user.talentProfile?.availableFrom,
        weeklyAvailability: user.talentProfile?.weeklyAvailability,
        hourlyRate: user.talentProfile?.hourlyRate,
        rating: user.talentProfile?.rating,
        totalReviews: user.talentProfile?.totalReviews || 0,
        jobsCompleted: user.talentProfile?.jobsCompleted || 0,
        successRate: user.talentProfile?.successRate,
        responseTime: user.talentProfile?.responseTime,
        verified: user.talentProfile?.verified,
        
        // Skills, languages, experience, education, certifications
        skills: user.talentProfile?.skills || [],
        languages: user.talentProfile?.languages || [],
        experience: user.talentProfile?.experience || [],
        education: user.talentProfile?.education || [],
        certifications: user.talentProfile?.certifications || [],
        
        // Stats
        stats: user.talentProfile?.stats || {
          onTimeDelivery: 0,
          onBudget: 0,
          repeatClients: 0,
        },
      },
      
      // Skills at top level for backward compatibility
      skills: user.talentProfile?.skills || [],
      
      // Portfolio data
      portfolio: portfolio ? {
        headline: portfolio.headline,
        summary: portfolio.summary,
        links: portfolio.links || [],
        projects: portfolio.projects || [],
        files: portfolio.files || [],
      } : null,
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
