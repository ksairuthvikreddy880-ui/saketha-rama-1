"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

const BLOG_BG_SRC = "/assets/blog-bg.webp";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  featuredImage?: string;
  category: string;
  createdAt: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blogs?status=published&limit=4")
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setBlogs(data.blogs);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section
      id="blog"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "500px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "3.5rem 1rem 5rem",
      }}
      aria-label="Blog section"
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${BLOG_BG_SRC})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundColor: "#c8c8c8",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1100px", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            fontWeight: "400",
            color: "#ffffff",
            marginBottom: "2.5rem",
            textAlign: "center",
            textShadow: "0 1px 6px rgba(0,0,0,0.25)",
          }}
        >
          My Blog
        </motion.h2>

        {/* Loading state */}
        {loading && (
          <div style={{ textAlign: "center", color: "#ffffff", fontFamily: "Georgia, serif", fontSize: "1rem" }}>
            Loading blogs...
          </div>
        )}

        {/* No blogs */}
        {!loading && blogs.length === 0 && (
          <div style={{ textAlign: "center", color: "#ffffff", fontFamily: "Georgia, serif", fontSize: "1rem", opacity: 0.8 }}>
            No blogs published yet.
          </div>
        )}

        {/* Blog cards grid */}
        {!loading && blogs.length > 0 && (
          <>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "1.5rem",
              justifyItems: "center",
            }}>
              {blogs.map((blog, i) => (
                <motion.div
                  key={blog._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -4, transition: { duration: 0.2 } }}
                  style={{
                    backgroundColor: "#ffffff",
                    width: "100%",
                    maxWidth: "280px",
                    boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
                    textAlign: "left",
                  }}
                >
                  {/* Card image */}
                  <Link href={`/blog/${blog.slug}`} style={{ display: "block" }}>
                    <div style={{
                      width: "100%",
                      height: "170px",
                      overflow: "hidden",
                      backgroundColor: "#c8d8e4",
                      position: "relative",
                    }}>
                      {blog.featuredImage ? (
                        <img
                          src={blog.featuredImage}
                          alt={blog.title}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{
                          width: "100%",
                          height: "100%",
                          backgroundColor: "#b8cdd6",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}>
                          <span style={{ fontFamily: "Georgia, serif", color: "#ffffff", fontSize: "0.875rem" }}>
                            {blog.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Card body */}
                  <div style={{ padding: "1.25rem 1.5rem 1.75rem" }}>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "#888888", marginBottom: "0.6rem" }}>
                      {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </p>
                    <h3 style={{
                      fontFamily: "Georgia, serif",
                      fontSize: "1rem",
                      fontWeight: "700",
                      color: "#222222",
                      lineHeight: "1.5",
                      marginBottom: "1rem",
                    }}>
                      {blog.title}
                    </h3>
                    <Link
                      href={`/blog/${blog.slug}`}
                      style={{
                        fontFamily: "Georgia, serif",
                        fontSize: "0.875rem",
                        color: "#555555",
                        textDecoration: "none",
                      }}
                    >
                      Continue Reading
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* See More button — shown when there could be more than 4 */}
            {blogs.length >= 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                style={{ textAlign: "center", marginTop: "2.5rem" }}
              >
                <Link
                  href="/blog"
                  style={{
                    display: "inline-block",
                    padding: "0.75rem 2.5rem",
                    backgroundColor: "transparent",
                    border: "2px solid #ffffff",
                    color: "#ffffff",
                    fontFamily: "Georgia, serif",
                    fontSize: "0.95rem",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "#ffffff";
                    e.currentTarget.style.color = "#222222";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#ffffff";
                  }}
                >
                  See More
                </Link>
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
