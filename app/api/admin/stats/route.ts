import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Blog from "@/models/Blog";
import User from "@/models/User";
import Mail from "@/models/Mail";

export async function GET() {
  try {
    await connectDB();

    const [totalBlogs, published, drafts, totalUsers, totalMails, unreadMails] = await Promise.all([
      Blog.countDocuments({}),
      Blog.countDocuments({ status: "published" }),
      Blog.countDocuments({ status: "draft" }),
      User.countDocuments({ isAdmin: { $ne: true } }),
      Mail.countDocuments({}),
      Mail.countDocuments({ read: false }),
    ]);

    return NextResponse.json({
      success: true,
      stats: { totalBlogs, published, drafts, totalUsers, totalMails, unreadMails },
    });
  } catch (error: any) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats: " + error.message }, { status: 500 });
  }
}
