import mongoose, { Schema, Document, Model } from "mongoose";

export type PortfolioItemType = "link" | "project" | "file";
export type LinkType = "github" | "linkedin" | "website" | "twitter" | "dribbble" | "behance" | "youtube" | "other";
export type FileType = "video" | "pdf" | "image" | "document" | "other";

export interface IPortfolioLink {
  _id?: mongoose.Types.ObjectId;
  type: LinkType;
  url: string;
  title?: string;
}

export interface IPortfolioProject {
  _id?: mongoose.Types.ObjectId;
  title: string;
  description?: string;
  techStack?: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export interface IPortfolioFile {
  _id?: mongoose.Types.ObjectId;
  fileType: FileType;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  mimeType?: string;
  thumbnail?: string;
  description?: string;
}

export interface IPortfolio extends Document {
  _id: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  links: IPortfolioLink[];
  projects: IPortfolioProject[];
  files: IPortfolioFile[];
  headline?: string;
  summary?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PortfolioLinkSchema = new Schema<IPortfolioLink>(
  {
    type: {
      type: String,
      enum: ["github", "linkedin", "website", "twitter", "dribbble", "behance", "youtube", "other"],
      required: true,
    },
    url: { type: String, required: true },
    title: { type: String },
  },
  { _id: true }
);

const PortfolioProjectSchema = new Schema<IPortfolioProject>(
  {
    title: { type: String, required: true },
    description: { type: String },
    techStack: [{ type: String }],
    repoUrl: { type: String },
    liveUrl: { type: String },
    imageUrl: { type: String },
    featured: { type: Boolean, default: false },
  },
  { _id: true }
);

const PortfolioFileSchema = new Schema<IPortfolioFile>(
  {
    fileType: {
      type: String,
      enum: ["video", "pdf", "image", "document", "other"],
      required: true,
    },
    fileName: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileSize: { type: Number },
    mimeType: { type: String },
    thumbnail: { type: String },
    description: { type: String },
  },
  { _id: true }
);

const PortfolioSchema = new Schema<IPortfolio>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    links: [PortfolioLinkSchema],
    projects: [PortfolioProjectSchema],
    files: [PortfolioFileSchema],
    headline: { type: String, maxlength: 200 },
    summary: { type: String, maxlength: 2000 },
  },
  {
    timestamps: true,
  }
);

// Index for quick lookup by user
PortfolioSchema.index({ userId: 1 });

const Portfolio: Model<IPortfolio> =
  mongoose.models.Portfolio || mongoose.model<IPortfolio>("Portfolio", PortfolioSchema);

export default Portfolio;

