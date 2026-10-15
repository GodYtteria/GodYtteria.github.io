import { projects } from '#lib/data/projects';
import { posts } from '#lib/posts';
import { benchmarks } from '#lib/data/benchmarks';
import { site } from '#lib/site';

export const prerender = true;

const paths = [
	'/',
	'/projects',
	...(benchmarks.length ? ['/experiments'] : []),
	'/writing',
	...projects.map((p) => `/projects/${p.slug}`),
	...posts.map((p) => `/writing/${p.slug}`)
];

export function GET() {
	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `\t<url><loc>${site.url}${p}</loc></url>`).join('\n')}
</urlset>`;
	return new Response(body, { headers: { 'content-type': 'application/xml' } });
}
