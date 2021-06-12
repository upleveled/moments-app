import * as React from 'react';
import Image from 'next/image';
import { Icon } from 'components/icon';
import { useSwipeable } from 'react-swipeable';
import { UploadIcon } from '@heroicons/react/outline';
import clsx from 'clsx';

export const FullMedia: React.FC<{
	hideModal: () => void;
	media: string[];
	isVideo: boolean;
}> = ({ hideModal, media, isVideo }) => {
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
			<div className="w-full absolute top-0 left-0 right-0 py-3 flex justify-between items-center px-6">
				<div className="cursor-pointer" onClick={hideModal}>
					<Icon src="/images/icons/close.svg" className="text-light" />
				</div>
				<ul className="grid grid-flow-col gap-2">
					{media.map((elem, index) => (
						<div
							key={index}
							className={clsx(
								'w-8 h-8 border-2 rounded-1.2lg overflow-hidden cursor-pointer',
								index === currentIndex
									? 'border-offwhite'
									: 'border-primary-light'
							)}
							onClick={() => setCurrentIndex(index)}
						>
							{isVideo ? (
								<video
									src={elem}
									autoPlay={false}
									controls={false}
									className="w-full"
								/>
							) : (
								<Image
									width="32"
									height="32"
									layout="fixed"
									src={elem}
									alt="image-detail"
									objectFit="cover"
									objectPosition="center"
								/>
							)}
						</div>
					))}
				</ul>
				<UploadIcon width="24" className="cursor-pointer text-offwhite" />
			</div>
			<div
				className="relative flex justify-center w-full max-w-md h-full"
				style={{ maxHeight: '80vh' }}
			>
				{isVideo ? (
					<video
						src={media[currentIndex]}
						autoPlay={false}
						controls
						className="max-h-full"
					/>
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
