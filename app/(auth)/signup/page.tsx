"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Building2, 
  Sparkles, 
  ArrowLeft, 
  Eye, 
  EyeOff,
  Loader2,
  CheckCircle2,
  Quote
} from "lucide-react";

function SignUpContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const roleParam = searchParams.get("role") as "company" | "talent" | null;

  const [role, setRole] = useState<"company" | "talent">(roleParam || "talent");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (roleParam && ["company", "talent"].includes(roleParam)) {
      setRole(roleParam);
    }
  }, [roleParam]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      // Register the user
      const registerRes = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, role }),
      });

      const registerData = await registerRes.json();

      if (!registerRes.ok) {
        setError(registerData.error || "Something went wrong");
        setIsLoading(false);
        return;
      }

      // Sign in the user
      const signInRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (signInRes?.error) {
        setError("Account created but failed to sign in. Please try signing in manually.");
        setIsLoading(false);
        return;
      }

      // Redirect to onboarding
      router.push(`/onboarding/${role}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsLoading(false);
    }
  };

  const passwordRequirements = [
    { met: password.length >= 8, text: "At least 8 characters" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Back Link - Circular Button */}
          <Link
            href="/"
            className="inline-flex items-center gap-3 text-sm text-slate-500 hover:text-slate-700 mb-8 group"
          >
            <div className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 border border-slate-200 flex items-center justify-center transition-all group-hover:scale-105">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            </div>
            <span>Back to home</span>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <Link href="/" className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
              Nxtbeings
            </Link>
            <h1 className="text-3xl font-bold text-slate-900 mt-6">
              Create your account
            </h1>
            <p className="text-slate-500 mt-2">
              Join the world&apos;s first AI native talent network
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-700 mb-3">
              I am...
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("company")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  role === "company"
                    ? "border-blue-500 bg-blue-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Building2
                  className={`w-6 h-6 mb-2 ${
                    role === "company" ? "text-blue-600" : "text-slate-400"
                  }`}
                />
                <div
                  className={`font-medium ${
                    role === "company" ? "text-blue-900" : "text-slate-700"
                  }`}
                >
                  Hiring
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Find AI talent
                </div>
              </button>

              <button
                type="button"
                onClick={() => setRole("talent")}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  role === "talent"
                    ? "border-violet-500 bg-violet-50"
                    : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <Sparkles
                  className={`w-6 h-6 mb-2 ${
                    role === "talent" ? "text-violet-600" : "text-slate-400"
                  }`}
                />
                <div
                  className={`font-medium ${
                    role === "talent" ? "text-violet-900" : "text-slate-700"
                  }`}
                >
                  Professional
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  Get discovered
                </div>
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                {role === "company" ? "Your name" : "Full name"}
              </label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={role === "company" ? "John Doe" : "Jane Smith"}
                required
                className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Email address
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === "company"
                    ? "you@company.com"
                    : "you@example.com"
                }
                required
                className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 mb-1.5"
              >
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  required
                  className="h-12 rounded-xl border-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Password Requirements */}
              {password && (
                <div className="mt-2 space-y-1">
                  {passwordRequirements.map((req, i) => (
                    <div
                      key={i}
                      className={`flex items-center gap-2 text-xs ${
                        req.met ? "text-green-600" : "text-slate-400"
                      }`}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {req.text}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={isLoading || password.length < 8}
              className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-medium mt-6"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                "Create account"
              )}
            </Button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <Link
              href="/signin"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Sign in
            </Link>
          </p>

          <p className="text-center text-xs text-slate-400 mt-6">
            By creating an account, you agree to our{" "}
            <Link href="#" className="underline hover:text-slate-600">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="underline hover:text-slate-600">
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image with Overlay */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Dynamic Image Based on Role */}
        <motion.div
          key={role}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          <Image
            src={
              role === "company"
                ? "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=1600&fit=crop&q=90"
                : "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=1600&fit=crop&q=90"
            }
            alt={role === "company" ? "Professional woman in company" : "Corporate building"}
            fill
            className="object-cover"
            priority
            quality={90}
          />
        </motion.div>

        {/* Dark Gradient Overlay - Darker at bottom for text readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.7) 30%, rgba(0,0,0,0.4) 60%, transparent 100%)'
          }}
        />

        {/* Text Content at Bottom - Minimal Design */}
        <div className="relative z-10 flex items-end p-8 md:p-12 w-full h-full">
          <div className="w-full text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-5xl relative"
            >
              {/* Main Quote */}
              <div className="relative pr-16">
                {/* Quote Icon - Minimal */}
                <Quote className="absolute top-0 right-0 w-10 h-10 text-white" strokeWidth={1.5} />

                <p className="text-2xl md:text-3xl lg:text-4xl font-normal leading-relaxed text-white mb-8">
                  {role === "company"
                    ? "Connect with pre-vetted AI engineers, researchers, and creative technologists ready to transform your business."
                    : "Get discovered by leading companies, showcase your AI expertise, and access premium opportunities."}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignUpPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    }>
      <SignUpContent />
    </Suspense>
  );
}

