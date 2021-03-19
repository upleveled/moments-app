import { gql } from 'graphql-request';

export const GET_ALL_TAGS = gql`
	query GET_ALL_TAGS {
		tags {
			id
			text
			tag_moments_aggregate {
				aggregate {
					count
				}
			}
		}
	}
`;
