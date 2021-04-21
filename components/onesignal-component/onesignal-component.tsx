import * as React from 'react';
import OneSignal from 'react-onesignal';

declare global {
	interface Window {
		OneSignal: any;
	}
}

const OnesignalComponent: React.FC = () => {
	React.useEffect(() => {
		OneSignal.initialize(`${process.env.NEXT_PUBLIC_ONESIGNAL_KEY}`, {
			allowLocalhostAsSecureOrigin: true,
		});
	}, []);

	return <div></div>;
};

export default OnesignalComponent;
