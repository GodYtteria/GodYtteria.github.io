import { sveltekit } from '@sveltejs/kit/vite';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		sveltekit({
			extensions: ['.svelte', '.md'],
			preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })],
			adapter: adapter({ pages: 'build', assets: 'build', fallback: undefined, precompress: false, strict: true })
		})
	],
	build: { sourcemap: false },
	server: { host: '127.0.0.1' }
});
