import * as React from 'react';
import type { AppProps /*, AppContext */ } from 'next/app';
import clsx from 'clsx';
import { ThemeContext, ThemeType, UserContext } from 'context';
import 'styles/global-tailwind.css';
import { useFirebaseUser } from 'hooks/user/useFirebaseUser';
import { Moment } from 'interfaces';
import { CurrentMomentContext } from 'context/current-moment';
import { DetailMoment } from 'components/detail-moment';

function MyApp({ Component, pageProps }: AppProps) {
	const [theme, setTheme] = React.useState<ThemeType>('light');
	const [currentMoment, setCurrentMoment] = React.useState<Moment | null>(null);
	// const [currentToken, setCurrentToken] = React.useState<string | null>(null);
	// const [initializing, setInitializing] = React.useState(true);

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

	// React.useEffect(() => {
	// 	if (user) {
	// 		setCurrentToken(user.token);
	// 	}
	// }, [user]);

	return (
		<UserContext.Provider value={user}>
			<ThemeContext.Provider value={{ theme, setTheme }}>
				<CurrentMomentContext.Provider
					value={{ currentMoment, setCurrentMoment }}
				>
					<div className={clsx(theme)}>
						<Component {...pageProps} />
						<DetailMoment />
					</div>
				</CurrentMomentContext.Provider>
			</ThemeContext.Provider>
		</UserContext.Provider>
	);
}

export default MyApp;
