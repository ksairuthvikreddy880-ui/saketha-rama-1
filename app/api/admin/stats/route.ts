import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET() {
  try {
    await connectDB();

    // Run all counts in parallel for speed
    const [totalBlogs, published, drafts, totalUsers] = await Promise.all([
      Blog.countDocuments({}),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      User.countDocuments({ isAdmin: { $ne: true } }), // non-admin users only
    ]);

    return NextResponse.json({
      success: true,
      stats: {
        totalBlogs,
        published,
        drafts,
        totalUsers,
      },
    });
  } catch (error: any) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats: " + error.message },
      { status: 500 }
    );
  }
}
