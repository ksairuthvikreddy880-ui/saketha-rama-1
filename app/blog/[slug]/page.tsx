"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  featuredImage?: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
}

export default function BlogPostPage() {
  const { slug } = useParams() as { slug: string };
  const router = useRouter();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;

    console.log("Fetching blog for slug:", slug);

    fetch(`/api/blogs/slug/${encodeURIComponent(slug)}`)
      .then(async (r) => {
        const data = await r.json();
        console.log("Blog API response:", r.status, data);
        if (r.status === 404 || !data.success) {
          setNotFound(true);
        } else {
          setBlog(data.blog);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Blog fetch error:", err);
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <p style={{ fontFamily: "Georgia, serif", color: "#6B7280", fontSize: "1rem" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (notFound || !blog) {
    return (
      <div style={{
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1.5rem",
      }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "2rem", color: "#111827" }}>
          Blog not found
        </h1>
        <p style={{ fontFamily: "Georgia, serif", color: "#6B7280" }}>
          This blog post doesn't exist or has been removed.
        </p>
        <Link href="/blog" style={{
          padding: "0.75rem 2rem",
          backgroundColor: "#111827",
          color: "#ffffff",
          fontFamily: "system-ui",
          fontSize: "0.875rem",
          textDecoration: "none",
          borderRadius: "6px",
        }}>
          ← Back to All Blogs
        </Link>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "Georgia, serif" }}>
      {/* Top nav bar */}
      <div style={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #E5E7EB",
        padding: "0.875rem 1rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        position: "sticky",
        top: 0,
        zIndex: 10,
        flexWrap: "wrap",
      }}>
        <Link href="/" style={{ fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>
          ← Home
        </Link>
        <span style={{ color: "#E5E7EB" }}>/</span>
        <Link href="/blog" style={{ fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280", textDecoration: "none" }}>
          All Blogs
        </Link>
        <span style={{ color: "#E5E7EB" }}>/</span>
        <span style={{ fontFamily: "system-ui", fontSize: "0.875rem", color: "#111827" }}>
          {blog.title.length > 40 ? blog.title.slice(0, 40) + "..." : blog.title}
        </span>
      </div>

      {/* Hero image */}
      {blog.featuredImage && (
        <div style={{ width: "100%", maxHeight: "480px", overflow: "hidden" }}>
          <img
            src={blog.featuredImage}
            alt={blog.title}
            style={{ width: "100%", maxHeight: "480px", objectFit: "cover" }}
          />
        </div>
      )}

      {/* Article content */}
      <motion.article
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "2rem 1rem 4rem",
        }}
      >
        {/* Category + date */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.25rem" }}>
          <span style={{
            padding: "0.25rem 0.75rem",
            backgroundColor: "#F3F4F6",
            borderRadius: "9999px",
            fontFamily: "system-ui",
            fontSize: "0.75rem",
            color: "#6B7280",
            fontWeight: "500",
          }}>
            {blog.category}
          </span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#9CA3AF" }}>
            {new Date(blog.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
          <span style={{ fontFamily: "Georgia, serif", fontSize: "0.875rem", color: "#9CA3AF" }}>
            By {blog.author}
          </span>
        </div>

        {/* Title */}
        <h1 style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
          fontWeight: "700",
          color: "#111827",
          lineHeight: "1.3",
          marginBottom: "1.25rem",
        }}>
          {blog.title}
        </h1>

        {/* Description / subtitle */}
        <p style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.15rem",
          color: "#4B5563",
          lineHeight: "1.7",
          marginBottom: "2.5rem",
          paddingBottom: "2rem",
          borderBottom: "1px solid #E5E7EB",
          fontStyle: "italic",
        }}>
          {blog.description}
        </p>

        {/* Main content */}
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "1.05rem",
          color: "#374151",
          lineHeight: "1.9",
          whiteSpace: "pre-wrap",
          wordBreak: "break-word",
        }}>
          {blog.content}
        </div>

        {/* Tags */}
        {blog.tags && blog.tags.length > 0 && (
          <div style={{ marginTop: "3rem", paddingTop: "1.5rem", borderTop: "1px solid #E5E7EB" }}>
            <p style={{ fontFamily: "system-ui", fontSize: "0.8rem", color: "#9CA3AF", marginBottom: "0.75rem", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Tags
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {blog.tags.map((tag) => (
                <span key={tag} style={{
                  padding: "0.3rem 0.8rem",
                  backgroundColor: "#F3F4F6",
                  borderRadius: "9999px",
                  fontFamily: "system-ui",
                  fontSize: "0.8rem",
                  color: "#6B7280",
                }}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Back link */}
        <div style={{ marginTop: "3rem" }}>
          <Link href="/blog" style={{
            fontFamily: "Georgia, serif",
            fontSize: "0.95rem",
            color: "#111827",
            textDecoration: "none",
            borderBottom: "1px solid #111827",
            paddingBottom: "2px",
          }}>
            ← Back to All Blogs
          </Link>
        </div>
      </motion.article>
    </div>
  );
}
