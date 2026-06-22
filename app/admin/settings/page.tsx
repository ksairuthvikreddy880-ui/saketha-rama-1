"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const defaultSettings = {
  companyName: "SRI Saketha Rama Innovations",
  email: "saketharamainnovations@gmail.com",
  phone: "+91.7893059116",
  address: "Plot No 118, Phase 2, Kavuri Hills, Madhopur, Hyderabad, Telangana, India",
  businessHours: "Mon-Fri: 9:00 AM - 6:00 PM",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  youtube: "",
  logo: "",
};

export default function Settings() {
  const [formData, setFormData] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Load settings from DB on mount
  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings) {
          setFormData({
            companyName: data.settings.companyName || defaultSettings.companyName,
            email: data.settings.email || defaultSettings.email,
            phone: data.settings.phone || defaultSettings.phone,
            address: data.settings.address || defaultSettings.address,
            businessHours: data.settings.businessHours || defaultSettings.businessHours,
            facebook: data.settings.facebook || "",
            twitter: data.settings.twitter || "",
            linkedin: data.settings.linkedin || "",
            instagram: data.settings.instagram || "",
            youtube: data.settings.youtube || "",
            logo: data.settings.logo || "",
          });
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      setMessage({ type: "error", text: "Logo must be under 2MB" });
      return;
    }
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, logo: reader.result as string }));
    };
    reader.readAsDataURL(file);
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({ type: "success", text: "Settings saved successfully! Changes will appear on the website." });
      } else {
        setMessage({ type: "error", text: data.error || "Failed to save settings" });
      }
    } catch {
      setMessage({ type: "error", text: "Network error. Please try again." });
    } finally {
      setSaving(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #E5E7EB",
    borderRadius: "6px",
    fontFamily: "system-ui",
    fontSize: "0.875rem",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "system-ui",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
    marginBottom: "0.5rem",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "2rem",
  };

  if (loading) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", fontFamily: "system-ui", color: "#6B7280" }}>
        Loading settings...
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "system-ui", fontSize: "2rem", fontWeight: "600", color: "#111827", margin: 0 }}>
          Settings
        </h1>
        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            padding: "0.625rem 1.25rem",
            backgroundColor: "#111827",
            border: "none",
            borderRadius: "6px",
            fontFamily: "system-ui",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#FFFFFF",
            cursor: saving ? "not-allowed" : "pointer",
            opacity: saving ? 0.6 : 1,
          }}
        >
          {saving ? "Saving..." : "Save Settings"}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div style={{
          padding: "0.875rem 1.25rem",
          marginBottom: "1.5rem",
          borderRadius: "8px",
          fontFamily: "system-ui",
          fontSize: "0.875rem",
          backgroundColor: message.type === "success" ? "#F0FDF4" : "#FEF2F2",
          border: `1px solid ${message.type === "success" ? "#BBF7D0" : "#FECACA"}`,
          color: message.type === "success" ? "#166534" : "#DC2626",
        }}>
          {message.text}
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

        {/* Company Logo */}
        <div style={cardStyle}>
          <h2 style={{ fontFamily: "system-ui", fontSize: "1.25rem", fontWeight: "600", color: "#111827", marginBottom: "1.5rem" }}>
            Company Logo
          </h2>
          <div style={{ display: "flex", alignItems: "flex-start", gap: "2rem", flexWrap: "wrap" }}>
            {/* Current logo preview */}
            <div>
              <p style={{ fontFamily: "system-ui", fontSize: "0.8rem", color: "#6B7280", marginBottom: "0.5rem" }}>
                Current Logo
              </p>
              <div style={{ width: "120px", height: "80px", position: "relative", border: "1px solid #E5E7EB", borderRadius: "6px", overflow: "hidden", backgroundColor: "#F8FAFC" }}>
                <Image
                  src={formData.logo || "/assets/logo.jpg"}
                  alt="Logo preview"
                  fill
                  style={{ objectFit: "contain", padding: "4px" }}
                  sizes="120px"
                />
              </div>
            </div>

            {/* Upload new */}
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>Upload New Logo</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                style={{ ...inputStyle, padding: "0.5rem" }}
              />
              <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.4rem" }}>
                Max 2MB. Will replace the logo everywhere on the website (header, footer, admin).
              </p>
            </div>
          </div>
        </div>

        {/* Company Information */}
        <div style={cardStyle}>
          <h2 style={{ fontFamily: "system-ui", fontSize: "1.25rem", fontWeight: "600", color: "#111827", marginBottom: "1.5rem" }}>
            Company Information
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <label style={labelStyle}>Company Name</label>
              <input type="text" value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Phone</label>
              <input type="text" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Business Hours</label>
              <input type="text" value={formData.businessHours} onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })} style={inputStyle} />
            </div>
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={labelStyle}>Address</label>
              <textarea value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} rows={2} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div style={cardStyle}>
          <h2 style={{ fontFamily: "system-ui", fontSize: "1.25rem", fontWeight: "600", color: "#111827", marginBottom: "1.5rem" }}>
            Social Links
          </h2>
          <p style={{ fontFamily: "system-ui", fontSize: "0.8rem", color: "#6B7280", marginBottom: "1.25rem" }}>
            These will appear in the footer of your website. Leave blank to hide.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            {[
              { key: "facebook", label: "Facebook" },
              { key: "twitter", label: "Twitter / X" },
              { key: "linkedin", label: "LinkedIn" },
              { key: "instagram", label: "Instagram" },
              { key: "youtube", label: "YouTube" },
            ].map(({ key, label }) => (
              <div key={key}>
                <label style={labelStyle}>{label}</label>
                <input
                  type="url"
                  value={(formData as any)[key]}
                  onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                  placeholder={`https://...`}
                  style={inputStyle}
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
