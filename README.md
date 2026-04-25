# Dr. Oluseye Fadiran Personal Brand and Consulting Website

Modern Next.js website for Dr. Oluseye Fadiran, Techfluence Signals, and CompTech Consulting LLC.

## Stack

- Next.js App Router with TypeScript
- Tailwind CSS
- MDX-ready article structure under `content/insights`
- Zod validation for contact and booking APIs
- Resend-ready email provider integration
- ICS calendar invite generation with a pluggable calendar provider layer

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env.local
```

3. Run the development server:

```bash
pnpm dev
```

4. Build for production:

```bash
pnpm build
```

## Environment Variables

- `NEXT_PUBLIC_SITE_URL`: production site URL, for example `https://comptconsulting.com`
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY`: Cloudflare Turnstile public site key
- `TURNSTILE_SECRET_KEY`: Cloudflare Turnstile secret key
- `REQUIRE_TURNSTILE`: set to `true` in production
- `RESEND_API_KEY`: Resend API key for email sending
- `EMAIL_FROM`: verified sender, for example `CompTech Consulting <noreply@comptconsulting.com>`
- `CONTACT_TO_EMAIL`: default `oluseye.fadiran@gmail.com`
- `BOOKING_TO_EMAIL`: default `oluseye.fadiran@gmail.com`
- `BOOKING_FORWARD_EMAIL`: default `seyetest@gmail.com`
- `CALENDAR_PROVIDER`: default `ics`; future values can include `google`, `cal`, or `calendly`
- `ADMIN_ROUTE_TOKEN`: optional token for protected admin/content routes

## Email Provider

The API routes use `lib/email/send.ts`. When `RESEND_API_KEY` is configured, contact and booking workflows send email through Resend. Without a key, the app logs non-sensitive delivery metadata and skips outbound email so local development can continue.

To connect another provider, keep the same `sendEmail` function signature and replace the Resend implementation with SendGrid, Mailgun, AWS SES, or your preferred secure provider.

## Booking and Calendar

The booking form sends:

- A confirmation email to the visitor
- An appointment notification to `oluseye.fadiran@gmail.com`
- A copied/forwarded notification and calendar invite to `seyetest@gmail.com`
- A generated `.ics` invite attached to the email workflow

The provider abstraction lives in `lib/calendar/provider.ts`. The current implementation generates ICS invites. Add Google Calendar, Calendly, or Cal.com by implementing provider-specific creation inside that file while preserving the returned shape.

## YouTube Feed

Featured videos are defined in `lib/data.ts`. Replace the placeholder `videoId` values with Techfluence Signals upload IDs. For a live feed, add a server-side YouTube Data API integration and keep API keys in environment variables only.

## Blog and MDX Content

Website-native articles live in `content/insights/*.mdx` with frontmatter:

```mdx
---
title: "Article title"
description: "Short SEO description"
category: "AI Strategy"
date: "2026-01-15"
---
```

The current renderer supports clean article pages and can be upgraded to full MDX components or a CMS without changing URLs.

## Security Notes

Implemented controls include:

- Server-side Zod validation
- CSRF token and same-origin verification
- Honeypot fields
- Input sanitization and output escaping in email templates
- Rate limiting and repeated submission detection
- Cloudflare Turnstile support
- Secure headers in `next.config.ts`
- Environment variables for secrets
- No public API keys
- Protected admin/content route middleware
- Privacy-conscious logging that avoids storing message content

Keep dependencies updated and run dependency scanning in CI, for example `pnpm audit` plus your hosting provider's vulnerability scanning.

## Deploying to Vercel

1. Import the repository into Vercel.
2. Add the environment variables from `.env.example`.
3. Configure a verified email sender domain in Resend or your chosen provider.
4. Add Turnstile keys and set `REQUIRE_TURNSTILE=true`.
5. Set `NEXT_PUBLIC_SITE_URL=https://comptconsulting.com`.
6. Deploy.

The app assumes HTTPS in production and sends HSTS headers.
