import { gql } from 'graphql-request';
import { Moment } from 'interfaces';
import { fetcherGraph } from 'lib';

export const DELETE_MOMENT = gql`
	mutation DELETE_MOMENT($id: uuid) {
		delete_moments(where: { id: { _eq: $id } }) {
			returning {
				id
			}
		}
	}
`;

export interface deleteMomentVariables {
	id: string;
}

interface DeleteMomentInterface {
	token: string;
	variables: deleteMomentVariables;
}

export const deleteMoment = async ({
	token,
	variables,
}: DeleteMomentInterface): Promise<void> => {
	await fetcherGraph<Moment, deleteMomentVariables>(
		DELETE_MOMENT,
		token,
		variables
	);
};
