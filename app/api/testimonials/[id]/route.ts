import { NextResponse } from "next/server";
import { dbUpdateTestimonial, dbDeleteTestimonial } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

interface Props { params: Promise<{ id: string }>; }

export async function PUT(request: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const testimonial = await dbUpdateTestimonial(id, body);
  return NextResponse.json({ testimonial });
}

export async function DELETE(_: Request, { params }: Props) {
  const { id } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbDeleteTestimonial(id);
  return NextResponse.json({ success: true });
}
