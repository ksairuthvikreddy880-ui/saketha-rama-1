"use client";

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
        }}
      >
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
