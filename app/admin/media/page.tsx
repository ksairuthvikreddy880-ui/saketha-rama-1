"use client";

import { useState } from "react";

const mediaItems = [
  { id: 1, url: "/assets/blog-post-1.webp", name: "blog-post-1.webp", size: "245 KB", date: "2026-06-18" },
  { id: 2, url: "/assets/about-image.webp", name: "about-image.webp", size: "320 KB", date: "2026-06-15" },
  { id: 3, url: "/assets/logo.jpg", name: "logo.jpg", size: "85 KB", date: "2026-06-10" },
];

export default function MediaLibrary() {
  const [searchTerm, setSearchTerm] = useState("");

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
          Media Library
        </h1>
        <button
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
          + Upload Media
        </button>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search media..."
          style={{
            width: "100%",
            maxWidth: "400px",
            padding: "0.75rem 1rem",
            border: "1px solid #E5E7EB",
            borderRadius: "6px",
            fontFamily: "system-ui",
            fontSize: "0.875rem",
            color: "#111827",
            backgroundColor: "#FFFFFF",
            outline: "none",
          }}
        />
      </div>

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {mediaItems.map((item) => (
          <div
            key={item.id}
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              overflow: "hidden",
              transition: "box-shadow 0.2s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
          >
            <div style={{ width: "100%", height: "160px", position: "relative", backgroundColor: "#F8FAFC" }}>
              <img src={item.url} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ padding: "1rem" }}>
              <p
                style={{
                  fontFamily: "system-ui",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#111827",
                  margin: "0 0 0.25rem 0",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {item.name}
              </p>
              <p
                style={{
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  color: "#6B7280",
                  margin: "0 0 0.75rem 0",
                }}
              >
                {item.size} • {item.date}
              </p>
              <button
                style={{
                  width: "100%",
                  padding: "0.5rem",
                  backgroundColor: "transparent",
                  border: "1px solid #E5E7EB",
                  borderRadius: "6px",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  color: "#EF4444",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
