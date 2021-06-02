import { gql } from 'graphql-request';
import { Moment } from 'interfaces';
import { fetcherGraph } from 'lib';

export const EDIT_MOMENT = gql`
	mutation EDIT_MOMENT($id: uuid, $content: String) {
		update_moments(where: { id: { _eq: $id } }, _set: { content: $content }) {
			returning {
				id
			}
		}
	}
`;

interface EditMomentVariables {
	id: string;
	content: string;
}

interface EditMomentInterface {
	token: string;
	variables: EditMomentVariables;
}

export const editMomentContent = async ({
	token,
	variables,
}: EditMomentInterface): Promise<void> => {
	await fetcherGraph<Moment, EditMomentVariables>(
		EDIT_MOMENT,
		token,
		variables
	);
};
