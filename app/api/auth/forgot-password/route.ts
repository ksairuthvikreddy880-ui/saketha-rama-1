import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email: email.toLowerCase() });

    // Always return success to prevent email enumeration
    if (!user) {
      return NextResponse.json({ success: true, message: "If that email exists, a code has been sent." });
    }

    // Generate 6-digit code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    // Save code to DB
    await User.updateOne(
      { email: email.toLowerCase() },
      { $set: { resetCode: code, resetCodeExpiry: expiry } }
    );

    // Send email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Sri Saketha Rama Innovations" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "Your Password Reset Code — SRI",
      html: `
        <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 2rem; border: 1px solid #eee; border-radius: 8px;">
          <h2 style="color: #111827; margin-bottom: 0.5rem;">Password Reset</h2>
          <p style="color: #555; line-height: 1.7; margin-bottom: 1.5rem;">
            We received a request to reset your SRI account password.
            Use the code below — it expires in <strong>15 minutes</strong>.
          </p>
          <div style="background: #F8FAFC; border: 2px solid #E5E7EB; border-radius: 8px; padding: 1.5rem; text-align: center; margin-bottom: 1.5rem;">
            <p style="font-size: 2.5rem; font-weight: 700; letter-spacing: 0.5rem; color: #111827; margin: 0; font-family: monospace;">
              ${code}
            </p>
          </div>
          <p style="color: #888; font-size: 0.85rem; line-height: 1.6;">
            If you did not request a password reset, ignore this email — your password will not be changed.
          </p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;" />
          <p style="color: #aaa; font-size: 0.75rem;">Sri Saketha Rama Innovations · saketharamainnovations@gmail.com</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, message: "Reset code sent to your email." });
  } catch (error: any) {
    console.error("Forgot password error:", error);
    return NextResponse.json(
      { error: "Failed to send reset code. Please try again later." },
      { status: 500 }
    );
  }
}
