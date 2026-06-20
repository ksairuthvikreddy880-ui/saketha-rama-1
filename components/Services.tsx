"use client";

import { motion } from "framer-motion";

export default function Services() {
  return (
    <section
      id="services"
      style={{
        backgroundColor: "#b8cdd6",
        width: "100%",
        padding: "5rem 1rem",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          textAlign: "center",
        }}
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
            fontWeight: "400",
            color: "#222222",
            marginBottom: "1rem",
            lineHeight: "1.3",
          }}
        >
          Advanced AI &amp; Web 4.0 Solutions
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "1rem",
            color: "#444444",
            marginBottom: "2.5rem",
            lineHeight: "1.6",
          }}
        >
          Driving digital transformation with AI, Web 4.0, and cloud tech
        </motion.p>

        {/* Outlined dashed-style button */}
        <motion.a
          href="/services"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          whileHover={{ backgroundColor: "rgba(0,0,0,0.05)" }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.75rem",
            border: "1px solid #333333",
            color: "#333333",
            padding: "0.65rem 1.75rem",
            textDecoration: "none",
            fontSize: "0.8rem",
            fontFamily: "Georgia, serif",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            backgroundColor: "transparent",
            transition: "background-color 0.2s",
          }}
        >
          <span style={{ fontSize: "1rem", lineHeight: 1 }}>—</span>
          EXPLORE OUR SERVICES
          <span style={{ fontSize: "1rem", lineHeight: 1 }}>—</span>
        </motion.a>
      </div>
    </section>
  );
}
