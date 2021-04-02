import * as React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import { IsCreatingMomentContext, UserContext } from 'context';
import 'styles/global-tailwind.css';
import { useFirebaseUser } from 'hooks/user/useFirebaseUser';
import { Moment } from 'interfaces';
import { CurrentMomentContext } from 'context/current-moment';
import { DetailMoment } from 'components/detail-moment';
import { ThemeProvider, useTheme } from 'next-themes';
import { uploadFiles } from 'lib/upload-file';
import { createMoment, CreateMomentVariables } from 'gql/mutations';
import { Loader } from 'components/create-moment/loader';

function MyApp({ Component, pageProps }: AppProps) {
	const { theme, themes, resolvedTheme } = useTheme();
	const [currentMoment, setCurrentMoment] = React.useState<Moment | null>(null);
	const [isCreatingMoment, setIsCreatingMoment] = React.useState<boolean>(
		false
	);
	const user = useFirebaseUser();

	const handleCreateMoment = async (
		variables: CreateMomentVariables,
		images: File[] = []
	) => {
		setIsCreatingMoment(true);
		let correctImages = '';
		if (images.length) {
			correctImages = await uploadFiles(images);
		}
		await createMoment({
			token: user?.token || '',
			variables: {
				...variables,
				images: correctImages,
			},
		});
		setIsCreatingMoment(false);
	};

	React.useEffect(() => {
		if (currentMoment) {
			const scrollY = `${window.scrollY}px`;
			console.log({ scrollY });
			document.body.style.position = 'fixed';
			document.body.style.width = '100%';
			document.body.style.top = `-${scrollY}`;
		} else {
			const scrollY = document.body.style.top;
			document.body.style.position = '';
			document.body.style.top = '';
			window.scrollTo(0, parseInt(scrollY || '0') * -1);
		}
	}, [currentMoment]);

	React.useEffect(() => {
		console.log({ theme, themes, resolvedTheme });
	}, [theme, themes, resolvedTheme]);

	return (
		<ThemeProvider attribute="class">
			<UserContext.Provider value={user}>
				<IsCreatingMomentContext.Provider
					value={{ isCreatingMoment, handleCreateMoment }}
				>
					<CurrentMomentContext.Provider
						value={{ currentMoment, setCurrentMoment }}
					>
						<div>
							<Component {...pageProps} />
							<DetailMoment />
							{isCreatingMoment && <Loader />}
						</div>
					</CurrentMomentContext.Provider>
				</IsCreatingMomentContext.Provider>
			</UserContext.Provider>
		</ThemeProvider>
	);
}

export default MyApp;
