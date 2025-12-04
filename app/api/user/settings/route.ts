import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// GET - Get user settings
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(session.user.id)
      .select("notifications privacy")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const isCompany = user.role === "company";
    
    return NextResponse.json({
      notifications: user.notifications || (isCompany ? {
        newApplications: true,
        talentInterest: true,
        shortlistUpdates: true,
        messages: true,
        weeklyDigest: false,
      } : {
        newOpportunities: true,
        shortlisted: true,
        messages: true,
        profileViews: true,
        weeklyDigest: false,
      }),
      privacy: user.privacy || {
        profileVisibility: "public",
        showEmail: false,
        showPhone: false,
        allowMessages: true,
        showAvailability: true,
        showHourlyRate: true,
      },
    });
  } catch (error) {
    console.error("Error fetching settings:", error);
    return NextResponse.json(
      { error: "Failed to fetch settings" },
      { status: 500 }
    );
  }
}

// PATCH - Update user settings
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { notifications, privacy } = body;

    await connectToDatabase();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update notifications if provided
    if (notifications) {
      user.notifications = {
        ...user.notifications,
        ...notifications,
      };
    }

    // Update privacy if provided
    if (privacy) {
      user.privacy = {
        ...user.privacy,
        ...privacy,
      };
    }

    await user.save();

    return NextResponse.json({
      message: "Settings updated successfully",
      notifications: user.notifications,
      privacy: user.privacy,
    });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { error: "Failed to update settings" },
      { status: 500 }
    );
  }
}

