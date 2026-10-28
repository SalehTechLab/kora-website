# SEO

Last reviewed: 2026-10-28. Canonical origin: `https://koratraders.com` (apex, https). `www` and `http` already 301 to it at the host (Netlify).

## How it is wired

| Concern | Where |
| --- | --- |
| Site URL, default description, page list, JSON-LD builders | `src/lib/seo.ts` |
| Title template (`%s \| Kora Traders`), `metadataBase`, robots directive, Search Console tag | `src/app/layout.tsx` |
| Per-page title, description, canonical, Open Graph, Twitter | `pageMetadata()` called from each `src/app/*/page.tsx` |
| `sitemap.xml`, `robots.txt` | `src/app/sitemap.ts`, `src/app/robots.ts` (generated from `PAGES` in `seo.ts`) |
| Share image (1200x630) | `src/app/opengraph-image.tsx`, reused by `twitter-image.tsx` |
| Structured data | `src/components/seo/JsonLd.tsx`: Organization + WebSite (home), WebPage-type + BreadcrumbList (every inner page), FAQPage (services) |
| Contextual internal links | `src/components/layout/RelatedLinks.tsx` |

### Adding a page

1. Create the route, export `metadata = pageMetadata({ title, description, path })` (title without the brand; keep it under about 50 characters, description 120-160).
2. Add the path to `PAGES` in `src/lib/seo.ts` so it lands in the sitemap.
3. Render `<JsonLd data={[webPageJsonLd(...), breadcrumbJsonLd(...)]} />`.
4. One `<h1>` per page, then `h2`, `h3` without skipping levels.
5. Decorative images get `alt=""`; images that carry meaning get a short, specific description.

## Search Console (needs the owner's Google account)

I could not do this part: verification requires logging in as the site owner.

1. Open <https://search.google.com/search-console> and add a property.
   - **Domain property (recommended):** `koratraders.com`. Add the DNS TXT record Google shows at the domain registrar. This covers `www`, `http` and `shop.koratraders.com`.
   - **URL-prefix property** `https://koratraders.com/` using the HTML tag method: copy only the `content` value, set it as `GOOGLE_SITE_VERIFICATION` in the Netlify site's environment variables, redeploy, then click Verify. The layout already renders the tag when the variable is set.
2. Sitemaps, then submit `sitemap.xml`.
3. URL Inspection: inspect and "Request indexing" for `/`, `/services`, `/products`, `/logistics`, `/about-us`, `/contact-us`.
4. Pages report after a week: anything under "Excluded" or "Discovered, currently not indexed" needs a look. A brand-new domain with no inbound links commonly sits there for days to weeks.
5. Optional: import the property into Bing Webmaster Tools (one click from Search Console).

Before this change `robots.txt` and `sitemap.xml` returned 404 on the live site, so Google had no map of the pages and no links pointing in. Nothing was blocking indexing (no `noindex`, no `X-Robots-Tag`).

## Backlink strategy

Google ranks a new B2B site largely on who links to it. Everything below is earned or claimed, nothing is bought. Buying links, link networks and mass directory submissions get sites penalised, so skip them.

### Phase 1: claim what is already yours (weeks 1-2)

- **LinkedIn company page.** The footer currently links to `linkedin.com/in/kora_traders`, a personal-profile path. Create a Company page (`/company/...`), link it from the footer and from the Organization schema `sameAs` in `src/lib/seo.ts`.
- **Google Business Profile** for the Munich office (Google verifies by postcard or video). Add the website, categories and photos.
- **Shop to site links.** `shop.koratraders.com` is a separate property: link it back to the main site from its header/footer and its product pages ("Sourced by Kora Traders").
- **B2B directories with a free company profile:** Europages, Kompass, Crunchbase. Use identical name, address and phone everywhere (copy from `src/lib/company.ts`).
- Complete the existing Facebook and Instagram profiles with the site link.

### Phase 2: associations and registers (weeks 2-6)

- **IHK in Munich:** make sure the company has a member-directory entry that links to the website.
- **Pakistan side:** exporter and trade-body directories such as TDAP and the chambers of commerce in Lahore, where the regional office sits. Ask what each lists and whether profiles can include a website.
- **Bilateral Germany-Pakistan business associations:** membership usually comes with a directory listing and event pages.
- **Suppliers, customers, logistics partners:** ask each for a "partners" or "where we ship from" mention with a link. The About page already has a Partnerships section to reciprocate with.

### Phase 3: content that people cite (month 2 onward)

Links follow useful pages, and the site currently has none that answer a buyer's research questions. Suggested first pieces (needs an `/insights` section, not built yet):

- A buyer's guide to Himalayan salt grades and what to ask a supplier.
- Importing surgical instruments into the EU: what documents and conformity evidence a buyer should expect.
- BOPP film specs explained (gauge, width, finish) for packaging buyers.
- Incoterms and who carries risk at each step of a Pakistan-to-EU shipment.

Each should be written by someone who does this work, name the author, and link to the matching product and service pages.

### Phase 4: outreach (month 3 onward)

- Pitch the guides to trade publications and newsletters for importers in Germany and exporters in Pakistan.
- Offer a quote or short expert comment to journalists writing on the trade corridor.
- Look for "resources" and "suppliers" pages on industry association sites where a relevant guide fits.

### Rules for every link

- Relevant, human-read sites only. If you would not want the link without Google, it is a good one.
- Vary anchor text; mostly the brand name or the plain URL.
- Do not trade links in bulk.

### Tracking

Keep a sheet with: site, link URL, date, how it was earned, status. Check Search Console, Links report, monthly; the "Top linking sites" list is the ground truth. Judge progress by referring domains that are relevant, not by raw link counts.

## Known open items

- Catalogue PDFs do not exist. The Products "View catalogue" button is now "Request catalogue" (contact form with the product prefilled). If PDFs are produced, put them in `public/catalogues/<id>.pdf` and point the button at them.
- The home page freight cards link to `/logistics`. If dedicated `/services/<mode>-freight` pages are wanted, they need building (and adding to `PAGES`).
- Unreferenced heavy files remain in `public/images` and can be deleted: `hero/hero-logistics-hub-network-1.png` (2.2 MB), `hero/hero-logistics-hub-network-3.png` (1.2 MB), `services/*-freight-hd.png` (about 1.5-1.9 MB each), `services/*-freight-2.png`, `logo/kora_logo.png` (309 KB). They are not served to visitors but bloat the repo.
- `sitemap.xml` omits `lastmod` deliberately. Add real per-page dates if content starts changing regularly.
- The Preloader holds every first load for at least 1 second. Content is in the HTML so Google is unaffected, but it adds a second before visitors see the page; shorten `MIN_DURATION_MS` in `src/components/layout/Preloader.tsx` if that matters.
- `netlify.toml` and `vercel.json` both exist; the live site is served by Netlify.
