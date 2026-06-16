import { NextResponse } from "next/server";
import { dbGetTreatments, dbCreateTreatment } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import { isAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const treatments = await dbGetTreatments(!!all);
    return NextResponse.json({ treatments });
  } catch {
    return NextResponse.json({ error: "Failed to fetch treatments" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.name || !body.shortDesc) {
      return NextResponse.json({ error: "Name and description required" }, { status: 400 });
    }
    const base = body.slug ? slugify(body.slug) : slugify(body.name);
    const existing = await dbGetTreatments(true);
    const taken = new Set(existing.map((t) => t.slug));
    const slug = taken.has(base) ? `${base}-${Date.now()}` : base;
    const treatment = await dbCreateTreatment({ ...body, slug, order: body.order ?? existing.length });
    return NextResponse.json({ success: true, treatment }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create treatment" }, { status: 500 });
  }
}
