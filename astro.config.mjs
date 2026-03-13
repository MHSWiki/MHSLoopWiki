import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import astroPwa from '@vite-pwa/astro';

// https://astro.build/config
export default defineConfig({
	site: 'https://mhsloopwiki.netlify.app',
	integrations: [
		starlight({
			title: 'MHS Loop Wiki',
			tableOfContents: false, // Disables the right-hand sidebar
			head: [
				{ tag: 'link', attrs: { rel: 'manifest', href: '/manifest.webmanifest' } },
				{ tag: 'meta', attrs: { name: 'theme-color', content: '#1f2937' } },
				{ tag: 'script', content: `
					if ('serviceWorker' in navigator) {
						window.addEventListener('load', () => {
							navigator.serviceWorker.register('/sw.js');
						});
					}
				` }
			],
			sidebar: [
				{ label: '🚀 Start Here / Masterplan', link: '/' },
				{ label: '🏍️ Bike Rentals', link: 'essentials/rentals' },
				{ label: '🎒 Packing & Gear', link: 'essentials/gear' },
				{ label: '📱 Staying Connected: Data & eSIMs', link: 'essentials/esim' },
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
		astroPwa({
			registerType: 'autoUpdate',
			workbox: {
				globPatterns: ['**/*.{js,css,html,ico,png,svg,webp}'],
				maximumFileSizeToCacheInBytes: 5000000,
			},
			manifest: {
				name: 'MHS Loop Wiki',
				short_name: 'MHS Loop',
				description: 'The definitive guide to the Mae Hong Son loop.',
				theme_color: '#1f2937',
				background_color: '#1f2937',
				display: 'standalone',
				icons: [
					{
						src: '/favicon.svg',
						sizes: '192x192 512x512',
						type: 'image/svg+xml',
						purpose: 'any maskable'
					}
				]
			}
		}),
	],
});
