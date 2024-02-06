import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyAr1JE1wAiXuWRtffMy1lQnGCvldJXptuQ",
  authDomain: "react-firebase-assignmen-6814c.firebaseapp.com",
  projectId: "react-firebase-assignmen-6814c",
  storageBucket: "react-firebase-assignmen-6814c.appspot.com",
  messagingSenderId: "7005656055",
  appId: "1:7005656055:web:48a79681bd2fd6948ed4f2",
  measurementId: "G-510KJ7WMFC"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app)