import { NextResponse } from "next/server";
import { dbGetTreatmentById, dbUpdateTreatment, dbDeleteTreatment } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

interface Props { params: Promise<{ id: string }>; }

export async function GET(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const treatment = await dbGetTreatmentById(id);
  if (!treatment) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ treatment });
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const treatment = await dbUpdateTreatment(id, body);
    if (!treatment) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ treatment });
  } catch {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbDeleteTreatment(id);
  return NextResponse.json({ success: true });
}
