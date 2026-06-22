import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";

// GET single blog by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    await connectDB();

    console.log("Looking for blog with slug:", slug);

    // Find blog by slug regardless of status first, for debugging
    const blog = await Blog.findOne({
      slug: slug.toLowerCase(),
    }).lean();

    console.log("Found blog:", blog ? "YES - status:" + (blog as any).status : "NO");

    if (!blog) {
      // List all blogs to help debug
      const allBlogs = await Blog.find({}).select("slug status title").lean();
      console.log("All blogs in DB:", JSON.stringify(allBlogs));
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, blog }, { status: 200 });
  } catch (error: any) {
    console.error("Fetch blog by slug error:", error);
    return NextResponse.json({ error: "Failed to fetch blog: " + error.message }, { status: 500 });
  }
}
