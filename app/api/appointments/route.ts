import { NextResponse } from "next/server";
import { dbCreateAppointment, dbListAppointments } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";
import { sendMailSafe } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, date, message, treatment } = body;
    if (!name || !phone || !email || !date) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1) Persist first — this is the source of truth.
    const id = await dbCreateAppointment({ name, phone, email, date, message, treatment });

    // 2) Email is best-effort and must never fail the request.
    void sendMailSafe([
      {
        to: process.env.CLINIC_EMAIL || "rajnish8989@gmail.com",
        subject: `New Appointment Request from ${name}`,
        html: `<h2>New Appointment Request</h2><p><strong>Name:</strong> ${name}</p><p><strong>Phone:</strong> ${phone}</p><p><strong>Email:</strong> ${email}</p><p><strong>Preferred Date:</strong> ${new Date(date).toDateString()}</p><p><strong>Treatment:</strong> ${treatment || "Not specified"}</p><p><strong>Message:</strong> ${message || "None"}</p>`,
      },
      {
        to: email,
        subject: "Appointment Request Received - Dr. Rajneesh Kant",
        html: `<h2>Thank you, ${name}!</h2><p>Your appointment request has been received. Our team will contact you within 24 hours to confirm.</p><p><strong>Requested Date:</strong> ${new Date(date).toDateString()}</p><p><strong>Contact us:</strong> +91-9308511357</p><br><p>Dr. Rajneesh Kant Clinic Team</p>`,
      },
    ]);

    return NextResponse.json({ success: true, id }, { status: 201 });
  } catch (error) {
    console.error("Appointment error:", error);
    return NextResponse.json({ error: "Failed to create appointment" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status");
    const appointments = await dbListAppointments(status);
    return NextResponse.json({ appointments });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}
