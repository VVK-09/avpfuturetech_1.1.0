import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, organization, inquiryType, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { success: false, error: "Name and Phone number are required." },
        { status: 400 }
      );
    }

    const inquiryRecord = {
      id: `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      name: String(name).trim(),
      email: String(email || "").trim(),
      phone: String(phone).trim(),
      organization: String(organization || "Direct Inquiry").trim(),
      inquiryType: String(inquiryType || "General Inquiry").trim(),
      message: String(message || "").trim(),
      status: "Pending",
      source: "Website Contact Form",
      createdAt: new Date().toISOString().replace("T", " ").slice(0, 16),
      counselorNotes: ""
    };

    const waText = encodeURIComponent(
      `Hi AVP FutureTech Team, my name is ${inquiryRecord.name} (${inquiryRecord.organization}). I have submitted an inquiry regarding ${inquiryRecord.inquiryType}.`
    );
    const whatsappUrl = `https://wa.me/919307076962?text=${waText}`;

    return NextResponse.json({
      success: true,
      message: "Inquiry received and recorded successfully.",
      inquiry: inquiryRecord,
      whatsappUrl
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error?.message || "Failed to process inquiry." },
      { status: 500 }
    );
  }
}
