import Link from "next/link";
import { CalendarCheck, Linkedin } from "lucide-react";
import { ButtonLink } from "@/components/button-link";
import { Container } from "@/components/container";
import { navItems, siteConfig } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#071527]/95 text-white backdrop-blur">
      <Container className="flex min-h-16 items-center justify-between gap-5">
        <Link className="focus-ring flex min-w-0 flex-col rounded-sm" href="/">
          <span className="text-sm font-semibold">{siteConfig.name}</span>
          {/* <span className="text-xs text-white/65">{siteConfig.brand}</span> */}
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} className="focus-ring rounded-sm text-sm text-white/78 transition hover:text-white" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 sm:flex">
          <a
            className="focus-ring inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white/78 transition hover:bg-white/10 hover:text-white"
            href={siteConfig.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Dr. Oluseye Fadiran on LinkedIn in a new tab"
          >
            <Linkedin aria-hidden className="h-4 w-4" />
          </a>
          <ButtonLink href="/booking" icon={CalendarCheck}>
            Book
          </ButtonLink>
        </div>
      </Container>
      <Container className="lg:hidden">
        <nav aria-label="Mobile navigation" className="flex gap-4 overflow-x-auto border-t border-white/10 py-3">
          {navItems.map((item) => (
            <Link key={item.href} className="focus-ring flex-none rounded-sm text-sm text-white/78" href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
