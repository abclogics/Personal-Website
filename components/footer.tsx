import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Container } from "@/components/container";
import { navItems, siteConfig } from "@/lib/site";

export function Footer() {
  return (
    <footer className="bg-[#071527] text-white">
      <Container className="py-12">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-lg font-semibold">{siteConfig.name}</p>
            <p className="mt-3 max-w-md text-sm leading-6 text-white/70">
              Executive technology leadership for growth, security, and scale through {siteConfig.company}.
            </p>
            <a
              className="focus-ring mt-5 inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/10 text-white/75 transition hover:bg-white/10 hover:text-white"
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open Dr. Oluseye Fadiran on LinkedIn in a new tab"
            >
              <Linkedin aria-hidden className="h-4 w-4" />
            </a>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-white/60">Explore</p>
            <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-white/75">
              {navItems.map((item) => (
                <Link key={item.href} className="transition hover:text-white" href={item.href}>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase text-white/60">Security and privacy</p>
            <p className="mt-4 text-sm leading-6 text-white/70">
              Forms use validation, rate limiting, bot checks, honeypots, and privacy-conscious email handling.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-white/75">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms-of-use">Terms</Link>
              <Link href="/security">Security</Link>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-6 text-sm text-white/55">
          © {new Date().getFullYear()} {siteConfig.company}. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}
