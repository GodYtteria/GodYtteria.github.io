import type { Component } from 'svelte';

export type PostMeta = {
	slug: string;
	title: string;
	date: string;
	rfc822: string;
	summary: string;
	thumb?: string;
	thumbAlt?: string;
};

type Frontmatter = Partial<Omit<PostMeta, 'slug' | 'rfc822'>>;

type MdModule = {
	default: Component;
	metadata?: Frontmatter;
};

const files = import.meta.glob<MdModule>('../posts/*.md', { eager: true });

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

function parseDate(path: string, value: string | undefined): Date {
	if (!value || !ISO_DATE.test(value)) {
		throw new Error(`${path}: date must be YYYY-MM-DD, got ${JSON.stringify(value)}`);
	}
	const date = new Date(`${value}T00:00:00Z`);
	if (Number.isNaN(date.getTime()) || !date.toISOString().startsWith(value)) {
		throw new Error(`${path}: ${value} is not a real date`);
	}
	return date;
}

const seen = new Set<string>();

const entries = Object.entries(files).map(([path, mod]) => {
	const slug = path.split('/').pop()!.replace(/\.md$/, '');
	if (seen.has(slug)) {
		throw new Error(`${path}: duplicate slug ${slug}`);
	}
	seen.add(slug);

	const m = mod.metadata;
	if (!m?.title || !m?.summary) {
		throw new Error(`${path}: frontmatter needs title and summary`);
	}
	if (m.thumb && !m.thumbAlt) {
		throw new Error(`${path}: thumb needs thumbAlt`);
	}

	const date = parseDate(path, m.date);

	return {
		meta: { ...m, slug, rfc822: date.toUTCString() } as PostMeta,
		component: mod.default
	};
});

entries.sort((a, b) => (a.meta.date < b.meta.date ? 1 : a.meta.date > b.meta.date ? -1 : 0));

export const posts: PostMeta[] = entries.map((e) => e.meta);

export function getPost(slug: string) {
	return entries.find((e) => e.meta.slug === slug);
}
