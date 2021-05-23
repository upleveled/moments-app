import * as React from 'react';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { Title } from 'components/typography';

interface HeadPageProps {
	href: string;
	icon?: string;
	title: string;
	rightComponent?: React.ReactNode;
	onClick?: () => void;
}

export const HeadPage: React.FC<HeadPageProps> = ({
	href,
	icon = '/images/icons/back-arrow.svg',
	title,
	onClick,
	rightComponent,
}) => {
	return (
		<div className="flex items-center justify-between mb-8 mt-8 px-5">
			<div className="flex items-center">
				<Link href={href}>
					<div className="cursor-pointer" onClick={() => onClick && onClick()}>
						<Icon src={icon} className="mr-4 text-primary" />
					</div>
				</Link>
				<Title type="2" className="text-primary capitalize">
					{title}
				</Title>
			</div>
			{rightComponent}
		</div>
	);
};
