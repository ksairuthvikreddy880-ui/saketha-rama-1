"use client";

import { useState } from "react";

export default function AddBlog() {
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    description: "",
    category: "",
    tags: "",
    status: "draft",
  });
  const [featuredImage, setFeaturedImage] = useState<string | null>(null);
  const [content, setContent] = useState("");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (status: string) => {
    alert(`Blog ${status === "published" ? "published" : "saved as draft"} successfully!`);
  };

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
          Add New Blog
        </h1>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button
            onClick={() => handleSubmit("draft")}
            style={{
              padding: "0.625rem 1.25rem",
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "6px",
              fontFamily: "system-ui",
              fontSize: "0.875rem",
              fontWeight: "500",
              color: "#6B7280",
              cursor: "pointer",
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
            Save Draft
          </button>
          <button
            onClick={() => handleSubmit("published")}
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
              transition: "background-color 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#000000"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#111827"; }}
          >
            Publish Blog
          </button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: "1.5rem" }}>
        {/* Main Form */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Title */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Blog Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Enter blog title..."
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                outline: "none",
              }}
            />
          </div>

          {/* Slug */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Slug
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="blog-url-slug"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                outline: "none",
              }}
            />
          </div>

          {/* Description */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Short Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description for SEO..."
              rows={3}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>

          {/* Content Editor */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Blog Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog content here..."
              rows={12}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                outline: "none",
                resize: "vertical",
              }}
            />
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Featured Image */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.75rem",
              }}
            >
              Featured Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                width: "100%",
                padding: "0.5rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#6B7280",
              }}
            />
            {featuredImage && (
              <div style={{ marginTop: "1rem", borderRadius: "6px", overflow: "hidden" }}>
                <img src={featuredImage} alt="Preview" style={{ width: "100%", display: "block" }} />
              </div>
            )}
          </div>

          {/* Category */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Category
            </label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              placeholder="Technology, AI, etc."
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                outline: "none",
              }}
            />
          </div>

          {/* Tags */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Tags
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Comma separated tags"
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                outline: "none",
              }}
            />
          </div>

          {/* Status */}
          <div
            style={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "12px",
              padding: "1.5rem",
            }}
          >
            <label
              style={{
                display: "block",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                fontWeight: "500",
                color: "#111827",
                marginBottom: "0.5rem",
              }}
            >
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "1px solid #E5E7EB",
                borderRadius: "6px",
                fontFamily: "system-ui",
                fontSize: "0.875rem",
                color: "#111827",
                outline: "none",
                backgroundColor: "#FFFFFF",
              }}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
