"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

type Step = "signin" | "forgot-email" | "forgot-code" | "forgot-newpass" | "forgot-done";

// Eye icon components
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

export default function SignInForm() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("signin");

  // Sign in state
  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Forgot password state
  const [fpEmail, setFpEmail] = useState("");
  const [fpCode, setFpCode] = useState("");
  const [fpNewPass, setFpNewPass] = useState("");
  const [fpConfirm, setFpConfirm] = useState("");
  const [fpError, setFpError] = useState("");
  const [fpLoading, setFpLoading] = useState(false);

  // ── Sign In ──
  const validate = () => {
    const e: typeof errors = {};
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.password) e.password = "Password is required.";
    return e;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate();
    if (Object.keys(v).length > 0) { setErrors(v); return; }
    setLoading(true);
    setErrors({});
    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) { setErrors({ general: data.error || "Failed to sign in" }); setLoading(false); return; }
      if (data.isAdmin) {
        sessionStorage.setItem("admin_auth", "true");
        router.push("/admin");
      } else {
        sessionStorage.setItem("user_auth", "true");
        sessionStorage.setItem("user_email", form.email);
        sessionStorage.setItem("user_name", data.user.name);
        router.push("/");
      }
    } catch (err: any) {
      setErrors({ general: err?.message || "Network error. Please check your connection." });
      setLoading(false);
    }
  };

  // ── Step 1: Send code ──
  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fpEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fpEmail)) {
      setFpError("Enter a valid email address."); return;
    }
    setFpLoading(true); setFpError("");
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fpEmail }),
      });
      const data = await res.json();
      if (!res.ok) { setFpError(data.error || "Failed to send code."); setFpLoading(false); return; }
      setStep("forgot-code");
    } catch {
      setFpError("Network error. Please try again.");
    } finally {
      setFpLoading(false);
    }
  };

  // ── Step 2: Verify code ──
  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (fpCode.trim().length !== 6) { setFpError("Enter the 6-digit code."); return; }
    setFpError("");
    setStep("forgot-newpass");
  };

  // ── Step 3: Reset password ──
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (fpNewPass.length < 6) { setFpError("Password must be at least 6 characters."); return; }
    if (fpNewPass !== fpConfirm) { setFpError("Passwords do not match."); return; }
    setFpLoading(true); setFpError("");
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: fpEmail, code: fpCode, newPassword: fpNewPass }),
      });
      const data = await res.json();
      if (!res.ok) { setFpError(data.error || "Failed to reset password."); setFpLoading(false); return; }
      setStep("forgot-done");
    } catch {
      setFpError("Network error. Please try again.");
    } finally {
      setFpLoading(false);
    }
  };

  const labelStyle: React.CSSProperties = { display: "block", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", marginBottom: "0.4rem" };
  const errStyle: React.CSSProperties = { fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#dc2626", marginTop: "0.25rem" };

  // ── Forgot password screens ──
  if (step !== "signin") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>

        {/* Step: Enter email */}
        {step === "forgot-email" && (
          <form onSubmit={handleSendCode} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: "700", color: "#111827", marginBottom: "0.3rem" }}>Forgot Password</h3>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#6B7280" }}>Enter your email and we'll send a 6-digit reset code.</p>
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" value={fpEmail} onChange={e => { setFpEmail(e.target.value); setFpError(""); }} placeholder="" style={inputStyle} autoFocus />
            </div>
            {fpError && <p style={errStyle}>{fpError}</p>}
            <button type="submit" disabled={fpLoading} style={{ padding: "0.85rem", background: fpLoading ? "#94a3b8" : "linear-gradient(135deg,#0ea5e9,#6366f1)", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "Georgia, serif", fontSize: "0.95rem", cursor: fpLoading ? "not-allowed" : "pointer" }}>
              {fpLoading ? "Sending..." : "Send Reset Code"}
            </button>
            <button type="button" onClick={() => { setStep("signin"); setFpError(""); }} style={{ background: "none", border: "none", fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#6b7280", cursor: "pointer", textDecoration: "underline" }}>
              Back to Sign In
            </button>
          </form>
        )}

        {/* Step: Enter code */}
        {step === "forgot-code" && (
          <form onSubmit={handleVerifyCode} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: "700", color: "#111827", marginBottom: "0.3rem" }}>Enter Code</h3>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#6B7280" }}>
                We sent a 6-digit code to <strong>{fpEmail}</strong>. Check your inbox (and spam folder).
              </p>
            </div>
            <div>
              <label style={labelStyle}>6-Digit Code</label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={fpCode}
                onChange={e => { setFpCode(e.target.value.replace(/\D/g, "").slice(0, 6)); setFpError(""); }}
                placeholder="123456"
                style={{ ...inputStyle, fontSize: "1.5rem", letterSpacing: "0.4rem", textAlign: "center" }}
                autoFocus
              />
            </div>
            {fpError && <p style={errStyle}>{fpError}</p>}
            <button type="submit" style={{ padding: "0.85rem", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "Georgia, serif", fontSize: "0.95rem", cursor: "pointer" }}>
              Verify Code
            </button>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button type="button" onClick={() => { setStep("forgot-email"); setFpCode(""); setFpError(""); }} style={{ background: "none", border: "none", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", cursor: "pointer", textDecoration: "underline" }}>
                Resend code
              </button>
              <button type="button" onClick={() => { setStep("signin"); setFpError(""); }} style={{ background: "none", border: "none", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280", cursor: "pointer", textDecoration: "underline" }}>
                Cancel
              </button>
            </div>
          </form>
        )}

        {/* Step: New password */}
        {step === "forgot-newpass" && (
          <form onSubmit={handleResetPassword} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: "700", color: "#111827", marginBottom: "0.3rem" }}>Set New Password</h3>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#6B7280" }}>Choose a strong password for your account.</p>
            </div>
            <div>
              <label style={labelStyle}>New Password</label>
              <input type="password" value={fpNewPass} onChange={e => { setFpNewPass(e.target.value); setFpError(""); }} placeholder="" style={inputStyle} autoFocus />
            </div>
            <div>
              <label style={labelStyle}>Confirm Password</label>
              <input type="password" value={fpConfirm} onChange={e => { setFpConfirm(e.target.value); setFpError(""); }} placeholder="" style={inputStyle} />
            </div>
            {fpError && <p style={errStyle}>{fpError}</p>}
            <button type="submit" disabled={fpLoading} style={{ padding: "0.85rem", background: fpLoading ? "#94a3b8" : "linear-gradient(135deg,#0ea5e9,#6366f1)", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "Georgia, serif", fontSize: "0.95rem", cursor: fpLoading ? "not-allowed" : "pointer" }}>
              {fpLoading ? "Saving..." : "Reset Password"}
            </button>
          </form>
        )}

        {/* Step: Done */}
        {step === "forgot-done" && (
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem 0" }}>
            <div style={{ fontSize: "3rem" }}>✓</div>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.1rem", fontWeight: "700", color: "#111827" }}>Password Reset!</h3>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#6B7280" }}>Your password has been updated successfully. You can now sign in.</p>
            <button
              onClick={() => { setStep("signin"); setFpEmail(""); setFpCode(""); setFpNewPass(""); setFpConfirm(""); setFpError(""); }}
              style={{ padding: "0.85rem", background: "linear-gradient(135deg,#0ea5e9,#6366f1)", border: "none", borderRadius: "8px", color: "#fff", fontFamily: "Georgia, serif", fontSize: "0.95rem", cursor: "pointer" }}
            >
              Back to Sign In
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  // ── Main Sign In form ──
  return (
    <motion.form
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSignIn}
      noValidate
      style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}
    >
      {errors.general && (
        <div style={{ backgroundColor: "#fef2f2", border: "1px solid #fecaca", borderRadius: "8px", padding: "0.75rem 1rem" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.85rem", color: "#dc2626" }}>{errors.general}</p>
        </div>
      )}

      <div>
        <label style={labelStyle}>Email</label>
        <input type="email" value={form.email} onChange={e => { setForm(p => ({ ...p, email: e.target.value })); setErrors(p => ({ ...p, email: undefined })); }} placeholder="" style={{ ...inputStyle, borderColor: errors.email ? "#f87171" : "#e2e8f0" }} autoComplete="email" />
        {errors.email && <p style={errStyle}>{errors.email}</p>}
      </div>

      <div>
        <label style={labelStyle}>Password</label>
        <div style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            value={form.password}
            onChange={e => { setForm(p => ({ ...p, password: e.target.value })); setErrors(p => ({ ...p, password: undefined })); }}
            placeholder=""
            style={{ ...inputStyle, borderColor: errors.password ? "#f87171" : "#e2e8f0", paddingRight: "2.75rem" }}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(v => !v)}
            style={{ position: "absolute", right: "0.75rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", display: "flex", alignItems: "center", padding: 0 }}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeClosed /> : <EyeOpen />}
          </button>
        </div>
        {errors.password && <p style={errStyle}>{errors.password}</p>}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
          <input type="checkbox" checked={form.remember} onChange={e => setForm(p => ({ ...p, remember: e.target.checked }))} style={{ accentColor: "#38bdf8", width: "14px", height: "14px" }} />
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#6b7280" }}>Remember me</span>
        </label>
        <button
          type="button"
          onClick={() => { setFpEmail(form.email); setStep("forgot-email"); setFpError(""); }}
          style={{ background: "none", border: "none", fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#38bdf8", cursor: "pointer", padding: 0 }}
        >
          Forgot password?
        </button>
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: loading ? 1 : 1.01 }}
        whileTap={{ scale: loading ? 1 : 0.99 }}
        style={{ width: "100%", padding: "0.85rem", background: loading ? "#94a3b8" : "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)", border: "none", borderRadius: "8px", color: "#ffffff", fontFamily: "Georgia, serif", fontSize: "0.95rem", letterSpacing: "0.05em", cursor: loading ? "not-allowed" : "pointer", marginTop: "0.25rem" }}
      >
        {loading ? "Signing in..." : "Sign In"}
      </motion.button>
    </motion.form>
  );
}
