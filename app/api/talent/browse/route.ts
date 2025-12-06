import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// Public endpoint for browsing talent - no authentication required
export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    
    // Parse query params
    const search = searchParams.get("search") || "";
    const skills = searchParams.get("skills")?.split(",").filter(Boolean) || [];
    const category = searchParams.get("category") || "";
    const minRate = searchParams.get("minRate") ? parseInt(searchParams.get("minRate")!) : null;
    const maxRate = searchParams.get("maxRate") ? parseInt(searchParams.get("maxRate")!) : null;
    const location = searchParams.get("location") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const sort = searchParams.get("sort") || "relevant";
    const skip = (page - 1) * limit;

    // Build query - only show talents who have completed onboarding
    const query: Record<string, unknown> = {
      role: "talent",
      onboardingCompleted: true,
    };

    // Search by name, title, or bio
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "talentProfile.title": { $regex: search, $options: "i" } },
        { "talentProfile.bio": { $regex: search, $options: "i" } },
        { "talentProfile.skills": { $regex: search, $options: "i" } },
      ];
    }

    // Filter by skills
    if (skills.length > 0) {
      query["talentProfile.skills"] = { $in: skills };
    }

    // Filter by category (maps to certain skills or titles)
    if (category) {
      query.$or = [
        { "talentProfile.title": { $regex: category, $options: "i" } },
        { "talentProfile.skills": { $regex: category, $options: "i" } },
      ];
    }

    // Filter by hourly rate range
    if (minRate !== null || maxRate !== null) {
      query["talentProfile.hourlyRate"] = {};
      if (minRate !== null) {
        (query["talentProfile.hourlyRate"] as Record<string, number>).$gte = minRate;
      }
      if (maxRate !== null) {
        (query["talentProfile.hourlyRate"] as Record<string, number>).$lte = maxRate;
      }
    }

    // Filter by location
    if (location) {
      query["talentProfile.location"] = { $regex: location, $options: "i" };
    }

    // Define sort options
    let sortOption: Record<string, 1 | -1> = { createdAt: -1 };
    switch (sort) {
      case "highest-rated":
        sortOption = { "talentProfile.rating": -1, createdAt: -1 };
        break;
      case "most-jobs":
        sortOption = { "talentProfile.jobsCompleted": -1, createdAt: -1 };
        break;
      case "lowest-rate":
        sortOption = { "talentProfile.hourlyRate": 1, createdAt: -1 };
        break;
      case "highest-rate":
        sortOption = { "talentProfile.hourlyRate": -1, createdAt: -1 };
        break;
      default:
        sortOption = { createdAt: -1 };
    }

    // Execute query
    const [talents, total] = await Promise.all([
      User.find(query)
        .select("name image talentProfile createdAt")
        .sort(sortOption)
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ]);

    return NextResponse.json({
      talents: talents.map((t) => ({
        id: t._id.toString(),
        name: t.name || "Anonymous",
        image: t.image,
        title: t.talentProfile?.title || "Professional",
        bio: t.talentProfile?.bio || "",
        location: t.talentProfile?.location || "Remote",
        hourlyRate: t.talentProfile?.hourlyRate || 0,
        rating: t.talentProfile?.rating || 0,
        completedJobs: t.talentProfile?.jobsCompleted || 0,
        skills: t.talentProfile?.skills || [],
        verified: t.talentProfile?.verified || false,
        availability: t.talentProfile?.availability || "available",
      })),
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching talent:", error);
    return NextResponse.json(
      { error: "Failed to fetch talent" },
      { status: 500 }
    );
  }
}