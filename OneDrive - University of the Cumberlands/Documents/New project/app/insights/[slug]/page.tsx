import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/container";
import { MdxLite } from "@/components/mdx-lite";
import { PageHero } from "@/components/page-hero";
import { getAllPosts, getPost } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { articleSchema } from "@/lib/schema";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return {};
  }

  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/insights/${post.slug}`
  });
}

export default async function InsightDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <JsonLd data={articleSchema(post)} />
      <article>
        <PageHero eyebrow={post.category} title={post.title} description={post.description}>
          <time className="block text-sm text-white/60" dateTime={post.date}>
              {new Intl.DateTimeFormat("en", { month: "long", day: "numeric", year: "numeric" }).format(new Date(post.date))}
          </time>
        </PageHero>
        <section className="py-16">
          <Container className="max-w-4xl">
            <MdxLite body={post.body} />
          </Container>
        </section>
      </article>
    </>
  );
}
