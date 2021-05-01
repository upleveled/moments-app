import * as React from 'react';
import moment from 'moment';
import { EmptyState } from 'components/empty-state';
import { MainCard, SecondaryCard } from 'components/insights';
import { Layout } from 'components/layout/layout';
import { NavBar } from 'components/nav-bar';
import { Subtitle, Title } from 'components/typography';
import { useInsigthMoments } from 'hooks/api';
import { Loader } from 'components/loader';

const Insights = () => {
	const { insights, isError, isLoading, error } = useInsigthMoments();

	React.useEffect(() => {
		console.log(error);
	}, [error]);

	return (
		<Layout className="bg-background">
			<div className="flex mt-8 px-5">
				<Title type="2" className="text-primary">
					Insights
				</Title>
			</div>
			{isLoading && <Loader />}
			{!isError && !!insights && !insights.all_moments.aggregate.count && (
				<EmptyState
					ilustration="/images/svgs/empty-state-insight.svg"
					darkIlustration="/images/svgs/dark/empty-state-insight-dark.svg"
					ilustrationSize="250"
					description="Create moments to see their insights."
				/>
			)}
			{!isError && !!insights && !!insights.all_moments.aggregate.count && (
				<div className="mt-8 px-5">
					<div className="mb-8">
						<Subtitle type="2" className="mb-4 text-primary-60">
							Last 7 days
						</Subtitle>
						<div className="grid gap-4 grid-flow-col grid-cols-2">
							<MainCard
								icon="🚀"
								total={insights.moments_count.aggregate.count}
								description="Moments"
							/>
							<MainCard
								icon="🌟"
								total={insights.favorite_count.aggregate.count}
								description="Stars"
							/>
						</div>
					</div>
					<div className="flex flex-col">
						<Subtitle type="2" className="mb-4 text-primary-60">
							Top moments
						</Subtitle>
						<div className="grid gap-3">
							<SecondaryCard
								href={`/insights/weekly/${moment().week()}`}
								title="Best Weekly Moments"
								icon="✌️"
							/>
							<SecondaryCard
								href={`/insights/monthly/${moment().month()}`}
								title="Best Monthly Moments"
								icon="️💪"
							/>
							<SecondaryCard
								href={`/insights/yearly/${moment().year()}`}
								title="Best Yearly Moments"
								icon="️🙌"
							/>
						</div>
					</div>
				</div>
			)}
			<NavBar />
		</Layout>
	);
};

export default Insights;
