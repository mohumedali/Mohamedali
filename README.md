# Mohamed Ali — Portfolio

Arabic-first, bilingual (RTL/LTR) developer portfolio built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion and next-intl.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000 → redirects to /ar or /en
npm run build && npm start
```

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Production URL. Drives canonical URLs, hreflang, sitemap, OG and JSON-LD. **Set this before deploying.** |
| `NEXT_PUBLIC_CONTACT_ENDPOINT` | Optional. The contact form POSTs `{ name, email, service, message }` here (ASP.NET Core API, Supabase Edge Function, Formspree…). Without it, the form's main action sends the message via WhatsApp, with email as the alternative. |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional. Google Search Console HTML-tag verification code. |

Vercel Analytics and Speed Insights are wired in (`app/[locale]/layout.tsx`); enable both in the Vercel project dashboard. They do nothing locally (the 404 for `/_vercel/*` scripts on `localhost` is expected).

## Page structure

Hero → Metrics → Projects → Testimonials → Services → About → Process → Skills → FAQ → Contact, plus a floating WhatsApp button.
The order follows a client's questions: *can you do it?* (work, clients) → *what do you offer?* → *who are you?* → *how does it work?* → details → contact.

## Where things live

```
messages/ar.json, en.json     All copy. Arabic is the default locale; en.json also types the keys.
src/lib/site.ts               Email, WhatsApp number, socials, websites-delivered count, site URL
src/lib/projects.ts           Project URLs + screenshots (copy is in messages)
src/app/[locale]/layout.tsx   <html lang dir>, fonts, SEO metadata, analytics
src/app/[locale]/page.tsx     Page composition + JSON-LD (ProfilePage, Person, WebSite, FAQPage)
src/app/sitemap.ts, robots.ts, [locale]/opengraph-image.tsx
src/proxy.ts                  Locale negotiation (`/` → `/ar` or `/en`)
src/components/               One file per section
src/components/motion/        Scroll reveals (CSS + one IntersectionObserver), spotlight, Framer provider
src/app/globals.css           Design tokens, glass utilities, buttons, reveal + keyframes
```

## Before publishing — content to confirm

- **Testimonials** (`Testimonials.items` in both message files) are drafts written in each client's voice. Send each client their quote and get approval before going live.
- **Project case studies** (`Projects.items.*.caseStudy`) describe the build; adjust anything that doesn't match what was actually shipped.
- **FAQ** answers (the timeline answer deliberately gives no fixed duration) and the **About** commitments (ownership, support, preview links) are promises — edit them to match how you actually work.
- **Project links**: Dr. Mohamed Samy and Top Power use their real domains; Dr. Sameh Kasem and Dr. Mahmoud Hassaan still point to `*.vercel.app` preview domains — swap those in `src/lib/projects.ts` once they're live.

## Adding a project

1. Drop a 1280×800 WebP screenshot in `src/assets/projects/`.
2. Add an entry to `src/lib/projects.ts` (and its id to `ProjectId`).
3. Add `Projects.items.<id>` and `Testimonials.items.<id>` to both message files.

## Performance notes

- Every route is statically generated (`generateStaticParams` + `setRequestLocale`).
- Hero headline/subtitle animate with transform only (CSS), so they're LCP candidates from the first paint.
- Below-the-fold sections use `content-visibility: auto` (`defer-render` utility).
- Scroll reveals are CSS transitions toggled by a single IntersectionObserver; Framer Motion (LazyMotion + `m`) is only used for the hero badges/card, counters and the mobile menu.
- Spotlight hover effects use one delegated pointer listener instead of a client component per card.
- Only the `Nav` and `Contact` message namespaces are sent to the browser.
