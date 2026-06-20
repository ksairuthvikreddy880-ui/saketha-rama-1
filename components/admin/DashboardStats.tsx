"use client";

import { motion } from "framer-motion";

const stats = [
  { label: "Total Blogs", value: "24", change: "+3 this month" },
  { label: "Published", value: "18", change: "75% published" },
  { label: "Drafts", value: "6", change: "25% drafts" },
  { label: "Contact Messages", value: "42", change: "+12 new" },
  { label: "Newsletter Subscribers", value: "1,248", change: "+89 this week" },
];

export default function DashboardStats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.25rem",
        marginBottom: "2.5rem",
      }}
    >
      {stats.map((stat, index) => (
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
            transition: "box-shadow 0.2s, transform 0.2s",
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.08)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "none";
          }}
        >
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "1rem" }}>
            <div
              style={{
                width: "8px",
                height: "44px",
                backgroundColor: "#111827",
                borderRadius: "4px",
              }}
            />
          </div>
          <h3
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "1.875rem",
              fontWeight: "600",
              color: "#111827",
              margin: "0 0 0.25rem 0",
            }}
          >
            {stat.value}
          </h3>
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "0.875rem",
              color: "#6B7280",
              margin: "0 0 0.5rem 0",
            }}
          >
            {stat.label}
          </p>
          <p
            style={{
              fontFamily: "system-ui, -apple-system, sans-serif",
              fontSize: "0.75rem",
              color: "#10B981",
              margin: 0,
            }}
          >
            {stat.change}
          </p>
        </motion.div>
      ))}
    </div>
  );
}
