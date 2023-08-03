import logo from './logo.svg';
import './App.css';
import ApplicationViews from './Components/ApplicationViews';
import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import { TopNavBar } from './Components/NavBars/TopNavBar';
import { onLoginStatusChange,me, logout } from './Modules/AuthManager';
import {Spinner} from 'reactstrap';
import { GroupNav } from './Components/NavBars/UserGroups';
import { GetUserGroups } from './Modules/GroupManager';
import { SearchResult } from './Components/NavBars/SearchResult';



function App() {
 
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [userGroups, setUserGroups]=useState([])
  const [search, setSearch]=useState(false)
  const [searchResults, setSearchResults]=useState([])

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

  useEffect(()=>{
    if(isLoggedIn){
      GetUserGroups().then(setUserGroups)
    }
    
  },[isLoggedIn])

  useEffect(()=>{},[search])

  const callback =(data)=>{
      setIsLoggedIn(data)
      logout()
  }

  const searchCallBack =(data,result)=>{
    setSearch(data)
    setSearchResults(result)
  }


  if (isLoggedIn === null) {
    return <Spinner className="app-spinner dark" />;
  }
  return (
    <Router>
      <TopNavBar isLoggedIn={isLoggedIn} user={userProfile} runSearch={searchCallBack}/>
      {isLoggedIn ? <GroupNav myUserGroups={userGroups}/> : ""}
      {search ? <SearchResult runSearch={searchCallBack} results={searchResults} user={userProfile}/>:""}
      <ApplicationViews isLoggedIn={isLoggedIn} user={userProfile} appLogoutCallback={callback} loggedUserGroups={userGroups} />
      
    </Router>
  );
}

export default App;
