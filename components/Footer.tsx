"use client";

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#3d3d3d",
        width: "100%",
        padding: "3rem 1rem 1.5rem",
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Privacy Policy */}
        <a
          href="#privacy"
          style={{
            display: "block",
            fontFamily: "Georgia, serif",
            fontSize: "0.7rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#cccccc",
            textDecoration: "none",
            marginBottom: "1.25rem",
          }}
        >
          PRIVACY POLICY
        </a>

        {/* Company Name */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "0.875rem",
            fontWeight: "700",
            color: "#ffffff",
            letterSpacing: "0.05em",
            marginBottom: "0.75rem",
          }}
        >
          SRI
        </p>

        {/* Address */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "0.75rem",
            color: "#bbbbbb",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            lineHeight: "1.6",
            marginBottom: "0.5rem",
          }}
        >
          PLOT NO 118, PHASE 2, KAVURI HILLS, MADHOPUR, HYDERABAD, TELANGANA, INDIA
        </p>

        {/* Phone */}
        <p
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "0.75rem",
            color: "#bbbbbb",
            marginBottom: "2rem",
          }}
        >
          +91.7893059116
        </p>

        {/* Divider */}
        <div style={{ borderTop: "1px solid #555555", paddingTop: "1.25rem" }}>
          {/* Copyright */}
          <p
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.7rem",
              color: "#999999",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            COPYRIGHT © {currentYear} SRI - ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
