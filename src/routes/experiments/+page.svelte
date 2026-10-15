<script lang="ts">
	import BarChart from '#lib/components/BarChart.svelte';
	import { benchmarks } from '#lib/data/benchmarks';
	import Seo from '#lib/components/Seo.svelte';
</script>

<Seo
	title="Experiments"
	description="Benchmarks and experiments from the lab: local LLM inference, trading backtests and hardware tests."
	path="/experiments"
	noindex={benchmarks.length === 0}
/>

<h1>Experiments</h1>
<p class="lede">
	Numbers from the lab. Everything here was measured on hardware I own, with the method written next
	to the chart so you can disagree with it.
</p>

{#each benchmarks as chart (chart.slug)}
	<BarChart {chart} />
{/each}

{#if benchmarks.length === 0}
	<p>No runs published yet.</p>
{/if}

<style>
	.lede {
		color: var(--ink-muted);
	}
</style>
