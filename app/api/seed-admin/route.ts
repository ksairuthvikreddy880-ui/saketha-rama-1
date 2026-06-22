import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

// This route seeds the admin user into the database.
// It is protected by a secret key so only you can trigger it.
// Call it once: GET /api/seed-admin?secret=sri_seed_2026

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get("secret");

    // Protect this route with a secret
    if (secret !== "sri_seed_2026") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminEmail || !adminPassword) {
      return NextResponse.json(
        { error: "ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env.local" },
        { status: 500 }
      );
    }

    await connectDB();

    // Check if admin already exists
    const existing = await User.findOne({ email: adminEmail.toLowerCase() });

    if (existing) {
      // Update existing user to ensure isAdmin is true
      await User.updateOne(
        { email: adminEmail.toLowerCase() },
        { $set: { isAdmin: true } }
      );
      return NextResponse.json({
        success: true,
        message: "Admin user already exists — updated isAdmin flag to true",
        email: adminEmail,
      });
    }

    // Hash password and create admin user
    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    await User.create({
      name: "Admin",
      email: adminEmail.toLowerCase(),
      password: hashedPassword,
      isAdmin: true,
    });

    return NextResponse.json({
      success: true,
      message: "Admin user created successfully in database",
      email: adminEmail,
    });
  } catch (error: any) {
    console.error("Seed admin error:", error);
    return NextResponse.json(
      { error: "Failed to seed admin: " + error.message },
      { status: 500 }
    );
  }
}
