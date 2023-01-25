// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDuaHIibmmEaM2PeAux06NlmBFxll7Dqn4",
  authDomain: "filesharing-fc7cb.firebaseapp.com",
  projectId: "filesharing-fc7cb",
  storageBucket: "filesharing-fc7cb.appspot.com",
  messagingSenderId: "829050828181",
  appId: "1:829050828181:web:9553cf44247b717433b29c",
  measurementId: "G-B2KQJRRTGB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
