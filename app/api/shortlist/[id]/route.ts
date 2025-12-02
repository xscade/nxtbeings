import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Shortlist from "@/models/Shortlist";

// PATCH - Update shortlist entry (status, notes)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const { status, notes } = await request.json();

    await connectToDatabase();

    const shortlist = await Shortlist.findOne({
      _id: id,
      companyId: session.user.id,
    });

    if (!shortlist) {
      return NextResponse.json(
        { error: "Shortlist entry not found" },
        { status: 404 }
      );
    }

    // Update fields
    if (status) {
      shortlist.status = status;
    }
    if (notes !== undefined) {
      shortlist.notes = notes;
    }

    await shortlist.save();

    return NextResponse.json({
      message: "Shortlist updated",
      shortlist: {
        id: shortlist._id.toString(),
        status: shortlist.status,
        notes: shortlist.notes,
        updatedAt: shortlist.updatedAt,
      },
    });
  } catch (error) {
    console.error("Error updating shortlist:", error);
    return NextResponse.json(
      { error: "Failed to update shortlist" },
      { status: 500 }
    );
  }
}

// DELETE - Remove from shortlist
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

    const result = await Shortlist.findOneAndDelete({
      _id: id,
      companyId: session.user.id,
    });

    if (!result) {
      return NextResponse.json(
        { error: "Shortlist entry not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Removed from shortlist",
    });
  } catch (error) {
    console.error("Error removing from shortlist:", error);
    return NextResponse.json(
      { error: "Failed to remove from shortlist" },
      { status: 500 }
    );
  }
}

