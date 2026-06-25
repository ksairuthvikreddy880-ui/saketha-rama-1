import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, project } = body as {
      name: string;
      email: string;
      project: string;
    };

    // Basic validation
    if (!name || !email || !project) {
      return NextResponse.json(
        { error: "Name, email and project description are required." },
        { status: 400 }
      );
    }

    // Create transporter using Gmail SMTP
    // Uses environment variables so credentials are never in code
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,   // set in .env.local
        pass: process.env.GMAIL_PASS,   // Gmail App Password (16-char)
      },
    });

    // Email sent TO the business owner
    await transporter.sendMail({
      from: `"SRI Website" <${process.env.GMAIL_USER}>`,
      to: "saketharamainnovations@gmail.com",
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; border: 1px solid #eee;">
          <h2 style="color: #222; margin-bottom: 1.5rem;">New Enquiry — Sri Saketha Rama Innovations</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 0.6rem 0; color: #888; font-size: 0.85rem; width: 140px; vertical-align: top;">Name</td>
              <td style="padding: 0.6rem 0; color: #222; font-size: 0.95rem; font-weight: bold;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; color: #888; font-size: 0.85rem; vertical-align: top;">Email</td>
              <td style="padding: 0.6rem 0; color: #222; font-size: 0.95rem;">
                <a href="mailto:${email}" style="color: #4a9ea1;">${email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 0.6rem 0; color: #888; font-size: 0.85rem; vertical-align: top;">Project Details</td>
              <td style="padding: 0.6rem 0; color: #444; font-size: 0.95rem; line-height: 1.6; white-space: pre-wrap;">${project}</td>
            </tr>
          </table>
          <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #aaa; font-size: 0.75rem;">Sent from srisri.com contact form</p>
        </div>
      `,
    });

    // Auto-reply to the person who submitted
    await transporter.sendMail({
      from: `"Sri Saketha Rama Innovations" <${process.env.GMAIL_USER}>`,
      to: email,
      subject: "We received your message — Sri Saketha Rama Innovations",
      html: `
        <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 2rem; border: 1px solid #eee;">
          <h2 style="color: #222; margin-bottom: 1rem;">Thank you, ${name}!</h2>
          <p style="color: #555; line-height: 1.8;">
            We have received your enquiry and our team will get back to you within 24 hours.
          </p>
          <p style="color: #555; line-height: 1.8; margin-top: 1rem;">
            Here&apos;s a copy of your message:
          </p>
          <blockquote style="border-left: 3px solid #4a9ea1; padding-left: 1rem; color: #666; margin: 1rem 0; font-style: italic;">
            ${project}
          </blockquote>
          <hr style="margin: 1.5rem 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #888; font-size: 0.85rem;">Sri Saketha Rama Innovations<br/>
          Plot No 118, Phase 2, Kavuri Hills, Madhopur, Hyderabad, Telangana, India<br/>
          +91.7893059116</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
