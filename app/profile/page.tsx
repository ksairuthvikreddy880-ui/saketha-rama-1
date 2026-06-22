"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const auth = sessionStorage.getItem("user_auth");
    const name = sessionStorage.getItem("user_name");
    const email = sessionStorage.getItem("user_email");

    if (auth !== "true") {
      router.push("/auth");
      return;
    }

    setUserName(name || "");
    setUserEmail(email || "");
    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <p style={{ fontFamily: "Georgia, serif", color: "#6B7280" }}>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <main style={{ minHeight: "calc(100vh - 52px)", backgroundColor: "#F8FAFC", padding: "3rem 1.5rem" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Welcome Section */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "2.5rem",
              marginBottom: "2rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", marginBottom: "2rem" }}>
              {/* Profile Avatar */}
              <div
                style={{
                  width: "80px",
                  height: "80px",
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "Georgia, serif",
                  fontSize: "2rem",
                  fontWeight: "600",
                  color: "#FFFFFF",
                }}
              >
                {userName.charAt(0).toUpperCase()}
              </div>

              {/* Welcome Text */}
              <div>
                <h1
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "2rem",
                    fontWeight: "600",
                    color: "#111827",
                    margin: "0 0 0.5rem 0",
                  }}
                >
                  Welcome back, {userName}!
                </h1>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    color: "#6B7280",
                    margin: 0,
                  }}
                >
                  Manage your account and preferences
                </p>
              </div>
            </div>

            {/* User Info */}
            <div style={{ borderTop: "1px solid #E5E7EB", paddingTop: "1.5rem" }}>
              <div style={{ marginBottom: "1.25rem" }}>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Georgia, serif",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.5rem",
                  }}
                >
                  Full Name
                </label>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    color: "#374151",
                    margin: 0,
                  }}
                >
                  {userName}
                </p>
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontFamily: "Georgia, serif",
                    fontSize: "0.875rem",
                    fontWeight: "600",
                    color: "#111827",
                    marginBottom: "0.5rem",
                  }}
                >
                  Email Address
                </label>
                <p
                  style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1rem",
                    color: "#374151",
                    margin: 0,
                  }}
                >
                  {userEmail}
                </p>
              </div>
            </div>
          </div>

          {/* Account Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1.5rem", marginBottom: "2rem" }}>
            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  margin: "0 0 0.5rem 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Account Status
              </h3>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#10B981",
                  margin: 0,
                }}
              >
                Active
              </p>
            </div>

            <div
              style={{
                backgroundColor: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: "12px",
                padding: "1.5rem",
                boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
              }}
            >
              <h3
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "0.875rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  margin: "0 0 0.5rem 0",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Member Since
              </h3>
              <p
                style={{
                  fontFamily: "Georgia, serif",
                  fontSize: "1.125rem",
                  fontWeight: "600",
                  color: "#111827",
                  margin: 0,
                }}
              >
                {new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" })}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "2rem",
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.25rem",
                fontWeight: "600",
                color: "#111827",
                margin: "0 0 1.5rem 0",
              }}
            >
              Quick Actions
            </h2>

            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              <a
                href="/"
                style={{
                  display: "block",
                  padding: "1rem",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontFamily: "Georgia, serif",
                  fontSize: "0.9375rem",
                  color: "#111827",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EFF6FF";
                  e.currentTarget.style.borderColor = "#3B82F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F8FAFC";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                }}
              >
                🏠 Back to Homepage
              </a>

              <a
                href="#contact"
                style={{
                  display: "block",
                  padding: "1rem",
                  backgroundColor: "#F8FAFC",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                  fontFamily: "Georgia, serif",
                  fontSize: "0.9375rem",
                  color: "#111827",
                  textDecoration: "none",
                  transition: "all 0.15s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#EFF6FF";
                  e.currentTarget.style.borderColor = "#3B82F6";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#F8FAFC";
                  e.currentTarget.style.borderColor = "#E5E7EB";
                }}
              >
                📧 Contact Support
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
