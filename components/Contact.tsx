"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface FormState {
  name: string;
  email: string;
  project: string;
  file: File | null;
}

interface Errors {
  name?: string;
  email?: string;
  project?: string;
}

function validate(f: FormState): Errors {
  const e: Errors = {};
  if (!f.name.trim()) e.name = "Name is required.";
  if (!f.email.trim()) {
    e.email = "Email is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) {
    e.email = "Enter a valid email.";
  }
  if (!f.project.trim()) e.project = "Please describe your project.";
  return e;
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  borderBottom: "1px solid #cccccc",
  outline: "none",
  padding: "0.6rem 0",
  fontFamily: "Georgia, serif",
  fontSize: "0.9375rem",
  color: "#333333",
  backgroundColor: "transparent",
  boxSizing: "border-box",
};

export default function Contact() {
  const [form, setForm] = useState<FormState>({ name: "", email: "", project: "", file: null });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
    if (errors[name as keyof Errors]) setErrors((p) => ({ ...p, [name]: undefined }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, file: e.target.files?.[0] ?? null }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const v = validate(form);
    if (Object.keys(v).length > 0) { setErrors(v); return; }

    setSending(true);
    setServerError("");

    // Build mailto link — sends from user's own email to company inbox
    // No SMTP credentials needed
    const subject = encodeURIComponent(`New Enquiry from ${form.name}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\nProject Details:\n${form.project}`
    );
    const mailtoLink = `mailto:saketharamainnovations@gmail.com?subject=${subject}&body=${body}`;

    // Open user's email client
    window.location.href = mailtoLink;

    // Show success after a short delay
    setTimeout(() => {
      setSubmitted(true);
      setSending(false);
    }, 500);
  };

  return (
    <section
      id="contact"
      style={{ backgroundColor: "#ffffff", width: "100%", padding: "4rem 1rem" }}
    >
      <div style={{ maxWidth: "780px", margin: "0 auto" }}>
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: "0.8rem", fontWeight: "400", letterSpacing: "0.2em", textTransform: "uppercase", color: "#444444", marginBottom: "2rem" }}
        >
          CONTACT US
        </motion.h2>

        <p style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: "700", color: "#222222", marginBottom: "2rem" }}>
          Get in Touch
        </p>

        {submitted ? (
          <div style={{ textAlign: "center", padding: "2rem 0" }}>
            <p style={{ fontFamily: "Georgia, serif", color: "#555", lineHeight: "1.7" }}>
              Your email client has been opened with the details pre-filled.<br />
              Please send the email to complete your enquiry.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: "", email: "", project: "", file: null }); }}
              style={{ marginTop: "1rem", background: "none", border: "none", fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#4a9ea1", cursor: "pointer", textDecoration: "underline" }}
            >
              Send another message
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div style={{ marginBottom: "1.25rem" }}>
              <input name="name" type="text" autoComplete="name" placeholder="Name" value={form.name} onChange={handleChange} style={inputStyle} aria-label="Name" />
              {errors.name && <p style={{ color: "#cc3333", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "Georgia, serif" }}>{errors.name}</p>}
            </div>

            {/* Email */}
            <div style={{ marginBottom: "1.25rem" }}>
              <input name="email" type="email" autoComplete="email" placeholder="Email*" value={form.email} onChange={handleChange} style={inputStyle} aria-label="Email" />
              {errors.email && <p style={{ color: "#cc3333", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "Georgia, serif" }}>{errors.email}</p>}
            </div>

            {/* Project */}
            <div style={{ marginBottom: "1.25rem" }}>
              <textarea name="project" placeholder="Tell us about your project" value={form.project} onChange={handleChange} rows={5} style={{ ...inputStyle, resize: "vertical" }} aria-label="Project description" />
              {errors.project && <p style={{ color: "#cc3333", fontSize: "0.75rem", marginTop: "0.25rem", fontFamily: "Georgia, serif" }}>{errors.project}</p>}
            </div>

            {/* File attach */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #cccccc", paddingBottom: "0.5rem", marginBottom: "2rem" }}>
              <label htmlFor="attach" style={{ display: "flex", alignItems: "center", gap: "0.4rem", cursor: "pointer", fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#555555" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
                Attach Files
              </label>
              <input id="attach" type="file" style={{ display: "none" }} onChange={handleFile} accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.txt" />
              <span style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#888888" }}>Attachments ({form.file ? 1 : 0})</span>
            </div>

            {/* Server error */}
            {serverError && (
              <p style={{ color: "#cc3333", fontSize: "0.8rem", textAlign: "center", marginBottom: "1rem", fontFamily: "Georgia, serif" }}>
                {serverError}
              </p>
            )}

            {/* Send button */}
            <div style={{ textAlign: "center", marginBottom: "1rem" }}>
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={{ backgroundColor: "rgba(0,0,0,0.04)" }}
                style={{ border: "1px solid #333333", backgroundColor: "transparent", padding: "0.65rem 2rem", fontFamily: "Georgia, serif", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase", color: sending ? "#999" : "#333333", cursor: sending ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", gap: "0.75rem", transition: "background-color 0.2s" }}
              >
                <span style={{ fontSize: "1rem" }}>—</span>
                {sending ? "SENDING..." : "SEND"}
                <span style={{ fontSize: "1rem" }}>—</span>
              </motion.button>
            </div>

            <p style={{ textAlign: "center", fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#888888", marginTop: "0.5rem" }}>
              This site is protected by reCAPTCHA and the Google{" "}
              <a href="#privacy" style={{ color: "#4a9ea1", textDecoration: "none" }}>Privacy Policy</a> and{" "}
              <a href="#terms" style={{ color: "#4a9ea1", textDecoration: "none" }}>Terms of Service</a> apply.
            </p>
          </form>
        )}

        {/* Questions or Comments block */}
        <div style={{ textAlign: "center", margin: "3rem 0 2.5rem" }}>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: "700", color: "#222222", marginBottom: "0.75rem" }}>Questions or Comments?</p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9375rem", color: "#555555", lineHeight: "1.7", maxWidth: "500px", margin: "0 auto" }}>
            We know that our clients have unique needs. Send us a message, and we will get back to you soon.
          </p>
        </div>

        {/* Two-column info */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem", borderTop: "1px solid #eeeeee", paddingTop: "2.5rem" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: "700", color: "#222222", marginBottom: "0.75rem" }}>SRI</p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#555555", lineHeight: "1.7" }}>
              plot no 118, Phase 2, Kavuri Hills, Madhopur,<br />Hyderabad, Telangana, India
            </p>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#555555", marginTop: "0.75rem" }}>+91.7893059116</p>
          </div>
          <div style={{ textAlign: "center" }}>
            <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", fontWeight: "700", color: "#222222", marginBottom: "0.75rem" }}>Hours</p>
            <table style={{ margin: "0 auto", fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#555555", borderCollapse: "collapse" }}>
              <tbody>
                {[["Mon","09:00 – 17:00",true],["Tue","09:00 – 17:00",false],["Wed","09:00 – 17:00",false],["Thu","09:00 – 17:00",false],["Fri","09:00 – 17:00",false],["Sat","Closed",false],["Sun","Closed",false]].map(([day, time, bold]) => (
                  <tr key={String(day)}>
                    <td style={{ paddingRight: "0.75rem", paddingBottom: "0.25rem", fontWeight: bold ? "700" : "400", color: bold ? "#222" : "#555", textAlign: "right" }}>{day}</td>
                    <td style={{ paddingBottom: "0.25rem", fontWeight: bold ? "700" : "400", color: bold ? "#222" : "#555", textAlign: "left" }}>{time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
