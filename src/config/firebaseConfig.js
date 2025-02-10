// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCnJo0vlGd4sr7wsK83eiyeFpMm9ND4_9Q",
  authDomain: "beyondcampus-86aa5.firebaseapp.com",
  projectId: "beyondcampus-86aa5",
  storageBucket: "beyondcampus-86aa5.firebasestorage.app",
  messagingSenderId: "885469520815",
  appId: "1:885469520815:web:db8fd630f7981ab7e7c55a",
  measurementId: "G-WF81JZ8T4B",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
