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
				{ label: '🗺️ The Route', link: 'route/map' },
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
