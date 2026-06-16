# Dr. Rajneesh Kant — Clinic Website (Next.js 15 + MySQL)

Full-stack clinic website. Migrated from MongoDB to **MySQL** and upgraded to **Next.js 15**.
SEO-friendly: every blog, treatment and page opens at a **root-level slug**
(e.g. `/back-pain/`, `/exercises-for-migraine-relief/`, `/terms`) so the old
WordPress URLs are preserved.

## 1. Requirements
- Node.js 18.18+ (Node 20 recommended)
- MySQL 8 or MariaDB 10.4+

## 2. Database setup
```bash
# create the database, then import schema + content
mysql -u root -p -e "CREATE DATABASE drrajneeshkant CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
mysql -u root -p drrajneeshkant < sql/schema.sql          # tables + default admin
mysql -u root -p drrajneeshkant < sql/seed-content.sql    # 14 treatments + 14 pages + 26 blogs
```
Default admin login: **admin@gmail.com / 123456** — change it after first login.

> Images inside the imported content still point to `https://drrajneeshkant.com/wp-content/uploads/...`.
> Once you rehost the media, run a find-and-replace on the `content`, `image` and `cover_image`
> columns to swap the domain.

## 3. Environment
```bash
cp .env.local.example .env.local
# then fill MYSQL_*, JWT_SECRET and EMAIL_* values
```

## 4. Run
```bash
npm install
npm run dev      # http://localhost:3000
# production:
npm run build && npm run start   # serves on port 3007
```

## 5. Admin panel
`/admin` → login. Manage Treatments, Blog Posts, **Content Pages** (add/edit/delete),
Gallery, Testimonials, Appointments, Messages and Site Settings.

### Editor
The rich text editor has a full toolbar (font, size, headings, colours, lists,
alignment, links, images, video) **plus a Visual / HTML toggle** to edit raw HTML.

### SEO controls (per blog / treatment / page)
- **Meta title** & **meta description**
- **Canonical URL** (auto `https://drrajneeshkant.com/{slug}/` if left blank)
- **Search-engine indexing** toggle → ON emits
  `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`,
  OFF emits `noindex, nofollow`.
- Treatments have a **"Show in header Treatments menu"** toggle — the header
  dropdown is built dynamically from this.

### Sitemap
`/sitemap.xml` is generated dynamically from all indexable treatments, blogs and
pages (noindex items are excluded).

## 6. Tech
Next.js 15 (App Router) · React 18 · MySQL via `mysql2/promise` (no ORM, so the
SQL you paste works directly) · JWT auth (jose) · Tailwind CSS · react-quill.

## Routing model
- `/[slug]` — single catch-all that resolves **treatment → blog → page** and renders
  the right template with dynamic canonical + robots.
- `/treatments` and `/blogs` remain as listing pages; individual items live at the
  root slug only (one canonical URL, no duplicate content).
- Static routes (`/about`, `/contact`, `/gallery`, `/appointment`, `/admin`, `/api`)
  always take priority over the catch-all.
