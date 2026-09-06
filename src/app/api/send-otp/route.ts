import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { email, otp, purpose, name } = data;

    if (!email || !otp) {
      return NextResponse.json(
        { success: false, error: "Missing email or OTP" },
        { status: 400 }
      );
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER || process.env.GMAIL_USER || "";
    const smtpPass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD || "";

    const isDefaultPlaceholder =
      !smtpUser ||
      !smtpPass ||
      smtpUser.includes("YOUR_EMAIL_ADDRESS") ||
      smtpPass.includes("YOUR_16_DIGITS");

    if (isDefaultPlaceholder) {
      return NextResponse.json({
        success: true,
        isLiveEmail: false,
        message: "Credentials pending in .env (Demo mode active)",
      });
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const htmlContent = `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 540px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08);">
        <div style="background: linear-gradient(135deg, #07152B 0%, #0B1E3D 60%, #173B7A 100%); padding: 26px 24px; text-align: center; color: #ffffff;">
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">AVP FutureTech LLP</h1>
          <p style="margin: 4px 0 0 0; font-size: 13px; color: #93c5fd;">Internship & Aptitude Assessment Portal</p>
        </div>
        <div style="padding: 30px 24px; color: #1e293b;">
          <h2 style="margin: 0 0 10px 0; font-size: 19px; color: #0f172a;">Verification Code</h2>
          <p style="margin: 0 0 20px 0; font-size: 14px; line-height: 1.6; color: #475569;">
            Hello <strong>${name || "Candidate"}</strong>,<br/>
            Your 6-digit verification code to complete your <strong>${
              purpose === "student-login" ? "Student Login" : "Aptitude Test Registration"
            }</strong> is:
          </p>
          <div style="background: #f0f9ff; border: 2px dashed #0284c7; border-radius: 10px; padding: 18px; text-align: center; margin: 22px 0;">
            <span style="font-size: 34px; font-weight: 800; letter-spacing: 8px; color: #0284c7; font-family: monospace;">${otp}</span>
          </div>
          <p style="margin: 0 0 8px 0; font-size: 13px; color: #64748b;">
            ⏰ This code is valid for <strong>10 minutes</strong>. For your security, never share this code with anyone.
          </p>
        </div>
        <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8;">
          © 2026 AVP FutureTech LLP. All rights reserved.
        </div>
      </div>
    `;

    const fromEmail = process.env.SMTP_FROM || smtpUser;

    await transporter.sendMail({
      from: `"AVP FutureTech LLP" <${fromEmail}>`,
      to: email,
      subject: `${otp} is your AVP FutureTech verification code`,
      text: `Your AVP FutureTech 6-digit verification code is: ${otp}. It is valid for 10 minutes.`,
      html: htmlContent,
    });

    return NextResponse.json({
      success: true,
      isLiveEmail: true,
      message: `OTP successfully delivered to ${email}`,
    });
  } catch (err: unknown) {
    const error = err as { code?: string; responseCode?: number; message?: string };
    console.error("[SMTP Mailer Error]", error?.message || error);
    const isAuthError = error?.code === "EAUTH" || error?.responseCode === 535;
    const userMsg = isAuthError
      ? "Gmail SMTP authentication failed. Please verify the Gmail username and 16-digit App Password in .env.local"
      : (error.message || "Failed to send email via SMTP");

    return NextResponse.json({
      success: false,
      isLiveEmail: false,
      isAuthError,
      error: userMsg,
      message: userMsg,
    });
  }
}
