import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import JobDescription from "@/models/JobDescription";

// GET - Fetch single job description
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectToDatabase();

    const jobDescription = await JobDescription.findOne({
      _id: id,
      companyId: session.user.id,
    }).lean();

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description not found" },
        { status: 404 }
      );
    }

    // Update view count and last opened
    await JobDescription.updateOne(
      { _id: id },
      {
        $inc: { viewCount: 1 },
        $set: { lastOpenedAt: new Date() },
      }
    );

    return NextResponse.json({
      jobDescription: {
        id: jobDescription._id.toString(),
        title: jobDescription.title,
        content: jobDescription.content,
        status: jobDescription.status,
        department: jobDescription.department,
        location: jobDescription.location,
        employmentType: jobDescription.employmentType,
        experienceLevel: jobDescription.experienceLevel,
        salaryRange: jobDescription.salaryRange,
        skills: jobDescription.skills,
        benefits: jobDescription.benefits,
        thumbnail: jobDescription.thumbnail,
        viewCount: jobDescription.viewCount,
        createdAt: jobDescription.createdAt,
        updatedAt: jobDescription.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error fetching job description:", error);
    return NextResponse.json(
      { error: "Failed to fetch job description" },
      { status: 500 }
    );
  }
}

// PUT - Update job description
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    await connectToDatabase();

    // Verify ownership
    const existing = await JobDescription.findOne({
      _id: id,
      companyId: session.user.id,
    });

    if (!existing) {
      return NextResponse.json(
        { error: "Job description not found" },
        { status: 404 }
      );
    }

    // Update fields
    const updateFields: Record<string, unknown> = {};
    const allowedFields = [
      "title",
      "content",
      "status",
      "department",
      "location",
      "employmentType",
      "experienceLevel",
      "salaryRange",
      "skills",
      "benefits",
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updateFields[field] = body[field];
      }
    });

    const updatedJD = await JobDescription.findByIdAndUpdate(
      id,
      { $set: updateFields },
      { new: true }
    ).lean();

    return NextResponse.json({
      message: "Job description updated successfully",
      jobDescription: {
        id: updatedJD?._id.toString(),
        title: updatedJD?.title,
        status: updatedJD?.status,
        updatedAt: updatedJD?.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating job description:", error);
    return NextResponse.json(
      { error: "Failed to update job description" },
      { status: 500 }
    );
  }
}

// DELETE - Delete job description
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectToDatabase();

    // Verify ownership and delete
    const result = await JobDescription.findOneAndDelete({
      _id: id,
      companyId: session.user.id,
    });

    if (!result) {
      return NextResponse.json(
        { error: "Job description not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Job description deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting job description:", error);
    return NextResponse.json(
      { error: "Failed to delete job description" },
      { status: 500 }
    );
  }
}
