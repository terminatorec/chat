import React, { useState, useContext } from "react";
// import ToDo from './components/ToDo'
import { SmileContext } from "./context/index";
import "./App.css";
// import 'react-block-ui/style.css';
// import "react-block-ui/style.css";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { HashRouter } from "react-router-dom";
import Navbar from "./components/Navbar";
import AppRouter from "./components/AppRouter";
import { useAuthState } from 'react-firebase-hooks/auth';
import Loader from "./components/Loader";
// import "react-colorful/dist/index.css";
// import { SmileContext } from "context";

function App() { 

  // import { privateRoutes, publicRoutes } from "../router/router";
  

    const {auth} = useContext(SmileContext)
    const [user, loading, error] = useAuthState(auth);

    if(loading){
      return <Loader/>
    }


return ( 

  // <SmileContext.Provider value={{ heightBlock, setHeightBlock }}>
    <HashRouter>
      <Navbar/>
      <AppRouter/>
    </HashRouter>
  // </SmileContext.Provider>
)}
export default App;
