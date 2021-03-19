import type { NextApiRequest, NextApiResponse } from 'next';
import { firebaseAdmin } from 'lib/firebase-admin';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		const admin = firebaseAdmin();

		const { userId } = JSON.parse(req.body);

		const customClaims = {
			'https://hasura.io/jwt/claims': {
				'x-hasura-default-role': 'user',
				'x-hasura-allowed-roles': ['user'],
				'x-hasura-user-id': userId,
			},
		};

		await admin
			.auth()
			.setCustomUserClaims(userId, customClaims)
			.catch((error) => {
				console.log(error);
			});

		res.statusCode = 200;
		res.json({ userId });
	}
};
