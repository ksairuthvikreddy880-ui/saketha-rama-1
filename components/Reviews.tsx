"use client";

import { motion } from "framer-motion";

// Asset path — replace /assets/reviews-bg.jpg with your actual background image
const REVIEWS_BG_SRC = "/assets/reviews-bg.webp";

export default function Reviews() {
  return (
    <section
      id="reviews"
      style={{
        position: "relative",
        width: "100%",
        minHeight: "220px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      aria-label="Reviews section"
    >
      {/* Background image */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url(${REVIEWS_BG_SRC})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          /* Fallback color when image hasn't loaded */
          backgroundColor: "#c8b4a0",
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "900px",
          margin: "0 auto",
          padding: "3rem 1rem",
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.25rem)",
            fontWeight: "400",
            color: "#ffffff",
            marginBottom: "1.5rem",
            textShadow: "0 1px 4px rgba(0,0,0,0.3)",
          }}
        >
          Discover what people are saying
        </motion.h2>

        {/* Dark review box */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            backgroundColor: "rgba(30, 30, 30, 0.88)",
            color: "#ffffff",
            maxWidth: "540px",
            margin: "0 auto",
            padding: "1rem 2rem",
            fontFamily: "Georgia, serif",
            fontSize: "0.9375rem",
            lineHeight: "1.7",
          }}
        >
          Reviews coming soon!
        </motion.div>
      </div>
    </section>
  );
}
