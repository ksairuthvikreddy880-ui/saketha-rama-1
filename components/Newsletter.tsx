"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError("Enter a valid email address."); return; }
    setError("");
    // Redirect to sign up page with email pre-filled in query
    router.push(`/auth?email=${encodeURIComponent(email)}&mode=signup`);
  };

  return (
    <section
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        padding: "4rem 1rem",
        borderTop: "1px solid #eeeeee",
      }}
    >
      <div style={{ maxWidth: "700px", margin: "0 auto", textAlign: "center" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "400",
            color: "#333333",
            marginBottom: "0.75rem",
          }}
        >
          Subscribe
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "0.9375rem",
            color: "#666666",
            marginBottom: "2rem",
          }}
        >
          Sign up to hear from us about specials, sales, and events.
        </motion.p>

        {/* Form */}
          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0",
                maxWidth: "520px",
                margin: "0 auto",
                alignItems: "stretch",
              }}
            >
              {/* Email input */}
              <div style={{ flex: "1 1 200px" }}>
                <label htmlFor="nl-email" style={{ display: "none" }}>Email</label>
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError(""); }}
                  placeholder="Email"
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "44px",
                    border: "1px solid #cccccc",
                    borderRight: "none",
                    outline: "none",
                    padding: "0.65rem 1rem",
                    fontFamily: "Georgia, serif",
                    fontSize: "0.9375rem",
                    color: "#333333",
                    backgroundColor: "#ffffff",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              {/* Sign Up button */}
              <motion.button
                type="submit"
                whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                style={{
                  border: "1px solid #333333",
                  backgroundColor: "transparent",
                  padding: "0.65rem 1.25rem",
                  fontFamily: "Georgia, serif",
                  fontSize: "0.8rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "#333333",
                  cursor: "pointer",
                  whiteSpace: "nowrap",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  transition: "background-color 0.2s",
                  flex: "0 0 auto",
                }}
              >
                <span style={{ fontSize: "1rem" }}>—</span>
                SIGN UP
                <span style={{ fontSize: "1rem" }}>—</span>
              </motion.button>
            </div>

            {error && (
              <p style={{ color: "#cc3333", fontSize: "0.75rem", marginTop: "0.5rem", fontFamily: "Georgia, serif" }}>
                {error}
              </p>
            )}
          </form>
      </div>
    </section>
  );
}
