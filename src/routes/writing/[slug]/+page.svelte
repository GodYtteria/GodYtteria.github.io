<script lang="ts">
	let { data } = $props();
	const Content = $derived(data.content);
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo
	title={data.meta.title}
	description={data.meta.summary}
	path="/writing/{data.meta.slug}"
	type="article"
/>

<p class="label"><a href="/writing">Writing</a></p>

<h1>{data.meta.title}</h1>
<p class="label">{data.meta.date}</p>

<article>
	<Content />
</article>

<style>
	article :global(h2) {
		margin-top: 2rem;
	}

	article :global(blockquote) {
		margin: 1.5rem 0;
		padding-left: 1rem;
		border-left: 2px solid var(--line-strong);
		color: var(--ink-muted);
	}
</style>
