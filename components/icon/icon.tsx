import clsx from 'clsx';
import * as React from 'react';
import SVG from 'react-inlinesvg';
import styles from './icon.module.scss';

interface IconProps {
	src: string;
	width?: string;
	height?: string;
	className?: string;
	pointer?: boolean;
	fill?: boolean;
}

export const Icon: React.FC<IconProps> = ({
	src,
	width = '24',
	height = '24',
	className,
	pointer = false,
	fill,
}) => {
	return (
		<SVG
			src={src}
			width={width}
			height={height}
			className={clsx(className, styles.svg, [fill && styles.svgFill], {
				'cursor-pointer': pointer,
			})}
		/>
	);
};
