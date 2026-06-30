"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "1px solid #e2e8f0",
  borderRadius: "8px",
  outline: "none",
  padding: "0.75rem 1rem",
  fontFamily: "Georgia, serif",
  fontSize: "0.9375rem",
  color: "#1a1a2e",
  backgroundColor: "#f8fafc",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const EyeOpen = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const EyeClosed = () => (
  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
  </svg>
);

export default function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.name.trim()) e.name = "Full name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    else if (form.password.length < 8) e.password = "Password must be at least 8 characters.";
    if (!form.confirm) e.confirm = "Please confirm your password.";
    else if (form.password !== form.confirm) e.confirm = "Passwords do not match.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    
    setLoading(true);
    setErrors({});

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.error || "Failed to create account" });
        setLoading(false);
        return;
      }

      // Success
      setSuccess(true);
      setLoading(false);
    } catch (error) {
      setErrors({ general: "Network error. Please try again." });
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ textAlign: "center", padding: "2rem 0" }}
      >
        <div style={{ width: "56px", height: "56px", background: "linear-gradient(135deg, #0ea5e9, #6366f1)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1rem" }}>
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: "700", color: "#1a1a2e", marginBottom: "0.5rem" }}>Account Created!</p>
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#6b7280", lineHeight: "1.6", marginBottom: "1rem" }}>
          Your account has been created successfully.
        </p>
        <button
          onClick={() => window.location.href = "/auth"}
          style={{
            padding: "0.65rem 1.5rem",
            background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
            border: "none",
            borderRadius: "8px",
            color: "#ffffff",
            fontFamily: "Georgia, serif",
            fontSize: "0.875rem",
            cursor: "pointer",
          }}
        >
          Sign In Now
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
    >
      {errors.general && (
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "0.75rem 1rem" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#dc2626" }}>{errors.general}</p>
        </div>
      )}

      {[
        { key: "name", label: "Full Name", type: "text", autoComplete: "name" },
        { key: "email", label: "Email", type: "email", autoComplete: "email" },
      ].map(({ key, label, type, autoComplete }) => (
        <div key={key}>
          <label style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.4rem" }}>{label}</label>
          <input
            type={type}
            value={form[key as keyof typeof form] as string}
            onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: undefined })); }}
            placeholder=""
            autoComplete={autoComplete}
            style={{ ...inputStyle, borderColor: errors[key as keyof typeof errors] ? "#f87171" : "#e2e8f0" }}
          />
          {errors[key as keyof typeof errors] && (
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#dc2626", marginTop: "0.25rem" }}>
              {errors[key as keyof typeof errors]}
            </p>
          )}
        </div>
      ))}

      {/* Password with toggle */}
      <div>
        <label style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.4rem" }}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: undefined })); }}
            placeholder=""
            autoComplete="new-password"
            style={{ ...inputStyle, borderColor: errors.password ? "#f87171" : "#e2e8f0", paddingRight: "2.75rem" }}
          />
          <button type="button" onClick={() => setShowPassword(v => !v)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", alignItems: "center", padding: 0 }} aria-label="Toggle password">
            {showPassword ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>
        {errors.password && <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#dc2626", marginTop: "0.25rem" }}>{errors.password}</p>}
      </div>

      {/* Confirm Password with toggle */}
      <div>
        <label style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.4rem" }}>Confirm Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showConfirm ? "text" : "password"}
            value={form.confirm}
            onChange={e => { setForm(p => ({ ...p, confirm: e.target.value })); setErrors(p => ({ ...p, confirm: undefined })); }}
            placeholder=""
            autoComplete="new-password"
            style={{ ...inputStyle, borderColor: errors.confirm ? "#f87171" : "#e2e8f0", paddingRight: "2.75rem" }}
          />
          <button type="button" onClick={() => setShowConfirm(v => !v)} style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", alignItems: "center", padding: 0 }} aria-label="Toggle confirm password">
            {showConfirm ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>
        {errors.confirm && <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#dc2626", marginTop: "0.25rem" }}>{errors.confirm}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.01 }}
        whileTap={{ scale: loading ? 1 : 0.99 }}
        style={{
          width: "100%",
          padding: "0.85rem",
          background: loading ? "#94a3b8" : "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
          border: "none",
          borderRadius: "8px",
          color: "#ffffff",
          fontFamily: "Georgia, serif",
          fontSize: "0.95rem",
          letterSpacing: "0.05em",
          cursor: loading ? "not-allowed" : "pointer",
          marginTop: "0.25rem",
        }}
      >
        {loading ? "Creating account..." : "Create Account"}
      </motion.button>
    </motion.form>
  );
}
