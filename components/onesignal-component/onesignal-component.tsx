import * as React from 'react';
import Head from 'next/head';

declare global {
	interface Window {
		OneSignal: any;
	}
}

const OnesignalComponent: React.FC<{
	isOnesignalActive: boolean;
	setIsOnesignalActive: (value: boolean) => void;
}> = ({ isOnesignalActive, setIsOnesignalActive }) => {
	React.useEffect(() => {
		const script = document.getElementById('onesignal-script');
		console.log('script', script);
		const check = () => {
			console.log('it finished loading onesignal script');
			setIsOnesignalActive(true);
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
			OneSignal.SERVICE_WORKER_PATH = 'push/onesignal/OneSignalSDKWorker.js';
			OneSignal.SERVICE_WORKER_UPDATER_PATH =
				'push/onesignal/OneSignalSDKUpdaterWorker.js';
			OneSignal.init(initConfig);
		});
	}, [isOnesignalActive]);

	return (
		<div>
			<Head>
				<script
					id="onesignal-script"
					src="https://cdn.onesignal.com/sdks/OneSignalSDK.js"
				></script>
			</Head>
		</div>
	);
};

export default OnesignalComponent;
