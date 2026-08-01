/** Allow only Pagefind highlight marks through; strip other HTML. */
export function sanitizeSearchExcerpt(html: string): string {
  return html
    .replace(/<(?!\/?mark\b)[^>]*>/gi, "")
    .replace(/on\w+="[^"]*"/gi, "")
    .replace(/javascript:/gi, "");
}
