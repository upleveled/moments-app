import * as React from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Trans, t } from '@lingui/macro';
import cookies from 'js-cookie';
import { firebaseClient } from 'lib';
import { Alert } from 'components/alert';
import { Toggle } from 'components/forms';
import { SecondaryCard } from 'components/insights';
import { Layout } from 'components/layout/layout';
import { NavBar } from 'components/nav-bar';
import { BodyText, Subtitle, Title } from 'components/typography';
import { useModal } from 'hooks/use-modal';
import { useUser } from 'hooks/user/useUser';

const Settings: React.FC = () => {
	const user = useUser();
	const router = useRouter();
	const { show, hide, isShow, Modal } = useModal();
	const { theme, setTheme } = useTheme();

	React.useEffect(() => {
		if (!user) {
			router.push('/auth');
		}
	}, [user]);

	const onChangeLang = () => {
		const newLocale = router.locale === 'es' ? 'en' : 'es';
		cookies.set('NEXT_LOCALE', newLocale, {
			expires: 1 * 365,
			sameSite: 'Strict',
		});
		router.push(router.pathname, router.pathname, {
			locale: newLocale,
		});
	};

	return (
		<Layout className="bg-background">
			<div className="flex justify-between mt-8 px-5">
				<div className="flex flex-col">
					<Title type="2" className="text-primary">
						<Trans>Hello</Trans>,
					</Title>
					<BodyText type="1" className="text-primary-60">
						Nathan Drake
					</BodyText>
				</div>
				<Subtitle type="1" className="text-secondary">
					<Trans>Upgrade to PRO</Trans>
				</Subtitle>
			</div>
			<ul className="grid gap-3 content-start mt-10 px-5">
				<SecondaryCard
					href="/settings/reminders"
					title={t`Reminders`}
					icon="⏰"
				/>
				<SecondaryCard
					href="/settings/billing"
					title={t`Billing. Get PRO`}
					icon="💳️"
				/>

				{/* THEME */}
				<div className="flex items-center justify-between px-6 h-16 bg-background-nav rounded-2.5xl">
					<div className="flex items-center">
						<span className="mr-5 text-2xl">🌙</span>
						<Subtitle type="2" className="text-primary">
							<Trans>Dark Theme</Trans>
						</Subtitle>
					</div>
					<Toggle
						isActive={theme === 'dark'}
						onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
					/>
				</div>

				{/* Multilang */}
				<div className="flex items-center justify-between px-6 h-16 bg-background-nav rounded-2.5xl">
					<div className="flex items-center">
						<span className="mr-5 text-2xl">🌙</span>
						<Subtitle type="2" className="text-primary">
							<Trans>Spanish</Trans>
						</Subtitle>
					</div>
					<Toggle isActive={router.locale === 'es'} onClick={onChangeLang} />
				</div>

				<div
					className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl"
					onClick={show}
				>
					<span className="mr-5 text-2xl">😴</span>
					<Subtitle type="2" className="text-primary">
						<Trans>Log out</Trans>
					</Subtitle>
				</div>
				<a href="mailto:diego.ags04@gmail.com">
					<div className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl">
						<span className="mr-5 text-2xl">💬</span>
						<Subtitle type="2" className="text-primary">
							<Trans>Contact Us</Trans>
						</Subtitle>
					</div>
				</a>
			</ul>
			<Modal isShow={isShow}>
				<Alert
					title="Are you sure?"
					description="You will close your account session for this device."
					cancelText="Cancel"
					successText="Log out"
					closeAlert={hide}
					onClickSuccess={() => firebaseClient.auth().signOut()}
				/>
			</Modal>
			<NavBar />
		</Layout>
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

export default Settings;
