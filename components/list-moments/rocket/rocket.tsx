import { useTheme } from 'hooks/theme';
import * as React from 'react';
import SVG from 'react-inlinesvg';

export const Rocket: React.FC = () => {
	const { theme } = useTheme();
	return (
		<div
			className="absolute h-full"
			style={{ bottom: 0, left: 'calc(50% - 6px)' }}
		>
			<div
				className="absolute z-10 -top-3"
				style={{ left: 'calc(50% - 14px)' }}
			>
				<SVG
					src={
						theme === 'dark'
							? '/images/svgs/dark/rocket-dark.svg'
							: '/images/svgs/rocket.svg'
					}
					width="28"
				/>
			</div>
			<div
				className="w-3 h-full bg-background-rocket"
				style={{ clipPath: 'polygon(0 0, 100% 0, 90% 100%, 10% 100%)' }}
			></div>
			<div className="absolute bottom-0" style={{ left: 'calc(50% - 38.5px)' }}>
				<SVG
					src={
						theme === 'dark'
							? '/images/svgs/dark/rocket-smoke-dark.svg'
							: '/images/svgs/rocket-smoke.svg'
					}
					width="77"
				/>
			</div>
		</div>
	);
};
