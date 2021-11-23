import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth'; 

const firebaseConfig = {
    apiKey: "AIzaSyByOYmUX_3xrU7p9LnDBFvQCJ2r6ohFMJA",
    authDomain: "easy-chat-3c8cc.firebaseapp.com",
    databaseURL: "https://easy-chat-3c8cc-default-rtdb.firebaseio.com",
    projectId: "easy-chat-3c8cc",
    storageBucket: "easy-chat-3c8cc.appspot.com",
    messagingSenderId: "991420514795",
    appId: "1:991420514795:web:13d673e674ecd5011159ae",
    measurementId: "G-701S0SFY4R" 
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