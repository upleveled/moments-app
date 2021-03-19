import * as React from 'react';
import clsx from 'clsx';

interface EmojiBoxprops {
	emoji: string;
	isSelected?: boolean;
	onClick: () => void;
}

export const EmojiBox: React.FC<EmojiBoxprops> = ({
	emoji,
	isSelected = false,
	onClick,
}) => {
	return (
		<div
			onClick={onClick}
			className={clsx(
				'flex items-center justify-center w-12 h-12 text-lg border-4 rounded-lg cursor-pointer transition-colors duration-200',
				{ 'border-secondary-light bg-offwhite': isSelected },
				{ 'border-background-input bg-background-input': !isSelected }
			)}
		>
			{emoji}
		</div>
	);
};
