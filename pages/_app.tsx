import * as React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import { UserContext } from 'context';
import 'styles/global-tailwind.css';
import { useFirebaseUser } from 'hooks/user/useFirebaseUser';
import { Moment } from 'interfaces';
import { CurrentMomentContext } from 'context/current-moment';
import { DetailMoment } from 'components/detail-moment';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
	const [currentMoment, setCurrentMoment] = React.useState<Moment | null>(null);

	const user = useFirebaseUser();

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

	return (
		<UserContext.Provider value={user}>
			<ThemeProvider attribute="class">
				<CurrentMomentContext.Provider
					value={{ currentMoment, setCurrentMoment }}
				>
					<div>
						<Component {...pageProps} />
						<DetailMoment />
					</div>
				</CurrentMomentContext.Provider>
			</ThemeProvider>
		</UserContext.Provider>
	);
}

export default MyApp;
