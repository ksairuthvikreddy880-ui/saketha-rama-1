"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
      {/* Video background */}
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

      {/* Dark overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, rgba(0,18,51,0.4) 0%, rgba(0,18,51,0.7) 100%)",
          zIndex: 2,
        }}
      />

      {/* ── DESKTOP layout (≥640px): logo left, text right ── */}
      <style>{`
        .hero-desktop { display: flex; }
        .hero-mobile  { display: none; }
        @media (max-width: 639px) {
          .hero-desktop { display: none !important; }
          .hero-mobile  { display: flex !important; }
        }
      `}</style>

      {/* DESKTOP */}
      <div
        className="hero-desktop"
        style={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          alignItems: "center",
          padding: "0 3rem",
          gap: "2.5rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          style={{ flexShrink: 0 }}
        >
          <div style={{ width: "220px", height: "220px", position: "relative", borderRadius: "12px", overflow: "hidden", boxShadow: "0 8px 32px rgba(59,130,246,0.3)" }}>
            <Image src={LOGO_SRC} alt="SRI Logo" fill style={{ objectFit: "cover" }} priority />
          </div>
        </motion.div>

        {/* Text */}
        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: "bold", color: "#ffffff", letterSpacing: "0.05em", margin: 0, lineHeight: 1.2 }}>
              SRI SAKETHA RAMA
            </h1>
            <div style={{ position: "relative", display: "inline-block" }}>
              <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.4rem, 3vw, 2.5rem)", fontWeight: "normal", color: "#60a5fa", letterSpacing: "0.2em", margin: "0.5rem 0 0 0", textTransform: "uppercase" }}>
                INNOVATIONS
              </h2>
              <div style={{ position: "absolute", bottom: "-8px", left: 0, width: "100%", height: "2px", background: "linear-gradient(90deg, #3b82f6, transparent)" }} />
            </div>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontFamily: "Georgia, serif", fontSize: "clamp(0.9rem, 1.5vw, 1.1rem)", color: "#e0e7ff", marginTop: "1.5rem", letterSpacing: "0.03em" }}>
            Advanced <span style={{ color: "#60a5fa", fontWeight: "bold" }}>AI</span>.{" "}
            <span style={{ color: "#60a5fa", fontWeight: "bold" }}>Web 4.0</span>. Digital Transformation.
          </motion.p>
        </div>
      </div>

      {/* MOBILE — stacked: logo top-center, text below center */}
      <div
        className="hero-mobile"
        style={{
          position: "relative",
          zIndex: 3,
          height: "100%",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem 1.5rem",
          gap: "1.75rem",
          textAlign: "center",
        }}
      >
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ width: "140px", height: "140px", position: "relative", borderRadius: "10px", overflow: "hidden", boxShadow: "0 6px 24px rgba(59,130,246,0.3)" }}>
            <Image src={LOGO_SRC} alt="SRI Logo" fill style={{ objectFit: "cover" }} priority />
          </div>
        </motion.div>

        <div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.6rem, 6vw, 2.4rem)", fontWeight: "bold", color: "#ffffff", letterSpacing: "0.05em", margin: 0, lineHeight: 1.2 }}>
              SRI SAKETHA RAMA
            </h1>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(1.1rem, 4vw, 1.6rem)", fontWeight: "normal", color: "#60a5fa", letterSpacing: "0.15em", margin: "0.4rem 0 0 0", textTransform: "uppercase" }}>
              INNOVATIONS
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.4 }} style={{ fontFamily: "Georgia, serif", fontSize: "0.9rem", color: "#e0e7ff", marginTop: "1rem", letterSpacing: "0.02em", lineHeight: 1.6 }}>
            Advanced <span style={{ color: "#60a5fa", fontWeight: "bold" }}>AI</span>.{" "}
            <span style={{ color: "#60a5fa", fontWeight: "bold" }}>Web 4.0</span>. Digital Transformation.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
