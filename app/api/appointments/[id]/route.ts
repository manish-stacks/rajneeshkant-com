import { NextResponse } from "next/server";
import { dbUpdateAppointment, dbDeleteAppointment } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

interface Props { params: Promise<{ id: string }>; }

export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const appointment = await dbUpdateAppointment(id, body);
    if (!appointment) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ appointment });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbDeleteAppointment(id);
  return NextResponse.json({ success: true });
}
