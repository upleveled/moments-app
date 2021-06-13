import * as React from 'react';
import { Icon } from 'components/icon';

export const MediaBox: React.FC<{
	src?: string;
	onDeleteElement?: () => void;
	onClickImage?: () => void;
	isVideo?: boolean;
	isAudio?: boolean;
}> = ({
	src,
	onDeleteElement,
	onClickImage,
	isVideo = false,
	isAudio = false,
}) => {
	return (
		<div className="relative flex items-center justify-center w-20 h-20 bg-background-input rounded-2xl cursor-pointer">
			{src ? (
				<>
					<div
						className="w-full h-full rounded-2xl overflow-hidden"
						onClick={onClickImage}
					>
						{isAudio ? (
							<div className="relative bg-secondary-light text-secondary-dark flex justify-center items-center flex-col h-full w-full">
								<Icon src="/images/icons/audio-wave.svg" width="47px" />
							</div>
						) : isVideo ? (
							<video
								src={src}
								autoPlay={false}
								controls={false}
								className="w-full h-full object-cover"
							/>
						) : (
							<img src={src} alt="" className="w-full h-full object-cover" />
						)}
					</div>
					<div
						className="absolute z-10 -right-3 -top-3 flex items-center justify-center bg-delete border-2 border-offwhite rounded-lg"
						onClick={onDeleteElement}
					>
						<Icon
							src="/images/icons/close.svg"
							width="20"
							height="20"
							className="text-offwhite"
						/>
					</div>
				</>
			) : (
				<Icon src="/images/icons/plus.svg" />
			)}
		</div>
	);
};
