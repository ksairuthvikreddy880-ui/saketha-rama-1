"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Asset paths — replace these files in /public/assets/
const BLOG_BG_SRC = "/assets/blog-bg.webp";
const BLOG_POST_1_SRC = "/assets/blog-post-1.webp";

export default function Blog() {
  return (
    <section
      id="blog"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "460px",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
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
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
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
            textShadow: "0 1px 6px rgba(0,0,0,0.25)",
          }}
        >
          My Blog
        </motion.h2>

        {/* Single blog card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          style={{
            backgroundColor: "#ffffff",
            width: "260px",
            margin: "0 auto",
            boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
            display: "inline-block",
            textAlign: "left",
          }}
        >
          {/* Card image */}
          <a href="/blog/ai-web-4-powering-digital-transformation" style={{ display: "block" }}>
          <div
            style={{
              width: "260px",
              height: "170px",
              position: "relative",
              overflow: "hidden",
              backgroundColor: "#c8d8e4",
            }}
          >
            <Image
              src={BLOG_POST_1_SRC}
              alt="AI & Web 4.0: Powering Digital Transformation"
              fill
              style={{ objectFit: "cover" }}
              sizes="260px"
              priority
            />
          </div>
          </a>

          {/* Card body */}
          <div style={{ padding: "1.25rem 1.5rem 1.75rem" }}>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.8rem",
                color: "#888888",
                marginBottom: "0.6rem",
              }}
            >
              15 June 2026
            </p>
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1rem",
                fontWeight: "700",
                color: "#222222",
                lineHeight: "1.5",
                marginBottom: "1rem",
              }}
            >
              AI &amp; Web 4.0: Powering Digital Transformation
            </h3>
            <a
              href="/blog/ai-web-4-powering-digital-transformation"
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.875rem",
                color: "#555555",
                textDecoration: "none",
                display: "inline-block",
              }}
            >
              Continue Reading
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
