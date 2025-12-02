import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

// POST - Add a new file reference
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fileType, fileName, fileUrl, fileSize, mimeType, thumbnail, description } = body;

    if (!fileType || !fileName || !fileUrl) {
      return NextResponse.json(
        { error: "File type, name, and URL are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: session.user.id },
      { 
        $push: { 
          files: { 
            fileType, 
            fileName, 
            fileUrl, 
            fileSize, 
            mimeType,
            thumbnail,
            description,
          } 
        } 
      },
      { new: true, upsert: true }
    );

    const newFile = portfolio.files[portfolio.files.length - 1];

    return NextResponse.json({
      message: "File added",
      file: newFile,
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding file:", error);
    return NextResponse.json(
      { error: "Failed to add file" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a file
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const fileId = searchParams.get("id");

    if (!fileId) {
      return NextResponse.json(
        { error: "File ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    await Portfolio.findOneAndUpdate(
      { userId: session.user.id },
      { $pull: { files: { _id: fileId } } }
    );

    return NextResponse.json({ message: "File removed" });
  } catch (error) {
    console.error("Error removing file:", error);
    return NextResponse.json(
      { error: "Failed to remove file" },
      { status: 500 }
    );
  }
}

