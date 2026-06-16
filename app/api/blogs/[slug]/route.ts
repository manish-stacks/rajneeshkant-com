import { NextResponse } from "next/server";
import { dbGetBlogBySlug, dbUpdateBlog, dbDeleteBlog } from "@/lib/queries";
import { isAdmin } from "@/lib/auth";

interface Props { params: Promise<{ slug: string }>; }

export async function GET(request: Request, { params }: Props) {
  const { slug } = await params;
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin");
    if (admin) {
      if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const post = await dbGetBlogBySlug(slug, true);
      if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ post });
    }
    const post = await dbGetBlogBySlug(slug, false);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: Props) {
  const { slug } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    const post = await dbUpdateBlog(slug, body);
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ post });
  } catch {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: Props) {
  const { slug } = await params;
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await dbDeleteBlog(slug);
  return NextResponse.json({ success: true });
}
