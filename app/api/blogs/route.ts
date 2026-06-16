import { NextResponse } from "next/server";
import { dbGetBlogs, dbCreateBlog, dbGetBlogBySlug } from "@/lib/queries";
import { slugify } from "@/lib/utils";
import { isAdmin } from "@/lib/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get("admin");
    if (admin) {
      if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      const { posts, total } = await dbGetBlogs({ admin: true });
      return NextResponse.json({ posts, total });
    }
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const category = searchParams.get("category");
    const tag = searchParams.get("tag");
    const res = await dbGetBlogs({ page, limit, category, tag });
    return NextResponse.json(res);
  } catch {
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await request.json();
    if (!body.title || !body.excerpt || !body.content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }
    const base = body.slug ? slugify(body.slug) : slugify(body.title);
    const existing = await dbGetBlogBySlug(base, true);
    const slug = existing ? `${base}-${Date.now()}` : base;
    const post = await dbCreateBlog({ ...body, slug });
    return NextResponse.json({ success: true, post }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
