import { HeadMoments } from 'components/head-moments';
import { Icon } from 'components/icon';
import { Layout } from 'components/layout/layout';
import { Title } from 'components/typography';
import Link from 'next/link';
import * as React from 'react';
import { ListMoments } from 'components/list-moments';
import { useMomentsFavorite } from 'hooks/api';
import { EmptyState } from 'components/empty-state';
import { Loader } from 'components/loader';

const FavoriteMoments: React.FC = () => {
	const { moments, isError, isLoading } = useMomentsFavorite();
	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadMoments
				leftContent={
					<div className="flex items-center">
						<Link href="/memories">
							<div className="cursor-pointer">
								<Icon src="/images/icons/back-arrow.svg" />
							</div>
						</Link>
						<Title type="2" className="ml-4">
							Memories
						</Title>
					</div>
				}
				rightContent={`${moments ? moments.length : 0} Favorites`}
			/>
			{isLoading && <Loader />}
			{moments && !isError && !moments.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state-rocket.svg"
					darkIlustration="/images/svgs/dark/empty-state-rocket-dark.svg"
					ilustrationSize="218"
					description="Start saving moments as favorites to see them here."
				/>
			)}
			{!!moments && <ListMoments moments={moments} />}
		</Layout>
	);
};

export default FavoriteMoments;
