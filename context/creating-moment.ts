import { createContext } from 'react';
import { CreateMomentVariables } from 'gql/mutations';

interface IsCreatingMomentInterface {
	isCreatingMoment: boolean;
	handleCreateMoment: (
		variables: CreateMomentVariables,
		images: File[],
		videos: File[]
	) => void;
}

export const IsCreatingMomentContext = createContext<IsCreatingMomentInterface>(
	{
		isCreatingMoment: false,
		handleCreateMoment: () => null,
	}
);
