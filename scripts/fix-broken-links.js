/**
 * One-time cleanup for broken links living INSIDE saved rich-text content
 * (treatments.content, blogs.content, pages.content) — these aren't in the
 * codebase, they're data the admin pasted/linked via the CMS editor, so a
 * code fix can't reach them. Run this once against the live DB.
 *
 * Usage:
 *   MYSQL_HOST=... MYSQL_USER=... MYSQL_PASSWORD=... MYSQL_DATABASE=... \
 *   node scripts/fix-broken-links.js
 *
 * What it does, per audit report:
 *   1. Any link to https://drrajneeshkant.com/blog (singular, 404) →
 *      https://drrajneeshkant.com/blogs
 *   2. The following broken links are fully removed (the <a> tag is
 *      unwrapped, its visible text is kept):
 *        /chiropractic-care-benefits
 *        /chiropractic-therapy-center-mumbai
 *        /knee-pain
 *        /lower-back-pain-causes-treatment
 *        /sciatica              (exact — does NOT touch /sciatica-pain-treatment)
 *        /sciatica-exercises-relief
 *        /spine-alignment        (exact — does NOT touch /spine-alignment-therapy)
 */
try {
  require("dotenv").config({ path: require("path").join(__dirname, "..", ".env") });
} catch {
  // dotenv not installed — fine if env vars are already set in the shell
}
const mysql = require("mysql2/promise");

const REMOVE_LINK_PATHS = [
  "chiropractic-care-benefits",
  "chiropractic-therapy-center-mumbai",
  "knee-pain",
  "lower-back-pain-causes-treatment",
  "sciatica",
  "sciatica-exercises-relief",
  "spine-alignment",
];

function fixContent(html) {
  if (!html) return html;
  let out = html;

  // 1. /blog -> /blogs (only the exact singular path, not /blogs itself)
  out = out.replace(
    /href="https?:\/\/(?:www\.)?drrajneeshkant\.com\/blog"/gi,
    'href="https://drrajneeshkant.com/blogs"'
  );
  out = out.replace(/href="\/blog"/gi, 'href="/blogs"');

  // 2. Unwrap <a> tags pointing at the fully-broken paths, keep inner text.
  for (const p of REMOVE_LINK_PATHS) {
    const re = new RegExp(
      `<a[^>]*href="https?:\\/\\/(?:www\\.)?drrajneeshkant\\.com\\/${p}\\/?"[^>]*>([\\s\\S]*?)<\\/a>`,
      "gi"
    );
    out = out.replace(re, "$1");
    const reRelative = new RegExp(
      `<a[^>]*href="\\/${p}\\/?"[^>]*>([\\s\\S]*?)<\\/a>`,
      "gi"
    );
    out = out.replace(reRelative, "$1");
  }

  return out;
}

async function run() {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: Number(process.env.MYSQL_PORT || 3306),
    user: process.env.MYSQL_USER || "root",
    password: process.env.MYSQL_PASSWORD || "",
    database: process.env.MYSQL_DATABASE || "drrajneeshkant",
  });

  for (const table of ["treatments", "blogs", "pages"]) {
    const [rows] = await pool.query(`SELECT id, content FROM \`${table}\``);
    let changed = 0;
    for (const row of rows) {
      const fixed = fixContent(row.content);
      if (fixed !== row.content) {
        await pool.query(`UPDATE \`${table}\` SET content = ? WHERE id = ?`, [
          fixed,
          row.id,
        ]);
        changed++;
      }
    }
    console.log(`${table}: checked ${rows.length}, updated ${changed}`);
  }

  await pool.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
