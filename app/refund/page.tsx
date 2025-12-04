"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { RefreshCw, CreditCard, Clock, AlertCircle, CheckCircle, XCircle, Mail, FileText, Info } from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          This Refund Policy ("Policy") outlines the terms and conditions under which Nxtbeings ("we," "our," or "us") provides refunds for our services. This policy applies to all purchases made through our platform, including but not limited to subscription services, one-time payments, and premium features.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          By making a purchase on our platform, you agree to this Refund Policy. Please read this policy carefully before making any purchase. If you have any questions, please contact us before completing your purchase.
        </p>
      </div>
    ),
  },
  {
    id: "general-policy",
    title: "General Refund Policy",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Our general policy regarding refunds is as follows:
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2">Refund Eligibility</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Refunds may be available under the following circumstances:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Service not delivered as described</li>
            <li>Technical issues preventing service access</li>
            <li>Duplicate or accidental charges</li>
            <li>Billing errors</li>
            <li>Within the refund period specified for your service type</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Non-Refundable Items</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            The following are generally not eligible for refunds:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Services that have been fully consumed or used</li>
            <li>Digital products that have been downloaded or accessed</li>
            <li>Services purchased more than the specified refund period ago</li>
            <li>Third-party service fees or charges</li>
            <li>Processing fees</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "subscription-refunds",
    title: "Subscription Services",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Monthly Subscriptions</h4>
          <p className="text-muted-foreground leading-relaxed">
            For monthly subscription services, you may request a refund within 7 days of the initial purchase or renewal. Refunds will be prorated based on the unused portion of the subscription period. After the 7-day period, no refunds will be provided, but you may cancel your subscription to prevent future charges.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Annual Subscriptions</h4>
          <p className="text-muted-foreground leading-relaxed">
            For annual subscription services, you may request a refund within 30 days of purchase. Refunds will be prorated based on the unused portion of the subscription period. After 30 days, refunds are not available, but you may cancel to prevent renewal.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Cancellation</h4>
          <p className="text-muted-foreground leading-relaxed">
            You may cancel your subscription at any time through your account settings. Cancellation will take effect at the end of your current billing period. You will continue to have access to the service until the end of the paid period, and no refund will be provided for the remaining period unless you are within the refund window.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "one-time-payments",
    title: "One-Time Payments",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Premium Features</h4>
          <p className="text-muted-foreground leading-relaxed">
            For one-time payments for premium features or services, refunds may be available within 14 days of purchase if the service has not been fully utilized. Once a service has been completed or fully consumed, no refund will be provided.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">AI Services</h4>
          <p className="text-muted-foreground leading-relaxed">
            For AI-powered services such as IntelliScreen AI interview screening, refunds may be available if the service fails to function as described or if technical issues prevent service delivery. Refund requests must be made within 7 days of service completion or attempted use.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "refund-process",
    title: "Refund Request Process",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">How to Request a Refund</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            To request a refund, please follow these steps:
          </p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
            <li>Contact our support team at <a href="mailto:support@nxtbeings.com" className="text-primary hover:underline">support@nxtbeings.com</a> or through your account dashboard</li>
            <li>Provide your order number or transaction ID</li>
            <li>Explain the reason for your refund request</li>
            <li>Include any relevant documentation or screenshots</li>
          </ol>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Review Process</h4>
          <p className="text-muted-foreground leading-relaxed">
            We will review your refund request within 5-7 business days. We may contact you for additional information if needed. Once approved, refunds will be processed to the original payment method within 10-14 business days.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Refund Processing Time</h4>
          <p className="text-muted-foreground leading-relaxed">
            Refunds are typically processed within 10-14 business days after approval. The time it takes for the refund to appear in your account depends on your payment provider and may take additional time.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "special-circumstances",
    title: "Special Circumstances",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Technical Issues</h4>
          <p className="text-muted-foreground leading-relaxed">
            If you experience technical issues that prevent you from using our services, please contact our support team immediately. We will work to resolve the issue. If we are unable to resolve the issue within a reasonable time, a full or partial refund may be provided at our discretion.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Billing Errors</h4>
          <p className="text-muted-foreground leading-relaxed">
            If you believe you have been charged incorrectly, please contact us immediately. We will investigate the issue and provide a full refund if an error is confirmed.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Service Discontinuation</h4>
          <p className="text-muted-foreground leading-relaxed">
            If we discontinue a service that you have paid for, we will provide a prorated refund for the unused portion of your subscription or payment.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Force Majeure</h4>
          <p className="text-muted-foreground leading-relaxed">
            In cases of force majeure events (natural disasters, pandemics, etc.) that prevent service delivery, we will work with affected users on a case-by-case basis to provide appropriate refunds or credits.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "chargebacks",
    title: "Chargebacks and Disputes",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          If you initiate a chargeback or dispute with your payment provider, we may suspend your account until the dispute is resolved. We encourage you to contact us directly first to resolve any issues, as we can often resolve problems more quickly than the chargeback process.
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Chargeback Fees</h4>
          <p className="text-muted-foreground leading-relaxed">
            If a chargeback is filed and later determined to be invalid, you may be responsible for any associated fees. We reserve the right to recover these costs.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "refund-methods",
    title: "Refund Methods",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Refunds will be issued to the original payment method used for the purchase:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li><strong>Credit/Debit Cards:</strong> Refunds will be processed to the original card within 10-14 business days</li>
          <li><strong>PayPal:</strong> Refunds will be processed to your PayPal account</li>
          <li><strong>Bank Transfers:</strong> Refunds may take 5-10 business days to process</li>
          <li><strong>Other Payment Methods:</strong> Refunds will be processed according to the payment provider's policies</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          If the original payment method is no longer available, we may issue a refund via an alternative method at our discretion.
        </p>
      </div>
    ),
  },
  {
    id: "exceptions",
    title: "Exceptions and Limitations",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Processing Fees</h4>
          <p className="text-muted-foreground leading-relaxed">
            Processing fees charged by payment providers are generally non-refundable. However, if a refund is issued due to our error, we will cover all associated fees.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Third-Party Services</h4>
          <p className="text-muted-foreground leading-relaxed">
            Refunds for third-party services integrated into our platform are subject to the third-party provider's refund policy. We will assist you in contacting the third-party provider when possible.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Promotional Offers</h4>
          <p className="text-muted-foreground leading-relaxed">
            Special promotional offers, discounts, or free trials may have different refund terms. These terms will be clearly stated at the time of purchase.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "updates",
    title: "Policy Updates",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We reserve the right to update this Refund Policy at any time. Changes will be effective immediately upon posting on this page. We will notify you of material changes by:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Posting the updated policy on this page</li>
          <li>Updating the "Last Updated" date</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          Your continued use of our services after changes to this policy constitutes acceptance of the updated terms.
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
          If you have any questions about this Refund Policy or need to request a refund, please contact us:
        </p>
        <div className="bg-primary/5 rounded-xl border border-primary/20 p-6 space-y-3">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-primary" />
            <div>
              <p className="font-semibold text-foreground">Support Email</p>
              <a href="mailto:support@nxtbeings.com" className="text-primary hover:underline">
                support@nxtbeings.com
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
        <p className="text-muted-foreground leading-relaxed mt-4">
          For faster processing, please include your order number, transaction ID, and a detailed explanation of your refund request.
        </p>
      </div>
    ),
  },
];

export default function RefundPolicyPage() {
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
            <RefreshCw className="w-4 h-4" />
            Refund Policy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Refund Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Learn about our refund policy, eligibility criteria, and how to request a refund for our services.
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
                      {index === 0 && <Info className="w-5 h-5 text-primary" />}
                      {index === 1 && <CheckCircle className="w-5 h-5 text-primary" />}
                      {index === 2 && <CreditCard className="w-5 h-5 text-primary" />}
                      {index === 3 && <CreditCard className="w-5 h-5 text-primary" />}
                      {index === 4 && <RefreshCw className="w-5 h-5 text-primary" />}
                      {index === 5 && <AlertCircle className="w-5 h-5 text-primary" />}
                      {index === 6 && <XCircle className="w-5 h-5 text-primary" />}
                      {index === 7 && <CreditCard className="w-5 h-5 text-primary" />}
                      {index === 8 && <AlertCircle className="w-5 h-5 text-primary" />}
                      {index === 9 && <FileText className="w-5 h-5 text-primary" />}
                      {index === 10 && <Mail className="w-5 h-5 text-primary" />}
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

