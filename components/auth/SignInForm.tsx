"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

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

export default function SignInForm() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
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
      // Get stored users from localStorage
      const storedUsers = localStorage.getItem("sri_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if user exists with matching password
      const user = users.find((u: any) => u.email === form.email && u.password === form.password);

      if (user) {
        // Store current user session
        sessionStorage.setItem("user_auth", "true");
        sessionStorage.setItem("user_email", form.email);
        router.push("/");
      } else {
        setErrors({ general: "Invalid email or password" });
        setLoading(false);
      }
    }, 500);
  };

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

      <div>
        <label style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.4rem" }}>Email</label>
        <input
          type="email"
          value={form.email}
          onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }}
          placeholder="you@example.com"
          style={{ ...inputStyle, borderColor: errors.email ? "#f87171" : "#e2e8f0" }}
          autoComplete="email"
        />
        {errors.email && <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#dc2626", marginTop: "0.25rem" }}>{errors.email}</p>}
      </div>

      <div>
        <label style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.4rem" }}>Password</label>
        <input
          type="password"
          value={form.password}
          onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: undefined })); }}
          placeholder="••••••••"
          style={{ ...inputStyle, borderColor: errors.password ? "#f87171" : "#e2e8f0" }}
          autoComplete="current-password"
        />
        {errors.password && <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#dc2626", marginTop: "0.25rem" }}>{errors.password}</p>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input
            type="checkbox"
            checked={form.remember}
            onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))}
            style={{ accentColor: "#38bdf8", width: "14px", height: "14px" }}
          />
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280" }}>Remember me</span>
        </label>
        <a href="#" style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#38bdf8", textDecoration: "none" }}>Forgot password?</a>
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
          transition: "opacity 0.2s",
          marginTop: "0.25rem",
        }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </motion.button>
    </motion.form>
  );
}
