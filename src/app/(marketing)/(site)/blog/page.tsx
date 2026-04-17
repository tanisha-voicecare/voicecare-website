import type { Metadata } from "next";
import Link from "next/link";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { createPageMetadata } from "@/lib/seo";
import { getPosts, processPost } from "@/lib/wordpress";

export const metadata: Metadata = createPageMetadata({
  title: "Blogs",
  description: "Pulse on Agentic AI and Healthcare RCM — Insights from VoiceCare AI.",
});

export default async function BlogPage() {
  const { posts } = await getPosts({ perPage: 24 });
  const items = posts.map(processPost);

  return (
    <SectionWrapper className="bg-white">
      <h1 className="text-4xl font-semibold tracking-tight text-[#06003f] sm:text-5xl lg:text-6xl">
        Blogs
      </h1>
      <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
        Latest insights, news, and technical deep-dives into healthcare automation.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((post) => (
          <article
            key={post.id}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              {new Date(post.date).toLocaleDateString()}
            </p>
            <h2 className="mt-3 text-xl font-semibold text-[#06003f]">{post.title}</h2>
            <p className="mt-3 line-clamp-4 text-sm text-neutral-600">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-5 inline-flex text-sm font-medium text-[#02007f] hover:underline"
            >
              Read Article
            </Link>
          </article>
        ))}
        {items.length === 0 ? (
          <p className="text-neutral-600">No posts found yet. Please check back shortly.</p>
        ) : null}
      </div>
    </SectionWrapper>
  );
}
