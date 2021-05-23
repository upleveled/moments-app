import * as React from 'react';
import SVG from 'react-inlinesvg';
import { HeadPage } from 'components/head-page';
import { Layout } from 'components/layout';
import { Subtitle } from 'components/typography';
import { Button } from 'components/button';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import { Icon } from 'components/icon';

const Billing: React.FC = () => {
	const router = useRouter();
	const { theme } = useTheme();
	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadPage href="/settings" title="Upgrade to PRO" />
			<div className="flex flex-col items-center px-5">
				<SVG
					src={
						theme === 'dark'
							? '/images/svgs/dark/get-pro-dark.svg'
							: '/images/svgs/get-pro.svg'
					}
					width="239"
					height="217"
				/>
				<Subtitle
					type="1"
					className="mt-6 w-full text-primary text-center mb-6"
				>
					Unlock these features
				</Subtitle>
				<ul className="w-full grid gap-4">
					<Subtitle type="3" className="text-primary flex items-center">
						<Icon src="/images/icons/pro-icon.svg" className="mr-3" /> Dark
						Theme.
					</Subtitle>
					<Subtitle type="3" className="text-primary flex items-center">
						<Icon src="/images/icons/pro-icon.svg" className="mr-3" />
						Unlimited characters for captions.
					</Subtitle>
					<Subtitle type="3" className="text-primary flex items-center">
						<Icon src="/images/icons/pro-icon.svg" className="mr-3" />
						HD quality media compression.
					</Subtitle>
					<Subtitle type="3" className="text-primary flex items-center">
						<Icon src="/images/icons/pro-icon.svg" className="mr-3" />
						Increased limit upload file to 20MB.
					</Subtitle>
					<Subtitle type="3" className="text-primary flex items-center">
						<Icon src="/images/icons/pro-icon.svg" className="mr-3" />
						Mutiple types of media in a moment.
					</Subtitle>
				</ul>
				<Subtitle className="mb-6 mt-6 text-primary" type="3">
					We use Buy Me a Coffee service to manage our subscriptions. After you
					paid your plan get back here and validate your email subscription.
				</Subtitle>
				<Button
					onClick={() => null}
					className="mb-4 bg-[#FFDD00] text-[#0D0C23]"
				>
					<Icon src="/images/icons/bmc-full-logo.svg" height="34" width="155" />
				</Button>
				<Button
					onClick={() => router.push('/settings/billing/validate')}
					className="mb-10"
					isFill={false}
				>
					Validate email subscription
				</Button>
			</div>
		</Layout>
	);
};

export default Billing;
