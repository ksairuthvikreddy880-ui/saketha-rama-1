"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [logoSrc, setLogoSrc] = useState("/assets/logo.jpg");
  const [companyName, setCompanyName] = useState("Sri Saketha Rama Innovations");
  const [cycleLabel, setCycleLabel] = useState("Sign In");

  useEffect(() => {
    const auth = sessionStorage.getItem("user_auth");
    const name = sessionStorage.getItem("user_name");
    if (auth === "true" && name) {
      setIsLoggedIn(true);
      setUserName(name);
    }
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.settings) {
          if (data.settings.logo) setLogoSrc(data.settings.logo);
          if (data.settings.companyName) setCompanyName(data.settings.companyName);
        }
      })
      .catch(() => {});
  }, []);

  // Cycle Sign In ↔ Sign Up every 3 seconds on mobile
  useEffect(() => {
    if (isLoggedIn) return;
    const labels = ["Sign In", "Sign Up"];
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % labels.length;
      setCycleLabel(labels[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, [isLoggedIn]);

  const handleLogout = () => {
    sessionStorage.removeItem("user_auth");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_name");
    setIsLoggedIn(false);
    setShowDropdown(false);
    router.push("/");
  };

  return (
    <>
      <style>{`
        .header-company-name { display: block; }
        .header-auth-desktop { display: flex; }
        .header-auth-mobile  { display: none; }

        /* Animated arrow button */
        .sri-auth-btn {
          padding: 0; margin: 0; border: none; background: none; cursor: pointer;
          position: relative; display: flex; font-weight: 600; font-size: 15px;
          gap: 0.4rem; align-items: center; text-decoration: none;
        }
        .sri-auth-btn p {
          margin: 0; position: relative; font-size: 15px; color: #ffffff;
          white-space: nowrap;
        }
        .sri-auth-btn::after {
          position: absolute; content: ""; width: 0; left: 0; bottom: -5px;
          background: #60a5fa; height: 2px; transition: 0.3s ease-out;
        }
        .sri-auth-btn p::before {
          position: absolute; content: attr(data-text);
          width: 0%; inset: 0; color: #60a5fa; overflow: hidden;
          transition: 0.3s ease-out;
        }
        .sri-auth-btn:hover::after { width: 100%; }
        .sri-auth-btn:hover p::before { width: 100%; }
        .sri-auth-btn:hover svg { transform: translateX(4px); color: #60a5fa; }
        .sri-auth-btn svg {
          color: #ffffff; transition: 0.2s; position: relative;
          width: 14px; transition-delay: 0.2s; flex-shrink: 0;
        }

        /* Mobile cycling box */
        .mobile-auth-box {
          display: inline-flex; align-items: center; gap: 0.4rem;
          border: 1.5px solid rgba(255,255,255,0.45); border-radius: 6px;
          padding: 0.3rem 0.75rem; background: rgba(255,255,255,0.08);
          backdrop-filter: blur(4px); min-width: 96px; justify-content: center;
          text-decoration: none;
        }
        .cycle-label { animation: labelFade 0.4s ease; }
        @keyframes labelFade {
          from { opacity: 0; transform: translateY(4px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 639px) {
          .header-company-name { font-size: 0.7rem !important; letter-spacing: 0.06em !important; }
          .header-auth-desktop { display: none !important; }
          .header-auth-mobile  { display: flex !important; }
        }
        @media (max-width: 380px) {
          .header-company-name { font-size: 0.6rem !important; }
        }
      `}</style>

      <header style={{ backgroundColor: "#4a4a4a", width: "100%", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px" }}>

          {/* Logo + Name */}
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", flex: 1, minWidth: 0 }}>
            <div style={{ width: "44px", height: "44px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
              <Image src={logoSrc} alt="SRI Logo" fill style={{ objectFit: "contain" }} sizes="44px" priority unoptimized={logoSrc.startsWith("data:")} />
            </div>
            <span className="header-company-name" style={{ color: "#ffffff", fontSize: "1rem", fontFamily: "Georgia, serif", letterSpacing: "0.15em", fontWeight: "400", textTransform: "uppercase", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {companyName}
            </span>
          </a>

          {/* Desktop auth */}
          <div className="header-auth-desktop" style={{ alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            {isLoggedIn ? (
              <div style={{ position: "relative" }}>
                <button onClick={() => setShowDropdown(!showDropdown)} style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.35rem 0.75rem", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "4px", color: "#ffffff", fontFamily: "Georgia, serif", fontSize: "0.8rem", cursor: "pointer" }}>
                  <div style={{ width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "0.75rem" }}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span>{userName}</span>
                  <span style={{ fontSize: "0.7rem" }}>▼</span>
                </button>
                {showDropdown && (
                  <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", right: 0, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: "160px", overflow: "hidden", zIndex: 100 }}>
                    <a href="/profile" style={{ display: "block", padding: "0.75rem 1rem", fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#111827", textDecoration: "none" }}>My Profile</a>
                    <button onClick={handleLogout} style={{ display: "block", width: "100%", padding: "0.75rem 1rem", fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#dc2626", textAlign: "left", backgroundColor: "transparent", border: "none", borderTop: "1px solid #e5e7eb", cursor: "pointer" }}>Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <a href="/auth" className="sri-auth-btn">
                  <p data-text="Sign In">Sign In</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <span style={{ color: "rgba(255,255,255,0.3)", margin: "0 0.25rem" }}>|</span>
                <a href="/auth" className="sri-auth-btn">
                  <p data-text="Sign Up">Sign Up</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </>
            )}
          </div>

          {/* Mobile auth */}
          <div className="header-auth-mobile" style={{ alignItems: "center", flexShrink: 0, position: "relative" }}>
            {isLoggedIn ? (
              <>
                <button onClick={() => setShowDropdown(!showDropdown)} style={{ display: "flex", alignItems: "center", gap: "0.4rem", padding: "0.3rem 0.65rem", backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "6px", color: "#ffffff", fontFamily: "Georgia, serif", fontSize: "0.8rem", cursor: "pointer" }}>
                  <div style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#60a5fa", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: "600", fontSize: "0.7rem" }}>
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <span style={{ fontSize: "0.7rem" }}>▼</span>
                </button>
                {showDropdown && (
                  <div style={{ position: "absolute", top: "calc(100% + 0.5rem)", right: 0, backgroundColor: "#ffffff", border: "1px solid #e5e7eb", borderRadius: "6px", boxShadow: "0 4px 12px rgba(0,0,0,0.15)", minWidth: "160px", overflow: "hidden", zIndex: 100 }}>
                    <a href="/profile" onClick={() => setShowDropdown(false)} style={{ display: "block", padding: "0.75rem 1rem", fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#111827", textDecoration: "none" }}>My Profile</a>
                    <button onClick={handleLogout} style={{ display: "block", width: "100%", padding: "0.75rem 1rem", fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#dc2626", textAlign: "left", backgroundColor: "transparent", border: "none", borderTop: "1px solid #e5e7eb", cursor: "pointer" }}>Logout</button>
                  </div>
                )}
              </>
            ) : (
              <a href="/auth" className="mobile-auth-box">
                <span key={cycleLabel} className="cycle-label" style={{ fontSize: "0.8rem", fontFamily: "Georgia, serif", color: "#ffffff", fontWeight: "600", letterSpacing: "0.05em" }}>
                  {cycleLabel}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="#ffffff" strokeWidth={3} style={{ width: "12px", flexShrink: 0 }}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            )}
          </div>

        </div>
      </header>
    </>
  );
}
