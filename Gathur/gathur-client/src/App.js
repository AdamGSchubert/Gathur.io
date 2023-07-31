import logo from './logo.svg';
import './App.css';
import ApplicationViews from './Components/ApplicationViews';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { TopNavBar } from './Components/NavBars/TopNavBar';
import { onLoginStatusChange,me, logout } from './Modules/AuthManager';
import {Spinner} from 'reactstrap';
import { GroupNav } from './Components/NavBars/UserGroups';




function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    onLoginStatusChange(setIsLoggedIn);
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      me().then(setUserProfile);
    } else {
      setUserProfile(null);
    }
  }, [isLoggedIn]);


  const callback =(data)=>{
      setIsLoggedIn(data)
      logout()
  }

  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }
  return (
    <Router>
      <TopNavBar isLoggedIn={isLoggedIn} user={userProfile}/>
      
      <ApplicationViews isLoggedIn={isLoggedIn} user={userProfile} appLogoutCallback={callback} />
      
    </Router>
  );
}

export default App;
