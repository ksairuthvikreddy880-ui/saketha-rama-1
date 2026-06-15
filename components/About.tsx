"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Asset path — sourced from /public/assets/about-image.webp
const ABOUT_IMAGE_SRC = "/assets/about-image.webp";

export default function About() {
  return (
    <section
      id="about"
      style={{
        backgroundColor: "#ffffff",
        width: "100%",
        padding: "4rem 1rem",
      }}
    >
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{
            textAlign: "center",
            fontFamily: "Georgia, serif",
            fontSize: "0.85rem",
            fontWeight: "400",
            color: "#555555",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "2.5rem",
          }}
        >
          ABOUT SRI: INNOVATION IN TECH
        </motion.h2>

        {/* Two-column layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2.5rem",
            alignItems: "start",
          }}
        >
          {/* Left — Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ position: "relative" }}
          >
            {/* About image */}
            <div
              style={{
                width: "100%",
                aspectRatio: "4/3",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <Image
                src={ABOUT_IMAGE_SRC}
                alt="About SRI — Innovation in Tech"
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 900px) 100vw, 450px"
                priority
              />
            </div>
          </motion.div>

          {/* Right — Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ textAlign: "center" }}
          >
            <h3
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "1.05rem",
                fontWeight: "700",
                color: "#222222",
                marginBottom: "1rem",
                lineHeight: "1.4",
              }}
            >
              Digital Transformation Expertise
            </h3>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.9375rem",
                color: "#555555",
                lineHeight: "1.8",
                marginBottom: "1rem",
              }}
            >
              At SRI, we specialise in enabling digital transformation for enterprises
              by leveraging cutting-edge AI and Web 4.0 technologies. Our
              solutions help businesses optimise operations and stay ahead in a
              competitive landscape.
            </p>
            <p
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "0.9375rem",
                color: "#555555",
                lineHeight: "1.8",
              }}
            >
              From intelligent automation to decentralised web solutions, our
              team delivers end-to-end technology consulting and development
              services tailored to your unique business needs.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
