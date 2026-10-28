# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Kora website — Next.js (App Router) + React 19 + Tailwind CSS 4 + framer-motion, bun.

## Styling

Theme-driven Tailwind. All design tokens (colours, fonts, type scale, radius, layout, motion) live in the `@theme` block of `src/app/globals.css`. Use `src/components/ui` primitives (Button, Container, Section, Eyebrow, Heading, Text) and token utilities; no raw hex, no antd/styled-components/CSS modules, inline `style` only for dynamic values. Full rules and the folder layout (`app/` routes, `features/<page>/` page sections, `components/` shared): `docs/STYLING.md`.

## SEO

Per-page metadata goes through `pageMetadata()` in `src/lib/seo.ts`; new routes must also be added to `PAGES` there (sitemap). Wiring, Search Console steps and the backlink plan: `docs/SEO.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
