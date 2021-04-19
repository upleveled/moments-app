import * as React from 'react';
import { useMoments } from 'hooks/api';
import { NavBar } from 'components/nav-bar';
import moment from 'moment';
import clsx from 'clsx';
import styles from 'styles/pages/home.module.scss';
import { ListMoments } from 'components/list-moments';
import { HeadMoments } from 'components/head-moments';
import { EmptyState } from 'components/empty-state';
import { GetServerSideProps } from 'next';
import { Loader } from 'components/loader';
import { useIsCreatingMoment } from 'hooks';
import { Trans } from '@lingui/macro';

const Home: React.FC = () => {
	const { isCreatingMoment } = useIsCreatingMoment();
	const { moments, isLoading, isError, mutate } = useMoments({
		revalidateOnMount: false,
	});

	React.useEffect(() => {
		if (!isCreatingMoment) {
			mutate();
		}
	}, [isCreatingMoment]);

	return (
		<div
			className={clsx(
				'relative grid pb-32 w-full min-h-screen bg-background',
				styles.homeContainer
			)}
		>
			<HeadMoments
				leftContent={
					<>
						How is your
						<br /> day going? ☀️
					</>
				}
				rightContent={moment().format('Do MMM')}
			/>
			{isLoading && <Loader />}
			{moments && !isError && !moments.length && (
				<EmptyState
					ilustration="/images/svgs/empty-state.svg"
					darkIlustration="/images/svgs/dark/empty-state-home-dark.svg"
					ilustrationSize="269"
					description={<Trans>Start journaling today’s moments</Trans>}
				/>
			)}
			{moments && !!moments.length && <ListMoments moments={moments} />}
			<NavBar />
		</div>
	);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
	const isAuth = context.req.cookies?.auth;
	if (!isAuth) {
		return {
			redirect: {
				destination: '/auth',
				permanent: false,
			},
		};
	}

	return {
		props: {},
	};
};

export default Home;
