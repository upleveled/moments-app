import * as React from 'react';
import clsx from 'clsx';

interface BodyTextProps {
	type?: '1' | '2' | '3';
	className?: string;
	text?: string;
}

export const BodyText: React.FC<BodyTextProps> = ({
	type = '1',
	text = '',
	children,
	className,
}) => {
	if (type === '2') {
		return (
			<p className={clsx('font-serif text-lg font-normal', className)}>
				{text || children}
			</p>
		);
	} else if (type === '3') {
		return (
			<p className={clsx('font-serif text-base font-normal', className)}>
				{text || children}
			</p>
		);
	}
	return (
		<p className={clsx('font-sans text-lg font-medium', className)}>
			{text || children}
		</p>
	);
};
