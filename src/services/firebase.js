import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/analytics";


var firebaseConfig = {
  apiKey: "AIzaSyB4RHedeZ_2FfmIm9Gdv-B5VaIOUzviZ3A",
  authDomain: "fir-chat-9e10d.firebaseapp.com",
  databaseURL: "https://fir-chat-9e10d.firebaseio.com",
  projectId: "fir-chat-9e10d",
  storageBucket: "fir-chat-9e10d.appspot.com",
  messagingSenderId: "183020302634",
  appId: "1:183020302634:web:51a6cc10188b259c86ee53",
  measurementId: "G-S7HV3N6TXZ"
};

firebase.initializeApp(firebaseConfig);
firebase.analytics();
export const auth = firebase.auth;
export const firestore = firebase.firestore;
