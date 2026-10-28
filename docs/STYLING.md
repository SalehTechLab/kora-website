# Styling guide (Tailwind CSS 4)

All visual decisions live in **one place**: the `@theme` block in `src/app/globals.css`.
Components consume tokens through Tailwind utilities. No antd, no styled-components, no CSS modules, no raw hex.

## Tokens (`@theme`)
| Kind | Utilities | Notes |
|---|---|---|
| Colour | `bg-/text-/border-/fill-/stroke-` + `navy` `ink` `crimson` `steel` `snow` `white` `steel-text` `mist` | Tailwind's default palette is **removed** (`--color-*: initial`). Alpha via modifier: `bg-navy/80`, `text-snow/80`, `border-white/15`. |
| Fonts | `font-sans` (Inter), `font-serif` (Source Serif 4) | |
| Type scale | `text-display`, `text-headline`, `text-title`, `text-ticker`, `text-eyebrow` + default Tailwind sizes | fluid `clamp()` sizes come with line-height/tracking |
| Radius | `rounded-sm/md/lg/xl/pill` | |
| Layout | `max-w-page` (1240), `max-w-wide` (1280), `h-nav` / `top-nav` (72px navbar) | use `<Container>` for page gutters |
| Shadow | `shadow-card`, `shadow-lift` | |
| Motion | `ease-expo`, `animate-marquee`, `animate-marquee-slow`, `animate-float`, `animate-fade-up` | |

To add/change a design value, edit `@theme` — never inline it in a component.

## Primitives (`src/components/ui`)
`Container`, `Section` (tone: snow/white/mist/navy/ink/crimson, space), `Eyebrow`, `Heading` (`as` = semantic tag, `size` = display/headline/title/sm), `Text`, `Button` (variant primary/outline/ghost/light/outline-light, size sm/md/lg, `href` → link). Import from `@/components/ui`.
If a pattern repeats in 3+ places, add a primitive here (or a `@layer components` class in globals.css when it needs pseudo-elements/multi-rule CSS). Do not copy-paste long class strings.

## Helpers
- `cn()` from `@/lib/cn` merges class names (clsx + tailwind-merge). Use it for conditional classes.
- `useReveal()` and `ease` from `@/lib/motion` (framer-motion helpers).
- `colors` from `@/theme/colors` = `var(--color-*)` strings, ONLY for places a class can't reach (framer-motion animated colour, SVG attribute that has no class). Prefer `fill-crimson`, `stroke-navy`, `text-*` + `currentColor` in SVGs.
- Icons: `lucide-react` (replaces @ant-design/icons). Brand icons (LinkedIn/Facebook/Instagram/WhatsApp) are not in lucide v1: use small inline SVG components in `src/components/icons/`.

## Rules
1. Utilities first. Responsive via `md:` / `lg:` prefixes, hover/focus via variants, `group`/`peer` for parent-driven state.
2. No `style={{}}` except for genuinely dynamic values (framer-motion `style`, computed positions/sizes, per-item CSS variables like `style={{ "--delay": ... }}` consumed by a class). Static styles become classes.
3. No arbitrary values (`w-[137px]`, `text-[#fff]`) when a token/scale step exists. Arbitrary values are fine for one-off illustration geometry. Never arbitrary colours — use the palette tokens.
4. Keyframes/animations live in `@theme` (globals.css), not in components.
5. Palette exceptions (intentionally off-palette): country flags (`icons/FlagIcons.tsx`), WhatsApp green, multi-colour scene illustrations in `logistics/ServiceScenes.tsx`. Leave those SVG attribute hexes as they are.
6. Dark bands: wrap in `<Section tone="navy|ink|crimson">` (adds `.on-dark` so focus rings flip to white), and use `text-snow/80` for body copy.
7. Keep a11y behaviour: `steel-text` (not `steel`) for steel-coloured TEXT on light backgrounds; preserve aria attributes, reduced-motion handling and focus styles.

## Project structure
```
src/
  app/            routes only: page.tsx = metadata + an ordered list of sections. Navbar, <main>, Footer live once in app/layout.tsx.
  features/<page>/ everything that belongs to ONE page: its sections, illustrations, data (e.g. servicesData.ts). Never imported by another feature.
  components/
    ui/           design-system primitives (Button, Container, Section, Eyebrow, Heading, Text)
    layout/       site chrome (Navbar, Footer, PageHero, Preloader, WhatsAppFloat)
    icons/ consent/   shared across pages
  lib/            cn(), motion helpers, company.ts (legal entity facts, single source of truth)
  theme/colors.ts css-var colour strings for the rare non-class case
```
Rule of thumb: used by two or more pages → `components/`; used by one → `features/<page>/`. Page copy/data that is long or reused (FAQ lists, product catalogue, commodities) lives in a `*Data.ts(x)` file next to its section rather than inline in JSX.

## Type & spacing tokens
Display: `text-hero`, `text-hero-sm`, `text-display`, `text-headline`, `text-title`. Reading: `text-lead`, `text-lead-sm`, `text-body-lg`, `text-ui`, `text-caption`, `text-micro`. Tracking: `tracking-eyebrow|caps|heading|display`. Leading: `leading-body`.
Breakpoints: `xs 480 · sm 576 · md 768 · lg 992 · xl 1120`. `lg` is where layouts become two-column and the nav expands. Don't write `min-[###px]`.
When you add a token that tailwind-merge can't infer (custom `text-*`, `tracking-*`, `leading-*`, `shadow-*`, `rounded-*`), register it in `src/lib/cn.ts`.
