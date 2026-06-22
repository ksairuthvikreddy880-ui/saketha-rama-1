"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LOGO_SRC = "/assets/logo.jpg";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const auth = sessionStorage.getItem("user_auth");
    const name = sessionStorage.getItem("user_name");
    
    if (auth === "true" && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("user_auth");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_name");
    setIsLoggedIn(false);
    setShowDropdown(false);
    router.push("/");
  };

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
          href="/"
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

        {/* Auth buttons or Profile — right side */}
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
          {isLoggedIn ? (
            // Profile Dropdown
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.35rem 0.75rem",
                  backgroundColor: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "4px",
                  color: "#ffffff",
                  fontFamily: "Georgia, serif",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)";
                }}
              >
                <div
                  style={{
                    width: "24px",
                    height: "24px",
                    borderRadius: "50%",
                    backgroundColor: "#60a5fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                    fontSize: "0.75rem",
                  }}
                >
                  {userName.charAt(0).toUpperCase()}
                </div>
                <span style={{ letterSpacing: "0.05em" }}>{userName}</span>
                <span style={{ fontSize: "0.7rem" }}>▼</span>
              </button>

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 0.5rem)",
                    right: 0,
                    backgroundColor: "#ffffff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "6px",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                    minWidth: "180px",
                    overflow: "hidden",
                    zIndex: 100,
                  }}
                >
                  <a
                    href="/profile"
                    style={{
                      display: "block",
                      padding: "0.75rem 1rem",
                      fontFamily: "Georgia, serif",
                      fontSize: "0.875rem",
                      color: "#111827",
                      textDecoration: "none",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#f8fafc";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    👤 My Profile
                  </a>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: "block",
                      width: "100%",
                      padding: "0.75rem 1rem",
                      fontFamily: "Georgia, serif",
                      fontSize: "0.875rem",
                      color: "#dc2626",
                      textAlign: "left",
                      backgroundColor: "transparent",
                      border: "none",
                      borderTop: "1px solid #e5e7eb",
                      cursor: "pointer",
                      transition: "background-color 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#fef2f2";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    🚪 Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            // Sign In/Sign Up buttons
            <>
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
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#fbbf24";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#111827";
                }}
                onMouseLeave={(e) => {
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
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.borderColor = "#38bdf8";
                  (e.currentTarget as HTMLAnchorElement).style.color = "#38bdf8";
                }}
                onMouseLeave={(e) => {
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
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.opacity = "1"; }}
              >
                Sign Up
              </a>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
