import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { VideoCard } from "@/components/video-card";
import { featuredVideos } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { videoSchema } from "@/lib/schema";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "YouTube and Media",
  description:
    "Featured Techfluence Signals videos on AI strategy, cybersecurity leadership, IT transformation, and executive technology careers.",
  path: "/youtube-media"
});

export default function MediaPage() {
  return (
    <>
      <JsonLd data={featuredVideos.map(videoSchema)} />
      <PageHero
        eyebrow="Techfluence Signals"
        title="Clear signals for leaders working through technology change."
        description="Videos, conversations, and short-form commentary on AI adoption, cybersecurity culture, IT leadership, and career growth."
      >
        <ButtonLink href={siteConfig.social.youtube}>Visit YouTube Channel</ButtonLink>
      </PageHero>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Featured videos"
            title="Embed-ready video cards"
            description="Replace the placeholder video IDs with live Techfluence Signals uploads or connect the YouTube Data API later."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredVideos.map((video) => (
              <VideoCard key={video.title} {...video} />
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
