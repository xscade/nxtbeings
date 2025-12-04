"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { FileText, Scale, AlertCircle, Shield, Users, CreditCard, Ban, Mail, Gavel } from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Welcome to Nxtbeings ("we," "our," "us," or "the Platform"). These Terms of Service ("Terms") govern your access to and use of our website, services, and platform (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          If you do not agree to these Terms, please do not use our Services. We may update these Terms from time to time, and your continued use of the Services after such changes constitutes acceptance of the updated Terms.
        </p>
      </div>
    ),
  },
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          By creating an account, accessing, or using Nxtbeings, you acknowledge that you have read, understood, and agree to be bound by these Terms and our Privacy Policy. If you are using the Services on behalf of a company or organization, you represent that you have the authority to bind that entity to these Terms.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          You must be at least 18 years old to use our Services. By using the Services, you represent and warrant that you are at least 18 years of age and have the legal capacity to enter into these Terms.
        </p>
      </div>
    ),
  },
  {
    id: "account",
    title: "Account Registration and Security",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Account Creation</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            To access certain features of our Services, you must create an account. When creating an account, you agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Provide accurate, current, and complete information</li>
            <li>Maintain and promptly update your account information</li>
            <li>Maintain the security of your account credentials</li>
            <li>Accept responsibility for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Account Security</h4>
          <p className="text-muted-foreground leading-relaxed">
            You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. We are not liable for any loss or damage arising from your failure to protect your account credentials.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "use-of-services",
    title: "Use of Services",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Permitted Use</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            You may use our Services for lawful purposes only and in accordance with these Terms. You agree to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Use the Services in compliance with all applicable laws and regulations</li>
            <li>Provide accurate and truthful information</li>
            <li>Respect the rights of other users</li>
            <li>Use the Services for legitimate business or professional purposes</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Prohibited Activities</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            You agree not to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Violate any applicable laws, regulations, or third-party rights</li>
            <li>Impersonate any person or entity or misrepresent your affiliation</li>
            <li>Upload, post, or transmit any content that is illegal, harmful, or offensive</li>
            <li>Interfere with or disrupt the Services or servers</li>
            <li>Attempt to gain unauthorized access to any part of the Services</li>
            <li>Use automated systems (bots, scrapers) to access the Services without permission</li>
            <li>Reverse engineer, decompile, or disassemble any part of the Services</li>
            <li>Use the Services to compete with us or for any commercial purpose not authorized by us</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "user-content",
    title: "User Content and Intellectual Property",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Your Content</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            You retain ownership of any content you submit, post, or display on or through the Services ("User Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Use, reproduce, modify, and distribute your User Content to provide and improve our Services</li>
            <li>Display your User Content on the Platform</li>
            <li>Share your User Content with other users as part of the matching and hiring process</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Our Intellectual Property</h4>
          <p className="text-muted-foreground leading-relaxed">
            The Services, including all content, features, functionality, trademarks, logos, and software, are owned by Nxtbeings or our licensors and are protected by copyright, trademark, and other intellectual property laws. You may not use our intellectual property without our prior written consent.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "payments",
    title: "Payments and Billing",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Service Fees</h4>
          <p className="text-muted-foreground leading-relaxed">
            Certain features of our Services may require payment. We will clearly disclose all fees before you incur any charges. Fees are non-refundable unless otherwise stated in our Refund Policy or required by law.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Payment Processing</h4>
          <p className="text-muted-foreground leading-relaxed">
            Payments are processed through secure third-party payment processors. By making a payment, you agree to the terms and conditions of the payment processor. We are not responsible for any errors or issues with payment processing.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Subscription Services</h4>
          <p className="text-muted-foreground leading-relaxed">
            If you subscribe to any paid services, your subscription will automatically renew unless you cancel before the renewal date. You may cancel your subscription at any time through your account settings.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "ai-services",
    title: "AI Services and Screening",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Our Platform includes AI-powered services, including but not limited to IntelliScreen AI for interview screening and candidate evaluation. By using these services, you acknowledge and agree that:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>AI analysis and recommendations are provided for informational purposes and should not be the sole basis for hiring decisions</li>
          <li>You are responsible for verifying the accuracy and relevance of AI-generated insights</li>
          <li>We do not guarantee the accuracy, completeness, or reliability of AI-generated content</li>
          <li>Interview recordings and candidate data may be processed and analyzed by our AI systems</li>
          <li>You must obtain appropriate consent from candidates before using AI screening services</li>
        </ul>
      </div>
    ),
  },
  {
    id: "termination",
    title: "Termination",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Termination by You</h4>
          <p className="text-muted-foreground leading-relaxed">
            You may terminate your account at any time by contacting us or using the account deletion feature in your settings. Upon termination, your right to use the Services will immediately cease.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Termination by Us</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            We may suspend or terminate your account and access to the Services immediately, without prior notice, if:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>You violate these Terms or our policies</li>
            <li>You engage in fraudulent, abusive, or illegal activity</li>
            <li>We are required to do so by law</li>
            <li>You fail to pay applicable fees</li>
            <li>We discontinue or modify the Services</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Effect of Termination</h4>
          <p className="text-muted-foreground leading-relaxed">
            Upon termination, your right to use the Services will immediately cease. We may delete your account and User Content, subject to our data retention policies. Provisions of these Terms that by their nature should survive termination will survive.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers and Limitation of Liability",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Service Availability</h4>
          <p className="text-muted-foreground leading-relaxed">
            We strive to provide reliable Services but do not guarantee that the Services will be available, uninterrupted, or error-free. The Services are provided "as is" and "as available" without warranties of any kind.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">No Warranty</h4>
          <p className="text-muted-foreground leading-relaxed">
            We disclaim all warranties, express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, and non-infringement. We do not warrant that the Services will meet your requirements or that the operation of the Services will be uninterrupted or error-free.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Limitation of Liability</h4>
          <p className="text-muted-foreground leading-relaxed">
            To the maximum extent permitted by law, Nxtbeings and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your use of the Services.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          You agree to indemnify, defend, and hold harmless Nxtbeings, its affiliates, officers, directors, employees, agents, and licensors from and against any claims, liabilities, damages, losses, costs, or expenses (including reasonable attorneys' fees) arising out of or relating to:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Your use of the Services</li>
          <li>Your violation of these Terms</li>
          <li>Your violation of any rights of another party</li>
          <li>Your User Content</li>
          <li>Any activity related to your account</li>
        </ul>
      </div>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law and Dispute Resolution",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Governing Law</h4>
          <p className="text-muted-foreground leading-relaxed">
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Nxtbeings operates, without regard to its conflict of law provisions.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Dispute Resolution</h4>
          <p className="text-muted-foreground leading-relaxed">
            Any disputes arising out of or relating to these Terms or the Services shall be resolved through binding arbitration in accordance with the rules of the applicable arbitration organization, except where prohibited by law. You waive any right to a jury trial or to participate in a class action lawsuit.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "changes",
    title: "Changes to Terms",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We reserve the right to modify these Terms at any time. We will notify you of material changes by:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Posting the updated Terms on this page</li>
          <li>Updating the "Last Updated" date</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Your continued use of the Services after such changes constitutes acceptance of the updated Terms. If you do not agree to the changes, you must stop using the Services and terminate your account.
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
          If you have any questions about these Terms of Service, please contact us:
        </p>
        <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Email</p>
              <a href="mailto:legal@nxtbeings.com" className="text-primary hover:underline">
                legal@nxtbeings.com
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

export default function TermsOfServicePage() {
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
            <Scale className="w-4 h-4" />
            Terms of Service
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Terms of Service
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Please read these terms carefully before using our platform. By using Nxtbeings, you agree to be bound by these terms.
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
                      {index === 1 && <Users className="w-5 h-5 text-primary" />}
                      {index === 2 && <Shield className="w-5 h-5 text-primary" />}
                      {index === 3 && <Ban className="w-5 h-5 text-primary" />}
                      {index === 4 && <FileText className="w-5 h-5 text-primary" />}
                      {index === 5 && <CreditCard className="w-5 h-5 text-primary" />}
                      {index === 6 && <Shield className="w-5 h-5 text-primary" />}
                      {index === 7 && <AlertCircle className="w-5 h-5 text-primary" />}
                      {index === 8 && <Scale className="w-5 h-5 text-primary" />}
                      {index === 9 && <Shield className="w-5 h-5 text-primary" />}
                      {index === 10 && <Gavel className="w-5 h-5 text-primary" />}
                      {index === 11 && <FileText className="w-5 h-5 text-primary" />}
                      {index === 12 && <Mail className="w-5 h-5 text-primary" />}
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

