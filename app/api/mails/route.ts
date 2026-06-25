import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Mail from "@/models/Mail";

// GET — fetch all mails (admin panel)
export async function GET() {
  try {
    await connectDB();
    const mails = await Mail.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json({ success: true, mails }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to fetch mails" }, { status: 500 });
  }
}

// POST — save a new mail (from contact form)
export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const { name, email, project, attachmentBase64, attachmentName, attachmentType } = await request.json();

    if (!name || !email || !project) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const mail = await Mail.create({
      name,
      email,
      project,
      attachmentBase64: attachmentBase64 || "",
      attachmentName: attachmentName || "",
      attachmentType: attachmentType || "",
    });
    return NextResponse.json({ success: true, mail }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to save mail" }, { status: 500 });
  }
}
