import * as React from 'react';

declare global {
	interface Window {
		OneSignal: any;
	}
}

const OnesignalComponent: React.FC = () => {
	React.useEffect(() => {
		const OneSignal = window.OneSignal || [];
		const initConfig = {
			appId: process.env.NEXT_PUBLIC_ONESIGNAL_KEY,
			notifyButton: {
				enable: true,
			},
		};
		OneSignal.push(function () {
			OneSignal.SERVICE_WORKER_PARAM = { scope: '/push/onesignal/' };
			OneSignal.init(initConfig);
		});
	}, []);

	return <div></div>;
};

export default OnesignalComponent;
