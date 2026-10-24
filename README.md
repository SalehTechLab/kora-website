# Kora-website

Main website for Kora Traders.

## Tech stack

- **Language:** TypeScript
- **Framework:** Next.js 16 (App Router), React 19
- **UI:** Ant Design 6 (`antd`, `@ant-design/icons`, `@ant-design/nextjs-registry`)
- **Styling:** antd tokens first, styled-components for gaps
- **Animation:** Framer Motion
- **Email (SMTP):** [Resend](https://resend.com), used by the contact form server action
- **Tooling:** ESLint, bun
- **Hosting:** Vercel

## Prerequisites

- **Node:** >=20.9
- **Bun:** latest

## Getting started

Install dependencies:

```bash
bun install
```

Create a `.env.local` file with your Resend API key (needed for the contact form):

```bash
RESEND_API_KEY=your_resend_api_key
```

Run the dev server (http://localhost:3000):

```bash
bun dev
```

## Scripts

```bash
bun dev      # start the dev server
bun run build    # production build
bun start    # serve the production build
bun run lint     # lint
```

## Linting

```bash
bun run lint
```

## Build

```bash
bun run build
bun start
```
