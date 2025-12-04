import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import Portfolio from "@/models/Portfolio";
import Shortlist from "@/models/Shortlist";

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const userId = session.user.id;

    // Delete associated data
    await Promise.all([
      Portfolio.deleteMany({ userId }),
      Shortlist.deleteMany({ $or: [{ talentId: userId }, { companyId: userId }] }),
    ]);

    // Delete user account
    await User.findByIdAndDelete(userId);

    return NextResponse.json({
      message: "Account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting account:", error);
    return NextResponse.json(
      { error: "Failed to delete account" },
      { status: 500 }
    );
  }
}

