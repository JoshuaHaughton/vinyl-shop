import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFIwjBjDix7VejmUJ-3ZBWwfr9NOEijDw",
  authDomain: "vinyl-fresh.firebaseapp.com",
  projectId: "vinyl-fresh",
  storageBucket: "vinyl-fresh.appspot.com",
  messagingSenderId: "211457478981",
  appId: "1:211457478981:web:4f3460140a027403182e2c",
  measurementId: "G-FYQS6QHE2N"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const auth = firebaseApp.auth();
export { db, auth }