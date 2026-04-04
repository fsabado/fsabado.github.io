# Astro 6 Upgrade Plan

**Date**: 2026-04-04
**Status**: Planned
**Motivation**: Fix 9 npm audit vulnerabilities (1 high, 6 moderate, 2 low) in Astro <=5.18.0 and its bundled esbuild/vite.

---

## Background

The site is currently on **Astro 4.15.0** with **Tailwind 3** via `@astrojs/tailwind`. All vulnerabilities are in Astro itself and only affect the dev server or server-mode features — not the static production build. The upgrade is nonetheless worth doing to stay current and silence Dependabot.

---

## Breaking Changes Affecting This Site

| Area | Current | Breaking? | Change Required |
|---|---|---|---|
| Astro | 4.15.0 | Yes | → 6.x |
| Content Collections API | Legacy v2 | **Yes — fully removed** | Rename config, add loaders, `slug` → `id` |
| `@astrojs/tailwind` | 3.x integration | **Yes — deprecated** | → `@tailwindcss/vite` |
| Tailwind | 3.x | **Yes** | → 4.x (CSS syntax changes) |
| `[slug].astro` routes | `entry.slug` | **Yes** | → `entry.id` |
| `entry.render()` | Used in blog + project pages | **Yes** | → standalone `render()` from `astro:content` |
| Zod import | `from 'astro:content'` | Yes | → `from 'astro/zod'` |
| Node.js (CI) | 20 | Done | Already updated to 24 |

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

### Step 3 — `astro.config.mjs`

Remove `@astrojs/tailwind` integration, add `@tailwindcss/vite` as a Vite plugin:

```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://fsabado.com',
  base: '/',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
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

### Step 4 — Rename and update content collection config

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
  }),
});

export const collections = { projects, blog };
```

### Step 5 — Update `src/styles/global.css`

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

### Step 6 — Delete `tailwind.config.mjs`

Tailwind 4 uses auto-detection for content paths and no longer requires a config file. The custom color tokens (`primary`, `secondary`, `accent`) were already unused and can be discarded.

```bash
git rm tailwind.config.mjs
```

### Step 7 — Update dynamic routes

**`src/pages/blog/[slug].astro`** and **`src/pages/projects/[slug].astro`**:

```ts
// Before
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

// After
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.id },
    props: { post },
  }));
}
```

### Step 8 — Update `entry.render()` calls

```ts
// Before
const { Content } = await entry.render();

// After
import { render } from 'astro:content';
const { Content } = await render(entry);
```

### Step 9 — Build and verify

```bash
npm run build
npm run preview
```

Check:
- [ ] Home page renders correctly
- [ ] All 9 project pages load at correct URLs
- [ ] Blog post loads at correct URL
- [ ] Dark mode toggle works
- [ ] Resume, Portfolio, Contact pages render
- [ ] CSS component classes (buttons, cards, badges) look correct
- [ ] No console errors

### Step 10 — Commit and merge

```bash
git add -A
git commit -m "Upgrade to Astro 6 and Tailwind 4"
git checkout master
git merge astro-6-upgrade
git push origin master
```

---

## Risk Areas

### Tailwind 4 CSS (highest risk)
Tailwind 4 is a ground-up rewrite with a new CSS-first config model. While `@layer components` and `dark:` variants are preserved, any custom utility syntax or plugin usage may behave differently. Plan for a visual QA pass after the upgrade.

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
