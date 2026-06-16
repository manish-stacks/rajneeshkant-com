import { NextResponse } from "next/server";
import { dbUpdateGallery, dbDeleteGallery } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

interface Props { params: Promise<{ id: string }>; }

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const image = await dbUpdateGallery(id, body);
  return NextResponse.json({ image });
}

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbDeleteGallery(id);
  return NextResponse.json({ success: true });
}
