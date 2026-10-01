// Verification branch: build-only validation.
# Manash — Case Study Vault

A standalone Cloudflare Pages website for strategy decks, case studies, models and research.

## Cloudflare Pages deployment

Create a new **Pages** project in Cloudflare and connect this GitHub repository.

Use these settings:

- **Production branch:** `main`
- **Root directory:** `case-study-vault`
- **Framework preset:** Vite
- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Node version:** 22 or newer if Cloudflare asks for one

The site is intentionally independent of the main portfolio even though it lives in the same GitHub repository.

## Add a PDF or PowerPoint

1. Upload the file into `public/library/`.
2. Open `src/library.ts`.
3. Add either or both properties to the matching item:

```ts
pdfUrl: '/library/olam-nigeria-category-growth.pdf',
pptxUrl: '/library/olam-nigeria-category-growth.pptx',
```

The download buttons appear automatically.

## Add a new case study

Duplicate an object in `src/library.ts` and edit:

- slug
- title
- subtitle
- summary
- kind
- year
- categories
- tags
- role
- problem
- insight
- approach
- outcomes
- liveUrl / pdfUrl / pptxUrl
- accent

Search, filters, deep links and the detail view update automatically.

## Direct sharing

Every case study can be shared with a stable hash link:

`https://your-domain.pages.dev/#item=olam-nigeria-category-growth`

This makes the site useful for sending one specific case study to a recruiter or hiring manager without hiding the broader library.

## Cloudflare files

- `public/_redirects` keeps the single-page app working on direct navigation.
- `public/_headers` adds security headers and long-lived caching for generated assets.
- Static files under `public/library` are served directly by Cloudflare's CDN.

## Design principles

The archive is designed to feel like a professional research and strategy library rather than a generic portfolio gallery:

- decision-first summaries
- prominent executive insights
- document-type and category filtering
- source/deck links
- responsive layouts
- static-first architecture
- no database dependency for the core library
