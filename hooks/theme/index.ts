import { ThemeContext } from 'context';
import * as React from 'react';

export const useTheme = () => {
	const { theme, setTheme } = React.useContext(ThemeContext);

	return {
		theme,
		setTheme,
	};
};
