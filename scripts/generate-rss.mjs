import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const blogDir = path.join(root, "content/blog");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
const basePath = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(/\/$/, "");
const origin = `${siteUrl}${basePath}`;

function escapeXml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

const posts = fs
  .readdirSync(blogDir)
  .filter((file) => file.endsWith(".mdx"))
  .map((file) => {
    const raw = fs.readFileSync(path.join(blogDir, file), "utf8");
    const { data } = matter(raw);
    return data;
  })
  .filter((post) => !post.draft)
  .sort((a, b) => (a.date < b.date ? 1 : -1))
  .slice(0, 50);

const items = posts
  .map((post) => {
    const link = `${origin}/blog/${post.slug}/`;
    return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.description)}</description>
    </item>`;
  })
  .join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${escapeXml("Notes — Platform & reliability")}</title>
    <link>${origin}/blog/</link>
    <description>Platform, delivery, reliability, and DevSecOps notes.</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;

const outFile = path.join(root, "public/rss.xml");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, xml);
console.log(`Wrote ${outFile} (${posts.length} posts)`);
