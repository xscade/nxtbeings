import mongoose, { Schema, Document, Model } from "mongoose";

export interface IJobDescriptionContent {
  type: "heading" | "paragraph" | "bulletList" | "numberedList" | "divider" | "callout";
  content: string;
  level?: number; // For headings (1-3)
  items?: string[]; // For lists
  calloutType?: "info" | "warning" | "success"; // For callouts
}

export interface IJobDescription extends Document {
  _id: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  title: string;
  content: IJobDescriptionContent[];
  rawContent?: string; // Plain text version for searching
  status: "draft" | "published" | "archived";
  department?: string;
  location?: string;
  employmentType?: "full-time" | "part-time" | "contract" | "freelance";
  experienceLevel?: "entry" | "mid" | "senior" | "lead" | "executive";
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  skills?: string[];
  benefits?: string[];
  thumbnail?: string; // Auto-generated color or icon
  viewCount: number;
  lastOpenedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobDescriptionContentSchema = new Schema<IJobDescriptionContent>(
  {
    type: {
      type: String,
      enum: ["heading", "paragraph", "bulletList", "numberedList", "divider", "callout"],
      required: true,
    },
    content: { type: String, default: "" },
    level: { type: Number, min: 1, max: 3 },
    items: [{ type: String }],
    calloutType: {
      type: String,
      enum: ["info", "warning", "success"],
    },
  },
  { _id: false }
);

const SalaryRangeSchema = new Schema(
  {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: "USD" },
  },
  { _id: false }
);

const JobDescriptionSchema = new Schema<IJobDescription>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    content: [JobDescriptionContentSchema],
    rawContent: { type: String },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
    department: { type: String, trim: true },
    location: { type: String, trim: true },
    employmentType: {
      type: String,
      enum: ["full-time", "part-time", "contract", "freelance"],
    },
    experienceLevel: {
      type: String,
      enum: ["entry", "mid", "senior", "lead", "executive"],
    },
    salaryRange: SalaryRangeSchema,
    skills: [{ type: String }],
    benefits: [{ type: String }],
    thumbnail: { type: String },
    viewCount: { type: Number, default: 0 },
    lastOpenedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Indexes
JobDescriptionSchema.index({ companyId: 1, status: 1 });
JobDescriptionSchema.index({ companyId: 1, updatedAt: -1 });
JobDescriptionSchema.index({ title: "text", rawContent: "text" });

// Generate raw content before saving for search
JobDescriptionSchema.pre("save", function () {
  if (this.content && Array.isArray(this.content)) {
    const textParts: string[] = [];
    this.content.forEach((block) => {
      if (block.content) textParts.push(block.content);
      if (block.items) textParts.push(...block.items);
    });
    this.rawContent = textParts.join(" ");
  }
});

const JobDescription: Model<IJobDescription> =
  mongoose.models.JobDescription ||
  mongoose.model<IJobDescription>("JobDescription", JobDescriptionSchema);

export default JobDescription;
