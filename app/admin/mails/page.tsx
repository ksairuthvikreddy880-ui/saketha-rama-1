"use client";

import { useEffect, useState } from "react";

interface Mail {
  _id: string;
  name: string;
  email: string;
  project: string;
  attachmentBase64?: string;
  attachmentName?: string;
  attachmentType?: string;
  read: boolean;
  createdAt: string;
}

export default function MailsPage() {
  const [mails, setMails] = useState<Mail[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Mail | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/mails")
      .then((r) => r.json())
      .then((data) => { if (data.success) setMails(data.mails); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const handleOpen = async (mail: Mail) => {
    setSelected(mail);
    // Mark as read
    if (!mail.read) {
      await fetch(`/api/mails/${mail._id}`, { method: "PATCH" });
      setMails((prev) => prev.map((m) => m._id === mail._id ? { ...m, read: true } : m));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this message?")) return;
    setDeleting(id);
    try {
      const res = await fetch(`/api/mails/${id}`, { method: "DELETE" });
      if (res.ok) {
        setMails((prev) => prev.filter((m) => m._id !== id));
        if (selected?._id === id) setSelected(null);
      }
    } finally {
      setDeleting(null);
    }
  };

  const unread = mails.filter((m) => !m.read).length;

  return (
    <>
      <style>{`
        .mails-layout { display: grid; grid-template-columns: 320px 1fr; gap: 1.25rem; align-items: start; }
        @media (max-width: 700px) {
          .mails-layout { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <div>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
          <h1 style={{ fontFamily: "system-ui", fontSize: "clamp(1.4rem,5vw,2rem)", fontWeight: "600", color: "#111827", margin: 0 }}>
            Mails
          </h1>
          {unread > 0 && (
            <span style={{ padding: "0.2rem 0.65rem", backgroundColor: "#EF4444", borderRadius: "9999px", fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: "600", color: "#fff" }}>
              {unread} unread
            </span>
          )}
        </div>

        {loading ? (
          <div style={{ padding: "3rem", textAlign: "center", fontFamily: "system-ui", color: "#6B7280" }}>Loading...</div>
        ) : mails.length === 0 ? (
          <div style={{ padding: "3rem", textAlign: "center", fontFamily: "system-ui", color: "#6B7280", backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px" }}>
            No messages yet.
          </div>
        ) : (
          <div className="mails-layout">
            {/* Left — mail list */}
            <div style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", overflow: "hidden" }}>
              {mails.map((mail, i) => (
                <div
                  key={mail._id}
                  onClick={() => handleOpen(mail)}
                  style={{
                    padding: "1rem 1.25rem",
                    borderBottom: i < mails.length - 1 ? "1px solid #F3F4F6" : "none",
                    cursor: "pointer",
                    backgroundColor: selected?._id === mail._id ? "#F8FAFC" : "#fff",
                    borderLeft: `3px solid ${mail.read ? "transparent" : "#3B82F6"}`,
                    transition: "background 0.15s",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.875rem", fontWeight: mail.read ? "400" : "600", color: "#111827", margin: "0 0 0.2rem 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {mail.name}
                      </p>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#6B7280", margin: "0 0 0.3rem 0", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {mail.email}
                      </p>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#9CA3AF", margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {mail.project.slice(0, 60)}{mail.project.length > 60 ? "..." : ""}
                      </p>
                      {mail.attachmentName && (
                        <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", color: "#6B7280", margin: "0.2rem 0 0 0" }}>
                          📎 {mail.attachmentName}
                        </p>
                      )}
                    </div>
                    <div style={{ flexShrink: 0, textAlign: "right" }}>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.7rem", color: "#9CA3AF", margin: "0 0 0.4rem 0", whiteSpace: "nowrap" }}>
                        {new Date(mail.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                      </p>
                      {!mail.read && (
                        <span style={{ display: "inline-block", width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#3B82F6" }} />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right — mail detail */}
            <div style={{ backgroundColor: "#fff", border: "1px solid #E5E7EB", borderRadius: "12px", minHeight: "300px" }}>
              {!selected ? (
                <div style={{ padding: "3rem", textAlign: "center", fontFamily: "system-ui", color: "#9CA3AF" }}>
                  Select a message to view
                </div>
              ) : (
                <div style={{ padding: "1.75rem" }}>
                  {/* Detail header */}
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
                    <div>
                      <h2 style={{ fontFamily: "system-ui", fontSize: "1.1rem", fontWeight: "600", color: "#111827", margin: "0 0 0.3rem 0" }}>
                        {selected.name}
                      </h2>
                      <a href={`mailto:${selected.email}`} style={{ fontFamily: "system-ui", fontSize: "0.875rem", color: "#3B82F6", textDecoration: "none" }}>
                        {selected.email}
                      </a>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#9CA3AF", margin: "0.3rem 0 0 0" }}>
                        {new Date(selected.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        {" "}·{" "}
                        {new Date(selected.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    <div style={{ display: "flex", gap: "0.6rem" }}>
                      <a
                        href={`mailto:${selected.email}?subject=Re: Your Enquiry — Sri Saketha Rama Innovations`}
                        style={{ padding: "0.45rem 1rem", backgroundColor: "#111827", color: "#fff", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.8rem", textDecoration: "none", fontWeight: "500" }}
                      >
                        Reply
                      </a>
                      <button
                        onClick={() => handleDelete(selected._id)}
                        disabled={deleting === selected._id}
                        style={{ padding: "0.45rem 0.875rem", backgroundColor: "transparent", border: "1px solid #FECACA", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.8rem", color: "#EF4444", cursor: "pointer" }}
                      >
                        {deleting === selected._id ? "..." : "Delete"}
                      </button>
                    </div>
                  </div>

                  {/* Divider */}
                  <div style={{ borderTop: "1px solid #E5E7EB", marginBottom: "1.25rem" }} />

                  {/* Message body */}
                  <div>
                    <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: "600", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.6rem" }}>
                      Project / Message
                    </p>
                    <p style={{ fontFamily: "Georgia, serif", fontSize: "0.9375rem", color: "#374151", lineHeight: "1.8", whiteSpace: "pre-wrap", margin: 0 }}>
                      {selected.project}
                    </p>
                  </div>

                  {/* Attachment */}
                  {selected.attachmentBase64 && selected.attachmentName && (
                    <div style={{ marginTop: "1.5rem", paddingTop: "1.25rem", borderTop: "1px solid #E5E7EB" }}>
                      <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", fontWeight: "600", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.75rem" }}>
                        Attachment
                      </p>

                      {/* Image preview */}
                      {selected.attachmentType?.startsWith("image/") ? (
                        <div>
                          <img
                            src={selected.attachmentBase64}
                            alt={selected.attachmentName}
                            style={{ maxWidth: "100%", maxHeight: "400px", borderRadius: "8px", border: "1px solid #E5E7EB", objectFit: "contain" }}
                          />
                          <div style={{ marginTop: "0.75rem" }}>
                            <a
                              href={selected.attachmentBase64}
                              download={selected.attachmentName}
                              style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.4rem 0.875rem", backgroundColor: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.8rem", color: "#374151", textDecoration: "none" }}
                            >
                              ↓ Download {selected.attachmentName}
                            </a>
                          </div>
                        </div>
                      ) : (
                        /* Non-image file — download link */
                        <a
                          href={selected.attachmentBase64}
                          download={selected.attachmentName}
                          style={{ display: "inline-flex", alignItems: "center", gap: "0.6rem", padding: "0.75rem 1.25rem", backgroundColor: "#F8FAFC", border: "1px solid #E5E7EB", borderRadius: "8px", fontFamily: "system-ui", fontSize: "0.875rem", color: "#111827", textDecoration: "none" }}
                        >
                          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                          </svg>
                          {selected.attachmentName}
                          <span style={{ color: "#6B7280", fontSize: "0.75rem" }}>— click to download</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        <div style={{ marginTop: "0.875rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#9CA3AF" }}>
          {mails.length} message{mails.length !== 1 ? "s" : ""} total
        </div>
      </div>
    </>
  );
}
