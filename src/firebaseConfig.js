import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const app = firebase.initializeApp({
  apiKey: "AIzaSyBWLw4P9wqtcejvwQwiFTXkPxZrWXsXeNU",
  authDomain: "twitter-85307.firebaseapp.com",
  projectId: "twitter-85307",
  storageBucket: "twitter-85307.appspot.com",
  messagingSenderId: "709386510644",
  appId: "1:709386510644:web:c8f1d5c7398d1f1838c561"
});


export const auth = app.auth();
export const db = app.firestore();
export default app;