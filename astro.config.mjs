import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://mhsloopwiki.netlify.app',
	integrations: [
		starlight({
			title: 'MHS Loop Wiki',
			tableOfContents: false, // Disables the right-hand sidebar
			sidebar: [
				{ label: '🚀 Start Here / Masterplan', link: '/' },
				{ label: '🏍️ Bike Rentals', link: 'essentials/rentals' },
				{ label: '🎒 Packing & Gear', link: 'essentials/gear' },
				{
					label: '🗺️ The Route',
					items: [
						{ label: 'Route Overview & Planning', link: 'route/overview' },
						{
							label: 'Clockwise Itineraries',
							items: [
								{ label: '3-Day Route (Express)', link: 'route/clockwise/3-day' },
								{ label: '4-Day Route (Standard)', link: 'route/clockwise/4-day' },
								{ label: '5-Day Route (Deep Dive)', link: 'route/clockwise/5-day' },
							]
						},
						{
							label: 'Counter-Clockwise Itineraries',
							items: [
								{ label: '3-Day Route (Blitz)', link: 'route/counter-clockwise/3-day' },
								{ label: '4-Day Route (Explorer)', link: 'route/counter-clockwise/4-day' },
								{ label: '5-Day Route (Slow & Deep)', link: 'route/counter-clockwise/5-day' },
							]
						},
					],
				},
				{ label: '🏘️ Pai City Guide', link: 'towns/pai' },
				{ label: '🏯 Mae Hong Son City Guide', link: 'towns/mae-hong-son' },
				{ label: '🛶 Mae Sariang City Guide', link: 'towns/mae-sariang' },
				{ label: '🛡️ Safety & Insurance', link: 'safety' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
	],
});
