<script lang="ts">
	let { data } = $props();
	const project = $derived(data.project);
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo
	title={project.name}
	description={project.summary}
	path="/projects/{project.slug}"
/>

<p class="label"><a href="/projects">Projects</a></p>

<h1>{project.name}</h1>
<p class="label">{project.year} · {project.tags.join(' · ')}</p>

<p class="lede">{project.summary}</p>

{#each project.body as paragraph (paragraph)}
	<p>{paragraph}</p>
{/each}

{#if project.repo}
	<p><a href={project.repo}>Source on GitHub</a></p>
{/if}

<style>
	.lede {
		font-size: 1.05rem;
		color: var(--ink-muted);
	}
</style>
