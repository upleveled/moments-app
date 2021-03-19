import * as React from 'react';
import Link from 'next/link';
import moment from 'moment';
import { Caption, Subtitle } from 'components/typography';

export interface CardMemoryProps {
	isAgreatDay: boolean;
	stars: number;
	date: string;
	momentsCount: number;
}

export const CardMemory: React.FC<CardMemoryProps> = ({
	isAgreatDay,
	stars,
	date,
	momentsCount,
}) => {
	return (
		<Link href={`/memories/${moment(date).format('MM-DD-YYYY')}`}>
			<div
				className="flex flex-col justify-between px-6 py-5 bg-background-nav cursor-pointer"
				style={{ borderRadius: 20 }}
			>
				<div className="flex flex-col">
					<Subtitle type="1" className="text-primary">
						{moment(date).format('ddd, Do MMM')}
					</Subtitle>
					<Subtitle type="2" className="mb-5 text-primary-60">
						{moment(date).format('YYYY')}
					</Subtitle>
				</div>
				<div className="flex flex-col">
					<Subtitle type="1" className="text-primary">
						{momentsCount} Moments
					</Subtitle>
					{!!stars && (
						<Subtitle type="1" className="text-primary">
							{stars} Stars
						</Subtitle>
					)}
					{isAgreatDay && (
						<Caption type="2" className="mt-1 text-secondary">
							You had a great day
						</Caption>
					)}
				</div>
			</div>
		</Link>
	);
};
