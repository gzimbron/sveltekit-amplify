/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: [
			{
				mytheme: {
					primary: '#49d8b4',
					secondary: '#f497bb',
					accent: '#410ea0',
					neutral: '#1e2124',
					'base-100': '#edebf4',
					info: '#5177e1',
					success: '#36d399',
					warning: '#f7ad5e',
					error: '#ed6474'
				}
			}
		]
	},
	theme: {
		extend: {}
	},

	plugins: [require('daisyui')]
};

module.exports = config;
