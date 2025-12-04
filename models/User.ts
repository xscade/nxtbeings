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

export interface ISkill {
  name: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  years?: number;
}

export interface ILanguage {
  name: string;
  level: "Basic" | "Conversational" | "Fluent" | "Native";
}

export interface IWorkExperience {
  title: string;
  company: string;
  location?: string;
  period: string; // e.g., "2020 - 2023"
  description?: string;
  current?: boolean;
}

export interface IEducation {
  degree: string;
  school: string;
  year?: string;
  fieldOfStudy?: string;
}

export interface ICertification {
  name: string;
  issuer: string;
  year?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface ITalentProfile {
  // Basic Info
  title?: string;
  tagline?: string;
  bio?: string;
  image?: string;
  
  // Location & Availability
  location?: string;
  timezone?: string;
  available?: boolean;
  availableFrom?: string; // e.g., "Immediately", "2 weeks notice"
  weeklyAvailability?: string; // e.g., "30+ hrs/week"
  
  // Skills & Expertise
  skills?: ISkill[];
  languages?: ILanguage[];
  
  // Experience & Education
  experience?: IWorkExperience[];
  education?: IEducation[];
  certifications?: ICertification[];
  
  // Rates & Stats
  hourlyRate?: number;
  rating?: number;
  totalReviews?: number;
  jobsCompleted?: number;
  successRate?: number;
  responseTime?: string; // e.g., "< 2 hours"
  
  // Performance Stats
  stats?: {
    onTimeDelivery?: number;
    onBudget?: number;
    repeatClients?: number;
  };
  
  // Verification
  verified?: boolean;
  
  // Legacy fields (for backward compatibility)
  availability?: string;
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

const SkillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced", "Expert"],
      required: true,
    },
    years: { type: Number },
  },
  { _id: false }
);

const LanguageSchema = new Schema<ILanguage>(
  {
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ["Basic", "Conversational", "Fluent", "Native"],
      required: true,
    },
  },
  { _id: false }
);

const WorkExperienceSchema = new Schema<IWorkExperience>(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String },
    period: { type: String, required: true },
    description: { type: String },
    current: { type: Boolean, default: false },
  },
  { _id: false }
);

const EducationSchema = new Schema<IEducation>(
  {
    degree: { type: String, required: true },
    school: { type: String, required: true },
    year: { type: String },
    fieldOfStudy: { type: String },
  },
  { _id: false }
);

const CertificationSchema = new Schema<ICertification>(
  {
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    year: { type: String },
    credentialId: { type: String },
    credentialUrl: { type: String },
  },
  { _id: false }
);

const TalentProfileStatsSchema = new Schema(
  {
    onTimeDelivery: { type: Number },
    onBudget: { type: Number },
    repeatClients: { type: Number },
  },
  { _id: false }
);

const TalentProfileSchema = new Schema<ITalentProfile>(
  {
    // Basic Info
    title: { type: String },
    tagline: { type: String },
    bio: { type: String },
    image: { type: String },
    
    // Location & Availability
    location: { type: String },
    timezone: { type: String },
    available: { type: Boolean, default: false },
    availableFrom: { type: String },
    weeklyAvailability: { type: String },
    
    // Skills & Expertise
    skills: [SkillSchema],
    languages: [LanguageSchema],
    
    // Experience & Education
    experience: [WorkExperienceSchema],
    education: [EducationSchema],
    certifications: [CertificationSchema],
    
    // Rates & Stats
    hourlyRate: { type: Number },
    rating: { type: Number },
    totalReviews: { type: Number, default: 0 },
    jobsCompleted: { type: Number, default: 0 },
    successRate: { type: Number },
    responseTime: { type: String },
    
    // Performance Stats
    stats: TalentProfileStatsSchema,
    
    // Verification
    verified: { type: Boolean, default: false },
    
    // Legacy fields
    availability: { type: String },
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

// Indexes (email index already created by unique: true)
UserSchema.index({ role: 1 });

// Prevent model recompilation in development
const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;

