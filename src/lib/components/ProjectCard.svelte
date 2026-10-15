<script lang="ts">
	import type { Project } from '#lib/data/projects';

	let { project, level = 2 }: { project: Project; level?: 2 | 3 } = $props();

	const Heading = $derived(`h${level}` as 'h2' | 'h3');
</script>

<article class="card">
	<svelte:element this={Heading} class="title">
		<a href="/projects/{project.slug}">{project.name}</a>
	</svelte:element>
	<p class="label">{project.year} · {project.tags.join(' · ')}</p>
	<p>{project.summary}</p>
</article>

<style>
	article {
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
	}

	.title {
		margin: 0;
		font-size: 1.1rem;
	}

	p {
		margin: 0;
	}

	p:last-child {
		color: var(--ink-muted);
		font-size: 0.95rem;
	}
</style>
