import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
	apiKey: 'AIzaSyCKm8Pls6kDwEIlb02NB8Yn3tT-COGGMxs',
	authDomain: 'ecommerce-react-9ced5.firebaseapp.com',
	databaseURL: 'https://ecommerce-react-9ced5.firebaseio.com',
	projectId: 'ecommerce-react-9ced5',
	storageBucket: 'ecommerce-react-9ced5.appspot.com',
	messagingSenderId: '233386676537',
	appId: '1:233386676537:web:af273672352931b8f758e8',
	measurementId: 'G-ZR539089E1'
};

firebase.initializeApp(config);

// ! metoda, ktora zoberie udaje z Authentification o prihlasenych pouzivatelov a ulozi ich do firestore
// * v App.js posleme do metody pouzivatela, ktory je prihlaseny / null
export const createUserProfileDocument = async (userAuth, additionalData) => {
	// ak je null returne sa z funkcie - pouzivatel nieje prihalseny
	if (!userAuth) return;
	// ID prihlaseneho pouzivatela aby sme zistili ci existuje objekt
	const userRef = firestore.doc(`users/${userAuth.uid}`);
	// treba get() zavolat
	const snapShot = await userRef.get();
	// aby nevytvaralo stale toho isteho pouzivatela pri prihlaseni aj ked uz existuje - nevytvori kopie
	if (!snapShot.exists) {
		// data na ulozenie do firestore
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			// Len prvy krat vytvori noveho pouzivatela do DB, ktory je prave prihlaseny cez google
			await userRef.set({
				displayName,
				email,
				createdAt,
				...additionalData // data ktore pridu neskor
			});
		} catch (error) {
			console.log(error);
		}
	}
	return userRef;
};

// autentifikacia a databaza z Firebase
export const auth = firebase.auth();
export const firestore = firebase.firestore();

// formater pre GETnutie tabulky collections aby sme mali len title a items
export const convertCollectionsSnapshotToMap = (collection) => {
	const transformedCollection = collection.docs.map(doc => {
		const { title, items } = doc.data();

		return {
			routeName: encodeURI(title.toLowerCase()),
			id: doc.id,
			title,
			items
		}
	})
	return transformedCollection.reduce((accumulator, collection) => {
		accumulator[collection.title.toLowerCase()] = collection
		return accumulator;
	}, {} )
}

// hromadne pridanie kolekcie
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = firestore.collection(collectionKey)
	const batch = firestore.batch();
	objectsToAdd.forEach(obj => {
		const newDocRef = collectionRef.doc();
		batch.set(newDocRef, obj)
	})
	// commitne nas batch request
	return await batch.commit()

}

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ promt: 'select_account' });

export const signWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
