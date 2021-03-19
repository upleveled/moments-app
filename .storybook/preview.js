//@ts-nocheck
import { themes } from '@storybook/theming';
import '../styles/global-tailwind.css';

export const parameters = {
	darkMode: {
		dark: { ...themes.dark },
		light: { ...themes.normal },
		current: 'dark',
	},
	layout: 'centered',
	actions: { argTypesRegex: '^on[A-Z].*' },
};
