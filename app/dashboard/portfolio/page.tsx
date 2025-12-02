"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Plus,
  Loader2,
  Github,
  Linkedin,
  Globe,
  Twitter,
  Youtube,
  ExternalLink,
  Trash2,
  X,
  FolderGit2,
  FileText,
  Video,
  Image as ImageIcon,
  File,
  Link as LinkIcon,
  CheckCircle2,
  Dribbble
} from "lucide-react";

// Types
interface PortfolioLink {
  _id: string;
  type: string;
  url: string;
  title?: string;
}

interface PortfolioProject {
  _id: string;
  title: string;
  description?: string;
  techStack?: string[];
  repoUrl?: string;
  liveUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

interface PortfolioFile {
  _id: string;
  fileType: string;
  fileName: string;
  fileUrl: string;
  fileSize?: number;
  description?: string;
}

// Link type configurations
const linkTypes = [
  { value: "github", label: "GitHub", icon: Github, placeholder: "https://github.com/username" },
  { value: "linkedin", label: "LinkedIn", icon: Linkedin, placeholder: "https://linkedin.com/in/username" },
  { value: "website", label: "Website", icon: Globe, placeholder: "https://yourwebsite.com" },
  { value: "twitter", label: "Twitter/X", icon: Twitter, placeholder: "https://twitter.com/username" },
  { value: "dribbble", label: "Dribbble", icon: Dribbble, placeholder: "https://dribbble.com/username" },
  { value: "youtube", label: "YouTube", icon: Youtube, placeholder: "https://youtube.com/@channel" },
  { value: "other", label: "Other", icon: LinkIcon, placeholder: "https://example.com" },
];

const fileTypes = [
  { value: "video", label: "Video", icon: Video },
  { value: "pdf", label: "PDF", icon: FileText },
  { value: "image", label: "Image", icon: ImageIcon },
  { value: "document", label: "Document", icon: File },
  { value: "other", label: "Other", icon: File },
];

// Get icon for link type
function getLinkIcon(type: string) {
  const linkType = linkTypes.find(l => l.value === type);
  return linkType?.icon || LinkIcon;
}

// Get icon for file type
function getFileIcon(type: string) {
  const fileType = fileTypes.find(f => f.value === type);
  return fileType?.icon || File;
}

export default function PortfolioPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [links, setLinks] = useState<PortfolioLink[]>([]);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [files, setFiles] = useState<PortfolioFile[]>([]);
  
  // Modal states
  const [showAddLink, setShowAddLink] = useState(false);
  const [showAddProject, setShowAddProject] = useState(false);
  const [showAddFile, setShowAddFile] = useState(false);

  // Fetch portfolio data
  const fetchPortfolio = useCallback(async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      
      if (res.ok && data.portfolio) {
        setLinks(data.portfolio.links || []);
        setProjects(data.portfolio.projects || []);
        setFiles(data.portfolio.files || []);
      }
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  // Delete handlers
  const deleteLink = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio/links?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setLinks(prev => prev.filter(l => l._id !== id));
      }
    } catch (error) {
      console.error("Error deleting link:", error);
    }
  };

  const deleteProject = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setProjects(prev => prev.filter(p => p._id !== id));
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const deleteFile = async (id: string) => {
    try {
      const res = await fetch(`/api/portfolio/files?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        setFiles(prev => prev.filter(f => f._id !== id));
      }
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Portfolio</h1>
        <p className="text-muted-foreground mt-1">
          Showcase your work, projects, and professional presence
        </p>
      </div>

      {/* Social & Professional Links */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Links & Profiles</h2>
            <p className="text-sm text-muted-foreground">Your professional profiles and websites</p>
          </div>
          <Button 
            onClick={() => setShowAddLink(true)}
            className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Link
          </Button>
        </div>

        {links.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <LinkIcon className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground mt-4">No links added yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Add your GitHub, LinkedIn, or portfolio website</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {links.map((link) => {
              const Icon = getLinkIcon(link.type);
              return (
                <div 
                  key={link._id}
                  className="group bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground capitalize">{link.type}</p>
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-muted-foreground hover:text-primary truncate block"
                      >
                        {link.url}
                      </a>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-muted"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                      <button
                        onClick={() => deleteLink(link._id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Projects */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Projects</h2>
            <p className="text-sm text-muted-foreground">Your best work and side projects</p>
          </div>
          <Button 
            onClick={() => setShowAddProject(true)}
            className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>
        </div>

        {projects.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <FolderGit2 className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground mt-4">No projects added yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Showcase your best work with descriptions and links</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <div 
                key={project._id}
                className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{project.title}</h3>
                    {project.description && (
                      <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{project.description}</p>
                    )}
                  </div>
                  <button
                    onClick={() => deleteProject(project._id)}
                    className="p-1.5 rounded-lg hover:bg-destructive/10 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </button>
                </div>

                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.techStack.map((tech, i) => (
                      <span 
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-muted text-muted-foreground text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 mt-4 pt-4 border-t border-border">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Github className="w-4 h-4" />
                      Repository
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
                    >
                      <Globe className="w-4 h-4" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Files & Media */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-foreground">Files & Media</h2>
            <p className="text-sm text-muted-foreground">Videos, PDFs, presentations, and more</p>
          </div>
          <Button 
            onClick={() => setShowAddFile(true)}
            className="rounded-full bg-primary text-primary-foreground shadow-lg shadow-primary/20"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add File
          </Button>
        </div>

        {files.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-8 text-center">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <p className="text-muted-foreground mt-4">No files added yet</p>
            <p className="text-sm text-muted-foreground/70 mt-1">Upload videos, PDFs, or any other relevant files</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {files.map((file) => {
              const Icon = getFileIcon(file.fileType);
              return (
                <div 
                  key={file._id}
                  className="group bg-card rounded-xl border border-border p-4 hover:border-primary/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{file.fileName}</p>
                      <p className="text-xs text-muted-foreground capitalize">{file.fileType}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <a
                        href={file.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg hover:bg-muted"
                      >
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </a>
                      <button
                        onClick={() => deleteFile(file._id)}
                        className="p-1.5 rounded-lg hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add Link Modal */}
      <AddLinkModal 
        isOpen={showAddLink} 
        onClose={() => setShowAddLink(false)}
        onAdd={(link) => setLinks(prev => [...prev, link])}
      />

      {/* Add Project Modal */}
      <AddProjectModal 
        isOpen={showAddProject} 
        onClose={() => setShowAddProject(false)}
        onAdd={(project) => setProjects(prev => [...prev, project])}
      />

      {/* Add File Modal */}
      <AddFileModal 
        isOpen={showAddFile} 
        onClose={() => setShowAddFile(false)}
        onAdd={(file) => setFiles(prev => [...prev, file])}
      />
    </div>
  );
}

// Add Link Modal Component
function AddLinkModal({ 
  isOpen, 
  onClose, 
  onAdd 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (link: PortfolioLink) => void;
}) {
  const [type, setType] = useState("github");
  const [url, setUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedType = linkTypes.find(l => l.value === type);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/portfolio/links", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, url }),
      });

      if (res.ok) {
        const data = await res.json();
        onAdd(data.link);
        setUrl("");
        setType("github");
        onClose();
      }
    } catch (error) {
      console.error("Error adding link:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4"
          >
            <div className="bg-card rounded-2xl border border-border shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Add Link</h3>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Platform</label>
                  <div className="grid grid-cols-4 gap-2">
                    {linkTypes.slice(0, 8).map((linkType) => {
                      const Icon = linkType.icon;
                      return (
                        <button
                          key={linkType.value}
                          type="button"
                          onClick={() => setType(linkType.value)}
                          className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                            type === linkType.value 
                              ? "border-primary bg-primary/10 text-primary" 
                              : "border-border hover:border-primary/30 text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{linkType.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">URL</label>
                  <Input
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder={selectedType?.placeholder || "https://..."}
                    type="url"
                    required
                    className="rounded-xl"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl bg-primary">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Link"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Add Project Modal Component
function AddProjectModal({ 
  isOpen, 
  onClose, 
  onAdd 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (project: PortfolioProject) => void;
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [repoUrl, setRepoUrl] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/portfolio/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          title, 
          description, 
          techStack: techStack.split(",").map(t => t.trim()).filter(Boolean),
          repoUrl: repoUrl || undefined,
          liveUrl: liveUrl || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onAdd(data.project);
        // Reset form
        setTitle("");
        setDescription("");
        setTechStack("");
        setRepoUrl("");
        setLiveUrl("");
        onClose();
      }
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-lg px-4"
          >
            <div className="bg-card rounded-2xl border border-border shadow-xl p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Add Project</h3>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Project Title <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="My Awesome Project"
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description of your project..."
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:border-primary focus:ring-1 focus:ring-primary resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Tech Stack <span className="text-muted-foreground text-xs">(comma separated)</span>
                  </label>
                  <Input
                    value={techStack}
                    onChange={(e) => setTechStack(e.target.value)}
                    placeholder="React, Node.js, MongoDB, OpenAI"
                    className="rounded-xl"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      <Github className="w-4 h-4 inline mr-1" />
                      Repository URL
                    </label>
                    <Input
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="https://github.com/..."
                      type="url"
                      className="rounded-xl"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">
                      <Globe className="w-4 h-4 inline mr-1" />
                      Live URL
                    </label>
                    <Input
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://myproject.com"
                      type="url"
                      className="rounded-xl"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl bg-primary">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add Project"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// Add File Modal Component
function AddFileModal({ 
  isOpen, 
  onClose, 
  onAdd 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onAdd: (file: PortfolioFile) => void;
}) {
  const [fileType, setFileType] = useState("pdf");
  const [fileName, setFileName] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fileName || !fileUrl) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/portfolio/files", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          fileType, 
          fileName, 
          fileUrl,
          description: description || undefined,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        onAdd(data.file);
        // Reset form
        setFileType("pdf");
        setFileName("");
        setFileUrl("");
        setDescription("");
        onClose();
      }
    } catch (error) {
      console.error("Error adding file:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-4"
          >
            <div className="bg-card rounded-2xl border border-border shadow-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-foreground">Add File</h3>
                <button onClick={onClose} className="p-2 rounded-lg hover:bg-muted">
                  <X className="w-5 h-5 text-muted-foreground" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">File Type</label>
                  <div className="grid grid-cols-5 gap-2">
                    {fileTypes.map((ft) => {
                      const Icon = ft.icon;
                      return (
                        <button
                          key={ft.value}
                          type="button"
                          onClick={() => setFileType(ft.value)}
                          className={`p-3 rounded-xl border transition-all flex flex-col items-center gap-1 ${
                            fileType === ft.value 
                              ? "border-primary bg-primary/10 text-primary" 
                              : "border-border hover:border-primary/30 text-muted-foreground"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs">{ft.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    File Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    placeholder="Resume.pdf"
                    required
                    className="rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    File URL <span className="text-destructive">*</span>
                  </label>
                  <Input
                    value={fileUrl}
                    onChange={(e) => setFileUrl(e.target.value)}
                    placeholder="https://drive.google.com/... or any URL"
                    type="url"
                    required
                    className="rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    <CheckCircle2 className="w-3 h-3 inline mr-1" />
                    Supports Google Drive, Dropbox, YouTube, Vimeo, or any public URL
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">Description</label>
                  <Input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Brief description (optional)"
                    className="rounded-xl"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <Button type="button" variant="outline" onClick={onClose} className="flex-1 rounded-xl">
                    Cancel
                  </Button>
                  <Button type="submit" disabled={isSubmitting} className="flex-1 rounded-xl bg-primary">
                    {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add File"}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

