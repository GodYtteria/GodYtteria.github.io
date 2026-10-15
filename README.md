# godytteria.github.io

Personal site: timeline, projects, experiments and writing.

SvelteKit with `adapter-static`, fully prerendered, deployed to GitHub Pages by
`.github/workflows/deploy.yml` on every push to `main`.

## Develop

```sh
npm install
npm run dev
```

## Check and build

```sh
npm run check
npm run build
npm run preview
```

## Content

- `src/lib/data/timeline.ts` — the timeline entries
- `src/lib/data/projects.ts` — project cards and detail pages
- `src/lib/data/benchmarks.ts` — numbers behind the charts on `/experiments`
- `src/posts/*.md` — writing; frontmatter takes `title`, `date`, `summary`, optional `thumb` and `thumbAlt`

Posts may import `BarChart.svelte` for charts and `Video.svelte` for embeds.
