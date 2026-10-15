<script lang="ts">
	let { id, title }: { id: string; title: string } = $props();
</script>

<figure>
	<iframe
		src="https://www.youtube-nocookie.com/embed/{id}"
		{title}
		loading="lazy"
		referrerpolicy="strict-origin-when-cross-origin"
		allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture"
		allowfullscreen
	></iframe>
	<figcaption class="label">{title}</figcaption>
</figure>

<style>
	figure {
		margin: 2rem 0;
	}

	iframe {
		width: 100%;
		aspect-ratio: 16 / 9;
		border: 1px solid var(--line);
		border-radius: 4px;
		display: block;
	}

	figcaption {
		margin-top: 0.4rem;
	}
</style>
