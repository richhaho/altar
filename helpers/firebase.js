import { initializeApp } from "firebase/app";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyBYqc4HpG8aIBUpH8SENJa-Pm6354glADs",
    authDomain: "altar-social-app.firebaseapp.com",
    databaseURL: "https://altar-social-app-rtdb.firebaseio.com",
    projectId: "altar-social-app",
    storageBucket: "altar-social-app.appspot.com",
    messagingSenderId: "892561242305",
    appId: "1:892561242305:web:800247b28257bc2581bc40",
    measurementId: "G-TZPHCBV995"
  };
  initializeApp(firebaseConfig);

  export const firebaseAuth = firebase.auth();

  export const firebaseStorage = firebase.storage();

  export const firestore = firebase.firestore();

  export const realtime = firebase.database();

  export default firebase;