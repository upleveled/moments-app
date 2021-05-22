import React from 'react';

declare global {
	interface Window {
		OneSignal: any;
	}
}

class ReactOneSignal extends React.Component {
	oneSignal = () => {
		return {
			__html: `
				window.OneSignal = window.OneSignal || [];
				OneSignal.push(function() {
					OneSignal.SERVICE_WORKER_PARAM = { scope: "/push/onesignal/" };
					OneSignal.SERVICE_WORKER_PATH = "push/onesignal/OneSignalSDKWorker.js";
					OneSignal.SERVICE_WORKER_UPDATER_PATH = "push/onesignal/OneSignalSDKUpdaterWorker.js";
					OneSignal.init({ appId: "${process.env.NEXT_PUBLIC_ONESIGNAL_KEY}" });
				});`,
		};
	};

	render = (): React.ReactNode => {
		return (
			<>
				<script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async />
				<script dangerouslySetInnerHTML={this.oneSignal()} />
			</>
		);
	};
}

export default ReactOneSignal;
