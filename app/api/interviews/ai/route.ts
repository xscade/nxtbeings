import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { connectToDatabase } from "@/lib/mongodb";
import AIInterview from "@/models/AIInterview";
import JobDescription from "@/models/JobDescription";
import User from "@/models/User";

// Question type for interview
type InterviewQuestion = {
  question: string;
  category: "technical" | "behavioral" | "situational" | "general";
  expectedTopics: string[];
  order: number;
};

// Sample interview questions generator based on JD
function generateInterviewQuestions(jd: { title: string; skills?: string[]; experienceLevel?: string }): InterviewQuestion[] {
  const questions: InterviewQuestion[] = [
    {
      question: `Tell me about yourself and why you're interested in the ${jd.title} position.`,
      category: "general",
      expectedTopics: ["background", "motivation", "career goals"],
      order: 1,
    },
    {
      question: "Walk me through a challenging project you've worked on recently. What was your role and how did you handle obstacles?",
      category: "behavioral",
      expectedTopics: ["problem-solving", "leadership", "technical skills"],
      order: 2,
    },
  ];

  // Add skill-based questions
  if (jd.skills && jd.skills.length > 0) {
    const skillsToAsk = jd.skills.slice(0, 3);
    skillsToAsk.forEach((skill) => {
      questions.push({
        question: `Can you describe your experience with ${skill}? Share a specific example of how you've applied it.`,
        category: "technical",
        expectedTopics: [skill, "practical application", "depth of knowledge"],
        order: questions.length + 1,
      });
    });
  }

  // Add situational questions
  questions.push({
    question: "Describe a situation where you had to work with a difficult team member. How did you handle it?",
    category: "situational",
    expectedTopics: ["conflict resolution", "communication", "teamwork"],
    order: questions.length + 1,
  });

  questions.push({
    question: "Where do you see yourself in 5 years, and how does this role fit into your career plans?",
    category: "general",
    expectedTopics: ["career growth", "ambition", "company fit"],
    order: questions.length + 1,
  });

  return questions;
}

// GET - Fetch AI interviews (for company or talent)
export async function GET(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "20");
    const skip = (page - 1) * limit;

    // Build query based on user role
    const query: Record<string, unknown> = {};

    if (session.user.role === "company") {
      query.companyId = session.user.id;
    } else {
      query.talentId = session.user.id;
    }

    if (status && status !== "all") {
      query.status = status;
    }

    // Get interviews with related data
    const [interviews, total] = await Promise.all([
      AIInterview.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .select("-responses -eyeTrackingEvents") // Exclude large fields for list view
        .lean(),
      AIInterview.countDocuments(query),
    ]);

    // Get related job descriptions and users
    const jdIds = [...new Set(interviews.map((i) => i.jobDescriptionId.toString()))];
    const userIds = [...new Set([
      ...interviews.map((i) => i.talentId.toString()),
      ...interviews.map((i) => i.companyId.toString()),
    ])];

    const [jobDescriptions, users] = await Promise.all([
      JobDescription.find({ _id: { $in: jdIds } }).select("title department").lean(),
      User.find({ _id: { $in: userIds } }).select("name email image companyProfile talentProfile").lean(),
    ]);

    const jdMap = new Map(jobDescriptions.map((jd) => [jd._id.toString(), jd]));
    const userMap = new Map(users.map((u) => [u._id.toString(), u]));

    const enrichedInterviews = interviews.map((interview) => {
      const jd = jdMap.get(interview.jobDescriptionId.toString());
      const talent = userMap.get(interview.talentId.toString());
      const company = userMap.get(interview.companyId.toString());

      return {
        id: interview._id.toString(),
        status: interview.status,
        scheduledAt: interview.scheduledAt,
        startedAt: interview.startedAt,
        completedAt: interview.completedAt,
        expiresAt: interview.expiresAt,
        questionsCount: interview.questions?.length || 0,
        analysis: interview.analysis,
        viewedByRecruiter: interview.viewedByRecruiter,
        createdAt: interview.createdAt,
        updatedAt: interview.updatedAt,
        jobDescription: jd
          ? {
              id: jd._id.toString(),
              title: jd.title,
              department: jd.department,
            }
          : null,
        talent: talent
          ? {
              id: talent._id.toString(),
              name: talent.name,
              email: talent.email,
              image: talent.image,
              title: talent.talentProfile?.title,
            }
          : null,
        company: company
          ? {
              id: company._id.toString(),
              name: company.companyProfile?.companyName || company.name,
            }
          : null,
      };
    });

    return NextResponse.json({
      interviews: enrichedInterviews,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching AI interviews:", error);
    return NextResponse.json(
      { error: "Failed to fetch interviews" },
      { status: 500 }
    );
  }
}

// POST - Create new AI interview request
export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id || session.user.role !== "company") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { talentId, jobDescriptionId, scheduledAt, notes } = body;

    if (!talentId || !jobDescriptionId) {
      return NextResponse.json(
        { error: "Talent ID and Job Description ID are required" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Verify talent exists
    const talent = await User.findOne({ _id: talentId, role: "talent" });
    if (!talent) {
      return NextResponse.json(
        { error: "Talent not found" },
        { status: 404 }
      );
    }

    // Verify job description exists and belongs to company
    const jobDescription = await JobDescription.findOne({
      _id: jobDescriptionId,
      companyId: session.user.id,
    });

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description not found" },
        { status: 404 }
      );
    }

    // Check if there's already a pending/in-progress interview for this combination
    const existingInterview = await AIInterview.findOne({
      companyId: session.user.id,
      talentId,
      jobDescriptionId,
      status: { $in: ["pending", "scheduled", "in_progress"] },
    });

    if (existingInterview) {
      return NextResponse.json(
        { error: "An interview request already exists for this candidate and job" },
        { status: 400 }
      );
    }

    // Generate interview questions based on JD
    const questions = generateInterviewQuestions({
      title: jobDescription.title,
      skills: jobDescription.skills,
      experienceLevel: jobDescription.experienceLevel,
    });

    // Create interview
    const interview = await AIInterview.create({
      companyId: session.user.id,
      talentId,
      jobDescriptionId,
      status: scheduledAt ? "scheduled" : "pending",
      scheduledAt: scheduledAt ? new Date(scheduledAt) : undefined,
      questions,
      notes,
    });

    return NextResponse.json({
      message: "AI interview request created successfully",
      interview: {
        id: interview._id.toString(),
        status: interview.status,
        scheduledAt: interview.scheduledAt,
        expiresAt: interview.expiresAt,
        questionsCount: interview.questions.length,
        createdAt: interview.createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error("Error creating AI interview:", error);
    return NextResponse.json(
      { error: "Failed to create interview request" },
      { status: 500 }
    );
  }
}
