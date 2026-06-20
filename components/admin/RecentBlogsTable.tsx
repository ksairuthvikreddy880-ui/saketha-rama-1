"use client";

const recentBlogs = [
  { title: "AI & Web 4.0: Powering Digital Transformation", status: "Published", date: "2026-06-18", author: "SRI Team" },
  { title: "The Future of Cloud Computing", status: "Published", date: "2026-06-15", author: "SRI Team" },
  { title: "Building Scalable Web Applications", status: "Draft", date: "2026-06-14", author: "SRI Team" },
  { title: "Cybersecurity Best Practices", status: "Published", date: "2026-06-12", author: "SRI Team" },
];

export default function RecentBlogsTable() {
  return (
    <div>
      <h2
        style={{
          fontFamily: "system-ui, -apple-system, sans-serif",
          fontSize: "1.25rem",
          fontWeight: "600",
          color: "#111827",
          marginBottom: "1rem",
        }}
      >
        Recent Blogs
      </h2>

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
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Title
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Status
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui, -apple-system, sans-serif",
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
                  fontFamily: "system-ui, -apple-system, sans-serif",
                  fontSize: "0.75rem",
                  fontWeight: "600",
                  color: "#6B7280",
                  textAlign: "left",
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                Author
              </th>
              <th
                style={{
                  padding: "0.875rem 1.25rem",
                  fontFamily: "system-ui, -apple-system, sans-serif",
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
            {recentBlogs.map((blog, index) => (
              <tr
                key={index}
                style={{
                  borderBottom: index < recentBlogs.length - 1 ? "1px solid #E5E7EB" : "none",
                  transition: "background-color 0.15s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#F8FAFC"; }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
              >
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "0.875rem",
                    color: "#111827",
                  }}
                >
                  {blog.title}
                </td>
                <td style={{ padding: "1rem 1.25rem" }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontFamily: "system-ui, -apple-system, sans-serif",
                      fontSize: "0.75rem",
                      fontWeight: "500",
                      backgroundColor: blog.status === "Published" ? "#DCFCE7" : "#FEF3C7",
                      color: blog.status === "Published" ? "#166534" : "#92400E",
                    }}
                  >
                    {blog.status}
                  </span>
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                  }}
                >
                  {blog.date}
                </td>
                <td
                  style={{
                    padding: "1rem 1.25rem",
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    fontSize: "0.875rem",
                    color: "#6B7280",
                  }}
                >
                  {blog.author}
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
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#111827";
                      e.currentTarget.style.color = "#111827";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#E5E7EB";
                      e.currentTarget.style.color = "#6B7280";
                    }}
                  >
                    Edit
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
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "#FEF2F2";
                      e.currentTarget.style.borderColor = "#FCA5A5";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.borderColor = "#E5E7EB";
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
