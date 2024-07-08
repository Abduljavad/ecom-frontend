
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-448b6.firebaseapp.com",
  projectId: "mern-auth-448b6",
  storageBucket: "mern-auth-448b6.appspot.com",
  messagingSenderId: "85237693312",
  appId: "1:85237693312:web:e7ec04d8d15eb70b635f65"
};

export const app = initializeApp(firebaseConfig);