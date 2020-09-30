import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";


var firebaseConfig = {
  apiKey: "xxxxxxx",
  authDomain: "xxxxxxxx",
  databaseURL: "xxxxxxxxx",
  projectId: "xxxxxxxxx",
  storageBucket: "xxxxxxxx",
  messagingSenderId: "xxxxxxxxx",
  appId: "xxxxxxxxxxx",
  measurementId: "xxxxxxxxx"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth;
export const firestore = firebase.firestore;
