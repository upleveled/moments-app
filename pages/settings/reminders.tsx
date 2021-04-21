import * as React from 'react';
import dynamic from 'next/dynamic';
import { HeadPage } from 'components/head-page';
import { Layout } from 'components/layout';
import { ToggleOption } from 'components/toggle-option';
import { Loader } from 'components/loader';

const OnesignalComponent = dynamic(
	() => import('components/onesignal-component/onesignal-component'),
	{ ssr: false }
);

const Reminders: React.FC = () => {
	const [isOnesignalActive, setIsOnesignalActive] = React.useState(false);
	const [isMorningActive, setIsMorningActive] = React.useState(false);
	const [isNightActive, setIsNightActive] = React.useState(false);

	const onToggleMornig = async () => {
		let isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
		setIsMorningActive(!isMorningActive);
		if (!isSubscribed) {
			await window.OneSignal.showNativePrompt();
			isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
			if (!isSubscribed) {
				setIsMorningActive(isMorningActive);
				return;
			}
		}
		if (!isMorningActive && isOnesignalActive) {
			window.OneSignal.sendTag('morning', 'active');
		}
		if (isMorningActive && isOnesignalActive) {
			window.OneSignal.sendTag('morning', 'disabled');
		}
		setIsMorningActive(!isMorningActive);
	};

	React.useEffect(() => {
		(async () => {
			if (window.OneSignal) {
				if (!isOnesignalActive) {
					setIsOnesignalActive(true);
				}
				try {
					const isSubscribed = await window.OneSignal.isPushNotificationsEnabled();
					if (isSubscribed) {
						const tags = await window.OneSignal.getTags();
						if (!!tags.morning && tags.morning === 'active') {
							setIsMorningActive(true);
						}
						if (!!tags.night && tags.night === 'active') {
							setIsNightActive(true);
						}
					}
				} catch (err) {
					console.log(err);
				}
			}
		})();
	}, [window.OneSignal]);

	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadPage title="Reminders" href="/settings" />
			<div className="self-start px-5">
				{!isOnesignalActive ? (
					<Loader />
				) : (
					<>
						<ToggleOption
							title="Morning reminder"
							description="Don’t forget to save your morning moments. A friendly push at 9:00am."
							isActive={isMorningActive}
							onToggle={onToggleMornig}
						/>
						<ToggleOption
							title="Night reminder"
							description="Don’t forget to save your evening moments. A friendly push at 8:00pm."
							isActive={isNightActive}
							onToggle={() => setIsNightActive(!isNightActive)}
						/>
					</>
				)}
				<OnesignalComponent />
			</div>
		</Layout>
	);
};

export default Reminders;
