import { NextResponse } from "next/server";
import { dbCreateContact, dbListContacts } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";
import { sendMailSafe } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;
    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1) Persist first.
    await dbCreateContact({ name, email, phone, subject, message });

    // 2) Best-effort email notification — never blocks the response.
    void sendMailSafe([
      {
        to: process.env.CLINIC_EMAIL || "rajnish8989@gmail.com",
        subject: `Contact Form: ${subject} — from ${name}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "N/A"}</p><p><strong>Message:</strong> ${message}</p>`,
      },
    ]);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to submit" }, { status: 500 });
  }
}

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const res = await dbListContacts();
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
}
