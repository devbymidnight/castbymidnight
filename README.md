# Midnight — esports commentator & host

Local-first Next.js portfolio for Alexandros “Midnight” Georgiou. Static export, self-hosted fonts and media, no database or API. Original `photos/`, `videos/`, and `logos/` are preserved.

## Run

Requires Node.js 20.9+ and npm.

```powershell
npm ci
npm run dev
```

Local URL: http://127.0.0.1:3000

To review the exact static output (stop any development server on port 3000 first):

```powershell
npm run build
npm run typecheck
npm run check:export
npm run preview
```

## Editing

- `content/portfolio.ts`: contact, socials, career groups, optional years and additional credits.
- `content/clips.ts`: commentary and hosting/interview clips, with English and Greek titles, categories, descriptions and context.
- `app/(en)/page.tsx`: English biography, game specialisms, community copy and page structure.
- `app/(el)/el/page.tsx` and `content/greek.ts`: Greek portfolio and career descriptions.
- `content/seo.ts`: shared canonical hostname, titles, social previews and structured data.
- `app/globals.css`: responsive design; change `--purple` for the brand colour.
- `public/media/`: web assets only. Keep originals in their supplied folders.
- `components/Showreel.tsx`: shared click-to-play video and clip selection; playing either collection pauses the other player.
- `components/HostingSection.tsx`: hosting/interview section at `#hosting`, in both languages.
- `components/LanguagePreference.tsx` and `lib/locale.ts`: language links, saved preference and deletion control.
- `components/BrandLogo.tsx`, `GamePool.tsx`, `SelectedCredits.tsx`: shared logos and game/credit presentation in both languages. See `docs/LOGO-SOURCES.md` for provenance and missing brands.
- `review/media-manifest.json`: original-photo to web-photo mapping.

Add a clip with a unique ID, event, display duration, `src`, `poster`, and English/Greek copy (title, category, context, description). Current samples have Greek audio. Add a verified `year` to a career credit when known. The current roadmap is grouped by broadcast scope, not a dated chronology. Add verified WebVTT caption tracks to the player when available.

Media regeneration is optional. Create a local Python environment and install Pillow, pillow-heif and imageio-ffmpeg, then run `scripts/prepare-media.py` and `scripts/encode-clips.py`. Encoding preserves the full GLAL clip. The Trinity excerpt starts 11.5 seconds into the source, once gameplay replaces the on-camera opening, and ends at the original one-minute mark. The six-minute original remains untouched.

The four user-selected hosting files in `review/commentary/clips/` are processed by `scripts/prepare-hosting-clips.py`. It preserves their complete durations and original audio, encodes H.264/AAC MP4s at up to 720p with fast-start metadata, generates WebP posters and decodes each output to check for corruption. Originals stay unchanged; output mapping and timings are in `review/hosting/manifest.json`. Do not replace them with older candidate cuts in the parent folder. All four are displayed under Hosting & interviews; the goal reaction is labelled shared commentary.

## Cloudflare Pages

The requested hostname is `https://castbymidnight.pages.dev`. Build with `npm run build` and deploy only `out` to the Cloudflare Pages project `castbymidnight`. No Worker runtime, D1, environment secrets or custom domain are required. Keep prior Pages deployments available for rollback.

Cloudflare Pages serves the local images, logos, fonts and clips from its global CDN. `public/_headers` adds long browser caching for fingerprinted Next.js assets and one-day caching for replaceable media and logos. Videos use `preload="none"`, so the clips do not download until a visitor chooses to play one. Keep each asset under the Pages 25 MiB limit.

References: [Next.js static exports](https://nextjs.org/docs/app/guides/static-exports), [Cloudflare Pages static Next.js](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/).

Local review notes and source originals stay outside the published repository.

## Search visibility

English remains the primary homepage; `/el/` is the Greek portfolio. Each has its own HTML language, canonical URL, localised metadata and reciprocal hreflang links. Both are statically rendered, including career details and profile/service JSON-LD. Sitemap and robots are exported to `/sitemap.xml` and `/robots.txt`.

New visitors start in English. There is no browser-language or location detection. Clicking a language link saves `midnight_language=en|el` for one year (`Path=/`, `SameSite=Lax`, `Secure` on HTTPS) and opens the top of that language's page. A saved Greek choice restores Greek on future visits to `/`; an explicit `/el/` link remains Greek. Cookie access failures do not block ordinary links; without JavaScript both static pages and language links remain usable. Run `npm run check:language` for preference edge cases (Node 22.18+ or Node 24 required for native TypeScript support).

Run `npm run check:seo` after a build. `content/seo.ts` uses the requested `https://castbymidnight.pages.dev` hostname. If the final hostname changes, update that setting and the SEO check fixture together.

After approved deployment: verify both URLs, redirect behaviour, canonical URLs and any Cloudflare `X-Robots-Tag` headers; keep preview deployments noindex; validate the public pages in Google's Rich Results Test, verify ownership in Search Console and submit the sitemap. These external steps have NOT been performed. No indexing or ranking is promised.

For continuing visibility, request accurate profile links from the organisers/productions already worked with, keep broadcast credits current, and add English/hosting samples with captions when available. Do not add fabricated reviews, addresses, event dates, LocalBusiness locations or keyword-only city pages.
