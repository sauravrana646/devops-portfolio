import { extractHeadings } from "@/lib/blog-heading";
import type { BlogPost } from "@/lib/blog-types";

export function PostToc({ post }: { post: BlogPost }) {
  const headings = extractHeadings(post.content);
  if (headings.length === 0) return null;

  return (
    <nav data-pagefind-ignore aria-label="Table of contents" className="mb-10 rounded-lg border border-border bg-surface p-5">
      <p className="mb-3 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
        On this page
      </p>
      <ol className="list-none space-y-2 p-0">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a href={`#${heading.id}`} className="text-sm text-ink-soft hover:text-mint-deep">
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
