"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import React from "react";

const currentYear = new Date().getFullYear();

interface Settings {
  companyName: string;
  phone: string;
  address: string;
  email: string;
  facebook: string;
  twitter: string;
  linkedin: string;
  instagram: string;
  youtube: string;
  logo: string;
}

const defaults: Settings = {
  companyName: "SRI Saketha Rama Innovations",
  phone: "+91.7893059116",
  address: "Plot No 118, Phase 2, Kavuri Hills, Madhopur, Hyderabad, Telangana, India",
  email: "saketharamainnovations@gmail.com",
  facebook: "",
  twitter: "",
  linkedin: "",
  instagram: "",
  youtube: "",
  logo: "",
};

const icons: Record<string, React.ReactElement> = {
  facebook: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  ),
  twitter: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  ),
  linkedin: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  ),
  instagram: (
    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
    </svg>
  ),
  youtube: (
    <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="#3d3d3d" />
    </svg>
  ),
};

export default function Footer() {
  const [settings, setSettings] = useState<Settings>(defaults);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings) setSettings({ ...defaults, ...data.settings });
      })
      .catch(() => {});
  }, []);

  const logoSrc = settings.logo || "/assets/logo.jpg";

  const socialLinks = [
    { key: "facebook", url: settings.facebook },
    { key: "twitter", url: settings.twitter },
    { key: "linkedin", url: settings.linkedin },
    { key: "instagram", url: settings.instagram },
    { key: "youtube", url: settings.youtube },
  ].filter((s) => s.url && s.url.trim() !== "");

  return (
    <>
      <style>{`
        .footer-inner {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 2rem;
          max-width: 960px;
          margin: 0 auto;
          padding: 0 1rem;
        }
        .footer-logo-wrap {
          flex-shrink: 0;
          width: 140px;
          height: 90px;
          position: relative;
        }
        .footer-center {
          flex: 1;
          text-align: center;
        }
        @media (max-width: 600px) {
          .footer-inner {
            flex-direction: column;
            align-items: center;
          }
          .footer-logo-wrap {
            width: 110px;
            height: 70px;
          }
          .footer-center {
            width: 100%;
          }
        }
      `}</style>

      <footer style={{ backgroundColor: "#3d3d3d", width: "100%", padding: "2.5rem 0 1.5rem" }}>
        <div className="footer-inner">
          {/* Logo */}
          <div className="footer-logo-wrap">
            <Image
              src={logoSrc}
              alt="SRI Logo"
              fill
              style={{ objectFit: "contain" }}
              sizes="140px"
              unoptimized={logoSrc.startsWith("data:")}
            />
          </div>

          {/* Center content */}
          <div className="footer-center">
            <a href="/privacy-policy" style={{ display: "block", fontFamily: "Georgia, serif", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#cccccc", textDecoration: "none", marginBottom: "1rem" }}>
              PRIVACY POLICY
            </a>

            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", fontWeight: "700", color: "#ffffff", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
              {settings.companyName}
            </p>

            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#bbbbbb", letterSpacing: "0.08em", textTransform: "uppercase", lineHeight: "1.6", marginBottom: "0.4rem" }}>
              {settings.address}
            </p>

            <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#bbbbbb", marginBottom: socialLinks.length > 0 ? "1.25rem" : "2rem" }}>
              {settings.phone}
            </p>

            {socialLinks.length > 0 && (
              <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "0.75rem", marginBottom: "1.5rem" }}>
                {socialLinks.map(({ key, url }) => (
                  <a
                    key={key}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={key.charAt(0).toUpperCase() + key.slice(1)}
                    style={{ display: "flex", alignItems: "center", justifyContent: "center", width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.1)", color: "#cccccc", textDecoration: "none", transition: "background-color 0.2s, color 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.25)"; e.currentTarget.style.color = "#ffffff"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#cccccc"; }}
                  >
                    {icons[key]}
                  </a>
                ))}
              </div>
            )}

            <div style={{ borderTop: "1px solid #555555", paddingTop: "1rem" }}>
              <p style={{ fontFamily: "Georgia, serif", fontSize: "0.7rem", color: "#999999", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                COPYRIGHT © {currentYear} SRI — ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
