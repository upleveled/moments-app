import { Trans } from '@lingui/macro';
import { HeadPage } from 'components/head-page';
import { Layout } from 'components/layout';
import { Caption, Subtitle } from 'components/typography';
import * as React from 'react';

const Validate: React.FC = () => {
	const [email, setEmail] = React.useState('');
	return (
		<Layout className="bg-background-nav" withNavBar={false}>
			<HeadPage
				href="/settings/billing"
				title="Validate Email"
				icon="/images/icons/close.svg"
				rightComponent={<button>activate</button>}
			/>
			<div className="px-5">
				<input
					type="text"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className="flex items-center mb-3 px-6 w-full h-16 bg-background-input border-none rounded-2xl"
				/>
				<Subtitle type="2" className="mb-11 text-primary-40">
					<Trans>Same email you used in Buy Me a Coffee.</Trans>
				</Subtitle>
				<div className="flex flex-col items-center mx-auto w-56">
					<Caption className="text-center text-primary-60">
						<Trans>
							You can only use one email subscription per account.
							<br />
							<br />
							If you have any problem with your subscription contact us.
						</Trans>
					</Caption>
				</div>
			</div>
		</Layout>
	);
};

export default Validate;
