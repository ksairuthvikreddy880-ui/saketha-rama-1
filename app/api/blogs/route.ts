import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// GET — fetch all published blogs (for homepage & public blog page)
// GET /api/blogs?status=published&limit=4
export async function GET(request: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status"); // "published" | "draft" | null (all)
    const limit = parseInt(searchParams.get("limit") || "0");

    const query: Record<string, string> = {};
    if (status) query.status = status;

    let blogsQuery = Blog.find(query).sort({ createdAt: -1 });
    if (limit > 0) blogsQuery = blogsQuery.limit(limit);

    const blogs = await blogsQuery.lean();

    console.log(`Fetched ${blogs.length} blogs, slugs:`, blogs.map((b: any) => b.slug));

    return NextResponse.json({ success: true, blogs }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch blogs error:", error);
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}

// POST — create new blog
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();
    const { title, slug, description, content, featuredImage, category, tags, status } = body;

    if (!title || !slug || !description || !content || !category) {
      return NextResponse.json(
        { error: "Title, slug, description, content, and category are required" },
        { status: 400 }
      );
    }

    // Check duplicate slug
    const existing = await Blog.findOne({ slug: slug.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "A blog with this slug already exists" }, { status: 409 });
    }

    const blog = await Blog.create({
      title,
      slug: slug.toLowerCase(),
      description,
      content,
      featuredImage: featuredImage || "",
      category,
      tags: tags ? tags.split(",").map((t: string) => t.trim()).filter(Boolean) : [],
      status: status || "draft",
      author: "Admin",
    });

    return NextResponse.json({ success: true, blog }, { status: 201 });
  } catch (error: any) {
    console.error("Create blog error:", error);
    return NextResponse.json({ error: "Failed to create blog: " + error.message }, { status: 500 });
  }
}
