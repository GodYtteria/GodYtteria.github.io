import { strict as assert } from 'node:assert';
import { existsSync, globSync, readFileSync } from 'node:fs';
import test from 'node:test';

const build = 'build';
const read = (p) => readFileSync(p, 'utf8');
const pages = () => globSync(`${build}/**/*.html`).filter((p) => !p.endsWith('404.html'));

test('the build exists', () => {
	assert.ok(existsSync(build), 'run `npm run build` first');
	assert.ok(pages().length >= 10, `expected at least 10 pages, got ${pages().length}`);
});

test('every route is prerendered as real HTML', () => {
	for (const p of ['index', 'projects', 'experiments', 'writing']) {
		const f = `${build}/${p}.html`;
		assert.ok(existsSync(f), `${f} missing`);
		assert.ok(read(f).includes('<h1'), `${f} has no h1, so it is a shell not a page`);
	}
});

test('no page ships client-side framework JS', () => {
	for (const f of [...pages(), `${build}/404.html`]) {
		assert.doesNotMatch(
			read(f),
			/_app\/immutable\/[a-z]+\/[^"']+\.js/,
			`${f} loads the SvelteKit client bundle`
		);
	}
	assert.equal(globSync(`${build}/_app/immutable/**/*.js`).length, 0, 'unused client JS was not pruned');
});

test('heading levels never skip and there is exactly one h1', () => {
	for (const f of pages()) {
		const levels = [...read(f).matchAll(/<h([1-6])/g)].map((m) => Number(m[1]));
		const jumps = levels.filter((l, i) => i > 0 && l - levels[i - 1] > 1);
		assert.equal(jumps.length, 0, `${f} skips a heading level: ${levels.join(',')}`);
		assert.equal(levels.filter((l) => l === 1).length, 1, `${f} needs exactly one h1`);
	}
});

test('every image has alt text and every page declares a language', () => {
	for (const f of [...pages(), `${build}/404.html`]) {
		const html = read(f);
		assert.match(html, /<html[^>]+lang=/, `${f} has no lang`);
		for (const img of html.match(/<img [^>]*>/g) ?? []) {
			assert.match(img, /alt=/, `${f} has an image without alt: ${img}`);
		}
	}
});

test('every page carries its SEO tags', () => {
	for (const f of pages()) {
		const html = read(f);
		assert.match(html, /<title>[^<]+<\/title>/, `${f} has no title`);
		assert.match(html, /name="description" content="[^"]+"/, `${f} has no description`);
		assert.match(html, /property="og:title"/, `${f} has no og:title`);
		assert.match(html, /property="og:image"/, `${f} has no og:image`);
		const indexable = !/name="robots" content="noindex"/.test(html);
		if (indexable) assert.match(html, /rel="canonical"/, `${f} is indexable but has no canonical`);
	}
});

test('the 404 page is static and tells crawlers to skip it', () => {
	const html = read(`${build}/404.html`);
	assert.match(html, /name="robots" content="noindex"/);
	assert.match(html, /404/);
});

test('the feed and the sitemap are well-formed and agree with the pages', () => {
	const rss = read(`${build}/rss.xml`);
	const sitemap = read(`${build}/sitemap.xml`);
	for (const [name, xml] of [
		['rss.xml', rss],
		['sitemap.xml', sitemap]
	]) {
		assert.ok(xml.startsWith('<?xml'), `${name} is not XML`);
		const body = xml.replace(/<\?[^>]*\?>/g, '').replace(/<!--[\s\S]*?-->/g, '');
		const stack = [];
		for (const [, closing, tag, selfClosing] of body.matchAll(/<(\/?)([a-zA-Z][\w:.-]*)[^>]*?(\/?)>/g)) {
			if (closing) assert.equal(stack.pop(), tag, `${name} closes ${tag} out of order`);
			else if (!selfClosing) stack.push(tag);
		}
		assert.equal(stack.length, 0, `${name} leaves ${stack.join(', ')} unclosed`);
	}
	assert.doesNotMatch(rss, /Invalid Date/, 'rss.xml has an unparsed date');

	for (const post of globSync(`${build}/writing/*.html`)) {
		const slug = post.split('/').pop().replace('.html', '');
		assert.ok(rss.includes(`/writing/${slug}`), `rss.xml is missing ${slug}`);
		assert.ok(sitemap.includes(`/writing/${slug}`), `sitemap.xml is missing ${slug}`);
	}
});

test('a section hidden from the nav is also kept out of the sitemap', () => {
	const home = read(`${build}/index.html`);
	const sitemap = read(`${build}/sitemap.xml`);
	for (const section of ['experiments', 'writing', 'projects']) {
		const inNav = new RegExp(`href="[^"]*/?${section}"`).test(home);
		const inSitemap = sitemap.includes(`/${section}<`);
		assert.equal(inNav, inSitemap, `/${section} is in the nav (${inNav}) but sitemap says ${inSitemap}`);
	}
});

test('no private repository name or real name reaches the build', () => {
	const forbidden = /\b(yve-engine|yve-nexus|bananamedianetwork|nendigital|bukluran|pulso|erish|caguin)\b/i;
	for (const f of [...pages(), `${build}/rss.xml`, `${build}/sitemap.xml`]) {
		const hit = read(f).match(forbidden);
		assert.equal(hit, null, `${f} leaks ${hit?.[0]}`);
	}
});

test('every URL in the sitemap and the feed points at a built page', () => {
	const urls = [...read(`${build}/sitemap.xml`).matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
	urls.push(...[...read(`${build}/rss.xml`).matchAll(/<link>([^<]+)<\/link>/g)].map((m) => m[1]));
	assert.ok(urls.length > 0, 'no URLs found');

	for (const url of urls) {
		const path = new URL(url).pathname.replace(/\/$/, '') || '/index';
		assert.ok(existsSync(`${build}${path}.html`), `${url} is listed but ${build}${path}.html does not exist`);
	}
});
