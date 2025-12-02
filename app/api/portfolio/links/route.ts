import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

// POST - Add a new link
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { type, url, title } = body;

    if (!type || !url) {
      return NextResponse.json(
        { error: "Type and URL are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: session.user.id },
      { 
        $push: { 
          links: { type, url, title } 
        } 
      },
      { new: true, upsert: true }
    );

    const newLink = portfolio.links[portfolio.links.length - 1];

    return NextResponse.json({
      message: "Link added",
      link: {
        _id: newLink._id,
        type: newLink.type,
        url: newLink.url,
        title: newLink.title,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error adding link:", error);
    return NextResponse.json(
      { error: "Failed to add link" },
      { status: 500 }
    );
  }
}

// DELETE - Remove a link
export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const linkId = searchParams.get("id");

    if (!linkId) {
      return NextResponse.json(
        { error: "Link ID is required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    await Portfolio.findOneAndUpdate(
      { userId: session.user.id },
      { $pull: { links: { _id: linkId } } }
    );

    return NextResponse.json({ message: "Link removed" });
  } catch (error) {
    console.error("Error removing link:", error);
    return NextResponse.json(
      { error: "Failed to remove link" },
      { status: 500 }
    );
  }
}

