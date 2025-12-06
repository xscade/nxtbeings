import mongoose, { Schema, Document, Model } from "mongoose";

export interface IInterviewQuestion {
  question: string;
  category: "technical" | "behavioral" | "situational" | "general";
  expectedTopics?: string[];
  order: number;
}

export interface IInterviewResponse {
  questionId: number;
  question: string;
  response: string;
  startTime: Date;
  endTime: Date;
  duration: number; // in seconds
  confidence?: number; // AI-evaluated confidence score
  relevance?: number; // How relevant the answer was
  audioUrl?: string;
  videoUrl?: string;
}

export interface IEyeTrackingEvent {
  timestamp: Date;
  type: "look_away" | "multiple_faces" | "reading_detected" | "face_not_visible" | "normal";
  duration?: number; // in milliseconds
  details?: string;
}

export interface IInterviewAnalysis {
  overallScore: number; // 0-100
  technicalScore?: number;
  communicationScore?: number;
  behavioralScore?: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  keyInsights: string[];
  cheatingRiskLevel: "low" | "medium" | "high";
  cheatingIndicators: string[];
}

export interface IAIInterview extends Document {
  _id: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  talentId: mongoose.Types.ObjectId;
  jobDescriptionId: mongoose.Types.ObjectId;
  status: "pending" | "scheduled" | "in_progress" | "completed" | "cancelled" | "expired";
  scheduledAt?: Date;
  startedAt?: Date;
  completedAt?: Date;
  expiresAt?: Date;
  questions: IInterviewQuestion[];
  responses: IInterviewResponse[];
  eyeTrackingEvents: IEyeTrackingEvent[];
  analysis?: IInterviewAnalysis;
  totalDuration?: number; // in seconds
  videoRecordingUrl?: string;
  notes?: string; // Recruiter notes
  feedback?: string; // Post-interview feedback
  viewedByRecruiter: boolean;
  viewedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InterviewQuestionSchema = new Schema<IInterviewQuestion>(
  {
    question: { type: String, required: true },
    category: {
      type: String,
      enum: ["technical", "behavioral", "situational", "general"],
      required: true,
    },
    expectedTopics: [{ type: String }],
    order: { type: Number, required: true },
  },
  { _id: false }
);

const InterviewResponseSchema = new Schema<IInterviewResponse>(
  {
    questionId: { type: Number, required: true },
    question: { type: String, required: true },
    response: { type: String },
    startTime: { type: Date },
    endTime: { type: Date },
    duration: { type: Number },
    confidence: { type: Number, min: 0, max: 100 },
    relevance: { type: Number, min: 0, max: 100 },
    audioUrl: { type: String },
    videoUrl: { type: String },
  },
  { _id: false }
);

const EyeTrackingEventSchema = new Schema<IEyeTrackingEvent>(
  {
    timestamp: { type: Date, required: true },
    type: {
      type: String,
      enum: ["look_away", "multiple_faces", "reading_detected", "face_not_visible", "normal"],
      required: true,
    },
    duration: { type: Number },
    details: { type: String },
  },
  { _id: false }
);

const InterviewAnalysisSchema = new Schema<IInterviewAnalysis>(
  {
    overallScore: { type: Number, min: 0, max: 100 },
    technicalScore: { type: Number, min: 0, max: 100 },
    communicationScore: { type: Number, min: 0, max: 100 },
    behavioralScore: { type: Number, min: 0, max: 100 },
    strengths: [{ type: String }],
    weaknesses: [{ type: String }],
    recommendations: [{ type: String }],
    keyInsights: [{ type: String }],
    cheatingRiskLevel: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "low",
    },
    cheatingIndicators: [{ type: String }],
  },
  { _id: false }
);

const AIInterviewSchema = new Schema<IAIInterview>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    talentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    jobDescriptionId: {
      type: Schema.Types.ObjectId,
      ref: "JobDescription",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "scheduled", "in_progress", "completed", "cancelled", "expired"],
      default: "pending",
    },
    scheduledAt: { type: Date },
    startedAt: { type: Date },
    completedAt: { type: Date },
    expiresAt: { type: Date },
    questions: [InterviewQuestionSchema],
    responses: [InterviewResponseSchema],
    eyeTrackingEvents: [EyeTrackingEventSchema],
    analysis: InterviewAnalysisSchema,
    totalDuration: { type: Number },
    videoRecordingUrl: { type: String },
    notes: { type: String },
    feedback: { type: String },
    viewedByRecruiter: { type: Boolean, default: false },
    viewedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Indexes
AIInterviewSchema.index({ companyId: 1, status: 1 });
AIInterviewSchema.index({ talentId: 1, status: 1 });
AIInterviewSchema.index({ status: 1, createdAt: -1 });
AIInterviewSchema.index({ jobDescriptionId: 1 });

// Set expiration date on creation if not set
AIInterviewSchema.pre("save", function (next) {
  if (this.isNew && !this.expiresAt) {
    // Default expiration: 7 days from creation
    this.expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  }
  next();
});

const AIInterview: Model<IAIInterview> =
  mongoose.models.AIInterview ||
  mongoose.model<IAIInterview>("AIInterview", AIInterviewSchema);

export default AIInterview;
