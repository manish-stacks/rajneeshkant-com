import { NextResponse } from "next/server";
import { dbGetTestimonials, dbCreateTestimonial } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const testimonials = await dbGetTestimonials(!!all);
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ error: "Failed to fetch testimonials" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.name || !body.content) return NextResponse.json({ error: "Name and content required" }, { status: 400 });
    const testimonial = await dbCreateTestimonial(body);
    return NextResponse.json({ success: true, testimonial }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create testimonial" }, { status: 500 });
  }
}
