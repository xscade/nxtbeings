import mongoose, { Schema, Document, Model } from "mongoose";

export type ShortlistStatus = 
  | "shortlisted" 
  | "contacted" 
  | "interviewing" 
  | "hired" 
  | "rejected";

export interface IShortlist extends Document {
  _id: mongoose.Types.ObjectId;
  companyId: mongoose.Types.ObjectId;
  talentId: mongoose.Types.ObjectId;
  status: ShortlistStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ShortlistSchema = new Schema<IShortlist>(
  {
    companyId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    talentId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["shortlisted", "contacted", "interviewing", "hired", "rejected"],
      default: "shortlisted",
    },
    notes: {
      type: String,
      maxlength: 1000,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to ensure a company can only shortlist a talent once
ShortlistSchema.index({ companyId: 1, talentId: 1 }, { unique: true });

// Index for quick lookups
ShortlistSchema.index({ companyId: 1, status: 1 });
ShortlistSchema.index({ talentId: 1 });

const Shortlist: Model<IShortlist> =
  mongoose.models.Shortlist || mongoose.model<IShortlist>("Shortlist", ShortlistSchema);

export default Shortlist;

