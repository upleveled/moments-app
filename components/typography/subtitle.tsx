import * as React from 'react';
import clsx from 'clsx';

interface SubtitleProps {
	type?: '1' | '2' | '3';
	className?: string;
	text?: string;
}

export const Subtitle: React.FC<SubtitleProps> = ({
	type = '1',
	text = '',
	children,
	className,
}) => {
	if (type === '2') {
		return (
			<h4 className={clsx('font-sans text-sm font-semibold', className)}>
				{text || children}
			</h4>
		);
	} else if (type === '3') {
		return (
			<h5 className={clsx('font-sans text-sm font-normal', className)}>
				{text || children}
			</h5>
		);
	}
	return (
		<h3 className={clsx('font-sans text-lg font-semibold', className)}>
			{text || children}
		</h3>
	);
};
