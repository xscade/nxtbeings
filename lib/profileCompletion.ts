import { ITalentProfile } from "@/models/User";

export function calculateProfileCompletion(profile: ITalentProfile | null | undefined): number {
  if (!profile) return 0;

  const fields = [
    // Basic Info (25 points)
    { value: profile.title, weight: 5 },
    { value: profile.tagline, weight: 3 },
    { value: profile.bio, weight: 7 },
    { value: profile.image, weight: 3 },
    { value: profile.location, weight: 2 },
    { value: profile.timezone, weight: 2 },
    { value: profile.hourlyRate, weight: 3 },
    
    // Skills & Languages (20 points)
    { 
      value: Array.isArray(profile.skills) && profile.skills.length > 0 && (
        typeof profile.skills[0] === 'string' || 
        (typeof profile.skills[0] === 'object' && profile.skills[0]?.name)
      ), 
      weight: 10 
    },
    { value: Array.isArray(profile.languages) && profile.languages.length > 0, weight: 5 },
    { 
      value: Array.isArray(profile.skills) && (
        (typeof profile.skills[0] === 'string' && profile.skills.length >= 3) ||
        (typeof profile.skills[0] === 'object' && profile.skills.length >= 3)
      ), 
      weight: 5 
    },
    
    // Experience & Education (25 points)
    { value: Array.isArray(profile.experience) && profile.experience.length > 0, weight: 15 },
    { value: Array.isArray(profile.education) && profile.education.length > 0, weight: 7 },
    { value: Array.isArray(profile.certifications) && profile.certifications.length > 0, weight: 3 },
    
    // Availability (10 points)
    { value: profile.available !== undefined, weight: 2 },
    { value: profile.availableFrom, weight: 3 },
    { value: profile.weeklyAvailability, weight: 3 },
    { value: profile.responseTime, weight: 2 },
    
    // Performance Stats (10 points)
    { value: profile.rating !== undefined, weight: 2 },
    { value: profile.totalReviews !== undefined, weight: 2 },
    { value: profile.jobsCompleted !== undefined, weight: 2 },
    { value: profile.successRate !== undefined, weight: 2 },
    { value: profile.stats?.onTimeDelivery !== undefined, weight: 1 },
    { value: profile.stats?.onBudget !== undefined, weight: 1 },
    
    // Additional Details (10 points)
    { value: Array.isArray(profile.experience) && profile.experience.length >= 2, weight: 5 },
    { 
      value: Array.isArray(profile.skills) && profile.skills.some(s => 
        typeof s === 'object' && s?.years !== undefined
      ), 
      weight: 3 
    },
    { value: profile.stats?.repeatClients !== undefined, weight: 2 },
  ];

  let totalPoints = 0;
  let maxPoints = 0;

  fields.forEach((field) => {
    maxPoints += field.weight;
    if (field.value) {
      totalPoints += field.weight;
    }
  });

  return Math.round((totalPoints / maxPoints) * 100);
}

