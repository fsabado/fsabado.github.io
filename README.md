# fsabado.github.io

Personal portfolio website for [Francis Sabado](https://fsabado.com), a Senior Software Engineer with experience at Lyft, Amazon Web Services, and Sandia National Laboratories.

**Live site:** [fsabado.com](https://fsabado.com)

---

## Stack

| Layer | Technology |
|---|---|
| Framework | [Astro 4](https://astro.build) (static output) |
| Styling | Tailwind CSS 3 |
| Language | TypeScript |
| Search | Fuse.js (client-side fuzzy search) |
| PWA | `@vite-pwa/astro` |
| Hosting | GitHub Pages |
| CI/CD | GitHub Actions (push to `master` → deploy) |

---

## Pages

| Route | Description |
|---|---|
| `/` | About / home |
| `/resume` | Full résumé |
| `/portfolio` | Projects gallery with fuzzy search |
| `/blog` | Blog listing and individual posts |
| `/contact` | Contact information |

---

## Local Development

```bash
npm install
npm run dev      # dev server at localhost:4321
npm run build    # production build → dist/
npm run preview  # preview dist/ locally
```

The `predev` hook syncs project data automatically before the dev server starts.

**Project images:** The CI pipeline copies `projects/` into `public/projects/` at build time. For local preview, copy images manually:

```bash
cp -r projects/<slug>/ public/projects/<slug>/
```

---

## Content

Content is managed with [Astro Content Collections](https://docs.astro.build/en/guides/content-collections/) (`src/content/`).

**Add a blog post:** Create `src/content/blog/YYYY-MM-DD-slug.md` with the required frontmatter (`title`, `description`, `publishDate`, `category`, `tags`).

**Add a project:** Create `src/content/projects/slug.md` with required frontmatter, then add images to `projects/slug/`.

---

## Docs

- **[Architecture](docs/ARCHITECTURE.md)** — project structure, component inventory, build pipeline, and performance notes
