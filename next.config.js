const path = require('path');

module.exports = {
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
};
