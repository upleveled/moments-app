import firebase from 'firebase/app';
import 'firebase/auth'; // If you need it
// import 'firebase/database';
// import 'firebase/storage'; // If you need it
// import 'firebase/analytics'; // If you need it
// import 'firebase/messaging';
import firebaseCredentials from 'credentials/firebase-client';

// Check that `window` is in scope for the analytics module!
if (typeof window !== 'undefined' && !firebase.apps.length) {
	firebase.initializeApp(firebaseCredentials);
	// To enable analytics. https://firebase.google.com/docs/analytics/get-started
	// if ('measurementId' in firebaseCredentials) firebase.analytics();
}

export const firebaseClient = firebase;
