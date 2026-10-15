# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Moriah Studio: an Astro 7 site (from the minimal starter) styled with Tailwind CSS v4 and using `lucide-astro` for icons. Requires Node >= 22.12.0. It is a single-page Spanish-language landing for the agency. There are no content collections, framework integrations, tests, or linter.

- `src/pages/index.astro` only composes section components from `src/components/` inside `src/layouts/Layout.astro`.
- All copy and data (contact info, WhatsApp number, services, projects, FAQs, nav) lives in `src/data/site.ts`. Edit content there, not in components. Project screenshots live in `src/assets/projects/` and are imported in `site.ts` so `<Image />` optimizes them. Optional content (`about.bio`, `testimonials`, `startingPrices`) renders only when filled in. Never add invented testimonials or placeholders. `Testimonials.astro` is its own section after Projects: static centered cards for 1–2 entries, a swipeable scroll-snap row with arrows (no autoplay) from 3; a testimonial's `project` links to that card via `projectAnchor()`.
- The public URL is `site` in `astro.config.mjs` (currently the Netlify URL). It drives canonical/`og:url` via `Astro.site` and the `@astrojs/sitemap` output; `public/robots.txt` hardcodes the same URL, so update both when the domain changes.
- Projects: the home page shows `'Proyecto real'` ("Para clientes") and `'Proyecto personal'` cards plus a CTA to `/demos`; `type: 'Demo'` entries only appear on `/demos` (`src/pages/demos/index.astro`), grouped by `demoGroup` (order in `demoGroups`). Both use `ProjectCard.astro`. The birthday-invitation card is a real event for a minor: by the owner's decision it uses a cropped screenshot without the child's photo and links to WhatsApp (`linkLabel`), never to the live invitation site.
- `AutomationDemo.astro` is a scripted, fake WhatsApp chat (clinic "Nácar") that sends nothing; `Process.astro` animates the 4 steps as a flow once on scroll-in (`.is-playing`), horizontal from `lg`, vertical below.
- Individual demos live in `src/pages/demos/` with fictional businesses/people and a shared `components/demo/DemoBanner.astro`. `menu` (taquería) and `catalogo` (repostería) share `components/demo/OrderCart.astro` + `scripts/demo-order.ts`: products are marked up with `data-product data-id data-name data-price` plus `[data-add]`/`[data-stepper]`, themed via `--d-*` variables, and the order only previews the WhatsApp message. `/demos/boda` and `/demos/xv` are invitation demos. They share `src/components/invitation/*` (themed via `--inv-*` CSS variables set on each page's `<main>`, so themed components must render inside it) and `src/scripts/invitation.ts` (countdown, Web Audio music box, RSVP that only previews the WhatsApp message). Their photos (`src/assets/demos/`) are CC0 stock from Openverse (StockSnap/rawpixel), deliberately without recognizable faces since the people are fictional; sources are listed in `src/assets/demos/CREDITOS.txt`. Unsplash blocks automated access, so don't scrape it. Individual demos pass `noindex` to `Layout` and are filtered out of the sitemap in `astro.config.mjs` (regex `/demos/.+`); the `/demos` hub itself is indexed. Food photos for menu/catálogo are also CC0 (same credits file). `Layout` has a `head` slot for per-page fonts.
- `astro.config.mjs` overrides `assetFileNames` because lucide-astro ships a `.Layout.astro` component, which otherwise makes the shared CSS bundle a hidden dotfile (`_astro/.Layout.*.css`) that hosts may not deploy. After builds, `find dist -name '.*'` should return nothing.
- `public/og-image.jpg` (1200×630 share image) bakes in the hero headline and the Netlify URL; regenerate it if either changes. Favicons (`favicon.svg` source → `favicon.ico`, `apple-touch-icon.png`) were rendered from the SVG with `sharp`.
- Pages: `/` (landing) and `/aviso-de-privacidad` (privacy notice, data from `legal` in `site.ts`). Nav links use `/#section` so they work from either page. Netlify deploys automatically on every push to `main` (build `npm run build`, publish `dist`).
- `Layout.astro` owns the `<head>` (SEO/Open Graph meta, Google Fonts for Sora + Inter), imports `global.css`, and runs the scroll-reveal script: add `data-reveal` to an element to fade it in on scroll. Hiding is gated on an `html.js` class so content stays visible without JS.
- The hero scene (`Hero.astro`, scoped `<style>`) is intentionally CSS-only, not WebGL: orb, rings, orbiting moons, and the "mensaje → respuesta automática → cita agendada" chips; the only JS is a mouse parallax (`--mx`/`--my`, layers scaled by `--depth`). Depth is faked with layers: each ring renders twice (full back half under the orb, `clip-path` front half above it) and each moon has front/back copies whose opacity flips at the ellipse ends. Don't switch it to `preserve-3d`: intersecting 3D planes caused rendering artifacts.
- Scoped class names must not collide with Tailwind utilities (e.g. `.ring` adds Tailwind's 1px ring box-shadow; that's why it's `.orbit-ring`).

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
