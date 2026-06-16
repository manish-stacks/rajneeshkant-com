import { NextResponse } from "next/server";
import { dbGetGallery, dbCreateGallery } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get("all");
    const images = await dbGetGallery(!!all);
    return NextResponse.json({ images });
  } catch {
    return NextResponse.json({ error: "Failed to fetch gallery" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.imageUrl) return NextResponse.json({ error: "Image URL required" }, { status: 400 });
    const image = await dbCreateGallery(body);
    return NextResponse.json({ success: true, image }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to add image" }, { status: 500 });
  }
}
