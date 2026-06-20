"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Add Blog", href: "/admin/blogs/add" },
  { label: "Manage Blogs", href: "/admin/blogs" },
  { label: "Media Library", href: "/admin/media" },
  { label: "Contact Messages", href: "/admin/contact" },
  { label: "Newsletter", href: "/admin/newsletter" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const auth = sessionStorage.getItem("admin_auth");
    if (auth !== "true") {
      router.replace("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router, isMounted]);

  const handleLogout = () => {
    sessionStorage.removeItem("admin_auth");
    router.push("/admin/login");
  };

  if (!isMounted || !isAuthenticated) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#F8FAFC",
      }}>
        <p style={{ fontFamily: "system-ui", color: "#6B7280" }}>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#F8FAFC" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "260px",
          backgroundColor: "#FFFFFF",
          borderRight: "1px solid #E5E7EB",
          position: "fixed",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "1.5rem", borderBottom: "1px solid #E5E7EB" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "40px", height: "40px", position: "relative" }}>
              <Image
                src="/assets/logo.jpg"
                alt="SRI Logo"
                fill
                style={{ objectFit: "cover", borderRadius: "6px" }}
              />
            </div>
            <div>
              <h2 style={{
                fontFamily: "system-ui, -apple-system, sans-serif",
                fontSize: "0.95rem",
                fontWeight: "600",
                color: "#111827",
                margin: 0,
              }}>
                SRI Admin
              </h2>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: "1rem 0.75rem", overflowY: "auto" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.65rem 0.75rem",
                  marginBottom: "0.25rem",
                  borderRadius: "6px",
                  backgroundColor: isActive ? "#111827" : "transparent",
                  color: isActive ? "#FFFFFF" : "#6B7280",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: isActive ? "500" : "400",
                  textDecoration: "none",
                  transition: "all 0.15s ease",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "1rem 0.75rem", borderTop: "1px solid #E5E7EB" }}>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.65rem 0.75rem",
              borderRadius: "6px",
              backgroundColor: "transparent",
              border: "none",
              color: "#EF4444",
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "0.875rem",
              cursor: "pointer",
              transition: "all 0.15s ease",
            }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div style={{ marginLeft: "260px", flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Top Header */}
        <header
          style={{
            backgroundColor: "#FFFFFF",
            borderBottom: "1px solid #E5E7EB",
            padding: "1rem 2rem",
            position: "sticky",
            top: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "0.875rem",
            color: "#6B7280",
          }}>
            Welcome back, Admin
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#F8FAFC",
                border: "1px solid #E5E7EB",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#6B7280",
              }}
              title="Notifications"
            >
              N
            </button>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "#111827",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "600",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "2rem", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
