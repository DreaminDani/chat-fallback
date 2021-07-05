import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		prerender: {
			enabled: false
		},
		adapter: adapter({
			pages: 'docs',
			assets: 'docs',
			fallback: null
		})
	}
};

export default config;