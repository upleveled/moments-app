import * as React from 'react';
import SVG from 'react-inlinesvg';
import { useRouter } from 'next/router';
import { firebaseClient } from 'lib';
import { BodyText, Caption, Title } from 'components/typography';
import { Button } from 'components/button';
import { useTheme } from 'next-themes';
import { useUser } from 'hooks/user/useUser';

const Auth: React.FC = () => {
	const user = useUser();
	const router = useRouter();
	const { theme } = useTheme();
	// const [isLoading, setIsLoading] = React.useState(false);

	const handleSigninProvider = () => {
		// setIsLoading(true);
		const firebaseProvider = new firebaseClient.auth.GoogleAuthProvider();
		firebaseClient
			.auth()
			.signInWithPopup(firebaseProvider)
			.then(async () => {
				// setIsLoading(false);
				router.push('/');
			})
			.catch(function (error) {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log({ errorCode, errorMessage });
				// setIsLoading(false);
				return;
			});
	};

	React.useEffect(() => {
		if (user?.token) {
			router.push('/');
		}
	}, [user]);

	return (
		<div className="grid pb-8 px-8 w-full h-full min-h-screen bg-background">
			<div className="absolute right-0 top-0">
				<SVG
					src={
						theme === 'dark'
							? '/images/svgs/dark/auth-ilustration-dark.svg'
							: '/images/svgs/auth-ilustration.svg'
					}
					width="225"
					height="227"
				/>
			</div>
			<div className="z-10">
				<Title type="1" className="mb-6 pt-36 text-primary">
					Welcome <br />
					to Moments
				</Title>
				<BodyText type="3" className="text-primary-60">
					{`Life is full of moments, some will be great, others don't, and some would be ok.`}
					<br />
					<br />
					The best ones are full of details, we want you to start appreciating
					the beauty of each moment through your day and that you can remember
					the best.
				</BodyText>
			</div>
			<div className="self-end">
				<Button
					icon="/images/svgs/google-icon.svg"
					onClick={handleSigninProvider}
				>
					Continue with Google
				</Button>
				<div style={{ maxWidth: '289px', margin: '0 auto' }}>
					<Caption type="1" className="mt-4 text-center text-primary-60">
						By continuing you are agree with our Terms and Conditions, and our
						Privacy Policies.
					</Caption>
				</div>
			</div>
		</div>
	);
};

export default Auth;
