// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNTSO4ne2Sz2yIg37VKitQJNGP3pMeZYw",
  authDomain: "epicure-reserve-958b0.firebaseapp.com",
  projectId: "epicure-reserve-958b0",
  storageBucket: "epicure-reserve-958b0.firebasestorage.app",
  messagingSenderId: "786952364644",
  appId: "1:786952364644:web:faca5c34c3efe137723571",
  measurementId: "G-JJF1E62DSN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);