import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import Portfolio from "@/models/Portfolio";

// GET - Get current user's portfolio
export async function GET() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    let portfolio = await Portfolio.findOne({ userId: session.user.id }).lean();

    // Create empty portfolio if doesn't exist
    if (!portfolio) {
      portfolio = await Portfolio.create({
        userId: session.user.id,
        links: [],
        projects: [],
        files: [],
      });
    }

    return NextResponse.json({
      portfolio: {
        id: portfolio._id.toString(),
        links: portfolio.links || [],
        projects: portfolio.projects || [],
        files: portfolio.files || [],
        headline: portfolio.headline,
        summary: portfolio.summary,
      },
    });
  } catch (error) {
    console.error("Error fetching portfolio:", error);
    return NextResponse.json(
      { error: "Failed to fetch portfolio" },
      { status: 500 }
    );
  }
}

// PATCH - Update portfolio (headline, summary)
export async function PATCH(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "talent") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { headline, summary } = body;

    await connectToDatabase();

    const portfolio = await Portfolio.findOneAndUpdate(
      { userId: session.user.id },
      { 
        $set: { 
          ...(headline !== undefined && { headline }),
          ...(summary !== undefined && { summary }),
        } 
      },
      { new: true, upsert: true }
    );

    return NextResponse.json({
      message: "Portfolio updated",
      portfolio: {
        headline: portfolio.headline,
        summary: portfolio.summary,
      },
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    return NextResponse.json(
      { error: "Failed to update portfolio" },
      { status: 500 }
    );
  }
}

