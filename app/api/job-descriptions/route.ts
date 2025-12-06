import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import JobDescription from "@/models/JobDescription";

// GET - Fetch company's job descriptions
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const sortBy = searchParams.get("sortBy") || "updatedAt";
    const sortOrder = searchParams.get("sortOrder") === "asc" ? 1 : -1;
    const skip = (page - 1) * limit;

    // Build query
    const query: Record<string, unknown> = {
      companyId: session.user.id,
    };

    if (status && status !== "all") {
      query.status = status;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Get job descriptions
    const [jobDescriptions, total] = await Promise.all([
      JobDescription.find(query)
        .sort({ [sortBy]: sortOrder })
        .skip(skip)
        .limit(limit)
        .select("-content -rawContent") // Exclude large content fields for list view
        .lean(),
      JobDescription.countDocuments(query),
    ]);

    const formattedJDs = jobDescriptions.map((jd) => ({
      id: jd._id.toString(),
      title: jd.title,
      status: jd.status,
      department: jd.department,
      location: jd.location,
      employmentType: jd.employmentType,
      experienceLevel: jd.experienceLevel,
      skills: jd.skills,
      thumbnail: jd.thumbnail,
      viewCount: jd.viewCount,
      lastOpenedAt: jd.lastOpenedAt,
      createdAt: jd.createdAt,
      updatedAt: jd.updatedAt,
    }));

    return NextResponse.json({
      jobDescriptions: formattedJDs,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching job descriptions:", error);
    return NextResponse.json(
      { error: "Failed to fetch job descriptions" },
      { status: 500 }
    );
  }
}

// POST - Create new job description
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      content,
      status = "draft",
      department,
      location,
      employmentType,
      experienceLevel,
      salaryRange,
      skills,
      benefits,
    } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Job title is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Generate a random pastel color for thumbnail
    const colors = [
      "#E3F2FD", "#E8F5E9", "#FFF3E0", "#F3E5F5", "#E0F7FA",
      "#FCE4EC", "#F1F8E9", "#E8EAF6", "#FFF8E1", "#E0F2F1",
    ];
    const thumbnail = colors[Math.floor(Math.random() * colors.length)];

    const jobDescription = await JobDescription.create({
      companyId: session.user.id,
      title,
      content: content || [],
      status,
      department,
      location,
      employmentType,
      experienceLevel,
      salaryRange,
      skills,
      benefits,
      thumbnail,
    });

    return NextResponse.json({
      message: "Job description created successfully",
      jobDescription: {
        id: jobDescription._id.toString(),
        title: jobDescription.title,
        status: jobDescription.status,
        thumbnail: jobDescription.thumbnail,
        createdAt: jobDescription.createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating job description:", error);
    return NextResponse.json(
      { error: "Failed to create job description" },
      { status: 500 }
    );
  }
}
