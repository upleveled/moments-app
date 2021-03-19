import * as React from 'react';
import { Icon } from 'components/icon';

export const FullMedia: React.FC<{
	hideModal: () => void;
	images: string[];
}> = ({ hideModal, images }) => {
	return (
		<div className="fixed z-40 bottom-0 left-0 right-0 top-0 flex items-center justify-center w-full h-screen bg-primary">
			<div
				className="absolute right-11 top-4 w-6 h-6 cursor-pointer"
				onClick={hideModal}
			>
				<Icon src="/images/icons/close.svg" className="text-background-nav" />
			</div>
			<img src={images[0]} alt="" className="w-full max-w-md object-contain" />
		</div>
	);
};
