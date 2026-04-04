# Architecture Documentation

**Project**: fsabado.github.io (Personal Portfolio Website)
**Last Updated**: 2026-04-04
**Repository**: https://github.com/fsabado/fsabado.github.io
**Live Site**: https://fsabado.com

---

## Table of Contents

1. [Overview](#1-overview)
2. [Project Structure](#2-project-structure)
3. [Technology Stack](#3-technology-stack)
4. [Content Management](#4-content-management)
5. [Components](#5-components)
6. [Styling System](#6-styling-system)
7. [Build & Deployment](#7-build--deployment)
8. [Performance](#8-performance)

---

## 1. Overview

### 1.1 Project Type

Static portfolio website built with **Astro 4** and **Tailwind CSS**. Pages are pre-rendered at build time and deployed to GitHub Pages via GitHub Actions.

### 1.2 Deployment Model

- **Platform**: GitHub Pages
- **Domain**: fsabado.com (via `public/CNAME`)
- **CI/CD**: GitHub Actions (`.github/workflows/deploy.yml`) — triggers on push to `master`
- **Build Output**: `dist/` (Astro static output)

### 1.3 Purpose & Audience

- **Primary Audience**: Engineering hiring managers, technical recruiters, collaborators
- **Content Focus**: Software engineering, AI/ML, distributed systems, developer tooling
- **Experience**: Lyft, Amazon Web Services (ex-FAANG), Sandia National Laboratories
- **Credentials**: PhD Computer Engineering, 10+ years industry experience

---

## 2. Project Structure

```
fsabado.github.io/
├── src/
│   ├── pages/                  # Route-based pages (Astro file-based routing)
│   │   ├── index.astro         # Home / About
│   │   ├── resume.astro        # Full resume / CV
│   │   ├── portfolio.astro     # Projects gallery with search
│   │   ├── contact.astro       # Contact information
│   │   ├── blog/
│   │   │   ├── index.astro     # Blog listing
│   │   │   └── [slug].astro    # Individual blog post (dynamic)
│   │   ├── projects/
│   │   │   └── [slug].astro    # Individual project detail (dynamic)
│   │   └── search-index.json.ts
│   │
│   ├── content/                # Astro content collections
│   │   ├── config.ts           # Zod schemas for projects + blog
│   │   ├── projects/           # 9 project markdown files
│   │   └── blog/               # Blog post markdown files
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.astro
│   │   │   └── Footer.astro
│   │   ├── project/
│   │   │   ├── ProjectCard.astro
│   │   │   └── ProjectGrid.astro
│   │   ├── blog/
│   │   │   └── BlogCard.astro
│   │   ├── search/
│   │   │   └── SearchBar.astro
│   │   └── theme/
│   │       └── ThemeToggle.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro    # Root layout: <head>, meta tags, OG
│   │   └── ProjectLayout.astro # Project detail wrapper
│   │
│   └── styles/
│       └── global.css          # Tailwind directives + component classes
│
├── public/                     # Static assets (copied to dist/ as-is)
│   ├── images/
│   │   └── headshot.jpg        # Profile photo (hero + OG image)
│   ├── CNAME                   # fsabado.com
│   └── favicon.ico
│
├── projects/                   # Project images served via CI copy step
│   ├── 3dpartition/
│   ├── adaptivesystems/
│   ├── android-smartdrive/
│   ├── async_extreme/
│   ├── capstone-angryprims/
│   ├── dpa-aes/
│   ├── msp430/
│   ├── mtd3l/
│   └── multifinger/
│
├── docs/                       # Project documentation
│   └── ARCHITECTURE.md         # This file
│
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions deploy pipeline
│
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 3. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Astro | 4.15.0 |
| Styling | Tailwind CSS | 3.4.0 |
| Language | TypeScript | strict |
| Search | Fuse.js | 7.0.0 |
| Image processing | Sharp (via Astro) | — |
| Fonts | Inter, Fira Code | Google Fonts |
| Output | Static (`output: 'static'`) | — |

---

## 4. Content Management

### 4.1 Content Collections

Content is managed via **Astro Content Collections** (`src/content/`). Schemas are defined with Zod in `src/content/config.ts`.

**Projects schema** (`src/content/projects/*.md`):

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `subtitle` | string | |
| `year` | number | Used for sort order |
| `category` | string | |
| `tags` | string[] | |
| `thumbnail` | string | Path under `/projects/` |
| `images` | string[]? | Optional gallery |
| `demoUrl` | string? | |
| `repoUrl` | string? | |
| `videoUrl` | string? | |
| `paperUrl` | string? | |
| `published` | boolean | Default: true |
| `order` | number? | Manual sort override |

**Blog schema** (`src/content/blog/*.md`):

| Field | Type | Notes |
|---|---|---|
| `title` | string | |
| `description` | string | |
| `publishDate` | date | |
| `category` | string | |
| `tags` | string[] | |
| `author` | string | Default: 'Francis Sabado' |
| `image` | string? | Optional hero image |

### 4.2 Project Images

Project images live in the root `projects/` directory (not `public/`). The CI pipeline copies them into `public/projects/` before building:

```yaml
- name: Copy legacy assets into public/
  run: |
    mkdir -p public/projects public/images public/assets
    cp -r projects/*/  public/projects/ 2>/dev/null || true
```

To add images to a project locally for dev preview, copy them to `public/projects/<slug>/`.

### 4.3 Adding New Content

**New blog post**: Create `src/content/blog/YYYY-MM-DD-slug.md` with required frontmatter.

**New project**: Create `src/content/projects/slug.md` + add images to `projects/slug/`.

---

## 5. Components

### 5.1 Layouts

**`BaseLayout.astro`** — wraps every page. Accepts:
- `title` — page `<title>` and OG title
- `description` — meta description and OG description (default: site tagline)
- `image` — OG image (default: `/images/headshot.jpg`)

**`ProjectLayout.astro`** — wraps individual project pages with back navigation.

### 5.2 Reusable Components

| Component | Used In | Purpose |
|---|---|---|
| `Header.astro` | All pages | Fixed nav with dark mode toggle, mobile menu |
| `Footer.astro` | All pages | Site footer |
| `ProjectCard.astro` | Home, Portfolio | Project thumbnail card |
| `ProjectGrid.astro` | Portfolio | Responsive grid wrapper |
| `BlogCard.astro` | Blog index | Blog post summary card |
| `SearchBar.astro` | Portfolio | Client-side fuzzy search via Fuse.js |
| `ThemeToggle.astro` | Header | Dark/light mode toggle (localStorage) |

### 5.3 Dark Mode

Dark mode is class-based (`dark:` Tailwind variants). The toggle script in `ThemeToggle.astro` reads/writes `localStorage` and applies the `dark` class to `<html>`. Default follows system preference (`prefers-color-scheme`).

---

## 6. Styling System

### 6.1 Tailwind Configuration

`tailwind.config.mjs` — content paths cover all `.astro`, `.ts`, `.md` files. No custom color tokens; default Tailwind palette is used throughout.

### 6.2 Global CSS Component Classes

Defined in `src/styles/global.css` using Tailwind's `@layer components`:

| Class | Purpose |
|---|---|
| `.site-container` | Max-width wrapper with horizontal padding |
| `.btn-primary` | Filled blue CTA button |
| `.btn-secondary` | Outlined secondary button |
| `.card` | White/dark rounded card with border |
| `.section-title` | H2 style for section headings |
| `.badge` | Primary color tag pill |
| `.badge-secondary` | Muted tag pill (used in skills) |
| `.content-prose` | Markdown body typography styles |

---

## 7. Build & Deployment

### 7.1 Local Development

```bash
npm install
npm run dev        # dev server at localhost:4321
npm run build      # production build → dist/
npm run preview    # preview dist/ locally
```

### 7.2 GitHub Actions Pipeline

File: `.github/workflows/deploy.yml`

```
push to master
    ↓
Checkout → Node 20 → npm ci
    ↓
Copy projects/ → public/projects/
    ↓
npm run build  (Astro → dist/)
    ↓
upload-pages-artifact (dist/)
    ↓
deploy-pages → fsabado.com
```

Concurrency group `"pages"` prevents overlapping deploys.

### 7.3 Enabling GitHub Pages

In the GitHub repo: **Settings → Pages → Source: GitHub Actions**.

---

## 8. Performance

### 8.1 Build Characteristics

- **Output**: Fully static HTML — no client-side JS framework
- **Stylesheets**: Inlined automatically (`inlineStylesheets: 'auto'`)
- **Images**: Served from `public/` (no Astro image optimization for project images)
- **Search**: Client-side only via Fuse.js, no server round-trips

### 8.2 Optimization Opportunities

- Move `projects/` images into `public/projects/` permanently (eliminate CI copy step)
- Enable Astro's `<Image>` component for automatic WebP conversion and `srcset`
- Add `<link rel="preload">` for hero image
