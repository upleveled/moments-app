import * as React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import { IsCreatingMomentContext, UserContext } from 'context';
import 'styles/global-tailwind.css';
import { useFirebaseUser } from 'hooks/user/useFirebaseUser';
import momentjs from 'moment';
import { Moment } from 'interfaces';
import { CurrentMomentContext } from 'context/current-moment';
import { DetailMoment } from 'components/detail-moment';
import { ThemeProvider } from 'next-themes';
import { uploadFiles, uploadVideos } from 'lib/upload-file';
import { createMoment, CreateMomentVariables } from 'gql/mutations';
import { Loader } from 'components/create-moment/loader';

import { I18nProvider } from '@lingui/react';
import { i18n } from '@lingui/core';
import { defaultLocale, dynamicActiveLocale } from 'lib/i18n';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }: AppProps) {
	const router = useRouter();
	const [currentMoment, setCurrentMoment] = React.useState<Moment | null>(null);
	const [isCreatingMoment, setIsCreatingMoment] = React.useState<boolean>(
		false
	);
	const user = useFirebaseUser();

	const handleCreateMoment = async (
		variables: CreateMomentVariables,
		images: File[] = [],
		videos: File[] = []
	) => {
		setIsCreatingMoment(true);
		let correctImages = null;
		let correctVideos = null;
		if (images.length) {
			correctImages = await uploadFiles(images);
		}
		if (videos.length) {
			correctVideos = await uploadVideos(videos);
		}
		await createMoment({
			token: user?.token || '',
			variables: {
				...variables,
				images: correctImages,
				videos: correctVideos,
			},
		});
		setIsCreatingMoment(false);
	};

	React.useEffect(() => {
		if (currentMoment) {
			const scrollY = `${window.scrollY}px`;
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
		dynamicActiveLocale(router.locale || defaultLocale);
		momentjs.locale(router.locale);
	}, [router.locale]);

	return (
		<ThemeProvider attribute="class">
			<I18nProvider i18n={i18n}>
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
			</I18nProvider>
		</ThemeProvider>
	);
}

export default MyApp;
