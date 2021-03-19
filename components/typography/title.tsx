import * as React from 'react';
import clsx from 'clsx';

interface TitleProps {
	type?: '1' | '2';
	className?: string;
	text?: string;
}

export const Title: React.FC<TitleProps> = ({
	type = '1',
	text = '',
	children,
	className,
}) => {
	if (type === '2') {
		return (
			<h2 className={clsx('font-sans text-2xl font-bold', className)}>
				{text || children}
			</h2>
		);
	}
	return (
		<h1 className={clsx('font-sans text-4xl font-bold', className)}>
			{text || children}
		</h1>
	);
};
