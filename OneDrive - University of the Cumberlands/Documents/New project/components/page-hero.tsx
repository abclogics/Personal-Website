import type { ReactNode } from "react";
import { ProfilePortrait } from "@/components/profile-portrait";
import { Container } from "@/components/container";

export function PageHero({
  eyebrow,
  title,
  description,
  children
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="executive-gradient py-20 text-white">
      <Container className="grid gap-12 lg:grid-cols-[1fr_320px] lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase text-[#8fd4d7]">{eyebrow}</p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-normal sm:text-6xl">{title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/76">{description}</p>
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
        <ProfilePortrait />
      </Container>
    </section>
  );
}
