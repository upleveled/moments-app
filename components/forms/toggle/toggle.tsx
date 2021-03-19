import clsx from 'clsx';
import * as React from 'react';

interface ToggleProps {
	isActive: boolean;
	isDisabled?: boolean;
	onClick: () => void;
}

export const Toggle: React.FC<ToggleProps> = ({
	isActive,
	onClick,
	isDisabled = false,
}) => {
	return (
		<div
			onClick={() => !isDisabled && onClick()}
			className={clsx(
				'group relative flex items-center w-14 h-8 cursor-pointer transition-all duration-300',
				{ 'bg-primary-20 hover:bg-primary-40': !isActive && !isDisabled },
				{ 'bg-primary': isActive && !isDisabled },
				{ 'bg-primary-60': isDisabled && isActive },
				{ 'bg-primary-10': isDisabled && !isActive }
			)}
			style={{ borderRadius: '40px' }}
		>
			<div
				className={clsx(
					'w-8 h-8 bg-offwhite border-2 rounded-full transform transition-all duration-300',
					{ 'translate-x-3/4': isActive },
					{
						'border-primary-20 group-hover:border-primary-40':
							!isActive && !isDisabled,
					},
					{ 'border-primary': isActive && !isDisabled },
					{ 'border-primary-60': isDisabled && isActive },
					{ 'border-primary-10': isDisabled && !isActive }
				)}
			></div>
		</div>
	);
};
