import * as React from 'react';
import Image from 'next/image';
import { Icon } from 'components/icon';
import { useSwipeable } from 'react-swipeable';

export const FullMedia: React.FC<{
	hideModal: () => void;
	media: string[];
	isVideo: boolean;
	isCreating?: boolean;
}> = ({ hideModal, media, isVideo, isCreating = false }) => {
	const [currentIndex, setCurrentIndex] = React.useState<number>(0);
	const handlers = useSwipeable({
		trackTouch: true,
		preventDefaultTouchmoveEvent: true,
		onSwiped: (eventData) => console.log('User Swiped!', eventData),
		onSwipedRight: () =>
			setCurrentIndex((value) => (value === 0 ? 0 : value - 1)),
		onSwipedLeft: () =>
			setCurrentIndex((value) =>
				value === media.length - 1 ? value : value + 1
			),
	});

	React.useEffect(() => {
		console.log(media);
	}, [media]);

	return (
		<div
			{...handlers}
			className="fixed z-40 bottom-0 left-0 right-0 top-0 flex items-center justify-center w-full h-screen bg-dark"
		>
			<div
				className="absolute z-20 right-11 top-4 w-6 h-6 cursor-pointer"
				onClick={hideModal}
			>
				<Icon src="/images/icons/close.svg" className="text-light" />
			</div>
			<div className="relative flex justify-center w-full max-w-md h-full">
				{isVideo ? (
					<video
						src={media[currentIndex]}
						autoPlay={false}
						controls
						className="max-h-full"
					/>
				) : isCreating ? (
					<div className="w-full px-5">
						<img
							src={media[currentIndex]}
							alt="image-detail"
							className="object-none object-center"
						/>
					</div>
				) : (
					<Image
						layout="fill"
						src={media[currentIndex]}
						alt="image-detail"
						objectFit="contain"
						objectPosition="center"
					/>
				)}
			</div>
		</div>
	);
};
