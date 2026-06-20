"use client";

import { motion } from "framer-motion";
import Image from "next/image";

// Asset path — /public/assets/hero-video.mp4
const HERO_VIDEO_SRC = "/assets/hero-video.mp4";
const LOGO_SRC = "/assets/logo.jpg";

export default function Hero() {
  return (
    <section
      id="home"
      style={{
        position: "relative",
        width: "100%",
        height: "calc(100vh - 52px)",
        overflow: "hidden",
        backgroundColor: "#001233",
      }}
      aria-label="Hero section"
    >
      {/* Video — z-index 1 so it sits above the bg color */}
      <video
        src={HERO_VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          zIndex: 1,
        }}
        aria-hidden="true"
      />

      {/* Dark overlay for better text readability */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, rgba(0, 18, 51, 0.4) 0%, rgba(0, 18, 51, 0.7) 100%)",
          zIndex: 2,
        }}
      />

      {/* Logo - positioned on the left */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          left: "3rem",
          top: "35%",
          transform: "translateY(-50%)",
          zIndex: 3,
        }}
      >
        <div
          style={{
            width: "240px",
            height: "240px",
            position: "relative",
            borderRadius: "12px",
            overflow: "hidden",
            boxShadow: "0 8px 32px rgba(59, 130, 246, 0.3)",
          }}
        >
          <Image
            src={LOGO_SRC}
            alt="SRI Logo"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
      </motion.div>

      {/* Content container - aligned left with logo */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 1rem 0 300px",
          maxWidth: "1400px",
        }}
      >
        {/* Company Name */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            textAlign: "left",
            marginBottom: "1rem",
          }}
        >
          <h1
            style={{
              fontFamily: "Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "0.05em",
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            SRI SAKETHA RAMA
          </h1>
          <div
            style={{
              position: "relative",
              display: "inline-block",
            }}
          >
            <h2
              style={{
                fontFamily: "Georgia, serif",
                fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
                fontWeight: "normal",
                color: "#60a5fa",
                letterSpacing: "0.2em",
                margin: "0.5rem 0 0 0",
                textTransform: "uppercase",
              }}
            >
              INNOVATIONS
            </h2>
            <div
              style={{
                position: "absolute",
                bottom: "-8px",
                left: 0,
                width: "100%",
                height: "2px",
                background: "linear-gradient(90deg, #3b82f6, transparent)",
              }}
            />
          </div>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(0.95rem, 1.5vw, 1.1rem)",
            color: "#e0e7ff",
            textAlign: "left",
            letterSpacing: "0.03em",
          }}
        >
          Advanced <span style={{ color: "#60a5fa", fontWeight: "bold" }}>AI</span>.{" "}
          <span style={{ color: "#60a5fa", fontWeight: "bold" }}>Web 4.0</span>. Digital Transformation.
        </motion.p>
      </div>
    </section>
  );
}
