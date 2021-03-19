import * as React from 'react';
// import moment from 'moment'
import { Subtitle, Title } from 'components/typography';

interface HeadMomentProps {
	leftContent: React.ReactNode;
	rightContent: React.ReactNode;
}

export const HeadMoments: React.FC<HeadMomentProps> = ({
	rightContent,
	leftContent,
}) => {
	return (
		<div className="flex items-center justify-between pb-4 pt-8 px-5 border-b-2 border-primary-10">
			<Title type="2" className="text-primary">
				{leftContent}
			</Title>
			<Subtitle type="2" className="text-right text-primary-60">
				{rightContent}
			</Subtitle>
		</div>
	);
};
