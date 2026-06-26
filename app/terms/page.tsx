import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions | Sri Saketha Rama Innovations",
  description: "Terms and Conditions for using Sri Saketha Rama Innovations website and services.",
};

const sections = [
  {
    title: "1. Acceptance of Terms",
    content: `By accessing and using the Sri Saketha Rama Innovations website (the "Site") or any services provided by Sri Saketha Rama Innovations ("SRI", "we", "our", or "us"), you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our Site or services.`,
  },
  {
    title: "2. Description of Services",
    content: `Sri Saketha Rama Innovations provides technology consulting and development services including, but not limited to:

• System Design & Development
• SaaS Solutions & Testing
• IT Infrastructure Management
• Tech Support Services
• Product Development
• Advanced AI & Web 4.0 Solutions
• Problem Solving & Consulting
• Contracting & Staffing Solutions
• Cost Plus IT Services

The scope, timeline, and cost of specific services are defined in individual service agreements or proposals.`,
  },
  {
    title: "3. User Accounts",
    content: `To access certain features of our Site, you may create an account. You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use of your account

You must provide accurate, current, and complete information when creating an account. We reserve the right to suspend or terminate accounts that violate these terms.`,
  },
  {
    title: "4. Intellectual Property",
    content: `All content on this Site — including text, graphics, logos, images, and software — is the property of Sri Saketha Rama Innovations or its content suppliers and is protected by applicable intellectual property laws.

You may not reproduce, distribute, modify, create derivative works, or publicly display any content from this Site without our prior written permission.

Work products delivered to clients under specific service agreements are governed by the terms of those agreements.`,
  },
  {
    title: "5. Acceptable Use",
    content: `You agree not to use our Site or services to:

• Violate any applicable laws or regulations
• Transmit harmful, offensive, or fraudulent content
• Attempt to gain unauthorized access to our systems
• Interfere with or disrupt the integrity of our services
• Collect or harvest personal information without consent
• Use automated tools to scrape or crawl our Site
• Impersonate any person or entity

We reserve the right to terminate access for any user who violates these restrictions.`,
  },
  {
    title: "6. Contact Form and Communications",
    content: `When you submit information through our contact form, you agree that:

• The information you provide is accurate and truthful
• You authorize us to use that information to respond to your enquiry
• Attachments you submit do not contain malicious software or infringe third-party rights
• We may retain communications for business record purposes

We aim to respond to all enquiries within 1-2 business days.`,
  },
  {
    title: "7. Disclaimer of Warranties",
    content: `Our Site and services are provided "as is" and "as available" without warranties of any kind, either express or implied. To the fullest extent permitted by law, SRI disclaims all warranties including:

• Warranties of merchantability or fitness for a particular purpose
• Warranties that the Site will be uninterrupted, error-free, or secure
• Warranties regarding the accuracy or completeness of content

Technology services involve inherent risks and we cannot guarantee specific outcomes.`,
  },
  {
    title: "8. Limitation of Liability",
    content: `To the maximum extent permitted by applicable law, Sri Saketha Rama Innovations shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from:

• Your use of or inability to use our Site or services
• Unauthorized access to or alteration of your data
• Any content or conduct of third parties
• Any other matter relating to our services

Our total liability for any claim shall not exceed the amount paid by you for the specific service giving rise to the claim in the three months preceding the claim.`,
  },
  {
    title: "9. Third-Party Links",
    content: `Our Site may contain links to third-party websites. These links are provided for convenience only. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites. We encourage you to review the terms and privacy policies of any third-party sites you visit.`,
  },
  {
    title: "10. Governing Law",
    content: `These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Hyderabad, Telangana, India.`,
  },
  {
    title: "11. Changes to Terms",
    content: `We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to the Site. Your continued use of the Site after any changes constitutes your acceptance of the new terms. We encourage you to review these terms periodically.`,
  },
  {
    title: "12. Contact Information",
    content: `If you have any questions about these Terms and Conditions, please contact us:

Sri Saketha Rama Innovations
Plot No 118, Phase 2, Kavuri Hills, Madhopur
Hyderabad, Telangana, India

Email: saketharamainnovations@gmail.com
Phone: +91.7893059116`,
  },
];

export default function TermsPage() {
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
            Terms & Conditions
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#6B7280" }}>
            Last updated: June 26, 2026 &nbsp;·&nbsp; Sri Saketha Rama Innovations
          </p>
        </div>

        {/* Intro */}
        <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#374151", lineHeight: "1.9", marginBottom: "2.5rem" }}>
          Please read these Terms and Conditions carefully before using the Sri Saketha Rama Innovations website or engaging our services. These terms constitute a legally binding agreement between you and Sri Saketha Rama Innovations.
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
          <Link href="/privacy-policy" style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#4a9ea1", textDecoration: "none", borderBottom: "1px solid #4a9ea1" }}>
            Privacy Policy →
          </Link>
          <Link href="/" style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
