"use client";

import { useState } from "react";
import Image from "next/image";

const blogs = [
  {
    id: 1,
    image: "/assets/blog-post-1.webp",
    title: "AI & Web 4.0: Powering Digital Transformation",
    category: "Technology",
    status: "Published",
    date: "2026-06-18",
  },
  {
    id: 2,
    image: "/assets/blog-post-1.webp",
    title: "The Future of Cloud Computing",
    category: "Cloud",
    status: "Published",
    date: "2026-06-15",
  },
  {
    id: 3,
    image: "/assets/blog-post-1.webp",
    title: "Building Scalable Web Applications",
    category: "Development",
    status: "Draft",
    date: "2026-06-14",
  },
];

export default function ManageBlogs() {
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
          Manage Blogs
        </h1>
        <a
          href="/admin/blogs/add"
          style={{
            padding: "0.625rem 1.25rem",
            backgroundColor: "#111827",
            border: "none",
            borderRadius: "6px",
            fontFamily: "system-ui",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#FFFFFF",
            textDecoration: "none",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          + Add New Blog
        </a>
      </div>

      {/* Search */}
      <div style={{ marginBottom: "1.5rem" }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search blogs..."
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

      {/* Table */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Image
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Category
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Date
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "right",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr
                key={blog.id}
                style={{
                  borderBottom: index < blogs.length - 1 ? "1px solid #E5E7EB" : "none",
                }}
              >
                <td style={{ padding: "1rem 1.25rem" }}>
                  <div style={{ width: "60px", height: "40px", position: "relative", borderRadius: "4px", overflow: "hidden" }}>
                    <Image src={blog.image} alt={blog.title} fill style={{ objectFit: "cover" }} />
                  </div>
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#111827",
                  }}
                >
                  {blog.title}
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                  }}
                >
                  {blog.category}
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontFamily: "system-ui",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor: blog.status === "Published" ? "#DCFCE7" : "#FEF3C7",
                      color: blog.status === "Published" ? "#166534" : "#92400E",
                    }}
                  >
                    {blog.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                  }}
                >
                  {blog.date}
                </td>
                <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                  <button
                    style={{
                      padding: "0.375rem 0.75rem",
                      backgroundColor: "transparent",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      fontFamily: "system-ui",
                      fontSize: "0.75rem",
                      color: "#6B7280",
                      cursor: "pointer",
                      marginRight: "0.5rem",
                    }}
                  >
                    Edit
                  </button>
                  <button
                    style={{
                      padding: "0.375rem 0.75rem",
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
