<script lang="ts">
	import { site } from '#lib/site';

	let {
		title,
		description,
		path,
		type = 'website',
		noindex = false
	}: {
		title: string;
		description: string;
		path: string;
		type?: 'website' | 'article';
		noindex?: boolean;
	} = $props();

	const url = $derived(`${site.url}${encodeURI(path)}`);
	const full = $derived(title === site.title ? title : `${title} — ${site.title}`);
	const image = $derived(`${site.url}/og.png`);
	const imageAlt = 'GodYtteria — game dev, white-hat, ML systems, since 2011';
</script>

<svelte:head>
	<title>{full}</title>
	<meta name="description" content={description} />
	{#if noindex}
		<meta name="robots" content="noindex" />
	{:else}
		<link rel="canonical" href={url} />
	{/if}

	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={site.title} />
	<meta property="og:title" content={full} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={image} />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={imageAlt} />

	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={full} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={imageAlt} />
</svelte:head>
