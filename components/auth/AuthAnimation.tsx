"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const LOGO_SRC = "/assets/logo.jpg";

export default function AuthAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Particle network
    const PARTICLE_COUNT = 80;
    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      r: number; opacity: number;
    }[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1,
        opacity: Math.random() * 0.6 + 0.2,
      });
    }

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Move & draw particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${p.opacity})`;
        ctx.fill();
      }

      // Draw connection lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        background: "linear-gradient(135deg, #020b18 0%, #041830 40%, #051f40 70%, #020d1f 100%)",
        overflow: "hidden",
      }}
    >
      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      />

      {/* Glowing orbs */}
      <div style={{ position: "absolute", top: "20%", left: "30%", width: "180px", height: "180px", borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)", filter: "blur(20px)" }} />
      <div style={{ position: "absolute", bottom: "25%", right: "20%", width: "140px", height: "140px", borderRadius: "50%", background: "radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)", filter: "blur(16px)" }} />

      {/* Dark gradient overlay */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.4) 100%)" }} />

      {/* Centered content */}
      <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem", zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ width: "80px", height: "80px", position: "relative", borderRadius: "12px", overflow: "hidden", border: "2px solid rgba(56,189,248,0.3)", boxShadow: "0 0 30px rgba(56,189,248,0.2)" }}
        >
          <Image src={LOGO_SRC} alt="SRI Logo" fill style={{ objectFit: "contain" }} sizes="80px" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ textAlign: "center" }}
        >
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", color: "#ffffff", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "400", marginBottom: "0.5rem" }}>
            Sri Saketha Rama
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "1.35rem", color: "#38bdf8", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: "400", marginBottom: "1rem" }}>
            Innovations
          </p>
          <p style={{ fontFamily: "Georgia, serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.5)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Advanced AI &amp; Web 4.0 Solutions
          </p>
        </motion.div>

        {/* Floating digital elements */}
        {["AI", "4.0", "ML", "IoT", "API"].map((tag, i) => (
          <motion.div
            key={tag}
            animate={{ y: [0, -10, 0], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
            style={{
              position: "absolute",
              top: `${20 + i * 12}%`,
              left: i % 2 === 0 ? `${10 + i * 3}%` : undefined,
              right: i % 2 !== 0 ? `${10 + i * 2}%` : undefined,
              fontFamily: "monospace",
              fontSize: "0.7rem",
              color: "rgba(56,189,248,0.6)",
              border: "1px solid rgba(56,189,248,0.2)",
              padding: "0.2rem 0.5rem",
              borderRadius: "4px",
              backdropFilter: "blur(4px)",
            }}
          >
            {tag}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
