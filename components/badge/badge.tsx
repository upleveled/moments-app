import * as React from 'react';

type BadgeProps = {
	onClick: () => void;
	text?: string;
};

export const Badge: React.FC<BadgeProps> = ({ onClick, text, children }) => {
	return (
		<span
			className="absolute bottom-2 right-2 px-2.5 py-0.5 text-primary text-xs font-medium bg-background rounded-full"
			onClick={(e) => {
				e.stopPropagation();
				onClick();
			}}
			onTouchStart={(e) => {
				e.stopPropagation();
				onClick();
			}}
		>
			{text || children}
		</span>
	);
};
