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

export default function SignUpForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string; confirm?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

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

    // Simulate API call delay
    setTimeout(() => {
      // Get existing users from localStorage
      const storedUsers = localStorage.getItem("sri_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if email already exists
      const existingUser = users.find((u: any) => u.email === form.email);
      if (existingUser) {
        setErrors({ general: "An account with this email already exists." });
        setLoading(false);
        return;
      }

      // Add new user
      users.push({
        id: Date.now().toString(),
        name: form.name,
        email: form.email,
        password: form.password, // In production, this should be hashed
        createdAt: new Date().toISOString(),
      });

      // Save to localStorage
      localStorage.setItem("sri_users", JSON.stringify(users));

      // Show success
      setSuccess(true);
      setLoading(false);
    }, 500);
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
        { key: "name", label: "Full Name", type: "text", placeholder: "John Smith", autoComplete: "name" },
        { key: "email", label: "Email", type: "email", placeholder: "you@example.com", autoComplete: "email" },
        { key: "password", label: "Password", type: "password", placeholder: "Min. 8 characters", autoComplete: "new-password" },
        { key: "confirm", label: "Confirm Password", type: "password", placeholder: "••••••••", autoComplete: "new-password" },
      ].map(({ key, label, type, placeholder, autoComplete }) => (
        <div key={key}>
          <label style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.4rem" }}>{label}</label>
          <input
            type={type}
            value={form[key as keyof typeof form] as string}
            onChange={e => { setForm(p => ({ ...p, [key]: e.target.value })); setErrors(p => ({ ...p, [key]: undefined })); }}
            placeholder={placeholder}
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
