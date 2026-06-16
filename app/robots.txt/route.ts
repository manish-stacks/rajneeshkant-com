import { dbGetSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://drrajneeshkant.com";

const DEFAULT_ROBOTS = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml`;

/**
 * robots.txt is served dynamically so it can be edited from the admin
 * Settings page (stored in site_settings.robots_txt). If the admin field is
 * empty we fall back to a sensible default that points at the sitemap.
 */
export async function GET() {
  let body = DEFAULT_ROBOTS;
  try {
    const settings = await dbGetSettings();
    if (settings?.robotsTxt && settings.robotsTxt.trim()) {
      body = settings.robotsTxt.trim();
    }
  } catch {
    // fall back to default
  }
  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=300",
    },
  });
}
