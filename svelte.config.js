import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	kit: {
		target: '#svelte',
		// Comment the paths config, if you want to run in dev mode.
		// Remove if you're not using github pages (or don't need rel url)
		paths: {
			base: '/chat-fallback', // replace this with your url
			assets: '/chat-fallback' // replace this with your url
		},
		adapter: adapter({
			// default options are shown
			pages: 'build',
			assets: 'build',
			fallback: null
		})
	}
};

export default config;