import { Moment } from 'interfaces';
import { createContext } from 'react';

interface CurrentMomentInterface {
	currentMoment: Moment | null;
	setCurrentMoment: (value: Moment | null) => void;
}

export const CurrentMomentContext = createContext<CurrentMomentInterface>({
	currentMoment: null,
	setCurrentMoment: () => null,
});
