import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/firebase-database'

const firebaseConfig = {
    apiKey: "AIzaSyBskFgTdKPq9t6J1cLYHzqBfkQ_rnzKvFk",
    authDomain: "easychat-3ec56.firebaseapp.com",
    projectId: "easychat-3ec56",
    storageBucket: "easychat-3ec56.appspot.com",
    messagingSenderId: "246299286077",
    appId: "1:246299286077:web:810cd997b7bfdad9202854",
    measurementId: "G-J576YR3LJS"
  };
let app;

if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const firebaseDatabase =app.firebaseDatabase();
const auth = firebase.auth();

export { db, auth }