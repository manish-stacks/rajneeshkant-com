import { NextResponse } from "next/server";
import { dbGetSettings, dbUpdateSettings } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  try {
    const settings = await dbGetSettings();
    return NextResponse.json({ settings });
  } catch {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    delete body.id;
    const settings = await dbUpdateSettings(body);
    return NextResponse.json({ success: true, settings });
  } catch {
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 });
  }
}
