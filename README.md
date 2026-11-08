# alessandrobozzon.com

Personal academic website of Alessandro Bozzon, served at
[www.alessandrobozzon.com](https://www.alessandrobozzon.com) via GitHub Pages.

Built with React, TypeScript, Vite and Tailwind CSS. Every page is
pre-rendered to static HTML at build time, so content is visible to search
engines and readers without JavaScript.

## Editing content

All site content lives in JSON files under `src/data/`. The pages only display it.

| File | Page |
|---|---|
| `profile.json`, `metrics.json` | Home |
| `publications.json` | Publications |
| `projects.json` | Projects |
| `teaching.json` | Teaching |
| `supervision.json` | Supervision |
| `service.json` | Service |
| `news.json` | News (and recent news on Home) |
| `contact.json` | Contact |

The shape of each file is described in `src/types/index.ts`.

## Development

Requires Node.js 20 or later.

```sh
npm install        # install dependencies
npm run dev        # local dev server at http://localhost:8080
npm run build      # production build into dist/
npm run preview    # serve the production build locally
npm test           # run tests
npm run lint       # lint
npm run typecheck  # TypeScript type check
```

## Adding a page

1. Create the page component in `src/pages/`.
2. Add its route to `src/routes.tsx` (shared by the browser app and the pre-renderer).
3. Add the path to `additionalPrerenderRoutes` in `vite.config.ts` and to the `links` list in `src/prerender.tsx`.
4. Add it to the navigation in `src/components/Header.tsx` and to `public/sitemap.xml`.

## Deployment

Pushing to `master` runs `.github/workflows/deploy.yml`, which builds the
site and publishes `dist/` to GitHub Pages. The custom domain is set in `CNAME`.
