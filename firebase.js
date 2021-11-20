import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDA8pJE4ozK8GkGLnpwsuiqiN6daITI-LM",
    authDomain: "easychat-ce427.firebaseapp.com",
    projectId: "easychat-ce427",
    storageBucket: "easychat-ce427.appspot.com",
    messagingSenderId: "97151190398",
    appId: "1:97151190398:web:5b866d6f32fb0ae8619f2f"
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