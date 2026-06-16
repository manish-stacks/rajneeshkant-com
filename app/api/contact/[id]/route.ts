import { NextResponse } from "next/server";
import { dbUpdateContact, dbDeleteContact } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

interface Props { params: Promise<{ id: string }>; }

export async function PATCH(request: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const message = await dbUpdateContact(id, body);
  if (!message) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ message });
}

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbDeleteContact(id);
  return NextResponse.json({ success: true });
}
