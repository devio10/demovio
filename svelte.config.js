import adapter from "@sveltejs/adapter-node";
import { sveltePreprocess } from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: sveltePreprocess({
		less: {
			silent: false,
		},
	}),
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true,
		},
	},
};

export default config;
