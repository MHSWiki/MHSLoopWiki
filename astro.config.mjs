import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	site: 'https://mhsloop.netlify.app',
	integrations: [
		starlight({
			title: 'MHS Loop Wiki',
			tableOfContents: false, // Disables the right-hand sidebar
			sidebar: [
				{ label: '🚀 Start Here / Masterplan', link: '/' },
				{ label: '🏍️ Bike Rentals', link: 'essentials/rentals' },
				{ label: '🎒 Packing & Gear', link: 'essentials/gear' },
				{ label: '🗺️ The Route & GPX', link: 'route/map' },
				{ label: '🏘️ Pai Guide', link: 'towns/pai' },
				{ label: '🏯 Mae Hong Son City', link: 'towns/mae-hong-son' },
				{ label: '🛶 Mae Sariang Guide', link: 'towns/mae-sariang' },
				{ label: '🛡️ Safety & Insurance', link: 'safety' },
			],
			customCss: [
				'./src/styles/custom.css',
			],
		}),
	],
});
