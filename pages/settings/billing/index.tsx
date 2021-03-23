import * as React from 'react';
import SVG from 'react-inlinesvg';
import { HeadPage } from 'components/head-page';
import { Layout } from 'components/layout';
import { BodyText } from 'components/typography';
import { Button } from 'components/button';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';

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
				<BodyText type="1" className="mt-6 w-full text-primary">
					Unlock these features:
				</BodyText>
				<ul className="w-full">
					<BodyText className="text-primary">- Dark theme.</BodyText>
					<BodyText className="text-primary">
						- Keep moments older than one month.
					</BodyText>
					<BodyText className="text-primary">
						- Albums for images and videos.
					</BodyText>
					<BodyText className="text-primary">
						- Increase limit upload file size.
					</BodyText>
					<BodyText className="text-primary">- Support the team ❤️</BodyText>
				</ul>
				<BodyText className="mb-8 mt-8 text-primary" type="1">
					We use Buy Me a Coffee service to manage our subscriptions. After you
					paid your plan get back here and validate your email subscription.
				</BodyText>
				<Button onClick={() => null} className="mb-4">
					Get PRO membership now
				</Button>
				<Button
					onClick={() => router.push('/settings/billing/validate')}
					className="mb-10"
					isFill={false}
				>
					Validate email membership
				</Button>
			</div>
		</Layout>
	);
};

export default Billing;
