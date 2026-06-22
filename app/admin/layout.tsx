"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { label: "Dashboard", href: "/admin" },
  { label: "Add Blog", href: "/admin/blogs/add" },
  { label: "Manage Blogs", href: "/admin/blogs" },
  { label: "Settings", href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    sessionStorage.removeItem("user_auth");
    sessionStorage.removeItem("user_email");
    sessionStorage.removeItem("user_name");
    router.push("/");
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
      <style>{`
        .admin-sidebar {
          width: 220px;
          background: #fff;
          border-right: 1px solid #E5E7EB;
          position: fixed;
          height: 100vh;
          display: flex;
          flex-direction: column;
          z-index: 40;
          transition: transform 0.25s ease;
        }
        .admin-main {
          margin-left: 220px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .admin-mobile-toggle {
          display: none;
        }
        @media (max-width: 768px) {
          .admin-sidebar {
            transform: translateX(-100%);
            width: 240px;
          }
          .admin-sidebar.open {
            transform: translateX(0);
            box-shadow: 4px 0 20px rgba(0,0,0,0.15);
          }
          .admin-main {
            margin-left: 0;
          }
          .admin-mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>

      {/* Sidebar */}
      <aside className={`admin-sidebar${sidebarOpen ? " open" : ""}`}>
        {/* Logo */}
        <div style={{ padding: "1.25rem 1rem", borderBottom: "1px solid #E5E7EB", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: "36px", height: "36px", position: "relative" }}>
              <Image src="/assets/logo.jpg" alt="SRI Logo" fill style={{ objectFit: "cover", borderRadius: "6px" }} />
            </div>
            <h2 style={{ fontFamily: "system-ui", fontSize: "0.9rem", fontWeight: "600", color: "#111827", margin: 0 }}>SRI Admin</h2>
          </div>
          <button onClick={() => setSidebarOpen(false)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.2rem", color: "#6B7280", display: "none" }} className="admin-mobile-toggle">✕</button>
        </div>

        {/* Menu */}
        <nav style={{ flex: 1, padding: "0.875rem 0.6rem", overflowY: "auto" }}>
          {menuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                style={{
                  display: "flex", alignItems: "center", padding: "0.6rem 0.75rem", marginBottom: "0.2rem",
                  borderRadius: "6px", backgroundColor: isActive ? "#111827" : "transparent",
                  color: isActive ? "#FFFFFF" : "#6B7280", fontFamily: "system-ui", fontSize: "0.875rem",
                  fontWeight: isActive ? "500" : "400", textDecoration: "none", transition: "all 0.15s",
                }}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div style={{ padding: "0.875rem 0.6rem", borderTop: "1px solid #E5E7EB" }}>
          <button
            onClick={handleLogout}
            style={{ width: "100%", padding: "0.6rem 0.75rem", borderRadius: "6px", backgroundColor: "transparent", border: "none", color: "#EF4444", fontFamily: "system-ui", fontSize: "0.875rem", cursor: "pointer", textAlign: "left" }}
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.3)", zIndex: 30 }} />
      )}

      {/* Main Content */}
      <div className="admin-main">
        {/* Top Header */}
        <header style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E5E7EB", padding: "0.875rem 1.25rem", position: "sticky", top: 0, zIndex: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            {/* Mobile hamburger */}
            <button
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(true)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: "0.25rem", display: "none" }}
              aria-label="Open menu"
            >
              <div style={{ width: "20px", height: "2px", backgroundColor: "#111827", marginBottom: "4px" }} />
              <div style={{ width: "20px", height: "2px", backgroundColor: "#111827", marginBottom: "4px" }} />
              <div style={{ width: "20px", height: "2px", backgroundColor: "#111827" }} />
            </button>
            <div style={{ fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280" }}>Welcome back, Admin</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{ width: "34px", height: "34px", borderRadius: "50%", backgroundColor: "#111827", color: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "system-ui", fontSize: "0.875rem", fontWeight: "600" }}>A</div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ padding: "1.5rem 1rem", flex: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
