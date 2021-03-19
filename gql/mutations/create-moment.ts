import { GET_ALL_MOMENTS } from 'gql/queries';
import { gql } from 'graphql-request';
import { Moment } from 'interfaces';
import { fetcherGraph } from 'lib';
import { mutate } from 'swr';
import { v4 as uuidv4 } from 'uuid';

export const CREATE_MOMENT = gql`
	mutation CREATE_MOMENT(
		$content: String
		$isThanks: Boolean
		$isFavorite: Boolean
		$emotion: String
		$tags: [moment_tag_insert_input!]! = []
	) {
		insert_moments(
			objects: {
				content: $content
				is_thanks: $isThanks
				is_favorite: $isFavorite
				emotion: $emotion
				moment_tags: { data: $tags }
			}
		) {
			returning {
				id
				created_at
			}
		}
	}
`;

interface CreateMomentVariables {
	content: string;
	isThanks: boolean;
	isFavorite: boolean;
	emotion: string | null;
	tags: { tag_id: string }[];
}

interface CreateMomentInterface {
	token: string;
	variables: CreateMomentVariables;
}

export const createMoment = async ({
	token,
	variables,
}: CreateMomentInterface): Promise<void> => {
	await fetcherGraph<Moment, CreateMomentVariables>(
		CREATE_MOMENT,
		token,
		variables
	);
	mutate(GET_ALL_MOMENTS);
};

export const createSRWMoment = (
	cacheMoments: Moment[],
	newMoment: Moment
): Moment[] => {
	const newMoments = [
		...cacheMoments,
		{ ...newMoment, id: uuidv4().toString() },
	];
	return newMoments;
};
