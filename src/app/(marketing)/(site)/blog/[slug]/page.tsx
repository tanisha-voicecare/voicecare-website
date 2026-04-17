import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SectionWrapper } from "@/components/ui/section-wrapper";
import { createPageMetadata } from "@/lib/seo";
import { getAllPostSlugs, getPostBySlug, processPost } from "@/lib/wordpress";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return createPageMetadata({ title: "Blog" });
  const processed = processPost(post);
  return createPageMetadata({
    title: processed.title,
    description: processed.excerpt,
  });
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const item = processPost(post);
  return (
    <SectionWrapper className="bg-white">
      <article className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight text-[#06003f] sm:text-5xl">
          {item.title}
        </h1>
        <p className="mt-4 text-sm text-neutral-500">
          {new Date(item.date).toLocaleDateString()} · {item.readingTime} min read
        </p>
        <div
          className="prose prose-neutral mt-8 max-w-none prose-headings:text-[#06003f]"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </article>
    </SectionWrapper>
  );
}
