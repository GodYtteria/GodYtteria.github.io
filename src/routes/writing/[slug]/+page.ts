import { error } from '@sveltejs/kit';
import { getPost, posts } from '#lib/posts';

export const prerender = true;

export function entries() {
	return posts.map((p) => ({ slug: p.slug }));
}

export function load({ params }: { params: { slug: string } }) {
	const post = getPost(params.slug);
	if (!post) error(404, 'Post not found');
	return { meta: post.meta, content: post.component };
}
