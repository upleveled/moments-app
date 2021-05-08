import * as React from 'react';
import Head from 'next/head';

declare global {
	interface Window {
		OneSignal: any;
	}
}

const OnesignalComponent: React.FC = () => {
	const [isLoaded, setIsLoaded] = React.useState(false);

	React.useEffect(() => {
		const script = document.getElementById('onesignal-script');
		const check = () => {
			setIsLoaded(true);
		};
		script && script.addEventListener('load', check);
		return () => {
			script && script.removeEventListener('load', check);
		};
	}, []);

	React.useEffect(() => {
		const OneSignal = window.OneSignal || [];
		const initConfig = {
			appId: process.env.NEXT_PUBLIC_ONESIGNAL_KEY,
		};
		OneSignal.push(function () {
			OneSignal.SERVICE_WORKER_PARAM = { scope: '/push/onesignal/' };
			OneSignal.init(initConfig);
		});
	}, [isLoaded]);

	return (
		<div>
			<Head>
				<script
					id="onesignal-script"
					src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
					async={true}
				></script>
			</Head>
		</div>
	);
};

export default OnesignalComponent;
