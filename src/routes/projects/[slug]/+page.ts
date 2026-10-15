import { error } from '@sveltejs/kit';
import { projects } from '#lib/data/projects';

export const prerender = true;

export function entries() {
	return projects.map((p) => ({ slug: p.slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const project = projects.find((p) => p.slug === params.slug);
	if (!project) error(404, 'Project not found');
	return { project };
}
