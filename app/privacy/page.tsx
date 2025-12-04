"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { ShieldCheck, Lock, Eye, FileText, Users, Database, Globe2, Mail } from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Welcome to Nxtbeings ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our platform. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website, use our services, or interact with our platform.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          By using Nxtbeings, you agree to the collection and use of information in accordance with this policy. If you do not agree with our policies and practices, please do not use our services.
        </p>
      </div>
    ),
  },
  {
    id: "information-collection",
    title: "Information We Collect",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Personal Information</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We collect information that you provide directly to us, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Name, email address, phone number, and contact information</li>
            <li>Professional profile information, work history, and portfolio details</li>
            <li>Payment and billing information (processed securely through third-party providers)</li>
            <li>Account credentials and authentication information</li>
            <li>Job descriptions, project requirements, and hiring preferences</li>
            <li>Communication records, messages, and feedback</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Automatically Collected Information</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            When you use our services, we automatically collect certain information, including:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Device information (IP address, browser type, operating system)</li>
            <li>Usage data (pages visited, time spent, interactions)</li>
            <li>Cookies and similar tracking technologies</li>
            <li>Location data (if permitted)</li>
            <li>Log files and analytics data</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Interview and Screening Data</h4>
          <p className="text-muted-foreground leading-relaxed">
            For our AI HR services (IntelliScreen AI), we collect and process interview recordings, candidate responses, behavioral analysis data, and cheating detection metrics. This data is used solely for screening and evaluation purposes and is stored securely in accordance with applicable data protection laws.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We use the information we collect for the following purposes:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Service Delivery:</strong> To provide, maintain, and improve our platform and services</li>
          <li><strong>Matching:</strong> To connect companies with suitable talent and vice versa</li>
          <li><strong>Communication:</strong> To send you updates, notifications, and respond to your inquiries</li>
          <li><strong>Authentication:</strong> To verify your identity and secure your account</li>
          <li><strong>Payment Processing:</strong> To process transactions and manage billing</li>
          <li><strong>Analytics:</strong> To analyze usage patterns and improve user experience</li>
          <li><strong>Legal Compliance:</strong> To comply with legal obligations and enforce our terms</li>
          <li><strong>Fraud Prevention:</strong> To detect and prevent fraudulent activities</li>
          <li><strong>AI Services:</strong> To power our AI interview screening and analysis features</li>
        </ul>
      </div>
    ),
  },
  {
    id: "information-sharing",
    title: "Information Sharing and Disclosure",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We do not sell your personal information. We may share your information in the following circumstances:
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2">With Your Consent</h4>
          <p className="text-muted-foreground leading-relaxed">
            We share information when you explicitly consent, such as when you apply for a position or when a company views your profile.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Service Providers</h4>
          <p className="text-muted-foreground leading-relaxed">
            We may share information with trusted third-party service providers who assist us in operating our platform, conducting business, or serving our users (e.g., cloud hosting, payment processing, analytics).
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Legal Requirements</h4>
          <p className="text-muted-foreground leading-relaxed">
            We may disclose information if required by law, court order, or government regulation, or to protect our rights, property, or safety.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Business Transfers</h4>
          <p className="text-muted-foreground leading-relaxed">
            In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We implement industry-standard security measures to protect your information, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Encryption of data in transit and at rest</li>
          <li>Secure authentication and access controls</li>
          <li>Regular security audits and vulnerability assessments</li>
          <li>Employee training on data protection</li>
          <li>Compliance with industry security standards</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your information, we cannot guarantee absolute security.
        </p>
      </div>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights and Choices",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Depending on your location, you may have certain rights regarding your personal information:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Access:</strong> Request access to your personal information</li>
          <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
          <li><strong>Deletion:</strong> Request deletion of your personal information</li>
          <li><strong>Portability:</strong> Request transfer of your data to another service</li>
          <li><strong>Opt-Out:</strong> Unsubscribe from marketing communications</li>
          <li><strong>Cookie Preferences:</strong> Manage cookie settings through your browser</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          To exercise these rights, please contact us at{" "}
          <a href="mailto:privacy@nxtbeings.com" className="text-primary hover:underline">
            privacy@nxtbeings.com
          </a>
          .
        </p>
      </div>
    ),
  },
  {
    id: "cookies",
    title: "Cookies and Tracking Technologies",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We use cookies and similar tracking technologies to collect and store information about your preferences and interactions with our platform. Types of cookies we use include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Essential Cookies:</strong> Required for the platform to function properly</li>
          <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our platform</li>
          <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
          <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          You can control cookies through your browser settings. However, disabling certain cookies may affect the functionality of our platform.
        </p>
      </div>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We retain your personal information for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required or permitted by law. Factors we consider when determining retention periods include:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>The nature and sensitivity of the information</li>
          <li>The purposes for which we process the information</li>
          <li>Legal and regulatory requirements</li>
          <li>The potential risk of harm from unauthorized use or disclosure</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal or legitimate business purposes.
        </p>
      </div>
    ),
  },
  {
    id: "children-privacy",
    title: "Children's Privacy",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a child, please contact us immediately, and we will take steps to delete such information.
        </p>
      </div>
    ),
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Your information may be transferred to and processed in countries other than your country of residence. These countries may have data protection laws that differ from those in your country. We take appropriate safeguards to ensure that your information receives an adequate level of protection, including:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Standard contractual clauses</li>
          <li>Adequacy decisions by relevant authorities</li>
          <li>Other legally recognized transfer mechanisms</li>
        </ul>
      </div>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Posting the updated policy on this page</li>
          <li>Updating the "Last Updated" date at the top of this policy</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We encourage you to review this Privacy Policy periodically to stay informed about how we protect your information.
        </p>
      </div>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </p>
        <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Email</p>
              <a href="mailto:privacy@nxtbeings.com" className="text-primary hover:underline">
                privacy@nxtbeings.com
              </a>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">General Inquiries</p>
              <a href="mailto:contact@nxtbeings.com" className="text-primary hover:underline">
                contact@nxtbeings.com
              </a>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden bg-background border-b border-border">
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm text-primary backdrop-blur-md font-medium mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            Privacy Policy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Your Privacy Matters
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            We are committed to protecting your personal information and being transparent about how we collect, use, and safeguard your data.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-sm text-muted-foreground mt-4"
          >
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </motion.p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Table of Contents */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card rounded-2xl border border-border p-6 mb-12"
          >
            <h2 className="text-xl font-semibold text-foreground mb-4">Table of Contents</h2>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-sm text-primary hover:underline flex items-center gap-2"
                  >
                    <span className="text-muted-foreground">•</span>
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Policy Sections */}
          <div className="space-y-12">
            {sections.map((section, index) => (
              <motion.div
                key={section.id}
                id={section.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="scroll-mt-20"
              >
                <div className="bg-card rounded-2xl border border-border p-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      {index === 0 && <FileText className="w-5 h-5 text-primary" />}
                      {index === 1 && <Database className="w-5 h-5 text-primary" />}
                      {index === 2 && <Eye className="w-5 h-5 text-primary" />}
                      {index === 3 && <Users className="w-5 h-5 text-primary" />}
                      {index === 4 && <Lock className="w-5 h-5 text-primary" />}
                      {index === 5 && <ShieldCheck className="w-5 h-5 text-primary" />}
                      {index === 6 && <Globe2 className="w-5 h-5 text-primary" />}
                      {index === 7 && <Database className="w-5 h-5 text-primary" />}
                      {index === 8 && <Users className="w-5 h-5 text-primary" />}
                      {index === 9 && <Globe2 className="w-5 h-5 text-primary" />}
                      {index === 10 && <FileText className="w-5 h-5 text-primary" />}
                      {index === 11 && <Mail className="w-5 h-5 text-primary" />}
                    </div>
                    <h2 className="text-2xl md:text-3xl font-semibold text-foreground">{section.title}</h2>
                  </div>
                  <div className="ml-14">{section.content}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

