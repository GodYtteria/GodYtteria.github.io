<script lang="ts">
	import { posts } from '#lib/posts';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo title="Writing" description="Notes on self-hosting, reverse engineering and building systems." path="/writing" />

<h1>Writing</h1>
<p class="lede">Notes on self-hosting, reverse engineering and building systems.</p>

<ul>
	{#each posts as post (post.slug)}
		<li>
			{#if post.thumb}
				<img src={post.thumb} alt={post.thumbAlt ?? ''} width="96" height="96" loading="lazy" />
			{/if}
			<div>
				<h2><a href="/writing/{post.slug}">{post.title}</a></h2>
				<p class="label">{post.date}</p>
				<p>{post.summary}</p>
			</div>
		</li>
	{/each}
</ul>

<style>
	.lede {
		color: var(--ink-muted);
	}

	ul {
		list-style: none;
		margin: 1.5rem 0 0;
		padding: 0;
	}

	li {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		border-top: 1px solid var(--line);
		padding: 1.1rem 0;
	}

	img {
		flex: none;
		width: 96px;
		height: 96px;
		object-fit: cover;
		border: 1px solid var(--line);
		border-radius: 4px;
		filter: saturate(0.85);
	}

	li div {
		min-width: 0;
	}

	h2 {
		margin: 0 0 0.15rem;
		font-size: 1.1rem;
	}

	p {
		margin: 0;
	}

	li p:last-child {
		color: var(--ink-muted);
	}
</style>
