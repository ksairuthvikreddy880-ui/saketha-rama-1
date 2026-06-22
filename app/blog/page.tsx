"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage?: string;
  category: string;
  createdAt: string;
}

export default function AllBlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/blogs?status=published")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = blogs.filter(
    (b) =>
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.category.toLowerCase().includes(search.toLowerCase()) ||
      b.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#F8FAFC", fontFamily: "Georgia, serif" }}>
      {/* Header bar */}
      <div style={{ backgroundColor: "#ffffff", borderBottom: "1px solid #E5E7EB", padding: "0.875rem 1rem", display: "flex", alignItems: "center", gap: "1rem" }}>
        <Link href="/" style={{ fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>
          ← Back to Home
        </Link>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem" }}>
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2.5rem", textAlign: "center" }}
        >
          <h1 style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: "400",
            color: "#111827",
            marginBottom: "0.75rem",
          }}>
            All Blogs
          </h1>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1rem", color: "#6B7280" }}>
            Insights, ideas and innovations from SRI
          </p>
        </motion.div>

        {/* Search */}
        <div style={{ marginBottom: "2rem", display: "flex", justifyContent: "center" }}>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blogs..."
            style={{
              width: "100%",
              maxWidth: "480px",
              padding: "0.75rem 1.25rem",
              border: "1px solid #E5E7EB",
              borderRadius: "9999px",
              fontFamily: "Georgia, serif",
              fontSize: "0.9rem",
              color: "#111827",
              backgroundColor: "#ffffff",
              outline: "none",
            }}
          />
        </div>

        {/* Loading */}
        {loading && (
          <div style={{ textAlign: "center", color: "#6B7280", padding: "4rem 0", fontFamily: "Georgia, serif" }}>
            Loading blogs...
          </div>
        )}

        {/* No results */}
        {!loading && filtered.length === 0 && (
          <div style={{ textAlign: "center", color: "#6B7280", padding: "4rem 0", fontFamily: "Georgia, serif" }}>
            {search ? "No blogs match your search." : "No blogs published yet."}
          </div>
        )}

        {/* Blog grid */}
        {!loading && filtered.length > 0 && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))",
            gap: "1.5rem",
          }}>
            {filtered.map((blog, i) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                style={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #E5E7EB",
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                }}
              >
                {/* Image */}
                <Link href={`/blog/${blog.slug}`}>
                  <div style={{ width: "100%", height: "200px", overflow: "hidden", backgroundColor: "#b8cdd6" }}>
                    {blog.featuredImage ? (
                      <img
                        src={blog.featuredImage}
                        alt={blog.title}
                        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s ease" }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.04)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
                      />
                    ) : (
                      <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#b8cdd6",
                      }}>
                        <span style={{ fontFamily: "Georgia, serif", color: "#ffffff", fontSize: "1rem" }}>
                          {blog.category}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Body */}
                <div style={{ padding: "1.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
                    <span style={{
                      padding: "0.2rem 0.6rem",
                      backgroundColor: "#F3F4F6",
                      borderRadius: "9999px",
                      fontFamily: "system-ui",
                      fontSize: "0.7rem",
                      color: "#6B7280",
                      fontWeight: "500",
                    }}>
                      {blog.category}
                    </span>
                    <span style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#9CA3AF" }}>
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <h2 style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    color: "#111827",
                    lineHeight: "1.5",
                    marginBottom: "0.75rem",
                  }}>
                    {blog.title}
                  </h2>

                  <p style={{
                    fontFamily: "Georgia, serif",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                    lineHeight: "1.6",
                    marginBottom: "1.25rem",
                    display: "-webkit-box",
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}>
                    {blog.description}
                  </p>

                  <Link
                    href={`/blog/${blog.slug}`}
                    style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "0.875rem",
                      color: "#111827",
                      textDecoration: "none",
                      fontWeight: "600",
                      borderBottom: "1px solid #111827",
                      paddingBottom: "1px",
                    }}
                  >
                    Continue Reading →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div style={{ textAlign: "center", marginTop: "2rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#9CA3AF" }}>
            Showing {filtered.length} blog{filtered.length !== 1 ? "s" : ""}
          </div>
        )}
      </div>
    </div>
  );
}
