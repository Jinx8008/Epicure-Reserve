// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAu0mlWyNvGOL-qsJU42szQxH4WuqjbiOo",
  authDomain: "epicure-reserve.firebaseapp.com",
  projectId: "epicure-reserve",
  storageBucket: "epicure-reserve.firebasestorage.app",
  messagingSenderId: "610256752127",
  appId: "1:610256752127:web:3f94b596aab48d641b2bca"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);