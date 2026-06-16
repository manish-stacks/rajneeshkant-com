import { query, queryOne, execute } from "@/lib/db";

/* ───────────────────────── helpers ───────────────────────── */

const bool = (v: any) => v === 1 || v === true || v === "1";

function parseJson(v: any, fallback: any) {
  if (v == null) return fallback;
  if (Array.isArray(v) || typeof v === "object") return v;
  try {
    return JSON.parse(v);
  } catch {
    return fallback;
  }
}

/** Build "col = ?" SET clause + values for the keys present in `data`. */
function buildSet(map: Record<string, string>, data: Record<string, any>) {
  const cols: string[] = [];
  const vals: any[] = [];
  for (const [key, col] of Object.entries(map)) {
    if (data[key] !== undefined) {
      cols.push(`\`${col}\` = ?`);
      vals.push(data[key]);
    }
  }
  return { clause: cols.join(", "), vals };
}

/* ───────────────────────── mappers ───────────────────────── */

const mapTreatment = (r: any) => ({
  _id: String(r.id),
  id: String(r.id),
  name: r.name,
  slug: r.slug,
  shortDesc: r.short_desc || "",
  content: r.content || "",
  image: r.image || "",
  icon: r.icon || "🦴",
  conditions: parseJson(r.conditions, []),
  metaTitle: r.meta_title || "",
  metaDescription: r.meta_description || "",
  canonical: r.canonical || "",
  robotsIndex: bool(r.robots_index),
  order: r.menu_order ?? 0,
  showInMenu: bool(r.show_in_menu),
  active: bool(r.active),
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const mapBlog = (r: any) => ({
  _id: String(r.id),
  id: String(r.id),
  title: r.title,
  slug: r.slug,
  excerpt: r.excerpt || "",
  content: r.content || "",
  coverImage: r.cover_image || "",
  author: r.author || "Dr. Rajneesh Kant",
  tags: parseJson(r.tags, []),
  category: r.category || "General",
  readTime: r.read_time || "5 min read",
  metaTitle: r.meta_title || "",
  metaDescription: r.meta_description || "",
  canonical: r.canonical || "",
  robotsIndex: bool(r.robots_index),
  published: bool(r.published),
  publishedAt: r.published_at,
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const mapPage = (r: any) => ({
  _id: String(r.id),
  id: String(r.id),
  title: r.title,
  slug: r.slug,
  content: r.content || "",
  metaTitle: r.meta_title || "",
  metaDescription: r.meta_description || "",
  canonical: r.canonical || "",
  robotsIndex: bool(r.robots_index),
  showInMenu: bool(r.show_in_menu),
  active: bool(r.active),
  createdAt: r.created_at,
  updatedAt: r.updated_at,
});

const mapSettings = (r: any) => ({
  clinicName: r.clinic_name,
  phone: r.phone,
  email: r.email,
  whatsapp: r.whatsapp,
  address: r.address,
  facebook: r.facebook,
  instagram: r.instagram,
  youtube: r.youtube,
  openingHours: r.opening_hours,
  seoTitle: r.seo_title,
  seoDescription: r.seo_description,
  seoKeywords: r.seo_keywords,
  headerCode: r.header_code || "",
  footerCode: r.footer_code || "",
  robotsTxt: r.robots_txt || "",
});

const mapAppointment = (r: any) => ({
  _id: String(r.id),
  id: String(r.id),
  name: r.name,
  phone: r.phone,
  email: r.email,
  date: r.date,
  message: r.message || "",
  treatment: r.treatment || "",
  status: r.status,
  createdAt: r.created_at,
});

const mapContact = (r: any) => ({
  _id: String(r.id),
  id: String(r.id),
  name: r.name,
  email: r.email,
  phone: r.phone || "",
  subject: r.subject,
  message: r.message,
  read: bool(r.is_read),
  createdAt: r.created_at,
});

const mapTestimonial = (r: any) => ({
  _id: String(r.id),
  id: String(r.id),
  name: r.name,
  role: r.role || "Patient",
  content: r.content,
  rating: r.rating ?? 5,
  order: r.menu_order ?? 0,
  active: bool(r.active),
  createdAt: r.created_at,
});

const mapGallery = (r: any) => ({
  _id: String(r.id),
  id: String(r.id),
  title: r.title || "Clinic Image",
  imageUrl: r.image_url,
  category: r.category || "Clinic",
  order: r.menu_order ?? 0,
  active: bool(r.active),
  createdAt: r.created_at,
});

/* ───────────────────────── TREATMENTS ───────────────────────── */

export async function dbGetTreatments(includeInactive = false) {
  const where = includeInactive ? "" : "WHERE active = 1";
  const rows = await query(
    `SELECT * FROM treatments ${where} ORDER BY menu_order ASC, created_at ASC`
  );
  return rows.map(mapTreatment);
}

export async function dbGetMenuTreatments() {
  const rows = await query(
    `SELECT * FROM treatments WHERE active = 1 AND show_in_menu = 1 ORDER BY menu_order ASC, created_at ASC`
  );
  return rows.map(mapTreatment);
}

export async function dbGetTreatmentBySlug(slug: string) {
  const r = await queryOne(`SELECT * FROM treatments WHERE slug = ? LIMIT 1`, [slug]);
  return r ? mapTreatment(r) : null;
}

export async function dbGetTreatmentById(id: string | number) {
  const r = await queryOne(`SELECT * FROM treatments WHERE id = ? LIMIT 1`, [id]);
  return r ? mapTreatment(r) : null;
}

export async function dbCreateTreatment(d: any) {
  const r = await execute(
    `INSERT INTO treatments
       (name, slug, short_desc, content, image, icon, conditions, meta_title,
        meta_description, canonical, robots_index, menu_order, show_in_menu, active)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      d.name,
      d.slug,
      d.shortDesc || "",
      d.content || "",
      d.image || "",
      d.icon || "🦴",
      JSON.stringify(Array.isArray(d.conditions) ? d.conditions : []),
      d.metaTitle || "",
      d.metaDescription || "",
      d.canonical || "",
      d.robotsIndex === false ? 0 : 1,
      d.order ?? 0,
      d.showInMenu === false ? 0 : 1,
      d.active === false ? 0 : 1,
    ]
  );
  return dbGetTreatmentById(r.insertId);
}

export async function dbUpdateTreatment(id: string | number, d: any) {
  const map: Record<string, string> = {
    name: "name",
    slug: "slug",
    shortDesc: "short_desc",
    content: "content",
    image: "image",
    icon: "icon",
    metaTitle: "meta_title",
    metaDescription: "meta_description",
    canonical: "canonical",
    order: "menu_order",
  };
  const payload = { ...d };
  if (d.conditions !== undefined)
    payload.conditions = JSON.stringify(
      Array.isArray(d.conditions) ? d.conditions : []
    );
  if (d.robotsIndex !== undefined) payload.robots_index = d.robotsIndex ? 1 : 0;
  if (d.showInMenu !== undefined) payload.show_in_menu = d.showInMenu ? 1 : 0;
  if (d.active !== undefined) payload.active = d.active ? 1 : 0;

  const extra: Record<string, string> = {
    conditions: "conditions",
    robots_index: "robots_index",
    show_in_menu: "show_in_menu",
    active: "active",
  };
  const { clause, vals } = buildSet({ ...map, ...extra }, payload);
  if (clause) await execute(`UPDATE treatments SET ${clause} WHERE id = ?`, [...vals, id]);
  return dbGetTreatmentById(id);
}

export async function dbDeleteTreatment(id: string | number) {
  await execute(`DELETE FROM treatments WHERE id = ?`, [id]);
}

/* ───────────────────────── BLOGS ───────────────────────── */

export async function dbGetBlogs(opts: {
  admin?: boolean;
  page?: number;
  limit?: number;
  category?: string | null;
  tag?: string | null;
} = {}) {
  if (opts.admin) {
    const rows = await query(
      `SELECT id,title,slug,excerpt,cover_image,author,category,read_time,
              published,published_at,created_at,updated_at,robots_index
       FROM blogs ORDER BY created_at DESC`
    );
    return { posts: rows.map(mapBlog), total: rows.length };
  }
  const page = opts.page || 1;
  const limit = opts.limit || 10;
  const conds: string[] = ["published = 1"];
  const params: any[] = [];
  if (opts.category) {
    conds.push("category = ?");
    params.push(opts.category);
  }
  if (opts.tag) {
    conds.push("JSON_CONTAINS(tags, JSON_QUOTE(?))");
    params.push(opts.tag);
  }
  const where = `WHERE ${conds.join(" AND ")}`;
  const rows = await query(
    `SELECT id,title,slug,excerpt,cover_image,author,category,read_time,
            published,published_at,created_at,updated_at
     FROM blogs ${where} ORDER BY published_at DESC LIMIT ? OFFSET ?`,
    [...params, limit, (page - 1) * limit]
  );
  const c = await queryOne<{ n: number }>(
    `SELECT COUNT(*) AS n FROM blogs ${where}`,
    params
  );
  return { posts: rows.map(mapBlog), total: c?.n || 0, page, limit };
}

export async function dbGetPublishedBlogs(limit = 50) {
  const rows = await query(
    `SELECT id,title,slug,excerpt,cover_image,author,category,read_time,
            robots_index,published,published_at,updated_at
     FROM blogs WHERE published = 1 ORDER BY published_at DESC LIMIT ?`,
    [limit]
  );
  return rows.map(mapBlog);
}

export async function dbGetBlogBySlug(slug: string, includeUnpublished = false) {
  const cond = includeUnpublished ? "" : "AND published = 1";
  const r = await queryOne(`SELECT * FROM blogs WHERE slug = ? ${cond} LIMIT 1`, [slug]);
  return r ? mapBlog(r) : null;
}

export async function dbCreateBlog(d: any) {
  const r = await execute(
    `INSERT INTO blogs
       (title, slug, excerpt, content, cover_image, author, tags, category, read_time,
        meta_title, meta_description, canonical, robots_index, published, published_at)
     VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    [
      d.title,
      d.slug,
      d.excerpt || "",
      d.content || "",
      d.coverImage || "",
      d.author || "Dr. Rajneesh Kant",
      JSON.stringify(Array.isArray(d.tags) ? d.tags : []),
      d.category || "General",
      d.readTime || "5 min read",
      d.metaTitle || "",
      d.metaDescription || "",
      d.canonical || "",
      d.robotsIndex === false ? 0 : 1,
      d.published ? 1 : 0,
      d.published ? new Date() : null,
    ]
  );
  return dbGetBlogBySlugById(r.insertId);
}

async function dbGetBlogBySlugById(id: number) {
  const r = await queryOne(`SELECT * FROM blogs WHERE id = ? LIMIT 1`, [id]);
  return r ? mapBlog(r) : null;
}

export async function dbUpdateBlog(slug: string, d: any) {
  const map: Record<string, string> = {
    title: "title",
    newSlug: "slug",
    excerpt: "excerpt",
    content: "content",
    coverImage: "cover_image",
    author: "author",
    category: "category",
    readTime: "read_time",
    metaTitle: "meta_title",
    metaDescription: "meta_description",
    canonical: "canonical",
  };
  const payload: any = { ...d };
  if (d.slug !== undefined) payload.newSlug = d.slug; // allow slug change
  if (d.tags !== undefined)
    payload.tags = JSON.stringify(Array.isArray(d.tags) ? d.tags : []);
  if (d.robotsIndex !== undefined) payload.robots_index = d.robotsIndex ? 1 : 0;
  if (d.published !== undefined) payload.published = d.published ? 1 : 0;
  // set publishedAt when first publishing
  const existing = await dbGetBlogBySlug(slug, true);
  if (d.published && existing && !existing.publishedAt) payload.published_at = new Date();

  const extra: Record<string, string> = {
    tags: "tags",
    robots_index: "robots_index",
    published: "published",
    published_at: "published_at",
  };
  const { clause, vals } = buildSet({ ...map, ...extra }, payload);
  if (clause) await execute(`UPDATE blogs SET ${clause} WHERE slug = ?`, [...vals, slug]);
  const finalSlug = payload.newSlug || slug;
  return dbGetBlogBySlug(finalSlug, true);
}

export async function dbDeleteBlog(slug: string) {
  await execute(`DELETE FROM blogs WHERE slug = ?`, [slug]);
}

/* ───────────────────────── PAGES ───────────────────────── */

export async function dbGetPages(adminAll = false) {
  const where = adminAll ? "" : "WHERE active = 1";
  const rows = await query(
    `SELECT * FROM pages ${where} ORDER BY title ASC`
  );
  return rows.map(mapPage);
}

export async function dbGetPageBySlug(slug: string) {
  const r = await queryOne(`SELECT * FROM pages WHERE slug = ? LIMIT 1`, [slug]);
  return r ? mapPage(r) : null;
}

export async function dbGetPageById(id: string | number) {
  const r = await queryOne(`SELECT * FROM pages WHERE id = ? LIMIT 1`, [id]);
  return r ? mapPage(r) : null;
}

export async function dbCreatePage(d: any) {
  const r = await execute(
    `INSERT INTO pages
       (title, slug, content, meta_title, meta_description, canonical, robots_index, show_in_menu, active)
     VALUES (?,?,?,?,?,?,?,?,?)`,
    [
      d.title,
      d.slug,
      d.content || "",
      d.metaTitle || "",
      d.metaDescription || "",
      d.canonical || "",
      d.robotsIndex === false ? 0 : 1,
      d.showInMenu ? 1 : 0,
      d.active === false ? 0 : 1,
    ]
  );
  return dbGetPageById(r.insertId);
}

export async function dbUpdatePage(id: string | number, d: any) {
  const map: Record<string, string> = {
    title: "title",
    slug: "slug",
    content: "content",
    metaTitle: "meta_title",
    metaDescription: "meta_description",
    canonical: "canonical",
  };
  const payload: any = { ...d };
  if (d.robotsIndex !== undefined) payload.robots_index = d.robotsIndex ? 1 : 0;
  if (d.showInMenu !== undefined) payload.show_in_menu = d.showInMenu ? 1 : 0;
  if (d.active !== undefined) payload.active = d.active ? 1 : 0;
  const extra = { robots_index: "robots_index", show_in_menu: "show_in_menu", active: "active" };
  const { clause, vals } = buildSet({ ...map, ...extra }, payload);
  if (clause) await execute(`UPDATE pages SET ${clause} WHERE id = ?`, [...vals, id]);
  return dbGetPageById(id);
}

export async function dbDeletePage(id: string | number) {
  await execute(`DELETE FROM pages WHERE id = ?`, [id]);
}

/* ───────────────────────── SETTINGS ───────────────────────── */

export async function dbGetSettings() {
  const r = await queryOne(`SELECT * FROM site_settings WHERE id = 1 LIMIT 1`);
  if (!r) return null;
  return mapSettings(r);
}

export async function dbUpdateSettings(d: any) {
  const map: Record<string, string> = {
    clinicName: "clinic_name",
    phone: "phone",
    email: "email",
    whatsapp: "whatsapp",
    address: "address",
    facebook: "facebook",
    instagram: "instagram",
    youtube: "youtube",
    openingHours: "opening_hours",
    seoTitle: "seo_title",
    seoDescription: "seo_description",
    seoKeywords: "seo_keywords",
    headerCode: "header_code",
    footerCode: "footer_code",
    robotsTxt: "robots_txt",
  };
  const { clause, vals } = buildSet(map, d);
  if (clause) await execute(`UPDATE site_settings SET ${clause} WHERE id = 1`, [...vals]);
  return dbGetSettings();
}

/* ───────────────────────── APPOINTMENTS ───────────────────────── */

export async function dbListAppointments(status?: string | null) {
  const where = status ? "WHERE status = ?" : "";
  const rows = await query(
    `SELECT * FROM appointments ${where} ORDER BY created_at DESC`,
    status ? [status] : []
  );
  return rows.map(mapAppointment);
}

export async function dbCreateAppointment(d: any) {
  const r = await execute(
    `INSERT INTO appointments (name, phone, email, date, message, treatment, status)
     VALUES (?,?,?,?,?,?, 'pending')`,
    [d.name, d.phone, d.email, new Date(d.date), d.message || null, d.treatment || null]
  );
  return r.insertId;
}

export async function dbUpdateAppointment(id: string | number, d: any) {
  const { clause, vals } = buildSet({ status: "status", date: "date" }, d);
  if (clause) await execute(`UPDATE appointments SET ${clause} WHERE id = ?`, [...vals, id]);
  const r = await queryOne(`SELECT * FROM appointments WHERE id = ?`, [id]);
  return r ? mapAppointment(r) : null;
}

export async function dbDeleteAppointment(id: string | number) {
  await execute(`DELETE FROM appointments WHERE id = ?`, [id]);
}

/* ───────────────────────── CONTACTS ───────────────────────── */

export async function dbListContacts() {
  const rows = await query(`SELECT * FROM contacts ORDER BY created_at DESC`);
  const messages = rows.map(mapContact);
  return { messages, total: messages.length, unread: messages.filter((m) => !m.read).length };
}

export async function dbCreateContact(d: any) {
  await execute(
    `INSERT INTO contacts (name, email, phone, subject, message) VALUES (?,?,?,?,?)`,
    [d.name, d.email, d.phone || null, d.subject, d.message]
  );
}

export async function dbUpdateContact(id: string | number, d: any) {
  if (d.read !== undefined)
    await execute(`UPDATE contacts SET is_read = ? WHERE id = ?`, [d.read ? 1 : 0, id]);
  const r = await queryOne(`SELECT * FROM contacts WHERE id = ?`, [id]);
  return r ? mapContact(r) : null;
}

export async function dbDeleteContact(id: string | number) {
  await execute(`DELETE FROM contacts WHERE id = ?`, [id]);
}

/* ───────────────────────── TESTIMONIALS ───────────────────────── */

export async function dbGetTestimonials(includeInactive = false) {
  const where = includeInactive ? "" : "WHERE active = 1";
  const rows = await query(
    `SELECT * FROM testimonials ${where} ORDER BY menu_order ASC, created_at DESC`
  );
  return rows.map(mapTestimonial);
}

export async function dbCreateTestimonial(d: any) {
  const c = await queryOne<{ n: number }>(`SELECT COUNT(*) AS n FROM testimonials`);
  const r = await execute(
    `INSERT INTO testimonials (name, role, content, rating, menu_order, active)
     VALUES (?,?,?,?,?,?)`,
    [d.name, d.role || "Patient", d.content, d.rating ?? 5, d.order ?? c?.n ?? 0, d.active === false ? 0 : 1]
  );
  const row = await queryOne(`SELECT * FROM testimonials WHERE id = ?`, [r.insertId]);
  return row ? mapTestimonial(row) : null;
}

export async function dbUpdateTestimonial(id: string | number, d: any) {
  const payload: any = { ...d };
  if (d.active !== undefined) payload.active = d.active ? 1 : 0;
  const { clause, vals } = buildSet(
    { name: "name", role: "role", content: "content", rating: "rating", order: "menu_order", active: "active" },
    payload
  );
  if (clause) await execute(`UPDATE testimonials SET ${clause} WHERE id = ?`, [...vals, id]);
  const row = await queryOne(`SELECT * FROM testimonials WHERE id = ?`, [id]);
  return row ? mapTestimonial(row) : null;
}

export async function dbDeleteTestimonial(id: string | number) {
  await execute(`DELETE FROM testimonials WHERE id = ?`, [id]);
}

/* ───────────────────────── GALLERY ───────────────────────── */

export async function dbGetGallery(all = false) {
  const where = all ? "" : "WHERE active = 1";
  const rows = await query(
    `SELECT * FROM gallery_images ${where} ORDER BY menu_order ASC, created_at DESC`
  );
  return rows.map(mapGallery);
}

export async function dbCreateGallery(d: any) {
  const c = await queryOne<{ n: number }>(`SELECT COUNT(*) AS n FROM gallery_images`);
  const r = await execute(
    `INSERT INTO gallery_images (title, image_url, category, menu_order, active)
     VALUES (?,?,?,?,?)`,
    [d.title || "Clinic Image", d.imageUrl, d.category || "Clinic", d.order ?? c?.n ?? 0, d.active === false ? 0 : 1]
  );
  const row = await queryOne(`SELECT * FROM gallery_images WHERE id = ?`, [r.insertId]);
  return row ? mapGallery(row) : null;
}

export async function dbUpdateGallery(id: string | number, d: any) {
  const payload: any = { ...d };
  if (d.active !== undefined) payload.active = d.active ? 1 : 0;
  const { clause, vals } = buildSet(
    { title: "title", imageUrl: "image_url", category: "category", order: "menu_order", active: "active" },
    payload
  );
  if (clause) await execute(`UPDATE gallery_images SET ${clause} WHERE id = ?`, [...vals, id]);
  const row = await queryOne(`SELECT * FROM gallery_images WHERE id = ?`, [id]);
  return row ? mapGallery(row) : null;
}

export async function dbDeleteGallery(id: string | number) {
  await execute(`DELETE FROM gallery_images WHERE id = ?`, [id]);
}

/* ───────────────────────── ADMIN ───────────────────────── */

export async function dbGetAdminByEmail(email: string) {
  return queryOne<{ id: number; email: string; password: string; name: string }>(
    `SELECT id, email, password, name FROM admin_users WHERE email = ? LIMIT 1`,
    [email]
  );
}

/* ───────────────────────── SLUG RESOLVER (root-level routing) ───────────────────────── */

export async function dbResolveSlug(slug: string) {
  const t = await dbGetTreatmentBySlug(slug);
  if (t && t.active) return { type: "treatment" as const, data: t };
  const b = await dbGetBlogBySlug(slug, false);
  if (b) return { type: "blog" as const, data: b };
  const p = await dbGetPageBySlug(slug);
  if (p && p.active) return { type: "page" as const, data: p };
  return null;
}
