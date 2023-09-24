import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		alias: {
			$appCSS: './src/app.postcss',
			$lib: './src/lib',
			'$lib/*': './src/lib/*',
			'$core/*': './src/core/*',
			'$features/*': './src/features/*',
			$appConfig: './src/config.ts',
			$awsExports: './src/aws-exports.js',
			$models: './src/models',
			'$graphql/*': './src/graphql/*',
			'$tests/*': './tests/*'
		}
	},
	vitePlugin: {
		inspector: {
			showToggleButton: 'active',
			toggleButtonPos: 'bottom-right',
			toggleKeyCombo: 'control-shift'
		}
	}
};

export default config;
