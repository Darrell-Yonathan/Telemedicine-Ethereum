import firebase from "firebase/app";
import "firebase/analytics";
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyAt5ywSFR_wklRuQR6XU_vAy55wjyYLA7k",
    authDomain: "userauth-telemedicine-ethereum.firebaseapp.com",
    projectId: "userauth-telemedicine-ethereum",
    storageBucket: "userauth-telemedicine-ethereum.appspot.com",
    messagingSenderId: "915980066371",
    appId: "1:915980066371:web:decbd9b5d03dea6c73bef6",
    measurementId: "G-XKK00GYK95"
  };
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const auth = firebase.auth();
export const firestore = firebase.firestore();