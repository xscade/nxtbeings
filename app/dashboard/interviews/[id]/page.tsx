"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Video,
  VideoOff,
  Mic,
  MicOff,
  Play,
  Pause,
  SkipForward,
  CheckCircle2,
  AlertCircle,
  Clock,
  Loader2,
  Eye,
  EyeOff,
  Send,
  Building2,
  FileText,
  ChevronRight,
  X,
  Timer,
  Volume2,
  Camera,
  Sparkles,
  AlertTriangle,
  Shield,
  Trophy,
  Target,
  MessageSquare,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface Question {
  question: string;
  category: string;
  order: number;
}

interface Response {
  questionId: number;
  question: string;
  response: string;
  startTime: Date;
  endTime: Date;
  duration: number;
}

interface Analysis {
  overallScore: number;
  technicalScore?: number;
  communicationScore?: number;
  behavioralScore?: number;
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  keyInsights: string[];
  cheatingRiskLevel: string;
  cheatingIndicators: string[];
}

interface Interview {
  id: string;
  status: string;
  questions: Question[];
  responses: Response[];
  analysis?: Analysis;
  totalDuration?: number;
  jobDescription: {
    id: string;
    title: string;
    department?: string;
    skills?: string[];
  } | null;
  company: {
    id: string;
    name: string;
  } | null;
}

export default function InterviewSessionPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [interview, setInterview] = useState<Interview | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [currentResponse, setCurrentResponse] = useState("");
  const [responseStartTime, setResponseStartTime] = useState<Date | null>(null);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [showStartModal, setShowStartModal] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [eyeTrackingWarnings, setEyeTrackingWarnings] = useState(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    fetchInterview();
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [id]);

  const fetchInterview = async () => {
    try {
      const response = await fetch(`/api/interviews/ai/${id}`);
      const data = await response.json();

      if (response.ok) {
        setInterview(data.interview);
        if (data.interview.status === "completed") {
          setShowStartModal(false);
        } else if (data.interview.status === "in_progress") {
          setShowStartModal(false);
          setCurrentQuestionIndex(data.interview.responses?.length || 0);
        }
      } else {
        router.push("/dashboard/interviews");
      }
    } catch (error) {
      console.error("Error fetching interview:", error);
      router.push("/dashboard/interviews");
    } finally {
      setLoading(false);
    }
  };

  const initializeMedia = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: videoEnabled,
        audio: audioEnabled,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Error accessing media devices:", error);
      alert("Please allow camera and microphone access to continue with the interview.");
    }
  };

  const startInterview = async () => {
    try {
      await initializeMedia();
      
      const response = await fetch(`/api/interviews/ai/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "start" }),
      });

      if (response.ok) {
        setShowStartModal(false);
        setInterview((prev) => prev ? { ...prev, status: "in_progress" } : null);
        startTimer();
        setResponseStartTime(new Date());
      }
    } catch (error) {
      console.error("Error starting interview:", error);
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setTimeElapsed((prev) => prev + 1);
    }, 1000);
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setVideoEnabled(!videoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setAudioEnabled(!audioEnabled);
      }
    }
  };

  const submitResponse = async () => {
    if (!interview || !responseStartTime) return;

    setSubmitting(true);
    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - responseStartTime.getTime()) / 1000);

    try {
      const response = await fetch(`/api/interviews/ai/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "submit_response",
          response: {
            questionId: currentQuestionIndex,
            question: interview.questions[currentQuestionIndex].question,
            response: currentResponse,
            startTime: responseStartTime,
            endTime,
            duration,
          },
        }),
      });

      if (response.ok) {
        // Move to next question or complete
        if (currentQuestionIndex < interview.questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
          setCurrentResponse("");
          setResponseStartTime(new Date());
        } else {
          // Complete interview
          await completeInterview();
        }
      }
    } catch (error) {
      console.error("Error submitting response:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const completeInterview = async () => {
    try {
      const response = await fetch(`/api/interviews/ai/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "complete" }),
      });

      if (response.ok) {
        const data = await response.json();
        setInterview((prev) => prev ? { 
          ...prev, 
          status: "completed",
          analysis: data.interview.analysis,
          totalDuration: data.interview.totalDuration,
        } : null);
        setShowCompletionModal(true);
        
        // Stop media
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((track) => track.stop());
        }
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
      }
    } catch (error) {
      console.error("Error completing interview:", error);
    }
  };

  // Simulate eye tracking (in production, this would use ML models)
  useEffect(() => {
    if (interview?.status === "in_progress" && isRecording) {
      const checkInterval = setInterval(() => {
        // Random simulation - in production, use face-api.js or similar
        if (Math.random() > 0.95) {
          setEyeTrackingWarnings((prev) => prev + 1);
          // Log eye tracking event
          fetch(`/api/interviews/ai/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              action: "add_eye_tracking",
              eyeTrackingEvent: {
                type: "look_away",
                duration: Math.floor(Math.random() * 3000),
              },
            }),
          });
        }
      }, 5000);

      return () => clearInterval(checkInterval);
    }
  }, [interview?.status, isRecording, id]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBg = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="text-center py-20">
        <p className="text-muted-foreground">Interview not found</p>
      </div>
    );
  }

  // Completed Interview View
  if (interview.status === "completed" && interview.analysis) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard/interviews"
            className="p-2 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Interview Results</h1>
            <p className="text-muted-foreground text-sm">
              {interview.jobDescription?.title} at {interview.company?.name}
            </p>
          </div>
        </div>

        {/* Score Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card rounded-2xl border border-border p-8"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Overall Score */}
            <div className="text-center">
              <div className={`w-32 h-32 rounded-full ${getScoreBg(interview.analysis.overallScore)} flex items-center justify-center`}>
                <div>
                  <p className={`text-4xl font-bold ${getScoreColor(interview.analysis.overallScore)}`}>
                    {interview.analysis.overallScore}
                  </p>
                  <p className="text-xs text-muted-foreground">Overall</p>
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {interview.analysis.technicalScore !== undefined && (
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Target className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className={`text-2xl font-bold ${getScoreColor(interview.analysis.technicalScore)}`}>
                    {interview.analysis.technicalScore}%
                  </p>
                  <p className="text-xs text-muted-foreground">Technical</p>
                </div>
              )}
              {interview.analysis.communicationScore !== undefined && (
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <MessageSquare className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className={`text-2xl font-bold ${getScoreColor(interview.analysis.communicationScore)}`}>
                    {interview.analysis.communicationScore}%
                  </p>
                  <p className="text-xs text-muted-foreground">Communication</p>
                </div>
              )}
              {interview.analysis.behavioralScore !== undefined && (
                <div className="bg-muted/50 rounded-xl p-4 text-center">
                  <Trophy className="w-6 h-6 text-primary mx-auto mb-2" />
                  <p className={`text-2xl font-bold ${getScoreColor(interview.analysis.behavioralScore)}`}>
                    {interview.analysis.behavioralScore}%
                  </p>
                  <p className="text-xs text-muted-foreground">Behavioral</p>
                </div>
              )}
            </div>
          </div>

          {/* Duration & Integrity */}
          <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="w-4 h-4" />
              Duration: {formatTime(interview.totalDuration || 0)}
            </div>
            <div className={`flex items-center gap-2 text-sm ${
              interview.analysis.cheatingRiskLevel === "low" 
                ? "text-green-600" 
                : interview.analysis.cheatingRiskLevel === "medium"
                ? "text-yellow-600"
                : "text-red-600"
            }`}>
              <Shield className="w-4 h-4" />
              Integrity: {interview.analysis.cheatingRiskLevel.charAt(0).toUpperCase() + interview.analysis.cheatingRiskLevel.slice(1)} Risk
            </div>
          </div>
        </motion.div>

        {/* Strengths & Weaknesses */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-green-50 rounded-2xl border border-green-200 p-6"
          >
            <h3 className="font-semibold text-green-800 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {interview.analysis.strengths.map((strength, i) => (
                <li key={i} className="text-sm text-green-700 flex items-start gap-2">
                  <span className="text-green-500 mt-1">•</span>
                  {strength}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-yellow-50 rounded-2xl border border-yellow-200 p-6"
          >
            <h3 className="font-semibold text-yellow-800 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Areas for Improvement
            </h3>
            <ul className="space-y-2">
              {interview.analysis.weaknesses.map((weakness, i) => (
                <li key={i} className="text-sm text-yellow-700 flex items-start gap-2">
                  <span className="text-yellow-500 mt-1">•</span>
                  {weakness}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Key Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-2xl border border-border p-6"
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            Key Insights
          </h3>
          <ul className="space-y-2">
            {interview.analysis.keyInsights.map((insight, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary mt-0.5" />
                {insight}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Recommendations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-primary/5 rounded-2xl border border-primary/20 p-6"
        >
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Recommendations
          </h3>
          <ul className="space-y-2">
            {interview.analysis.recommendations.map((rec, i) => (
              <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-primary mt-0.5" />
                {rec}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Back Button */}
        <div className="flex justify-center">
          <Link href="/dashboard/interviews">
            <Button variant="outline" className="rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Interviews
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // Active Interview Session View
  return (
    <div className="min-h-[80vh] flex flex-col">
      {/* Start Modal */}
      <AnimatePresence>
        {showStartModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-card rounded-2xl border border-border shadow-xl overflow-hidden"
            >
              <div className="p-8 text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Ready for Your AI Interview?
                </h2>
                <p className="text-muted-foreground mb-6">
                  You'll be asked {interview.questions.length} questions about the{" "}
                  <strong>{interview.jobDescription?.title}</strong> position at{" "}
                  <strong>{interview.company?.name}</strong>.
                </p>

                {/* Requirements */}
                <div className="bg-muted/50 rounded-xl p-4 mb-6 text-left">
                  <p className="text-sm font-medium text-foreground mb-3">Before you start:</p>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <Camera className="w-4 h-4 text-primary" />
                      Camera access is required
                    </li>
                    <li className="flex items-center gap-2">
                      <Mic className="w-4 h-4 text-primary" />
                      Microphone access is required
                    </li>
                    <li className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-primary" />
                      Eye tracking will be monitored
                    </li>
                    <li className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      Take your time with each response
                    </li>
                  </ul>
                </div>

                <div className="flex gap-3">
                  <Link href="/dashboard/interviews" className="flex-1">
                    <Button variant="outline" className="w-full rounded-xl">
                      Cancel
                    </Button>
                  </Link>
                  <Button
                    onClick={startInterview}
                    className="flex-1 rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Start Interview
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Completion Modal */}
      <AnimatePresence>
        {showCompletionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-card rounded-2xl border border-border shadow-xl p-8 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-green-600" />
              </motion.div>
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Interview Complete!
              </h2>
              <p className="text-muted-foreground mb-6">
                Your responses have been submitted. The recruiter will review your results.
              </p>
              <Button
                onClick={() => {
                  setShowCompletionModal(false);
                  fetchInterview();
                }}
                className="w-full rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
              >
                View Results
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interview UI */}
      {!showStartModal && interview.status === "in_progress" && (
        <>
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 border border-red-200">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-sm font-medium text-red-700">Recording</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted">
                <Timer className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">{formatTime(timeElapsed)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              Question {currentQuestionIndex + 1} of {interview.questions.length}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Video Preview */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl border border-border overflow-hidden">
                <div className="aspect-video bg-black relative">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                  />
                  {!videoEnabled && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
                      <VideoOff className="w-12 h-12 text-gray-500" />
                    </div>
                  )}
                  
                  {/* Eye Tracking Warning */}
                  {eyeTrackingWarnings > 0 && (
                    <div className="absolute top-3 left-3 px-2 py-1 rounded-lg bg-yellow-500/90 text-white text-xs font-medium flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {eyeTrackingWarnings} warnings
                    </div>
                  )}
                </div>

                {/* Video Controls */}
                <div className="p-4 flex items-center justify-center gap-3">
                  <button
                    onClick={toggleVideo}
                    className={`p-3 rounded-xl transition-colors ${
                      videoEnabled
                        ? "bg-muted text-foreground hover:bg-muted/80"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {videoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
                  </button>
                  <button
                    onClick={toggleAudio}
                    className={`p-3 rounded-xl transition-colors ${
                      audioEnabled
                        ? "bg-muted text-foreground hover:bg-muted/80"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Job Info */}
              <div className="mt-4 p-4 bg-primary/5 rounded-xl border border-primary/20">
                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-2">
                  <Building2 className="w-4 h-4" />
                  {interview.company?.name}
                </div>
                <p className="text-sm text-foreground font-medium">
                  {interview.jobDescription?.title}
                </p>
                {interview.jobDescription?.skills && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {interview.jobDescription.skills.slice(0, 4).map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Question & Response */}
            <div className="lg:col-span-2 flex flex-col">
              {/* Progress */}
              <div className="flex gap-1 mb-4">
                {interview.questions.map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 h-1.5 rounded-full ${
                      i < currentQuestionIndex
                        ? "bg-green-500"
                        : i === currentQuestionIndex
                        ? "bg-primary"
                        : "bg-muted"
                    }`}
                  />
                ))}
              </div>

              {/* Question Card */}
              <motion.div
                key={currentQuestionIndex}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-card rounded-2xl border border-border p-6 mb-4"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${
                    interview.questions[currentQuestionIndex].category === "technical"
                      ? "bg-blue-100 text-blue-700"
                      : interview.questions[currentQuestionIndex].category === "behavioral"
                      ? "bg-purple-100 text-purple-700"
                      : interview.questions[currentQuestionIndex].category === "situational"
                      ? "bg-orange-100 text-orange-700"
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {interview.questions[currentQuestionIndex].category}
                  </span>
                </div>
                <p className="text-lg font-medium text-foreground">
                  {interview.questions[currentQuestionIndex].question}
                </p>
              </motion.div>

              {/* Response Input */}
              <div className="flex-1 flex flex-col">
                <textarea
                  value={currentResponse}
                  onChange={(e) => setCurrentResponse(e.target.value)}
                  placeholder="Type your response here... (or speak your answer)"
                  className="flex-1 min-h-[200px] p-4 rounded-2xl border border-input bg-background text-foreground placeholder:text-muted-foreground focus:border-primary focus:ring-1 focus:ring-primary resize-none"
                />

                {/* Submit Button */}
                <div className="flex items-center justify-between mt-4">
                  <p className="text-sm text-muted-foreground">
                    {currentQuestionIndex < interview.questions.length - 1
                      ? "Submit to continue to the next question"
                      : "Submit to complete the interview"}
                  </p>
                  <Button
                    onClick={submitResponse}
                    disabled={!currentResponse.trim() || submitting}
                    className="rounded-xl bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  >
                    {submitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : currentQuestionIndex < interview.questions.length - 1 ? (
                      <SkipForward className="w-4 h-4 mr-2" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                    )}
                    {currentQuestionIndex < interview.questions.length - 1 ? "Next Question" : "Complete Interview"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
