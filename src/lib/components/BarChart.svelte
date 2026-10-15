<script lang="ts">
	import type { Benchmark } from '#lib/data/benchmarks';

	let { chart }: { chart: Benchmark } = $props();

	const rowH = 34;
	const gap = 10;
	const valueW = 120;
	const plotW = 520;
	const labelW = $derived(
		Math.min(360, Math.max(200, 8 * Math.max(...chart.bars.map((b) => b.label.length)) + 24))
	);
	const width = $derived(labelW + plotW + valueW);
	const height = $derived(chart.bars.length * (rowH + gap));
	const max = $derived(Math.max(1, ...chart.bars.map((b) => b.value)));
	const titleId = $derived(`chart-${chart.slug}`);
	const best = $derived(
		chart.lowerIsBetter
			? Math.min(...chart.bars.map((b) => b.value))
			: Math.max(...chart.bars.map((b) => b.value))
	);
</script>

<figure>
	<figcaption>
		<h2 id={titleId}>{chart.title}</h2>
		<p class="label">{chart.unit} · {chart.caption}</p>
	</figcaption>

	<svg viewBox="0 0 {width} {height}" role="img" aria-labelledby={titleId} preserveAspectRatio="xMinYMin meet">
		{#each chart.bars as bar, i (bar.label)}
			{@const y = i * (rowH + gap)}
			{@const w = Math.max(2, (bar.value / max) * plotW)}
			<text class="name" x={labelW - 12} y={y + rowH / 2} dominant-baseline="middle" text-anchor="end">
				{bar.label}
			</text>
			<rect
				class="bar s{bar.series ?? 0}"
				x={labelW}
				y={y + 5}
				width={w}
				height={rowH - 10}
				rx="4"
			>
				<title>{bar.label}: {bar.value} {chart.unit}</title>
			</rect>
			<text class="value" x={labelW + w + 10} y={y + rowH / 2} dominant-baseline="middle">
				{bar.value}{#if bar.value === best}<tspan class="best" dx="7">best</tspan>{/if}
			</text>
		{/each}
		<line class="axis" x1={labelW} y1="0" x2={labelW} y2={height} />
	</svg>

	<p class="label source">{chart.source}</p>

	<details>
		<summary class="label">Table view</summary>
		<table>
			<caption class="label">{chart.title} ({chart.unit})</caption>
			<thead>
				<tr><th scope="col">Model</th><th scope="col">{chart.unit}</th></tr>
			</thead>
			<tbody>
				{#each chart.bars as bar (bar.label)}
					<tr><th scope="row">{bar.label}</th><td>{bar.value}</td></tr>
				{/each}
			</tbody>
		</table>
	</details>
</figure>

<style>
	figure {
		margin: 2rem 0;
		border: 1px solid var(--line);
		border-radius: 4px;
		background: var(--panel);
		padding: 1.1rem 1.15rem 1rem;
	}

	figcaption h2 {
		margin: 0 0 0.15rem;
		font-size: 1.1rem;
	}

	figcaption p {
		margin: 0 0 0.9rem;
	}

	svg {
		width: 100%;
		height: auto;
		display: block;
	}

	.name,
	.value {
		font-family: var(--mono);
		font-size: 13px;
		fill: var(--ink);
	}

	.value {
		fill: var(--ink-muted);
	}

	.best {
		fill: var(--ink);
		font-weight: 700;
	}

	.axis {
		stroke: var(--line-strong);
		stroke-width: 1;
	}

	.bar {
		stroke: var(--panel);
		stroke-width: 2;
	}

	.s0 {
		fill: var(--chart-1);
	}
	.s1 {
		fill: var(--chart-2);
	}
	.s2 {
		fill: var(--chart-3);
	}
	.s3 {
		fill: var(--chart-4);
	}

	.source {
		margin: 0.75rem 0 0;
	}

	details {
		margin-top: 0.6rem;
	}

	summary {
		cursor: pointer;
	}

	table {
		border-collapse: collapse;
		margin-top: 0.6rem;
		font-size: 0.9rem;
		width: 100%;
	}

	caption {
		text-align: left;
		padding-bottom: 0.4rem;
	}

	th,
	td {
		border: 1px solid var(--line);
		padding: 0.35rem 0.6rem;
		text-align: left;
	}

	td {
		font-family: var(--mono);
	}

	@media (forced-colors: active) {
		.bar {
			fill: CanvasText;
		}
	}
</style>
