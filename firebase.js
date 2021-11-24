import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyAEQXEzU4rZ1RqudPpPLkCg4fRXKyhC3Xw",
    authDomain: "easy-chat-3c67b.firebaseapp.com",
    databaseURL: "https://easy-chat-3c67b-default-rtdb.firebaseio.com",
    projectId: "easy-chat-3c67b",
    storageBucket: "easy-chat-3c67b.appspot.com",
    messagingSenderId: "440698491831",
    appId: "1:440698491831:web:7447b0feece29317cb8e32",
    measurementId: "G-GNQJTVCY4N"
  };
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore(); 
const auth = firebase.auth();

export { db, auth }