import * as React from 'react';
import { CurrentMomentContext, ModalMediaContext } from 'context';

export const useCurrentMoment = () => {
	const { currentMoment, setCurrentMoment } = React.useContext(
		CurrentMomentContext
	);

	return {
		currentMoment,
		setCurrentMoment,
	};
};

export const useModalMedia = () => {
	const { modalMedia, setModalMedia } = React.useContext(ModalMediaContext);

	return {
		modalMedia,
		setModalMedia,
	};
};
