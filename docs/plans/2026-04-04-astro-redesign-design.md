# Astro Portfolio Redesign - Design Document

**Date**: 2026-04-04
**Author**: Claude Code
**Status**: Draft
**Project**: fsabado.github.io migration to Astro

---

## Executive Summary

Complete redesign and migration of fsabado.github.io from end-of-life Bootstrap 3/jQuery stack to modern Astro framework with new features including dark mode, blog, and search functionality.

**Goals**:
- ✅ Modernize from EOL dependencies (Bootstrap 3.3.7, jQuery 1.10.1)
- ✅ Reduce site size from 36MB to ~5MB through image optimization
- ✅ Implement complete visual redesign with modern design system
- ✅ Add dark mode, blog, and search functionality
- ✅ Improve performance to 66%+ Core Web Vitals pass rate
- ✅ Maintain all existing content (9 projects, publications, resume)

**Estimated Timeline**: 3-4 weeks (part-time) or 1-2 weeks (full-time)

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Design System](#design-system)
5. [Content Architecture](#content-architecture)
6. [Image Optimization Pipeline](#image-optimization-pipeline)
7. [New Features](#new-features)
8. [Migration Phases](#migration-phases)
9. [Performance Strategy](#performance-strategy)
10. [Deployment Strategy](#deployment-strategy)

---

## 1. Architecture Overview

### 1.1 Framework Choice: Astro

**Why Astro**:
- **Performance**: 66% Core Web Vitals pass rate (vs Next.js 30%, Hugo ~40-50%)
- **Developer Experience**: HTML-like syntax, TypeScript support, Vite-powered
- **Island Architecture**: Zero JS by default, opt-in interactivity
- **Growth**: Fastest-growing SSG (35k+ stars, projected 45k+ by end of 2026)
- **Future-proof**: Add React/Vue/Svelte components later if needed

### 1.2 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    GitHub Pages                              │
│                  (Static Hosting)                            │
└─────────────────────────────────────────────────────────────┘
                              ↑
                              │ git push
                              │
┌─────────────────────────────────────────────────────────────┐
│              GitHub Actions (CI/CD)                          │
│         - Run astro build                                   │
│         - Optimize images                                   │
│         - Deploy to gh-pages branch                         │
└─────────────────────────────────────────────────────────────┘
                              ↑
                              │
┌─────────────────────────────────────────────────────────────┐
│                 Astro Build Pipeline                         │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────────┐   │
│  │ Content     │  │ Components   │  │ Image            │   │
│  │ (Markdown)  │→ │ (.astro)     │→ │ Optimization     │   │
│  └─────────────┘  └──────────────┘  │ (Sharp/WebP)     │   │
│                                       └──────────────────┘   │
│                                             ↓                │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           Static HTML + CSS + Minimal JS             │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 1.3 Key Architectural Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| **Routing** | File-based | Modern standard, better UX than hash routing |
| **Styling** | Tailwind CSS | Utility-first, easy dark mode implementation |
| **UI Components** | Bootstrap 5 + Astro | Familiar grid system, modern components |
| **Content Management** | Markdown collections | Version control, easy editing, no CMS needed |
| **Image Optimization** | Astro Image + Sharp | Automatic WebP/AVIF, lazy loading, responsive |
| **Search** | Fuse.js (client-side) | No backend needed, fast fuzzy search |
| **Deployment** | GitHub Actions | Free, auto-deploy on push |

---

## 2. Technology Stack

### 2.1 Core Dependencies

```json
{
  "dependencies": {
    "astro": "^4.15.0",
    "@astrojs/image": "^0.18.0",
    "@astrojs/bootstrap": "^0.5.0",
    "@astrojs/tailwind": "^5.1.0",
    "bootstrap": "^5.3.3",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "typescript": "^5.3.0",
    "prettier": "^3.1.0",
    "vite": "^5.0.0"
  },
  "optionalDependencies": {
    "fuse.js": "^7.0.0",      // Search functionality
    "astro-icon": "^1.0.0"    // Icon optimization
  }
}
```

### 2.2 Development Tools

- **TypeScript**: Type safety for components
- **Prettier**: Code formatting
- **Vite**: Lightning-fast dev server, HMR
- **GitHub Actions**: CI/CD pipeline

---

## 3. Project Structure

### 3.1 Complete File Structure

```
fsabado.github.io/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions deployment
├── public/
│   ├── favicon.ico
│   ├── fonts/                      # Custom fonts (if any)
│   └── images/                     # Static images (optimized)
│       └── me.jpg
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro        # Navigation + dark mode toggle
│   │   │   ├── Footer.astro        # Social links, copyright
│   │   │   └── Layout.astro        # Base layout wrapper
│   │   ├── project/
│   │   │   ├── ProjectCard.astro   # Project thumbnail card
│   │   │   └── ProjectGrid.astro   # Grid of project cards
│   │   ├── blog/
│   │   │   ├── BlogCard.astro      # Blog post preview
│   │   │   └── BlogList.astro      # Blog listing page
│   │   ├── search/
│   │   │   └── SearchBar.astro     # Search input + results
│   │   └── theme/
│   │       └── ThemeToggle.astro   # Dark mode button
│   ├── content/
│   │   ├── projects/               # Project markdown files
│   │   │   ├── mtd3l.md
│   │   │   ├── msp430.md
│   │   │   ├── 3dpartition.md
│   │   │   ├── adaptivesystems.md
│   │   │   ├── dpa-aes.md
│   │   │   ├── multifinger.md
│   │   │   ├── capstone-angryprims.md
│   │   │   ├── android-smartdrive.md
│   │   │   └── async_extreme.md
│   │   ├── blog/                   # Blog posts (optional)
│   │   │   └── example-post.md
│   │   └── config.ts               # Content collection config
│   ├── layouts/
│   │   ├── BaseLayout.astro        # HTML structure, SEO
│   │   └── ProjectLayout.astro     # Project-specific layout
│   ├── pages/
│   │   ├── index.astro             # About me (homepage)
│   │   ├── resume.astro            # Resume/CV
│   │   ├── portfolio.astro         # Project listing
│   │   ├── blog/
│   │   │   ├── index.astro         # Blog listing
│   │   │   └── [slug].astro        # Individual blog posts
│   │   ├── projects/
│   │   │   └── [slug].astro        # Individual project pages
│   │   └── contact.astro           # Contact form/info
│   ├── styles/
│   │   └── global.css              # Global styles, Tailwind directives
│   └── utils/
│       ├── search.ts               # Fuse.js search setup
│       └── images.ts               # Image optimization helpers
├── astro.config.mjs                # Astro configuration
├── tailwind.config.mjs             # Tailwind configuration
├── tsconfig.json                   # TypeScript configuration
└── package.json
```

### 3.2 Key Files Explained

**`astro.config.mjs`**:
- Integrations: Bootstrap, Tailwind, Image
- Build output: `static` (for GitHub Pages)
- Image optimization settings

**`src/content/config.ts`**:
- Define content collections (projects, blog)
- Type-safe frontmatter schemas
- Automatic TypeScript types

**`src/pages/projects/[slug].astro`**:
- Dynamic routing for projects
- Generate pages from Markdown collections
- Type-safe project data access

---

## 4. Design System

### 4.1 Design Principles

1. **Content-first**: Clean typography, generous whitespace
2. **Mobile-first**: Responsive design from smallest screen up
3. **Dark mode native**: Design in dark first, light variant
4. **Performance**: Minimal CSS, no unused styles
5. **Accessibility**: WCAG AA compliance, semantic HTML

### 4.2 Color Palette

```javascript
// Tailwind config - colors
{
  colors: {
    // Light mode
    primary: '#2563eb',      // Blue 600
    secondary: '#7c3aed',    // Purple 600
    accent: '#059669',       // Emerald 600
    background: '#ffffff',
    surface: '#f8fafc',      // Slate 50
    text: '#0f172a',         // Slate 900
    muted: '#64748b',        // Slate 500

    // Dark mode (prefers-color-scheme)
    dark: {
      primary: '#3b82f6',    // Blue 500
      secondary: '#8b5cf6',  // Purple 500
      accent: '#10b981',     // Emerald 500
      background: '#0f172a', // Slate 900
      surface: '#1e293b',    // Slate 800
      text: '#f1f5f9',       // Slate 100
      muted: '#94a3b8'       // Slate 400
    }
  }
}
```

### 4.3 Typography

```javascript
// Font families
{
  fontFamily: {
    sans: ['Inter', 'system-ui', 'sans-serif'],
    mono: ['Fira Code', 'Monaco', 'monospace'],
    display: ['Cal Sans', 'sans-serif']  // For headings
  }
}
```

**Type scale**:
- Display: 48px (H1)
- Heading 1: 36px (H2)
- Heading 2: 30px (H3)
- Heading 3: 24px (H4)
- Body: 16px (p)
- Small: 14px (small, captions)

### 4.4 Component Examples

#### Navigation Header

```astro
---
// src/components/layout/Header.astro
const { currentPath } = Astro.props;
---

<header class="fixed top-0 w-full bg-background/80 backdrop-blur-md border-b border-border z-50">
  <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
    <a href="/" class="text-2xl font-bold text-primary">FS</a>

    <ul class="hidden md:flex space-x-8">
      <li><a href="/" class:active={currentPath === '/'}>About</a></li>
      <li><a href="/resume" class:active={currentPath === '/resume'}>Resume</a></li>
      <li><a href="/portfolio" class:active={currentPath === '/portfolio'}>Portfolio</a></li>
      <li><a href="/blog" class:active={currentPath.startsWith('/blog')}>Blog</a></li>
      <li><a href="/contact" class:active={currentPath === '/contact'}>Contact</a></li>
    </ul>

    <ThemeToggle />
  </nav>
</header>
```

#### Project Card

```astro
---
// src/components/project/ProjectCard.astro
const { project } = Astro.props;
const { title, subtitle, year, thumbnail } = project.data;
---

<a href={`/projects/${project.slug}/`} class="group">
  <div class="card bg-surface rounded-lg overflow-hidden hover:shadow-xl transition-all">
    <div class="aspect-video overflow-hidden">
      <Image
        src={thumbnail}
        alt={title}
        width={600}
        height={340}
        class="w-full h-full object-cover group-hover:scale-105 transition-transform"
      />
    </div>

    <div class="p-6">
      <h3 class="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p class="text-muted text-sm">
        {subtitle} – {year}
      </p>
    </div>
  </div>
</a>
```

---

## 5. Content Architecture

### 5.1 Content Collections

**Projects Collection** (`src/content/projects/*.md`):

```markdown
---
title: "Multi-Threshold Dual-spacer Dual-rail Delay-insensitive Logic"
subtitle: "Hardware Security"
year: 2016
category: "hardware-security"
tags: ["hardware", "security", "asynchronous", "delay-insensitive"]
thumbnail: "projects/mtd3l/MTD3L_Arch.png"
demoUrl: "https://demo.example.com"
repoUrl: "https://github.com/fsabado/mtd3l"
published: true
---

## Overview

This project explores...

### Key Features

- Feature 1
- Feature 2

### Technical Details

...

## Results

...
```

**Blog Collection** (`src/content/blog/*.md`):

```markdown
---
title: "Understanding Null Convention Logic"
description: "A deep dive into asynchronous circuit design"
publishDate: 2026-04-01
category: "research"
tags: ["asynchronous", "VLSI", "circuit-design"]
author: "Francis Sabado"
image: "images/blog/ncl-cover.png"
---

Introduction to NCL...

## What is Null Convention Logic?

...
```

### 5.2 Content Schema (TypeScript)

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string(),
    year: z.number(),
    category: z.string(),
    tags: z.array(z.string()),
    thumbnail: z.string(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    published: z.boolean().default(true),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    publishDate: z.date(),
    category: z.string(),
    tags: z.array(z.string()),
    author: z.string(),
    image: z.string().optional(),
  }),
});

export const collections = { projects, blog };
```

---

## 6. Image Optimization Pipeline

### 6.1 Current Image Issues

From `ARCHITECTURE_v1.md`:
- **Total site size**: ~36 MB
- **Largest images**:
  - `resume-webshot.png`: 2.5 MB
  - `testSetup.png`: 2.7 MB
  - Multiple project screenshots: 1-3 MB each
- **No optimization**: Uncompressed PNGs, no lazy loading
- **No responsive variants**: One size serves all devices

### 6.2 Optimization Strategy

#### Step 1: Audit Current Images

```bash
# Install image analysis tools
npm install --save-dev imagelist-cli

# Find all images > 500KB
npx imagelist --min-size 500KB
```

#### Step 2: Convert to Modern Formats

**Original** → **WebP + AVIF** → **50-80% size reduction**

```bash
# Using Squoosh CLI (faster than Sharp for batch)
npm install --save-dev @squoosh/cli

# Convert all PNG/JPG to WebP
for file in images/**/*.png; do
  npx squoosh-cli "$file" --output-dir "optimized/" --webp
done
```

#### Step 3: Implement Responsive Images

**Astro Image component** handles this automatically:

```astro
<Image
  src={project.data.thumbnail}
  alt={project.data.title}
  widths={[400, 800, 1200]}        # Generate 3 sizes
  formats={['webp', 'avif', 'jpg']} # Fallback for old browsers
  sizes="(max-width: 768px) 100vw, 50vw" # Responsive sizing
/>
```

**Result**: Browser downloads optimal size for device (mobile gets 400px, desktop gets 1200px)

#### Step 4: Lazy Loading

```astro
<Image
  src={largeImage}
  loading="lazy"     # Native lazy loading
  decoding="async"   # Decode off main thread
/>
```

### 6.3 Expected Results

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Total size | 36 MB | ~5 MB | **86% reduction** |
| Largest image | 2.7 MB | ~200 KB | **93% reduction** |
| Formats | PNG only | WebP/AVIF | Modern formats |
| Responsive | No | Yes (3 sizes) | Better mobile UX |
| Lazy loading | No | Yes | Faster initial load |

---

## 7. New Features

### 7.1 Dark Mode Toggle

#### Implementation Strategy

**Store preference in localStorage** + **system preference detection**:

```astro
---
// src/components/theme/ThemeToggle.astro
---

<script>
  // Detect system preference
  const getSystemTheme = () => {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  };

  // Get saved or system preference
  const getTheme = () => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return getSystemTheme();
  };

  // Apply theme on load
  const theme = getTheme();
  document.documentElement.classList.toggle('dark', theme === 'dark');

  // Toggle function
  window.toggleTheme = () => {
    const current = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', next);
  };
</script>

<button
  id="theme-toggle"
  onClick="toggleTheme()"
  class="p-2 rounded-lg hover:bg-surface transition-colors"
  aria-label="Toggle dark mode"
>
  <svg class="w-6 h-6 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
    <!-- Sun icon (shown in dark mode) -->
  </svg>
  <svg class="w-6 h-6 block dark:hidden" fill="currentColor" viewBox="0 0 20 20">
    <!-- Moon icon (shown in light mode) -->
  </svg>
</button>
```

**Tailwind dark mode** (`tailwind.config.mjs`):

```javascript
module.exports = {
  darkMode: 'class', // Use .dark class on <html>
  // ... rest of config
};
```

### 7.2 Blog Section

#### Architecture

```
src/content/blog/
├── 2026-04-01-ncl-introduction.md
├── 2026-04-15-async-circuits.md
└── 2026-05-01-3d-ic-design.md

src/pages/blog/
├── index.astro          # List all posts (pagination)
└── [slug].astro         # Individual post
```

#### Blog Listing Page

```astro
---
// src/pages/blog/index.astro
import { getCollection } from 'astro:content';

const allPosts = await getCollection('blog');
const sortedPosts = allPosts.sort((a, b) =>
  b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
);

// Pagination
const { paginate } = Astro;
const { data: posts, pagination } = paginate(sortedPosts, { itemsPerPage: 6 });
---

<BaseLayout title="Blog - Francis Sabado">
  <h1>Blog</h1>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {posts.map(post => (
      <BlogCard post={post} />
    ))}
  </div>

  <div class="mt-8 flex justify-center gap-4">
    {pagination.prev?.url && (
      <a href={pagination.prev.url}>← Previous</a>
    )}
    {pagination.next?.url && (
      <a href={pagination.next.url}>Next →</a>
    )}
  </div>
</BaseLayout>
```

#### Blog Post Page

```astro
---
// src/pages/blog/[slug].astro
import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<BlogLayout title={post.data.title}>
  <article class="prose dark:prose-invert max-w-none">
    <header class="mb-8">
      <h1 class="text-4xl font-bold">{post.data.title}</h1>
      <div class="flex gap-4 text-muted mt-2">
        <time datetime={post.data.publishDate.toISOString()}>
          {post.data.publishDate.toLocaleDateString()}
        </time>
        <span>•</span>
        <span>{post.data.category}</span>
      </div>
    </header>

    <Content />

    <footer class="mt-12 pt-8 border-t border-border">
      <div class="flex gap-2">
        {post.data.tags.map(tag => (
          <span class="px-3 py-1 bg-surface rounded-full text-sm">#{tag}</span>
        ))}
      </div>
    </footer>
  </article>
</BlogLayout>
```

### 7.3 Search Functionality

#### Implementation: Fuse.js (Client-side Fuzzy Search)

**Why Fuse.js**:
- No backend needed
- Fast fuzzy search (handles typos)
- Works offline
- Small bundle size (24KB)

#### Search Index Generation

```typescript
// src/utils/search.ts
import { getCollection } from 'astro:content';
import Fuse from 'fuse.js';

export async function getSearchIndex() {
  const projects = await getCollection('projects');
  const blogPosts = await getCollection('blog');

  // Combine all searchable content
  const allContent = [
    ...projects.map(p => ({
      type: 'project',
      slug: `/projects/${p.slug}/`,
      title: p.data.title,
      description: p.data.subtitle,
      tags: p.data.tags,
    })),
    ...blogPosts.map(b => ({
      type: 'blog',
      slug: `/blog/${b.slug}/`,
      title: b.data.title,
      description: b.data.description,
      tags: b.data.tags,
    })),
  ];

  return new Fuse(allContent, {
    keys: ['title', 'description', 'tags'],
    threshold: 0.3, // Lower = more strict matching
    includeScore: true,
  });
}
```

#### Search Component

```astro
---
// src/components/search/SearchBar.astro
---

<div id="search-container" class="relative">
  <input
    type="text"
    id="search-input"
    placeholder="Search projects and blog..."
    class="w-full px-4 py-2 bg-surface border border-border rounded-lg focus:ring-2 focus:ring-primary"
  />

  <div
    id="search-results"
    class="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-lg shadow-xl hidden"
  >
    <!-- Results populated by JavaScript -->
  </div>
</div>

<script>
  // Load search index
  fetch('/search-index.json')
    .then(res => res.json())
    .then(data => {
      const fuse = new Fuse(data, {
        keys: ['title', 'description', 'tags'],
        threshold: 0.3,
      });

      const input = document.getElementById('search-input');
      const results = document.getElementById('search-results');

      input.addEventListener('input', (e) => {
        const query = e.target.value;

        if (query.length < 2) {
          results.classList.add('hidden');
          return;
        }

        const matches = fuse.search(query);

        if (matches.length === 0) {
          results.innerHTML = '<div class="p-4">No results found</div>';
        } else {
          results.innerHTML = matches.slice(0, 5).map(result => `
            <a href="${result.item.slug}" class="block p-4 hover:bg-surface transition-colors">
              <div class="font-bold">${result.item.title}</div>
              <div class="text-sm text-muted">${result.item.description}</div>
            </a>
          `).join('');
        }

        results.classList.remove('hidden');
      });
    });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#search-container')) {
      document.getElementById('search-results').classList.add('hidden');
    }
  });
</script>
```

#### Generate Search Index at Build Time

```typescript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import { getCollection } from 'astro:content';

export default defineConfig({
  // ... other config

  vite: {
    plugins: [
      {
        name: 'generate-search-index',
        writeBundle() {
          // Generate search-index.json file
          const index = await generateSearchIndex();
          this.emitFile({
            type: 'asset',
            fileName: 'search-index.json',
            source: JSON.stringify(index),
          });
        },
      },
    ],
  },
});
```

---

## 8. Migration Phases

### Phase 1: Project Setup (Days 1-2)

**Tasks**:
1. Initialize Astro project
2. Configure Tailwind + Bootstrap
3. Set up TypeScript + Prettier
4. Create base layouts
5. Set up GitHub Actions

**Deliverables**:
- Working Astro dev server
- Basic page structure
- CI/CD pipeline deploying to GitHub Pages

**Commands**:
```bash
npm create astro@latest fsabado-astro -- --template minimal --typescript strict
cd fsabado-astro
npx astro add bootstrap tailwind
npm install fuse.js @astrojs/image
```

### Phase 2: Design System Implementation (Days 3-5)

**Tasks**:
1. Configure Tailwind theme (colors, typography)
2. Create base layout components (Header, Footer, Layout)
3. Implement dark mode toggle
4. Build reusable UI components (Button, Card, Badge)
5. Set up responsive breakpoints

**Deliverables**:
- Complete design system
- Dark mode working
- Component library

### Phase 3: Content Migration (Days 6-10)

**Tasks**:
1. Extract 9 projects to Markdown files
2. Extract publications to Markdown
3. Create resume page content
4. Migrate about section
5. Create contact page

**Deliverables**:
- All content in Markdown collections
- Dynamic project pages working
- Content type-safe with TypeScript

**Project conversion example** (1-2 hours per project):
```markdown
# Before (HTML)
<a class="project-item" href="#?projects/mtd3l/mtd3l.html">
  <img src="projects/mtd3l/MTD3L_Arch.png">
  <span class="project-title">Multi-Threshold...</span>
</a>

# After (Markdown + Astro)
# src/content/projects/mtd3l.md
---
title: "Multi-Threshold Dual-spacer Dual-rail Delay-insensitive Logic"
subtitle: "Hardware Security"
year: 2016
category: "hardware-security"
thumbnail: "projects/mtd3l/MTD3L_Arch.png"
---
[Project content...]
```

### Phase 4: Image Optimization (Days 11-13)

**Tasks**:
1. Audit all images (find largest files)
2. Convert to WebP/AVIF
3. Implement responsive images with Astro Image component
4. Add lazy loading
5. Test on mobile + desktop

**Deliverables**:
- All images optimized
- Site size reduced to ~5 MB
- Responsive images working

**Batch conversion script**:
```bash
# Convert all images
for file in $(find images projects -name "*.png" -o -name "*.jpg"); do
  npx squoosh-cli "$file" --output-dir "optimized/" --webp --avif
done
```

### Phase 5: New Features (Days 14-17)

**Tasks**:
1. Implement search functionality (Fuse.js)
2. Create blog section with pagination
3. Add RSS feed for blog
4. Implement reading time for blog posts
5. Add related posts section

**Deliverables**:
- Search working across projects + blog
- Blog section complete
- RSS feed generated

### Phase 6: Testing & Polish (Days 18-20)

**Tasks**:
1. Test all pages on mobile/tablet/desktop
2. Test dark mode persistence
3. Test search functionality
4. Check accessibility (keyboard navigation, screen reader)
5. Performance audit (Lighthouse)
6. Fix bugs, polish animations

**Deliverables**:
- Production-ready site
- Lighthouse score > 90
- All features working

**Testing checklist**:
- [ ] All 9 project pages load correctly
- [ ] Blog pagination works
- [ ] Search returns relevant results
- [ ] Dark mode toggle persists across pages
- [ ] Images load responsively on mobile
- [ ] All links work
- [ ] Contact form/info displays correctly

### Phase 7: Deployment & Launch (Day 21)

**Tasks**:
1. Set up custom domain (if needed)
2. Configure DNS
3. Deploy to production
4. Set up monitoring (GitHub Pages analytics)
5. Update old site redirect (if needed)

**Deliverables**:
- Site live at https://fsabado.github.io
- HTTPS working
- Analytics tracking

---

## 9. Performance Strategy

### 9.1 Performance Targets

| Metric | Target | Current (estimated) |
|--------|--------|---------------------|
| Lighthouse Performance | 95+ | 30-40 |
| First Contentful Paint | < 1.5s | 3-4s |
| Largest Contentful Paint | < 2.5s | 5-6s |
| Total Blocking Time | < 200ms | 600-800ms |
| Cumulative Layout Shift | < 0.1 | 0.2-0.3 |
| Core Web Vitals pass rate | 66% | ~20% |

### 9.2 Optimization Techniques

#### 1. Code Splitting & Lazy Loading

```astro
<!-- Lazy load search functionality (only when needed) -->
<script>
  const searchModule = await import('./search.js');
</script>
```

#### 2. Preload Critical Resources

```html
<!-- Preload critical CSS -->
<link rel="preload" href="/_astro/..." as="style">

<!-- Preload critical images -->
<link rel="preload" href="/images/me.jpg" as="image">
```

#### 3. Font Optimization

```css
/* Use system fonts for instant rendering */
font-family: system-ui, -apple-system, sans-serif;

/* Or subset custom fonts */
@font-face {
  font-family: 'Custom';
  src: url('/fonts/custom.woff2') format('woff2');
  font-display: swap; /* Prevent FOIT */
  unicode-range: U+0020-007E; /* Latin only */
}
```

#### 4. Critical CSS Inline

```astro
---
// Inline critical CSS for above-the-fold content
const criticalCSS = `.header { ... }`;
---

<style define:vars={{ criticalCSS }}>
  {criticalCSS}
</style>
```

#### 5. Minification & Compression

```javascript
// astro.config.mjs
export default defineConfig({
  build: {
    inlineStylesheets: 'auto', // Inline small CSS
    minify: 'esbuild', // Minify JS/CSS
  },
  vite: {
    build: {
      cssCodeSplit: true, // Split CSS per page
      rollupOptions: {
        output: {
          manualChunks: {
            'search': ['fuse.js'],
          },
        },
      },
    },
  },
});
```

---

## 10. Deployment Strategy

### 10.1 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [master]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build Astro site
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 10.2 Deployment Process

1. **Developer pushes to `master` branch**
2. **GitHub Actions triggers**:
   - Checkout code
   - Install Node.js & dependencies
   - Run `astro build` → Generates `./dist/` folder
   - Upload `./dist/` as artifact
3. **GitHub Pages deploys**:
   - Uses `./dist/` folder
   - Deploys to https://fsabado.github.io
   - Automatic HTTPS
   - CDN caching (fast global delivery)

### 10.3 Environment Configuration

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://fsabado.github.io',
  base: '/',
  output: 'static', // For GitHub Pages

  build: {
    format: 'directory', // /about/index.html instead of /about.html
  },
});
```

### 10.4 Custom Domain (Optional)

If using custom domain (e.g., `francissabado.com`):

1. **Add CNAME file**:
   ```
   echo "francissabado.com" > public/CNAME
   ```

2. **Configure DNS**:
   ```
   CNAME francissabado.com → fsabado.github.io
   ```

3. **Update Astro config**:
   ```javascript
   site: 'https://francissabado.com',
   ```

---

## 11. Success Criteria

### 11.1 Must-Have (MVP)

- ✅ All 9 projects migrated with detail pages
- ✅ Dark mode toggle working
- ✅ Images optimized (site < 10 MB)
- ✅ Mobile responsive
- ✅ Deployed to GitHub Pages
- ✅ Lighthouse Performance > 90

### 11.2 Should-Have (Post-MVP)

- ✅ Blog section with pagination
- ✅ Search functionality
- ✅ RSS feed
- ✅ Reading time estimates
- ✅ Related posts section

### 11.3 Nice-to-Have (Future)

- ⭐ Animations/transitions (Framer Motion)
- ⭐ Newsletter signup
- ⭐ Comments system (giscus)
- ⭐ Project filtering by category
- ⭐ Print-friendly resume PDF

---

## 12. Risks & Mitigations

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Image optimization takes too long** | Medium | Low | Use batch scripts, optimize during migration |
| **Dark mode design issues** | Low | Medium | Test early, use Tailwind's dark: modifiers |
| **GitHub Actions build fails** | Low | High | Test workflow early, use status badges |
| **Search performance issues** | Low | Medium | Pre-filter search index, limit results |
| **Content migration errors** | Medium | Medium | Use TypeScript schemas, test each page |
| **Responsive design issues** | Medium | Low | Mobile-first approach, test on real devices |

---

## 13. Next Steps

1. **Review this design document** - Provide feedback on architecture, features, timeline
2. **Approve or revise** - Adjust scope if needed
3. **Begin Phase 1** - Initialize Astro project
4. **Create implementation plan** - Detailed step-by-step migration guide

---

## Appendix A: Resources

- **Astro Docs**: https://docs.astro.build
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Bootstrap 5**: https://getbootstrap.com/docs/5.3
- **Fuse.js**: https://fusejs.io
- **GitHub Pages**: https://docs.github.com/pages
- **Web.dev Performance**: https://web.dev/performance/

---

## Appendix B: Command Reference

```bash
# Development
npm run dev              # Start dev server (http://localhost:4321)
npm run build            # Build for production
npm run preview          # Preview production build

# Code Quality
npm run format           # Format with Prettier
npm run lint             # Lint TypeScript
npm run type-check       # Type check only

# Deployment
git push origin master   # Triggers GitHub Actions deployment

# Image Optimization
npx squoosh-cli input.png --output-dir optimized/ --webp --avif
npx imagelist --min-size 500KB  # Find large images

# Astro CLI
npx astro add bootstrap  # Add integration
npx astro check          # Check for errors
```

---

**Document Status**: 🟡 Ready for Review
**Last Updated**: 2026-04-04
**Version**: 1.0
