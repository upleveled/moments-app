import { Icon } from 'components/icon';
import * as React from 'react';

export const MediaBox: React.FC<{
	src?: string;
	onDeleteElement?: () => void;
	onClickImage?: () => void;
	isVideo?: boolean;
}> = ({ src, onDeleteElement, onClickImage, isVideo = false }) => {
	return (
		<div className="relative flex items-center justify-center w-20 h-20 bg-background-input rounded-2xl cursor-pointer">
			{src ? (
				<>
					<div
						className="w-full h-full rounded-2xl overflow-hidden"
						onClick={onClickImage}
					>
						{isVideo ? (
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
