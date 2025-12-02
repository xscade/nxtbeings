import mongoose, { Schema, Document, Model } from "mongoose";

export type UserRole = "company" | "talent";

export interface ICompanyProfile {
  companyName?: string;
  website?: string;
  size?: string;
  industry?: string;
  hiringNeeds?: string[];
  description?: string;
}

export interface ITalentProfile {
  title?: string;
  skills?: string[];
  experience?: string;
  portfolio?: string;
  bio?: string;
  hourlyRate?: number;
  availability?: string;
  verified?: boolean;
}

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
  password?: string;
  name: string;
  image?: string;
  role: UserRole;
  emailVerified?: Date;
  onboardingCompleted: boolean;
  companyProfile?: ICompanyProfile;
  talentProfile?: ITalentProfile;
  createdAt: Date;
  updatedAt: Date;
}

const CompanyProfileSchema = new Schema<ICompanyProfile>(
  {
    companyName: { type: String },
    website: { type: String },
    size: { type: String },
    industry: { type: String },
    hiringNeeds: [{ type: String }],
    description: { type: String },
  },
  { _id: false }
);

const TalentProfileSchema = new Schema<ITalentProfile>(
  {
    title: { type: String },
    skills: [{ type: String }],
    experience: { type: String },
    portfolio: { type: String },
    bio: { type: String },
    hourlyRate: { type: Number },
    availability: { type: String },
    verified: { type: Boolean, default: false },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      select: false, // Don't include password by default in queries
    },
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    image: {
      type: String,
    },
    role: {
      type: String,
      enum: ["company", "talent"],
      required: [true, "Role is required"],
    },
    emailVerified: {
      type: Date,
    },
    onboardingCompleted: {
      type: Boolean,
      default: false,
    },
    companyProfile: {
      type: CompanyProfileSchema,
    },
    talentProfile: {
      type: TalentProfileSchema,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

// Prevent model recompilation in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

