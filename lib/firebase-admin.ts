import * as admin from 'firebase-admin';

const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY as string;

export const firebaseAdmin = () => {
	if (!admin.apps.length) {
		admin.initializeApp(
			{
				credential: admin.credential.cert({
					// type: process.env.FIREBASE_TYPE,
					projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
					// private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
					privateKey: firebasePrivateKey.replace(/\\n/g, '\n'),
					clientEmail: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
					// client_id: process.env.FIREBASE_CLIENT_ID,
					// auth_uri: process.env.FIREBASE_AUTH_URI,
					// token_uri: process.env.FIREBASE_TOKEN_URI,
					// auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
					// client_x509_cert_url: process.env.CLIEN_X509_CERT_URL,
				}),
				// require('../credentials/firebase-server')
			},
			'server'
		);
	}

	return admin.app('server');
};
