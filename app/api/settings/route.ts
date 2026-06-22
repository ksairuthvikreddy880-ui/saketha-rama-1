import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import SiteSettings from "@/models/SiteSettings";

// GET — fetch current settings (creates defaults if none exist)
export async function GET() {
  try {
    await connectDB();

    let settings = await SiteSettings.findOne({}).lean();

    // If no settings exist yet, create defaults and return
    if (!settings) {
      const created = await SiteSettings.create({});
      settings = created.toObject();
    }

    return NextResponse.json({ success: true, settings }, { status: 200 });
  } catch (error: any) {
    console.error("Get settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

// POST — save settings
export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    // Upsert — update existing or create new
    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { $set: body },
      { upsert: true, new: true }
    );

    return NextResponse.json({ success: true, settings }, { status: 200 });
  } catch (error: any) {
    console.error("Save settings error:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
