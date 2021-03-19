import { gql } from 'graphql-request';
import { Tag } from 'interfaces';
import { fetcherGraph } from 'lib';

export const CREATE_TAG = gql`
	mutation CREATE_TAG($text: String) {
		insert_tags(objects: { text: $text }) {
			returning {
				id
				text
			}
		}
	}
`;

interface CreateTagInterface {
	token: string;
	text: string;
}

export const createTag = async ({ token, text }: CreateTagInterface) => {
	await fetcherGraph<Tag, { text: string }>(CREATE_TAG, token, { text });
};
