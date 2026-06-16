import { NextResponse } from "next/server";
import { dbGetPages, dbCreatePage, dbGetPageBySlug } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const pages = await dbGetPages(true);
    return NextResponse.json({ pages });
  } catch {
    return NextResponse.json({ error: "Failed to fetch pages" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.title) return NextResponse.json({ error: "Title required" }, { status: 400 });
    const base = body.slug ? slugify(body.slug) : slugify(body.title);
    const existing = await dbGetPageBySlug(base);
    const slug = existing ? `${base}-${Date.now()}` : base;
    const page = await dbCreatePage({ ...body, slug });
    return NextResponse.json({ success: true, page }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create page" }, { status: 500 });
  }
}
