"use client";

import Image from "next/image";

const LOGO_SRC = "/assets/logo.jpg";

export default function Header() {
  return (
    <header
      style={{
        backgroundColor: "#4a4a4a",
        width: "100%",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      <div
        style={{
          maxWidth: "1024px",
          margin: "0 auto",
          padding: "0 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "52px",
        }}
      >
        {/* Logo + Name side by side, centered */}
        <a
          href="#home"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            textDecoration: "none",
          }}
        >
          {/* Logo */}
          <div
            style={{
              width: "52px",
              height: "52px",
              position: "relative",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <Image
              src={LOGO_SRC}
              alt="SRI Logo"
              fill
              style={{ objectFit: "contain" }}
              sizes="52px"
              priority
            />
          </div>

          {/* Company name */}
          <span
            style={{
              color: "#ffffff",
              fontSize: "1.1rem",
              fontFamily: "Georgia, serif",
              letterSpacing: "0.2em",
              fontWeight: "400",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            Sri Saketha Rama Innovations
          </span>
        </a>
        {/* Auth buttons — right side */}
        <div
          style={{
            position: "absolute",
            right: "1.5rem",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
          }}
        >
          <a
            href="/admin-login"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              color: "#fbbf24",
              textDecoration: "none",
              padding: "0.35rem 0.9rem",
              border: "1px solid #fbbf24",
              borderRadius: "4px",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
              display: "inline-block",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#fbbf24";
              (e.currentTarget as HTMLAnchorElement).style.color = "#111827";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#fbbf24";
            }}
          >
            Admin
          </a>
          <a
            href="/auth"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              color: "#e2e8f0",
              textDecoration: "none",
              padding: "0.35rem 0.9rem",
              border: "1px solid rgba(255,255,255,0.3)",
              borderRadius: "4px",
              transition: "all 0.2s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "#38bdf8";
              (e.currentTarget as HTMLAnchorElement).style.color = "#38bdf8";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(255,255,255,0.3)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#e2e8f0";
            }}
          >
            Sign In
          </a>
          <a
            href="/auth"
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "0.8rem",
              letterSpacing: "0.08em",
              color: "#ffffff",
              textDecoration: "none",
              padding: "0.35rem 0.9rem",
              background: "linear-gradient(135deg, #0ea5e9, #6366f1)",
              borderRadius: "4px",
              border: "none",
              whiteSpace: "nowrap",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
          >
            Sign Up
          </a>
        </div>

      </div>
    </header>
  );
}
