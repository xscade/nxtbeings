import mongoose from "mongoose";
import { config } from "dotenv";

// Load environment variables from .env.local
config({ path: ".env.local" });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("❌ MONGODB_URI is not defined in .env.local");
  process.exit(1);
}

// Portfolio Schema
const PortfolioLinkSchema = new mongoose.Schema({
  type: { type: String, required: true },
  url: { type: String, required: true },
  title: { type: String },
}, { _id: false });

const PortfolioProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  techStack: [{ type: String }],
  imageUrl: { type: String },
  repoUrl: { type: String },
  liveUrl: { type: String },
}, { _id: false });

const PortfolioFileSchema = new mongoose.Schema({
  fileType: { type: String, required: true },
  fileName: { type: String, required: true },
  fileUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now },
}, { _id: false });

const PortfolioSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
  headline: { type: String },
  summary: { type: String },
  links: [PortfolioLinkSchema],
  projects: [PortfolioProjectSchema],
  files: [PortfolioFileSchema],
}, { timestamps: true });

const Portfolio = mongoose.models.Portfolio || mongoose.model("Portfolio", PortfolioSchema);

// User Schema (simplified for querying)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Portfolio data for each talent
const portfolioData: Record<string, {
  headline: string;
  summary: string;
  links: Array<{ type: string; url: string; title: string }>;
  projects: Array<{
    title: string;
    description: string;
    techStack: string[];
    repoUrl?: string;
    liveUrl?: string;
  }>;
}> = {
  "sarah.chen@example.com": {
    headline: "AI/ML Engineer | Building Intelligent Systems",
    summary: "I specialize in building production-ready ML systems, with particular expertise in LLMs, RAG architectures, and scalable AI infrastructure. My work has impacted millions of users at companies like Google and OpenAI.",
    links: [
      { type: "github", url: "https://github.com/sarahchen", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/sarahchen", title: "LinkedIn" },
      { type: "website", url: "https://sarahchen.ai", title: "Personal Website" },
    ],
    projects: [
      {
        title: "RAG-Enhanced Search Engine",
        description: "Built a retrieval-augmented generation system that improved search relevance by 40% for enterprise documents. Handles 10M+ documents with sub-second query times.",
        techStack: ["Python", "LangChain", "Pinecone", "OpenAI", "FastAPI"],
        repoUrl: "https://github.com/sarahchen/rag-search",
        liveUrl: "https://demo.sarahchen.ai/rag-search",
      },
      {
        title: "Real-time Object Detection API",
        description: "Production computer vision API serving 1M+ requests/day for autonomous vehicle perception. 99.9% uptime with <50ms latency.",
        techStack: ["PyTorch", "TensorRT", "CUDA", "Kubernetes", "gRPC"],
        repoUrl: "https://github.com/sarahchen/vision-api",
      },
      {
        title: "LLM Fine-tuning Framework",
        description: "Open-source framework for efficient fine-tuning of large language models using LoRA and QLoRA techniques. 5k+ GitHub stars.",
        techStack: ["PyTorch", "Transformers", "PEFT", "DeepSpeed"],
        repoUrl: "https://github.com/sarahchen/llm-finetune",
      },
    ],
  },
  "marcus.johnson@example.com": {
    headline: "Full Stack Developer | React & Node.js Expert",
    summary: "I build scalable web applications from concept to deployment. Passionate about clean architecture, performance optimization, and creating exceptional user experiences.",
    links: [
      { type: "github", url: "https://github.com/marcusjohnson", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/marcusjohnson", title: "LinkedIn" },
      { type: "twitter", url: "https://twitter.com/marcusdev", title: "Twitter" },
    ],
    projects: [
      {
        title: "E-commerce Platform",
        description: "Full-featured e-commerce platform with real-time inventory, payment processing, and analytics dashboard. Handles 50k+ concurrent users.",
        techStack: ["Next.js", "TypeScript", "PostgreSQL", "Stripe", "Redis"],
        liveUrl: "https://shopify-clone.marcusj.dev",
      },
      {
        title: "Real-time Collaboration Tool",
        description: "Notion-like collaborative workspace with real-time editing, comments, and version history. Built with CRDTs for conflict resolution.",
        techStack: ["React", "Node.js", "Socket.io", "MongoDB", "Y.js"],
        repoUrl: "https://github.com/marcusjohnson/collab-workspace",
        liveUrl: "https://collab.marcusj.dev",
      },
      {
        title: "API Gateway & Rate Limiter",
        description: "High-performance API gateway with intelligent rate limiting, caching, and request transformation. Processes 100k+ req/sec.",
        techStack: ["Go", "Redis", "Docker", "Prometheus"],
        repoUrl: "https://github.com/marcusjohnson/api-gateway",
      },
    ],
  },
  "emily.rodriguez@example.com": {
    headline: "Product Designer | Creating Intuitive Digital Experiences",
    summary: "Award-winning product designer with 8+ years crafting user-centered designs for startups and Fortune 500 companies. I believe great design is invisible—it just works.",
    links: [
      { type: "website", url: "https://emilyrodriguez.design", title: "Portfolio" },
      { type: "linkedin", url: "https://linkedin.com/in/emilyrodriguez", title: "LinkedIn" },
      { type: "dribbble", url: "https://dribbble.com/emilyrod", title: "Dribbble" },
    ],
    projects: [
      {
        title: "Healthcare App Redesign",
        description: "Complete redesign of patient portal increasing user engagement by 60% and reducing support tickets by 40%. Won UXDA Healthcare Award 2023.",
        techStack: ["Figma", "Prototyping", "User Research", "Design Systems"],
        liveUrl: "https://emilyrodriguez.design/healthcare-app",
      },
      {
        title: "Design System for Fintech",
        description: "Comprehensive design system with 200+ components, accessibility-first approach, and detailed documentation. Used across 5 products.",
        techStack: ["Figma", "Storybook", "Design Tokens", "Documentation"],
        liveUrl: "https://emilyrodriguez.design/fintech-ds",
      },
      {
        title: "Mobile Banking Experience",
        description: "Redesigned mobile banking app resulting in 4.8 App Store rating and 2M+ downloads. Focus on simplicity and security.",
        techStack: ["Figma", "Principle", "User Testing", "Motion Design"],
        liveUrl: "https://emilyrodriguez.design/mobile-banking",
      },
    ],
  },
  "david.kim@example.com": {
    headline: "Data Scientist | Turning Data into Business Value",
    summary: "I help companies make data-driven decisions through statistical analysis, machine learning, and compelling visualizations. Passionate about communicating complex findings simply.",
    links: [
      { type: "github", url: "https://github.com/davidkim", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/davidkim", title: "LinkedIn" },
      { type: "kaggle", url: "https://kaggle.com/davidkim", title: "Kaggle" },
    ],
    projects: [
      {
        title: "Customer Churn Prediction",
        description: "ML model predicting customer churn with 94% accuracy, saving $2M annually in retention efforts. Includes automated retraining pipeline.",
        techStack: ["Python", "Scikit-learn", "XGBoost", "MLflow", "Airflow"],
        repoUrl: "https://github.com/davidkim/churn-prediction",
      },
      {
        title: "Real-time Analytics Dashboard",
        description: "Executive dashboard visualizing KPIs from 20+ data sources. Reduced reporting time from days to minutes.",
        techStack: ["Python", "Tableau", "Snowflake", "dbt", "Airflow"],
        liveUrl: "https://davidkim.dev/analytics-demo",
      },
      {
        title: "Recommendation Engine",
        description: "Collaborative filtering system improving product recommendations by 35%. Serves 1M+ personalized recommendations daily.",
        techStack: ["Python", "TensorFlow", "Redis", "FastAPI"],
        repoUrl: "https://github.com/davidkim/recsys",
      },
    ],
  },
  "lisa.thompson@example.com": {
    headline: "Growth Marketing Lead | Scaling Startups",
    summary: "I've helped 20+ startups achieve 10x growth through data-driven marketing strategies. Specializing in B2B SaaS, content-led growth, and performance marketing.",
    links: [
      { type: "linkedin", url: "https://linkedin.com/in/lisathompson", title: "LinkedIn" },
      { type: "twitter", url: "https://twitter.com/lisagrowth", title: "Twitter" },
      { type: "substack", url: "https://lisathompson.substack.com", title: "Newsletter" },
    ],
    projects: [
      {
        title: "SaaS Growth Playbook",
        description: "Comprehensive marketing strategy that grew ARR from $500k to $5M in 18 months. Documented approach for replication.",
        techStack: ["HubSpot", "Google Analytics", "Mixpanel", "Amplitude"],
        liveUrl: "https://lisathompson.com/case-studies/saas-growth",
      },
      {
        title: "Content Marketing Engine",
        description: "Built content program generating 100k monthly visitors and 5k MQLs. SEO-first approach with programmatic content.",
        techStack: ["Ahrefs", "Clearscope", "WordPress", "Webflow"],
        liveUrl: "https://lisathompson.com/case-studies/content-engine",
      },
      {
        title: "Paid Acquisition Optimization",
        description: "Reduced CAC by 60% while scaling spend from $50k to $500k/month. Achieved 4x ROAS across channels.",
        techStack: ["Google Ads", "Facebook Ads", "LinkedIn Ads", "Attribution"],
        liveUrl: "https://lisathompson.com/case-studies/paid-acquisition",
      },
    ],
  },
  "james.wright@example.com": {
    headline: "DevOps Engineer | Building Reliable Infrastructure",
    summary: "Infrastructure architect specializing in Kubernetes, CI/CD, and cloud-native architectures. I build systems that engineers love to work with.",
    links: [
      { type: "github", url: "https://github.com/jameswright", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/jameswright", title: "LinkedIn" },
      { type: "blog", url: "https://jameswright.dev/blog", title: "Tech Blog" },
    ],
    projects: [
      {
        title: "Kubernetes Platform",
        description: "Self-service developer platform on Kubernetes with GitOps, automated deployments, and observability. 500+ microservices.",
        techStack: ["Kubernetes", "ArgoCD", "Terraform", "Prometheus", "Grafana"],
        repoUrl: "https://github.com/jameswright/k8s-platform",
      },
      {
        title: "CI/CD Pipeline Framework",
        description: "Reusable CI/CD templates reducing deployment time from 30 min to 3 min. 99.9% pipeline success rate.",
        techStack: ["GitHub Actions", "Docker", "Helm", "Kustomize"],
        repoUrl: "https://github.com/jameswright/cicd-templates",
      },
      {
        title: "Infrastructure Cost Optimizer",
        description: "Automated cost optimization tool that reduced cloud spend by 40% through right-sizing and spot instances.",
        techStack: ["Python", "AWS", "Terraform", "Cost Explorer API"],
        repoUrl: "https://github.com/jameswright/cloud-optimizer",
      },
    ],
  },
  "priya.sharma@example.com": {
    headline: "Mobile Developer | React Native & Native iOS/Android",
    summary: "Building beautiful, performant mobile experiences. I've shipped apps with millions of downloads and 4.8+ star ratings.",
    links: [
      { type: "github", url: "https://github.com/priyasharma", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/priyasharma", title: "LinkedIn" },
      { type: "playstore", url: "https://play.google.com/store/apps/developer?id=PriyaSharma", title: "Play Store" },
    ],
    projects: [
      {
        title: "Food Delivery App",
        description: "React Native app for food delivery with real-time tracking, payments, and 4.8 star rating. 2M+ downloads.",
        techStack: ["React Native", "TypeScript", "Firebase", "Stripe", "Maps SDK"],
        liveUrl: "https://apps.apple.com/app/food-delivery-demo",
      },
      {
        title: "Fitness Tracking App",
        description: "Native iOS app with HealthKit integration, workout tracking, and social features. Featured by Apple.",
        techStack: ["Swift", "SwiftUI", "HealthKit", "CoreML", "CloudKit"],
        liveUrl: "https://apps.apple.com/app/fitness-tracker-demo",
      },
      {
        title: "AR Shopping Experience",
        description: "Augmented reality feature allowing users to visualize furniture in their space. Increased conversion by 25%.",
        techStack: ["ARKit", "RealityKit", "SceneKit", "Swift"],
        repoUrl: "https://github.com/priyasharma/ar-shopping",
      },
    ],
  },
  "alex.mueller@example.com": {
    headline: "Blockchain Developer | Web3 & DeFi Expert",
    summary: "Building decentralized applications and smart contracts. Focus on security, scalability, and user experience in Web3.",
    links: [
      { type: "github", url: "https://github.com/alexmueller", title: "GitHub" },
      { type: "twitter", url: "https://twitter.com/alexweb3", title: "Twitter" },
      { type: "mirror", url: "https://mirror.xyz/alexmueller.eth", title: "Mirror Blog" },
    ],
    projects: [
      {
        title: "DeFi Lending Protocol",
        description: "Lending protocol with $50M+ TVL. Audited by OpenZeppelin. Supports multiple collateral types and flash loans.",
        techStack: ["Solidity", "Hardhat", "OpenZeppelin", "The Graph", "React"],
        repoUrl: "https://github.com/alexmueller/defi-lending",
        liveUrl: "https://lending.alexmueller.eth",
      },
      {
        title: "NFT Marketplace",
        description: "Gas-optimized NFT marketplace with lazy minting, royalties, and cross-chain support. 10k+ transactions.",
        techStack: ["Solidity", "ERC-721", "IPFS", "Next.js", "wagmi"],
        repoUrl: "https://github.com/alexmueller/nft-market",
        liveUrl: "https://nft.alexmueller.eth",
      },
      {
        title: "Cross-chain Bridge",
        description: "Secure bridge for transferring assets between Ethereum and Polygon. $10M+ bridged with zero exploits.",
        techStack: ["Solidity", "Rust", "Substrate", "Zero-knowledge proofs"],
        repoUrl: "https://github.com/alexmueller/cross-chain",
      },
    ],
  },
  "yuki.tanaka@example.com": {
    headline: "NLP Engineer | Conversational AI Specialist",
    summary: "Building systems that understand human language. Expertise in LLMs, chatbots, and multi-lingual NLP serving 180M+ users.",
    links: [
      { type: "github", url: "https://github.com/yukitanaka", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/yukitanaka", title: "LinkedIn" },
      { type: "scholar", url: "https://scholar.google.com/citations?user=yukitanaka", title: "Google Scholar" },
    ],
    projects: [
      {
        title: "Multi-turn Dialogue System",
        description: "Conversational AI handling complex multi-turn dialogues with 96% intent accuracy. Serves 10M+ daily conversations.",
        techStack: ["Python", "Transformers", "Rasa", "FastAPI", "Redis"],
        repoUrl: "https://github.com/yukitanaka/dialogue-system",
      },
      {
        title: "Japanese NER Model",
        description: "State-of-the-art named entity recognition for Japanese text. Published at ACL 2023.",
        techStack: ["PyTorch", "Transformers", "spaCy", "MeCab"],
        repoUrl: "https://github.com/yukitanaka/japanese-ner",
      },
      {
        title: "Sentiment Analysis API",
        description: "Multi-lingual sentiment analysis supporting 50+ languages. 95% accuracy on benchmark datasets.",
        techStack: ["Python", "XLM-RoBERTa", "FastAPI", "Docker"],
        repoUrl: "https://github.com/yukitanaka/sentiment-api",
        liveUrl: "https://sentiment-demo.yukitanaka.dev",
      },
    ],
  },
  "carlos.mendez@example.com": {
    headline: "Backend Engineer | High-Performance Systems",
    summary: "Building robust APIs and distributed systems handling millions of requests. Expert in Go, Python, and system design.",
    links: [
      { type: "github", url: "https://github.com/carlosmendez", title: "GitHub" },
      { type: "linkedin", url: "https://linkedin.com/in/carlosmendez", title: "LinkedIn" },
      { type: "blog", url: "https://carlosmendez.dev", title: "Engineering Blog" },
    ],
    projects: [
      {
        title: "Payment Processing System",
        description: "High-throughput payment system processing $50M+ daily. 99.99% uptime with <100ms latency.",
        techStack: ["Go", "PostgreSQL", "Redis", "Kafka", "gRPC"],
        repoUrl: "https://github.com/carlosmendez/payments-engine",
      },
      {
        title: "Event-Driven Architecture",
        description: "Scalable event sourcing system handling 100k events/second. Full audit trail and replay capabilities.",
        techStack: ["Go", "Kafka", "ClickHouse", "Kubernetes"],
        repoUrl: "https://github.com/carlosmendez/event-sourcing",
      },
      {
        title: "Rate Limiter Library",
        description: "Distributed rate limiting library with token bucket and sliding window algorithms. 10k+ GitHub stars.",
        techStack: ["Go", "Redis", "Lua Scripts"],
        repoUrl: "https://github.com/carlosmendez/ratelimit",
      },
    ],
  },
};

async function seedPortfolios() {
  try {
    console.log("🔌 Connecting to MongoDB...");
    await mongoose.connect(MONGODB_URI!);
    console.log("✅ Connected to MongoDB");

    console.log("\n📝 Creating portfolios for talent profiles...\n");

    for (const [email, data] of Object.entries(portfolioData)) {
      // Find user by email
      const user = await User.findOne({ email });
      
      if (!user) {
        console.log(`⏭️  Skipping ${email} (user not found)`);
        continue;
      }

      // Check if portfolio already exists
      const existingPortfolio = await Portfolio.findOne({ userId: user._id });
      
      if (existingPortfolio) {
        // Update existing portfolio
        await Portfolio.updateOne(
          { userId: user._id },
          {
            $set: {
              headline: data.headline,
              summary: data.summary,
              links: data.links,
              projects: data.projects,
            },
          }
        );
        console.log(`🔄 Updated: ${email}`);
      } else {
        // Create new portfolio
        const portfolio = new Portfolio({
          userId: user._id,
          headline: data.headline,
          summary: data.summary,
          links: data.links,
          projects: data.projects,
          files: [],
        });
        await portfolio.save();
        console.log(`✅ Created: ${email}`);
      }
    }

    console.log("\n🎉 Portfolio seeding completed!");
    
  } catch (error) {
    console.error("❌ Error seeding portfolios:", error);
  } finally {
    await mongoose.disconnect();
    console.log("\n🔌 Disconnected from MongoDB");
  }
}

// Run the seed function
seedPortfolios();

