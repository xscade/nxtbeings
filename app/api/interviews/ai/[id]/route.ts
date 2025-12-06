import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import AIInterview from "@/models/AIInterview";
import JobDescription from "@/models/JobDescription";
import User from "@/models/User";

// GET - Fetch single AI interview with full details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await connectToDatabase();

    // Build query based on user role
    const query: Record<string, unknown> = { _id: id };

    if (session.user.role === "company") {
      query.companyId = session.user.id;
    } else {
      query.talentId = session.user.id;
    }

    const interview = await AIInterview.findOne(query).lean();

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    // Get related data
    const [jobDescription, talent, company] = await Promise.all([
      JobDescription.findById(interview.jobDescriptionId)
        .select("title content department location employmentType experienceLevel skills")
        .lean(),
      User.findById(interview.talentId)
        .select("name email image talentProfile")
        .lean(),
      User.findById(interview.companyId)
        .select("name email companyProfile")
        .lean(),
    ]);

    // If company is viewing, mark as viewed
    if (session.user.role === "company" && !interview.viewedByRecruiter) {
      await AIInterview.updateOne(
        { _id: id },
        {
          $set: {
            viewedByRecruiter: true,
            viewedAt: new Date(),
          },
        }
      );
    }

    return NextResponse.json({
      interview: {
        id: interview._id.toString(),
        status: interview.status,
        scheduledAt: interview.scheduledAt,
        startedAt: interview.startedAt,
        completedAt: interview.completedAt,
        expiresAt: interview.expiresAt,
        questions: interview.questions,
        responses: interview.responses,
        eyeTrackingEvents: session.user.role === "company" ? interview.eyeTrackingEvents : undefined,
        analysis: interview.analysis,
        totalDuration: interview.totalDuration,
        videoRecordingUrl: interview.videoRecordingUrl,
        notes: interview.notes,
        feedback: interview.feedback,
        viewedByRecruiter: interview.viewedByRecruiter,
        createdAt: interview.createdAt,
        updatedAt: interview.updatedAt,
        jobDescription: jobDescription
          ? {
              id: jobDescription._id.toString(),
              title: jobDescription.title,
              content: jobDescription.content,
              department: jobDescription.department,
              location: jobDescription.location,
              employmentType: jobDescription.employmentType,
              experienceLevel: jobDescription.experienceLevel,
              skills: jobDescription.skills,
            }
          : null,
        talent: talent
          ? {
              id: talent._id.toString(),
              name: talent.name,
              email: talent.email,
              image: talent.image,
              ...talent.talentProfile,
            }
          : null,
        company: company
          ? {
              id: company._id.toString(),
              name: company.companyProfile?.companyName || company.name,
              email: company.email,
            }
          : null,
      },
    });
  } catch (error) {
    console.error("Error fetching AI interview:", error);
    return NextResponse.json(
      { error: "Failed to fetch interview" },
      { status: 500 }
    );
  }
}

// PUT - Update AI interview (start, submit response, complete, cancel)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { action, response, eyeTrackingEvent, analysis, notes, feedback } = body;

    await connectToDatabase();

    // Find the interview
    const interview = await AIInterview.findById(id);

    if (!interview) {
      return NextResponse.json(
        { error: "Interview not found" },
        { status: 404 }
      );
    }

    // Verify authorization
    const isCompany = session.user.role === "company" && interview.companyId.toString() === session.user.id;
    const isTalent = session.user.role === "talent" && interview.talentId.toString() === session.user.id;

    if (!isCompany && !isTalent) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Handle different actions
    switch (action) {
      case "start":
        // Only talent can start the interview
        if (!isTalent) {
          return NextResponse.json(
            { error: "Only candidates can start the interview" },
            { status: 403 }
          );
        }
        if (interview.status !== "pending" && interview.status !== "scheduled") {
          return NextResponse.json(
            { error: "Interview cannot be started" },
            { status: 400 }
          );
        }
        interview.status = "in_progress";
        interview.startedAt = new Date();
        break;

      case "submit_response":
        // Only talent can submit responses
        if (!isTalent) {
          return NextResponse.json(
            { error: "Only candidates can submit responses" },
            { status: 403 }
          );
        }
        if (interview.status !== "in_progress") {
          return NextResponse.json(
            { error: "Interview is not in progress" },
            { status: 400 }
          );
        }
        if (response) {
          interview.responses.push(response);
        }
        break;

      case "add_eye_tracking":
        // Only talent can add eye tracking events
        if (!isTalent) {
          return NextResponse.json(
            { error: "Only candidates can add eye tracking data" },
            { status: 403 }
          );
        }
        if (eyeTrackingEvent) {
          interview.eyeTrackingEvents.push({
            ...eyeTrackingEvent,
            timestamp: new Date(),
          });
        }
        break;

      case "complete":
        // Only talent can complete the interview
        if (!isTalent) {
          return NextResponse.json(
            { error: "Only candidates can complete the interview" },
            { status: 403 }
          );
        }
        if (interview.status !== "in_progress") {
          return NextResponse.json(
            { error: "Interview is not in progress" },
            { status: 400 }
          );
        }
        interview.status = "completed";
        interview.completedAt = new Date();
        
        // Calculate total duration
        if (interview.startedAt) {
          interview.totalDuration = Math.round(
            (new Date().getTime() - interview.startedAt.getTime()) / 1000
          );
        }

        // Generate mock analysis (in production, this would call AI service)
        interview.analysis = generateMockAnalysis(interview);
        break;

      case "cancel":
        // Both company and talent can cancel
        if (interview.status === "completed") {
          return NextResponse.json(
            { error: "Completed interviews cannot be cancelled" },
            { status: 400 }
          );
        }
        interview.status = "cancelled";
        break;

      case "update_notes":
        // Only company can update notes
        if (!isCompany) {
          return NextResponse.json(
            { error: "Only recruiters can update notes" },
            { status: 403 }
          );
        }
        if (notes !== undefined) {
          interview.notes = notes;
        }
        break;

      case "add_feedback":
        // Only company can add feedback
        if (!isCompany) {
          return NextResponse.json(
            { error: "Only recruiters can add feedback" },
            { status: 403 }
          );
        }
        if (feedback !== undefined) {
          interview.feedback = feedback;
        }
        break;

      default:
        return NextResponse.json(
          { error: "Invalid action" },
          { status: 400 }
        );
    }

    await interview.save();

    return NextResponse.json({
      message: "Interview updated successfully",
      interview: {
        id: interview._id.toString(),
        status: interview.status,
        startedAt: interview.startedAt,
        completedAt: interview.completedAt,
        totalDuration: interview.totalDuration,
        responsesCount: interview.responses.length,
        analysis: interview.analysis,
      },
    });
  } catch (error) {
    console.error("Error updating AI interview:", error);
    return NextResponse.json(
      { error: "Failed to update interview" },
      { status: 500 }
    );
  }
}

// Mock analysis generator (in production, this would call AI service)
function generateMockAnalysis(interview: { responses: { response: string; confidence?: number; relevance?: number }[]; eyeTrackingEvents: { type: string }[] }) {
  const responseCount = interview.responses.length;
  const avgConfidence = responseCount > 0
    ? interview.responses.reduce((sum, r) => sum + (r.confidence || 75), 0) / responseCount
    : 75;

  // Calculate cheating risk based on eye tracking events
  const suspiciousEvents = interview.eyeTrackingEvents.filter(
    (e) => e.type !== "normal"
  ).length;
  const cheatingRisk = suspiciousEvents > 10 ? "high" : suspiciousEvents > 5 ? "medium" : "low";

  return {
    overallScore: Math.round(avgConfidence),
    technicalScore: Math.round(70 + Math.random() * 25),
    communicationScore: Math.round(70 + Math.random() * 25),
    behavioralScore: Math.round(70 + Math.random() * 25),
    strengths: [
      "Clear communication style",
      "Strong technical background",
      "Good problem-solving approach",
    ],
    weaknesses: [
      "Could provide more specific examples",
      "Consider elaborating on past achievements",
    ],
    recommendations: [
      "Strong candidate for technical roles",
      "Consider follow-up interview for deeper technical assessment",
    ],
    keyInsights: [
      "Candidate showed enthusiasm for the role",
      "Demonstrated relevant experience",
      "Good cultural fit indicators",
    ],
    cheatingRiskLevel: cheatingRisk as "low" | "medium" | "high",
    cheatingIndicators: suspiciousEvents > 0
      ? [`${suspiciousEvents} suspicious eye-tracking events detected`]
      : [],
  };
}
