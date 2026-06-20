"use client";

const messages = [
  { id: 1, name: "John Doe", email: "john@example.com", subject: "Project Inquiry", message: "I would like to discuss a potential project...", date: "2026-06-19" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", subject: "Partnership Opportunity", message: "We are interested in partnering with your company...", date: "2026-06-18" },
  { id: 3, name: "Mike Johnson", email: "mike@example.com", subject: "Quote Request", message: "Can you provide a quote for web development...", date: "2026-06-17" },
];

export default function ContactMessages() {
  return (
    <div>
      <h1
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "2rem",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "2rem",
        }}
      >
        Contact Messages
      </h1>

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
                Name
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
                Subject
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
                Date
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
            {messages.map((msg, index) => (
              <tr
                key={msg.id}
                style={{
                  borderBottom: index < messages.length - 1 ? "1px solid #E5E7EB" : "none",
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
                  {msg.name}
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                  }}
                >
                  {msg.email}
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#111827",
                  }}
                >
                  {msg.subject}
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                  }}
                >
                  {msg.date}
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
                      color: "#6B7280",
                      cursor: "pointer",
                      marginRight: "0.5rem",
                    }}
                  >
                    View
                  </button>
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
