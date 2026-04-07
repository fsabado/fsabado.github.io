# Astro 6 Upgrade Plan

**Date**: 2026-04-04 (updated 2026-04-06)
**Status**: Planned
**Motivation**: Fix 11 npm audit vulnerabilities (6 high, 5 moderate) in Astro <=5.18.0, esbuild, vite, and serialize-javascript.

---

## Background

The site is currently on **Astro 4.15.0** with **Tailwind 3** via `@astrojs/tailwind`. The vulnerabilities include XSS, URL bypass, middleware auth bypass, dev server file read, RCE via serialize-javascript, and esbuild dev server request leaks. While most only affect server-mode or dev server — not the static production build — the upgrade is worth doing to stay current and silence Dependabot.

---

## Breaking Changes Affecting This Site

| Area | Current | Breaking? | Change Required |
|---|---|---|---|
| Astro | 4.15.0 | Yes | → 6.x |
| Content Collections API | Legacy v2 | **Yes — fully removed** | Rename config, add loaders, `slug` → `id` |
| `entry.render()` | Used in blog + project pages | **Yes** | → standalone `render()` from `astro:content` |
| Zod import | `from 'astro:content'` | Yes | → `from 'astro/zod'` |
| `@astrojs/tailwind` | 3.x integration | **Yes — deprecated** | → `@tailwindcss/vite` |
| Tailwind | 3.x | **Yes** | → 4.x (CSS syntax changes) |
| `@vite-pwa/astro` | 1.2.0 (peers: astro ^1–5) | **Yes — no Astro 6 support** | See PWA blocker below |
| Node.js (CI) | 24 | Done | Already on 24 |

---

## Blocker: `@vite-pwa/astro` Does Not Support Astro 6

`@vite-pwa/astro@1.2.0` declares `peerDependencies: { astro: "^1.6.0 || ... || ^5.0.0" }` — Astro 6 is not included. Additionally, the `serialize-javascript` vulnerability chains through `@vite-pwa/astro` → `vite-plugin-pwa` → `workbox-build` → `@rollup/plugin-terser` → `serialize-javascript`.

### Options

1. **Wait for `@vite-pwa/astro` to add Astro 6 support** — safest, but timeline unknown.
2. **Install with `--legacy-peer-deps` or `--force`** — may work if the API hasn't changed, but risky.
3. **Replace with `vite-plugin-pwa` directly** — skip the Astro wrapper and configure PWA as a Vite plugin in `astro.config.mjs`. The wrapper is thin; this is likely viable.
4. **Drop PWA** — simplest, but loses offline support.

**Recommended**: Option 3 — use `vite-plugin-pwa` directly. The `@vite-pwa/astro` wrapper mainly auto-configures the Vite plugin; we can do that manually.

```js
// astro.config.mjs — option 3 example
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  site: 'https://fsabado.com',
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: { /* same manifest as current */ },
        workbox: { /* same workbox config as current */ },
      }),
    ],
  },
  // ...
});
```

Note: `virtual:pwa-info` and `virtual:pwa-register` imports in `BaseLayout.astro` and `pwa.ts` may need adjustment — verify these virtual modules still resolve via `vite-plugin-pwa` without the Astro wrapper.

---

## Changes Since Original Plan (2026-04-06)

1. **Blog schema now has `published` field** — `published: z.boolean().default(true)` was added to the blog collection. Include it in the new `src/content.config.ts`.
2. **`search-index.json.ts` was deleted** — no longer needs migration.
3. **Shared nav in `src/data/navigation.ts`** — no impact on upgrade, just note it exists.
4. **Fuse.js is now an npm dependency** — bundled by Vite, no CDN. No upgrade impact.
5. **Vulnerability count updated** — now 6 high + 5 moderate (was 1 high + 6 moderate + 2 low), including serialize-javascript RCE via PWA chain.
6. **PWA blocker identified** — `@vite-pwa/astro` doesn't support Astro 6.

---

## Step-by-Step Implementation

### Step 1 — Create a branch

```bash
git checkout -b astro-6-upgrade
```

### Step 2 — Upgrade packages

```bash
npx @astrojs/upgrade
npm install tailwindcss@latest @tailwindcss/vite
npm uninstall @astrojs/tailwind
```

### Step 3 — Migrate PWA plugin

```bash
npm uninstall @vite-pwa/astro
npm install vite-plugin-pwa@latest
```

Update `src/env.d.ts` if the virtual module types change. Test that `virtual:pwa-register` and `virtual:pwa-info` still resolve.

### Step 4 — `astro.config.mjs`

Remove `@astrojs/tailwind` integration, add `@tailwindcss/vite` and `vite-plugin-pwa` as Vite plugins:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  site: 'https://fsabado.com',
  base: '/',
  output: 'static',
  vite: {
    plugins: [
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: 'Francis Sabado',
          short_name: 'F. Sabado',
          description: 'Senior Software Engineer — portfolio, projects, and writing.',
          theme_color: '#2563eb',
          background_color: '#ffffff',
          display: 'standalone',
          orientation: 'portrait-primary',
          scope: '/',
          start_url: '/',
          icons: [
            { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
            { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          ],
        },
        workbox: {
          navigateFallback: '/offline.html',
          maximumFileSizeToCacheInBytes: 6 * 1024 * 1024,
          globPatterns: ['**/*.{css,js,html,ico,png,jpg,jpeg,gif,webp,svg,webmanifest,woff2}'],
        },
      }),
    ],
  },
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
});
```

### Step 5 — Rename and update content collection config

Rename `src/content/config.ts` → `src/content.config.ts` and rewrite:

```ts
import { defineCollection, z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    year: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    images: z.array(z.string()).optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    videoUrl: z.string().optional(),
    paperUrl: z.string().optional(),
    published: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string().default('Francis Sabado'),
    image: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

export const collections = { projects, blog };
```

### Step 6 — Update `src/styles/global.css`

Replace Tailwind 3 directives with Tailwind 4 import:

```css
/* Before */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* After */
@import "tailwindcss";
```

The `@layer components` blocks for `.btn-primary`, `.card`, `.badge`, etc. should still work — verify visually after build.

### Step 7 — Delete `tailwind.config.mjs`

Tailwind 4 uses auto-detection for content paths and no longer requires a config file. The custom color tokens (`primary`, `secondary`, `accent`) and font families (`Inter`, `Fira Code`) defined there need to be migrated to CSS custom properties in `global.css` or verified that they're unused.

**Check before deleting**: grep for `primary`, `secondary`, `accent`, `font-sans`, `font-mono` in templates. If used, migrate to `@theme` in CSS:

```css
@import "tailwindcss";

@theme {
  --color-primary: #2563eb;
  --color-primary-dark: #3b82f6;
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-mono: 'Fira Code', Monaco, Consolas, monospace;
}
```

```bash
git rm tailwind.config.mjs
```

### Step 8 — Update dynamic routes (`slug` → `id`)

**`src/pages/blog/[slug].astro`** and **`src/pages/projects/[slug].astro`**:

```ts
// Before
return posts.map((post) => ({
  params: { slug: post.slug },
  props: { post },
}));

// After
return posts.map((post) => ({
  params: { slug: post.id },
  props: { post },
}));
```

Also update any references to `entry.slug` in portfolio.astro, index.astro, and search data builders — replace with `entry.id`.

### Step 9 — Update `entry.render()` calls

In `src/pages/blog/[slug].astro` and `src/pages/projects/[slug].astro`:

```ts
// Before
const { Content } = await entry.render();

// After
import { render } from 'astro:content';
const { Content } = await render(entry);
```

### Step 10 — Build and verify

```bash
npm run build
npm run preview
```

Check:
- [ ] Home page renders correctly
- [ ] All 9 project pages load at correct URLs
- [ ] Blog post loads at correct URL
- [ ] Dark mode toggle works
- [ ] PWA service worker registers (check DevTools → Application)
- [ ] Offline fallback page works
- [ ] Resume, Portfolio, Contact pages render
- [ ] Search bar works (fuse.js still bundled)
- [ ] CSS component classes (buttons, cards, badges) look correct
- [ ] No console errors
- [ ] `npm audit` shows 0 high/moderate vulnerabilities

### Step 11 — Commit and merge

```bash
git add -A
git commit -m "Upgrade to Astro 6, Tailwind 4, and migrate PWA plugin"
git checkout master
git merge astro-6-upgrade
git push origin master
```

---

## Risk Areas

### PWA plugin migration (highest risk — new)
The `@vite-pwa/astro` wrapper handles virtual module registration and Astro-specific hooks. Using `vite-plugin-pwa` directly may require adjusting `virtual:pwa-info` usage in `BaseLayout.astro`. If this breaks, the fallback is to install `@vite-pwa/astro` with `--legacy-peer-deps` temporarily.

### Tailwind 4 CSS (high risk)
Tailwind 4 is a ground-up rewrite with a new CSS-first config model. While `@layer components` and `dark:` variants are preserved, the `darkMode: 'class'` config is gone (Tailwind 4 uses `@custom-variant dark (&.dark)` or auto-detects). Verify dark mode still works after upgrade.

### Content collection IDs
In Astro 6, `entry.id` is derived from the filename. For example, `2015-01-01-async-circuits.md` → id `2015-01-01-async-circuits`. Verify the IDs match the expected URL slugs — they should since the old slugs were also filename-based.

### Zod 4 API changes
Astro 6 bundles Zod 4 which has some API changes. The schemas in this project use only basic types (`z.string()`, `z.number()`, `z.boolean()`, `z.array()`, `z.date()`) which are all compatible with Zod 4.

---

## Fallback Option

If Tailwind 4 causes significant CSS breakage, keep **Tailwind 3** with Astro 6 via PostCSS instead of the Vite plugin:

```bash
npm install tailwindcss@3 postcss autoprefixer
```

Create `postcss.config.mjs`:
```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

This avoids the Tailwind 4 migration entirely while still fixing the Astro vulnerabilities.
