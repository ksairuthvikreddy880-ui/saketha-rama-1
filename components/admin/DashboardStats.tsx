"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Stats {
  totalBlogs: number;
  published: number;
  drafts: number;
  totalUsers: number;
  totalMails: number;
  unreadMails: number;
}

export default function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalBlogs: 0, published: 0, drafts: 0, totalUsers: 0, totalMails: 0, unreadMails: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then((data) => { if (data.success) setStats(data.stats); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { label: "Total Blogs", value: stats.totalBlogs },
    { label: "Published", value: stats.published },
    { label: "Drafts", value: stats.drafts },
    { label: "Registered Users", value: stats.totalUsers },
    { label: "Total Mails", value: stats.totalMails, badge: stats.unreadMails > 0 ? `${stats.unreadMails} unread` : null },
  ];

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "1.25rem",
      marginBottom: "2.5rem",
    }}>
      {cards.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.05 }}
          whileHover={{ y: -2 }}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "12px",
            padding: "1.5rem",
            cursor: "default",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; }}
        >
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ width: "8px", height: "44px", backgroundColor: "#111827", borderRadius: "4px" }} />
          </div>
          <h3 style={{
            fontFamily: "system-ui",
            fontSize: "1.875rem",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 0.25rem 0",
          }}>
            {loading ? "—" : stat.value}
          </h3>
          <p style={{
            fontFamily: "system-ui",
            fontSize: "0.875rem",
            color: "#6B7280",
            margin: 0,
          }}>
            {stat.label}
          </p>
          {(stat as any).badge && (
            <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#EF4444", margin: "0.3rem 0 0 0", fontWeight: "500" }}>
              {(stat as any).badge}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
}
