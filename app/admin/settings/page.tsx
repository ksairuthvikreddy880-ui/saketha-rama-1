"use client";

import { useState } from "react";

export default function Settings() {
  const [formData, setFormData] = useState({
    companyName: "SRI Saketha Rama Innovations",
    email: "info@srisaketha.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94025",
    facebook: "https://facebook.com/srisaketha",
    twitter: "https://twitter.com/srisaketha",
    linkedin: "https://linkedin.com/company/srisaketha",
    businessHours: "Mon-Fri: 9:00 AM - 6:00 PM",
  });

  const handleSave = () => {
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "2rem",
            fontWeight: "600",
            color: "#111827",
            margin: 0,
          }}
        >
          Settings
        </h1>
        <button
          onClick={handleSave}
          style={{
            padding: "0.625rem 1.25rem",
            backgroundColor: "#111827",
            border: "none",
            borderRadius: "6px",
            fontFamily: "system-ui",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          Save Settings
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        {/* Company Information */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "system-ui",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "1.5rem",
            }}
          >
            Company Information
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Company Name
              </label>
              <input
                type="text"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
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
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Phone
              </label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Business Hours
              </label>
              <input
                type="text"
                value={formData.businessHours}
                onChange={(e) => setFormData({ ...formData, businessHours: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>

            <div style={{ gridColumn: "1 / -1" }}>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Address
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                rows={2}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                  resize: "vertical",
                }}
              />
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "system-ui",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "1.5rem",
            }}
          >
            Social Links
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.25rem" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Facebook
              </label>
              <input
                type="url"
                value={formData.facebook}
                onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                Twitter
              </label>
              <input
                type="url"
                value={formData.twitter}
                onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>

            <div>
              <label
                style={{
                  display: "block",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  marginBottom: "0.5rem",
                }}
              >
                LinkedIn
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                style={{
                  width: "100%",
                  padding: "0.75rem",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  color: "#111827",
                  outline: "none",
                }}
              />
            </div>
          </div>
        </div>

        {/* Logo Upload */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "system-ui",
              fontSize: "1.25rem",
              fontWeight: "600",
              color: "#111827",
              marginBottom: "1.5rem",
            }}
          >
            Company Logo
          </h2>

          <input
            type="file"
            accept="image/*"
            style={{
              width: "100%",
              padding: "0.75rem",
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              fontFamily: "system-ui",
              fontSize: "0.875rem",
              color: "#6B7280",
            }}
          />
        </div>
      </div>
    </div>
  );
}
