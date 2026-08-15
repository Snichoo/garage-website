# Sparrow Garage Doors — Developer Handoff

Marketing website for a Brisbane garage door business, plus a built-in admin
CMS the owner uses to edit all site text and images.

## Stack

- **Next.js 14** (App Router) + **React 18** + **TypeScript**
- **Tailwind CSS** for styling
- **Resend** for contact/quote form emails
- **Vercel Blob** for admin-editable content + image uploads
- Hosted on **Vercel**

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm run lint
```

Create `.env.local` from `.env.example` and fill in the values (see below).
Without `BLOB_READ_WRITE_TOKEN` the CMS falls back to local files
(`content/site-content.json`, `public/uploads/`), which is fine for dev.

## Environment variables

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Sends form submissions (resend.com) |
| `CONTACT_TO_EMAIL` | Where form submissions are emailed |
| `NEXT_PUBLIC_SITE_URL` | Canonical domain, no trailing slash (SEO/sitemap/OG) |
| `ADMIN_USERNAME` / `ADMIN_PASSWORD` | Admin login at `/admin` |
| `ADMIN_SESSION_SECRET` | Random string signing the admin session cookie |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob storage (auto-added when a Blob store is connected) |

On Vercel these live in Settings → Environment Variables. `BLOB_READ_WRITE_TOKEN`
is added automatically when you create/connect a Blob store under the Storage tab.

## Admin CMS (`/admin`)

The owner logs in to edit nearly all site text, the phone number/email/business
details (updates sitewide, including SEO metadata and structured data), and to
upload/swap images.

- Content model + defaults: `src/content/defaults.ts`
- Editor UI: `src/app/admin/page.tsx` (auto-renders any field added to defaults)
- Storage/merge logic: `src/lib/content.ts` (Blob in prod, files in dev)
- Auth: `src/lib/adminAuth.ts` + `src/middleware.ts`
- Business config resolver: `src/lib/site.ts` (`getSiteConfig()`, async)

To make new copy editable: add the field in `defaults.ts`, then read it via
`await getContent()` in server components or `useSiteContent()` in client
components. It appears in the editor automatically.

## Site structure

Navigation is built around four service categories, each with a hub page and
child pages underneath it. The hub pages are what the header dropdowns point at.

| Category | Hub | Child pages |
|---|---|---|
| Repairs | `/repairs` | `/emergency-repairs`, `/garage-door-repairs`, `/gate-repairs`, `/springs`, `/cables`, `/garage-door-off-track`, `/garage-door-servicing`, `/garage-door-safety-inspection` |
| Garage Doors | `/garage-doors` | `/sectional-garage-doors`, `/roller-doors`, `/tilt-doors` |
| Gates | `/gates` | `/sliding-gates`, `/swing-gates`, `/gate-automation` |
| Automation | `/automation` | `/openers`, `/garage-door-motor-replacement`, `/gate-automation`, `/gate-motor-replacement`, `/smart-systems` |
| Contact | `/contact` | `/request-a-quote`, `/book-a-service` |

Off the main nav but still linked from the homepage and footer: `/about`,
`/gallery`, `/blog`, `/locations`, `/suburbs/*`, `/privacy-policy`, `/terms`.

Shared page shells (use these rather than hand-rolling a new page):

- `components/ServiceHubPage.tsx` - category hubs (hero, optional feature band,
  card grid of child services, FAQ).
- `components/PartServicePage.tsx` - single-service detail pages.
- `components/EnquiryPage.tsx` - focused form pages (quote, booking).
- `components/LegalPage.tsx` - privacy/terms style prose pages.

`/automated-gates` and `/smart-kits` were renamed to `/gate-automation` and
`/smart-systems`. Permanent redirects live in `next.config.js` - keep them.

## Architecture notes

- `getContent()` / `getSiteConfig()` are **async**; most page/section components
  are async server components that await them.
- Do **not** import `lib/site.ts` or `lib/content.ts` in client components
  (they touch the filesystem/Blob). Client components read content through
  `ContentProvider` (`useSiteContent()`).
- Uploaded images are served by `src/app/uploads/[...path]/route.ts` and via
  Blob URLs (allowed in `next.config.js`).
- Page metadata uses `generateMetadata()` so business changes flow into titles.

## Key locations

- Pages: `src/app/**/page.tsx` (service pages, suburbs, blog, contact, gallery)
- Reusable sections: `src/components/`
- Static data (suburbs, blog posts): `src/data/`
- SEO: `sitemap.ts`, `robots.ts`, `og/route.tsx`, JSON-LD in `lib/site.ts`
- Images/fonts/etc: `public/`

## Google Ads / analytics (not yet added)

No tracking is installed. Add Google Tag / GA4 / Ads conversion tags in the root
layout `src/app/layout.tsx` using `next/script` (or Google Tag Manager). Form
submissions are handled at `src/app/api/send/route.ts` and the client forms
(`ContactForm.tsx`, `HeroQuoteForm.tsx`, `QuoteModal.tsx`) — good hook points
for conversion events.

## Watch out for

- **Saved CMS content overrides arrays wholesale.** `deepMerge()` in
  `lib/content.ts` replaces arrays rather than merging them. If the owner has
  previously saved the site content from `/admin`, their stored `header.nav`,
  `services.cards`, `howCanWeHelp.items` and `footer.*` link lists win over the
  defaults in code. After a structural change like the nav restructure, open
  `/admin`, confirm the menu/services/footer sections show the new items, and
  save once so the stored copy matches.
- `/admin` is disallowed in `robots.ts` — keep it that way.
- `content/site-content.json` and `public/uploads/` are gitignored (local-only;
  prod state lives in Blob).
- Change `ADMIN_PASSWORD` for production; don't reuse any dev value.
