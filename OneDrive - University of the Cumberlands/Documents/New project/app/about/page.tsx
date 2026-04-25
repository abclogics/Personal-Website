import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/container";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { approachBlocks, careerHighlights, experienceBlocks } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Executive biography, leadership philosophy, and career highlights for Dr. Oluseye Fadiran, Owner/CTO of CompTech Consulting LLC.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Dr. Fadiran"
        title="Executive technology leadership shaped by service, scholarship, and scale."
        description="Dr. Oluseye Fadiran is a senior IT executive, technology strategist, cybersecurity leader, AI adoption advisor, doctoral researcher, U.S. Army veteran, and Owner/CTO of CompTech Consulting LLC."
      />

      <section className="bg-white py-16">
        <Container className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeader
            eyebrow="Executive bio"
            title="More than 20 years across business-critical technology environments"
            description="His experience spans telecommunications, healthcare, energy, managed services, construction, private equity-backed companies, enterprise IT, cybersecurity governance, cloud modernization, M&A technology integration, and digital transformation."
          />
          <div className="space-y-6 text-base leading-8 text-[#344054]">
            <p>
              Dr. Fadiran helps executives translate technology complexity into business decisions that improve resilience,
              growth, security, and operational performance. His work connects enterprise architecture, cybersecurity risk,
              operating model design, and practical AI adoption.
            </p>
            <p>
              His doctoral achievement reflects a commitment to evidence-based leadership and disciplined research. His Army
              service informs a leadership style rooted in accountability, mission clarity, and calm execution under pressure.
            </p>
            <p>
              Through Techfluence Signals and CompTech Consulting LLC, he develops content, advisory services, coaching, and
              workshops for leaders who want technology to become a credible growth engine rather than a source of friction.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="My Approach"
            title="Advisory built around clarity, risk, and measurable business value"
            description="The work starts with executive alignment and ends with practical operating models leaders can sustain."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {approachBlocks.map((block) => (
              <article key={block.title} className="rounded-lg border border-[#d9e2ec] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-[#071527]">{block.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[#475467]">{block.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeader
            eyebrow="Experience"
            title="A cross-industry record of building, securing, and scaling technology"
            description="Dr. Fadiran brings executive perspective across complex sectors, regulated environments, and growth-stage operating models."
          />
          <div className="mt-10 grid gap-5 lg:grid-cols-2">
            {experienceBlocks.map((item) => (
              <div key={item} className="flex gap-4 rounded-lg border border-[#d9e2ec] bg-[#f7f8fb] p-5">
                <CheckCircle2 aria-hidden className="mt-1 h-5 w-5 flex-none text-[#1b8a8f]" />
                <p className="text-sm leading-7 text-[#344054]">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Selected achievements"
            title="A practical record of transformation"
            description="The throughline is simple: build the right technology foundations, strengthen governance, and help teams execute with confidence."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {careerHighlights.map((item) => (
              <div key={item} className="flex gap-4 rounded-lg border border-[#d9e2ec] bg-white p-5 shadow-sm">
                <CheckCircle2 aria-hidden className="mt-1 h-5 w-5 flex-none text-[#1b8a8f]" />
                <p className="text-sm leading-7 text-[#344054]">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#071527] py-16 text-white">
        <Container>
          <SectionHeader
            eyebrow="Leadership philosophy"
            title="Technology leadership should be strategic, secure, and deeply human."
            description="The best technology organizations earn trust by making risk visible, simplifying decisions, building capable teams, and tying every major investment to the outcomes that matter to the business."
          />
        </Container>
      </section>
    </>
  );
}
