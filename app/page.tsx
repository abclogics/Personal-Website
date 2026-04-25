import Image from "next/image";
import { ArrowRight, CalendarCheck, PlayCircle } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { InsightCard } from "@/components/insight-card";
import { ProfilePortrait } from "@/components/profile-portrait";
import { SectionHeader } from "@/components/section-header";
import { ServiceCard } from "@/components/service-card";
import { VideoCard } from "@/components/video-card";
import { getAllPosts } from "@/lib/content";
import { featuredVideos, services } from "@/lib/data";

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <>
      <section className="executive-gradient overflow-hidden text-white">
        <Container className="grid min-h-[calc(100vh-4rem)] items-center gap-10 py-16 lg:grid-cols-[1.02fr_0.98fr]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase text-[#8fd4d7]">Techfluence Signals</p>
            <h1 className="mt-5 text-5xl font-semibold tracking-normal sm:text-6xl lg:text-7xl">
              Technology Leadership for Growth, Security, and Scale
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/76">
              Helping executives, growth-stage companies, and technology teams turn IT, cybersecurity, cloud, and AI into
              measurable business advantage.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="/booking" icon={CalendarCheck}>
                Book a Consultation
              </ButtonLink>
              <ButtonLink href="/insights" variant="secondary" icon={ArrowRight}>
                Explore Insights
              </ButtonLink>
              <ButtonLink href="/youtube-media" variant="secondary" icon={PlayCircle}>
                Watch Techfluence Signals
              </ButtonLink>
            </div>
          </div>
          <div className="relative min-h-[380px] overflow-hidden rounded-lg border border-white/10 bg-white/5 shadow-2xl">
            <Image
              src="/images/executive-technology-hero.png"
              alt="Executive technology consulting environment with secure operations and cloud strategy visuals"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#071527]/55 via-transparent to-transparent" />
            <div className="absolute inset-x-0 top-8 z-10 flex justify-center px-6">
              <ProfilePortrait className="max-w-[210px]" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="grid grid-cols-3 gap-3 text-center text-xs text-white/80">
                <span className="rounded-md bg-white/10 px-3 py-3 backdrop-blur">AI Strategy</span>
                <span className="rounded-md bg-white/10 px-3 py-3 backdrop-blur">Cybersecurity</span>
                <span className="rounded-md bg-white/10 px-3 py-3 backdrop-blur">Cloud Scale</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <SectionHeader
              eyebrow="Executive advisory"
              title="A technology strategist for complex operating environments"
              description="Dr. Oluseye Fadiran brings more than 20 years of leadership across enterprise IT, cybersecurity governance, cloud modernization, digital transformation, and M&A technology integration."
            />
            <div className="grid gap-4 sm:grid-cols-3">
              {["U.S. Army veteran", "Doctoral researcher", "Owner/CTO"].map((item) => (
                <div key={item} className="rounded-lg border border-[#d9e2ec] bg-[#f7f8fb] p-5">
                  <p className="text-sm font-semibold text-[#071527]">{item}</p>
                  <p className="mt-2 text-sm leading-6 text-[#667085]">Grounded leadership for high-trust decisions.</p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <SectionHeader
            eyebrow="Services"
            title="Focused advisory for growth, resilience, and executive clarity"
            description="Engagements are built to help leadership teams make better technology decisions, reduce risk, and move with discipline."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.slice(0, 8).map((service) => (
              <ServiceCard key={service.title} {...service} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white py-16">
        <Container>
          <SectionHeader
            eyebrow="Media"
            title="Featured Techfluence Signals videos"
            description="Practical executive conversations on AI readiness, cybersecurity leadership, and the business role of technology."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {featuredVideos.map((video) => (
              <VideoCard key={video.title} {...video} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <SectionHeader
              eyebrow="Insights"
              title="Signals for technology leaders"
              description="Website-native posts and LinkedIn-ready article placeholders for leaders navigating AI, security, transformation, and career growth."
            />
            <ButtonLink href="/insights" variant="dark" icon={ArrowRight}>
              Explore Insights
            </ButtonLink>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {posts.map((post) => (
              <InsightCard key={post.slug} {...post} />
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-[#071527] py-16 text-white">
        <Container className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase text-[#8fd4d7]">Next conversation</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Bring executive technology clarity to your next move.</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/72">
              Use the booking form to request an advisory session, speaking engagement, workshop, or executive coaching conversation.
            </p>
          </div>
          <ButtonLink href="/booking" icon={CalendarCheck}>
            Book a Consultation
          </ButtonLink>
        </Container>
      </section>
    </>
  );
}
