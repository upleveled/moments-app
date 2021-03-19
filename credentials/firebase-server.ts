const firebasePrivateKey = process.env.FIREBASE_PRIVATE_KEY as string;

export default {
	// paste your firebase config here:
	type: process.env.FIREBASE_TYPE,
	project_id: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
	private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
	private_key: firebasePrivateKey.replace(/\\n/gm, '\n'),
	client_email: process.env.NEXT_PUBLIC_FIREBASE_CLIENT_EMAIL,
	client_id: process.env.FIREBASE_CLIENT_ID,
	auth_uri: process.env.FIREBASE_AUTH_URI,
	token_uri: process.env.FIREBASE_TOKEN_URI,
	auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
	client_x509_cert_url: process.env.CLIEN_X509_CERT_URL,
};
