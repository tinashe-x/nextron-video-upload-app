// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD0Rioo5GqMU24smWX2s4sOdFZpZ5zZIf4",
    authDomain: "nextron-video-app-c39c4.firebaseapp.com",
    projectId: "nextron-video-app-c39c4",
    storageBucket: "nextron-video-app-c39c4.firebasestorage.app",
    messagingSenderId: "20999951372",
    appId: "1:20999951372:web:72d1c053e20312c3888a29",
    measurementId: "G-VS43WZ36H9"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


export { db, collection, addDoc, getDocs };