import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { enableIndexedDbPersistence } from "firebase/firestore"; 



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
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

enableIndexedDbPersistence(db)
.catch((err) => {
  if (err.code == 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled
    // in one tab at a a time.
    // ...
  } else if (err.code == 'unimplemented') {
    // The current browser does not support all of the
    // features required to enable persistence
    // ...
  }
});

const auth = firebaseApp.auth();
export { db, auth }