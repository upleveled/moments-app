import * as React from 'react';
import Spinner from 'react-loader-spinner';
import { Caption } from 'components/typography';
import { useTheme } from 'next-themes';

export const Loader = () => {
	const { theme } = useTheme();
	return (
		<div className="fixed z-20 bottom-28 left-5 flex items-center">
			<Spinner
				type="Oval"
				visible={true}
				color={theme === 'light' ? '#110906' : '#f2f2f2'}
				height={24}
				width={24}
			/>
			<Caption className="ml-2 text-secondary">Creating...</Caption>
		</div>
	);
};
