<script lang="ts">
	import type { Milestone } from '#lib/data/timeline';

	let { items }: { items: Milestone[] } = $props();
</script>

<ol>
	{#each items as item (item.year + item.title)}
		<li>
			<span class="year label">{item.year}</span>
			<div>
				<h3>{item.title}</h3>
				<p>{item.body}</p>
			</div>
		</li>
	{/each}
</ol>

<style>
	ol {
		list-style: none;
		margin: 0;
		padding: 0;
		border-left: 1px solid var(--line-strong);
	}

	li {
		position: relative;
		padding: 0 0 1.75rem 1.5rem;
	}

	li::before {
		content: '';
		position: absolute;
		left: -5px;
		top: 0.5rem;
		width: 9px;
		height: 9px;
		border-radius: 50%;
		background: var(--ink);
	}

	.year {
		display: block;
		margin-bottom: 0.2rem;
	}

	p {
		margin: 0;
		color: var(--ink-muted);
	}
</style>
