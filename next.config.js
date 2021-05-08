const path = require('path');
const withPWA = require('next-pwa');

module.exports = withPWA({
	pwa: {
		dest: 'public',
	},
	i18n: {
		locales: ['en', 'es'],
		defaultLocale: 'en',
	},
	images: {
		domains: ['res.cloudinary.com'],
	},
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.po/,
			use: [
				{
					loader: '@lingui/loader',
				},
			],
		});
		return config;
	},
});
