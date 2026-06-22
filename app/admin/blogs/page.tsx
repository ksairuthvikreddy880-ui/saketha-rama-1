"use client";

import { useState, useEffect } from "react";

interface Blog {
  _id: string;
  title: string;
  category: string;
  status: string;
  featuredImage?: string;
  createdAt: string;
}

export default function ManageBlogs() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);

  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.success) setBlogs(data.blogs);
    } catch (err) {
      console.error("Failed to fetch blogs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog? This cannot be undone.")) return;
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

  const filtered = blogs.filter((b) =>
    b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <style>{`
        .blogs-table-wrap { display: block; }
        .blogs-cards-wrap { display: none; }
        @media (max-width: 700px) {
          .blogs-table-wrap { display: none !important; }
          .blogs-cards-wrap { display: flex !important; flex-direction: column; gap: 0.875rem; }
        }
      `}</style>

      <div>
        {/* Page header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h1 style={{ fontFamily: "system-ui", fontSize: "clamp(1.4rem, 5vw, 2rem)", fontWeight: "600", color: "#111827", margin: 0 }}>
            Manage Blogs
          </h1>
          <a
            href="/admin/blogs/add"
            style={{ padding: "0.6rem 1.1rem", backgroundColor: "#111827", border: "none", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.875rem", fontWeight: "500", color: "#FFFFFF", textDecoration: "none", display: "inline-block", whiteSpace: "nowrap" }}
          >
            + Add New Blog
          </a>
        </div>

        {/* Search */}
        <div style={{ marginBottom: "1.25rem" }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search blogs by title or category..."
            style={{ width: "100%", maxWidth: "400px", padding: "0.7rem 1rem", border: "1px solid #E5E7EB", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.875rem", color: "#111827", backgroundColor: "#FFFFFF", outline: "none", boxSizing: "border-box" }}
          />
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", fontFamily: "system-ui", color: "#6B7280" }}>Loading blogs...</div>
        ) : filtered.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", fontFamily: "system-ui", color: "#6B7280", backgroundColor: "#fff", borderRadius: "12px", border: "1px solid #E5E7EB" }}>
            {searchTerm ? "No blogs match your search." : "No blogs yet. Add your first blog!"}
          </div>
        ) : (
          <>
            {/* ── DESKTOP TABLE ── */}
            <div className="blogs-table-wrap" style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "12px", overflow: "hidden" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                  <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
                    {["Image", "Title", "Category", "Status", "Date", "Actions"].map((col, i) => (
                      <th key={col} style={{ padding: "0.875rem 1rem", fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: "600", color: "#6B7280", textAlign: i === 5 ? "right" : "left", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((blog, index) => (
                    <tr key={blog._id} style={{ borderBottom: index < filtered.length - 1 ? "1px solid #E5E7EB" : "none" }}>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <div style={{ width: "56px", height: "38px", borderRadius: "4px", overflow: "hidden", backgroundColor: "#F3F4F6", display: "flex", alignItems: "center", justifyContent: "center" }}>
                          {blog.featuredImage ? (
                            <img src={blog.featuredImage} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                          ) : (
                            <span style={{ fontSize: "0.6rem", color: "#9CA3AF", fontFamily: "system-ui" }}>No img</span>
                          )}
                        </div>
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#111827", maxWidth: "220px" }}>
                        <div style={{ fontWeight: "500", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{blog.title}</div>
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280", whiteSpace: "nowrap" }}>{blog.category}</td>
                      <td style={{ padding: "0.875rem 1rem" }}>
                        <span style={{ display: "inline-block", padding: "0.2rem 0.65rem", borderRadius: "9999px", fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: "500", backgroundColor: blog.status === "published" ? "#DCFCE7" : "#FEF3C7", color: blog.status === "published" ? "#166534" : "#92400E" }}>
                          {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                        </span>
                      </td>
                      <td style={{ padding: "0.875rem 1rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280", whiteSpace: "nowrap" }}>
                        {new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </td>
                      <td style={{ padding: "0.875rem 1rem", textAlign: "right", whiteSpace: "nowrap" }}>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          disabled={deleting === blog._id}
                          style={{ padding: "0.35rem 0.7rem", backgroundColor: "transparent", border: "1px solid #E5E7EB", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.75rem", color: "#EF4444", cursor: deleting === blog._id ? "not-allowed" : "pointer", opacity: deleting === blog._id ? 0.5 : 1 }}
                        >
                          {deleting === blog._id ? "..." : "Delete"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* ── MOBILE CARDS ── */}
            <div className="blogs-cards-wrap">
              {filtered.map((blog) => (
                <div key={blog._id} style={{ backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "10px", padding: "1rem", display: "flex", gap: "0.875rem", alignItems: "flex-start" }}>
                  {/* Thumbnail */}
                  <div style={{ width: "64px", height: "48px", borderRadius: "6px", overflow: "hidden", backgroundColor: "#F3F4F6", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {blog.featuredImage ? (
                      <img src={blog.featuredImage} alt={blog.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    ) : (
                      <span style={{ fontSize: "0.6rem", color: "#9CA3AF", fontFamily: "system-ui" }}>No img</span>
                    )}
                  </div>

                  {/* Info */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "system-ui", fontSize: "0.875rem", fontWeight: "600", color: "#111827", margin: "0 0 0.3rem 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {blog.title}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
                      <span style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#6B7280" }}>{blog.category}</span>
                      <span style={{ display: "inline-block", padding: "0.15rem 0.55rem", borderRadius: "9999px", fontFamily: "system-ui", fontSize: "0.7rem", fontWeight: "500", backgroundColor: blog.status === "published" ? "#DCFCE7" : "#FEF3C7", color: blog.status === "published" ? "#166534" : "#92400E" }}>
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </span>
                      <span style={{ fontFamily: "system-ui", fontSize: "0.7rem", color: "#9CA3AF" }}>
                        {new Date(blog.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                      </span>
                    </div>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={deleting === blog._id}
                    style={{ padding: "0.35rem 0.65rem", backgroundColor: "transparent", border: "1px solid #FECACA", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.75rem", color: "#EF4444", cursor: deleting === blog._id ? "not-allowed" : "pointer", opacity: deleting === blog._id ? 0.5 : 1, flexShrink: 0 }}
                  >
                    {deleting === blog._id ? "..." : "Delete"}
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        <div style={{ marginTop: "0.875rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#9CA3AF" }}>
          {filtered.length} blog{filtered.length !== 1 ? "s" : ""} total
        </div>
      </div>
    </>
  );
}
