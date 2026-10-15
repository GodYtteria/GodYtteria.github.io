<script lang="ts">
	import Timeline from '#lib/components/Timeline.svelte';
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { timeline } from '#lib/data/timeline';
	import { projects } from '#lib/data/projects';

	const featured = projects.slice(0, 3);
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo title="GodYtteria" description="Game developer, white-hat hacker and ML systems engineer. Taking things apart since 2011, building and self-hosting ever since." path="/" />

<h1>GodYtteria</h1>

<p class="lede">
	Game dev, white-hat hacker, ML systems engineer. It started around 2011 on a slow Core 2 Duo,
	taking games apart just to see how they worked, and I never stopped building. Everything I run is
	self-hosted, on hardware I own.
</p>

<hr />

<h2>Timeline</h2>
<Timeline items={timeline} />

<hr />

<h2>Selected work</h2>
<div class="grid">
	{#each featured as project (project.slug)}
		<ProjectCard {project} level={3} />
	{/each}
</div>
<p><a href="/projects">All projects</a></p>

<style>
	.lede {
		font-size: 1.1rem;
		color: var(--ink-muted);
	}

	.grid {
		display: grid;
		gap: 0.9rem;
		margin-bottom: 1rem;
	}
</style>
