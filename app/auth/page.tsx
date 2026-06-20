import type { Metadata } from "next";
import AuthAnimation from "@/components/auth/AuthAnimation";
import AuthCard from "@/components/auth/AuthCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sign In | Sri Saketha Rama Innovations",
  description: "Sign in or create an account to access SRI platform.",
};

export default function AuthPage() {
  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        flexDirection: "row",
      }}
    >
      {/* LEFT — Animation panel (hidden on mobile) */}
      <div
        style={{
          flex: "0 0 50%",
          position: "relative",
          display: "none",
        }}
        className="auth-left"
      >
        <AuthAnimation />
      </div>

      {/* RIGHT — Auth card */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          backgroundColor: "#f8fafc",
          minHeight: "100vh",
        }}
      >
        {/* Back to home */}
        <div style={{ position: "absolute", top: "1.25rem", left: "1.5rem", zIndex: 10 }}>
          <Link
            href="/"
            className="back-to-site-link"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "Georgia, serif",
              fontSize: "0.85rem",
              color: "#6b7280",
              textDecoration: "none",
              transition: "color 0.2s",
              cursor: "pointer",
            }}
          >
            ← Back to site
          </Link>
        </div>

        <AuthCard />
      </div>

      <style>{`
        @media (min-width: 768px) {
          .auth-left { display: block !important; }
        }
        .back-to-site-link:hover {
          color: #3b82f6 !important;
        }
      `}</style>
    </div>
  );
}
