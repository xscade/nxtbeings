"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Settings,
  User,
  Mail,
  Lock,
  Bell,
  Eye,
  EyeOff,
  Shield,
  Trash2,
  Save,
  Loader2,
  CheckCircle,
  AlertTriangle,
  Globe,
  MessageSquare,
  Briefcase,
  Sparkles,
  Building2,
  Users,
  Globe2,
  TrendingUp,
  Plus,
  X
} from "lucide-react";
import { motion } from "framer-motion";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<"account" | "company" | "notifications" | "privacy" | "danger">("account");

  // Account Settings
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Company Profile Settings
  const [companyName, setCompanyName] = useState("");
  const [website, setWebsite] = useState("");
  const [size, setSize] = useState("");
  const [industry, setIndustry] = useState("");
  const [description, setDescription] = useState("");
  const [hiringNeeds, setHiringNeeds] = useState<string[]>([]);
  const [newHiringNeed, setNewHiringNeed] = useState("");

  // Notification Settings (different for talent vs company)
  const [emailNotifications, setEmailNotifications] = useState<Record<string, boolean>>({
    // Talent notifications
    newOpportunities: true,
    shortlisted: true,
    messages: true,
    profileViews: true,
    weeklyDigest: false,
    // Company notifications
    newApplications: true,
    talentInterest: true,
    shortlistUpdates: true,
  });

  // Privacy Settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "public", // public, private, unlisted
    showEmail: false,
    showPhone: false,
    allowMessages: true,
    showAvailability: true,
    showHourlyRate: true,
  });

  // Danger Zone
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const [profileRes, settingsRes] = await Promise.all([
          fetch("/api/user/profile"),
          fetch("/api/user/settings"),
        ]);
        
        const profileData = await profileRes.json();
        const settingsData = await settingsRes.json();
        
        if (profileRes.ok && profileData.user) {
          setName(profileData.user.name || "");
          setEmail(profileData.user.email || "");
          
          // Load company profile if user is a company
          if (profileData.user.role === "company" && profileData.user.companyProfile) {
            const cp = profileData.user.companyProfile;
            setCompanyName(cp.companyName || "");
            setWebsite(cp.website || "");
            setSize(cp.size || "");
            setIndustry(cp.industry || "");
            setDescription(cp.description || "");
            setHiringNeeds(Array.isArray(cp.hiringNeeds) ? cp.hiringNeeds : []);
          }
        }

        if (settingsRes.ok && settingsData) {
          if (settingsData.notifications) {
            const userRole = profileData.user?.role;
            const notifications: Record<string, boolean> = {};
            if (userRole === "company") {
              notifications.newApplications = settingsData.notifications.newApplications ?? true;
              notifications.talentInterest = settingsData.notifications.talentInterest ?? true;
              notifications.shortlistUpdates = settingsData.notifications.shortlistUpdates ?? true;
              notifications.messages = settingsData.notifications.messages ?? true;
              notifications.weeklyDigest = settingsData.notifications.weeklyDigest ?? false;
            } else {
              notifications.newOpportunities = settingsData.notifications.newOpportunities ?? true;
              notifications.shortlisted = settingsData.notifications.shortlisted ?? true;
              notifications.messages = settingsData.notifications.messages ?? true;
              notifications.profileViews = settingsData.notifications.profileViews ?? true;
              notifications.weeklyDigest = settingsData.notifications.weeklyDigest ?? false;
            }
            setEmailNotifications(notifications);
          }
          if (settingsData.privacy) {
            setPrivacySettings({
              profileVisibility: settingsData.privacy.profileVisibility || "public",
              showEmail: settingsData.privacy.showEmail ?? false,
              showPhone: settingsData.privacy.showPhone ?? false,
              allowMessages: settingsData.privacy.allowMessages ?? true,
              showAvailability: settingsData.privacy.showAvailability ?? true,
              showHourlyRate: settingsData.privacy.showHourlyRate ?? true,
            });
          }
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleAccountUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update account");
        return;
      }

      // Update session
      await update();

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");
    setSaved(false);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match");
      setIsSaving(false);
      return;
    }

    if (newPassword.length < 8) {
      setError("Password must be at least 8 characters");
      setIsSaving(false);
      return;
    }

    try {
      const res = await fetch("/api/user/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to change password");
        return;
      }

      setSaved(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleNotificationUpdate = async () => {
    setIsSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          notifications: emailNotifications,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update notifications");
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handlePrivacyUpdate = async () => {
    setIsSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/user/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          privacy: privacySettings,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update privacy settings");
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (deleteConfirm !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }

    setIsSaving(true);
    setError("");

    try {
      const res = await fetch("/api/user/delete-account", {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to delete account");
        setIsSaving(false);
        return;
      }

      // Redirect to home page
      window.location.href = "/";
    } catch {
      setError("Something went wrong");
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isCompany = session?.user?.role === "company";
  const isTalent = session?.user?.role === "talent";

  if (!isCompany && !isTalent) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Settings are only available for authenticated users.</p>
      </div>
    );
  }

  const tabs = isCompany
    ? [
        { id: "account" as const, label: "Account", icon: User },
        { id: "company" as const, label: "Company Profile", icon: Building2 },
        { id: "notifications" as const, label: "Notifications", icon: Bell },
        { id: "privacy" as const, label: "Privacy", icon: Shield },
        { id: "danger" as const, label: "Danger Zone", icon: AlertTriangle },
      ]
    : [
        { id: "account" as const, label: "Account", icon: User },
        { id: "notifications" as const, label: "Notifications", icon: Bell },
        { id: "privacy" as const, label: "Privacy", icon: Shield },
        { id: "danger" as const, label: "Danger Zone", icon: AlertTriangle },
      ];

  const addHiringNeed = () => {
    if (newHiringNeed.trim() && !hiringNeeds.includes(newHiringNeed.trim())) {
      setHiringNeeds([...hiringNeeds, newHiringNeed.trim()]);
      setNewHiringNeed("");
    }
  };

  const removeHiringNeed = (need: string) => {
    setHiringNeeds(hiringNeeds.filter((n) => n !== need));
  };

  const handleCompanyProfileUpdate = async () => {
    setIsSaving(true);
    setError("");
    setSaved(false);

    try {
      const res = await fetch("/api/user/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          companyProfile: {
            companyName,
            website,
            size,
            industry,
            description,
            hiringNeeds,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to update company profile");
        return;
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch {
      setError("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" />
          Settings
        </h1>
        <p className="text-muted-foreground mt-1">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Success/Error Messages */}
      {saved && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 p-4 rounded-2xl bg-primary/10 border border-primary/20 text-primary"
        >
          <CheckCircle className="w-5 h-5" />
          Settings saved successfully!
        </motion.div>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-destructive/10 border border-destructive/20 text-destructive"
        >
          {error}
        </motion.div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 border-b border-border">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors relative ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Account Settings */}
      {activeTab === "account" && (
        <div className="space-y-6">
          {/* Basic Information */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <User className="w-4 h-4 text-primary" />
              </div>
              Basic Information
            </h2>

            <form onSubmit={handleAccountUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Full Name
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  required
                  className="rounded-xl"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    value={email}
                    disabled
                    className="rounded-xl pl-10 bg-muted/50"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed. Contact support if you need to update it.
                </p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Save Changes
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>

          {/* Change Password */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-4">
            <h2 className="font-semibold text-foreground flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Lock className="w-4 h-4 text-primary" />
              </div>
              Change Password
            </h2>

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Current Password
                </label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="Enter current password"
                    required
                    className="rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  New Password
                </label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password (min 8 characters)"
                    required
                    minLength={8}
                    className="rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm new password"
                    required
                    className="rounded-xl pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={isSaving}
                  className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                >
                  {isSaving ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Update Password
                    </>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Company Profile Settings */}
      {activeTab === "company" && isCompany && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Building2 className="w-4 h-4 text-primary" />
            </div>
            Company Profile
          </h2>

          <form onSubmit={(e) => { e.preventDefault(); handleCompanyProfileUpdate(); }} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Company Name *
                </label>
                <Input
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  placeholder="Your company name"
                  required
                  className="rounded-xl"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Website
                </label>
                <Input
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://yourcompany.com"
                  type="url"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Company Size
                </label>
                <select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
                >
                  <option value="">Select size</option>
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201-500">201-500 employees</option>
                  <option value="500+">500+ employees</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  Industry
                </label>
                <Input
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g., Technology, Finance, Healthcare"
                  className="rounded-xl"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">
                Company Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us about your company, mission, and what makes you unique..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Hiring Needs
              </label>
              {hiringNeeds.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {hiringNeeds.map((need) => (
                    <span
                      key={need}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-sm font-medium"
                    >
                      {need}
                      <button
                        type="button"
                        onClick={() => removeHiringNeed(need)}
                        className="hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  value={newHiringNeed}
                  onChange={(e) => setNewHiringNeed(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHiringNeed())}
                  placeholder="Add hiring need (e.g., AI Engineers)"
                  className="rounded-xl"
                />
                <Button type="button" onClick={addHiringNeed} className="rounded-xl">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Common needs: AI Engineers, ML Ops, Data Scientists, NLP Specialists, Computer Vision, AI Researchers, Prompt Engineers, AI Product Managers
              </p>
            </div>

            <div className="flex justify-end pt-4 border-t border-border">
              <Button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Company Profile
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Notification Settings */}
      {activeTab === "notifications" && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Bell className="w-4 h-4 text-primary" />
            </div>
            Email Notifications
          </h2>

          <div className="space-y-4">
            {(isTalent ? [
              { key: "newOpportunities", label: "New Opportunities", desc: "Get notified when companies show interest in your profile", icon: Briefcase },
              { key: "shortlisted", label: "Shortlisted", desc: "Notifications when you're added to a company's shortlist", icon: Sparkles },
              { key: "messages", label: "Messages", desc: "Email notifications for new messages from companies", icon: MessageSquare },
              { key: "profileViews", label: "Profile Views", desc: "Weekly summary of who viewed your profile", icon: Eye },
              { key: "weeklyDigest", label: "Weekly Digest", desc: "A weekly summary of your activity and opportunities", icon: Mail },
            ] : [
              { key: "newApplications", label: "New Applications", desc: "Get notified when talent applies to your job postings", icon: Users },
              { key: "talentInterest", label: "Talent Interest", desc: "Notifications when talent shows interest in your company", icon: Sparkles },
              { key: "shortlistUpdates", label: "Shortlist Updates", desc: "Notifications about changes to your shortlisted candidates", icon: TrendingUp },
              { key: "messages", label: "Messages", desc: "Email notifications for new messages from talent", icon: MessageSquare },
              { key: "weeklyDigest", label: "Weekly Digest", desc: "A weekly summary of your hiring activity and matches", icon: Mail },
            ]).map((item) => (
              <div key={item.key} className="flex items-start justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{item.label}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={emailNotifications[item.key as keyof typeof emailNotifications]}
                    onChange={(e) =>
                      setEmailNotifications({
                        ...emailNotifications,
                        [item.key]: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              onClick={handleNotificationUpdate}
              disabled={isSaving}
              className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Privacy Settings */}
      {activeTab === "privacy" && (
        <div className="bg-card rounded-2xl border border-border p-6 space-y-6">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            Privacy & Visibility
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                {isCompany ? "Company Profile Visibility" : "Profile Visibility"}
              </label>
              <select
                value={privacySettings.profileVisibility}
                onChange={(e) =>
                  setPrivacySettings({
                    ...privacySettings,
                    profileVisibility: e.target.value,
                  })
                }
                className="w-full px-4 py-2 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary"
              >
                {isCompany ? (
                  <>
                    <option value="public">Public - Visible to all talent</option>
                    <option value="unlisted">Unlisted - Only visible via direct link</option>
                    <option value="private">Private - Hidden from search</option>
                  </>
                ) : (
                  <>
                    <option value="public">Public - Visible to all companies</option>
                    <option value="unlisted">Unlisted - Only visible via direct link</option>
                    <option value="private">Private - Hidden from search</option>
                  </>
                )}
              </select>
              <p className="text-xs text-muted-foreground mt-1">
                {isCompany 
                  ? "Control who can see your company profile in search results"
                  : "Control who can see your profile in search results"}
              </p>
            </div>

            {(isCompany ? [
              { key: "showEmail", label: "Show Email", desc: "Display your email address on your company profile" },
              { key: "showPhone", label: "Show Phone", desc: "Display your phone number on your company profile" },
              { key: "allowMessages", label: "Allow Messages", desc: "Let talent send you messages directly" },
            ] : [
              { key: "showEmail", label: "Show Email", desc: "Display your email address on your public profile" },
              { key: "showPhone", label: "Show Phone", desc: "Display your phone number on your public profile" },
              { key: "allowMessages", label: "Allow Messages", desc: "Let companies send you messages directly" },
              { key: "showAvailability", label: "Show Availability", desc: "Display your current availability status" },
              { key: "showHourlyRate", label: "Show Hourly Rate", desc: "Display your hourly rate on your profile" },
            ]).map((item) => (
              <div key={item.key} className="flex items-start justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div>
                  <p className="font-medium text-foreground">{item.label}</p>
                  <p className="text-sm text-muted-foreground mt-0.5">{item.desc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacySettings[item.key as keyof typeof privacySettings] as boolean}
                    onChange={(e) =>
                      setPrivacySettings({
                        ...privacySettings,
                        [item.key]: e.target.checked,
                      })
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-border">
            <Button
              onClick={handlePrivacyUpdate}
              disabled={isSaving}
              className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
            >
              {isSaving ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Save Privacy Settings
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Danger Zone */}
      {activeTab === "danger" && (
        <div className="bg-card rounded-2xl border border-destructive/20 p-6 space-y-6">
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle className="w-5 h-5" />
            <h2 className="font-semibold">Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20">
              <h3 className="font-medium text-foreground mb-2">Delete Account</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Once you delete your account, there is no going back. This will permanently delete your profile, portfolio, and all associated data. This action cannot be undone.
              </p>

              {!showDeleteConfirm ? (
                <Button
                  onClick={() => setShowDeleteConfirm(true)}
                  variant="destructive"
                  className="rounded-xl"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete My Account
                </Button>
              ) : (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      Type <span className="font-mono text-destructive">DELETE</span> to confirm
                    </label>
                    <Input
                      value={deleteConfirm}
                      onChange={(e) => setDeleteConfirm(e.target.value)}
                      placeholder="DELETE"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="flex gap-3">
                    <Button
                      onClick={handleDeleteAccount}
                      disabled={isSaving || deleteConfirm !== "DELETE"}
                      variant="destructive"
                      className="rounded-xl"
                    >
                      {isSaving ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4 mr-2" />
                          Permanently Delete Account
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowDeleteConfirm(false);
                        setDeleteConfirm("");
                      }}
                      variant="outline"
                      className="rounded-xl"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

