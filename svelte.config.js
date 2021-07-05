import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		// Remove if you're not using github pages (or don't need rel url)
		paths: {
			base: '/chat-fallback', // replace this with your url
			assets: '/chat-fallback' // replace this with your url
		},
		adapter: adapter({
			// default options are shown
			pages: 'docs',
			assets: 'docs',
			fallback: null
		})
	}
};

export default config;