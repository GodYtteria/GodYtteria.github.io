import { posts } from '#lib/posts';
import { site } from '#lib/site';

export const prerender = true;

const escape = (s: string) =>
	s
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;')
		.replace(/'/g, '&#39;');

export function GET() {
	const items = posts
		.map(
			(p) => `\t\t<item>
\t\t\t<title>${escape(p.title)}</title>
\t\t\t<link>${site.url}/writing/${p.slug}</link>
\t\t\t<guid>${site.url}/writing/${p.slug}</guid>
\t\t\t<pubDate>${p.rfc822}</pubDate>
\t\t\t<description>${escape(p.summary)}</description>
\t\t</item>`
		)
		.join('\n');

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
\t<channel>
\t\t<title>${escape(site.title)}</title>
\t\t<link>${site.url}</link>
\t\t<description>${escape(site.description)}</description>
\t\t<atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml"/>
${items}
\t</channel>
</rss>`;
	return new Response(body, { headers: { 'content-type': 'application/rss+xml' } });
}
