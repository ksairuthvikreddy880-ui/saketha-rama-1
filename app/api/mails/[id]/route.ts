import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import Mail from "@/models/Mail";

// DELETE a mail
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const deleted = await Mail.findByIdAndDelete(id);
    if (!deleted) return NextResponse.json({ error: "Mail not found" }, { status: 404 });
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete mail" }, { status: 500 });
  }
}

// PATCH — mark as read
export async function PATCH(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();
    const mail = await Mail.findByIdAndUpdate(id, { read: true }, { new: true });
    if (!mail) return NextResponse.json({ error: "Mail not found" }, { status: 404 });
    return NextResponse.json({ success: true, mail }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update mail" }, { status: 500 });
  }
}
