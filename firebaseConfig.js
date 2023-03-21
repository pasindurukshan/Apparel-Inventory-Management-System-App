import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from "firebase/auth";
// import {...} from "firebase/database";
// import {...} from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyC3sYC-BI_p5iOgWQOHPDpjc0QB_eDIXkw",
    authDomain: "casanovaapp-68898.firebaseapp.com",
    projectId: "casanovaapp-68898",
    storageBucket: "casanovaapp-68898.appspot.com",
    messagingSenderId: "32605442797",
    appId: "1:32605442797:web:d3428779a83acd8c6c72e4"
};

const app = initializeApp(firebaseConfig);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
