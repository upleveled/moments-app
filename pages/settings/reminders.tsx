import * as React from 'react';
import { HeadPage } from 'components/head-page';
import { Layout } from 'components/layout';
import { ToggleOption } from 'components/toggle-option';

const Reminders: React.FC = () => {
	const [isMorningActive, setIsMorningActive] = React.useState(false);
	const [isNightActive, setIsNightActive] = React.useState(false);
	return (
		<Layout className="bg-background" withNavBar={false}>
			<HeadPage title="Reminders" href="/settings" />
			<div className="self-start px-5">
				<ToggleOption
					title="Morning reminder"
					description="Don’t forget to save your morning moments. A friendly push at 9:00am."
					isActive={isMorningActive}
					onToggle={() => setIsMorningActive(!isMorningActive)}
				/>
				<ToggleOption
					title="Night reminder"
					description="Don’t forget to save your evening moments. A friendly push at 8:00pm."
					isActive={isNightActive}
					onToggle={() => setIsNightActive(!isNightActive)}
				/>
			</div>
		</Layout>
	);
};

export default Reminders;
