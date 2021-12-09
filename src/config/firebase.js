import firebase from "firebase/compat/app"
import "firebase/compat/firestore"
import "firebase/compat/auth"

const firebaseConfig = {
    apiKey: "AIzaSyBGVQVCbrANy5XenmdfWhlHvqxsTHEZX0I",
    authDomain: "chiarianounidad1m3.firebaseapp.com",
    projectId: "chiarianounidad1m3",
    storageBucket: "chiarianounidad1m3.appspot.com",
    messagingSenderId: "58438052677",
    appId: "1:58438052677:web:5c8ca37bc92434c0c12c2c",
    measurementId: "G-6T95YWGJ63"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.db = firebase.firestore();
  firebase.auth = firebase.auth();


  export default firebase;