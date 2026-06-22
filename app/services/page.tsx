import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services | Sri Saketha Rama Innovations",
  description:
    "Explore our core expertise — System Design, SaaS Solutions, IT Infrastructure, Tech Support, Product Development, Consulting and more.",
};

const LOGO_SRC = "/assets/logo.jpg";
const ABOUT_IMAGE_SRC = "/assets/logo.jpg";

const services = [
  {
    title: "System Design & Development",
    description:
      "Designing and developing scalable, efficient software systems tailored to complex business needs.",
  },
  {
    title: "SaaS Solutions & Testing",
    description:
      "Delivering cloud-based SaaS platforms with rigorous testing to ensure stability and user satisfaction.",
  },
  {
    title: "Contracting & Staffing Solutions",
    description:
      "Connecting organizations with skilled technology professionals for contract, permanent, and project-based roles.",
  },
  {
    title: "IT Infrastructure Management",
    description:
      "Managing and optimizing IT infrastructure to ensure reliability, security, and operational continuity.",
  },
  {
    title: "Tech Support Services",
    description:
      "Providing responsive technical support to keep systems running smoothly and minimize business disruption.",
  },
  {
    title: "Problem Solving & Consulting",
    description:
      "Providing strategic technology consulting to diagnose challenges and design effective, lasting solutions.",
  },
  {
    title: "Product Development",
    description:
      "Building market-ready software products from concept through launch with a focus on quality and performance.",
  },
  {
    title: "Advanced AI & Web 4.0",
    description:
      "Driving digital transformation with intelligent AI systems and next-generation Web 4.0 architectures.",
  },
  {
    title: "Cost Plus IT Services",
    description:
      "Delivering transparent, cost-efficient IT services structured to align with your budget and business objectives.",
  },
];

const process = [
  { step: "01", title: "Discovery", desc: "We begin with a deep-dive consultation to understand your business goals, challenges, and technology landscape." },
  { step: "02", title: "Strategy", desc: "Our experts craft a tailored roadmap aligned with your objectives, budget, and timeline." },
  { step: "03", title: "Execution", desc: "Agile development with transparent communication, regular reviews, and iterative delivery." },
  { step: "04", title: "Support", desc: "Post-launch maintenance, monitoring, and continuous improvement to keep your systems at peak performance." },
];

export default function ServicesPage() {
  const textStyle = {
    fontFamily: "Georgia, 'Times New Roman', serif",
  };

  return (
    <>
      {/* ── Header ── */}
      <header style={{ backgroundColor: "#4a4a4a", width: "100%", position: "sticky" as const, top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 1rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "52px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.6rem", textDecoration: "none", minWidth: 0, flex: 1 }}>
            <div style={{ width: "44px", height: "44px", position: "relative", overflow: "hidden", flexShrink: 0 }}>
              <Image src={LOGO_SRC} alt="SRI Logo" fill style={{ objectFit: "contain" }} sizes="44px" priority />
            </div>
            <span style={{ ...textStyle, color: "#ffffff", fontSize: "clamp(0.65rem, 2vw, 1rem)", letterSpacing: "0.1em", fontWeight: "400", textTransform: "uppercase" as const, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" as const }}>
              Sri Saketha Rama Innovations
            </span>
          </Link>
        </div>
      </header>

      <main style={{ backgroundColor: "#ffffff" }}>

        {/* ── Hero — steel blue, matches Services section ── */}
        <section style={{ backgroundColor: "#b8cdd6", padding: "5rem 1.5rem", textAlign: "center" }}>
          <h1 style={{ ...textStyle, fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: "400", color: "#222222", marginBottom: "1rem", lineHeight: "1.3" }}>
            Advanced AI &amp; Web 4.0 Solutions
          </h1>
          <p style={{ ...textStyle, fontSize: "1rem", color: "#444444", marginBottom: "2.5rem" }}>
            Driving digital transformation with AI, Web 4.0, and cloud tech
          </p>
          <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: "1px solid #333333", color: "#333333", padding: "0.65rem 1.75rem", textDecoration: "none", fontSize: "0.8rem", ...textStyle, letterSpacing: "0.15em", textTransform: "uppercase" as const, backgroundColor: "transparent" }}>
            <span>—</span> GET IN TOUCH <span>—</span>
          </Link>
        </section>

        {/* ── Core Expertise ── */}
        <section style={{ backgroundColor: "#ffffff", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "1024px", margin: "0 auto" }}>
            <p style={{ ...textStyle, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c47a3a", marginBottom: "0.6rem" }}>
              WHAT WE DO
            </p>
            <h2 style={{ ...textStyle, fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", fontWeight: "700", color: "#111111", marginBottom: "3rem" }}>
              Core Expertise
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem 2rem" }}>
              {services.map((svc) => (
                <div key={svc.title} style={{ borderLeft: "3px solid #c47a3a", paddingLeft: "1.25rem" }}>
                  <h3 style={{ ...textStyle, fontSize: "1rem", fontWeight: "700", color: "#111111", marginBottom: "0.6rem", lineHeight: "1.4" }}>
                    {svc.title}
                  </h3>
                  <p style={{ ...textStyle, fontSize: "0.875rem", color: "#666666", lineHeight: "1.75" }}>
                    {svc.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Why Choose SRI — white bg with about image, matches About section ── */}
        <section style={{ backgroundColor: "#f9f9f9", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ ...textStyle, textAlign: "center", fontSize: "0.85rem", fontWeight: "400", color: "#555555", letterSpacing: "0.2em", textTransform: "uppercase" as const, marginBottom: "2.5rem" }}>
              WHY CHOOSE SRI
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem", alignItems: "start" }}>
              {/* Image */}
              <div style={{ width: "100%", aspectRatio: "4/3", position: "relative", overflow: "hidden", backgroundColor: "#d0e8f0" }}>
                <Image src={ABOUT_IMAGE_SRC} alt="Why choose SRI" fill style={{ objectFit: "cover" }} sizes="450px" />
              </div>
              {/* Text */}
              <div style={{ textAlign: "center" }}>
                <h3 style={{ ...textStyle, fontSize: "1.05rem", fontWeight: "700", color: "#222222", marginBottom: "1rem" }}>
                  Your Trusted Technology Partner
                </h3>
                <p style={{ ...textStyle, fontSize: "0.9375rem", color: "#555555", lineHeight: "1.8", marginBottom: "1rem" }}>
                  At SRI, we combine deep technical expertise with a client-first approach. Our team of seasoned professionals delivers solutions that are not just technically sound but strategically aligned with your business goals.
                </p>
                <p style={{ ...textStyle, fontSize: "0.9375rem", color: "#555555", lineHeight: "1.8" }}>
                  From startups to large enterprises, we bring the same level of dedication, precision, and innovation to every engagement — ensuring measurable outcomes and long-term partnerships.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Our Process ── */}
        <section style={{ backgroundColor: "#ffffff", padding: "5rem 1.5rem" }}>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <p style={{ ...textStyle, fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "#c47a3a", marginBottom: "0.6rem" }}>
              HOW WE WORK
            </p>
            <h2 style={{ ...textStyle, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: "400", color: "#222222", marginBottom: "3rem" }}>
              Our Process
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "2rem" }}>
              {process.map((p) => (
                <div key={p.step} style={{ padding: "2rem 1.25rem", border: "1px solid #eeeeee", textAlign: "center" }}>
                  <p style={{ ...textStyle, fontSize: "2rem", fontWeight: "700", color: "#b8cdd6", marginBottom: "0.75rem" }}>{p.step}</p>
                  <h3 style={{ ...textStyle, fontSize: "1rem", fontWeight: "700", color: "#222222", marginBottom: "0.6rem" }}>{p.title}</h3>
                  <p style={{ ...textStyle, fontSize: "0.875rem", color: "#666666", lineHeight: "1.7" }}>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA — matches reviews/dark section feel ── */}
        <section style={{ backgroundColor: "#3d3d3d", padding: "5rem 1.5rem", textAlign: "center" }}>
          <h2 style={{ ...textStyle, fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: "400", color: "#ffffff", marginBottom: "1rem" }}>
            Ready to Start Your Project?
          </h2>
          <p style={{ ...textStyle, fontSize: "1rem", color: "#cccccc", marginBottom: "2.5rem", maxWidth: "500px", margin: "0 auto 2.5rem" }}>
            Contact us today and let&apos;s discuss how SRI can help transform your business.
          </p>
          <Link href="/#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.75rem", border: "1px solid #ffffff", color: "#ffffff", padding: "0.65rem 1.75rem", textDecoration: "none", fontSize: "0.8rem", ...textStyle, letterSpacing: "0.15em", textTransform: "uppercase" as const, backgroundColor: "transparent" }}>
            <span>—</span> CONTACT US <span>—</span>
          </Link>
        </section>

        {/* ── Footer — matches main site footer ── */}
        <footer style={{ backgroundColor: "#3d3d3d", borderTop: "1px solid #555555", padding: "2rem 1.5rem 1.5rem", textAlign: "center" }}>
          <div style={{ maxWidth: "600px", margin: "0 auto" }}>
            <Link href="/#privacy" style={{ ...textStyle, display: "block", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "#cccccc", textDecoration: "none", marginBottom: "1rem" }}>
              PRIVACY POLICY
            </Link>
            <p style={{ ...textStyle, fontSize: "0.875rem", fontWeight: "700", color: "#ffffff", marginBottom: "0.5rem" }}>SRI</p>
            <p style={{ ...textStyle, fontSize: "0.75rem", color: "#bbbbbb", letterSpacing: "0.08em", textTransform: "uppercase" as const, lineHeight: "1.6", marginBottom: "0.4rem" }}>
              PLOT NO 118, PHASE 2, KAVURI HILLS, MADHOPUR, HYDERABAD, TELANGANA, INDIA
            </p>
            <p style={{ ...textStyle, fontSize: "0.75rem", color: "#bbbbbb", marginBottom: "1.5rem" }}>+91.7893059116</p>
            <div style={{ borderTop: "1px solid #555555", paddingTop: "1rem" }}>
              <p style={{ ...textStyle, fontSize: "0.7rem", color: "#999999", textTransform: "uppercase" as const, letterSpacing: "0.05em" }}>
                COPYRIGHT © 2026 SRI - ALL RIGHTS RESERVED.
              </p>
            </div>
          </div>
        </footer>

      </main>
    </>
  );
}
