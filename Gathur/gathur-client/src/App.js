import logo from './logo.svg';
import './App.css';
import ApplicationViews from './Components/ApplicationViews';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { TopNavBar } from './Components/TopNavBar';




function App() {
 
  const [isLoggedIn, setIsLoggedIn]=useState(null)

useEffect(()=>{},[])

  return (
    <Router>
      <TopNavBar/>
      <ApplicationViews isLoggedIn={isLoggedIn}/>
    </Router>
  );
}

export default App;
