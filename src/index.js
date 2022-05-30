import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { SmileContext } from "./context/index";
import { getDatabase } from "firebase/database";


 const firebaseConfig = {
   apiKey: "AIzaSyBuIyHF50Pi9Fo0NjCc2xvVYNgvSdKiTlA",
   authDomain: "chat-666-521fe.firebaseapp.com",
   databaseURL: "https://chat-666-521fe-default-rtdb.europe-west1.firebasedatabase.app/",
   projectId: "chat-666-521fe",
   storageBucket: "chat-666-521fe.appspot.com",
   messagingSenderId: "784277454679",
   appId: "1:784277454679:web:c65afe953ccca6ca5bc812",
   measurementId: "G-MY6N1NTH0Q"
 };

 const app = initializeApp(firebaseConfig);

  const auth = getAuth();
  const db = getFirestore(app);
  // console.log(db)
  // const database = getDatabase(app);
  const database = getDatabase(app);
  // const [value, setValue] = useState("");


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SmileContext.Provider 
  // value={value}
  // setValue={setValue}
  value={{ 
    auth,
    db,
    database,
    // setValue,
    // value
  }}
    >
    <App />
  </SmileContext.Provider>

);


