"use client";

const subscribers = [
  { id: 1, email: "subscriber1@example.com", dateJoined: "2026-06-19" },
  { id: 2, email: "subscriber2@example.com", dateJoined: "2026-06-18" },
  { id: 3, email: "subscriber3@example.com", dateJoined: "2026-06-17" },
  { id: 4, email: "subscriber4@example.com", dateJoined: "2026-06-16" },
  { id: 5, email: "subscriber5@example.com", dateJoined: "2026-06-15" },
];

export default function Newsletter() {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1
          style={{
            fontFamily: "system-ui, -apple-system, sans-serif",
            fontSize: "2rem",
            fontWeight: "600",
            color: "#111827",
            margin: 0,
          }}
        >
          Newsletter Subscribers
        </h1>
        <button
          style={{
            padding: "0.625rem 1.25rem",
            backgroundColor: "#111827",
            border: "none",
            borderRadius: "6px",
            fontFamily: "system-ui",
            fontSize: "0.875rem",
            fontWeight: "500",
            color: "#FFFFFF",
            cursor: "pointer",
          }}
        >
          Export CSV
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#FFFFFF",
          border: "1px solid #E5E7EB",
          borderRadius: "12px",
          overflow: "hidden",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#F8FAFC", borderBottom: "1px solid #E5E7EB" }}>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Email
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Date Joined
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "right",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {subscribers.map((sub, index) => (
              <tr
                key={sub.id}
                style={{
                  borderBottom: index < subscribers.length - 1 ? "1px solid #E5E7EB" : "none",
                }}
              >
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#111827",
                  }}
                >
                  {sub.email}
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                  }}
                >
                  {sub.dateJoined}
                </td>
                <td style={{ padding: "1rem 1.25rem", textAlign: "right" }}>
                  <button
                    style={{
                      padding: "0.375rem 0.75rem",
                      backgroundColor: "transparent",
                      border: "1px solid #E5E7EB",
                      borderRadius: "6px",
                      fontFamily: "system-ui",
                      fontSize: "0.75rem",
                      color: "#EF4444",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
