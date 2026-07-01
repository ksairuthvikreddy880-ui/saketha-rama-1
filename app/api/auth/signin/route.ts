import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(request: NextRequest) {
  // Rate limit: 5 attempts per minute per IP
  const ip = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? "unknown";
  const { allowed } = rateLimit(ip, 5, 60 * 1000);
  if (!allowed) {
    return NextResponse.json(
      { error: "Too many sign in attempts. Please wait a minute and try again." },
      { status: 429 }
    );
  }

  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Connect to DB — admin is stored in the database with isAdmin: true
    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user is admin from database flag
    const isAdmin = user.isAdmin === true;

    return NextResponse.json(
      {
        success: true,
        message: isAdmin ? "Admin sign in successful" : "Sign in successful",
        isAdmin,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          isAdmin,
        },
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Signin error:", error?.message || error);
    // Return specific error for debugging
    const message = error?.message?.includes("ECONNREFUSED") || error?.message?.includes("querySrv")
      ? "Database connection failed. Please try again in a moment."
      : "Failed to sign in. Please try again.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
