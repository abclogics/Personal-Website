import type { Metadata } from "next";
import { Mic2 } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { workshops } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Speaking and Workshops",
  description:
    "Keynotes, workshops, and webinars on AI-ready organizations, cybersecurity culture, IT leadership, and private equity technology scale.",
  path: "/speaking-workshops"
});

export default function SpeakingPage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking and workshops"
        title="Boardroom-ready sessions for leaders navigating technology change."
        description="Sessions are designed for executive audiences, IT leadership teams, professional groups, and organizations that want a grounded conversation about AI, security, transformation, and career resilience."
      />

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Topics"
            title="Practical, current, and built for decision-makers"
            description="Each topic can be shaped as a keynote, facilitated workshop, leadership offsite, webinar, or coaching series."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {workshops.map((topic) => (
              <article key={topic} className="flex gap-4 rounded-lg border border-[#d9e2ec] bg-white p-6 shadow-sm">
                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-md bg-[#e7f3f3] text-[#1b8a8f]">
                  <Mic2 aria-hidden className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-[#071527]">{topic}</h2>
                  <p className="mt-2 text-sm leading-7 text-[#475467]">
                    A strategic session with practical frameworks, executive language, and clear next steps.
                  </p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/booking">Request a Session</ButtonLink>
          </div>
        </Container>
      </section>
    </>
  );
}
