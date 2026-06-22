"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddBlog() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    tags: "",
    status: "draft",
  });
  const [featuredImage, setFeaturedImage] = useState<string>("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-")
      .trim();
    setFormData({ ...formData, title, slug });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) { setError("Image must be under 2MB"); return; }
      const reader = new FileReader();
      reader.onloadend = () => setFeaturedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (submitStatus: string) => {
    setError("");
    if (!formData.title || !formData.slug || !formData.description || !content || !formData.category) {
      setError("Please fill in all required fields: Title, Slug, Description, Category, and Content.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/blogs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, content, featuredImage, status: submitStatus }),
      });
      const data = await res.json();
      if (!res.ok) { setError(data.error || "Failed to save blog"); setLoading(false); return; }
      router.push("/admin/blogs");
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.75rem",
    border: "1px solid #E5E7EB",
    borderRadius: "6px",
    fontFamily: "system-ui",
    fontSize: "0.875rem",
    color: "#111827",
    outline: "none",
    boxSizing: "border-box",
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: "#FFFFFF",
    border: "1px solid #E5E7EB",
    borderRadius: "12px",
    padding: "1.25rem",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "system-ui",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#111827",
    marginBottom: "0.5rem",
  };

  return (
    <>
      <style>{`
        .add-blog-grid {
          display: grid;
          grid-template-columns: 1fr 300px;
          gap: 1.25rem;
        }
        @media (max-width: 700px) {
          .add-blog-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <div>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
          <h1 style={{ fontFamily: "system-ui", fontSize: "clamp(1.4rem, 5vw, 2rem)", fontWeight: "600", color: "#111827", margin: 0 }}>
            Add New Blog
          </h1>
          <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
            <button
              onClick={() => handleSubmit("draft")}
              disabled={loading}
              style={{ padding: "0.6rem 1.1rem", backgroundColor: "#FFFFFF", border: "1px solid #E5E7EB", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.875rem", fontWeight: "500", color: "#6B7280", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, whiteSpace: "nowrap" }}
            >
              {loading ? "Saving..." : "Save Draft"}
            </button>
            <button
              onClick={() => handleSubmit("published")}
              disabled={loading}
              style={{ padding: "0.6rem 1.1rem", backgroundColor: "#111827", border: "none", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.875rem", fontWeight: "500", color: "#FFFFFF", cursor: loading ? "not-allowed" : "pointer", opacity: loading ? 0.6 : 1, whiteSpace: "nowrap" }}
            >
              {loading ? "Publishing..." : "Publish Blog"}
            </button>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div style={{ backgroundColor: "#FEF2F2", border: "1px solid #FECACA", borderRadius: "8px", padding: "0.875rem 1.25rem", marginBottom: "1.25rem", fontFamily: "system-ui", fontSize: "0.875rem", color: "#DC2626" }}>
            {error}
          </div>
        )}

        <div className="add-blog-grid">
          {/* ── Left column: main fields ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Title */}
            <div style={cardStyle}>
              <label style={labelStyle}>Blog Title <span style={{ color: "#EF4444" }}>*</span></label>
              <input type="text" value={formData.title} onChange={handleTitleChange} placeholder="Enter blog title..." style={inputStyle} />
            </div>

            {/* Slug */}
            <div style={cardStyle}>
              <label style={labelStyle}>Slug <span style={{ color: "#EF4444" }}>*</span></label>
              <input type="text" value={formData.slug} onChange={(e) => setFormData({ ...formData, slug: e.target.value })} placeholder="blog-url-slug" style={inputStyle} />
              <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.4rem" }}>
                Auto-generated from title. Used in the blog URL.
              </p>
            </div>

            {/* Description */}
            <div style={cardStyle}>
              <label style={labelStyle}>Short Description <span style={{ color: "#EF4444" }}>*</span></label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Brief description for SEO..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>

            {/* Content */}
            <div style={cardStyle}>
              <label style={labelStyle}>Blog Content <span style={{ color: "#EF4444" }}>*</span></label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Write your blog content here..." rows={12} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
          </div>

          {/* ── Right column: meta fields ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>

            {/* Featured Image */}
            <div style={cardStyle}>
              <label style={labelStyle}>Featured Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} style={{ width: "100%", padding: "0.5rem", border: "1px solid #E5E7EB", borderRadius: "6px", fontFamily: "system-ui", fontSize: "0.875rem", color: "#6B7280", boxSizing: "border-box" }} />
              <p style={{ fontFamily: "system-ui", fontSize: "0.75rem", color: "#9CA3AF", marginTop: "0.4rem" }}>
                Max 2MB. Stored in database.
              </p>
              {featuredImage && (
                <div style={{ marginTop: "0.75rem", borderRadius: "6px", overflow: "hidden" }}>
                  <img src={featuredImage} alt="Preview" style={{ width: "100%", display: "block", borderRadius: "6px" }} />
                </div>
              )}
            </div>

            {/* Category */}
            <div style={cardStyle}>
              <label style={labelStyle}>Category <span style={{ color: "#EF4444" }}>*</span></label>
              <input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} placeholder="Technology, AI, etc." style={inputStyle} />
            </div>

            {/* Tags */}
            <div style={cardStyle}>
              <label style={labelStyle}>Tags</label>
              <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} placeholder="Comma separated tags" style={inputStyle} />
            </div>

            {/* Status */}
            <div style={cardStyle}>
              <label style={labelStyle}>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} style={{ ...inputStyle, backgroundColor: "#FFFFFF" }}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
