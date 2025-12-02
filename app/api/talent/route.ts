import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    
    // Parse query params
    const search = searchParams.get("search") || "";
    const skills = searchParams.get("skills")?.split(",").filter(Boolean) || [];
    const experience = searchParams.get("experience") || "";
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "12");
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = {
      role: "talent",
      onboardingCompleted: true,
    };

    // Search by name or title
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { "talentProfile.title": { $regex: search, $options: "i" } },
        { "talentProfile.bio": { $regex: search, $options: "i" } },
      ];
    }

    // Filter by skills
    if (skills.length > 0) {
      query["talentProfile.skills"] = { $in: skills };
    }

    // Filter by experience
    if (experience) {
      query["talentProfile.experience"] = experience;
    }

    // Execute query
    const [talents, total] = await Promise.all([
      User.find(query)
        .select("name email image talentProfile createdAt")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      User.countDocuments(query),
    ]);

    return NextResponse.json({
      talents: talents.map((t) => ({
        id: t._id.toString(),
        name: t.name,
        email: t.email,
        image: t.image,
        ...t.talentProfile,
        createdAt: t.createdAt,
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

