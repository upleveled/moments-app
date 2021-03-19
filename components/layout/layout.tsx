import clsx from 'clsx';
import * as React from 'react';

interface LayoutProps {
	className: string;
	withNavBar?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({
	className,
	withNavBar = true,
	children,
}) => {
	return (
		<div
			style={{ gridTemplateRows: 'auto 1fr' }}
			className={clsx(
				'relative grid w-full min-h-screen',
				{ 'pb-32': withNavBar },
				{ 'pb-6': !withNavBar },
				className
			)}
		>
			{children}
		</div>
	);
};
