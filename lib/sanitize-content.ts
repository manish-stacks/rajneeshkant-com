/**
 * Strips <style>...</style> and <script>...</script> blocks (and any bare
 * closing tags left behind by copy-pasted Word/Google-Docs content) from
 * CMS rich-text HTML before it's rendered with dangerouslySetInnerHTML.
 *
 * Without this, pasted content that carries inline <style> blocks (common
 * when pasting from Word/Docs) can render as literal CSS/code text on the
 * public page instead of being applied as styling or hidden.
 */
export function sanitizeContent(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "");
}
