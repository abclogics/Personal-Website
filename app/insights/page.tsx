import type { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { getAllPosts } from "@/lib/content";
import { insightCategories } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Insights",
  description:
    "Articles and website-native MDX posts on AI strategy, cybersecurity leadership, digital transformation, executive leadership, IT career growth, and M&A technology.",
  path: "/insights"
});

export default function InsightsPage() {
  const posts = getAllPosts();

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Strategic perspective for technology leaders."
        description="Practical writing for executives, IT leaders, and growth-stage organizations navigating AI, cybersecurity, transformation, and career reinvention."
      />

      <section className="bg-white py-10">
        <Container>
          <div className="flex flex-wrap gap-3">
            {insightCategories.map((category) => (
              <span key={category} className="rounded-md border border-[#d9e2ec] bg-[#f7f8fb] px-4 py-2 text-sm text-[#344054]">
                {category}
              </span>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Website-native articles"
            title="Latest posts"
            description="Draft posts are stored as MDX in the repository. Add a new .mdx file to publish another article."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <InsightCard key={post.slug} {...post} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeader
            eyebrow="LinkedIn articles"
            title="External thought leadership placeholders"
            description="Use this area for LinkedIn article links, newsletter embeds, or curated external commentary."
          />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {["AI governance as a leadership discipline", "Cybersecurity culture beyond compliance"].map((title) => (
              <a
                key={title}
                className="focus-ring flex items-center justify-between gap-6 rounded-lg border border-[#d9e2ec] bg-[#f7f8fb] p-5 text-[#071527] transition hover:bg-white"
                href="#"
              >
                <span className="font-semibold">{title}</span>
                <ExternalLink aria-hidden className="h-4 w-4 flex-none" />
              </a>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
