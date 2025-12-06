import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

// MongoDB connection string from environment
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// User Schema (matching your existing model)
const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ["Beginner", "Intermediate", "Advanced", "Expert"], required: true },
  years: { type: Number },
}, { _id: false });

const LanguageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, enum: ["Basic", "Conversational", "Fluent", "Native"], required: true },
}, { _id: false });

const WorkExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  period: { type: String, required: true },
  description: { type: String },
  current: { type: Boolean, default: false },
}, { _id: false });

const EducationSchema = new mongoose.Schema({
  degree: { type: String, required: true },
  school: { type: String, required: true },
  year: { type: String },
  fieldOfStudy: { type: String },
}, { _id: false });

const CertificationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  issuer: { type: String, required: true },
  year: { type: String },
  credentialId: { type: String },
  credentialUrl: { type: String },
}, { _id: false });

const TalentProfileStatsSchema = new mongoose.Schema({
  onTimeDelivery: { type: Number },
  onBudget: { type: Number },
  repeatClients: { type: Number },
}, { _id: false });

const TalentProfileSchema = new mongoose.Schema({
  title: { type: String },
  tagline: { type: String },
  bio: { type: String },
  image: { type: String },
  location: { type: String },
  timezone: { type: String },
  available: { type: Boolean, default: false },
  availableFrom: { type: String },
  weeklyAvailability: { type: String },
  skills: [SkillSchema],
  languages: [LanguageSchema],
  experience: [WorkExperienceSchema],
  education: [EducationSchema],
  certifications: [CertificationSchema],
  hourlyRate: { type: Number },
  rating: { type: Number },
  totalReviews: { type: Number, default: 0 },
  jobsCompleted: { type: Number, default: 0 },
  successRate: { type: Number },
  responseTime: { type: String },
  stats: TalentProfileStatsSchema,
  verified: { type: Boolean, default: false },
  availability: { type: String },
}, { _id: false });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, select: false },
  name: { type: String, required: true, trim: true },
  image: { type: String },
  role: { type: String, enum: ["company", "talent"], required: true },
  emailVerified: { type: Date },
  onboardingCompleted: { type: Boolean, default: false },
  companyProfile: { type: Object },
  talentProfile: TalentProfileSchema,
  notifications: { type: Object },
  privacy: { type: Object },
}, { timestamps: true });

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Mock talent data
const mockTalents = [
  {
    name: "Sarah Chen",
    email: "sarah.chen@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Senior AI/ML Engineer",
      tagline: "Building intelligent systems that scale",
      bio: "Ex-Google AI engineer with 8+ years experience building production ML systems. I specialize in Large Language Models (LLMs), Retrieval-Augmented Generation (RAG) systems, and end-to-end AI product development. I've led teams that shipped AI features used by millions of users.\n\nMy approach combines deep technical expertise with a strong product mindset. I believe in building AI systems that are not just technically impressive but genuinely useful for end users.",
      location: "San Francisco, USA",
      timezone: "PST (UTC-8)",
      available: true,
      availableFrom: "Immediately",
      weeklyAvailability: "30+ hrs/week",
      hourlyRate: 150,
      rating: 4.9,
      totalReviews: 47,
      jobsCompleted: 52,
      successRate: 98,
      responseTime: "< 2 hours",
      verified: true,
      skills: [
        { name: "Machine Learning", level: "Expert", years: 8 },
        { name: "Python", level: "Expert", years: 10 },
        { name: "TensorFlow", level: "Expert", years: 6 },
        { name: "PyTorch", level: "Advanced", years: 4 },
        { name: "LLMs/GPT", level: "Expert", years: 3 },
        { name: "RAG Systems", level: "Expert", years: 2 },
        { name: "Computer Vision", level: "Advanced", years: 5 },
        { name: "AWS", level: "Advanced", years: 6 },
      ],
      languages: [
        { name: "English", level: "Native" },
        { name: "Mandarin", level: "Native" },
      ],
      experience: [
        {
          title: "Senior AI Engineer",
          company: "Google",
          location: "Mountain View, CA",
          period: "2019 - 2023",
          description: "Led development of ML features for Google Search, improving relevance by 15%. Built and deployed LLM-based systems serving 100M+ daily queries.",
          current: false,
        },
        {
          title: "Machine Learning Engineer",
          company: "OpenAI",
          location: "San Francisco, CA",
          period: "2023 - Present",
          description: "Working on next-generation language models and their applications. Focus on improving model efficiency and safety.",
          current: true,
        },
      ],
      education: [
        { degree: "Ph.D. in Computer Science", school: "Stanford University", year: "2019", fieldOfStudy: "Machine Learning" },
        { degree: "B.S. in Computer Science", school: "MIT", year: "2015", fieldOfStudy: "Artificial Intelligence" },
      ],
      certifications: [
        { name: "Google Cloud Professional ML Engineer", issuer: "Google Cloud", year: "2022" },
        { name: "Deep Learning Specialization", issuer: "Coursera / deeplearning.ai", year: "2020" },
      ],
      stats: {
        onTimeDelivery: 100,
        onBudget: 98,
        repeatClients: 75,
      },
    },
  },
  {
    name: "Marcus Johnson",
    email: "marcus.johnson@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Full Stack Developer",
      tagline: "Crafting scalable web applications",
      bio: "I'm a full-stack developer with 6+ years of experience building scalable web applications. My expertise spans the entire development lifecycle, from architecture design to deployment and maintenance.\n\nI've worked with startups and Fortune 500 companies, delivering solutions that handle millions of users. I'm passionate about clean code, performance optimization, and creating exceptional user experiences.",
      location: "London, UK",
      timezone: "GMT (UTC+0)",
      available: true,
      availableFrom: "2 weeks notice",
      weeklyAvailability: "40 hrs/week",
      hourlyRate: 120,
      rating: 4.8,
      totalReviews: 63,
      jobsCompleted: 71,
      successRate: 96,
      responseTime: "< 4 hours",
      verified: true,
      skills: [
        { name: "React", level: "Expert", years: 6 },
        { name: "Node.js", level: "Expert", years: 6 },
        { name: "TypeScript", level: "Expert", years: 5 },
        { name: "Next.js", level: "Expert", years: 4 },
        { name: "PostgreSQL", level: "Advanced", years: 5 },
        { name: "MongoDB", level: "Advanced", years: 4 },
        { name: "AWS", level: "Advanced", years: 5 },
        { name: "Docker", level: "Advanced", years: 4 },
      ],
      languages: [
        { name: "English", level: "Native" },
        { name: "French", level: "Conversational" },
      ],
      experience: [
        {
          title: "Senior Full Stack Developer",
          company: "Stripe",
          location: "London, UK",
          period: "2021 - Present",
          description: "Building payment infrastructure used by millions of businesses. Led migration to Next.js, improving page load times by 40%.",
          current: true,
        },
        {
          title: "Full Stack Developer",
          company: "Deliveroo",
          location: "London, UK",
          period: "2018 - 2021",
          description: "Developed real-time order tracking system and restaurant dashboard. Handled 50k+ concurrent users during peak hours.",
          current: false,
        },
      ],
      education: [
        { degree: "M.Sc. in Computer Science", school: "Imperial College London", year: "2018", fieldOfStudy: "Software Engineering" },
        { degree: "B.Sc. in Computer Science", school: "University of Manchester", year: "2016" },
      ],
      certifications: [
        { name: "AWS Solutions Architect", issuer: "Amazon Web Services", year: "2021" },
        { name: "MongoDB Developer", issuer: "MongoDB University", year: "2020" },
      ],
      stats: {
        onTimeDelivery: 98,
        onBudget: 95,
        repeatClients: 60,
      },
    },
  },
  {
    name: "Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Product Designer",
      tagline: "Creating intuitive experiences that users love",
      bio: "Award-winning product designer with a passion for creating intuitive, beautiful experiences. I've worked at top design agencies and tech companies, leading design for products used by millions.\n\nMy approach combines deep user research with systematic design thinking. I believe great design is invisible - it just works. I specialize in design systems, user research, and turning complex problems into simple solutions.",
      location: "New York, USA",
      timezone: "EST (UTC-5)",
      available: true,
      availableFrom: "Immediately",
      weeklyAvailability: "30+ hrs/week",
      hourlyRate: 130,
      rating: 5.0,
      totalReviews: 38,
      jobsCompleted: 42,
      successRate: 100,
      responseTime: "< 3 hours",
      verified: true,
      skills: [
        { name: "UI/UX Design", level: "Expert", years: 8 },
        { name: "Figma", level: "Expert", years: 6 },
        { name: "Design Systems", level: "Expert", years: 5 },
        { name: "User Research", level: "Expert", years: 7 },
        { name: "Prototyping", level: "Expert", years: 8 },
        { name: "Framer", level: "Advanced", years: 3 },
        { name: "Adobe Creative Suite", level: "Advanced", years: 10 },
        { name: "HTML/CSS", level: "Intermediate", years: 5 },
      ],
      languages: [
        { name: "English", level: "Native" },
        { name: "Spanish", level: "Fluent" },
      ],
      experience: [
        {
          title: "Senior Product Designer",
          company: "IDEO",
          location: "New York, NY",
          period: "2020 - Present",
          description: "Leading design for Fortune 500 clients across healthcare, finance, and retail. Won 3 design awards for innovative healthcare app.",
          current: true,
        },
        {
          title: "Product Designer",
          company: "Airbnb",
          location: "San Francisco, CA",
          period: "2017 - 2020",
          description: "Redesigned host onboarding experience, increasing completion rates by 35%. Built and maintained Airbnb's design system.",
          current: false,
        },
      ],
      education: [
        { degree: "M.F.A. in Interaction Design", school: "School of Visual Arts", year: "2017", fieldOfStudy: "Interaction Design" },
        { degree: "B.A. in Graphic Design", school: "Rhode Island School of Design", year: "2015" },
      ],
      certifications: [
        { name: "Google UX Design Certificate", issuer: "Google", year: "2021" },
        { name: "Certified Usability Analyst", issuer: "Human Factors International", year: "2019" },
      ],
      stats: {
        onTimeDelivery: 100,
        onBudget: 100,
        repeatClients: 80,
      },
    },
  },
  {
    name: "David Kim",
    email: "david.kim@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Data Scientist",
      tagline: "Turning data into actionable insights",
      bio: "Data scientist with expertise in predictive modeling, statistical analysis, and business intelligence. I help companies make data-driven decisions that drive growth and efficiency.\n\nI've worked across industries including e-commerce, fintech, and healthcare, building ML models that have generated millions in revenue. I'm passionate about communicating complex findings in ways that stakeholders can understand and act upon.",
      location: "Seoul, South Korea",
      timezone: "KST (UTC+9)",
      available: true,
      availableFrom: "1 week notice",
      weeklyAvailability: "40 hrs/week",
      hourlyRate: 110,
      rating: 4.9,
      totalReviews: 52,
      jobsCompleted: 58,
      successRate: 97,
      responseTime: "< 6 hours",
      verified: true,
      skills: [
        { name: "Python", level: "Expert", years: 7 },
        { name: "SQL", level: "Expert", years: 8 },
        { name: "Machine Learning", level: "Expert", years: 5 },
        { name: "Data Visualization", level: "Expert", years: 6 },
        { name: "Pandas/NumPy", level: "Expert", years: 7 },
        { name: "Tableau", level: "Advanced", years: 4 },
        { name: "A/B Testing", level: "Expert", years: 5 },
        { name: "Statistical Analysis", level: "Expert", years: 6 },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Korean", level: "Native" },
        { name: "Japanese", level: "Conversational" },
      ],
      experience: [
        {
          title: "Senior Data Scientist",
          company: "Coupang",
          location: "Seoul, South Korea",
          period: "2021 - Present",
          description: "Building recommendation systems that drive 30% of platform revenue. Lead team of 5 data scientists working on personalization.",
          current: true,
        },
        {
          title: "Data Scientist",
          company: "Samsung Electronics",
          location: "Seoul, South Korea",
          period: "2018 - 2021",
          description: "Developed predictive maintenance models for manufacturing, reducing downtime by 25%. Built dashboards for executive decision-making.",
          current: false,
        },
      ],
      education: [
        { degree: "M.S. in Statistics", school: "Seoul National University", year: "2018", fieldOfStudy: "Applied Statistics" },
        { degree: "B.S. in Mathematics", school: "KAIST", year: "2016" },
      ],
      certifications: [
        { name: "Google Data Analytics Professional", issuer: "Google", year: "2022" },
        { name: "AWS Machine Learning Specialty", issuer: "Amazon Web Services", year: "2021" },
      ],
      stats: {
        onTimeDelivery: 97,
        onBudget: 96,
        repeatClients: 65,
      },
    },
  },
  {
    name: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Growth Marketing Lead",
      tagline: "Scaling startups through data-driven marketing",
      bio: "Growth marketing expert who has helped 20+ startups achieve 10x growth. I specialize in B2B SaaS marketing, content-led growth strategies, and performance marketing optimization.\n\nMy approach is deeply analytical - I believe every marketing decision should be backed by data. I've managed budgets from $10k to $1M+ monthly, consistently delivering positive ROI.",
      location: "Austin, USA",
      timezone: "CST (UTC-6)",
      available: true,
      availableFrom: "Immediately",
      weeklyAvailability: "20-30 hrs/week",
      hourlyRate: 95,
      rating: 4.7,
      totalReviews: 29,
      jobsCompleted: 34,
      successRate: 94,
      responseTime: "< 4 hours",
      verified: true,
      skills: [
        { name: "SEO", level: "Expert", years: 6 },
        { name: "Content Marketing", level: "Expert", years: 7 },
        { name: "Paid Acquisition", level: "Expert", years: 5 },
        { name: "Google Analytics", level: "Expert", years: 7 },
        { name: "HubSpot", level: "Advanced", years: 4 },
        { name: "Email Marketing", level: "Expert", years: 6 },
        { name: "Conversion Optimization", level: "Advanced", years: 4 },
        { name: "Marketing Automation", level: "Advanced", years: 4 },
      ],
      languages: [
        { name: "English", level: "Native" },
      ],
      experience: [
        {
          title: "VP of Marketing",
          company: "TechStartup (YC W21)",
          location: "Austin, TX",
          period: "2021 - Present",
          description: "Grew ARR from $500k to $5M in 18 months. Built marketing team from 0 to 8 people. Launched content program generating 100k monthly visitors.",
          current: true,
        },
        {
          title: "Growth Marketing Manager",
          company: "HubSpot",
          location: "Boston, MA",
          period: "2018 - 2021",
          description: "Managed $2M annual ad budget with 4x ROAS. Launched successful podcast with 50k monthly listeners. Led SEO strategy increasing organic traffic by 200%.",
          current: false,
        },
      ],
      education: [
        { degree: "MBA", school: "University of Texas at Austin", year: "2018", fieldOfStudy: "Marketing" },
        { degree: "B.A. in Communications", school: "Boston University", year: "2014" },
      ],
      certifications: [
        { name: "Google Ads Certification", issuer: "Google", year: "2023" },
        { name: "HubSpot Inbound Marketing", issuer: "HubSpot", year: "2021" },
      ],
      stats: {
        onTimeDelivery: 95,
        onBudget: 92,
        repeatClients: 55,
      },
    },
  },
  {
    name: "James Wright",
    email: "james.wright@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "DevOps Engineer",
      tagline: "Building reliable infrastructure at scale",
      bio: "Infrastructure architect with experience building and managing systems that serve millions of users. I specialize in Kubernetes, CI/CD pipelines, and cloud-native architectures.\n\nI've helped companies reduce infrastructure costs by 50% while improving reliability. I believe in infrastructure as code, automated everything, and building systems that engineers love to work with.",
      location: "Toronto, Canada",
      timezone: "EST (UTC-5)",
      available: true,
      availableFrom: "1 month notice",
      weeklyAvailability: "40 hrs/week",
      hourlyRate: 140,
      rating: 4.8,
      totalReviews: 41,
      jobsCompleted: 45,
      successRate: 98,
      responseTime: "< 2 hours",
      verified: true,
      skills: [
        { name: "Kubernetes", level: "Expert", years: 6 },
        { name: "Docker", level: "Expert", years: 7 },
        { name: "Terraform", level: "Expert", years: 5 },
        { name: "AWS", level: "Expert", years: 8 },
        { name: "CI/CD", level: "Expert", years: 7 },
        { name: "Python", level: "Advanced", years: 5 },
        { name: "Linux", level: "Expert", years: 10 },
        { name: "Prometheus/Grafana", level: "Advanced", years: 4 },
      ],
      languages: [
        { name: "English", level: "Native" },
      ],
      experience: [
        {
          title: "Principal DevOps Engineer",
          company: "Shopify",
          location: "Toronto, Canada",
          period: "2020 - Present",
          description: "Leading infrastructure for Black Friday/Cyber Monday, handling 10M+ requests/minute. Reduced deployment time from 30 min to 3 min.",
          current: true,
        },
        {
          title: "Senior DevOps Engineer",
          company: "Netflix",
          location: "Los Gatos, CA",
          period: "2017 - 2020",
          description: "Built and maintained streaming infrastructure serving 200M+ subscribers. Pioneered chaos engineering practices for improved resilience.",
          current: false,
        },
      ],
      education: [
        { degree: "B.Sc. in Computer Engineering", school: "University of Waterloo", year: "2017" },
      ],
      certifications: [
        { name: "Certified Kubernetes Administrator", issuer: "CNCF", year: "2022" },
        { name: "AWS Solutions Architect Professional", issuer: "Amazon Web Services", year: "2021" },
        { name: "HashiCorp Terraform Associate", issuer: "HashiCorp", year: "2021" },
      ],
      stats: {
        onTimeDelivery: 99,
        onBudget: 97,
        repeatClients: 70,
      },
    },
  },
  {
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Mobile App Developer",
      tagline: "Building beautiful, performant mobile experiences",
      bio: "Mobile developer specializing in React Native and native iOS/Android development. I've built apps with millions of downloads and 4.8+ star ratings.\n\nI focus on performance, accessibility, and delightful user experiences. Whether you need a cross-platform solution or native apps, I can help bring your vision to life.",
      location: "Bangalore, India",
      timezone: "IST (UTC+5:30)",
      available: true,
      availableFrom: "Immediately",
      weeklyAvailability: "40 hrs/week",
      hourlyRate: 85,
      rating: 4.9,
      totalReviews: 67,
      jobsCompleted: 73,
      successRate: 97,
      responseTime: "< 3 hours",
      verified: true,
      skills: [
        { name: "React Native", level: "Expert", years: 5 },
        { name: "iOS (Swift)", level: "Advanced", years: 4 },
        { name: "Android (Kotlin)", level: "Advanced", years: 4 },
        { name: "TypeScript", level: "Expert", years: 5 },
        { name: "Firebase", level: "Expert", years: 5 },
        { name: "Redux", level: "Expert", years: 5 },
        { name: "GraphQL", level: "Advanced", years: 3 },
        { name: "App Store Optimization", level: "Advanced", years: 4 },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "Hindi", level: "Native" },
        { name: "Tamil", level: "Conversational" },
      ],
      experience: [
        {
          title: "Lead Mobile Developer",
          company: "Swiggy",
          location: "Bangalore, India",
          period: "2020 - Present",
          description: "Leading mobile team of 8 developers. Rebuilt delivery partner app in React Native, improving performance by 60% and reducing crash rate to 0.1%.",
          current: true,
        },
        {
          title: "Senior Mobile Developer",
          company: "Flipkart",
          location: "Bangalore, India",
          period: "2018 - 2020",
          description: "Developed features for India's largest e-commerce app. Built real-time order tracking and AR-based product visualization.",
          current: false,
        },
      ],
      education: [
        { degree: "B.Tech in Computer Science", school: "IIT Delhi", year: "2018" },
      ],
      certifications: [
        { name: "Google Associate Android Developer", issuer: "Google", year: "2020" },
        { name: "React Native Specialist", issuer: "Meta", year: "2022" },
      ],
      stats: {
        onTimeDelivery: 98,
        onBudget: 96,
        repeatClients: 72,
      },
    },
  },
  {
    name: "Alex Mueller",
    email: "alex.mueller@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Blockchain Developer",
      tagline: "Building decentralized applications for Web3",
      bio: "Blockchain developer with deep expertise in Ethereum, Solana, and DeFi protocols. I've built smart contracts handling billions in TVL and helped launch successful NFT projects.\n\nI prioritize security above all else - every line of code I write is designed to protect users' assets. I stay current with the rapidly evolving Web3 landscape and can help navigate technical and strategic decisions.",
      location: "Berlin, Germany",
      timezone: "CET (UTC+1)",
      available: true,
      availableFrom: "2 weeks notice",
      weeklyAvailability: "30+ hrs/week",
      hourlyRate: 175,
      rating: 4.8,
      totalReviews: 28,
      jobsCompleted: 31,
      successRate: 96,
      responseTime: "< 4 hours",
      verified: true,
      skills: [
        { name: "Solidity", level: "Expert", years: 5 },
        { name: "Ethereum", level: "Expert", years: 5 },
        { name: "Smart Contracts", level: "Expert", years: 5 },
        { name: "Web3.js/Ethers.js", level: "Expert", years: 4 },
        { name: "Rust", level: "Advanced", years: 3 },
        { name: "Solana", level: "Advanced", years: 2 },
        { name: "DeFi Protocols", level: "Expert", years: 4 },
        { name: "Security Auditing", level: "Advanced", years: 3 },
      ],
      languages: [
        { name: "English", level: "Fluent" },
        { name: "German", level: "Native" },
      ],
      experience: [
        {
          title: "Lead Blockchain Developer",
          company: "Aave",
          location: "Remote",
          period: "2021 - Present",
          description: "Core contributor to Aave V3. Built governance systems and cross-chain bridges. Conducted security reviews for protocol upgrades.",
          current: true,
        },
        {
          title: "Smart Contract Developer",
          company: "ConsenSys",
          location: "Berlin, Germany",
          period: "2019 - 2021",
          description: "Developed DeFi protocols and NFT marketplaces. Audited smart contracts for major clients. Contributed to MetaMask integration tools.",
          current: false,
        },
      ],
      education: [
        { degree: "M.Sc. in Cryptography", school: "Technical University of Berlin", year: "2019", fieldOfStudy: "Applied Cryptography" },
        { degree: "B.Sc. in Computer Science", school: "University of Munich", year: "2017" },
      ],
      certifications: [
        { name: "Certified Blockchain Developer", issuer: "Blockchain Council", year: "2021" },
        { name: "Smart Contract Security", issuer: "OpenZeppelin", year: "2022" },
      ],
      stats: {
        onTimeDelivery: 96,
        onBudget: 94,
        repeatClients: 65,
      },
    },
  },
  {
    name: "Yuki Tanaka",
    email: "yuki.tanaka@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "NLP Engineer",
      tagline: "Making machines understand human language",
      bio: "NLP specialist focused on building conversational AI and text understanding systems. I've developed chatbots serving millions of users and text classification systems with 95%+ accuracy.\n\nMy expertise spans from traditional NLP techniques to cutting-edge transformer models. I'm particularly interested in multi-lingual NLP and making AI accessible across languages.",
      location: "Tokyo, Japan",
      timezone: "JST (UTC+9)",
      available: true,
      availableFrom: "1 week notice",
      weeklyAvailability: "40 hrs/week",
      hourlyRate: 135,
      rating: 4.9,
      totalReviews: 35,
      jobsCompleted: 39,
      successRate: 97,
      responseTime: "< 5 hours",
      verified: true,
      skills: [
        { name: "NLP", level: "Expert", years: 6 },
        { name: "Python", level: "Expert", years: 8 },
        { name: "Transformers/BERT", level: "Expert", years: 4 },
        { name: "LLMs", level: "Expert", years: 3 },
        { name: "spaCy", level: "Expert", years: 5 },
        { name: "Hugging Face", level: "Expert", years: 4 },
        { name: "Conversational AI", level: "Expert", years: 5 },
        { name: "Japanese NLP", level: "Expert", years: 6 },
      ],
      languages: [
        { name: "Japanese", level: "Native" },
        { name: "English", level: "Fluent" },
      ],
      experience: [
        {
          title: "Senior NLP Engineer",
          company: "LINE Corporation",
          location: "Tokyo, Japan",
          period: "2020 - Present",
          description: "Building conversational AI for LINE messenger serving 180M+ users. Developed multi-turn dialogue systems and intent classification with 96% accuracy.",
          current: true,
        },
        {
          title: "NLP Research Engineer",
          company: "Preferred Networks",
          location: "Tokyo, Japan",
          period: "2018 - 2020",
          description: "Researched and implemented state-of-the-art NLP models. Published 3 papers at ACL and EMNLP. Built Japanese language understanding systems.",
          current: false,
        },
      ],
      education: [
        { degree: "Ph.D. in Computer Science", school: "University of Tokyo", year: "2018", fieldOfStudy: "Natural Language Processing" },
        { degree: "M.S. in Computer Science", school: "University of Tokyo", year: "2015" },
      ],
      certifications: [
        { name: "Deep Learning Specialization", issuer: "deeplearning.ai", year: "2020" },
        { name: "Natural Language Processing with Transformers", issuer: "Hugging Face", year: "2022" },
      ],
      stats: {
        onTimeDelivery: 98,
        onBudget: 97,
        repeatClients: 70,
      },
    },
  },
  {
    name: "Carlos Mendez",
    email: "carlos.mendez@example.com",
    role: "talent",
    onboardingCompleted: true,
    talentProfile: {
      title: "Backend Engineer",
      tagline: "Building robust APIs and microservices",
      bio: "Backend engineer specializing in high-performance APIs and distributed systems. I've built systems handling 1M+ requests per second and designed architectures for hyper-growth startups.\n\nI believe in writing clean, testable code and building systems that are easy to maintain and scale. I'm equally comfortable with greenfield projects and refactoring legacy systems.",
      location: "Mexico City, Mexico",
      timezone: "CST (UTC-6)",
      available: true,
      availableFrom: "Immediately",
      weeklyAvailability: "40 hrs/week",
      hourlyRate: 100,
      rating: 4.8,
      totalReviews: 55,
      jobsCompleted: 61,
      successRate: 96,
      responseTime: "< 3 hours",
      verified: true,
      skills: [
        { name: "Go", level: "Expert", years: 5 },
        { name: "Python", level: "Expert", years: 7 },
        { name: "PostgreSQL", level: "Expert", years: 8 },
        { name: "Redis", level: "Expert", years: 6 },
        { name: "gRPC", level: "Advanced", years: 4 },
        { name: "Kafka", level: "Advanced", years: 4 },
        { name: "Microservices", level: "Expert", years: 5 },
        { name: "System Design", level: "Expert", years: 6 },
      ],
      languages: [
        { name: "Spanish", level: "Native" },
        { name: "English", level: "Fluent" },
        { name: "Portuguese", level: "Conversational" },
      ],
      experience: [
        {
          title: "Staff Backend Engineer",
          company: "Mercado Libre",
          location: "Mexico City, Mexico",
          period: "2020 - Present",
          description: "Architecting payment systems processing $50M+ daily. Led migration from monolith to microservices. Reduced latency by 70% through optimization.",
          current: true,
        },
        {
          title: "Senior Backend Engineer",
          company: "Rappi",
          location: "Bogota, Colombia",
          period: "2018 - 2020",
          description: "Built real-time order management system. Designed event-driven architecture handling 100k orders/hour during peak.",
          current: false,
        },
      ],
      education: [
        { degree: "M.Sc. in Computer Science", school: "UNAM", year: "2018", fieldOfStudy: "Distributed Systems" },
        { degree: "B.Sc. in Computer Engineering", school: "Tecnológico de Monterrey", year: "2016" },
      ],
      certifications: [
        { name: "AWS Developer Associate", issuer: "Amazon Web Services", year: "2021" },
        { name: "Google Cloud Professional Developer", issuer: "Google Cloud", year: "2022" },
      ],
      stats: {
        onTimeDelivery: 97,
        onBudget: 95,
        repeatClients: 68,
      },
    },
  },
];

async function seedDatabase() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    // Hash password for all users
    const hashedPassword = await bcrypt.hash("Password123!", 10);

    console.log("\n📝 Creating talent profiles...\n");

    for (const talentData of mockTalents) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: talentData.email });
      
      if (existingUser) {
        console.log(`⏭️  Skipping ${talentData.name} (already exists)`);
        continue;
      }

      const user = new User({
        ...talentData,
        password: hashedPassword,
        emailVerified: new Date(),
        notifications: {
          newOpportunities: true,
          shortlisted: true,
          messages: true,
          profileViews: true,
          weeklyDigest: false,
        },
        privacy: {
          profileVisibility: "public",
          showEmail: false,
          showPhone: false,
          allowMessages: true,
          showAvailability: true,
          showHourlyRate: true,
        },
      });

      await user.save();
      console.log(`✅ Created: ${talentData.name} (${talentData.talentProfile.title})`);
    }

    console.log("\n🎉 Database seeding completed!");
    console.log(`📊 Total talents added: ${mockTalents.length}`);
    
  } catch (error) {
    console.error("❌ Error seeding database:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run the seed function
seedDatabase();

