"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (email === "admin@sri.com" && password === "admin123") {
        sessionStorage.setItem("admin_auth", "true");
        router.push("/admin");
      } else {
        setError("Invalid Credentials");
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#F8FAFC",
        padding: "1rem",
        position: "relative",
      }}
    >
      {/* Back to site */}
      <a
        href="/"
        style={{
          position: "absolute",
          top: "1.5rem",
          left: "1.5rem",
          display: "flex",
          alignItems: "center",
          gap: "0.4rem",
          fontFamily: "system-ui",
          fontSize: "0.875rem",
          color: "#6B7280",
          textDecoration: "none",
          transition: "color 0.2s",
        }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#111827"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "#6B7280"; }}
      >
        ← Back to site
      </a>

      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          padding: "2.5rem",
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "2rem" }}>
          <div style={{ width: "60px", height: "60px", position: "relative" }}>
            <Image
              src="/assets/logo.jpg"
              alt="SRI Logo"
              fill
              style={{ objectFit: "cover", borderRadius: "8px" }}
            />
          </div>
        </div>

        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "1.75rem",
            fontWeight: "600",
            color: "#111827",
            textAlign: "center",
            marginBottom: "0.5rem",
          }}
        >
          Admin Login
        </h1>
        <p
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "0.875rem",
            color: "#6B7280",
            textAlign: "center",
            marginBottom: "2rem",
          }}
        >
          Sign in to access the admin dashboard
        </p>

        {/* Demo Credentials */}
        <div
          style={{
            padding: "0.875rem 1rem",
            backgroundColor: "#F0F9FF",
            border: "1px solid #BAE6FD",
            borderRadius: "6px",
            marginBottom: "1.5rem",
          }}
        >
          <p
            style={{
              fontFamily: "system-ui",
              fontSize: "0.75rem",
              fontWeight: "600",
              color: "#0369A1",
              margin: "0 0 0.5rem 0",
            }}
          >
            Demo Credentials:
          </p>
          <p
            style={{
              fontFamily: "system-ui",
              fontSize: "0.75rem",
              color: "#0369A1",
              margin: 0,
            }}
          >
            Email: <strong>admin@sri.com</strong><br />
            Password: <strong>admin123</strong>
          </p>
        </div>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {error && (
            <div
              style={{
                padding: "0.75rem 1rem",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FCA5A5",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#DC2626",
              }}
            >
              {error}
            </div>
          )}

          <div>
            <label
              style={{
                display: "block",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@sri.com"
              required
              style={{
                width: "100%",
                padding: "0.65rem 0.875rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                backgroundColor: "#FFFFFF",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#111827"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; }}
            />
          </div>

          <div>
            <label
              style={{
                display: "block",
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••"
              required
              style={{
                width: "100%",
                padding: "0.65rem 0.875rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                backgroundColor: "#FFFFFF",
                outline: "none",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#111827"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "#E5E7EB"; }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: loading ? "#6B7280" : "#111827",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "6px",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "0.875rem",
              fontWeight: "500",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#000000";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.backgroundColor = "#111827";
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
