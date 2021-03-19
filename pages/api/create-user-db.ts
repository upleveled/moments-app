import type { NextApiRequest, NextApiResponse } from 'next';
import { GraphQLClient, gql } from 'graphql-request';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const { id, email } = JSON.parse(req.body);
		const adminToken = process.env.HASURA_ADMIN_KEY as string;
		const API = process.env.NEXT_PUBLIC_HASURA_API as string;

		const client = new GraphQLClient(API, {
			headers: {
				'x-hasura-admin-secret': adminToken,
			},
		});

		const CREATE_USER = gql`
			mutation CREATE_USER($id: String, $email: String) {
				insert_users(objects: { id: $id, email: $email }) {
					returning {
						id
					}
				}
			}
		`;

		try {
			const createdUserResopnse = await client.request(CREATE_USER, {
				id,
				email,
			});
			res.statusCode = 200;
			res.json({ createdUserResopnse });
		} catch (error) {
			console.log(error);
			res.statusCode = 200;
			res.json({ error });
		}
	}
};
