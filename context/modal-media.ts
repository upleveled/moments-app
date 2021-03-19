import { createContext } from 'react';

export const ModalMediaContext = createContext<{
	modalMedia: string[] | null;
	setModalMedia: (value: string[] | null) => void;
}>({
	modalMedia: null,
	setModalMedia: () => null,
});
