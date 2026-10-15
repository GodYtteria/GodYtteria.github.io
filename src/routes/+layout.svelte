<script lang="ts">
	import '../app.css';
	import { page } from '$app/state';
	import { benchmarks } from '#lib/data/benchmarks';

	let { children } = $props();

	const nav = [
		{ href: '/', label: 'Home' },
		{ href: '/projects', label: 'Projects' },
		...(benchmarks.length ? [{ href: '/experiments', label: 'Experiments' }] : []),
		{ href: '/writing', label: 'Writing' }
	];

	const current = $derived(page.url.pathname);
</script>

<svelte:head>
	<link rel="alternate" type="application/rss+xml" title="GodYtteria" href="/rss.xml" />
</svelte:head>

<a class="skip" href="#main">Skip to content</a>

<header>
	<div class="wrap bar">
		<a class="brand" href="/">
			<span class="logo" aria-hidden="true"></span>
			GodYtteria
		</a>
		<nav aria-label="Main">
			{#each nav as item (item.href)}
				<a
					href={item.href}
					aria-current={current === item.href ||
					(item.href !== '/' && current.startsWith(item.href))
						? 'page'
						: undefined}>{item.label}</a
				>
			{/each}
		</nav>
		<button class="btn" type="button" id="theme-toggle" aria-pressed="false" hidden>Dark</button>
	</div>
</header>

<main id="main">
	<div class="wrap">
		{@render children()}
	</div>
</main>

<footer>
	<div class="wrap">
		<p>
			This site is a static build on GitHub Pages — the shop window for experiments that run on
			my own hardware.
		</p>
		<p>
			<a href="https://github.com/GodYtteria">github.com/GodYtteria</a> ·
			<a href="/rss.xml">RSS</a>
		</p>
	</div>
</footer>

<style>
	header {
		border-bottom: 1px solid var(--line);
	}

	.bar {
		display: flex;
		align-items: center;
		gap: 1.25rem;
		padding-top: 0.9rem;
		padding-bottom: 0.9rem;
		flex-wrap: wrap;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-family: var(--mono);
		font-weight: 700;
		text-decoration: none;
	}

	nav {
		display: flex;
		gap: 1rem;
		margin-right: auto;
		font-family: var(--sans);
		font-size: 0.95rem;
	}

	nav a {
		text-decoration: none;
	}

	nav a[aria-current='page'] {
		text-decoration: underline;
		text-underline-offset: 4px;
	}

	main {
		padding-top: 2.5rem;
		padding-bottom: 3rem;
	}

	footer {
		border-top: 1px solid var(--line);
		padding: 1.5rem 0 2rem;
	}

	footer p {
		margin: 0 0 0.3rem;
		font-size: 0.9rem;
		color: var(--ink-muted);
	}
</style>
