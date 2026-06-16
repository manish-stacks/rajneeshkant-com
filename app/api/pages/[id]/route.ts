import { NextResponse } from "next/server";
import { dbGetPageById, dbUpdatePage, dbDeletePage } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import { isAdmin } from "@/lib/auth";

interface Props { params: Promise<{ id: string }>; }

export async function GET(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const page = await dbGetPageById(id);
  if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ page });
}

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (body.slug) body.slug = slugify(body.slug);
    const page = await dbUpdatePage(id, body);
    if (!page) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ page });
  } catch {
    return NextResponse.json({ error: "Failed to save page" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbDeletePage(id);
  return NextResponse.json({ success: true });
}
