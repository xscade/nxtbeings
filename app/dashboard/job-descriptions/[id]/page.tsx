"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Save,
  Loader2,
  Plus,
  Type,
  List,
  ListOrdered,
  Minus,
  AlertCircle,
  Info,
  CheckCircle,
  GripVertical,
  Trash2,
  MoreHorizontal,
  Settings,
  Eye,
  Clock,
  MapPin,
  Briefcase,
  DollarSign,
  Tags,
  ChevronDown,
  Sparkles,
  X,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface ContentBlock {
  type: "heading" | "paragraph" | "bulletList" | "numberedList" | "divider" | "callout";
  content: string;
  level?: number;
  items?: string[];
  calloutType?: "info" | "warning" | "success";
}

interface JobDescription {
  id: string;
  title: string;
  content: ContentBlock[];
  status: "draft" | "published" | "archived";
  department?: string;
  location?: string;
  employmentType?: string;
  experienceLevel?: string;
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  skills?: string[];
  benefits?: string[];
  createdAt: string;
  updatedAt: string;
}

const blockTypes = [
  { type: "heading", icon: Type, label: "Heading", description: "Large section heading" },
  { type: "paragraph", icon: Type, label: "Text", description: "Plain text paragraph" },
  { type: "bulletList", icon: List, label: "Bullet List", description: "Unordered list" },
  { type: "numberedList", icon: ListOrdered, label: "Numbered List", description: "Ordered list" },
  { type: "divider", icon: Minus, label: "Divider", description: "Visual separator" },
  { type: "callout", icon: AlertCircle, label: "Callout", description: "Highlighted information" },
];

export default function JDEditorPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [jd, setJd] = useState<JobDescription | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [showBlockMenu, setShowBlockMenu] = useState<number | null>(null);
  const [showAddBlock, setShowAddBlock] = useState<number | null>(null);
  const [showSettings, setShowSettings] = useState(false);
  const [newSkill, setNewSkill] = useState("");
  const [showAIPrompt, setShowAIPrompt] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiGenerating, setAiGenerating] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  
  const titleRef = useRef<HTMLInputElement>(null);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchJobDescription();
  }, [id]);

  // Autosave
  useEffect(() => {
    if (hasChanges && jd) {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(() => {
        saveJobDescription();
      }, 2000);
    }
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [jd, hasChanges]);

  const fetchJobDescription = async () => {
    try {
      const response = await fetch(`/api/job-descriptions/${id}`);
      const data = await response.json();
      
      if (response.ok) {
        setJd(data.jobDescription);
      } else {
        router.push("/dashboard/job-descriptions");
      }
    } catch (error) {
      console.error("Error fetching job description:", error);
      router.push("/dashboard/job-descriptions");
    } finally {
      setLoading(false);
    }
  };

  const saveJobDescription = async () => {
    if (!jd) return;
    
    setSaving(true);
    try {
      const response = await fetch(`/api/job-descriptions/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: jd.title,
          content: jd.content,
          status: jd.status,
          department: jd.department,
          location: jd.location,
          employmentType: jd.employmentType,
          experienceLevel: jd.experienceLevel,
          salaryRange: jd.salaryRange,
          skills: jd.skills,
        }),
      });
      
      if (response.ok) {
        setHasChanges(false);
      }
    } catch (error) {
      console.error("Error saving job description:", error);
    } finally {
      setSaving(false);
    }
  };

  const updateJD = useCallback((updates: Partial<JobDescription>) => {
    setJd((prev) => prev ? { ...prev, ...updates } : null);
    setHasChanges(true);
  }, []);

  const updateBlock = (index: number, updates: Partial<ContentBlock>) => {
    if (!jd) return;
    const newContent = [...jd.content];
    newContent[index] = { ...newContent[index], ...updates };
    updateJD({ content: newContent });
  };

  const addBlock = (type: string, afterIndex: number) => {
    if (!jd) return;
    
    const newBlock: ContentBlock = {
      type: type as ContentBlock["type"],
      content: "",
    };
    
    if (type === "heading") newBlock.level = 1;
    if (type === "bulletList" || type === "numberedList") newBlock.items = [""];
    if (type === "callout") newBlock.calloutType = "info";
    
    const newContent = [...jd.content];
    newContent.splice(afterIndex + 1, 0, newBlock);
    updateJD({ content: newContent });
    setShowAddBlock(null);
  };

  const deleteBlock = (index: number) => {
    if (!jd) return;
    const newContent = jd.content.filter((_, i) => i !== index);
    updateJD({ content: newContent });
    setShowBlockMenu(null);
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    if (!jd) return;
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= jd.content.length) return;
    
    const newContent = [...jd.content];
    [newContent[index], newContent[newIndex]] = [newContent[newIndex], newContent[index]];
    updateJD({ content: newContent });
    setShowBlockMenu(null);
  };

  const addListItem = (blockIndex: number) => {
    if (!jd) return;
    const block = jd.content[blockIndex];
    if (!block.items) return;
    
    const newItems = [...block.items, ""];
    updateBlock(blockIndex, { items: newItems });
  };

  const updateListItem = (blockIndex: number, itemIndex: number, value: string) => {
    if (!jd) return;
    const block = jd.content[blockIndex];
    if (!block.items) return;
    
    const newItems = [...block.items];
    newItems[itemIndex] = value;
    updateBlock(blockIndex, { items: newItems });
  };

  const removeListItem = (blockIndex: number, itemIndex: number) => {
    if (!jd) return;
    const block = jd.content[blockIndex];
    if (!block.items || block.items.length <= 1) return;
    
    const newItems = block.items.filter((_, i) => i !== itemIndex);
    updateBlock(blockIndex, { items: newItems });
  };

  const addSkill = () => {
    if (!newSkill.trim() || !jd) return;
    const skills = [...(jd.skills || []), newSkill.trim()];
    updateJD({ skills });
    setNewSkill("");
  };

  const removeSkill = (index: number) => {
    if (!jd?.skills) return;
    const skills = jd.skills.filter((_, i) => i !== index);
    updateJD({ skills });
  };

  const getCalloutIcon = (type: string) => {
    switch (type) {
      case "warning": return AlertCircle;
      case "success": return CheckCircle;
      default: return Info;
    }
  };

  const getCalloutStyles = (type: string) => {
    switch (type) {
      case "warning": return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "success": return "bg-green-50 border-green-200 text-green-800";
      default: return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  const generateWithAI = async () => {
    if (!aiPrompt.trim() || !jd) return;
    
    setAiGenerating(true);
    setAiError(null);
    
    try {
      const response = await fetch("/api/job-descriptions/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: aiPrompt,
          jobTitle: jd.title || undefined,
        }),
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || "Failed to generate content");
      }
      
      if (data.content && Array.isArray(data.content)) {
        // Append or replace content based on whether there's existing content
        if (jd.content.length === 0) {
          updateJD({ content: data.content });
        } else {
          // Append to existing content
          updateJD({ content: [...jd.content, ...data.content] });
        }
        
        setShowAIPrompt(false);
        setAiPrompt("");
      }
    } catch (error) {
      console.error("AI generation error:", error);
      setAiError(error instanceof Error ? error.message : "Failed to generate content");
    } finally {
      setAiGenerating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!jd) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Job description not found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8 sticky top-0 bg-background/80 backdrop-blur-xl py-4 -mx-4 px-4 z-30 border-b border-border/50">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/job-descriptions"
            className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
              jd.status === "published" 
                ? "bg-green-100 text-green-700" 
                : jd.status === "archived"
                ? "bg-gray-100 text-gray-600"
                : "bg-yellow-100 text-yellow-700"
            }`}>
              {jd.status}
            </span>
            {saving && (
              <span className="text-xs text-muted-foreground flex items-center gap-1">
                <Loader2 className="w-3 h-3 animate-spin" />
                Saving...
              </span>
            )}
            {hasChanges && !saving && (
              <span className="text-xs text-muted-foreground">Unsaved changes</span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={`p-2 rounded-xl transition-colors ${
              showSettings 
                ? "bg-primary text-primary-foreground" 
                : "hover:bg-primary/10 text-muted-foreground hover:text-primary"
            }`}
          >
            <Settings className="w-5 h-5" />
          </button>
          <Button
            onClick={() => setShowAIPrompt(true)}
            variant="outline"
            className="rounded-xl border-primary/20 hover:bg-primary/10 hover:text-primary"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            AI Generate
          </Button>
          <Button
            onClick={saveJobDescription}
            disabled={saving || !hasChanges}
            className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            Save
          </Button>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Main Editor */}
        <div className={`flex-1 transition-all ${showSettings ? "pr-80" : ""}`}>
          {/* Title */}
          <input
            ref={titleRef}
            type="text"
            value={jd.title}
            onChange={(e) => updateJD({ title: e.target.value })}
            placeholder="Untitled Job Description"
            className="w-full text-4xl font-bold text-foreground bg-transparent border-none outline-none placeholder:text-muted-foreground/50 mb-8"
          />

          {/* Content Blocks */}
          <div className="space-y-4">
            {jd.content.length === 0 && (
              <div className="relative group">
                <button
                  onClick={() => setShowAddBlock(-1)}
                  className="w-full py-8 rounded-xl border-2 border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add content block
                </button>
                
                {/* Add Block Dropdown for empty state */}
                <AnimatePresence>
                  {showAddBlock === -1 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 bg-card rounded-xl border border-border shadow-lg py-2 z-20"
                    >
                      {blockTypes.map((blockType) => (
                        <button
                          key={blockType.type}
                          onClick={() => addBlock(blockType.type, -1)}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <blockType.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-foreground">{blockType.label}</p>
                            <p className="text-xs text-muted-foreground">{blockType.description}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {jd.content.map((block, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="group relative"
              >
                {/* Block Controls */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setShowAddBlock(index)}
                    className="p-1 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setShowBlockMenu(showBlockMenu === index ? null : index)}
                    className="p-1 rounded hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors cursor-grab"
                  >
                    <GripVertical className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Block Menu */}
                <AnimatePresence>
                  {showBlockMenu === index && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="absolute -left-8 top-full mt-1 w-44 bg-card rounded-xl border border-border shadow-lg py-1 z-20"
                    >
                      {/* Heading level options */}
                      {block.type === "heading" && (
                        <>
                          <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Heading Size</div>
                          <div className="flex gap-1 px-2 pb-2">
                            {[1, 2, 3].map((level) => (
                              <button
                                key={level}
                                onClick={() => {
                                  updateBlock(index, { level });
                                  setShowBlockMenu(null);
                                }}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                                  block.level === level
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-primary/10 text-foreground"
                                }`}
                              >
                                H{level}
                              </button>
                            ))}
                          </div>
                          <div className="border-t border-border my-1" />
                        </>
                      )}
                      
                      {/* Callout type options */}
                      {block.type === "callout" && (
                        <>
                          <div className="px-3 py-1.5 text-xs font-medium text-muted-foreground">Callout Type</div>
                          <div className="flex gap-1 px-2 pb-2">
                            {(["info", "warning", "success"] as const).map((type) => (
                              <button
                                key={type}
                                onClick={() => {
                                  updateBlock(index, { calloutType: type });
                                  setShowBlockMenu(null);
                                }}
                                className={`flex-1 py-1.5 text-xs font-medium rounded-lg capitalize transition-colors ${
                                  block.calloutType === type
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted hover:bg-primary/10 text-foreground"
                                }`}
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                          <div className="border-t border-border my-1" />
                        </>
                      )}
                      
                      <button
                        onClick={() => moveBlock(index, "up")}
                        disabled={index === 0}
                        className="w-full px-3 py-2 text-sm text-left text-foreground hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Move up
                      </button>
                      <button
                        onClick={() => moveBlock(index, "down")}
                        disabled={index === jd.content.length - 1}
                        className="w-full px-3 py-2 text-sm text-left text-foreground hover:bg-primary/5 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Move down
                      </button>
                      <div className="border-t border-border my-1" />
                      <button
                        onClick={() => deleteBlock(index)}
                        className="w-full px-3 py-2 text-sm text-left text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Block Content */}
                {block.type === "heading" && (
                  <input
                    type="text"
                    value={block.content}
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="Heading"
                    className={`w-full bg-transparent border-none outline-none font-bold text-foreground placeholder:text-muted-foreground/50 ${
                      block.level === 1 ? "text-2xl" : block.level === 2 ? "text-xl" : "text-lg"
                    }`}
                  />
                )}

                {block.type === "paragraph" && (
                  <textarea
                    value={block.content}
                    onChange={(e) => updateBlock(index, { content: e.target.value })}
                    placeholder="Write something..."
                    rows={1}
                    className="w-full bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 resize-none leading-relaxed"
                    style={{ minHeight: "1.5rem" }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height = target.scrollHeight + "px";
                    }}
                  />
                )}

                {(block.type === "bulletList" || block.type === "numberedList") && (
                  <div className="space-y-1">
                    {(block.items || [""]).map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-2 group/item">
                        <span className="mt-1.5 text-muted-foreground">
                          {block.type === "bulletList" ? "•" : `${itemIndex + 1}.`}
                        </span>
                        <input
                          type="text"
                          value={item}
                          onChange={(e) => updateListItem(index, itemIndex, e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addListItem(index);
                            }
                            if (e.key === "Backspace" && item === "" && (block.items?.length || 0) > 1) {
                              e.preventDefault();
                              removeListItem(index, itemIndex);
                            }
                          }}
                          placeholder="List item"
                          className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50"
                        />
                        <button
                          onClick={() => removeListItem(index, itemIndex)}
                          className="p-1 rounded opacity-0 group-hover/item:opacity-100 hover:bg-red-50 text-red-500 transition-all"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => addListItem(index)}
                      className="text-xs text-muted-foreground hover:text-primary ml-4"
                    >
                      + Add item
                    </button>
                  </div>
                )}

                {block.type === "divider" && (
                  <hr className="border-border" />
                )}

                {block.type === "callout" && (
                  <div className={`p-4 rounded-xl border ${getCalloutStyles(block.calloutType || "info")}`}>
                    <div className="flex items-start gap-3">
                      {React.createElement(getCalloutIcon(block.calloutType || "info"), {
                        className: "w-5 h-5 flex-shrink-0 mt-0.5",
                      })}
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(index, { content: e.target.value })}
                        placeholder="Callout content..."
                        rows={1}
                        className="flex-1 bg-transparent border-none outline-none resize-none"
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = target.scrollHeight + "px";
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* Add Block Dropdown */}
                <AnimatePresence>
                  {showAddBlock === index && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 top-full mt-2 w-64 bg-card rounded-xl border border-border shadow-lg py-2 z-20"
                    >
                      {blockTypes.map((blockType) => (
                        <button
                          key={blockType.type}
                          onClick={() => addBlock(blockType.type, index)}
                          className="w-full flex items-center gap-3 px-4 py-2 hover:bg-primary/5 transition-colors"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <blockType.icon className="w-4 h-4 text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-medium text-foreground">{blockType.label}</p>
                            <p className="text-xs text-muted-foreground">{blockType.description}</p>
                          </div>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}

            {/* Add Block at End */}
            {jd.content.length > 0 && (
              <button
                onClick={() => setShowAddBlock(jd.content.length - 1)}
                className="w-full py-3 rounded-xl border border-dashed border-border hover:border-primary/50 text-muted-foreground hover:text-primary transition-colors flex items-center justify-center gap-2 text-sm"
              >
                <Plus className="w-4 h-4" />
                Add block
              </button>
            )}
          </div>
        </div>

        {/* Settings Panel */}
        <AnimatePresence>
          {showSettings && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="fixed right-8 top-32 w-72 bg-card rounded-2xl border border-border shadow-lg p-6 space-y-6 max-h-[calc(100vh-160px)] overflow-y-auto"
            >
              <h3 className="font-semibold text-foreground">Job Details</h3>

              {/* Status */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Status</label>
                <select
                  value={jd.status}
                  onChange={(e) => updateJD({ status: e.target.value as JobDescription["status"] })}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              {/* Department */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-muted-foreground" />
                  Department
                </label>
                <input
                  type="text"
                  value={jd.department || ""}
                  onChange={(e) => updateJD({ department: e.target.value })}
                  placeholder="e.g., Engineering"
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground"
                />
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  Location
                </label>
                <input
                  type="text"
                  value={jd.location || ""}
                  onChange={(e) => updateJD({ location: e.target.value })}
                  placeholder="e.g., Remote, San Francisco"
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground"
                />
              </div>

              {/* Employment Type */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Clock className="w-4 h-4 text-muted-foreground" />
                  Employment Type
                </label>
                <select
                  value={jd.employmentType || ""}
                  onChange={(e) => updateJD({ employmentType: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm"
                >
                  <option value="">Select type</option>
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                  <option value="freelance">Freelance</option>
                </select>
              </div>

              {/* Experience Level */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Experience Level</label>
                <select
                  value={jd.experienceLevel || ""}
                  onChange={(e) => updateJD({ experienceLevel: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm"
                >
                  <option value="">Select level</option>
                  <option value="entry">Entry Level</option>
                  <option value="mid">Mid Level</option>
                  <option value="senior">Senior Level</option>
                  <option value="lead">Lead</option>
                  <option value="executive">Executive</option>
                </select>
              </div>

              {/* Salary Range */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-muted-foreground" />
                  Salary Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={jd.salaryRange?.min || ""}
                    onChange={(e) => updateJD({
                      salaryRange: {
                        ...jd.salaryRange,
                        min: parseInt(e.target.value) || undefined,
                      },
                    })}
                    placeholder="Min"
                    className="flex-1 px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground"
                  />
                  <span className="text-muted-foreground">-</span>
                  <input
                    type="number"
                    value={jd.salaryRange?.max || ""}
                    onChange={(e) => updateJD({
                      salaryRange: {
                        ...jd.salaryRange,
                        max: parseInt(e.target.value) || undefined,
                      },
                    })}
                    placeholder="Max"
                    className="flex-1 px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground"
                  />
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Tags className="w-4 h-4 text-muted-foreground" />
                  Required Skills
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(jd.skills || []).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-medium"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="hover:text-red-500 transition-colors"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add skill"
                    className="flex-1 px-3 py-2 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground"
                  />
                  <Button
                    onClick={addSkill}
                    size="sm"
                    className="rounded-xl"
                  >
                    Add
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Click outside to close menus */}
      {(showBlockMenu !== null || showAddBlock !== null) && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => {
            setShowBlockMenu(null);
            setShowAddBlock(null);
          }}
        />
      )}

      {/* AI Prompt Modal */}
      <AnimatePresence>
        {showAIPrompt && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !aiGenerating && setShowAIPrompt(false)}
              className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-lg"
            >
              <div className="bg-card rounded-2xl border border-border shadow-xl overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">AI Content Generator</h3>
                      <p className="text-xs text-muted-foreground">Describe what you want to generate</p>
                    </div>
                  </div>
                  <button
                    onClick={() => !aiGenerating && setShowAIPrompt(false)}
                    disabled={aiGenerating}
                    className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                {/* Content */}
                <div className="p-4 space-y-4">
                  {/* Prompt Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Your prompt</label>
                    <textarea
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="e.g., Create a job description for a Senior React Developer with 5+ years experience, focusing on fintech applications..."
                      rows={4}
                      disabled={aiGenerating}
                      className="w-full px-4 py-3 rounded-xl border border-input bg-background text-foreground text-sm placeholder:text-muted-foreground resize-none focus:border-primary focus:ring-1 focus:ring-primary outline-none disabled:opacity-50"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && e.metaKey) {
                          generateWithAI();
                        }
                      }}
                    />
                    <p className="text-xs text-muted-foreground">
                      Tip: Press ⌘+Enter to generate
                    </p>
                  </div>

                  {/* Quick Prompts */}
                  <div className="space-y-2">
                    <label className="text-xs font-medium text-muted-foreground">Quick prompts</label>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Full job description with requirements",
                        "Focus on technical skills",
                        "Add benefits and perks section",
                        "Include company culture section",
                      ].map((prompt) => (
                        <button
                          key={prompt}
                          onClick={() => setAiPrompt(prompt)}
                          disabled={aiGenerating}
                          className="px-3 py-1.5 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary text-xs font-medium transition-colors disabled:opacity-50"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Error Message */}
                  {aiError && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      {aiError}
                    </div>
                  )}
                </div>
                
                {/* Footer */}
                <div className="flex items-center justify-between p-4 border-t border-border bg-muted/30">
                  <p className="text-xs text-muted-foreground">
                    {jd?.content.length === 0 
                      ? "Content will be added to the document" 
                      : "Content will be appended to existing blocks"}
                  </p>
                  <Button
                    onClick={generateWithAI}
                    disabled={aiGenerating || !aiPrompt.trim()}
                    className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  >
                    {aiGenerating ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
