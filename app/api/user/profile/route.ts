import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";

// GET - Get current user's profile
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const user = await User.findById(session.user.id)
      .select("-password")
      .lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        onboardingCompleted: user.onboardingCompleted,
        ...(user.role === "company" && { companyProfile: user.companyProfile }),
        ...(user.role === "talent" && { talentProfile: user.talentProfile }),
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

// PATCH - Update current user's profile
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { name, image, talentProfile, companyProfile } = body;

    await connectToDatabase();

    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update basic fields
    if (name) user.name = name;
    if (image !== undefined) user.image = image;

    // Update role-specific profile
    if (user.role === "talent" && talentProfile) {
      user.talentProfile = {
        ...user.talentProfile,
        ...talentProfile,
      };
    }

    if (user.role === "company" && companyProfile) {
      user.companyProfile = {
        ...user.companyProfile,
        ...companyProfile,
      };
    }

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        id: user._id.toString(),
        email: user.email,
        name: user.name,
        image: user.image,
        role: user.role,
        ...(user.role === "company" && { companyProfile: user.companyProfile }),
        ...(user.role === "talent" && { talentProfile: user.talentProfile }),
      },
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}

