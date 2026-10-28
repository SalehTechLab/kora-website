# Compliance notes

Last reviewed: 2026-10-28. This is an engineering record, not legal advice. Have a lawyer (Rechtsanwalt) review the legal pages before relying on them.

## Legal pages

| Page | Route | Source |
| --- | --- | --- |
| Imprint | `/imprint` | `src/components/imprint/ImprintSection.tsx` |
| Privacy Policy | `/privacy-policy` | `src/components/legal/PrivacyContent.tsx` |
| Terms & Conditions | `/terms` | `src/components/legal/TermsContent.tsx` |
| Refund & Cancellation | `/refund-policy` | `src/components/legal/RefundContent.tsx` |
| Cookie Policy | `/cookie-policy` | `src/components/legal/CookieContent.tsx` |
| Licences & Credits | `/licenses` | `src/components/legal/LicensesContent.tsx` |

Company details live in `src/lib/company.ts`. Update `LEGAL_LAST_UPDATED` there whenever a document changes. Re-read the Privacy Policy whenever a third-party service is added.

## Cookie consent (Cookiebot)

1. Create a Domain Group at cookiebot.com for `koratraders.com` and copy its Domain Group ID.
2. Set `NEXT_PUBLIC_COOKIEBOT_ID=<id>` in the hosting environment (and `.env.local` to test). Without it, no banner loads.
3. In the Cookiebot dashboard, scan the site, set the banner language(s) and enable the widget or keep the footer "Cookie settings" link.

The site currently sets **no cookies of its own** and loads no analytics or ads, so the banner only governs the Cookiebot consent cookie. If analytics or marketing tags are added later, load them only through Cookiebot (`data-cookieconsent` attribute or Google Tag Manager with Consent Mode) and update the Privacy and Cookie Policies.

## Third-party SDK / service audit

Runtime dependencies (`package.json`): none of them makes network calls from the visitor's browser.

| Package / service | Purpose | Data leaves the site? |
| --- | --- | --- |
| next, react, react-dom | Framework | No |
| antd, @ant-design/icons, @ant-design/nextjs-registry | UI | No |
| styled-components | Styling | No |
| framer-motion | Animation | No |
| `next/font/google` (Inter, Source Serif 4) | Fonts | **No.** Downloaded at build time and self-hosted, so visitors never contact Google |
| Vercel | Hosting, server logs | Yes: IP and request metadata (processor, US) |
| Resend | Sends the contact-form email (server side) | Yes: form content (processor, US) |
| Cookiebot (Usercentrics) | Consent banner (only when `NEXT_PUBLIC_COOKIEBOT_ID` is set) | Yes: IP, consent record (EU) |
| Calendly, WhatsApp, LinkedIn, Facebook, Instagram, shop.koratraders.com | Plain outbound links | Only after the visitor clicks |

No analytics, tag manager, pixel, chat widget, embedded map or video was found.

Action items:

- Sign a data processing agreement (DPA) with Vercel and Resend and check their EU–US Data Privacy Framework / SCC status. Section 8 of the Privacy Policy assumes this.
- `netlify.toml` is still in the repo, but README and `vercel.json` say Vercel. Remove it if Netlify is not used. If it is used, add Netlify to the Privacy Policy.
- Re-run this audit when adding any dependency.

## Forms

- Contact form: name, business email, topic and message are required. Company, phone and country are optional (data minimisation). Server-side validation and length limits are in `src/app/contact-us/actions.ts`. Nothing is stored in a database; the submission is emailed only.
- The privacy checkbox is an acknowledgement, not a GDPR consent (the legal basis is Art. 6(1)(b)/(f)). It is unticked by default and required.
- The Products "Name it" box only passes a text query to `/contact-us?product=` and sends nothing to a server.

## Accessibility

Automated check with axe-core (WCAG 2.1 A/AA) across all pages, plus a keyboard tab-through of Home, Services and Contact.

- Skip link, `<main id="main-content">` on every page, global `:focus-visible` ring, `prefers-reduced-motion` support.
- Steel-gray text on light backgrounds was 2.6:1; it now uses `colors.steelText` / `--kora-steel-text` (about 5–6:1). Crimson eyebrow labels on navy (2.2:1) are now soft white.
- Scroll-reveal headings (Home manifesto, About story, Logistics intro, Services old/new way) start at 68% opacity instead of 14–18%.
- Auto-advancing process carousel and ticker now also pause on keyboard focus.
- Known leftovers: large decorative numerals (`aria-hidden`) in Services stages and the struck-through "old way" lines mid-animation still measure below 4.5:1. The numerals are decoration; the struck-through lines should be re-checked by eye.
- Images: informative images have alt text; decorative ones use `alt=""`; SVG illustrations are either `role="img"` with a label or `aria-hidden`.

## Fonts and images: licence inventory

Fonts: Inter and Source Serif 4, SIL Open Font License 1.1. Credit and licence text at `/licenses` and `public/licenses/OFL-1.1.txt`.

Images: **the origin of these files cannot be verified from the repo.** Confirm each one and keep proof (purchase receipt, licence page, or the AI tool's terms).

| File(s) | What is known | Needed |
| --- | --- | --- |
| `public/images/commodities/*-photo.jpg` (7) | No metadata | Source, photographer and licence (stock licence or own photos) |
| `public/images/hero/hero-logistics-hub-network-1.png` | File metadata shows it was downloaded from chatgpt.com (AI generated) | Confirm the generator's terms allow commercial use; note that AI output may not be copyrightable |
| `public/images/hero/hero-logistics-hub-network-3.png`, `hero-logistics.webp` | No metadata | Source and licence |
| `public/images/services/*.png` | No metadata | Source and licence |
| `public/images/logo/*`, favicons | Kora brand assets | Confirm Kora owns them (and whoever designed them assigned rights) |
| `public/images/patterns/logistics-doodle.svg` | Unknown | Source and licence |
| Inline SVG illustrations in `src/components/**` | Written in-house | None |

The public `/licenses` page deliberately makes no claim about who owns the photos. Add credits there once the table above is filled in.
