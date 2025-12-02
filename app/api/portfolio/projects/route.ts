import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

// POST - Add a new project
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, techStack, repoUrl, liveUrl, imageUrl, featured } = body;

    if (!title) {
      return NextResponse.json(
        { error: "Project title is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: session.user.id },
      { 
        $push: { 
          projects: { 
            title, 
            description, 
            techStack: techStack || [], 
            repoUrl, 
            liveUrl, 
            imageUrl,
            featured: featured || false,
          } 
        } 
      },
      { new: true, upsert: true }
    );

    const newProject = portfolio.projects[portfolio.projects.length - 1];

    return NextResponse.json({
      message: "Project added",
      project: newProject,
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding project:", error);
    return NextResponse.json(
      { error: "Failed to add project" },
      { status: 500 }
    );
  }
}

// PATCH - Update a project
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, ...updates } = body;

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const updateFields: Record<string, unknown> = {};
    Object.keys(updates).forEach((key) => {
      if (updates[key] !== undefined) {
        updateFields[`projects.$.${key}`] = updates[key];
      }
    });

    await Portfolio.findOneAndUpdate(
      { userId: session.user.id, "projects._id": projectId },
      { $set: updateFields }
    );

    return NextResponse.json({ message: "Project updated" });
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a project
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get("id");

    if (!projectId) {
      return NextResponse.json(
        { error: "Project ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    await Portfolio.findOneAndUpdate(
      { userId: session.user.id },
      { $pull: { projects: { _id: projectId } } }
    );

    return NextResponse.json({ message: "Project removed" });
  } catch (error) {
    console.error("Error removing project:", error);
    return NextResponse.json(
      { error: "Failed to remove project" },
      { status: 500 }
    );
  }
}

