import { NextResponse } from "next/server";
import { query, queryOne } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const n = async (sql: string) => (await queryOne<{ c: number }>(sql))?.c || 0;
    const [
      appointments, pendingAppointments, blogs, publishedBlogs,
      contacts, unreadContacts, treatments, gallery, testimonials, pages,
    ] = await Promise.all([
      n("SELECT COUNT(*) c FROM appointments"),
      n("SELECT COUNT(*) c FROM appointments WHERE status='pending'"),
      n("SELECT COUNT(*) c FROM blogs"),
      n("SELECT COUNT(*) c FROM blogs WHERE published=1"),
      n("SELECT COUNT(*) c FROM contacts"),
      n("SELECT COUNT(*) c FROM contacts WHERE is_read=0"),
      n("SELECT COUNT(*) c FROM treatments WHERE active=1"),
      n("SELECT COUNT(*) c FROM gallery_images WHERE active=1"),
      n("SELECT COUNT(*) c FROM testimonials WHERE active=1"),
      n("SELECT COUNT(*) c FROM pages WHERE active=1"),
    ]);
    const recentAppointments = await query(
      "SELECT id, name, phone, email, date, treatment, status, created_at FROM appointments ORDER BY created_at DESC LIMIT 5"
    );
    return NextResponse.json({
      stats: { appointments, pendingAppointments, blogs, publishedBlogs, contacts, unreadContacts, treatments, gallery, testimonials, pages },
      recentAppointments,
    });
  } catch {
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}
