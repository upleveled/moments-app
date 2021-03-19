import * as React from 'react';
import moment from 'moment';
import { useRouter } from 'next/router';
import { Title } from 'components/typography';
import { Layout } from 'components/layout/layout';
import { HeadMoments } from 'components/head-moments';
import Link from 'next/link';
import { Icon } from 'components/icon';
import { ListMoments } from 'components/list-moments';
import { useMomentsByTimeAndPeriod } from 'hooks/api';
import { Loader } from 'components/loader';
import { EmptyState } from 'components/empty-state';

const InsightByPeriod = () => {
	const router = useRouter();
	const { time, period } = router.query;
	const { moments, isError, isLoading } = useMomentsByTimeAndPeriod(
		time as string,
		period as string
	);

	const humanPeriod = React.useMemo(() => {
		if (time === 'weekly') {
			const start = moment().week(Number(period)).startOf('week');
			const end = moment().week(Number(period)).endOf('week');
			return `${moment(start).format('ddd D')} - ${moment(end).format(
				'ddd D'
			)}`;
		} else if (time === 'monthly') {
			const month = moment().month(Number(period));
			return `${moment(month).format('MMMM')}`;
		} else if (time === 'yearly') {
			return period;
		}
	}, [period, time]);

	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadMoments
				leftContent={
					<div className="flex items-center">
						<Link href="/insights">
							<div className="cursor-pointer">
								<Icon src="/images/icons/back-arrow.svg" />
							</div>
						</Link>
						<Title type="2" className="ml-4 capitalize">
							{time}
						</Title>
					</div>
				}
				rightContent={humanPeriod}
			/>
			{isLoading && <Loader />}
			{!!moments && !isError && !moments.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state-insights-time.svg"
					darkIlustration="/images/svgs/dark/empty-state-insights-time-dark.svg"
					ilustrationSize="285"
					description="Start journaling today’s moments to see your best moments here"
				/>
			)}
			{moments && !isError && !!moments.length && (
				<ListMoments moments={moments} />
			)}
		</Layout>
	);
};

export default InsightByPeriod;
