"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import GoogleAuthButton from "./GoogleAuthButton";

export default function AuthCard() {
  const [tab, setTab] = useState<"signin" | "signup">("signin");

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderRadius: "20px",
        boxShadow: "0 25px 60px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.8)",
        padding: "2.5rem",
        margin: "0 auto",
      }}
    >
      {/* Tabs */}
      <div
        style={{
          display: "flex",
          backgroundColor: "#f1f5f9",
          borderRadius: "10px",
          padding: "4px",
          marginBottom: "2rem",
          position: "relative",
        }}
      >
        {(["signin", "signup"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              flex: 1,
              padding: "0.55rem",
              border: "none",
              borderRadius: "8px",
              fontFamily: "Georgia, serif",
              fontSize: "0.875rem",
              cursor: "pointer",
              position: "relative",
              zIndex: 1,
              transition: "color 0.2s",
              background: "transparent",
              color: tab === t ? "#1a1a2e" : "#6b7280",
              fontWeight: tab === t ? "700" : "400",
            }}
          >
            {tab === t && (
              <motion.div
                layoutId="tab-bg"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundColor: "#ffffff",
                  borderRadius: "8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  zIndex: -1,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            )}
            {t === "signin" ? "Sign In" : "Sign Up"}
          </button>
        ))}
      </div>

      {/* Heading */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.4rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "0.35rem" }}>
          {tab === "signin" ? "Welcome back" : "Create account"}
        </h2>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#6b7280" }}>
          {tab === "signin" ? "Sign in to your SRI account" : "Join Sri Saketha Rama Innovations"}
        </p>
      </div>

      {/* Form */}
      <AnimatePresence mode="wait">
        <motion.div key={tab}>
          {tab === "signin" ? <SignInForm /> : <SignUpForm />}
        </motion.div>
      </AnimatePresence>

      {/* Divider */}
      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", margin: "1.5rem 0" }}>
        <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
        <span style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#94a3b8", whiteSpace: "nowrap" }}>OR</span>
        <div style={{ flex: 1, height: "1px", backgroundColor: "#e2e8f0" }} />
      </div>

      <GoogleAuthButton />
    </div>
  );
}
