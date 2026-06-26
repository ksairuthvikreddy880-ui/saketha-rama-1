import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Sri Saketha Rama Innovations",
  description: "Privacy Policy for Sri Saketha Rama Innovations — how we collect, use, and protect your data.",
};

const sections = [
  {
    title: "1. Information We Collect",
    content: `We collect information you provide directly to us, such as when you:
    
• Fill out our contact form (name, email address, project description, attachments)
• Create an account on our platform (name, email, password)
• Sign in using Google OAuth (name, email, profile picture from your Google account)
• Subscribe to our newsletter (email address)
• Interact with our website or services

We may also collect technical information automatically, including IP address, browser type, operating system, pages visited, and time spent on our site through standard server logs.`,
  },
  {
    title: "2. How We Use Your Information",
    content: `We use the information we collect to:

• Respond to your enquiries and provide customer support
• Process and fulfil service requests
• Send newsletters and updates you have opted into
• Improve our website and services
• Comply with legal obligations
• Protect against fraud and unauthorized access

We do not sell, rent, or trade your personal information to third parties.`,
  },
  {
    title: "3. Data Storage and Security",
    content: `Your data is stored securely in MongoDB Atlas (cloud database) with industry-standard encryption. We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.

Passwords are hashed using bcrypt and are never stored in plain text. File attachments sent via our contact form are stored as encrypted data and are accessible only to authorized administrators.`,
  },
  {
    title: "4. Google Sign In",
    content: `If you choose to sign in using Google OAuth, we receive your name, email address, and profile picture from Google. We use this information solely to create and manage your account on our platform. We do not receive your Google password or access to your Google account beyond what is required for authentication.

Your use of Google Sign In is also subject to Google's Privacy Policy: https://policies.google.com/privacy`,
  },
  {
    title: "5. Cookies",
    content: `Our website uses minimal cookies necessary for functionality. We use session storage (not persistent cookies) for authentication purposes. These are cleared when you close your browser.

We do not use tracking cookies or third-party advertising cookies.`,
  },
  {
    title: "6. Third-Party Services",
    content: `Our website uses the following third-party services:

• Google OAuth — for sign in functionality
• MongoDB Atlas — for secure data storage
• Vercel — for website hosting

Each of these services has their own privacy policy and data handling practices. We recommend reviewing their policies for full details.`,
  },
  {
    title: "7. Data Retention",
    content: `We retain your personal data for as long as necessary to provide our services or as required by applicable law. You may request deletion of your account and associated data at any time by contacting us at saketharamainnovations@gmail.com.

Contact form submissions are retained for business correspondence purposes and may be deleted upon request.`,
  },
  {
    title: "8. Your Rights",
    content: `Depending on your location, you may have the following rights regarding your personal data:

• Right to access — request a copy of the data we hold about you
• Right to rectification — request correction of inaccurate data
• Right to erasure — request deletion of your data
• Right to restrict processing — request we limit how we use your data
• Right to data portability — receive your data in a portable format
• Right to object — object to certain types of processing

To exercise any of these rights, contact us at saketharamainnovations@gmail.com.`,
  },
  {
    title: "9. Children's Privacy",
    content: `Our services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will promptly delete it.`,
  },
  {
    title: "10. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the bottom of this page. Continued use of our services after changes constitutes acceptance of the updated policy.`,
  },
  {
    title: "11. Contact Us",
    content: `If you have any questions about this Privacy Policy or our data practices, please contact us:

Sri Saketha Rama Innovations
Plot No 118, Phase 2, Kavuri Hills, Madhopur
Hyderabad, Telangana, India

Email: saketharamainnovations@gmail.com
Phone: +91.7893059116`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "Georgia, serif" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#4a4a4a", padding: "0 1rem" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", height: "52px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link href="/" style={{ color: "#ffffff", textDecoration: "none", fontFamily: "Georgia, serif", fontSize: "1rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
            SRI Saketha Rama Innovations
          </Link>
          <Link href="/" style={{ color: "#cccccc", textDecoration: "none", fontFamily: "Georgia, serif", fontSize: "0.8rem" }}>
            ← Back to Home
          </Link>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "820px", margin: "0 auto", padding: "3rem 1.5rem 5rem" }}>
        {/* Title */}
        <div style={{ marginBottom: "2.5rem", paddingBottom: "2rem", borderBottom: "1px solid #E5E7EB" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#9CA3AF", marginBottom: "0.75rem" }}>
            Legal
          </p>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: "700", color: "#111827", marginBottom: "0.75rem" }}>
            Privacy Policy
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#6B7280" }}>
            Last updated: June 26, 2026 &nbsp;·&nbsp; Sri Saketha Rama Innovations
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#374151", lineHeight: "1.9", marginBottom: "2.5rem" }}>
          Sri Saketha Rama Innovations ("SRI", "we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services. Please read this policy carefully.
        </p>

        {/* Sections */}
        {sections.map((section) => (
          <div key={section.title} style={{ marginBottom: "2.25rem" }}>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: "700", color: "#111827", marginBottom: "0.875rem" }}>
              {section.title}
            </h2>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9375rem", color: "#374151", lineHeight: "1.9", whiteSpace: "pre-line" }}>
              {section.content}
            </p>
          </div>
        ))}

        {/* Footer links */}
        <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #E5E7EB", display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
          <Link href="/terms" style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#4a9ea1", textDecoration: "none", borderBottom: "1px solid #4a9ea1" }}>
            Terms & Conditions →
          </Link>
          <Link href="/" style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
