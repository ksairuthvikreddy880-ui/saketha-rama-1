import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { userInfo } = await request.json();

    if (!userInfo || !userInfo.email) {
      return NextResponse.json({ error: "No user info provided" }, { status: 400 });
    }

    const { email, name, sub: googleId, picture } = userInfo;

    await connectDB();

    // Check if admin email
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail && email.toLowerCase() === adminEmail.toLowerCase()) {
      return NextResponse.json({
        success: true,
        isAdmin: true,
        user: { id: "admin", name: "Admin", email },
      });
    }

    // Find or create user in MongoDB
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      user = await User.create({
        name,
        email: email.toLowerCase(),
        password: `google_oauth_${googleId || Date.now()}`,
        isAdmin: false,
      });
    }

    return NextResponse.json({
      success: true,
      isAdmin: false,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        picture: picture || "",
      },
    });
  } catch (error: any) {
    console.error("Google auth error:", error);
    return NextResponse.json({ error: "Google sign in failed: " + error.message }, { status: 500 });
  }
}
