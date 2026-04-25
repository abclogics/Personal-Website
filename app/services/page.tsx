import type { Metadata } from "next";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { FaqAccordion } from "@/components/faq-accordion";
import { PageHero } from "@/components/page-hero";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { faqs, services, testimonials } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Services",
  description:
    "Fractional CTO, CIO, CISO, AI strategy, cybersecurity governance, cloud modernization, M&A technology diligence, coaching, and workshops.",
  path: "/services"
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Advisory services for leaders who need technology to perform."
        description="Engagements are sized for practical outcomes, from executive advisory and board support to program assessments, workshops, and leadership coaching."
      />

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Core offerings"
            title="Choose the advisory lane that fits your next decision"
            description="Each service can stand alone or combine into a broader transformation roadmap."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-8 rounded-lg border border-[#d9e2ec] bg-[#f7f8fb] p-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <h2 className="text-3xl font-semibold text-[#071527]">Need a tailored executive advisory session?</h2>
            <p className="mt-3 max-w-2xl text-base leading-7 text-[#475467]">
              Share the business context, operating constraints, and decision timeline. The booking flow will route the request
              with an .ics calendar invite and email notifications.
            </p>
          </div>
          <ButtonLink href="/booking">Book a Consultation</ButtonLink>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Testimonials"
            title="What clients value in the advisory relationship"
            description="Placeholder testimonials are written for the intended tone and can be replaced with approved client quotes later."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.role} {...testimonial} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader
            eyebrow="Frequently Asked Questions"
            title="A practical starting point for advisory fit"
            description="These answers clarify common engagement types, typical audiences, and how the first conversation usually begins."
          />
          <FaqAccordion items={faqs} />
        </Container>
      </section>
    </>
  );
}
