import * as React from 'react';
import SVG from 'react-inlinesvg';
import clsx from 'clsx';

interface ButtonProps {
	onClick: () => void;
	text?: string;
	icon?: string;
	className?: string;
	isFill?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
	onClick,
	text,
	icon,
	className,
	children,
	isFill = true,
}) => {
	return (
		<button
			className={clsx(
				'relative flex items-center justify-center px-6 w-full h-16 font-semibold rounded-2.5xl',
				{ 'text-background-nav bg-primary': isFill },
				{
					'text-primary bg-transparent border-solid border-2 border-primary': !isFill,
				},
				className
			)}
			onClick={onClick}
		>
			{icon && (
				<div className="absolute left-6 flex items-center h-full">
					<SVG src={icon} width="21" height="21" />
				</div>
			)}
			{children || text}
		</button>
	);
};
