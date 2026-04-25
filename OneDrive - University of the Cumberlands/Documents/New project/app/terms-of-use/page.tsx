import type { Metadata } from "next";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "Terms of Use",
  description: "Terms of use for Dr. Oluseye Fadiran and CompTech Consulting LLC.",
  path: "/terms-of-use"
});

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Terms"
        title="Terms of Use"
        description="General terms for using this public website and reviewing CompTech Consulting LLC content."
      />
      <section className="py-16">
        <Container className="max-w-4xl">
          <div className="prose-content">
          <p>
            This website provides general information about {siteConfig.company}, Dr. Oluseye Fadiran, Techfluence Signals,
            and related consulting services. The content is informational and does not create a client relationship by itself.
          </p>
          <h2>No professional engagement until accepted</h2>
          <p>
            Submitting a form or booking request does not guarantee acceptance of an engagement, meeting, or speaking request.
            Any consulting relationship requires mutual agreement on scope, terms, and availability.
          </p>
          <h2>Content use</h2>
          <p>
            Site content may not be copied, republished, or used for commercial purposes without permission, except for normal
            sharing of article links with attribution.
          </p>
          <h2>Security</h2>
          <p>
            Visitors may not attempt to disrupt, probe, scrape aggressively, or misuse the site, forms, APIs, or supporting
            infrastructure.
          </p>
          </div>
        </Container>
      </section>
    </>
  );
}
