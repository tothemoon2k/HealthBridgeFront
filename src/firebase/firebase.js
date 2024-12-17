import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVXLzASdXZexjzcK0YHndo-4tcH78FHts",
  authDomain: "onlinemed-aa00c.firebaseapp.com",
  projectId: "onlinemed-aa00c",
  storageBucket: "onlinemed-aa00c.firebasestorage.app",
  messagingSenderId: "607568436816",
  appId: "1:607568436816:web:097fdb145a9de1727c3b55"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export {firestore, auth};