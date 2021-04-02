import * as React from 'react';
import { Icon } from 'components/icon';
import { useSwipeable } from 'react-swipeable';

export const FullMedia: React.FC<{
	hideModal: () => void;
	images: string[];
}> = ({ hideModal, images }) => {
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const handlers = useSwipeable({
		trackTouch: true,
		preventDefaultTouchmoveEvent: true,
		onSwiped: (eventData) => console.log('User Swiped!', eventData),
		onSwipedRight: () =>
			setCurrentIndex((value) => (value === 0 ? 0 : value - 1)),
		onSwipedLeft: () =>
			setCurrentIndex((value) =>
				value === images.length - 1 ? value : value + 1
			),
	});

	return (
		<div
			{...handlers}
			className="fixed z-40 bottom-0 left-0 right-0 top-0 flex items-center justify-center w-full h-screen bg-dark-50"
		>
			<div
				className="absolute right-11 top-4 w-6 h-6 cursor-pointer"
				onClick={hideModal}
			>
				<Icon src="/images/icons/close.svg" className="text-background-nav" />
			</div>
			<img
				src={images[currentIndex]}
				alt=""
				className="w-full max-w-md object-contain"
			/>
		</div>
	);
};
