import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { slugifyHeading } from "@/lib/blog-heading";

export const mdxComponents: MDXComponents = {
  h2: ({ children, ...props }) => {
    const text = String(children);
    const id = slugifyHeading(text);
    return (
      <h2 id={id} className="mt-10 mb-4 scroll-mt-28 text-[length:var(--text-h2)] font-semibold text-ink" {...props}>
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => (
    <h3 className="mt-8 mb-3 text-[length:var(--text-h3)] font-semibold text-ink" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <p className="mb-5 leading-relaxed text-muted" {...props}>
      {children}
    </p>
  ),
  a: ({ href = "", children, ...props }) => {
    const className = "font-semibold text-mint-deep underline-offset-2 hover:underline";
    if (href.startsWith("/")) {
      return (
        <Link href={href} className={className} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={className} rel="noreferrer" {...props}>
        {children}
      </a>
    );
  },
  ul: ({ children, ...props }) => (
    <ul className="mb-5 list-disc space-y-2 pl-5 text-muted" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="mb-5 list-decimal space-y-2 pl-5 text-muted" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => <li {...props}>{children}</li>,
  strong: ({ children, ...props }) => (
    <strong className="font-semibold text-ink" {...props}>
      {children}
    </strong>
  ),
  pre: ({ children, ...props }) => (
    <pre
      className="mb-6 overflow-x-auto rounded-md bg-cta p-5 text-sm leading-relaxed text-canvas-elevated"
      {...props}
    >
      {children}
    </pre>
  ),
  code: ({ children, className, ...props }) => {
    const isBlock = Boolean(className);
    if (isBlock) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className="rounded bg-surface-soft px-1.5 py-0.5 font-mono text-[0.9em] text-ink" {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children, ...props }) => (
    <blockquote className="my-6 border-l-[3px] border-mint pl-4 font-serif text-lg text-ink" {...props}>
      {children}
    </blockquote>
  ),
};
