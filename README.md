# Tanay Kashyap — Portfolio

Multi-page portfolio for Tanay Kashyap (data science, statistics @ University of Waterloo). The signature element is an interactive 3D bookshelf on the home page: seven books, one per section — hover slides a book out with its spine title, clicking opens the book into a structured preview, and the CTA navigates to that section's full page. Built with Next.js (App Router), React Three Fiber, Tailwind CSS v4, and framer-motion, and shipped as a fully static export.

## Prerequisites

- Node.js **20 or newer** (Next.js 16 requires it) — LTS recommended.

## Install / run / build

```bash
npm install       # install dependencies
npm run dev       # dev server at http://localhost:3000
npm run lint      # ESLint
npm run build     # refreshes Goodreads data (prebuild), then static-exports to out/
```

`npm run build` writes the whole site to `out/` — plain HTML/CSS/JS, no server needed. Routes land as `out/index.html`, `out/about/index.html`, `out/experience/index.html`, and so on.

## Deploying (GitHub Pages)

The project uses `output: "export"` with `basePath` / `assetPrefix` set to `/portfolio` (see `next.config.ts`) so assets work under `https://<user>.github.io/portfolio/`.

Pushing to `main` (or `master`) runs [`.github/workflows/pages.yml`](.github/workflows/pages.yml): install → build → deploy the `out/` folder to GitHub Pages.

After the first successful workflow, the site is at **`https://<your-github-username>.github.io/portfolio/`**.

Local preview of the production export must include the base path:

```bash
npm run build
npx serve out
# then open http://localhost:3000/portfolio/
```

### Vercel (optional)

Import the repo in Vercel if you prefer. Set the same base path or remove `basePath` / `assetPrefix` from `next.config.ts` for a root-domain deploy. Optionally set `GOODREADS_RSS_URL` so book reviews refresh each build.

## Site structure

| Route | Page |
| --- | --- |
| `/` | Hero + interactive bookshelf |
| `/about` | About |
| `/experience` | Work experience |
| `/projects` | Projects (empty state until you add entries) |
| `/skills` | Skills |
| `/extracurricular` | Extracurricular |
| `/books` | Book reviews (from Goodreads) |
| `/contact` | Contact |

## Editing content

All copy lives in typed files under `content/` — no component changes needed:

| File | What it holds |
| --- | --- |
| `content/site.ts` | Name, role, hero tagline, education, email/LinkedIn/GitHub links |
| `content/experience.ts` | Work experience roles, bullets, and metric chips |
| `content/skills.ts` | Skill groups and tags |
| `content/extracurricular.ts` | Extracurricular roles and bullets |
| `content/projects.ts` | Projects (currently empty — the section shows a designed empty state) |
| `content/previews.ts` | Structured summaries shown when a book opens on the shelf |
| `content/books.json` | Generated — do not edit by hand (see below) |

### Adding a project

Append an entry to the array in `content/projects.ts`:

```ts
{
  title: "My Project",
  description: "One or two sentences about what it does and why.",
  tags: ["Python", "PyTorch"],
  links: [{ label: "GitHub", url: "https://github.com/..." }],
}
```

As soon as the array is non-empty, the Projects page switches from the empty state to a card grid. Update `content/previews.ts` if you want the open-book preview facts to reflect the new projects.

### Book reviews (Goodreads)

`scripts/fetch-goodreads.mjs` runs automatically before every build (the `prebuild` script). It fetches a Goodreads RSS feed and writes `content/books.json` (title, author, cover, rating, review snippet, shelf, dates). The Book Reviews page renders from that file.

- **Feed URL**: set the `GOODREADS_RSS_URL` environment variable to your feed (`https://www.goodreads.com/review/list_rss/<user id>`). If unset, it defaults to user `198386611`.
- **Failure-safe**: the script never fails the build. If the fetch fails (offline, feed down), it keeps the existing `books.json`; if none exists, it writes an empty one and the page renders a designed empty state linking to Goodreads.

## How the bookshelf works

- `components/bookshelf/Bookshelf.tsx` renders the React Three Fiber scene plus an accessible DOM overlay: one real `<button>` per book, positioned over its spine, so keyboard and screen-reader users get the same interaction (Tab + Enter) as mouse users.
- Each spine shows its section title (drei `Text` + IBM Plex Mono from `public/fonts/`).
- Hovering or focusing a book slides it partway out and shows a floating label. Clicking pulls it forward, swings the front cover open, and fades in an open-book preview dialog (title, structured facts from `content/previews.ts`, and a "read the full section" link to that route). Close with Escape, the X button, or clicking the backdrop.
- **Fallbacks**: small screens (< 640px) and `prefers-reduced-motion` users get a CSS-only 2D "spine pile" where each spine is a plain link straight to the section page — no WebGL canvas, no preview step. Until hydration finishes, the same 2D fallback is server-rendered.

## Performance (published site)

There is **no compile step in production** — `npm run build` pre-renders every route to static HTML in `out/`. The lag you see in `npm run dev` is Turbopack compiling a page the first time you visit it; that does not happen on Vercel.

The preview CTA uses a plain `<a href>` (full page load to the prebuilt HTML) because Next.js 16’s client `Link` + prefetch has a known static-export bug where clicks can silently do nothing. Section pages stay small — the heavy 3D stack only loads on the home page.

## Theming

Light/dark themes are handled by `next-themes` (class strategy) with the toggle in the header. Color tokens are CSS variables in `app/globals.css`, mapped to Tailwind utilities via the `@theme inline` block — edit them there (there is no `tailwind.config`).
