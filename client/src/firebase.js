// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-65eea.firebaseapp.com",
  projectId: "mern-estate-65eea",
  storageBucket: "mern-estate-65eea.appspot.com",
  messagingSenderId: "180908763994",
  appId: "1:180908763994:web:1ca5b32f5539be9ad52163"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);