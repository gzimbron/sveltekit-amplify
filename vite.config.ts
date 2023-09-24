import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
	test: {
		include: ['tests/**/*.{test,spec}.{js,ts}']
	},
	resolve: {
		alias: {
			'./runtimeConfig': './runtimeConfig.browser'
		}
	},
	build: {
		chunkSizeWarningLimit: 1024
	}
});
