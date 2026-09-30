# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Moriah Studio: an Astro 7 site (from the minimal starter) styled with Tailwind CSS v4 and using `lucide-astro` for icons. Requires Node >= 22.12.0. It is a single-page Spanish-language landing for the agency. There are no content collections, framework integrations, tests, or linter.

- `src/pages/index.astro` only composes section components from `src/components/` inside `src/layouts/Layout.astro`.
- All copy and data (contact info, WhatsApp number, services, projects, FAQs, nav) lives in `src/data/site.ts`. Edit content there, not in components. Project screenshots live in `src/assets/projects/` and are imported in `site.ts` so `<Image />` optimizes them. `site.url` is empty until a domain exists; `Layout.astro` skips canonical/`og:url` while it is.
- `Layout.astro` owns the `<head>` (SEO/Open Graph meta, Google Fonts for Sora + Inter), imports `global.css`, and runs the scroll-reveal script: add `data-reveal` to an element to fade it in on scroll. Hiding is gated on an `html.js` class so content stays visible without JS.
- The hero's "3D" orb is pure CSS (gradients + keyframes in `global.css`), intentionally not WebGL, to keep the page JS-free.

## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`. Default URL: `localhost:4321`.

Other commands:

- `npm run build`: production build to `dist/`
- `npm run preview`: serve the built site
- `npx astro check`: type-check `.astro`/TS files (tsconfig extends `astro/tsconfigs/strict`). Needs `@astrojs/check` and `typescript`, which are not installed yet; `astro check` will offer to add them.

## Styling

- Tailwind v4 is wired in through the Vite plugin (`@tailwindcss/vite` in `astro.config.mjs`), not the `@astrojs/tailwind` integration. There is no `tailwind.config.js`: theme tokens are defined CSS-first in the `@theme` block of `src/styles/global.css`.
- Design tokens (comments are in Spanish): dark backgrounds `void`/`deep`/`elevated`/`subtle`, `brand-blue-*` and `brand-purple-*` scales, neutrals `silver`/`gray-soft`/`gray-mute`, fonts `font-display` (Sora) and `font-body` (Inter), and `shadow-glow-blue|purple|mix`. Use these as Tailwind utilities (e.g. `bg-deep`, `text-brand-purple-400`, `shadow-glow-mix`) rather than hard-coded values. Custom classes `.bg-brand-gradient` and `.text-brand-gradient` are also defined there.
- Use Tailwind v4 class names (e.g. `bg-linear-to-br`, not `bg-gradient-to-br`). Animations respect `prefers-reduced-motion`; keep that when adding new ones.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
