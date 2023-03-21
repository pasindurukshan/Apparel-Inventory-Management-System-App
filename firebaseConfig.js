import { initializeApp } from 'firebase/app';
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Optionally import the services that you want to use
// import {...} from "firebase/database";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkl6mE9txUeCf7Z0K4hTYDxpwqnhL3BL4",
    authDomain: "casanovaapp-dfc2e.firebaseapp.com",
    projectId: "casanovaapp-dfc2e",
    storageBucket: "casanovaapp-dfc2e.appspot.com",
    messagingSenderId: "376903640774",
    appId: "1:376903640774:web:a8eea7ff1c49684fb199c7"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
