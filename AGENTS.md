# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Moriah Studio: an Astro 7 site (from the minimal starter) styled with Tailwind CSS v4 and using `lucide-astro` for icons. Requires Node >= 22.12.0. There is currently a single route (`src/pages/index.astro`, still the starter placeholder) and no content collections, framework integrations, tests, or linter.

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
- `global.css` is **not imported anywhere yet**. A page or layout must `import '../styles/global.css'` in its frontmatter for the tokens and base styles to apply.
- The Sora and Inter fonts are referenced but not loaded; they still need to be added (e.g. via Google Fonts or Astro's font support).

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)
