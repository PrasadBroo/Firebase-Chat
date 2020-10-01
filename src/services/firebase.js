import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";


var firebaseConfig = {
  apiKey: "xxxxxxxxxxx",
  authDomain: "xxxxxxxxxxxxxxxx",
  databaseURL: "xxxxxxxxxxxxxxxxxxxxxxxx",
  projectId: "xxxxxxxxxxxxxxxxxxx",
  storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxx",
  messagingSenderId: "xxxxxxxxxxxxx",
  appId: "xxxxxxxxxxxxxxx",
  measurementId: "xxxxxxxxxx"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth;
export const firestore = firebase.firestore;
