"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function GoogleAuthButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setLoading(true);
      setError("");
      try {
        // Get user info from Google
        const userInfoRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        });
        const userInfo = await userInfoRes.json();

        // Send to our backend to create/find user in MongoDB
        const res = await fetch("/api/auth/google", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ credential: tokenResponse.access_token, userInfo }),
        });

        const data = await res.json();

        if (!res.ok || !data.success) {
          setError(data.error || "Google sign in failed");
          setLoading(false);
          return;
        }

        if (data.isAdmin) {
          sessionStorage.setItem("admin_auth", "true");
          router.push("/admin");
        } else {
          sessionStorage.setItem("user_auth", "true");
          sessionStorage.setItem("user_email", data.user.email);
          sessionStorage.setItem("user_name", data.user.name);
          router.push("/");
        }
      } catch {
        setError("Network error. Please try again.");
        setLoading(false);
      }
    },
    onError: () => {
      setError("Google sign in was cancelled or failed.");
      setLoading(false);
    },
  });

  return (
    <div>
      <button
        onClick={() => { setError(""); setLoading(true); login(); }}
        disabled={loading}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          border: "1px solid #e2e8f0",
          backgroundColor: "#ffffff",
          borderRadius: "8px",
          padding: "0.75rem 1rem",
          cursor: loading ? "not-allowed" : "pointer",
          fontFamily: "Georgia, serif",
          fontSize: "0.9rem",
          color: "#374151",
          transition: "background-color 0.2s",
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
        onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#ffffff"; }}
      >
        {/* Google G icon */}
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        {loading ? "Signing in..." : "Continue with Google"}
      </button>
      {error && (
        <p style={{ fontFamily: "Georgia, serif", fontSize: "0.75rem", color: "#dc2626", marginTop: "0.5rem", textAlign: "center" }}>
          {error}
        </p>
      )}
    </div>
  );
}
