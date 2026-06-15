"use client";

// Asset path — /public/assets/hero-video.mp4
const HERO_VIDEO_SRC = "/assets/hero-video.mp4";

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
    </section>
  );
}
