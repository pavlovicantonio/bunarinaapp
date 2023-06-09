import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB8XSzX-K-_HarGnKYVCXYio5sk3n6g8lc",
    authDomain: "bunarinaapp.firebaseapp.com",
    projectId: "bunarinaapp",
    storageBucket: "bunarinaapp.appspot.com",
    messagingSenderId: "945018086483",
    appId: "1:945018086483:web:00c4229c6427076d47d2a6",
    measurementId: "G-LVGBWRPJHV"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export { firebase, db };