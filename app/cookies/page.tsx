"use client";

import React from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Cookie, Settings, Eye, BarChart3, Target, Shield, Database, Mail, Info, FileText } from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          This Cookie Policy explains how Nxtbeings ("we," "our," or "us") uses cookies and similar tracking technologies on our website and platform. This policy should be read alongside our Privacy Policy, which provides additional information about how we collect, use, and protect your personal information.
        </p>
        <p className="text-muted-foreground leading-relaxed">
          By using our website and services, you consent to the use of cookies in accordance with this Cookie Policy. If you do not agree to our use of cookies, you should disable cookies in your browser settings or refrain from using our website.
        </p>
      </div>
    ),
  },
  {
    id: "what-are-cookies",
    title: "What Are Cookies?",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          Cookies are small text files that are placed on your device (computer, tablet, or mobile) when you visit a website. Cookies are widely used to make websites work more efficiently and to provide information to website owners.
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2">How Cookies Work</h4>
          <p className="text-muted-foreground leading-relaxed">
            When you visit our website, we may send one or more cookies to your device. These cookies allow us to recognize your device and remember information about your visit, such as your preferred language and other settings. This makes your next visit easier and the site more useful to you.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Types of Cookies We Use</h4>
          <p className="text-muted-foreground leading-relaxed">
            We use both "session cookies" (which expire when you close your browser) and "persistent cookies" (which remain on your device until they expire or you delete them).
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "types-of-cookies",
    title: "Types of Cookies We Use",
    content: (
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            These cookies are necessary for the website to function properly. They enable core functionality such as security, network management, and accessibility. Without these cookies, services you have requested cannot be provided.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Authentication cookies to keep you logged in</li>
            <li>Security cookies to protect against fraud</li>
            <li>Load balancing cookies to distribute traffic</li>
            <li>Session management cookies</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Analytics and Performance Cookies</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. They allow us to improve the way our website works.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Page views and navigation patterns</li>
            <li>Time spent on pages</li>
            <li>Error messages and performance issues</li>
            <li>User flow and interaction data</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Functional Cookies</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            These cookies enable the website to provide enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Language preferences</li>
            <li>Region and timezone settings</li>
            <li>User interface preferences</li>
            <li>Remembered login information</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Targeting and Advertising Cookies</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            These cookies may be set through our site by our advertising partners. They may be used to build a profile of your interests and show you relevant content on other sites.
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>Interest-based advertising</li>
            <li>Cross-site tracking</li>
            <li>Ad performance measurement</li>
            <li>Audience segmentation</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "third-party-cookies",
    title: "Third-Party Cookies",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          In addition to our own cookies, we may also use various third-party cookies to report usage statistics, deliver advertisements, and provide other services. These third parties may include:
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Analytics Providers</h4>
          <p className="text-muted-foreground leading-relaxed">
            We use analytics services to help us understand how users interact with our website. These services may use cookies to collect information about your use of our website.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Advertising Partners</h4>
          <p className="text-muted-foreground leading-relaxed">
            We may work with advertising partners to deliver relevant advertisements. These partners may use cookies to track your browsing activity across different websites.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Social Media Platforms</h4>
          <p className="text-muted-foreground leading-relaxed">
            Our website may include social media features that allow you to share content. These features may set cookies to enable functionality.
          </p>
        </div>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We do not control these third-party cookies. Please refer to the privacy policies of these third parties for information about their cookie practices.
        </p>
      </div>
    ),
  },
  {
    id: "cookie-management",
    title: "Managing Your Cookie Preferences",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Browser Settings</h4>
          <p className="text-muted-foreground leading-relaxed mb-3">
            You can control cookies through your browser settings. Here are links to instructions for popular browsers:
          </p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google Chrome</a></li>
            <li><a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Mozilla Firefox</a></li>
            <li><a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Safari</a></li>
            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Microsoft Edge</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Impact of Disabling Cookies</h4>
          <p className="text-muted-foreground leading-relaxed">
            Please note that disabling cookies may impact your experience on our website. Some features may not function properly if cookies are disabled, and you may not be able to access certain parts of our website or use certain features.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Cookie Consent</h4>
          <p className="text-muted-foreground leading-relaxed">
            When you first visit our website, you may see a cookie consent banner. You can manage your cookie preferences at any time through your account settings or by contacting us.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "other-tracking",
    title: "Other Tracking Technologies",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          In addition to cookies, we may use other tracking technologies, including:
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Web Beacons</h4>
          <p className="text-muted-foreground leading-relaxed">
            Small graphic images (also known as "pixel tags" or "clear GIFs") that may be included in our emails and web pages. Web beacons allow us to track whether emails have been opened and whether links have been clicked.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Local Storage</h4>
          <p className="text-muted-foreground leading-relaxed">
            We may use HTML5 local storage to store information about your preferences and settings. Local storage is similar to cookies but stored locally on your device.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Fingerprinting</h4>
          <p className="text-muted-foreground leading-relaxed">
            We may use device fingerprinting technologies to identify your device based on its unique characteristics, such as browser type, screen resolution, and installed plugins.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "data-retention",
    title: "Cookie Retention",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          The length of time a cookie remains on your device depends on whether it is a "persistent" or "session" cookie:
        </p>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-4">Session Cookies</h4>
          <p className="text-muted-foreground leading-relaxed">
            These cookies are temporary and are deleted when you close your browser. They are used to maintain your session while you navigate our website.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-foreground mb-2 mt-6">Persistent Cookies</h4>
          <p className="text-muted-foreground leading-relaxed">
            These cookies remain on your device for a set period or until you delete them. They are used to remember your preferences and settings for future visits. The retention period varies depending on the type of cookie and its purpose.
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "updates",
    title: "Updates to This Cookie Policy",
    content: (
      <div className="space-y-4">
        <p className="text-muted-foreground leading-relaxed">
          We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
        </p>
        <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
          <li>Posting the updated policy on this page</li>
          <li>Updating the "Last Updated" date</li>
          <li>Sending you an email notification (for significant changes)</li>
        </ul>
        <p className="text-muted-foreground leading-relaxed mt-4">
          We encourage you to review this Cookie Policy periodically to stay informed about our use of cookies and tracking technologies.
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
          If you have any questions about our use of cookies or this Cookie Policy, please contact us:
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

export default function CookiePolicyPage() {
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
            <Cookie className="w-4 h-4" />
            Cookie Policy
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6"
          >
            Cookie Policy
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
          >
            Learn about how we use cookies and similar tracking technologies to enhance your experience on our platform.
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
                      {index === 1 && <Cookie className="w-5 h-5 text-primary" />}
                      {index === 2 && <Settings className="w-5 h-5 text-primary" />}
                      {index === 3 && <Database className="w-5 h-5 text-primary" />}
                      {index === 4 && <Settings className="w-5 h-5 text-primary" />}
                      {index === 5 && <Eye className="w-5 h-5 text-primary" />}
                      {index === 6 && <Database className="w-5 h-5 text-primary" />}
                      {index === 7 && <FileText className="w-5 h-5 text-primary" />}
                      {index === 8 && <Mail className="w-5 h-5 text-primary" />}
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

