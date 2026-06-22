"use client";

import { useEffect, useState } from "react";

interface Blog {
  _id: string;
  title: string;
  status: string;
  author: string;
  createdAt: string;
}

export default function RecentBlogsTable() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = () => {
    fetch("/api/blogs?limit=5")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog? This cannot be undone.")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/blogs/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (res.ok && data.success) {
        setBlogs((prev) => prev.filter((b) => b._id !== id));
      } else {
        alert("Failed to delete: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Network error. Please try again.");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div>
      <h2 style={{
        fontFamily: "system-ui",
        fontSize: "1.25rem",
        fontWeight: "600",
        color: "#111827",
        marginBottom: "1rem",
      }}>
        Recent Blogs
      </h2>

      <div style={{
        backgroundColor: "#FFFFFF",
        border: "1px solid #E5E7EB",
        borderRadius: "12px",
        overflow: "hidden",
      }}>
        {loading ? (
          <div style={{ padding: "2.5rem", textAlign: "center", fontFamily: "system-ui", color: "#6B7280" }}>
            Loading...
          </div>
        ) : blogs.length === 0 ? (
          <div style={{ padding: "2.5rem", textAlign: "center", fontFamily: "system-ui", color: "#6B7280" }}>
            No blogs yet. <a href="/admin/blogs/add" style={{ color: "#111827", fontWeight: "500" }}>Add your first blog →</a>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
                {["Title", "Status", "Date", "Author", "Actions"].map((col, i) => (
                  <th key={col} style={{
                    padding: "0.875rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.75rem",
                    fontWeight: "600",
                    color: "#6B7280",
                    textAlign: i === 4 ? "right" : "left",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  style={{
                    borderBottom: index < blogs.length - 1 ? "1px solid #E5E7EB" : "none",
                    transition: "background-color 0.15s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
                >
                  <td style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#111827",
                    maxWidth: "300px",
                  }}>
                    {blog.title}
                  </td>
                  <td style={{ padding: "1rem 1.25rem" }}>
                    <span style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontFamily: "system-ui",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor: blog.status === "published" ? "#DCFCE7" : "#FEF3C7",
                      color: blog.status === "published" ? "#166534" : "#92400E",
                    }}>
                      {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                    </span>
                  </td>
                  <td style={{ padding: "1rem 1.25rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280" }}>
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit", month: "short", year: "numeric"
                    })}
                  </td>
                  <td style={{ padding: "1rem 1.25rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280" }}>
                    {blog.author}
                  </td>
                  <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                    <a
                      href={`/admin/blogs/add?edit=${blog._id}`}
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
                        textDecoration: "none",
                        display: "inline-block",
                      }}
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(blog._id)}
                      disabled={deleting === blog._id}
                      style={{
                        padding: "0.375rem 0.75rem",
                        backgroundColor: "transparent",
                        border: "1px solid #E5E7EB",
                        borderRadius: "6px",
                        fontFamily: "system-ui",
                        fontSize: "0.75rem",
                        color: "#EF4444",
                        cursor: deleting === blog._id ? "not-allowed" : "pointer",
                        opacity: deleting === blog._id ? 0.5 : 1,
                      }}
                    >
                      {deleting === blog._id ? "..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
