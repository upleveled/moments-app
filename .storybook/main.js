//@ts-nocheck
const path = require('path');

module.exports = {
	stories: [
		'../components/**/*.stories.mdx',
		'../components/**/*.stories.@(js|jsx|ts|tsx)',
		'../stories/**/*.stories.mdx',
		'../stories/**/*.stories.@(js|jsx|ts|tsx)',
	],
	addons: [
		'@storybook/addon-links',
		'@storybook/addon-essentials',
		{
			name: '@storybook/preset-scss',
			options: {
				sassLoaderOptions: {
					sassOptions: {
						includePaths: [path.join(__dirname, '../styles')],
					},
				},
			},
		},
		'storybook-dark-mode',
	],
};
