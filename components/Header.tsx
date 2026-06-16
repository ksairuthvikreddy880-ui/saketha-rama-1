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
          padding: "0 1rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "52px",
          position: "relative",
        }}
      >
        {/* Logo — pinned to left edge of the full viewport */}
        <div
          style={{
            position: "fixed",
            left: "0",
            top: "0",
            width: "130px",
            height: "52px",
            overflow: "hidden",
            zIndex: 51,
          }}
        >
          <Image
            src={LOGO_SRC}
            alt="SRI Logo"
            fill
            style={{ objectFit: "contain" }}
            sizes="130px"
            priority
          />
        </div>

        {/* Centered SRI text */}
        <a
          href="#home"
          style={{
            color: "#ffffff",
            fontSize: "1.125rem",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.15em",
            textDecoration: "none",
            fontWeight: "400",
          }}
        >
          SRI
        </a>
      </div>
    </header>
  );
}
