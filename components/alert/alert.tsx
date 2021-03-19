import clsx from 'clsx';
import { Subtitle } from 'components/typography';
import { useTheme } from 'hooks/theme';
import * as React from 'react';

interface AlertProps {
	title: string;
	description: string;
	cancelText: string;
	successText: string;
	closeAlert: () => void;
	onClickSuccess?: () => void;
}

export const Alert: React.FC<AlertProps> = ({
	title,
	description,
	cancelText,
	successText,
	closeAlert,
	onClickSuccess,
}) => {
	const { theme } = useTheme();
	return (
		<div className={clsx('flex flex-col w-64 bg-background rounded-lg', theme)}>
			<div className="flex flex-col px-10 py-6">
				<h3 className="mb-4 text-center text-primary font-sans text-lg font-semibold">
					{title}
				</h3>
				<p className="text-center text-primary-60 font-sans text-sm font-normal">
					{description}
				</p>
			</div>
			<div className="flex h-14 border-t-2 border-primary-10">
				<div
					className="flex items-center justify-center w-1/2 border-r border-primary-10 cursor-pointer"
					onClick={() => closeAlert()}
				>
					<Subtitle className="text-primary-60">{cancelText}</Subtitle>
				</div>
				<div
					className="flex items-center justify-center w-1/2 border-l border-primary-10 cursor-pointer"
					onClick={() => (onClickSuccess ? onClickSuccess() : null)}
				>
					<Subtitle className="text-secondary">{successText}</Subtitle>
				</div>
			</div>
		</div>
	);
};
