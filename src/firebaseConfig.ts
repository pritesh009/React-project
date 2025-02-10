import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyDnlVpAmPjAIN_FiuTo37OsIYvwbCW9C-0",
    authDomain: "easynote-225eb.firebaseapp.com",
    projectId: "easynote-225eb",
    storageBucket: "easynote-225eb.firebasestorage.app",
    messagingSenderId: "1029541160142",
    appId: "1:1029541160142:web:6b5601c1197871032d5c9f",
    measurementId: "G-P48SJYRYSG"
  };

  const app = initializeApp(firebaseConfig);
  
  const db = getFirestore(app);
  const auth = getAuth(app);

export {db, auth};