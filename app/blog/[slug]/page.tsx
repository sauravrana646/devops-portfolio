import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/blog/mdx-content";
import { PostToc } from "@/components/blog/post-toc";
import { Container } from "@/components/layout/container";
import { FadeIn } from "@/components/motion/fade-in";
import { BlogPostingJsonLd } from "@/components/seo/json-ld";
import { buttonClassName } from "@/components/ui/button";
import { getProject } from "@/content/projects";
import { site } from "@/content/site";
import { getAllPosts, getPostBySlug, getPostSlugs, getRelatedPosts } from "@/lib/blog";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter(Boolean)
    .map((post) => ({ slug: post!.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Note" };
  return {
    title: post.title,
    description: post.description,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post);
  const relatedProject = post.relatedProjectSlug
    ? getProject(post.relatedProjectSlug)
    : undefined;

  return (
    <article>
      <BlogPostingJsonLd
        title={post.title}
        description={post.description}
        date={post.date}
        slug={post.slug}
      />
      <Container size="narrow" className="py-16">
        <FadeIn y={10}>
          <header className="mb-10">
            <span className="mb-4 inline-block rounded-pill border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-soft">
              {post.category}
            </span>
            <h1 className="mb-4 text-[length:var(--text-display-lg)] font-semibold tracking-[-0.035em] text-ink">
              {post.title}
            </h1>
            <p className="font-mono text-sm text-muted">
              {post.date} · {post.readingTimeMinutes} min read
            </p>
          </header>
        </FadeIn>

        <FadeIn delay={0.05} y={8}>
          <PostToc post={post} />
        </FadeIn>

        <FadeIn delay={0.08} y={12}>
          <div data-pagefind-body className="max-w-[68ch]">
            <MdxContent source={post.content} />
          </div>
        </FadeIn>

        <FadeIn delay={0.04}>
          <aside data-pagefind-ignore aria-label="Related posts" className="mt-16">
            <p className="mb-2 text-[length:var(--text-caption)] font-bold uppercase tracking-[0.12em] text-mint-deep">
              Related
            </p>
            <h2 className="mb-4 text-[length:var(--text-h2)] font-semibold text-ink">Continue reading</h2>
            {related.length === 0
              ? getAllPosts()
                  .filter((item) => item.slug !== post.slug)
                  .slice(0, 3)
                  .map((item) => (
                    <RelatedRow
                      key={item.slug}
                      slug={item.slug}
                      date={item.date}
                      minutes={item.readingTimeMinutes}
                      title={item.title}
                    />
                  ))
              : related.map((item) => (
                  <RelatedRow
                    key={item.slug}
                    slug={item.slug}
                    date={item.date}
                    minutes={item.readingTimeMinutes}
                    title={item.title}
                  />
                ))}
            {relatedProject ? (
              <div className="mt-6 border-t border-border pt-6">
                <p className="mb-2 text-sm text-muted">Related case study</p>
                <Link
                  href={`/projects/${relatedProject.slug}/`}
                  className="font-semibold text-mint-deep"
                >
                  {relatedProject.title} →
                </Link>
              </div>
            ) : null}
          </aside>
        </FadeIn>

        <FadeIn>
          <div
            data-pagefind-ignore
            className="mt-14 rounded-lg border border-border bg-surface-soft p-8 text-center"
          >
            <h2 className="mb-3 text-[length:var(--text-h2)] font-semibold text-ink">
              Working a similar delivery constraint?
            </h2>
            <p className="mx-auto mb-6 max-w-xl text-muted">
              Tell me where changes still slip past Git—and what “good” looks like in the next quarter. I’ll
              reply within {site.responseDays} business days.
            </p>
            <Link
              href={`/contact/?ref=blog-${post.slug}`}
              className={buttonClassName({ variant: "primary" })}
            >
              Discuss an engagement
            </Link>
          </div>
        </FadeIn>
      </Container>
    </article>
  );
}

function RelatedRow({
  slug,
  date,
  minutes,
  title,
}: {
  slug: string;
  date: string;
  minutes: number;
  title: string;
}) {
  return (
    <Link href={`/blog/${slug}/`} className="grid gap-2 border-t border-border py-5">
      <span className="font-mono text-sm text-muted">
        {date} · {minutes} min
      </span>
      <h3 className="text-[length:var(--text-h3)] font-semibold text-ink hover:text-mint-deep">{title}</h3>
    </Link>
  );
}
