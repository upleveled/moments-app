import * as React from 'react';
import { Alert } from 'components/alert';
import { Toggle } from 'components/forms';
import { SecondaryCard } from 'components/insights';
import { Layout } from 'components/layout/layout';
import { NavBar } from 'components/nav-bar';
import { BodyText, Subtitle, Title } from 'components/typography';
import { useTheme } from 'hooks/theme';
import { useModal } from 'hooks/use-modal';
import { firebaseClient } from 'lib';

const Settings: React.FC = () => {
	const { show, hide, isShow, Modal } = useModal();
	const { theme, setTheme } = useTheme();
	return (
		<Layout className="bg-background">
			<div className="flex justify-between mt-8 px-5">
				<div className="flex flex-col">
					<Title type="2" className="text-primary">
						Hello,
					</Title>
					<BodyText type="1" className="text-primary-60">
						Nathan Drake
					</BodyText>
				</div>
				<Subtitle type="1" className="text-secondary">
					Upgrade to PRO
				</Subtitle>
			</div>
			<ul className="grid gap-3 content-start mt-10 px-5">
				<SecondaryCard href="/settings/reminders" title="Reminders" icon="⏰" />
				<SecondaryCard
					href="/settings/billing"
					title="Billing. Get PRO"
					icon="💳️"
				/>
				<div className="flex items-center justify-between px-6 h-16 bg-background-nav rounded-2.5xl">
					<div className="flex items-center">
						<span className="mr-5 text-2xl">🌙</span>
						<Subtitle type="2" className="text-primary">
							Dark Theme
						</Subtitle>
					</div>
					<Toggle
						isActive={theme === 'dark'}
						onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
					/>
				</div>
				<div
					className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl"
					onClick={show}
				>
					<span className="mr-5 text-2xl">😴</span>
					<Subtitle type="2" className="text-primary">
						Log out
					</Subtitle>
				</div>
				<a href="mailto:diego.ags04@gmail.com">
					<div className="flex items-center px-6 h-16 bg-background-nav rounded-2.5xl">
						<span className="mr-5 text-2xl">💬</span>
						<Subtitle type="2" className="text-primary">
							Contact Us
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

export default Settings;
