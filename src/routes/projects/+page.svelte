<script lang="ts">
	import ProjectCard from '#lib/components/ProjectCard.svelte';
	import { projects, tags } from '#lib/data/projects';

	import Seo from '#lib/components/Seo.svelte';

	const filters = ['All', ...tags];
</script>

<Seo title="Projects" description="Inference engines, trading systems, games, mobile apps and self-hosted websites, from 2016 to now." path="/projects" />

<h1>Projects</h1>
<p class="lede">
	Inference engines, trading systems, games, mobile apps and self-hosted websites. Some are open
	source; the rest are described without naming the repository.
</p>

<div class="filters" id="filters" hidden>
	<span class="label">Filter</span>
	{#each filters as tag (tag)}
		<button class="btn" type="button" data-tag={tag} aria-pressed={tag === 'All'}>
			{tag}
		</button>
	{/each}
</div>

<p class="label" id="filter-status" role="status" aria-live="polite"></p>

<div class="grid">
	{#each projects as project (project.slug)}
		<div data-tags={project.tags.join('|')}>
			<ProjectCard {project} />
		</div>
	{/each}
</div>

<style>
	.lede {
		color: var(--ink-muted);
	}

	.filters {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.4rem;
		margin: 1.5rem 0;
	}

	.filters .label {
		margin-right: 0.3rem;
	}

	.filters .btn {
		font-size: 0.78rem;
		padding: 0.25rem 0.6rem;
	}

	.grid {
		display: grid;
		gap: 0.9rem;
	}
</style>
